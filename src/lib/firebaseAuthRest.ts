const firebaseApiKey =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  "AIzaSyC53T-kF7BlQxlNUCVzYhcrGWo5fWsxiGs";

type FirebaseLookupResponse = {
  users?: Array<{
    localId?: string;
    email?: string;
    disabled?: boolean;
  }>;
  error?: {
    message?: string;
  };
};

export type VerifiedFirebaseUser = {
  email: string;
  uid: string;
};

export async function verifyFirebaseIdToken(idToken: string) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    }
  );
  const data = (await response.json().catch(() => null)) as
    | FirebaseLookupResponse
    | null;

  if (!response.ok) {
    throw new Error(data?.error?.message || "Firebase token verification failed.");
  }

  const firebaseUser = data?.users?.[0];

  if (!firebaseUser?.email || !firebaseUser.localId || firebaseUser.disabled) {
    return null;
  }

  return {
    email: firebaseUser.email,
    uid: firebaseUser.localId,
  } satisfies VerifiedFirebaseUser;
}
