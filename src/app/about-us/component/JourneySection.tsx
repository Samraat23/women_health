"use client";

import {
  BriefcaseMedical,
  Building2,
  CalendarClock,
  GraduationCap,
  Hospital,
  MapPin,
  Milestone,
  Stethoscope,
} from "lucide-react";

import { AnimBox } from "../../../../utils/AnimBox";

type JourneyItem = {
  period: string;
  role: string;
  org: string;
  desc: string;
};

const milestoneIcons = [
  GraduationCap,
  Building2,
  BriefcaseMedical,
  Stethoscope,
  Hospital,
  Hospital,
];

function JourneySection({ journey }: { journey: JourneyItem[] }) {
  return (
    <section className="bg-[var(--background)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <AnimBox from="left">
            <div className="sticky top-28 overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] p-6 text-white shadow-[0_30px_70px_rgba(27,20,99,0.18)] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:78px_78px]" />

              <div className="relative">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
                  <Milestone size={16} className="text-[var(--primary-color)]" />
                  Professional Journey
                </span>

                <h2 className="font-[var(--font-primary)] text-3xl font-black leading-tight text-white sm:text-5xl">
                  A career built through training, service, and specialist care.
                </h2>

                <p className="mt-5 text-base font-semibold leading-8 text-white/74">
                  From academic training to senior clinical practice, each step
                  shaped a practical, patient-first approach to women&apos;s
                  health.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { value: "6", label: "Key milestones" },
                    { value: "3", label: "Major institutes" },
                    { value: "2024", label: "Latest role" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/18 bg-white/10 p-4 backdrop-blur-md"
                    >
                      <p className="font-[var(--font-primary)] text-3xl font-black leading-none text-white">
                        {item.value}
                      </p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimBox>

          <div className="relative">
            <div className="absolute bottom-8 left-6 top-8 w-px bg-[linear-gradient(180deg,var(--primary-color),rgba(90,79,254,0.16))] md:left-8" />

            <div className="space-y-5">
              {journey.map((item, i) => {
                const Icon = milestoneIcons[i % milestoneIcons.length];
                const isCurrent = i === journey.length - 1;

                return (
                  <AnimBox
                    key={`${item.period}-${item.role}-${item.org}`}
                    delay={i * 0.08}
                    from="right"
                    className="relative pl-16 md:pl-20"
                  >
                    <span className="absolute left-0 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white text-[var(--primary-color)] shadow-[0_14px_30px_rgba(27,20,99,0.12)] md:h-16 md:w-16 md:rounded-3xl">
                      <Icon size={i === 0 ? 24 : 22} />
                    </span>

                    <article className="group overflow-hidden rounded-[28px] border border-[var(--primary-color)]/10 bg-white shadow-[0_18px_44px_rgba(27,20,99,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(27,20,99,0.14)]">
                      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[0.34fr_0.66fr]">
                        <div className="rounded-3xl bg-[rgba(90,79,254,0.08)] p-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--primary-color)] shadow-sm">
                            <CalendarClock size={14} />
                            {item.period}
                          </span>
                          <p className="mt-5 font-[var(--font-primary)] text-4xl font-black leading-none text-[var(--primary-text-color)]">
                            {String(i + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--secondary-text)]/55">
                            {isCurrent ? "Current Role" : "Milestone"}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="font-[var(--font-primary)] text-xl font-black leading-snug text-[var(--primary-text-color)] sm:text-2xl">
                                {item.role}
                              </h3>
                              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--primary-color)]/10 px-3 py-1.5 text-xs font-black text-[var(--primary-color)]">
                                <MapPin size={14} />
                                {item.org}
                              </p>
                            </div>
                            {isCurrent && (
                              <span className="w-fit rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white">
                                Active
                              </span>
                            )}
                          </div>

                          <p className="mt-5 text-sm font-semibold leading-7 text-[var(--secondary-text)]/72">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </article>
                  </AnimBox>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
