import type { StoredChatRequest } from "@/features/chat/server/requestStore";
import {
  clickEventNames,
  type AnalyticsEvent,
  type AnalyticsEventName,
  type ClickEventName,
  type DeviceCategory,
  type TrafficSource,
} from "@/features/analytics/core/types";

const clickEventNameSet: ReadonlySet<string> = new Set(clickEventNames);

/**
 * Turns the raw event log into everything the analytics dashboard renders.
 *
 * Everything here runs in memory over whatever `eventStore.list()` returned —
 * fine at the traffic volumes a single clinic's site sees, and it keeps the
 * whole pipeline (ingest → store → read → aggregate) dependency-free. A
 * busier site would want day-bucketed rollup documents written at ingest time
 * instead of aggregating the full log on every dashboard load.
 */

const timeZone = "Asia/Kolkata";

export type AnalyticsFilters = {
  from: Date;
  to: Date;
  device?: DeviceCategory;
  source?: TrafficSource;
  path?: string;
};

export type DailyPoint = {
  date: string;
  pageViews: number;
  sessions: number;
  uniqueVisitors: number;
};

export type PageRow = {
  path: string;
  views: number;
  uniqueVisitors: number;
  sessions: number;
  conversions: number;
  share: number;
  /** Sessions whose last page view in range was this page. */
  exits: number;
  exitRate: number;
  /** Mean engagement time on this page, in whole seconds — 0 where no `engagement` data exists yet. */
  avgEngagementSeconds: number;
};

export type BreakdownRow<T extends string> = {
  key: T;
  count: number;
  share: number;
};

export type TrendDirection = "up" | "down" | "flat";

export type Trend = {
  value: number;
  changePct: number | null;
  previousValue: number;
  direction: TrendDirection;
};

export type ClickedElement = {
  key: string;
  eventName: ClickEventName;
  label: string;
  count: number;
};

/**
 * Landing page → CTA/contact click → form started → form submitted.
 * Each step is a strict subset of sessions from the step before it — a
 * session only reaches "form start" here if it also had a CTA click, so
 * `pctOfPrevious` is a true step-to-step conversion rate, not an unrelated
 * ratio of two independent counts.
 */
export type FunnelStep = {
  id: "landing" | "cta" | "formStart" | "formSubmit";
  label: string;
  sessions: number;
  /** Of all sessions that reached the first step. null on the first step. */
  pctOfFirst: number | null;
  /** Of sessions that reached the step before this one. null on the first step. */
  pctOfPrevious: number | null;
};

export type QuickInsight = {
  id: string;
  label: string;
  detail: string;
};

export type AnalyticsSummary = {
  totals: {
    pageViews: Trend;
    sessions: Trend;
    uniqueVisitors: Trend;
    newVisitors: Trend;
    returningVisitors: number;
    conversions: Trend;
    /** All `cta_click` events — not phone/WhatsApp/email/outbound, which have their own cards. */
    ctaClicks: Trend;
    /** Mean `engagementMs` across this range's `engagement` events, in whole seconds. */
    avgEngagementSeconds: Trend;
    /** Sessions with one page view, no engagement ≥10s, and no click/form activity. Higher is worse. */
    bounceRate: Trend;
    formSubmissions: Trend;
  };
  daily: DailyPoint[];
  topPages: PageRow[];
  devices: BreakdownRow<DeviceCategory>[];
  sources: BreakdownRow<TrafficSource>[];
  countries: BreakdownRow<string>[];
  /** Every click-family event name, by volume — the "Interactions" panel. */
  interactions: BreakdownRow<ClickEventName>[];
  /** Individual buttons/links, ranked by clicks — "most clicked CTA" etc. */
  topClickedElements: ClickedElement[];
  funnel: FunnelStep[];
  insights: QuickInsight[];
  availablePaths: string[];
};

/** Events written before schemaVersion 2 have no `eventName` — they are all page views. */
function effectiveEventName(event: AnalyticsEvent): AnalyticsEventName {
  return event.eventName ?? "page_view";
}

function isPageView(event: AnalyticsEvent) {
  return effectiveEventName(event) === "page_view";
}

function isClick(event: AnalyticsEvent): event is AnalyticsEvent & { eventName: ClickEventName } {
  return clickEventNameSet.has(effectiveEventName(event));
}

