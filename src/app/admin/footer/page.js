import AdminModuleShell from "@/features/admin/modules/AdminModuleShell";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Footer Section | WHealth Admin",
  description: "Footer module page for the WHealth admin panel.",
};

export default async function AdminFooterPage() {
  await requireAdminSession("/admin/footer");

  return (
    <AdminModuleShell
      activeModule="footer"
      title="Footer Section"
      description="This page is ready for footer module editing."
    >
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-xl font-black text-slate-950 shadow-sm">
        hello footer
      </div>
    </AdminModuleShell>
  );
}

