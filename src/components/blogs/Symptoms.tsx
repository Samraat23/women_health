"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, HeartPulse } from "lucide-react";

const symptomsData = {
  id: "symptoms",
  eyebrow: "First Signs",
  title: "Early pregnancy symptoms",
  icon: HeartPulse,
  paragraphs: [
    "Early symptoms vary from person to person. A missed period is common, but many women also notice body changes before a test confirms pregnancy.",
  ],
  bullets: [
    "Missed or delayed menstrual period",
    "Nausea, vomiting, or morning sickness",
    "Unusual tiredness and low energy",
    "Breast tenderness or swelling",
    "Frequent urination",
    "Mood changes or heightened emotions",
    "Mild cramping or light spotting",
  ],
};

function SymptomsSection({ data = symptomsData }) {
  return (
    <motion.section
      id={data.id}
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-4">
        <div>
          <h2 className="text-2xl font-black leading-tight text-[#21145f] md:text-4xl">
            {data.title}
          </h2>
        </div>
      </div>

      <div className="my-5 text-base leading-8 text-[#5f6877] md:text-lg">
        {data.paragraphs?.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>

      <div className="rounded-3xl border border-[#dedaff] bg-white p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {data.bullets?.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#efedff] text-[#5a4ffe]">
                <Check size={20} strokeWidth={3} />
              </span>

              <p className="text-sm leading-7 text-[#4f5868] md:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default SymptomsSection;
