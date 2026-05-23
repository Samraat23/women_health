"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

const prenatalTestsData = {
  id: "tests",
  eyebrow: "Medical Care",
  title: "Important prenatal tests",
  icon: Stethoscope,
  paragraph:
    "Prenatal tests help confirm dates, screen for common risks, and monitor baby development. Your doctor may adjust this schedule depending on your history and pregnancy needs.",
  timeline: [
    {
      label: "6-8 wks",
      title: "Dating ultrasound",
      description: "Confirms pregnancy, heartbeat, and estimated due date.",
    },
    {
      label: "11-14 wks",
      title: "NT scan and blood tests",
      description: "Screens for selected chromosomal risks.",
    },
    {
      label: "18-20 wks",
      title: "Anomaly scan",
      description: "Checks baby anatomy in detail.",
    },
    {
      label: "24-28 wks",
      title: "Glucose tolerance test",
      description: "Screens for gestational diabetes.",
    },
    {
      label: "36+ wks",
      title: "Late pregnancy review",
      description: "Assesses delivery readiness and fetal wellbeing.",
    },
  ],
};

function BloodTest({ data = prenatalTestsData }) {
  const Icon = data.icon;

  return (
    <motion.section
      id={data.id}
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef] p-5 md:p-7"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <div className="mb-4 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0  place-items-center rounded-2xl bg-[#6366f1] text-white shadow-lg ">
          <Icon size={28} strokeWidth={2.4} />
        </div>

        <div>
          <p className=" text-xs font-black uppercase tracking-[0.25em] text-[#5a4ffe]">
            {data.eyebrow}
          </p>

          <h2 className="text-2xl font-black leading-tight text-(--secondary-text)">
            {data.title}
          </h2>
        </div>
      </div>

      {/* Paragraph */}
      <p className="mb-6 text-base text-gray-600">
        {data.paragraph}
      </p>

      {/* Timeline */}
      <div className="space-y-4">
        {data.timeline.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-[#ddd9ff] bg-white p-5 shadow-sm "
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <span className="inline-flex w-fit min-w-[140px] items-center justify-center rounded-xl bg-[#efedff] px-5 py-3 text-sm font-black text-[#5a4ffe]">
                {item.label}
              </span>

              <div>
                <h3 className="text-lg font-black text-[#21145f] md:text-xl">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#667085] md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default BloodTest;