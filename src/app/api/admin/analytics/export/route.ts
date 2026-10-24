import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { adminSessionCookieName, isAdminSessionValid } from "@/lib/adminAuth";
import { buildAnalyticsSummary } from "@/features/analytics/server/aggregate";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import type { DeviceCategory, TrafficSource } from "@/features/analytics/core/types";
import { resolveDateRange } from "@/features/admin/analytics/resolveRange";
import { getChatRequestRepository } from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

/**
 * `GET /api/admin/analytics/export?range=7d&device=mobile&...` — a CSV of
 * the page-performance table for whatever filters the admin currently has
 * applied on `/admin/analytics`, so "export" always matches what's on screen
 * rather than an unfiltered dump.
 *
 * Only aggregate, page-level numbers leave this route: no raw events, no
 * session or visitor ids, nothing from `chat_requests`. There is nothing in
 * a page-performance row that identifies a visitor.
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

  const summary = buildAnalyticsSummary(events, chatRequests, {
    from: range.from,
    to: range.to,
    device,
    source,
    path,
  });

  const header = [
    "path",
    "views",
    "unique_visitors",
    "sessions",
    "avg_engagement_seconds",
    "exit_rate_pct",
    "conversions",
    "share_pct",
  ];

  const rows = summary.topPages.map((row) =>
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

  const csv = [csvRow(header), ...rows].join("\r\n");
  const fileRange = `${range.preset}_${range.from.toISOString().slice(0, 10)}_to_${range.to
    .toISOString()
    .slice(0, 10)}`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="whealth-page-performance_${fileRange}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
