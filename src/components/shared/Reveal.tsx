"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds, typically index * 0.08. */
  delay?: number;
  /** Vertical offset the content animates in from. */
  y?: number;
  className?: string;
};

/**
 * Lightweight scroll-triggered fade-up wrapper shared across the pregnancy
 * page's static sections. Server-rendered children can be passed straight
 * through since this only adds a client-side animation boundary.
 */
function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
