import { Award, Medal, Trophy } from "lucide-react";

import { AnimBox } from "../../../../utils/AnimBox";

type AwardItem = {
  title: string;
  body: string;
};

const awardIcons = [Trophy, Medal, Award];

function AwardsSection({ awards }: { awards: AwardItem[] }) {
  return (
    <section className="bg-[var(--background)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimBox>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-color)] shadow-sm">
              <Trophy size={16} />
              Recognition
            </span>
            <h2 className="font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-5xl">
              Awards &amp; Achievements
            </h2>
          </div>
        </AnimBox>

        <div className="grid gap-5 lg:grid-cols-3">
          {awards.map((a, i) => {
            const Icon = awardIcons[i % awardIcons.length];

            return (
              <AnimBox key={a.title} delay={i * 0.1}>
                <article className="group h-full rounded-[28px] border border-[var(--primary-color)]/10 bg-white p-6 shadow-[0_18px_44px_rgba(27,20,99,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(27,20,99,0.12)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white shadow-[0_12px_26px_rgba(90,79,254,0.22)] transition group-hover:scale-105">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 font-[var(--font-primary)] text-xl font-black leading-snug text-[var(--primary-text-color)]">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
                    {a.body}
                  </p>
                </article>
              </AnimBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AwardsSection;
