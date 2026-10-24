"use client";

import { useEffect, useState } from "react";

/**
 * A single-stat progress ring — "how much of this is actually live" — that
 * draws itself in on mount via a CSS transition on `stroke-dashoffset`.
 *
 * Starts at 0% and animates up to `percent` rather than rendering the final
 * ring straight away: a ring that is just *there* reads as a static icon: a
 * ring that fills in reads as a measurement.
 */
export function RadialProgress({
  percent,
  label,
  sublabel,
  size = 104,
  strokeWidth = 10,
}: {
  percent: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const [animated, setAnimated] = useState(0);

  // Starts at 0 (matching the server-rendered markup) and animates up to
  // `clamped` after mount via the ring's own `transition: stroke-dashoffset`
  // — `.admin-root`'s global prefers-reduced-motion rule already collapses
  // that transition to near-instant, so no separate check is needed here.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(clamped));

    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - animated / 100);

  return (
    <div className="flex items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0 -rotate-90"
        role="img"
        aria-label={`${label}: ${Math.round(clamped)}%`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ui-border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ui-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="min-w-0">
        <p className="font-admin-display text-2xl font-extrabold tabular-nums text-foreground">
          {Math.round(clamped)}%
        </p>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {sublabel ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
        ) : null}
      </div>
    </div>
  );
}
