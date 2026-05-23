"use client";

import React from "react";
import { motion } from "framer-motion";
import { Salad } from "lucide-react";

const nutritionData = {
  id: "diet",
  eyebrow: "Nutrition",
  title: "Healthy pregnancy diet",
  icon: Salad,
  paragraph:
    "Pregnancy nutrition is about nutrient density, hydration, and consistency. Choose fresh foods that support baby growth while helping with energy, digestion, and healthy weight gain.",
  cards: [
    {
      title: "Eat more of",
      tone: "positive",
      items: [
        "Leafy greens and seasonal fruits",
        "Iron-rich lentils, beans, and spinach",
        "Protein from eggs, fish, chicken, paneer, or tofu",
        "Calcium from milk, curd, yogurt, and paneer",
        "Whole grains and complex carbohydrates",
        "Water through the day, around 2.5 to 3 L if allowed",
      ],
    },
    {
      title: "Avoid or limit",
      tone: "warning",
      items: [
        "Alcohol and tobacco",
        "Raw or undercooked meat, eggs, and seafood",
        "Excess caffeine",
        "Unpasteurized dairy",
        "High-mercury fish",
        "Very sugary drinks and frequent junk food",
      ],
    },
  ],
};

function Nutrition({ data = nutritionData }) {
  const Icon = data.icon;

  return (
    <motion.section
      id={data.id}
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef] p-5 md:p-7"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#10b981] text-white shadow-lg shadow-emerald-200/60 md:h-16 md:w-16">
          <Icon size={28} strokeWidth={2.4} />
        </div>

        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#5a4ffe]">
            {data.eyebrow}
          </p>

          <h2 className="text-2xl font-black leading-tight text-[#21145f] md:text-4xl">
            {data.title}
          </h2>
        </div>
      </div>

      <p className="mb-7 text-base leading-8 text-[#5f6877] md:text-lg">
        {data.paragraph}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {data.cards.map((card) => {
          const isPositive = card.tone === "positive";

          return (
            <div
              key={card.title}
              className={`rounded-3xl border p-5 shadow-sm md:p-6 ${
                isPositive
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <h3
                className={`mb-5 text-xl font-black md:text-2xl ${
                  isPositive ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {card.title}
              </h3>

              <ul className="space-y-4">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-[#4f5868] md:text-base"
                  >
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#4f5868]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default Nutrition;