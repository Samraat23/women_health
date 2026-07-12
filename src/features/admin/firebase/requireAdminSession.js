import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { adminSessionCookieName, isAdminSessionValid } from "@/lib/adminAuth";

export async function requireAdminSession(nextPath = "/admin") {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(adminSessionCookieName)?.value;

  if (!(await isAdminSessionValid(sessionValue))) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
}

