import { Award, BookOpenCheck, GraduationCap } from "lucide-react";

import { AnimBox } from "@/utils/AnimBox";

type QualificationItem = {
  degree: string;
  institute: string;
  year: string;
};

const qualificationIcons = [GraduationCap, BookOpenCheck, Award];

function QualificationsSection({
  qualifications,
}: {
  qualifications: QualificationItem[];
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimBox>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/15 bg-[var(--background)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-color)] shadow-sm">
              <GraduationCap size={16} />
              Education
            </span>
            <h2 className="font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-5xl">
              Qualifications
            </h2>
          </div>
        </AnimBox>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {qualifications.map((q, i) => {
            const Icon = qualificationIcons[i % qualificationIcons.length];

            return (
              <AnimBox key={q.degree} delay={i * 0.1}>
                <article className="group h-full overflow-hidden rounded-[28px] border border-[var(--primary-color)]/10 bg-[var(--background)] p-2 shadow-[0_18px_44px_rgba(27,20,99,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(27,20,99,0.12)]">
                  <div className="relative h-full overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] p-6 text-center">
                    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:54px_54px]" />
                    <div className="relative">
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[var(--primary-color)] shadow-[0_14px_30px_rgba(27,20,99,0.16)] transition group-hover:scale-105">
                        <Icon size={28} />
                      </span>
                      <p className="mt-5 font-[var(--font-primary)] text-3xl font-black text-white">
                        {q.degree}
                      </p>
                      <p className="mt-2 text-sm font-bold leading-6 text-white/78">
                        {q.institute}
                      </p>
                      <p className="mt-3 inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/68">
                        {q.year}
                      </p>
                    </div>
                  </div>
                </article>
              </AnimBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QualificationsSection;
