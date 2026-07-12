import Link from "next/link";
import { LayoutDashboard, Menu, PanelBottom, ShieldCheck } from "lucide-react";

import { adminModules } from "@/features/admin/firebase/adminModules";
import AdminLogoutButton from "@/features/admin/home/AdminLogoutButton";

const moduleIcons = {
  navbar: Menu,
  footer: PanelBottom,
};

export default function AdminModuleShell({
  activeModule,
  title,
  description,
  children,
}) {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 px-4 py-5 lg:px-5">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
              <LayoutDashboard size={22} />
            </span>
            <div>
              <p className="text-lg font-black leading-tight">WHealth Admin</p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Module Control
              </p>
            </div>
          </div>

          <nav className="space-y-2 px-3 pb-5">
            {adminModules.map((moduleItem) => {
              const Icon = moduleIcons[moduleItem.id] || LayoutDashboard;
              const isActive = activeModule === moduleItem.id;

              return (
                <Link
                  key={moduleItem.id}
                  href={moduleItem.href}
                  className={`flex items-start gap-3 rounded-lg px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon size={19} className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-sm font-black">
                      {moduleItem.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs font-semibold leading-5 ${
                        isActive ? "text-white/68" : "text-slate-400"
                      }`}
                    >
                      {moduleItem.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
              <ShieldCheck size={15} />
              Firebase Ready
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-5 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                Admin Panel
              </p>
              <h1 className="mt-1 text-2xl font-black text-slate-950">
                {title}
              </h1>
              {description ? (
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {description}
                </p>
              ) : null}
            </div>
            <AdminLogoutButton />
          </header>

          <div className="p-5 lg:p-8">{children}</div>
        </section>
      </div>
    </main>
  );
}

