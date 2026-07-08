import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, Database, ShieldCheck } from "lucide-react";

import AdminLoginForm from "./AdminLoginForm";
import {
  adminSessionCookieName,
  isAdminSessionValid,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login | WHealth",
  description: "Private login for the WHealth website admin panel.",
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(adminSessionCookieName)?.value;

  if (await isAdminSessionValid(sessionValue)) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950">
      <section className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef2ff_0%,#fdf2f8_44%,#ecfeff_100%)]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(79,70,229,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:text-[#4f46e5]"
            >
              <ArrowLeft size={17} />
              Back to website
            </Link>

            <div className="mt-8 max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#4f46e5] shadow-sm">
                <ShieldCheck size={15} />
                Protected Route
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
                Manage your website from one private panel.
              </h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
                This admin route is ready for Firebase collections, content
                editing, appointment leads, blog updates, surgery services and
                pregnancy guide management.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Private email and password login",
                "HTTP-only session cookie",
                "Firebase Auth verified access",
                "Public navbar hidden in admin",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/70 bg-white/75 p-4 text-sm font-bold text-slate-700 shadow-sm backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="w-full max-w-md">
              <AdminLoginForm />
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">
                <Database size={18} className="mt-0.5 shrink-0" />
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
