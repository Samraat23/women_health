"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { useOptionalChatSupport } from "@/features/chat/ui/ChatSupportProvider";
import { getWhatsAppHref } from "@/lib/whatsapp";

const revealDelayMs = 5000;
const supportHref = getWhatsAppHref(
  "Hello, I would like to consult Dr. Kusum Lata Bhardwaj."
);

export default function WhatsAppFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const chatSupport = useOptionalChatSupport();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), revealDelayMs);

    return () => window.clearTimeout(timer);
  }, []);

  // The open chat window already offers WhatsApp, and sits where this button would.
  if (!isVisible || chatSupport?.isOpen) {
    return null;
  }

  return (
    <motion.a
      href={supportHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      // Stacked above the chat support button, which keeps the corner. On
      // phones both stay above the fixed bottom navigation bar. z-index sits
      // over that bar but under the mobile "More" sheet and every modal.
      className="group fixed bottom-[calc(152px+env(safe-area-inset-bottom))] right-4 z-[116] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_32px_rgba(18,140,74,0.38)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25d366]/40 md:bottom-[112px] md:right-8 md:h-16 md:w-16"
    >
      {!shouldReduceMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25d366]"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 1.65 }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
        />
      )}
      <WhatsAppIcon className="relative h-7 w-7 md:h-8 md:w-8" />
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-black text-[var(--primary-text-color)] opacity-0 shadow-[0_12px_28px_rgba(27,20,99,0.16)] transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
