import React from 'react'
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
          className="text-center mb-14"
        >
          {headingObj.budge && (
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-black bg-pink-50 border border-pink-200 px-4 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--primary-text) animate-pulse" />
                  {headingObj.budge}
                </span>
          )}
       

          <h2 className="text-4xl sm:text-5xl font-bold text-(--primary-text) font-serif mb-4 leading-tight">
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
                className="absolute bottom-1 left-0 right-0 h-3 bg-pink-200 rounded-sm z-0"
              />
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-gray-700 text-base leading-relaxed">
           {headingObj.paragraph}
          </p>
        </motion.div>
    </div>
  )
}

export default SectionHeader