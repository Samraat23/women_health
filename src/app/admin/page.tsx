import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Panel | WHealth",
  description: "Private WHealth module control panel.",
};

export default async function AdminDashboardPage() {
  await requireAdminSession("/admin");
  redirect("/admin/navbar");
}
