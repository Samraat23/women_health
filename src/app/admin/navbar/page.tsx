import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * Moved: every website section now has its own route under /admin/section.
 * Kept so existing bookmarks and links do not 404.
 */
export default function AdminNavbarRedirect() {
  redirect("/admin/section/navbar");
}
