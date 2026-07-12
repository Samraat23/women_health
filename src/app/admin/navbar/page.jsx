import AdminModuleShell from "@/features/admin/modules/AdminModuleShell";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Navbar Section | WHealth Admin",
  description: "Navbar module page for the WHealth admin panel.",
};

export default async function AdminNavbarPage() {
  await requireAdminSession("/admin/navbar");

  return (
    <AdminModuleShell
      activeModule="navbar"
      title="Navbar Section"
      description="This page is ready for navbar module editing."
    >
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-xl font-black text-slate-950 shadow-sm">
        hello navbar
      </div>
    </AdminModuleShell>
  );
}

