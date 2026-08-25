"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion } from "framer-motion";

import type { BlogFaq } from "@/data/BlogData";

type ArticleFaqProps = {
  faqs: BlogFaq[];
  title?: string;
};

/**
 * FAQ block for an article page. Styled to match the other article sections
 * rather than reusing the home page FAQ, which is a full-width layout with a
 * fixed answer height that clips longer answers.
 */
function ArticleFaq({
  faqs,
  title = "Your questions answered",
}: ArticleFaqProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (!faqs.length) return null;

  return (
    <motion.section
      id="faq"
      className="scroll-mt-28 rounded-2xl bg-[#f8f5ef] p-4 md:rounded-3xl md:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 md:mb-4">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#5a4ffe] text-white shadow-sm md:h-7 md:w-7">
          <MessageCircleQuestion size={13} strokeWidth={2.6} />
        </span>

        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#5a4ffe] md:text-[11px]">
          Frequently Asked Questions
        </span>

        <h2 className="min-w-0 text-lg font-black leading-snug text-[#21145f] sm:text-xl md:text-[1.375rem]">
          {title}
        </h2>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl border border-[#ddd9ff] bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left md:px-5"
              >
                <span className="text-sm font-black leading-6 text-[#21145f] md:text-[15px]">
                  {faq.question}
                </span>

                <ChevronDown
                  size={17}
                  className={`shrink-0 text-[#5a4ffe] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <p
                  id={`faq-answer-${faq.id}`}
                  className="border-t border-[#eeecff] px-4 py-3.5 text-sm leading-6 text-[#5f6877] md:px-5"
                >
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default ArticleFaq;
