"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircleHeart, X } from "lucide-react";

import ChatWindow from "@/features/chat/ui/ChatWindow";
import { useChatSupport } from "@/features/chat/ui/ChatSupportProvider";
import { brandGradient } from "@/features/chat/ui/styles";

const teaserDismissedKey = "kgc-chat-support:teaser-dismissed";
const launcherDelayMs = 800;

/** The floating chat button (bottom right) and the chat window it opens. */
export default function ChatSupport() {
  const { isOpen, toggle, open, unreadCount, hasOpened, config } = useChatSupport();
  const reducedMotion = useReducedMotion();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const teaser = config?.settings.assistant.teaser;

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), launcherDelayMs);

    return () => window.clearTimeout(timer);
  }, []);

  // One gentle nudge per visit, and never once the chat has been opened.
  useEffect(() => {
    if (!teaser?.enabled || hasOpened) return;

    try {
      if (window.sessionStorage.getItem(teaserDismissedKey)) return;
    } catch {
      // Without storage the teaser may simply show again next page load.
    }

    const show = window.setTimeout(() => setShowTeaser(true), teaser.delayMs);

    return () => window.clearTimeout(show);
  }, [teaser, hasOpened]);

  const dismissTeaser = () => {
    setShowTeaser(false);

    try {
      window.sessionStorage.setItem(teaserDismissedKey, "1");
    } catch {
      // Ignore; it only controls the nudge.
    }
  };

  const returnFocus = useCallback(() => {
    launcherRef.current?.focus({ preventScroll: true });
  }, []);

  if (config && !config.settings.enabled) return null;

  const teaserVisible = showTeaser && !isOpen && !hasOpened && Boolean(teaser);

  return (
    <>
      <AnimatePresence>{isOpen && <ChatWindow key="chat-window" onClosed={returnFocus} />}</AnimatePresence>

      {isVisible && (
        // Phones keep the button above the bottom navigation bar; the window
        // itself covers the whole screen there.
        <div className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] right-4 z-[117] md:bottom-8 md:right-8">
          <AnimatePresence>
            {teaserVisible && teaser && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                // Beside the button rather than above it, where the WhatsApp button sits.
                className="absolute bottom-0 right-full mr-3 w-[min(260px,calc(100vw-104px))] rounded-[20px] border border-[#e9e6fb] bg-white p-3 pr-9 shadow-[0_18px_44px_rgba(27,20,99,0.18)]"
              >
                <button
                  type="button"
                  onClick={() => {
                    dismissTeaser();
                    open();
                  }}
                  className="flex w-full cursor-pointer items-center gap-2.5 text-left"
                >
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#f0edff]">
                    <Image
                      src={config?.settings.assistant.avatar ?? "/image/dr-kusum-lata-bhardwaj.jpg"}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover object-[center_18%]"
                    />
                  </span>
                  <span className="text-[13px] font-semibold leading-snug text-[var(--primary-text-color)]">
                    {teaser.text}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={dismissTeaser}
                  className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            ref={launcherRef}
            type="button"
            aria-label={isOpen ? "Close chat support" : config?.settings.assistant.launcherLabel ?? "Chat with us"}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={isOpen ? "chat-support-window" : undefined}
            onClick={() => {
              dismissTeaser();
              toggle();
            }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={reducedMotion ? undefined : { scale: 1.06 }}
            whileTap={reducedMotion ? undefined : { scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={`group relative grid h-14 w-14 cursor-pointer place-items-center rounded-full text-white shadow-[0_14px_32px_rgba(90,79,254,0.42)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/35 md:h-16 md:w-16 ${brandGradient}`}
          >
            {!hasOpened && !reducedMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[var(--primary-color)]"
                initial={{ opacity: 0.45, scale: 1 }}
                animate={{ opacity: 0, scale: 1.6 }}
                transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1.6 }}
              />
            )}
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative"
                >
                  <X size={26} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="chat"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative"
                >
                  <MessageCircleHeart size={27} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
            {!isOpen && unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
                <span className="sr-only"> unread</span>
              </span>
            )}
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-black text-[var(--primary-text-color)] opacity-0 shadow-[0_12px_28px_rgba(27,20,99,0.16)] transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block">
              {isOpen ? "Close chat" : config?.settings.assistant.launcherLabel ?? "Chat with us"}
            </span>
          </motion.button>
        </div>
      )}
    </>
  );
}
