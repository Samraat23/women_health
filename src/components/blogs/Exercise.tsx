"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const exerciseData = {
  id: "exercise",
  eyebrow: "Movement",
  title: "Exercise during pregnancy",
  icon: Activity,
  paragraph:
    "Light, regular movement can improve circulation, mood, sleep, back discomfort, and stamina. Begin only after your doctor confirms what is suitable for your pregnancy.",

  cards: [
    {
      title: "Walking",
      description:
        "A simple 20 to 30 minute routine that can work across most trimesters.",
    },
    {
      title: "Prenatal yoga",
      description:
        "Supports flexibility, breathing, posture, and stress control.",
    },
    {
      title: "Swimming",
      description:
        "A low-impact option that can reduce pressure on joints and swelling.",
    },
  ],
};

function Exercise({ data = exerciseData }) {
  const Icon = data.icon;

  return (
    <motion.section
      id={data.id}
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef]  md:p-7"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <div className="flex mb-4 items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#f4a100] text-white shadow-lg shadow-yellow-200">
          <Icon size={28} strokeWidth={2.4} />
        </div>

        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#5a4ffe]">
            {data.eyebrow}
          </p>

          <h2 className="text-2xl font-black leading-tight text-(--secondary-text)">
            {data.title}
          </h2>
        </div>
      </div>

      {/* Paragraph */}
      <p className=" mb-4 text-gray-600">
        {data.paragraph}
      </p>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {data.cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl  border border-[#ddd9ff] bg-white "
          >
            <h3 className=" text-(--secondary-text) p-2 text-center text-xl font-black ">
              {card.title}
            </h3>

            <p className="text-base px-3 py-2 text-gray-600">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default Exercise;