/** Groups events by `sessionId`, each session's events sorted oldest-first. */
function groupBySession(events: AnalyticsEvent[]): Map<string, AnalyticsEvent[]> {
  const sessions = new Map<string, AnalyticsEvent[]>();

  for (const event of events) {
    const bucket = sessions.get(event.sessionId);

    if (bucket) bucket.push(event);
    else sessions.set(event.sessionId, [event]);
  }

  for (const bucket of sessions.values()) {
    bucket.sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  }

  return sessions;
}

function dayKey(iso: string) {
  // en-CA gives YYYY-MM-DD directly, which sorts and compares lexically.
  return new Date(iso).toLocaleDateString("en-CA", { timeZone });
}

function inRange(event: AnalyticsEvent, from: Date, to: Date) {
  const at = new Date(event.createdAt).getTime();

  return at >= from.getTime() && at <= to.getTime();
}

function matchesOptionalFilters(
  event: AnalyticsEvent,
  filters: Pick<AnalyticsFilters, "device" | "source" | "path">
) {
  if (filters.device && event.device !== filters.device) return false;
  if (filters.source && event.trafficSource !== filters.source) return false;
  if (filters.path && event.path !== filters.path) return false;

  return true;
}

function trend(current: number, previous: number): Trend {
  const changePct = previous > 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : null;
  const direction: TrendDirection = current === previous ? "flat" : current > previous ? "up" : "down";

  return { value: current, changePct, previousValue: previous, direction };
}

function share(count: number, total: number) {
  return total > 0 ? Math.round((count / total) * 1000) / 10 : 0;
}

/** Counts distinct values of `pick(event)` across a list of events. */
function countDistinct<T>(events: AnalyticsEvent[], pick: (event: AnalyticsEvent) => T) {
  return new Set(events.map(pick)).size;
}

