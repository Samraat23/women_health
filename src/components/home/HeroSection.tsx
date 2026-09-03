"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Sparkles,
  Video,
} from "lucide-react";

const doctorPortrait = "/image/dr-kusum-lata-bhardwaj.jpg";
import type { HomeHeroContent } from "@/types/homeContent";

const appointmentHref = "https://wa.me/919289140812";
const headingText = "Compassionate gynecology care for every stage of life.";

type HeroSectionProps = {
  data?: HomeHeroContent;
};

function TypingText({ text, className }: { text: string; className: string }) {
  const words = text.split(" ");
  // Each letter is its own inline-block, so the line box can break between
  // letters. Grouping them per word (with a real space in between) keeps the
  // break opportunities on word boundaries instead of mid-word.
  const wordChunks: Array<{ word: string; offset: number }> = [];

  for (let index = 0, offset = 0; index < words.length; index += 1) {
    wordChunks.push({ word: words[index], offset });
    offset += words[index].length + 1;
  }

  return (
    <span className={className} aria-label={text}>
      {wordChunks.map(({ word, offset }, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((letter, index) => {
              const delay = (offset + index) * 0.022;

              return (
                <motion.span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
          {wordIndex < wordChunks.length - 1 ? " " : null}
        </Fragment>
      ))}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="ml-1 inline-block h-[0.9em] w-1 translate-y-1 rounded-full bg-white"
      />
    </span>
  );
}

function HeroSection({ data }: HeroSectionProps) {
  const hero = data || {
    badge: "Expert Women's Healthcare",
    heading: headingText,
    description:
      "Consult Dr. Kusum Lata Bhardwaj for pregnancy care, infertility support, women's health concerns, and advanced laparoscopic surgery with calm, expert guidance.",
    primaryCtaLabel: "Book Appointment",
    primaryCtaUrl: appointmentHref,
    secondaryCtaLabel: "Instant Video Consultation",
    secondaryCtaUrl: appointmentHref,
    imageUrl: "",
    imageAlt: "Dr. Kusum Lata Bhardwaj",
    doctorName: "Dr. Kusum Lata Bhardwaj (Ex-AIIMS)",
    doctorMeta: "MD, FICOG , FMAS , Endometrosis Surgeon",
  };
  const imageSource = hero.imageUrl || doctorPortrait;

  return (
    <section
      data-nav-surface="dark"
      className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-4 pb-7 pt-6 shadow-[0_28px_70px_rgba(27,20,99,0.20)] sm:px-8 md:px-12 md:py-8 lg:py-12"
      >
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:82px_82px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(247,244,238,0.84)_100%)]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/12 blur-3xl" />

        <div className="relative z-10 mx-auto mt-16 flex max-w-7xl flex-col gap-7 md:mt-20 md:gap-10 lg:min-h-[660px] lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[360px] py-0 text-center text-white md:mx-0 md:max-w-3xl md:py-4 md:text-left lg:w-[54%]"
          >
            {/* Mobile: tighten the hero intro and center it before restoring the original md+ flow. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-black text-(--primary-text-color) shadow-[0_12px_26px_rgba(27,20,99,0.16)] md:gap-2 md:px-4 md:py-2 md:text-sm"
            >
              <Sparkles size={16} className="shrink-0 text-(--primary-color)  " />
              {hero.badge}
            </motion.div>

            <h1 className="mx-auto mt-5 max-w-[340px] break-words font-(--font-primary) text-[2.05rem] font-black leading-[1.12] tracking-normal text-white sm:max-w-[560px] sm:text-[2.65rem] md:mx-0 md:mt-7 md:max-w-3xl md:text-6xl md:leading-[1.08] lg:text-7xl">
              <span className="block md:hidden">{hero.heading || headingText}</span>
              <TypingText
                text={hero.heading || headingText}
                className="hidden md:block"
              />
            </h1>

            <p className="mx-auto mt-4 max-w-[335px] text-[15px] font-semibold leading-6 text-white/82 md:mx-0 md:mt-6 md:max-w-2xl md:text-lg md:leading-8">
              {hero.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.48 }}
              className="mx-auto mt-6 grid w-full max-w-[340px] grid-cols-1 gap-3 md:mx-0 md:mt-8 md:flex md:max-w-none md:flex-row md:flex-wrap md:gap-4"
            >
              {/* Mobile: make both CTAs full-width for cleaner scanning and easier thumb reach. */}
              <a
                href={hero.primaryCtaUrl || appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5 md:w-auto md:px-7 md:py-4"
              >
                <CalendarCheck size={18} />
                {hero.primaryCtaLabel}
              </a>
              <a
                href={hero.secondaryCtaUrl || appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/45 bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-6 py-3.5 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18 md:w-auto md:px-7 md:py-4"
              >
                <Video size={18} />
                {hero.secondaryCtaLabel}
              </a>
             
            </motion.div>

          </motion.div>

          {/* Mobile: shorten and polish the image stage while md+ keeps the original tall portrait card. */}
          <div className="relative min-h-[382px] sm:min-h-[452px] md:min-h-[540px] lg:min-h-[648px] lg:w-[42%] lg:shrink-0">

            <motion.div
              initial={{ opacity: 0, x: 45, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: 0.18,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 bottom-0 mx-auto max-w-[335px] sm:max-w-[380px] md:max-w-[430px] lg:right-0 lg:mx-0 lg:max-w-[500px]"
            >
              <div className="relative h-[360px] overflow-hidden rounded-[30px] border border-white/28 bg-white/14 p-2.5 shadow-[0_24px_54px_rgba(27,20,99,0.22)] backdrop-blur-md sm:h-[430px] md:h-[560px] md:rounded-[36px] md:p-3 md:shadow-[0_30px_70px_rgba(27,20,99,0.24)] lg:h-[610px]">
                <div className="relative h-full overflow-hidden rounded-[24px] bg-[var(--background)] md:rounded-[28px]">
                  <Image
                    src={imageSource}
                    alt={hero.imageAlt || "Dr. Kusum Lata Bhardwaj"}
                    fill
                    priority
                    sizes="(min-width: 1024px) 500px, 92vw"
                    className="object-cover object-[center_18%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,rgba(27,20,99,0)_0%,rgba(27,20,99,0.78)_100%)]" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-3 text-left text-[var(--primary-text-color)] shadow-[0_16px_38px_rgba(27,20,99,0.16)] backdrop-blur-md md:bottom-5 md:left-5 md:right-5 md:rounded-3xl md:p-4">
                    <p className="text-sm font-black md:text-base">
                      {hero.doctorName}
                    </p>
                    <p className="mt-1 text-[11px] font-bold leading-4 text-[var(--secondary-text)]/70 md:text-xs md:leading-normal">
                      {hero.doctorMeta}
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

export default HeroSection;
