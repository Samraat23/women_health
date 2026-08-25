
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  HeartPulse,
  Salad,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import {
  type BlogPageData,
  type BlogSection,
  type BlogSectionType,
} from "@/data/BlogData";

import ArticleFaq from "./ArticleFaq";
import Author from "./Author";
import Consultation from "./Consultation";

const iconMap: Record<BlogSectionType, LucideIcon> = {
  checkList: Check,
  nutrition: Salad,
  cards: Sparkles,
  timeline: HeartPulse,
  warning: TriangleAlert,
};

type SectionHeaderProps = {
  section: BlogSection;
};

function SectionHeader({ section }: SectionHeaderProps) {
  const Icon = iconMap[section.type];

  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 md:mb-4">
      <span
        className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white shadow-sm md:h-7 md:w-7"
        style={{ backgroundColor: section.color }}
      >
        <Icon size={13} strokeWidth={2.6} />
      </span>

      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#5a4ffe] md:text-[11px]">
        {section.eyebrow}
      </span>

      {/* Sole H2 level for the page: only real article sections carry it. */}
      <h2 className="min-w-0 text-lg font-black leading-snug text-[#21145f] sm:text-xl md:text-[1.375rem]">
        {section.title}
      </h2>
    </div>
  );
}

type DynamicBlogSectionProps = {
  section: BlogSection;
};

function DynamicBlogSection({ section }: DynamicBlogSectionProps) {
  return (
    <motion.section
      id={section.id}
      className="scroll-mt-28 rounded-2xl bg-[#f8f5ef] p-4 md:rounded-3xl md:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <SectionHeader section={section} />

      <p className="mb-3 text-[15px] leading-7 text-[#5f6877] md:mb-4 md:text-base md:leading-8">
        {section.paragraph}
      </p>

      {section.paragraphs?.map((text) => (
        <p
          key={text}
          className="mb-3 text-[15px] leading-7 text-[#5f6877] md:mb-4 md:text-base md:leading-8"
        >
          {text}
        </p>
      ))}

      <div className="mb-5" />

      {section.type === "checkList" && section.items && (
        <div className="rounded-2xl border border-[#dedaff] bg-white p-4 md:p-5">
          <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#efedff] text-[#5a4ffe]">
                  <Check size={11} strokeWidth={3.5} />
                </span>
                <p className="text-sm leading-6 text-[#4f5868]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {section.type === "nutrition" && section.cards && (
        <div className="grid gap-3 md:grid-cols-2">
          {section.cards.map((card) => {
            const positive = card.tone === "positive";

            return (
              <div
                key={card.title}
                className={`rounded-2xl border p-4 md:p-5 ${
                  positive
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <h3
                  className={`mb-3 text-base font-black md:text-lg ${
                    positive ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {card.title}
                </h3>

                <ul className="space-y-2.5">
                  {card.items?.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-6 text-[#4f5868]"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4f5868]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {section.type === "cards" && section.cards && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[#ddd9ff] bg-white p-4 transition hover:border-[#5a4ffe]/30"
            >
              <h3 className="mb-1.5 text-[15px] font-black leading-snug text-[#21145f]">
                {card.title}
              </h3>
              <p className="text-sm leading-6 text-[#5f6877]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {section.type === "timeline" && section.timeline && (
        <div className="space-y-3">
          {section.timeline.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#ddd9ff] bg-white p-4"
            >
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4">
                <span className="inline-flex w-fit shrink-0 rounded-lg bg-[#efedff] px-3 py-1.5 text-xs font-black text-[#5a4ffe] sm:min-w-[108px] sm:justify-center">
                  {item.label}
                </span>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-black leading-snug text-[#21145f]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#667085]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {section.type === "warning" && section.items && (
        <div className="rounded-2xl border border-red-200/80 bg-red-50/70 p-4 md:p-5">
          <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <AlertCircle
                  size={15}
                  strokeWidth={2.6}
                  className="mt-[4px] shrink-0 text-red-500"
                />
                <p className="text-sm leading-6 text-[#7a4343]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

type ReadArticleProps = {
  data: BlogPageData;
};

function ReadArticle({ data }: ReadArticleProps) {
  const { article, sections, faqs, faqTitle, author } = data;

  return (
    <div className="space-y-5 font-[var(--font-primary)] md:space-y-8">
      <motion.section
        id={article.id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Hero already renders the page H1; repeating it here gave every
            article two H1s. Same styling, no heading level. */}
        <p className="text-[1.6rem] font-black leading-tight text-[#21145f] sm:text-3xl md:text-4xl">
          {article.title}
        </p>

        <p className="mt-3 text-[15px] leading-7 text-[#5f6877] md:mt-4 md:text-base md:leading-8">
          {article.intro}
        </p>

        <div className="relative mt-5 h-[210px] w-full overflow-hidden rounded-xl sm:h-[300px] md:mt-6 md:h-[400px] md:rounded-2xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-5 space-y-3 text-[15px] leading-7 text-[#5f6877] md:mt-6 md:space-y-4 md:text-base md:leading-8">
          {article.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </motion.section>

      {sections.map((section) => (
        <DynamicBlogSection key={section.id} section={section} />
      ))}

      {faqs?.length ? <ArticleFaq faqs={faqs} title={faqTitle} /> : null}

      <Author data={author} />
      <Consultation />
    </div>
  );
}

export default ReadArticle;
