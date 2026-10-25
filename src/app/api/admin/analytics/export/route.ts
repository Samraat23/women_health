import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, isAdminSessionValid } from "@/lib/adminAuth";
import { buildAnalyticsSummary, buildSessionRows } from "@/features/analytics/server/aggregate";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import type { AnalyticsEventName, DeviceCategory, TrafficSource } from "@/features/analytics/core/types";
import { resolveDateRange } from "@/features/admin/analytics/resolveRange";
import { getChatRequestRepository } from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

/**
 * `GET /api/admin/analytics/export?mode=pages|sessions|events&range=7d&...`
 * — a CSV matching whatever filters the admin currently has applied on the
 * page it was linked from, so "export" always matches what's on screen
 * rather than an unfiltered dump. `mode` defaults to `pages`.
 *
 * `pages` and `sessions` export only aggregate numbers — no visitor-
 * identifying detail. `events` exports the raw log: session and (pseudonymous)
 * visitor ids, paths, click labels — the admin-only data every other page
 * here already reads, never patient data from `chat_requests`.
 */

async function hasAdminSession() {
  const cookieStore = await cookies();

  return isAdminSessionValid(cookieStore.get(adminSessionCookieName)?.value);
}

function csvCell(value: string | number) {
  const text = String(value);

  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csvRow(values: Array<string | number>) {
  return values.map(csvCell).join(",");
}

export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Not signed in." }, { status: 401 });
  }

  const url = new URL(request.url);
  const params = url.searchParams;

  const range = resolveDateRange({
    range: params.get("range") || undefined,
    from: params.get("from") || undefined,
    to: params.get("to") || undefined,
  });
  const device = (params.get("device") || undefined) as DeviceCategory | undefined;
  const source = (params.get("source") || undefined) as TrafficSource | undefined;
  const path = params.get("path") || undefined;
  const mode = params.get("mode") === "sessions" || params.get("mode") === "events" ? params.get("mode") : "pages";

  let events: Awaited<ReturnType<ReturnType<typeof getAnalyticsEventRepository>["list"]>> = [];
  let chatRequests: Awaited<ReturnType<ReturnType<typeof getChatRequestRepository>["list"]>> = [];

  try {
    events = await getAnalyticsEventRepository().list(20_000);
  } catch {
    // An empty export (header row only) beats a 500 for a dashboard action.
  }

  try {
    chatRequests = await getChatRequestRepository().list(5_000);
  } catch {
    // Conversions just read as 0 in the export.
  }

  let header: string[];
  let rows: string[];
  let filenamePart: string;

  if (mode === "events") {
    const eventName = (params.get("event") || undefined) as AnalyticsEventName | undefined;
    const search = (params.get("q") || "").trim().toLowerCase();
    const fromMs = range.from.getTime();
    const toMs = range.to.getTime();

    const filtered = events.filter((event) => {
      const at = new Date(event.createdAt).getTime();

      if (at < fromMs || at > toMs) return false;
      if (eventName && (event.eventName ?? "page_view") !== eventName) return false;
      if (device && event.device !== device) return false;
      if (source && event.trafficSource !== source) return false;

      if (search) {
        const haystack = `${event.path} ${event.elementLabel ?? ""} ${event.destinationPath ?? ""}`.toLowerCase();

        if (!haystack.includes(search)) return false;
      }

      return true;
    });

    header = ["created_at", "event", "path", "session_id", "visitor_id", "device", "browser", "os", "source", "element_label", "destination_path"];
    rows = filtered
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((event) =>
        csvRow([
          event.createdAt,
          event.eventName ?? "page_view",
          event.path,
          event.sessionId,
          event.visitorId,
          event.device,
          event.browser ?? "",
          event.os ?? "",
          event.trafficSource,
          event.elementLabel ?? "",
          event.destinationPath ?? "",
        ])
      );
    filenamePart = "events";
  } else if (mode === "sessions") {
    const sessions = buildSessionRows(events, chatRequests, { from: range.from, to: range.to, device, source, path });

    header = [
      "session_id",
      "started_at",
      "landing_path",
      "exit_path",
      "page_views",
      "active_seconds",
      "device",
      "browser",
      "os",
      "source",
      "engaged",
      "conversions",
    ];
    rows = sessions.map((session) =>
      csvRow([
        session.sessionId,
        session.startedAt,
        session.landingPath,
        session.exitPath,
        session.pageViews,
        session.activeSeconds,
        session.device,
        session.browser,
        session.os,
        session.trafficSource,
        session.engaged ? "yes" : "no",
        session.conversions,
      ])
    );
    filenamePart = "sessions";
  } else {
    const summary = buildAnalyticsSummary(events, chatRequests, { from: range.from, to: range.to, device, source, path });

    header = ["path", "views", "unique_visitors", "sessions", "avg_engagement_seconds", "exit_rate_pct", "conversions", "share_pct"];
    rows = summary.topPages.map((row) =>
      csvRow([
        row.path,
        row.views,
        row.uniqueVisitors,
        row.sessions,
        row.avgEngagementSeconds,
        row.exitRate,
        row.conversions,
        row.share,
      ])
    );
    filenamePart = "page-performance";
  }

  const csv = [csvRow(header), ...rows].join("\r\n");
  const fileRange = `${range.preset}_${range.from.toISOString().slice(0, 10)}_to_${range.to
    .toISOString()
    .slice(0, 10)}`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="whealth-${filenamePart}_${fileRange}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
