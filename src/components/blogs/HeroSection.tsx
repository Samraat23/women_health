"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

import type { BlogPageData } from "@/data/BlogData";
import doctorPortrait from "@/assets/kusummam.jpg";

type HeroSectionProps = {
  data: BlogPageData["hero"];
};

const appointmentHref = "https://wa.me/919289140812";

function TypingText({ text, className }: { text: string; className: string }) {
  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.018,
          },
        },
      }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="ml-1 inline-block h-[0.9em] w-1 translate-y-1 rounded-full bg-white"
      />
    </motion.span>
  );
}

function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative  left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 pb-14 pt-28 shadow-[0_28px_70px_rgba(27,20,99,0.20)] sm:px-8 sm:pt-32 md:px-12 lg:pb-16 lg:pt-36"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:82px_82px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(247,244,238,0.84)_100%)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/12 blur-3xl" />

        <div className="relative  z-10 mx-auto flex max-w-7xl flex-col gap-10   lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl py-4 text-center text-white lg:w-[54%] lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]"
            >
              <Sparkles size={16} className="text-[var(--primary-color)]" />
              {data.badge}
            </motion.div>

            <h1 className="mx-auto mt-5 max-w-4xl font-[var(--font-primary)] text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-5xl">
              <TypingText text={data.title} className="block" />
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-white/82 md:text-lg lg:mx-0">
              Doctor-reviewed women&apos;s health guidance from Dr. Kusum Lata
              Bhardwaj, created to help you understand symptoms, treatment
              options, and the right time to consult.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <MetaCard icon={CalendarDays} label="Updated" value={data.date} />
              <MetaCard icon={Clock3} label="Reading" value={data.readTime} />
              <MetaCard icon={ShieldCheck} label="Status" value={data.status} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.48 }}
              className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <a
                href={appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
              >
                <CalendarCheck size={18} />
                Book Appointment
              </a>
              <a
                href={appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <Video size={18} />
                Instant Video Consultation
              </a>
            </motion.div>
          </motion.div>

          <div className="relative min-h-[500px] lg:min-h-[620px] lg:w-[42%] lg:shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 45, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: 0.18,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 bottom-0 mx-auto max-w-[430px] lg:right-0 lg:mx-0 lg:max-w-[500px]"
            >
              <div className="relative h-[480px] overflow-hidden rounded-[36px] border border-white/28 bg-white/14 p-3 shadow-[0_30px_70px_rgba(27,20,99,0.24)] backdrop-blur-md sm:h-[560px] lg:h-[600px]">
                <div className="relative h-full overflow-hidden rounded-[28px] bg-[var(--background)]">
                  <Image
                    src={doctorPortrait}
                    alt="Dr. Kusum Lata Bhardwaj"
                    fill
                    priority
                    sizes="(min-width: 1024px) 500px, 92vw"
                    className="object-cover object-[center_18%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,rgba(27,20,99,0)_0%,rgba(27,20,99,0.78)_100%)]" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/90 p-4 text-[var(--primary-text-color)] shadow-[0_16px_38px_rgba(27,20,99,0.16)] backdrop-blur-md">
                    <p className="text-base font-black">
                      Dr. Kusum Lata Bhardwaj
                    </p>
                    <p className="mt-1 text-xs font-bold text-[var(--secondary-text)]/70">
                      MBBS, MD OBG, Ex-AIIMS New Delhi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type MetaCardProps = {
  icon: typeof CalendarDays;
  label: string;
  value: string;
};

function MetaCard({ icon: Icon, label, value }: MetaCardProps) {
  return (
    <div className="rounded-2xl border border-white/22 bg-white/12 p-4 text-left shadow-[0_16px_34px_rgba(27,20,99,0.14)] backdrop-blur-md">
      <Icon size={20} className="text-white" />
      <p className="mt-3 text-sm font-black text-white">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
        {label}
      </p>
    </div>
  );
}

export default HeroSection;
