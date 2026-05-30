"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from 'react';

function SectionHeader({headingObj}) {
     const titleRef = useRef(null);
      const titleInView = useInView(titleRef, {
        once: true,
        margin: "-80px",
      });
  return (
    <div>
          <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          {headingObj.budge && (
                  <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/15 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary-color)] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-color)]" />
                  {headingObj.budge}
                </span>
          )}
       

          <h2 className="mb-4 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-5xl">
            {headingObj.heading} { " "}
            <span className="relative">
              <span className="relative z-10">{headingObj.bold}</span>

              <motion.span
                initial={{ scaleX: 0 }}
                animate={titleInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originX: 0 }}
                className="absolute bottom-1 left-0 right-0 z-0 h-3 rounded-sm bg-[var(--primary-color)]/15"
              />
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-[#667085]">
           {headingObj.paragraph}
          </p>
        </motion.div>
    </div>
  )
}

export default SectionHeader
