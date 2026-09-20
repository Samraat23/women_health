import type { Metadata } from "next";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import MediaLibraryPanel from "@/features/admin/media/MediaLibraryPanel";
import AdminShell from "@/features/admin/shell/AdminShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Library | WHealth Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  const admin = await requireAdminSession("/admin/media");

  return (
    <AdminShell
      activeModule="media"
      title="Media Library"
      description="Upload images once and reuse their URLs across every section."
      adminEmail={admin.email}
    >
      <MediaLibraryPanel />
    </AdminShell>
  );
}
