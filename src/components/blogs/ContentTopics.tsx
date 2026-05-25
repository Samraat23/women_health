"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { BlogSection } from "@/data/BlogData";

type ContentTopicsProps = {
  articleId: string;
  articleTitle: string;
  sections: BlogSection[];
};

function ContentTopics({
  articleId,
  articleTitle,
  sections,
}: ContentTopicsProps) {
  const [activeSection, setActiveSection] = useState(articleId);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const topics = useMemo(
    () => [
      { id: articleId, title: "Introduction" },
      ...sections.map((section) => ({
        id: section.id,
        title: section.title,
      })),
    ],
    [articleId, sections]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -60% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    topics.forEach((topic) => {
      const element = document.getElementById(topic.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [topics]);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm">
      <motion.div
        className="h-1 bg-[var(--primary-color)]"
        style={{ width, transformOrigin: "left" }}
      />

      <div className="p-5">
        <div className="mb-4 flex items-center gap-2 font-black text-[var(--primary-text-color)]">
          <BookOpen size={18} />
          Contents
        </div>

        <p className="mb-4 line-clamp-2 text-sm font-semibold leading-6 text-[#667085]">
          {articleTitle}
        </p>

        <nav className="space-y-1">
          {topics.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-[rgba(90,79,254,0.1)] font-bold text-[var(--primary-color)]"
                    : "text-[#667085] hover:bg-[#f7f4ee] hover:text-[var(--primary-color)]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-[var(--primary-color)]" : "bg-[#d0d5dd]"
                  }`}
                />
                {item.title}
              </a>
            );
          })}
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
    </div>
  );
}

export default ContentTopics;
