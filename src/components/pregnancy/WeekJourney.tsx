"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { PregnancyWeek, TrimesterGuide } from "@/data/PregnancyGuide";

type WeekJourneyProps = {
  trimesterGuides: TrimesterGuide[];
  pregnancyWeeks: PregnancyWeek[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

function WeekJourney({ trimesterGuides, pregnancyWeeks }: WeekJourneyProps) {
  const [activeTrimester, setActiveTrimester] = useState<string>(
    trimesterGuides[0]?.name ?? "First"
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Syncs the active tab from a #first-trimester style deep link, which is
    // only known once mounted in the browser.
    const hash = window.location.hash.replace("#", "");
    const match = trimesterGuides.find(
      (trimester) => `${trimester.name.toLowerCase()}-trimester` === hash
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL, not derivable during render
    if (match) setActiveTrimester(match.name);
  }, [trimesterGuides]);

  const activeTrimesterGuide = useMemo(
    () =>
      trimesterGuides.find((trimester) => trimester.name === activeTrimester) ??
      trimesterGuides[0],
    [trimesterGuides, activeTrimester]
  );

  const activeWeeks = useMemo(
    () => pregnancyWeeks.filter((week) => week.trimester === activeTrimester),
    [pregnancyWeeks, activeTrimester]
  );

  return (
    <div>
      <div className="rounded-lg border border-[var(--border)]/10 bg-white p-4 shadow-[0_18px_44px_rgba(27,20,99,0.08)]">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pregnancyWeeks.map((week) => {
            const trimester = trimesterGuides.find(
              (item) => item.name === week.trimester
            );

            return (
              <Link
                key={week.week}
                href={`/pregnancy/week/${week.week}`}
                className="grid min-h-[82px] min-w-[132px] content-between rounded-lg border border-[var(--border)]/10 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5"
              >
                <span
                  className="text-3xl font-black leading-none"
                  style={{ color: trimester?.color }}
                >
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

      <div className="mt-8 flex flex-wrap gap-3">
        {trimesterGuides.map((trimester) => {
          const isActive = trimester.name === activeTrimester;

          return (
            <button
              key={trimester.name}
              id={`${trimester.name.toLowerCase()}-trimester`}
              type="button"
              onClick={() => setActiveTrimester(trimester.name)}
              aria-pressed={isActive}
              className="scroll-mt-32 rounded-full border px-5 py-2.5 text-sm font-black transition"
              style={
                isActive
                  ? {
                      backgroundColor: trimester.color,
                      borderColor: trimester.color,
                      color: "#fff",
                    }
                  : {
                      backgroundColor: "#fff",
                      borderColor: "rgba(27,20,99,0.1)",
                      color: "var(--secondary-text)",
                    }
              }
            >
              {trimester.name} Trimester
              <span className="ml-2 opacity-70">{trimester.weeks}</span>
            </button>
          );
        })}
      </div>

      {activeTrimesterGuide && (
        <p
          key={`${activeTrimesterGuide.name}-summary`}
          className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/70"
        >
          {activeTrimesterGuide.summary}
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrimester}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: EASE }}
          className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {activeWeeks.map((week, index) => (
            <motion.div
              key={week.week}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.4),
                ease: EASE,
              }}
            >
              {activeTrimesterGuide && (
                <WeekCard week={week} trimester={activeTrimesterGuide} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
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
    <Link
      href={`/pregnancy/week/${week.week}`}
      className="group block h-full overflow-hidden rounded-[12px] border border-[var(--border)]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(27,20,99,0.10)]"
    >
      <div className="relative aspect-[1.34/1] bg-[var(--background)]">
        <Image
          src={trimester.image}
          alt={`${week.week} weeks pregnant`}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-black text-white shadow-sm"
          style={{ backgroundColor: trimester.color }}
        >
          Week {week.week}
        </span>
      </div>

      <div className="min-h-[166px] px-5 py-5">
        <h3 className="text-[25px] font-black leading-tight text-black">
          {week.week} weeks pregnant
        </h3>

        <p className="mt-4 line-clamp-3 text-[18px] font-medium leading-8 text-[#5f5c55]">
          {week.baby} {week.mother}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)]">
          Read full week guide
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

export default WeekJourney;
