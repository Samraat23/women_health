import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { eventNameIcon, eventNameLabel } from "@/features/admin/analytics/eventMeta";
import { rangePresets, resolveDateRange } from "@/features/admin/analytics/resolveRange";
import { EmptyState, Panel } from "@/features/admin/ui/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import {
  type AnalyticsEvent,
  type AnalyticsEventName,
  type DeviceCategory,
  type TrafficSource,
} from "@/features/analytics/core/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Event Explorer | WHealth Admin",
  robots: { index: false, follow: false },
};

const pageSize = 30;
const eventReadLimit = 20_000;

const allEventNames: AnalyticsEventName[] = [
  "page_view",
  "engagement",
  "cta_click",
  "outbound_click",
  "phone_click",
  "whatsapp_click",
  "email_click",
  "form_start",
  "form_submit",
  "form_error",
];

const timestampFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "medium",
});

type SearchParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildHref(current: SearchParams, overrides: Record<string, string | undefined>) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(current)) {
    const resolved = one(value);

    if (resolved) query.set(key, resolved);
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value) query.set(key, value);
    else query.delete(key);
  }

  const result = query.toString();

  return result ? `/admin/analytics/events?${result}` : "/admin/analytics/events";
}

function effectiveEventName(event: AnalyticsEvent): AnalyticsEventName {
  return event.eventName ?? "page_view";
}

