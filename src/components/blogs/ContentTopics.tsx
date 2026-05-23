"use client";

import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "symptoms", title: "Early pregnancy symptoms" },
  { id: "diet", title: "Healthy pregnancy diet" },
  { id: "exercise", title: "Exercise during pregnancy" },
  { id: "tests", title: "Important prenatal tests" },
  { id: "warning", title: "Warning signs to watch" },
];

function ContentTopics() {
  return (
    <div className="rounded-3xl border border-[#eadfd5] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 font-black text-[var(--primary-text-color)]">
        <BookOpen size={18} />
        Contents
      </div>

      <nav className="space-y-1">
        {sections.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#667085] transition hover:bg-[#f7f4ee] hover:text-[var(--primary-color)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d0d5dd]" />
            {item.title}
          </a>
        ))}
      </nav>

      <div className="mt-6 rounded-2xl bg-[linear-gradient(135deg,var(--primary-text-color),var(--primary-color))] p-4 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-white/55">
          Need help?
        </p>

        <a
          href="https://wa.me/919289140812"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-sm font-black"
        >
          Book appointment <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default ContentTopics;