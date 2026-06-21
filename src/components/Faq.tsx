"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

type Question = {
  id: string;
  question: string;
  answer: string;
};

type FAQData = {
  questions: Question[];
};

interface FAQProps {
  data: FAQData;
}

export default function Faq({ data }: FAQProps) {
  const [active, setActive] = useState<string | null>("1");

  const headingObj = {
    heading: "Frequently Asked",
    bold: "Questions",
    paragraph:
      "Find answers to common questions about women's health, pregnancy care, and gynecological treatments.",
  };

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader headingObj={headingObj} />

        <div className="space-y-4">
          {data.questions.map((item) => {
            const isOpen = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className="w-full rounded-2xl border border-[var(--border)]/10 bg-white px-6 py-5 text-left shadow-sm transition hover:border-[var(--primary-color)]/25"
                onClick={() => setActive(isOpen ? null : item.id)}
                aria-expanded={isOpen}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-[var(--font-primary)] font-black text-[var(--primary-text-color)]">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`shrink-0 text-[var(--primary-color)] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>

                <span
                  className={`block overflow-hidden transition-all duration-300 ${
                    isOpen ? "mt-3 max-h-44" : "max-h-0"
                  }`}
                >
                  <span className="block text-sm leading-7 text-[#667085]">
                    {item.answer}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
