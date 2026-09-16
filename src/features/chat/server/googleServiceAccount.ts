/**
 * Server-to-server Google auth for Firestore, from a Firebase service account.
 *
 * Writes made this way bypass Firestore security rules, which lets the rules
 * deny all browser access to patient requests. Configure one of:
 *   FIREBASE_SERVICE_ACCOUNT_KEY  — the downloaded JSON key (raw or base64)
 *   FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY (+ FIREBASE_PROJECT_ID)
 */

export type ServiceAccount = {
  clientEmail: string;
  privateKey: string;
  projectId: string;
};

const tokenUrl = "https://oauth2.googleapis.com/token";
const datastoreScope = "https://www.googleapis.com/auth/datastore";

let tokenCache: { token: string; expiresAt: number } | null = null;

export function getServiceAccount(): ServiceAccount | null {
  const fallbackProjectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();

  if (rawKey) {
    try {
      const json = rawKey.startsWith("{") ? rawKey : Buffer.from(rawKey, "base64").toString("utf8");
      const parsed = JSON.parse(json) as { client_email?: string; private_key?: string; project_id?: string };

      if (parsed.client_email && parsed.private_key) {
        return {
          clientEmail: parsed.client_email,
          privateKey: parsed.private_key,
          projectId: parsed.project_id || fallbackProjectId,
        };
      }
    } catch {
      console.error("[chat] FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON.");
    }

    return null;
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) return null;

  // Hosting dashboards usually store the key with literal "\n" sequences.
  return { clientEmail, privateKey: privateKey.replace(/\\n/g, "\n"), projectId: fallbackProjectId };
}

function base64Url(input: string | Uint8Array) {
  return Buffer.from(input).toString("base64url");
}

function pemToDer(pem: string) {
  const body = pem
    .replace(/-----BEGIN [A-Z ]+-----/, "")
    .replace(/-----END [A-Z ]+-----/, "")
    .replace(/\s+/g, "");

  return Uint8Array.from(Buffer.from(body, "base64"));
}

/** A signed JWT assertion for the OAuth token exchange. Exported for tests. */
export async function createSignedAssertion(account: ServiceAccount, nowSeconds = Math.floor(Date.now() / 1000)) {
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: account.clientEmail,
      sub: account.clientEmail,
      aud: tokenUrl,
      scope: datastoreScope,
      iat: nowSeconds,
      exp: nowSeconds + 3600,
    })
  );
  const signingInput = `${header}.${claims}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(account.privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput)
  );

  return `${signingInput}.${base64Url(new Uint8Array(signature))}`;
}

export async function getGoogleAccessToken(account: ServiceAccount) {
  if (tokenCache && tokenCache.expiresAt - 60_000 > Date.now()) return tokenCache.token;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: await createSignedAssertion(account),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) {
    throw new Error(`Google token exchange failed with status ${response.status}.`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };

  tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };

  return data.access_token;
}
