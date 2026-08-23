"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

import type { BlogFaq } from "@/data/BlogData";

type ArticleFaqProps = {
  faqs: BlogFaq[];
};

/**
 * FAQ block for an article page. Styled to match the other article sections
 * rather than reusing the home page FAQ, which is a full-width layout with a
 * fixed answer height that clips longer answers.
 */
function ArticleFaq({ faqs }: ArticleFaqProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (!faqs.length) return null;

  return (
    <motion.section
      id="faq"
      className="scroll-mt-28 rounded-3xl bg-[#f8f5ef] p-5 md:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#5a4ffe] text-white shadow-md">
          <HelpCircle size={27} strokeWidth={2.4} />
        </div>

        <div>
          <p className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-[#5a4ffe]">
            Frequently Asked Questions
          </p>
          <h2 className="text-2xl font-black leading-tight text-[#21145f] md:text-3xl">
            Your questions answered
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-2xl border border-[#ddd9ff] bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-black leading-6 text-[#21145f]">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-[#5a4ffe] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <p
                  id={`faq-answer-${faq.id}`}
                  className="border-t border-[#eeecff] px-5 py-4 text-sm leading-7 text-[#5f6877]"
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
