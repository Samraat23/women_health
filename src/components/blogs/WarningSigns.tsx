"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

const warningData = {
  id: "warning",
  eyebrow: "Urgent Signs",
  title: "Warning signs to watch",
  icon: ShieldCheck,
  paragraph:
    "Some symptoms need prompt medical attention. Contact your doctor immediately if you notice any of the following.",

  bullets: [
    "Heavy bleeding or unusual vaginal discharge",
    "Severe abdominal pain or persistent cramping",
    "Sudden swelling of hands, face, or feet",
    "Severe headache or vision changes",
    "Reduced or absent fetal movement after 28 weeks",
    "High fever above 38 C / 100.4 F",
    "Breathing difficulty or chest pain",
  ],
};

function WarningSigns({ data = warningData }) {
  const Icon = data.icon;

  return (
    <motion.section
      id={data.id}
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef] "
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <div className="mb-6 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#ef4444] text-white shadow-lg shadow-red-200/60 ">
          <Icon size={28} strokeWidth={2.4} />
        </div>

        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#5a4ffe]">
            {data.eyebrow}
          </p>

          <h2 className="text-2xl font-black leading-tight text-[#21145f] ">
            {data.title}
          </h2>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6  text-base leading-8 text-gray-600">
        {data.paragraph}
      </p>

      {/* Warning Box */}
      <div className="rounded-3xl border border-red-200 bg-red-50 p-5 ">
        <div className="grid gap-y-4">
          {data.bullets.map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-100 text-red-500">
                <Check size={24} strokeWidth={3} />
              </span>

              <p className="text-base leading-8 text-[#7a4343] md:text-lg">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default WarningSigns;