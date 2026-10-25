import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Laptop, Smartphone, Tablet } from "lucide-react";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { rangePresets } from "@/features/admin/analytics/resolveRange";
import { EmptyState, Panel, StatusPill } from "@/features/admin/ui/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resolveDateRange } from "@/features/admin/analytics/resolveRange";
import { buildSessionRows } from "@/features/analytics/server/aggregate";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import type { DeviceCategory, TrafficSource } from "@/features/analytics/core/types";
import { getChatRequestRepository } from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Session Explorer | WHealth Admin",
  robots: { index: false, follow: false },
};

const pageSize = 25;
const eventReadLimit = 20_000;

const deviceIcons: Record<DeviceCategory, typeof Laptop> = {
  desktop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
};

const startedFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});

function formatSeconds(totalSeconds: number) {
  if (totalSeconds <= 0) return "—";

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

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

  return result ? `/admin/analytics/sessions?${result}` : "/admin/analytics/sessions";
}

export default async function SessionExplorerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const admin = await requireAdminSession("/admin/analytics/sessions");
  const params = await searchParams;

  const range = resolveDateRange({
    range: one(params.range),
    from: one(params.from),
    to: one(params.to),
  });
  const device = one(params.device) as DeviceCategory | undefined;
  const source = one(params.source) as TrafficSource | undefined;
  const path = one(params.path) || undefined;
  const pageNumber = Math.max(1, Number(one(params.p)) || 1);

  let sessions: ReturnType<typeof buildSessionRows> = [];
  let loadError = "";

  try {
    const [events, chatRequests] = await Promise.all([
      getAnalyticsEventRepository().list(eventReadLimit),
      getChatRequestRepository().list(5_000),
    ]);

    sessions = buildSessionRows(events, chatRequests, { from: range.from, to: range.to, device, source, path });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load sessions.";
  }

  const totalPages = Math.max(1, Math.ceil(sessions.length / pageSize));
  const currentPage = Math.min(pageNumber, totalPages);
  const visibleSessions = sessions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportHref = (() => {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      const resolved = one(value);

      if (resolved && key !== "p") query.set(key, resolved);
    }

    query.set("mode", "sessions");

    return `/api/admin/analytics/export?${query.toString()}`;
  })();

  return (
    <AdminShell
      adminEmail={admin.email}
      activeModule="analytics"
      title="Session Explorer"
      description="Every session in range, one row each — landing page, exit page, active time, and whether it converted."
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin/dashboard" },
        { label: "Analytics", href: "/admin/analytics" },
        { label: "Sessions" },
      ]}
      actions={
        <a
          href={exportHref}
          className="inline-flex items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-bold text-foreground transition hover:bg-accent"
        >
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
          {device || source || path ? (
            <p className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
              Filtered:
              {device ? <span className="rounded-full bg-secondary px-2 py-0.5">{device}</span> : null}
              {source ? <span className="rounded-full bg-secondary px-2 py-0.5">{source}</span> : null}
              {path ? <span className="rounded-full bg-secondary px-2 py-0.5">{path}</span> : null}
              <Link href="/admin/analytics/sessions" className="text-primary hover:underline">
                Clear
              </Link>
            </p>
          ) : null}
        </Panel>

        {loadError ? (
          <p className="rounded-lg border border-[var(--adm-danger-soft)] bg-[var(--adm-danger-soft)] p-4 text-sm font-semibold text-[var(--adm-danger)]">
            {loadError}
          </p>
        ) : sessions.length === 0 ? (
          <Panel contentClassName="p-0">
            <div className="p-5">
              <EmptyState title="No sessions in this range" description="Widen the date range or clear the filters above." />
            </div>
          </Panel>
        ) : (
          <Panel contentClassName="p-0" description={`${sessions.length} sessions`}>
            <Table>
              <TableHeader>
                <TableRow className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <TableHead className="px-5">Started</TableHead>
                  <TableHead className="px-5">Landing page</TableHead>
                  <TableHead className="px-5">Exit page</TableHead>
                  <TableHead className="px-5">Pages</TableHead>
                  <TableHead className="px-5">Active time</TableHead>
                  <TableHead className="px-5">Device</TableHead>
                  <TableHead className="px-5">Status</TableHead>
                  <TableHead className="px-5">Conversions</TableHead>
                  <TableHead className="px-5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleSessions.map((session) => {
                  const DeviceIcon = deviceIcons[session.device];

                  return (
                    <TableRow key={session.sessionId}>
                      <TableCell className="px-5 py-3.5 text-muted-foreground">
                        {startedFormat.format(new Date(session.startedAt))}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 font-semibold text-foreground">{session.landingPath}</TableCell>
                      <TableCell className="px-5 py-3.5 text-muted-foreground">{session.exitPath}</TableCell>
                      <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{session.pageViews}</TableCell>
                      <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">
                        {formatSeconds(session.activeSeconds)}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <DeviceIcon size={14} className="shrink-0 text-primary" aria-hidden />
                          {session.browser}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-3.5">
                        {session.engaged ? (
                          <StatusPill tone="success">Engaged</StatusPill>
                        ) : (
                          <StatusPill tone="neutral">Bounced</StatusPill>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">
                        {session.conversions}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-right">
                        <Link
                          href={`/admin/analytics/sessions/${encodeURIComponent(session.sessionId)}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:gap-2.5"
                        >
                          View
                          <ArrowRight size={13} aria-hidden />
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
                  Page {currentPage} of {totalPages} · {sessions.length} sessions
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
