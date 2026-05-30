import Link from "next/link";
import { CalendarDays, PhoneCall, ShieldCheck } from "lucide-react";

import DoctorImageWithPattern from "../../(dynamiccomponent)/DoctorImageWithPattern";

const heroStats = [
  { value: "17+", label: "Years experience" },
  { value: "10k+", label: "Women treated" },
  { value: "AIIMS", label: "Faculty experience" },
];

export default function HeroSection() {
  return (
    <section className="relative -mt-24 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f4ee_78%)] pb-16 pt-36 sm:pt-40 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,rgba(90,79,254,0.08)_1px,transparent_1px),linear-gradient(rgba(90,79,254,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(247,244,238,0),#f7f4ee)]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#5a4ffe]/15 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-color)] shadow-sm">
              <ShieldCheck size={16} />
              Available for consultation
            </div>

            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#df5f45]">
              About Dr. Kusum Lata
            </p>

            <h1 className="font-[var(--font-primary)] text-4xl font-black leading-tight text-[var(--primary-text-color)] sm:text-5xl lg:text-6xl">
              Trusted women&apos;s healthcare with specialist surgical care
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 lg:mx-0 lg:text-lg">
              MD Obstetrics &amp; Gynaecology, MBBS, Laparoscopic Surgeon and
              Obstetrician with experience across PGIMER Chandigarh, AIIMS New
              Delhi, and advanced minimally invasive gynecology care.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-[#5a4ffe]/10 bg-white/90 p-4 shadow-sm"
                >
                  <p className="font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-6 py-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(90,79,254,0.25)] transition hover:-translate-y-0.5"
              >
                <CalendarDays size={18} />
                Book Appointment
              </Link>
              <Link
                href="tel:9289140812"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--primary-color)]/20 bg-white px-6 py-4 text-sm font-black text-[var(--secondary-text)] transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
              >
                <PhoneCall size={18} />
                Call Now
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <DoctorImageWithPattern className="pb-5" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
