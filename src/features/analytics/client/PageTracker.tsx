"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { getSessionId, randomId } from "@/features/analytics/client/identity";
import { trackEvent } from "@/features/analytics/client/track";

type ScrollMilestone = 25 | 50 | 75 | 90 | 100;

type EngagementState = {
  pageViewId: string;
  path: string;
  /** `performance.now()` the page became visible, or null while hidden. */
  visibleSince: number | null;
  accumulatedMs: number;
  maxScrollDepth: ScrollMilestone | 0;
  flushed: boolean;
};

const minReportableMs = 250;

function scrollMilestone(): ScrollMilestone | 0 {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;

  // Nothing to scroll (short page) counts as fully seen.
  const pct = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 100;

  if (pct >= 99) return 100;
  if (pct >= 90) return 90;
  if (pct >= 75) return 75;
  if (pct >= 50) return 50;
  if (pct >= 25) return 25;

  return 0;
}

/**
 * Fires one `page_view` event per route change on the public site, plus one
 * `engagement` event per page view — active-visible time and the deepest
 * scroll milestone reached — sent when the visitor leaves that page (route
 * change, tab hidden, or tab close).
 *
 * Mounted once in `AppChrome`, skipped entirely for `/admin/*`. All tracking
 * failures are swallowed — a dropped analytics beacon must never surface to
 * a visitor.
 */
export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedFirst = useRef(false);
  const engagementRef = useRef<EngagementState | null>(null);

  function flushEngagement() {
    const state = engagementRef.current;

    if (!state || state.flushed) return;

    const extra = state.visibleSince !== null ? performance.now() - state.visibleSince : 0;
    const engagementMs = Math.round(state.accumulatedMs + extra);

    if (engagementMs < minReportableMs && state.maxScrollDepth === 0) return;

    state.flushed = true;

    trackEvent({
      eventName: "engagement",
      path: state.path,
      pageViewId: state.pageViewId,
      engagementMs,
      scrollDepth: state.maxScrollDepth || undefined,
    });
  }

  // Visibility, scroll and tab-close listeners live for the component's whole
  // lifetime (not re-bound per page), reading/writing `engagementRef` so they
  // always act on whichever page view is current.
  useEffect(() => {
    function onVisibilityChange() {
      const state = engagementRef.current;

      if (!state) return;

      if (document.visibilityState === "hidden") {
        if (state.visibleSince !== null) {
          state.accumulatedMs += performance.now() - state.visibleSince;
          state.visibleSince = null;
        }

        flushEngagement();
      } else if (state.visibleSince === null) {
        state.visibleSince = performance.now();
        // Coming back to a page that already reported once — a renewed
        // flush (tab switched away and back) is still useful.
        state.flushed = false;
      }
    }

    function onScroll() {
      const state = engagementRef.current;

      if (!state) return;

      const milestone = scrollMilestone();

      if (milestone > state.maxScrollDepth) state.maxScrollDepth = milestone;
    }

    function onPageHide() {
      flushEngagement();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  useEffect(() => {
    // The admin route itself never mounts this component (see AppChrome),
    // but guard anyway in case it is ever reused somewhere unexpected.
    if (pathname.startsWith("/admin")) return;

    const { isNew } = getSessionId();
    const isNewSession = isNew && !hasTrackedFirst.current;
    const pageViewId = randomId();

    hasTrackedFirst.current = true;

    trackEvent({
      eventName: "page_view",
      path: pathname,
      referrer: document.referrer || undefined,
      pageViewId,
      isNewSession,
      utmSource: searchParams.get("utm_source") || undefined,
      utmMedium: searchParams.get("utm_medium") || undefined,
      utmCampaign: searchParams.get("utm_campaign") || undefined,
      screenWidth: window.innerWidth,
    });

    engagementRef.current = {
      pageViewId,
      path: pathname,
      visibleSince: document.visibilityState === "visible" ? performance.now() : null,
      accumulatedMs: 0,
      maxScrollDepth: 0,
      flushed: false,
    };

    // Runs on the NEXT navigation (before the new page_view above fires) and
    // on unmount — the "visitor left this page" signal for whatever page
    // view this effect instance was tracking.
    return () => {
      flushEngagement();
    };
    // sessionId/visitorId are read fresh inside the effect (storage-backed,
    // not reactive state), so they are intentionally not dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams.toString()]);

  return null;
}