export function buildAnalyticsSummary(
  allEvents: AnalyticsEvent[],
  chatRequests: StoredChatRequest[],
  filters: AnalyticsFilters
): AnalyticsSummary {
  const rangeMs = filters.to.getTime() - filters.from.getTime();
  const previousFrom = new Date(filters.from.getTime() - rangeMs - 1);
  const previousTo = new Date(filters.from.getTime() - 1);

  // Every event in range — page views, clicks and engagement reports mixed
  // together. Used only for the click/engagement aggregation below; every
  // view/session/visitor metric filters down to `currentViews` first, or a
  // single page view that also produced a click and an engagement report
  // would count as three page views.
  const current = allEvents.filter(
    (event) => inRange(event, filters.from, filters.to) && matchesOptionalFilters(event, filters)
  );
  const previous = allEvents.filter(
    (event) => inRange(event, previousFrom, previousTo) && matchesOptionalFilters(event, filters)
  );

  const currentViews = current.filter(isPageView);
  const previousViews = previous.filter(isPageView);

  // A visitor's first-ever pageview anywhere in the log (not just this
  // range), so "new" vs "returning" reflects real history rather than being
  // reset by whatever date range happens to be selected.
  const firstSeenByVisitor = new Map<string, number>();

  for (const event of allEvents) {
    const at = new Date(event.createdAt).getTime();
    const existing = firstSeenByVisitor.get(event.visitorId);

    if (existing === undefined || at < existing) firstSeenByVisitor.set(event.visitorId, at);
  }

  function countNewVisitors(events: AnalyticsEvent[], from: Date, to: Date) {
    const visitors = new Set(events.map((event) => event.visitorId));
    let count = 0;

    for (const visitorId of visitors) {
      const firstSeen = firstSeenByVisitor.get(visitorId);

      if (firstSeen !== undefined && firstSeen >= from.getTime() && firstSeen <= to.getTime()) count += 1;
    }

    return count;
  }

  const currentUniqueVisitors = countDistinct(currentViews, (event) => event.visitorId);
  const currentNewVisitors = countNewVisitors(currentViews, filters.from, filters.to);
  const previousUniqueVisitors = countDistinct(previousViews, (event) => event.visitorId);
  const previousNewVisitors = countNewVisitors(previousViews, previousFrom, previousTo);

  function conversionsIn(from: Date, to: Date) {
    return chatRequests.filter((request) => {
      const at = new Date(request.createdAt).getTime();

      if (at < from.getTime() || at > to.getTime()) return false;
      if (filters.path && request.sourcePath !== filters.path) return false;

      return true;
    }).length;
  }

  // ---------------------------------------------------------------- daily
  const dailyMap = new Map<string, { pageViews: number; sessions: Set<string>; visitors: Set<string> }>();

  for (const event of currentViews) {
    const key = dayKey(event.createdAt);
    const bucket = dailyMap.get(key) || { pageViews: 0, sessions: new Set(), visitors: new Set() };

    bucket.pageViews += 1;
    bucket.sessions.add(event.sessionId);
    bucket.visitors.add(event.visitorId);
    dailyMap.set(key, bucket);
  }

  const daily: DailyPoint[] = Array.from(dailyMap.entries())
    .map(([date, bucket]) => ({
      date,
      pageViews: bucket.pageViews,
      sessions: bucket.sessions.size,
      uniqueVisitors: bucket.visitors.size,
    }))
    .sort((left, right) => left.date.localeCompare(right.date));

  // -------------------------------------------------------------- pages
  const pageMap = new Map<
    string,
    { views: number; visitors: Set<string>; sessions: Set<string> }
  >();

  for (const event of currentViews) {
    const bucket = pageMap.get(event.path) || { views: 0, visitors: new Set(), sessions: new Set() };

    bucket.views += 1;
    bucket.visitors.add(event.visitorId);
    bucket.sessions.add(event.sessionId);
    pageMap.set(event.path, bucket);
  }

  // ---------------------------------------------------------------- exits
  // One session's last page view in range is where that session exited.
  // Grouped from `currentViews` only — a click or engagement event on the
  // final page doesn't change which page was last navigated to.
  const exitsByPath = new Map<string, number>();

  for (const sessionViews of groupBySession(currentViews).values()) {
    const lastPath = sessionViews[sessionViews.length - 1]?.path;

    if (lastPath) exitsByPath.set(lastPath, (exitsByPath.get(lastPath) ?? 0) + 1);
  }

  // ---------------------------------------------------- engagement by page
  function engagementSecondsByPath(events: AnalyticsEvent[]) {
    const perPageView = new Map<string, { path: string; ms: number }>();

    for (const event of events) {
      if (effectiveEventName(event) !== "engagement" || typeof event.engagementMs !== "number") continue;

      const key = event.pageViewId ?? event.id;
      const existing = perPageView.get(key);

      if (existing) existing.ms += event.engagementMs;
      else perPageView.set(key, { path: event.path, ms: event.engagementMs });
    }

    const totalsByPath = new Map<string, { ms: number; pageViews: number }>();

    for (const { path, ms } of perPageView.values()) {
      const bucket = totalsByPath.get(path) ?? { ms: 0, pageViews: 0 };

      bucket.ms += ms;
      bucket.pageViews += 1;
      totalsByPath.set(path, bucket);
    }

    const result = new Map<string, number>();

    for (const [path, bucket] of totalsByPath) {
      result.set(path, Math.round(bucket.ms / bucket.pageViews / 1000));
    }

    return result;
  }

  const pageEngagementSeconds = engagementSecondsByPath(current);

  const totalViews = currentViews.length;
  const topPages: PageRow[] = Array.from(pageMap.entries())
    .map(([path, bucket]) => ({
      path,
      views: bucket.views,
      uniqueVisitors: bucket.visitors.size,
      sessions: bucket.sessions.size,
      conversions: chatRequests.filter((request) => {
        const at = new Date(request.createdAt).getTime();

        return request.sourcePath === path && at >= filters.from.getTime() && at <= filters.to.getTime();
      }).length,
      share: share(bucket.views, totalViews),
      exits: exitsByPath.get(path) ?? 0,
      exitRate: share(exitsByPath.get(path) ?? 0, bucket.sessions.size),
      avgEngagementSeconds: pageEngagementSeconds.get(path) ?? 0,
    }))
    .sort((left, right) => right.views - left.views);

  // ---------------------------------------------------------- breakdowns
  function breakdown<T extends string>(
    events: AnalyticsEvent[],
    pick: (event: AnalyticsEvent) => T | undefined
  ): BreakdownRow<T>[] {
    const counts = new Map<T, number>();

    for (const event of events) {
      const key = pick(event);

      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([key, count]) => ({ key, count, share: share(count, events.length) }))
      .sort((left, right) => right.count - left.count);
  }

  const devices = breakdown<DeviceCategory>(currentViews, (event) => event.device);
  const sources = breakdown<TrafficSource>(currentViews, (event) => event.trafficSource);
  const countries = breakdown<string>(currentViews, (event) => event.country || "Unknown");

  const availablePaths = Array.from(new Set(allEvents.map((event) => event.path))).sort();

  // ------------------------------------------------------- clicks & engagement
  const currentClicks = current.filter(isClick);
  const previousClicks = previous.filter(isClick);
  const currentCtaClicks = currentClicks.filter((event) => event.eventName === "cta_click").length;
  const previousCtaClicks = previousClicks.filter((event) => event.eventName === "cta_click").length;

  const interactions = breakdown<ClickEventName>(currentClicks, (event) =>
    isClick(event) ? event.eventName : undefined
  );

  const clickedElements = new Map<string, ClickedElement>();

  for (const event of currentClicks) {
    const label = event.elementLabel || event.elementId || event.destinationPath || "Untitled element";
    const key = `${event.eventName}::${event.elementId || label}`;
    const existing = clickedElements.get(key);

    if (existing) existing.count += 1;
    else clickedElements.set(key, { key, eventName: event.eventName, label, count: 1 });
  }

  const topClickedElements = Array.from(clickedElements.values())
    .sort((left, right) => right.count - left.count)
    .slice(0, 8);

  /**
   * One page view can produce several `engagement` events — a visitor who
   * switches tabs and back mid-read flushes once per visible segment, all
   * sharing one `pageViewId`. Averaging those segments directly would dilute
   * a single long, interrupted read into several short ones, so segments are
   * summed per page view first and the *page views'* totals are what gets
   * averaged. A segment with no `pageViewId` (data from before this field
   * existed) is treated as its own one-segment page view.
   */
  function avgEngagementSeconds(events: AnalyticsEvent[]) {
    const withDuration = events.filter(
      (event) => effectiveEventName(event) === "engagement" && typeof event.engagementMs === "number"
    );

    if (withDuration.length === 0) return 0;

    const perPageView = new Map<string, number>();

    for (const event of withDuration) {
      const key = event.pageViewId ?? event.id;

      perPageView.set(key, (perPageView.get(key) ?? 0) + (event.engagementMs ?? 0));
    }

    const totalMs = Array.from(perPageView.values()).reduce((sum, ms) => sum + ms, 0);

    return Math.round(totalMs / perPageView.size / 1000);
  }

  // ------------------------------------------------------------- bounce rate
  /**
   * A session "bounces" if it has one page view, under 10 seconds of
   * measured engagement, and no click or form activity — the same
   * "engaged session" definition GA4 uses, built from events this pipeline
   * already captures rather than a separate bounce signal.
   */
  function bounceRatePct(events: AnalyticsEvent[]) {
    let bounced = 0;
    let total = 0;

    for (const sessionEvents of groupBySession(events).values()) {
      const views = sessionEvents.filter(isPageView);

      if (views.length === 0) continue;

      total += 1;

      if (views.length >= 2) continue;

      const engagedMs = sessionEvents
        .filter((event) => effectiveEventName(event) === "engagement")
        .reduce((sum, event) => sum + (event.engagementMs ?? 0), 0);
      const hadActivity = sessionEvents.some((event) => {
        const name = effectiveEventName(event);

        return clickEventNameSet.has(name) || name === "form_start" || name === "form_submit";
      });

      if (engagedMs < 10_000 && !hadActivity) bounced += 1;
    }

    return total > 0 ? Math.round((bounced / total) * 1000) / 10 : 0;
  }

  function countEventName(events: AnalyticsEvent[], name: AnalyticsEventName) {
    return events.filter((event) => effectiveEventName(event) === name).length;
  }

  // ----------------------------------------------------------------- funnel
  function buildFunnel(events: AnalyticsEvent[]): FunnelStep[] {
    const sessionNames = new Map<string, Set<AnalyticsEventName>>();

    for (const [sessionId, sessionEvents] of groupBySession(events)) {
      sessionNames.set(sessionId, new Set(sessionEvents.map(effectiveEventName)));
    }

    const landing = new Set(
      Array.from(sessionNames.entries())
        .filter(([, names]) => names.has("page_view"))
        .map(([sessionId]) => sessionId)
    );
    const cta = new Set(
      Array.from(landing).filter((sessionId) =>
        Array.from(sessionNames.get(sessionId) ?? []).some((name) => clickEventNameSet.has(name))
      )
    );
    const formStart = new Set(
      Array.from(cta).filter((sessionId) => sessionNames.get(sessionId)?.has("form_start"))
    );
    const formSubmit = new Set(
      Array.from(formStart).filter((sessionId) => sessionNames.get(sessionId)?.has("form_submit"))
    );

    return [
      { id: "landing", label: "Landing page", sessions: landing.size, pctOfFirst: null, pctOfPrevious: null },
      {
        id: "cta",
        label: "CTA / contact click",
        sessions: cta.size,
        pctOfFirst: share(cta.size, landing.size),
        pctOfPrevious: share(cta.size, landing.size),
      },
      {
        id: "formStart",
        label: "Form started",
        sessions: formStart.size,
        pctOfFirst: share(formStart.size, landing.size),
        pctOfPrevious: share(formStart.size, cta.size),
      },
      {
        id: "formSubmit",
        label: "Form submitted",
        sessions: formSubmit.size,
        pctOfFirst: share(formSubmit.size, landing.size),
        pctOfPrevious: share(formSubmit.size, formStart.size),
      },
    ];
  }

  const pageViewsTrend = trend(currentViews.length, previousViews.length);

  // --------------------------------------------------------------- insights
  // Every insight is a template filled with a real, already-computed number
  // — nothing here infers causation or invents a figure that isn't in
  // `topPages` / `topClickedElements` / the trends above.
  function buildInsights(): QuickInsight[] {
    const insights: QuickInsight[] = [];
    const mostVisited = topPages[0];

    if (mostVisited && mostVisited.views > 0) {
      insights.push({
        id: "most-visited",
        label: "Most visited page",
        detail: `${mostVisited.path} — ${mostVisited.views} views, ${mostVisited.share}% of this range's traffic.`,
      });
    }

    const longestEngagement = topPages
      .filter((page) => page.avgEngagementSeconds > 0)
      .sort((left, right) => right.avgEngagementSeconds - left.avgEngagementSeconds)[0];

    if (longestEngagement) {
      insights.push({
        id: "longest-engagement",
        label: "Longest engagement",
        detail: `${longestEngagement.path} — averages ${longestEngagement.avgEngagementSeconds}s of active time per visit.`,
      });
    }

    // Exit rate needs a minimum sample — a page two sessions ever saw reads
    // as "100% exit" from pure noise.
    const highestExit = topPages
      .filter((page) => page.sessions >= 5)
      .sort((left, right) => right.exitRate - left.exitRate)[0];

    if (highestExit) {
      insights.push({
        id: "highest-exit",
        label: "Losing the most visitors",
        detail: `${highestExit.path} — ${highestExit.exitRate}% exit rate (${highestExit.exits} of ${highestExit.sessions} sessions left from here).`,
      });
    }

    const topClick = topClickedElements[0];

    if (topClick) {
      insights.push({
        id: "top-clicked",
        label: "Most clicked",
        detail: `"${topClick.label}" — ${topClick.count} clicks in this range.`,
      });
    }

    if (pageViewsTrend.changePct !== null && Math.abs(pageViewsTrend.changePct) >= 20) {
      const direction = pageViewsTrend.direction === "up" ? "up" : "down";

      insights.push({
        id: "traffic-swing",
        label: `Traffic ${direction} ${Math.round(Math.abs(pageViewsTrend.changePct))}%`,
        detail: `${currentViews.length} page views vs ${previousViews.length} in the previous equivalent period.`,
      });
    }

    return insights;
  }

  return {
    totals: {
      pageViews: pageViewsTrend,
      sessions: trend(
        countDistinct(currentViews, (event) => event.sessionId),
        countDistinct(previousViews, (event) => event.sessionId)
      ),
      uniqueVisitors: trend(currentUniqueVisitors, previousUniqueVisitors),
      newVisitors: trend(currentNewVisitors, previousNewVisitors),
      returningVisitors: Math.max(currentUniqueVisitors - currentNewVisitors, 0),
      conversions: trend(conversionsIn(filters.from, filters.to), conversionsIn(previousFrom, previousTo)),
      ctaClicks: trend(currentCtaClicks, previousCtaClicks),
      avgEngagementSeconds: trend(avgEngagementSeconds(current), avgEngagementSeconds(previous)),
      bounceRate: trend(bounceRatePct(current), bounceRatePct(previous)),
      formSubmissions: trend(countEventName(current, "form_submit"), countEventName(previous, "form_submit")),
    },
    daily,
    topPages,
    devices,
    sources,
    countries,
    interactions,
    topClickedElements,
    funnel: buildFunnel(current),
    insights: buildInsights(),
    availablePaths,
  };
}
