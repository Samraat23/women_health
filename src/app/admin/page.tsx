import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminHomePanel from "@/features/admin/home/AdminHomePanel";
import { adminSessionCookieName, isAdminSessionValid } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Admin | WHealth",
  description: "Private WHealth Home page control panel.",
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(adminSessionCookieName)?.value;

  if (!(await isAdminSessionValid(sessionValue))) {
    redirect("/admin/login?next=/admin");
  }

  return <AdminHomePanel />;
}
