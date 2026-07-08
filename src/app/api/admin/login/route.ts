import { NextResponse } from "next/server";

import {
  adminSessionCookieName,
  adminSessionMaxAge,
  createAdminSession,
  isAdminSessionConfigured,
  isAllowedAdminEmail,
} from "@/lib/adminAuth";
import { verifyFirebaseIdToken } from "@/lib/firebaseAuthRest";

type LoginRequestBody = {
  idToken?: string;
};

export async function POST(request: Request) {
  if (!isAdminSessionConfigured()) {
    return NextResponse.json(
      { message: "Admin session secret is not configured yet." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as LoginRequestBody | null;
  const idToken = body?.idToken;

  if (!idToken) {
    return NextResponse.json(
      { message: "Firebase login token is required." },
      { status: 400 }
    );
  }

  let firebaseUser;

  try {
    firebaseUser = await verifyFirebaseIdToken(idToken);
  } catch {
    return NextResponse.json(
      { message: "Firebase could not verify this login. Please try again." },
      { status: 401 }
    );
  }

  if (!firebaseUser || !isAllowedAdminEmail(firebaseUser.email)) {
    return NextResponse.json(
      { message: "This Firebase account is not allowed to access admin." },
      { status: 401 }
    );
  }

  const sessionToken = await createAdminSession(firebaseUser);

  if (!sessionToken) {
    return NextResponse.json(
      { message: "Admin session could not be created." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true, email: firebaseUser.email });

  response.cookies.set({
    name: adminSessionCookieName,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionMaxAge,
  });

  return response;
}
