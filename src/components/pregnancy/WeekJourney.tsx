"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import type { PregnancyWeek, TrimesterGuide } from "@/data/PregnancyGuide";

import WeekSizeBadge from "./WeekSizeBadge";

type WeekJourneyProps = {
  trimesterGuides: TrimesterGuide[];
  pregnancyWeeks: PregnancyWeek[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

function WeekJourney({ trimesterGuides, pregnancyWeeks }: WeekJourneyProps) {
  const totalWeeks = pregnancyWeeks.length;
  const [selectedWeek, setSelectedWeek] = useState(1);
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

  const selectedWeekData = useMemo(
    () =>
      pregnancyWeeks.find((week) => week.week === selectedWeek) ??
      pregnancyWeeks[0],
    [pregnancyWeeks, selectedWeek]
  );

  const selectedTrimesterGuide = useMemo(
    () =>
      trimesterGuides.find(
        (trimester) => trimester.name === selectedWeekData?.trimester
      ) ?? trimesterGuides[0],
    [trimesterGuides, selectedWeekData]
  );

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

  function selectWeek(weekNumber: number) {
    const clamped = Math.min(Math.max(weekNumber, 1), totalWeeks);
    setSelectedWeek(clamped);
  }

  if (!selectedWeekData || !selectedTrimesterGuide) return null;

  return (
    <div>
      {/* Interactive week explorer: a single spotlight card that updates in
          place as a week is selected, via the slider, arrows or pills. */}
      <div className="rounded-2xl border border-[var(--border)]/10 bg-white p-5 shadow-[0_18px_44px_rgba(27,20,99,0.08)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--secondary-text)]/55">
              Explore a pregnancy week
            </p>
            <p
              className="mt-1 text-sm font-black"
              style={{ color: selectedTrimesterGuide.color }}
            >
              {selectedTrimesterGuide.name} Trimester &middot; Week{" "}
              {selectedWeek} of {totalWeeks}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => selectWeek(selectedWeek - 1)}
              disabled={selectedWeek <= 1}
              aria-label="Previous week"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)]/15 text-[var(--primary-text-color)] transition hover:bg-[var(--background)] disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => selectWeek(selectedWeek + 1)}
              disabled={selectedWeek >= totalWeeks}
              aria-label="Next week"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)]/15 text-[var(--primary-text-color)] transition hover:bg-[var(--background)] disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={totalWeeks}
          value={selectedWeek}
          onChange={(event) => selectWeek(Number(event.target.value))}
          style={{ accentColor: selectedTrimesterGuide.color }}
          className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--background)]"
          aria-label="Select pregnancy week"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedWeek}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE }}
            className="mt-6 grid gap-6 md:grid-cols-[auto_1fr]"
          >
            <div className="flex flex-row items-center gap-4 md:flex-col md:items-start">
              <WeekSizeBadge
                week={selectedWeek}
                totalWeeks={totalWeeks}
                color={selectedTrimesterGuide.color}
                sizeLabel={selectedWeekData.size}
                size={96}
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--secondary-text)]/55">
                  Baby is about
                </p>
                <p
                  className="text-lg font-black"
                  style={{ color: selectedTrimesterGuide.color }}
                >
                  {selectedWeekData.size}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black leading-tight text-[var(--primary-text-color)] sm:text-2xl">
                Week {selectedWeek}: {selectedWeekData.focus}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-[var(--secondary-text)]/75">
                {selectedWeekData.baby}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-[var(--background)] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[var(--secondary-text)]/55">
                    Mother&apos;s body
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-[var(--secondary-text)]/78">
                    {selectedWeekData.mother}
                  </p>
                </div>
                <div className="rounded-xl bg-[var(--background)] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[var(--secondary-text)]/55">
                    Food focus
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-[var(--secondary-text)]/78">
                    {selectedWeekData.food}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedWeekData.checklist.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)]/12 bg-white px-3 py-1.5 text-xs font-black text-[var(--secondary-text)]/72"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href={`/pregnancy/week/${selectedWeek}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)]"
              >
                Read full week guide
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {pregnancyWeeks.map((week) => {
            const isSelected = week.week === selectedWeek;
            const trimester = trimesterGuides.find(
              (item) => item.name === week.trimester
            );

            return (
              <button
                key={week.week}
                type="button"
                onClick={() => selectWeek(week.week)}
                aria-pressed={isSelected}
                aria-label={`Week ${week.week}`}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black transition"
                style={
                  isSelected
                    ? { backgroundColor: trimester?.color, color: "#fff" }
                    : {
                        backgroundColor: "var(--background)",
                        color: "var(--secondary-text)",
                      }
                }
              >
                {week.week}
              </button>
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
                <WeekCard
                  week={week}
                  trimester={activeTrimesterGuide}
                  totalWeeks={totalWeeks}
                  onPreview={selectWeek}
                />
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
  totalWeeks,
  onPreview,
}: {
  week: PregnancyWeek;
  trimester: TrimesterGuide;
  totalWeeks: number;
  onPreview: (week: number) => void;
}) {
  return (
    <Link
      href={`/pregnancy/week/${week.week}`}
      onMouseEnter={() => onPreview(week.week)}
      onFocus={() => onPreview(week.week)}
      className="group block h-full overflow-hidden rounded-[12px] border border-[var(--border)]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(27,20,99,0.10)]"
    >
      <div
        className="relative flex aspect-[1.34/1] flex-col items-center justify-center gap-2 overflow-hidden transition duration-300 group-hover:scale-[1.02]"
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, ${trimester.softColor}, var(--background))`,
        }}
      >
        <WeekSizeBadge
          week={week.week}
          totalWeeks={totalWeeks}
          color={trimester.color}
          sizeLabel={week.size}
          size={64}
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

        <p className="mt-1 text-sm font-black" style={{ color: trimester.color }}>
          {week.size}
        </p>

        <p className="mt-3 line-clamp-3 text-[18px] font-medium leading-8 text-[#5f5c55]">
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
