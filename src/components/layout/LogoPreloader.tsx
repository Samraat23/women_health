"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_SRC = "/image/dr-kusum-gynae-centre-logo.png";

// Floor so the mark never just flashes on a fast connection, ceiling so a
// slow one never holds the site hostage waiting for every asset.
const MIN_VISIBLE_MS = 650;
const MAX_WAIT_MS = 2200;
const FADE_MS = 500;

/**
 * Brand mark shown once per full page load (tab open, hard refresh). It never
 * re-mounts on client-side navigation because AppChrome — where this lives —
 * stays mounted across route changes in the App Router.
 */
export default function LogoPreloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already interactive by the time hydration ran (e.g. back/forward
    // cache restore) — skip the whole show, nothing to cover up.
    if (document.readyState === "complete" && performance.now() > MAX_WAIT_MS) {
      const skipTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(skipTimer);
    }

    const start = performance.now();
    let settled = false;

    const beginFadeOut = () => {
      if (settled) return;
      settled = true;
      const elapsed = performance.now() - start;
      const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setFading(true), delay);
    };

    if (document.readyState === "complete") {
      beginFadeOut();
    } else {
      window.addEventListener("load", beginFadeOut, { once: true });
    }

    // Safety net: never block the site past MAX_WAIT_MS regardless of what
    // is still loading in the background.
    const maxWaitTimer = window.setTimeout(beginFadeOut, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", beginFadeOut);
      window.clearTimeout(maxWaitTimer);
    };
  }, []);

  useEffect(() => {
    if (!fading) return;
    const timer = window.setTimeout(() => setVisible(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [fading]);

  useEffect(() => {
    if (!visible) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-live="polite"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--background)] transition-opacity ease-out motion-reduce:transition-none"
      style={{
        opacity: fading ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--primary-color)]/15 motion-reduce:hidden" />
          <span className="absolute inset-[-10px] animate-[preloader-spin_1.6s_linear_infinite] rounded-full border-2 border-[var(--primary-color)]/15 border-t-[var(--primary-color)] motion-reduce:hidden" />
          <div className="relative h-16 w-16 animate-[preloader-pulse_1.8s_ease-in-out_infinite] overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(27,20,99,0.18)] sm:h-20 sm:w-20">
            <Image
              src={LOGO_SRC}
              alt="Dr. Kusum Lata Bhardwaj"
              fill
              priority
              sizes="80px"
              className="object-contain p-2"
            />
          </div>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary-text-color)]/70">
          Dr. Kusum Lata
        </p>
      </div>
    </div>
  );
}
