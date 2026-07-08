import { NextResponse, type NextRequest } from "next/server";

import {
  adminSessionCookieName,
  isAdminSessionValid,
} from "@/lib/adminAuth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";
  const sessionValue = request.cookies.get(adminSessionCookieName)?.value;
  const isAuthenticated = await isAdminSessionValid(sessionValue);

  if (!isAuthenticated && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
