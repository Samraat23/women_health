"use client";

import { useEffect, useState } from "react";

const numberFormat = new Intl.NumberFormat("en-IN");

/**
 * Counts up from 0 to `value` once, on mount — the one piece of the
 * dashboard's "modern" feel that genuinely needs client JS. Everything else
 * (chart, trend arrows, card entrances) is plain CSS or server-rendered SVG.
 *
 * Skips the animation entirely under prefers-reduced-motion, and for a value
 * so small the motion would read as a glitch rather than a count.
 */
export function AnimatedNumber({
  value,
  durationMs = 700,
}: {
  value: number;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(value <= 9 ? value : 0);

  useEffect(() => {
    if (value <= 9 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setDisplay(value));

      return () => cancelAnimationFrame(frame);
    }

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      // Ease-out: fast start, settles into the final value rather than
      // ticking linearly all the way, which reads as sluggish for big counts.
      const eased = 1 - (1 - progress) * (1 - progress);

      setDisplay(Math.round(value * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return <>{numberFormat.format(display)}</>;
}
