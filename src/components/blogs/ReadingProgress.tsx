"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[999] h-1 bg-gradient-to-r from-[var(--primary-color)] via-[#8b7cff] to-[#38bdf8]"
      style={{ width, transformOrigin: "left" }}
    />
  );
}
