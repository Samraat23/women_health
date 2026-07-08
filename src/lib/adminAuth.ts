export const adminSessionCookieName = "whealth_admin_session";
export const adminSessionMaxAge = 60 * 60 * 8;

const defaultAllowedAdminEmail = "drkusumlata@gmail.com";
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export type AdminSessionUser = {
  email: string;
  uid: string;
};

type AdminSessionPayload = AdminSessionUser & {
  expiresAt: number;
};

export function normalizeAdminEmail(email?: string | null) {
  return (email || "").trim().toLowerCase();
}

export function getAllowedAdminEmail() {
  return normalizeAdminEmail(
    process.env.ADMIN_ALLOWED_EMAIL ||
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      defaultAllowedAdminEmail
  );
}

export function isAllowedAdminEmail(email?: string | null) {
  return normalizeAdminEmail(email) === getAllowedAdminEmail();
}

function getAdminSessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return process.env.ADMIN_SESSION_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    return `whealth-local-firebase-admin-session:${getAllowedAdminEmail()}`;
  }

  return null;
}

export function isAdminSessionConfigured() {
  return Boolean(getAdminSessionSecret());
}

function bytesToBase64Url(bytes: Uint8Array) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(value, "base64url"));
  }

  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(paddedBase64);

  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function encodePayload(payload: AdminSessionPayload) {
  return bytesToBase64Url(textEncoder.encode(JSON.stringify(payload)));
}

function decodePayload(encodedPayload: string) {
  return JSON.parse(textDecoder.decode(base64UrlToBytes(encodedPayload))) as unknown;
}

async function getSigningKey() {
  const secret = getAdminSessionSecret();

  if (!secret) {
    return null;
  }

  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function signPayload(encodedPayload: string) {
  const key = await getSigningKey();

  if (!key) {
    return null;
  }

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(encodedPayload)
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

async function verifyPayloadSignature(encodedPayload: string, signature: string) {
  const key = await getSigningKey();

  if (!key) {
    return false;
  }

  return crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    textEncoder.encode(encodedPayload)
  );
}

function isSessionPayload(value: unknown): value is AdminSessionPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<AdminSessionPayload>;

  return (
    typeof payload.email === "string" &&
    typeof payload.uid === "string" &&
    typeof payload.expiresAt === "number"
  );
}

export async function createAdminSession(user: AdminSessionUser) {
  const payload: AdminSessionPayload = {
    email: normalizeAdminEmail(user.email),
    uid: user.uid,
    expiresAt: Date.now() + adminSessionMaxAge * 1000,
  };
  const encodedPayload = encodePayload(payload);
  const signature = await signPayload(encodedPayload);

  if (!signature) {
    return null;
  }

  return `${encodedPayload}.${signature}`;
}

export async function isAdminSessionValid(sessionValue?: string | null) {
  if (!sessionValue) {
    return false;
  }

  const [encodedPayload, signature] = sessionValue.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  const isSignatureValid = await verifyPayloadSignature(encodedPayload, signature);

  if (!isSignatureValid) {
    return false;
  }

  try {
    const payload = decodePayload(encodedPayload);

    if (!isSessionPayload(payload)) {
      return false;
    }

    return payload.expiresAt > Date.now() && isAllowedAdminEmail(payload.email);
  } catch {
    return false;
  }
}

export async function getAdminSessionUser(sessionValue?: string | null) {
  if (!(await isAdminSessionValid(sessionValue))) {
    return null;
  }

  const [encodedPayload] = sessionValue?.split(".") || [];

  if (!encodedPayload) {
    return null;
  }

  const payload = decodePayload(encodedPayload);

  return isSessionPayload(payload)
    ? {
        email: payload.email,
        uid: payload.uid,
      }
    : null;
}
