"use client";

/**
 * Session and visitor identity, shared by every client-side tracker
 * (`PageTracker`, `InteractionTracker`, and anything instrumented with
 * `trackEvent`). Pulled out of `PageTracker` so a click or engagement event
 * fired from a different component tags itself with the same IDs as the page
 * view it belongs to, instead of each tracker minting its own.
 */

const sessionKey = "wh_sid";
const visitorKey = "wh_vid";

function randomId() {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

/** Session id: one per tab, until the tab closes. */
export function getSessionId(): { id: string; isNew: boolean } {
  try {
    const existing = sessionStorage.getItem(sessionKey);

    if (existing) return { id: existing, isNew: false };

    const id = randomId();

    sessionStorage.setItem(sessionKey, id);

    return { id, isNew: true };
  } catch {
    return { id: randomId(), isNew: true };
  }
}

/** Visitor id: persists across sessions, on this browser only. No PII. */
export function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(visitorKey);

    if (existing) return existing;

    const id = randomId();

    localStorage.setItem(visitorKey, id);

    return id;
  } catch {
    return randomId();
  }
}

export { randomId };
