import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import {
  adminModules,
  adminNavigation,
  adminSetupSteps,
  adminStats,
} from "@/data/AdminPanel";

export const metadata: Metadata = {
  title: "Admin Panel | WHealth",
  description: "Private WHealth website control panel.",
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:block">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#4f46e5] text-white">
              <LayoutDashboard size={22} />
            </span>
            <span>
              <span className="block text-lg font-black leading-none">
                WHealth
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Admin Panel
              </span>
            </span>
          </Link>

          <nav className="mt-8 space-y-2">
            {adminNavigation.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  type="button"
                  className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-bold transition ${
                    index === 0
                      ? "bg-[#eef2ff] text-[#4f46e5]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-sm font-black text-slate-950">
              <Sparkles size={17} className="text-[#4f46e5]" />
              Firebase Ready
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
              Modules are named like future Firestore collections, so data
              migration can stay straightforward.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f46e5]">
                  Private Route
                </p>
                <h1 className="mt-1 truncate text-xl font-black text-slate-950 md:text-2xl">
                  Website Admin Panel
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="hidden h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#4f46e5]/30 hover:text-[#4f46e5] sm:inline-flex"
                >
                  View Website
                </Link>
                <AdminLogoutButton />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 md:p-8">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-[#eef2ff] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#4f46e5]">
                    <ShieldCheck size={15} />
                    Secure Control Room
                  </div>
                  <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-slate-950 md:text-4xl">
                    Manage content, leads and care pages from one place.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                    This panel is structured for real website operations. When
                    Firebase is connected, each module can become a collection
                    for adding, editing and publishing content.
                  </p>
                </div>

                <div className="border-t border-slate-200 bg-[linear-gradient(135deg,#eef2ff_0%,#ecfeff_100%)] p-6 md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black text-slate-950">
                    Firebase setup checklist
                  </p>
                  <div className="mt-4 space-y-3">
                    {adminSetupSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-start gap-3 rounded-lg bg-white/80 p-3 text-sm font-bold text-slate-700"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#4f46e5] text-xs text-white">
                          {index + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {adminStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <article
                    key={stat.label}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-lg ${stat.background} ${stat.color}`}
                      >
                        <Icon size={21} />
                      </span>
                      <span className="text-3xl font-black text-slate-950">
                        {stat.value}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-black text-slate-950">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {stat.detail}
                    </p>
                  </article>
                );
              })}
            </section>

            <section className="mt-8">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f46e5]">
                    Website Control
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Manageable Modules
                  </h2>
                </div>
                <p className="max-w-xl text-sm font-semibold leading-6 text-slate-500">
                  Buttons are UI placeholders now. After Firebase, connect each
                  card to create, edit, publish and delete flows.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {adminModules.map((module) => {
                  const Icon = module.icon;

                  return (
                    <article
                      key={module.title}
                      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#4f46e5]/25 hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
                    >
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-lg ${module.background} ${module.color}`}
                      >
                        <Icon size={21} />
                      </span>
                      <h3 className="mt-4 text-lg font-black text-slate-950">
                        {module.title}
                      </h3>
                      <p className="mt-2 min-h-16 text-sm font-semibold leading-6 text-slate-500">
                        {module.description}
                      </p>
                      <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2">
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                          Collection
                        </p>
                        <p className="mt-1 truncate text-sm font-black text-slate-700">
                          {module.collection}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition group-hover:bg-[#4f46e5]"
                      >
                        <FileText size={17} />
                        Manage
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
