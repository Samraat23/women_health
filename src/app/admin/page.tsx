import type { Metadata } from "next";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import MigrationPanel from "@/features/admin/migration/MigrationPanel";
import AdminShell from "@/features/admin/shell/AdminShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Migration | WHealth Admin",
  description: "Private WHealth module control panel.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await requireAdminSession("/admin");

  return (
    <AdminShell
      activeModule="migration"
      title="Data Migration"
      description="Move the built-in site content into Firestore, one section at a time."
      adminEmail={admin.email}
    >
      <MigrationPanel />
    </AdminShell>
  );
}
