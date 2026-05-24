// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import kusum from "../../../public/image/ happypatent.jpeg";
// import SymptomsSection from "./Symptoms";
// import Nutrition from "./Nutrition";
// import Exercise from "./Exercise";
// import BloodTest from "./BloodTest";
// import WarningSigns from "./WarningSigns";
// import Author from "./Author";
// import Consultation from "./Consultation";

// function ReadArticle() {
//   return (
//     <div className="space-y-8">
//       <motion.section
//         id="introduction"
//         className=""
//         initial={{ opacity: 0, y: 18 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         <h1 className="text-3xl font-black leading-tight text-[var(--secondary-text)] md:text-4xl">
//           Healthy Pregnancy Tips Every Mother Should Know
//         </h1>

//         <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
//           Pregnancy brings physical, emotional, and lifestyle changes. Timely
//           prenatal care helps protect both mother and baby while making each
//           trimester easier to understand.
//         </p>

//         <div className="relative mt-6 h-[280px] w-full overflow-hidden rounded-2xl md:h-[420px]">
//           <Image
//             src={kusum}
//             alt="Happy pregnancy patient"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         <div className="mt-6 space-y-4 text-base leading-8 text-gray-600">
//           <p>
//             This guide brings the essentials together in one place: symptoms,
//             diet, exercise, testing, warning signs, and when to speak with your
//             gynecologist.
//           </p>

//           <p>
//             A healthy pregnancy journey starts with regular checkups, balanced
//             nutrition, gentle movement, proper rest, and timely medical advice.
//           </p>
//         </div>
//       </motion.section>
//        <SymptomsSection />
//        <Nutrition/>
//        <Exercise/>
//        <BloodTest/>
//        <WarningSigns/>
//        <Author/>
//        <Consultation/>
       
//     </div>
//   );
// }

// export default ReadArticle;


"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  Activity,
  Salad,
  Stethoscope,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import {
  pregnancyBlogData,
  type BlogSection,
  type BlogSectionType,
} from "@/data/BlogData";

import Author from "./Author";
import Consultation from "./Consultation";

const iconMap: Record<BlogSectionType, LucideIcon> = {
  checkList: Check,
  nutrition: Salad,
  cards: Activity,
  timeline: Stethoscope,
  warning: ShieldCheck,
};

type SectionHeaderProps = {
  section: BlogSection;
};

function SectionHeader({ section }: SectionHeaderProps) {
  const Icon = iconMap[section.type];

  return (
    <div className="mb-4 flex items-start gap-4">
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-md"
        style={{ backgroundColor: section.color }}
      >
        <Icon size={27} strokeWidth={2.4} />
      </div>

      <div>
        <p className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-[#5a4ffe]">
          {section.eyebrow}
        </p>

        <h2 className="text-2xl font-black leading-tight text-[#21145f] md:text-3xl">
          {section.title}
        </h2>
      </div>
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
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef] p-5 md:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <SectionHeader section={section} />

      <p className="mb-6 text-base leading-8 text-[#5f6877]">
        {section.paragraph}
      </p>

      {section.type === "checkList" && section.items && (
        <div className="rounded-3xl border border-[#dedaff] bg-white p-4 md:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {section.items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#efedff] text-[#5a4ffe]">
                  <Check size={19} strokeWidth={3} />
                </span>
                <p className="text-sm leading-7 text-[#4f5868]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {section.type === "nutrition" && section.cards && (
        <div className="grid gap-5 md:grid-cols-2">
          {section.cards.map((card) => {
            const positive = card.tone === "positive";

            return (
              <div
                key={card.title}
                className={`rounded-3xl border p-5 ${
                  positive
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <h3
                  className={`mb-4 text-xl font-black ${
                    positive ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {card.title}
                </h3>

                <ul className="space-y-3">
                  {card.items?.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-7 text-[#4f5868]"
                    >
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#4f5868]" />
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
        <div className="grid gap-4 md:grid-cols-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-[#ddd9ff] bg-white p-5"
            >
              <h3 className="mb-3 text-lg font-black text-[#21145f]">
                {card.title}
              </h3>
              <p className="text-sm leading-7 text-[#5f6877]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {section.type === "timeline" && section.timeline && (
        <div className="space-y-4">
          {section.timeline.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#ddd9ff] bg-white p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <span className="inline-flex min-w-[120px] justify-center rounded-xl bg-[#efedff] px-4 py-3 text-sm font-black text-[#5a4ffe]">
                  {item.label}
                </span>

                <div>
                  <h3 className="text-lg font-black text-[#21145f]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-7 text-[#667085]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {section.type === "warning" && section.items && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
          <div className="grid gap-4">
            {section.items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-100 text-red-500">
                  <Check size={20} strokeWidth={3} />
                </span>
                <p className="text-sm leading-7 text-[#7a4343]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

function ReadArticle() {
  const { article, sections, author } = pregnancyBlogData;

  return (
    <div className="space-y-8 font-[var(--font-primary)]">
      <motion.section
        id={article.id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-black leading-tight text-[#21145f] md:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-base leading-8 text-[#5f6877]">
          {article.intro}
        </p>

        <div className="relative mt-6 h-[280px] w-full overflow-hidden rounded-2xl md:h-[420px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-6 space-y-4 text-base leading-8 text-[#5f6877]">
          {article.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </motion.section>

      {sections.map((section) => (
        <DynamicBlogSection key={section.id} section={section} />
      ))}

      <Author data={author} />
      <Consultation />
    </div>
  );
}

export default ReadArticle;