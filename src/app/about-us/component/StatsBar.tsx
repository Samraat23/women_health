"use client";

import { Award, Building2, HeartPulse, ShieldCheck } from "lucide-react";

import { AnimBox } from "../../../../utils/AnimBox";

interface StatsItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatsItem[];
}

const statIcons = [Award, ShieldCheck, HeartPulse, Building2];

function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative z-10 -mt-10 bg-[var(--background)] pb-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-[30px] border border-white/70 bg-white/95 p-3 shadow-[0_24px_60px_rgba(27,20,99,0.12)] backdrop-blur-md sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i % statIcons.length];

              return (
                <AnimBox key={s.label} delay={i * 0.1}>
                  <div className="group h-full rounded-3xl border border-[var(--primary-color)]/10 bg-[rgba(247,244,238,0.72)] p-5 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_38px_rgba(27,20,99,0.10)] sm:p-6">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white shadow-[0_12px_26px_rgba(90,79,254,0.22)] transition group-hover:scale-105">
                      <Icon size={22} />
                    </span>
                    <p className="mt-4 font-[var(--font-primary)] text-4xl font-black leading-none text-[var(--primary-text-color)]">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm font-bold text-[var(--secondary-text)]/65">
                      {s.label}
                    </p>
                  </div>
                </AnimBox>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
