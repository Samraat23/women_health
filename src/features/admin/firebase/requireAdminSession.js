import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  adminSessionCookieName,
  getAdminSessionUser,
  isAdminSessionValid,
} from "@/lib/adminAuth";

/**
 * Guards an admin page and hands back who is signed in.
 *
 * Returns `{ email, uid }` so the shell can show the account without a second
 * cookie read. Callers that only need the guard can ignore the result.
 */
export async function requireAdminSession(nextPath = "/admin") {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(adminSessionCookieName)?.value;

  if (!(await isAdminSessionValid(sessionValue))) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }

  // Valid session, so this cannot be null — but fall back rather than throw if
  // the payload ever fails to decode.
  const user = await getAdminSessionUser(sessionValue);

  return user || { email: "admin", uid: "" };
}
