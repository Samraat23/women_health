import { NextResponse } from "next/server";

import {
  adminSessionCookieName,
  adminSessionMaxAge,
  getAdminAuthConfig,
} from "@/lib/adminAuth";

type LoginRequestBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const config = getAdminAuthConfig();

  if (!config) {
    return NextResponse.json(
      { message: "Admin login is not configured yet." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as LoginRequestBody | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;

  if (email !== config.email.toLowerCase() || password !== config.password) {
    return NextResponse.json(
      { message: "Invalid admin email or password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: adminSessionCookieName,
    value: config.sessionSecret,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminSessionMaxAge,
  });

  return response;
}
