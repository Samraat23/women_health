"use client";

import type { TrackPayload } from "@/features/analytics/core/types";
import { getSessionId, getVisitorId } from "@/features/analytics/client/identity";

/**
 * The one function every client-side instrumentation point calls.
 *
 * `sendBeacon` is preferred because it survives the page unloading — the
 * exact moment an `engagement` event fires, and often the moment right after
 * an outbound/`tel:`/`wa.me` click navigates away. `fetch(..., {keepalive})`
 * is the fallback for browsers or payload sizes `sendBeacon` won't take.
 *
 * Never throws, never awaited by the caller: a dropped analytics beacon must
 * never surface to, or block, a visitor.
 */
export function trackEvent(partial: Omit<TrackPayload, "sessionId" | "visitorId">) {
  if (typeof window === "undefined") return;

  const { id: sessionId } = getSessionId();
  const visitorId = getVisitorId();

  const payload: TrackPayload = {
    ...partial,
    sessionId,
    visitorId,
  };

  try {
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/analytics/track", blob);

      if (sent) return;
    }

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Storage blocked, payload too large for a beacon, or similar — drop it.
  }
}
