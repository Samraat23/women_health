"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  BadgeCheck,
  FlaskConical,
  HeartPulse,
  Hospital,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { AnimBox } from "@/utils/AnimBox";

type ExpertiseItem = {
  label: string;
};

const iconByLabel: Record<string, LucideIcon> = {
  "Laparoscopic Surgery": Microscope,
  "High-Risk Pregnancy": Baby,
  "Infertility Treatment": HeartPulse,
  Endometriosis: Activity,
  "PCOS Management": Stethoscope,
  "Adolescent Health": Sparkles,
  Hysteroscopy: Hospital,
  "Ovarian Cyst Surgery": ShieldCheck,
  Obstetrics: Baby,
  "Fibroid Removal": BadgeCheck,
};

export function ExpertiseSection({
  expertise,
}: {
  expertise: ExpertiseItem[];
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:78px_78px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(247,244,238,0)_0%,rgba(247,244,238,0.22)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <AnimBox>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
              <Microscope size={16} className="text-[var(--primary-color)]" />
              Specialisations
            </span>
            <h2 className="font-[var(--font-primary)] text-3xl font-black leading-tight text-white sm:text-5xl">
              Areas of Expertise
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/74">
              Focused care across surgical gynecology, pregnancy, fertility,
              hormones, and preventive women&apos;s health.
            </p>
          </div>
        </AnimBox>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {expertise.map((e, i) => {
            const Icon = iconByLabel[e.label] || FlaskConical;

            return (
              <AnimBox key={e.label} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-white/18 bg-white/10 p-5 text-center shadow-[0_18px_42px_rgba(27,20,99,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:border-white/45 hover:bg-white/16">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--primary-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)] transition group-hover:scale-105">
                    <Icon size={24} />
                  </span>
                  <p className="mt-4 text-sm font-black leading-5 text-white">
                    {e.label}
                  </p>
                </div>
              </AnimBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}