export default async function EventExplorerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const admin = await requireAdminSession("/admin/analytics/events");
  const params = await searchParams;

  const range = resolveDateRange({
    range: one(params.range),
    from: one(params.from),
    to: one(params.to),
  });
  const eventName = one(params.event) as AnalyticsEventName | undefined;
  const device = one(params.device) as DeviceCategory | undefined;
  const source = one(params.source) as TrafficSource | undefined;
  const search = (one(params.q) || "").trim().toLowerCase();
  const pageNumber = Math.max(1, Number(one(params.p)) || 1);

  let events: AnalyticsEvent[] = [];
  let loadError = "";

  try {
    events = await getAnalyticsEventRepository().list(eventReadLimit);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load events.";
  }

  const fromMs = range.from.getTime();
  const toMs = range.to.getTime();

  const filtered = events.filter((event) => {
    const at = new Date(event.createdAt).getTime();

    if (at < fromMs || at > toMs) return false;
    if (eventName && effectiveEventName(event) !== eventName) return false;
    if (device && event.device !== device) return false;
    if (source && event.trafficSource !== source) return false;

    if (search) {
      const haystack = `${event.path} ${event.elementLabel ?? ""} ${event.destinationPath ?? ""}`.toLowerCase();

      if (!haystack.includes(search)) return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(pageNumber, totalPages);
  const visibleEvents = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportHref = (() => {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      const resolved = one(value);

      if (resolved && key !== "p") query.set(key, resolved);
    }

    query.set("mode", "events");

    return `/api/admin/analytics/export?${query.toString()}`;
  })();

  return (
    <AdminShell
      adminEmail={admin.email}
      activeModule="analytics"
      title="Event Explorer"
      description="Every raw tracked event in range — page views, clicks, engagement, forms."
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin/dashboard" },
        { label: "Analytics", href: "/admin/analytics" },
        { label: "Events" },
      ]}
      actions={
        <a
          href={exportHref}
          className="inline-flex items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-bold text-foreground transition hover:bg-accent"
        >
          <Download size={14} aria-hidden />
          Export (CSV)
        </a>
      }
    >
      <div className="space-y-5">
        <Panel contentClassName="p-4" className="overflow-visible">
          <nav className="flex flex-wrap gap-1 rounded-lg border border-input bg-secondary/40 p-1" aria-label="Date range">
            {rangePresets.map((preset) => (
              <Link
                key={preset.id}
                href={buildHref(params, { range: preset.id, from: undefined, to: undefined, p: undefined })}
                aria-current={range.preset === preset.id ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm font-bold transition ${
                  range.preset === preset.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {preset.label}
              </Link>
            ))}
          </nav>

          <form method="GET" className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
            <input type="hidden" name="range" value={range.preset} />

            <select
              name="event"
              defaultValue={eventName || ""}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs font-semibold text-foreground"
            >
              <option value="">All event types</option>
              {allEventNames.map((name) => (
                <option key={name} value={name}>
                  {eventNameLabel(name)}
                </option>
              ))}
            </select>

            <select
              name="device"
              defaultValue={device || ""}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs font-semibold text-foreground"
            >
              <option value="">All devices</option>
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>

            <input
              type="search"
              name="q"
              defaultValue={search}
              placeholder="Search path or label…"
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground placeholder:text-muted-foreground"
            />

            <button
              type="submit"
              className="h-8 rounded-md border border-input px-3 text-xs font-bold text-foreground transition hover:bg-accent"
            >
              Apply filters
            </button>

            {eventName || device || source || search ? (
              <Link
                href={buildHref(params, { event: undefined, device: undefined, source: undefined, q: undefined, p: undefined })}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear filters
              </Link>
            ) : null}
          </form>
        </Panel>

        {loadError ? (
          <p className="rounded-lg border border-[var(--adm-danger-soft)] bg-[var(--adm-danger-soft)] p-4 text-sm font-semibold text-[var(--adm-danger)]">
            {loadError}
          </p>
        ) : sorted.length === 0 ? (
          <Panel contentClassName="p-0">
            <div className="p-5">
              <EmptyState title="No events match these filters" description="Widen the date range or clear the filters above." />
            </div>
          </Panel>
        ) : (
          <Panel contentClassName="p-0" description={`${sorted.length} events`}>
            <Table>
              <TableHeader>
                <TableRow className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <TableHead className="px-5">Time</TableHead>
                  <TableHead className="px-5">Event</TableHead>
                  <TableHead className="px-5">Path</TableHead>
                  <TableHead className="px-5">Detail</TableHead>
                  <TableHead className="px-5">Device</TableHead>
                  <TableHead className="px-5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleEvents.map((event) => {
                  const name = effectiveEventName(event);
                  const Icon = eventNameIcon(name);

                  return (
                    <TableRow key={event.id}>
                      <TableCell className="px-5 py-3.5 text-xs text-muted-foreground">
                        {timestampFormat.format(new Date(event.createdAt))}
                      </TableCell>
                      <TableCell className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                          <Icon size={14} className="shrink-0 text-primary" aria-hidden />
                          {eventNameLabel(name)}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-muted-foreground">{event.path}</TableCell>
                      <TableCell className="px-5 py-3.5 text-xs text-muted-foreground">
                        {event.elementLabel || event.destinationPath || event.formField || "—"}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-muted-foreground">{event.device}</TableCell>
                      <TableCell className="px-5 py-3.5 text-right">
                        <Link
                          href={`/admin/analytics/sessions/${encodeURIComponent(event.sessionId)}`}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Session
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {totalPages > 1 ? (
              <div className="flex items-center justify-between border-t px-5 py-3 text-xs font-semibold text-muted-foreground">
                <span>
                  Page {currentPage} of {totalPages} · {sorted.length} events
                </span>
                <div className="flex gap-2">
                  <Link
                    href={buildHref(params, { p: String(Math.max(1, currentPage - 1)) })}
                    aria-disabled={currentPage === 1}
                    className={`rounded-md border border-input px-2.5 py-1 ${currentPage === 1 ? "pointer-events-none opacity-40" : "hover:bg-accent"}`}
                  >
                    Previous
                  </Link>
                  <Link
                    href={buildHref(params, { p: String(Math.min(totalPages, currentPage + 1)) })}
                    aria-disabled={currentPage === totalPages}
                    className={`rounded-md border border-input px-2.5 py-1 ${currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:bg-accent"}`}
                  >
                    Next
                  </Link>
                </div>
              </div>
            ) : null}
          </Panel>
        )}
      </div>
    </AdminShell>
  );
}
