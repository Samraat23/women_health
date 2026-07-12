import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  Leaf,
  Salad,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Video,
} from "lucide-react";

import doctorPortrait from "@/assets/kusummam.jpg";
import {
  foodPillars,
  getTrimesterGuide,
  pregnancyWeeks,
  trimesterGuides,
  vaccineGuides,
  type PregnancyWeek,
  type TrimesterGuide,
} from "@/data/PregnancyGuide";

export const metadata: Metadata = {
  title: "Pregnancy Week by Week Care | Dr. Kusum Lata",
  description:
    "A complete pregnancy page covering week 1 to 41, trimester care, food guidance, tests, vaccines and warning signs.",
};

const appointmentHref = "https://wa.me/919289140812";
const heroImage =
  "https://images.unsplash.com/photo-1617184896380-579b1fa760aa?auto=format&fit=crop&q=80&w=1400";

const weeklySections = trimesterGuides.map((trimester) => ({
  trimester,
  weeks: pregnancyWeeks.filter((week) => week.trimester === trimester.name),
}));

export default function PregnancyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--secondary-text)]">
      <section className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 py-8 text-white shadow-[0_28px_70px_rgba(27,20,99,0.20)] sm:px-8 md:px-12 lg:py-12">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:82px_82px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(247,244,238,0.84)_100%)]" />

        <div className="relative z-10 mx-auto mt-20 flex max-w-7xl flex-col gap-10 lg:min-h-[620px] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl py-4 text-white lg:w-[54%]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
              <Baby size={16} className="text-[var(--primary-color)]" />
              Due-Date & Trimester Tracker
            </div>

            <h1 className="mt-7 max-w-3xl font-[var(--font-primary)] text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Pregnancy week by week, made simple.
            </h1>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/82 md:text-lg">
              Track baby growth from week 1 to 41, understand trimester care,
              food, tests and vaccines, and know when to consult Dr. Kusum Lata
              Bhardwaj for safe pregnancy guidance.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="#weekly-guide"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
              >
                <CalendarCheck size={18} />
                Start Weekly Guide
              </Link>
              <Link
                href={appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <Video size={18} />
                Instant Consultation
              </Link>
            </div>
          </div>

          <div className="relative min-h-[460px] lg:min-h-[590px] lg:w-[42%] lg:shrink-0">
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[430px] lg:right-0 lg:mx-0 lg:max-w-[500px]">
              <div className="relative h-[430px] overflow-hidden rounded-[36px] border border-white/28 bg-white/14 p-3 shadow-[0_30px_70px_rgba(27,20,99,0.24)] backdrop-blur-md sm:h-[500px] lg:h-[560px]">
                <div className="relative h-full overflow-hidden rounded-[28px] bg-[var(--background)]">
                  <Image
                    src={heroImage}
                    alt="Pregnancy week by week care"
                    fill
                    priority
                    sizes="(min-width: 1024px) 500px, 92vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,rgba(27,20,99,0)_0%,rgba(27,20,99,0.78)_100%)]" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/92 p-4 text-[var(--primary-text-color)] shadow-[0_16px_38px_rgba(27,20,99,0.16)] backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[var(--background)]">
                        <Image
                          src={doctorPortrait}
                          alt="Dr. Kusum Lata Bhardwaj"
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-base font-black">
                          Dr. Kusum Lata Bhardwaj
                        </p>
                        <p className="mt-1 text-xs font-bold text-[var(--secondary-text)]/70">
                          Pregnancy care, scans, food and vaccine guidance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-4 pb-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {trimesterGuides.map((trimester) => (
            <TrimesterOverviewCard key={trimester.name} trimester={trimester} />
          ))}
        </div>
      </section>

      <section id="weekly-guide" className="px-4 pb-16 md:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[var(--primary-color)] shadow-sm">
                <Baby size={16} />
                My pregnancy week by week
              </div>
              <h2 className="mt-4 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl lg:text-5xl">
                My pregnancy week by week
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
                Simple cards for every week with baby development, mother
                changes, and a food focus. Pick your current week or browse by
                trimester.
              </p>
            </div>
            <Link
              href="#vaccine-care"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[rgba(90,79,254,0.08)] px-5 py-3 text-sm font-black text-[var(--primary-color)] transition hover:bg-[rgba(90,79,254,0.14)]"
            >
              Vaccine Schedule
              <ChevronRight size={17} />
            </Link>
          </div>

          <div className="rounded-lg border border-[var(--border)]/10 bg-white p-4 shadow-[0_18px_44px_rgba(27,20,99,0.08)]">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pregnancyWeeks.map((week) => {
                const trimester = getTrimesterGuide(week.trimester);

                return (
                  <Link
                    key={week.week}
                    href={`#week-${week.week}`}
                    className="grid min-h-[82px] min-w-[132px] content-between rounded-lg border border-[var(--border)]/10 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5"
                  >
                    <span className="text-3xl font-black leading-none" style={{ color: trimester.color }}>
                      {week.week}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--secondary-text)]/62">
                      weeks pregnant
                    </span>
                    <span className="truncate text-xs font-semibold text-[var(--secondary-text)]/70">
                      {week.size}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {weeklySections.map(({ trimester, weeks }) => (
        <WeekGridSection
          key={trimester.name}
          trimester={trimester}
          weeks={weeks}
        />
      ))}

      <section id="trimester-care" className="bg-white/60 px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,118,110,0.10)] px-4 py-2 text-xs font-black text-[#0f766e]">
              <Stethoscope size={16} />
              Trimester Care
            </div>
            <h2 className="mx-auto mt-4 max-w-3xl font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl">
              Tests, food and care points by trimester
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {trimesterGuides.map((trimester) => (
              <TrimesterCareCard key={trimester.name} trimester={trimester} />
            ))}
          </div>
        </div>
      </section>

      <section id="food-care" className="px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(190,24,93,0.10)] px-4 py-2 text-xs font-black text-[#be185d]">
              <Salad size={16} />
              Pregnancy Food
            </div>
            <h2 className="mt-4 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl">
              Food guidance that follows the pregnancy stage
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
              Food needs change as nausea, growth, heartburn and baby weight
              change. The page gives weekly food focus, while these pillars keep
              the daily plate simple.
            </p>
            <p className="mt-4 rounded-lg bg-white p-4 text-sm font-bold leading-7 text-[var(--secondary-text)]/76 shadow-sm">
              Ask before taking extra supplements. Iron, calcium, vitamin D,
              thyroid medicine and nausea medicine may need timing separation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {foodPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className="rounded-lg border border-[var(--border)]/10 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(90,79,254,0.08)] text-[var(--primary-color)]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[var(--primary-text-color)]">
                    {pillar.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[var(--background)] px-3 py-1.5 text-xs font-black text-[var(--secondary-text)]/72"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="vaccine-care" className="px-4 pb-16 md:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--primary-text-color),var(--secondary-color))] p-6 text-white shadow-[0_24px_70px_rgba(27,20,99,0.18)] md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[var(--primary-text-color)]">
                <Syringe size={16} className="text-[var(--primary-color)]" />
                Vaccine Care
              </div>
              <h2 className="mt-4 font-[var(--font-primary)] text-3xl font-black leading-tight sm:text-4xl">
                Vaccines to discuss during pregnancy
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-white/74">
                Timing depends on season, medical history and current guidance.
                Confirm every vaccine with your obstetrician before taking it.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {vaccineGuides.map((vaccine) => {
                const Icon = vaccine.icon;

                return (
                  <article
                    key={vaccine.name}
                    className="rounded-lg border border-white/18 bg-white/10 p-5 backdrop-blur-md"
                  >
                    <Icon size={24} className="text-white" />
                    <h3 className="mt-4 text-xl font-black text-white">
                      {vaccine.name}
                    </h3>
                    <p className="mt-2 text-sm font-black text-white/88">
                      {vaccine.timing}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-7 text-white/70">
                      {vaccine.note}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-[var(--border)]/10 bg-white p-6 shadow-sm md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(220,38,38,0.10)] px-4 py-2 text-xs font-black text-[#dc2626]">
              <ShieldCheck size={16} />
              Urgent Signs
            </div>
            <h2 className="mt-4 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)]">
              Call your doctor urgently if these happen
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                "Heavy bleeding or severe abdominal pain",
                "Severe headache, vision changes or sudden swelling",
                "Fever, breathlessness or chest pain",
                "Persistent vomiting or dehydration",
                "Water leakage before labor",
                "Reduced or absent baby movements after they become regular",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-[var(--background)] p-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#dc2626]" />
                  <span className="text-sm font-bold leading-6 text-[var(--secondary-text)]/78">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <Leaf size={28} className="text-[#0f766e]" />
            <h3 className="mt-4 text-2xl font-black leading-tight text-[var(--primary-text-color)]">
              Personalized pregnancy care
            </h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
              Every pregnancy is different. Use this page as a guide, then bring
              your week, reports and questions to the consultation.
            </p>
            <Link
              href={appointmentHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-6 py-3 text-sm font-black text-white shadow-[0_12px_26px_rgba(90,79,254,0.24)] transition hover:-translate-y-0.5"
            >
              Book Pregnancy Consultation
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function TrimesterOverviewCard({ trimester }: { trimester: TrimesterGuide }) {
  return (
    <Link href={`#${trimester.name.toLowerCase()}-trimester`} className="group block">
      <article className="overflow-hidden rounded-[18px] border border-[var(--border)]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(27,20,99,0.10)]">
        <div className="relative aspect-[1.35/1] bg-[var(--background)]">
          <Image
            src={trimester.image}
            alt={`${trimester.name} trimester pregnancy`}
            fill
            sizes="(min-width: 1024px) 400px, 92vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,99,0)_44%,rgba(27,20,99,0.58)_100%)]" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-black" style={{ color: trimester.color }}>
            {trimester.weeks}
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-black leading-tight text-black">
            {trimester.name} Trimester
          </h2>
          <p className="mt-3 line-clamp-3 text-base font-semibold leading-7 text-[#5f5c55]">
            {trimester.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black" style={{ color: trimester.color }}>
            View weeks
            <ArrowRight size={17} />
          </span>
        </div>
      </article>
    </Link>
  );
}

function WeekGridSection({
  trimester,
  weeks,
}: {
  trimester: TrimesterGuide;
  weeks: PregnancyWeek[];
}) {
  return (
    <section
      id={`${trimester.name.toLowerCase()}-trimester`}
      className="px-4 pb-16 md:px-6 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: trimester.color }}>
            {trimester.weeks}
          </p>
          <h2 className="mt-3 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl">
            {trimester.name} Trimester of Pregnancy
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {weeks.map((week) => (
            <WeekCard key={week.week} week={week} trimester={trimester} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WeekCard({
  week,
  trimester,
}: {
  week: PregnancyWeek;
  trimester: TrimesterGuide;
}) {
  return (
    <article
      id={`week-${week.week}`}
      className="scroll-mt-32 overflow-hidden rounded-[12px] border border-[var(--border)]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(27,20,99,0.10)]"
    >
      <div className="relative aspect-[1.34/1] bg-[var(--background)]">
        <Image
          src={trimester.image}
          alt={`${week.week} weeks pregnant`}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="min-h-[166px] px-5 py-5">
        <h3 className="text-[25px] font-black leading-tight text-black">
          {week.week} weeks pregnant
        </h3>

        <p className="mt-4 line-clamp-3 text-[18px] font-medium leading-8 text-[#5f5c55]">
          {week.baby} {week.mother}
        </p>
      </div>
    </article>
  );
}

function TrimesterCareCard({ trimester }: { trimester: TrimesterGuide }) {
  return (
    <article className="rounded-lg border border-[var(--border)]/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: trimester.color }}>
            {trimester.weeks}
          </p>
          <h3 className="mt-1 text-2xl font-black text-[var(--primary-text-color)]">
            {trimester.name} Trimester
          </h3>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: trimester.softColor, color: trimester.color }}>
          <HeartPulse size={23} />
        </span>
      </div>

      <CareList title="Care focus" items={trimester.keyCare} />
      <CareList title="Common tests" items={trimester.tests} />
      <CareList title="Food direction" items={trimester.food} />
    </article>
  );
}

function CareList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-black text-[var(--primary-text-color)]">
        {title}
      </p>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#0f766e]" />
            <span className="text-sm font-semibold leading-6 text-[var(--secondary-text)]/70">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
