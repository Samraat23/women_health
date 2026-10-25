"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Baby, CalendarCheck, HeartPulse, Sparkles, Syringe, Video } from "lucide-react";

import BookingButton from "@/components/booking/BookingButton";

type PregnancyHeroProps = {
  heroImage: string;
  doctorPortrait: string;
  weeksCount: number;
  trimesterCount: number;
  vaccineCount: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function PregnancyHero({
  heroImage,
  doctorPortrait,
  weeksCount,
  trimesterCount,
  vaccineCount,
}: PregnancyHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const heroStats = [
    { label: "Weeks guided", value: `${weeksCount}`, icon: CalendarCheck },
    { label: "Trimester guides", value: `${trimesterCount}`, icon: HeartPulse },
    { label: "Vaccine guides", value: `${vaccineCount}`, icon: Syringe },
    { label: "Years of care", value: "17+", icon: Sparkles },
  ];

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : delay, ease: EASE },
  });

  return (
    <section
      data-nav-surface="dark"
      className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 py-8 text-white shadow-[0_28px_70px_rgba(27,20,99,0.20)] sm:px-8 md:px-12 lg:py-12"
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:82px_82px]" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -left-20 top-1/3 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_70%)] blur-2xl"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(247,244,238,0.84)_100%)]" />

      <div className="relative z-10 mx-auto mt-20 flex max-w-7xl flex-col gap-10 lg:min-h-[620px] lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl py-4 text-white lg:w-[54%]">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]"
          >
            <Baby size={16} className="text-[var(--primary-color)]" />
            Due-Date &amp; Trimester Tracker
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-7 max-w-3xl font-[var(--font-primary)] text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Pregnancy week by week, made simple.
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/82 md:text-lg"
          >
            Track baby growth from week 1 to {weeksCount}, understand
            trimester care, food, tests and vaccines, and know when to
            consult Dr. Kusum Lata Bhardwaj for safe pregnancy guidance.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <Link
              href="#weekly-guide"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
            >
              <CalendarCheck size={18} />
              Start Weekly Guide
            </Link>
            <BookingButton
              consultationType="video"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
            >
              <Video size={18} />
              Instant Consultation
            </BookingButton>
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {heroStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.38 + index * 0.06,
                    ease: EASE,
                  }}
                  className="rounded-2xl border border-white/22 bg-white/12 p-4 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
                >
                  <Icon size={18} className="text-white/85" />
                  <p className="mt-2 text-2xl font-black leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-white/70">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 36, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.18, ease: EASE }}
          className="relative min-h-[460px] lg:min-h-[590px] lg:w-[42%] lg:shrink-0"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

export default PregnancyHero;
