import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock,
  Database,
  Download,
  ExternalLink,
  Filter,
  Globe2,
  Laptop,
  Lightbulb,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Phone,
  Smartphone,
  Sparkles,
  Tablet,
  Users,
} from "lucide-react";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { BreakdownBars } from "@/features/admin/analytics/BreakdownBars";
import { formatDuration, KpiCard, SimpleStatCard } from "@/features/admin/analytics/KpiCard";
import { resolveDateRange, rangePresets, toIstDateInput } from "@/features/admin/analytics/resolveRange";
import { TrendChart } from "@/features/admin/analytics/TrendChart";
import { EmptyState, Panel } from "@/features/admin/ui/primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildAnalyticsSummary, type PageRow } from "@/features/analytics/server/aggregate";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import type { AnalyticsEvent, ClickEventName, DeviceCategory, TrafficSource } from "@/features/analytics/core/types";
import { getChatRequestRepository } from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics | WHealth Admin",
  robots: { index: false, follow: false },
};

const deviceIcons: Record<DeviceCategory, typeof Laptop> = {
  desktop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
};

const sourceLabels: Record<TrafficSource, string> = {
  direct: "Direct",
  search: "Search engines",
  social: "Social",
  referral: "Referral sites",
  campaign: "Campaign (UTM)",
};

const clickEventLabels: Record<ClickEventName, string> = {
  cta_click: "CTA / button clicks",
  outbound_click: "Outbound link clicks",
  phone_click: "Phone number clicks",
  whatsapp_click: "WhatsApp clicks",
  email_click: "Email clicks",
};

const clickEventIcons: Record<ClickEventName, typeof Phone> = {
  cta_click: MousePointerClick,
  outbound_click: ExternalLink,
  phone_click: Phone,
  whatsapp_click: MessageCircle,
  email_click: Mail,
};

const pageSize = 10;
const eventReadLimit = 20_000;

type SearchParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildHref(current: SearchParams, overrides: Record<string, string | undefined>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(current)) {
    const resolved = one(value);

    if (resolved) params.set(key, resolved);
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }

  const query = params.toString();

  return query ? `/admin/analytics?${query}` : "/admin/analytics";
}

function sortPages(rows: PageRow[], sort: string | undefined, dir: string | undefined) {
  const key = (sort as keyof PageRow) || "views";
  const direction = dir === "asc" ? 1 : -1;

  return [...rows].sort((left, right) => {
    const a = left[key];
    const b = right[key];

    if (typeof a === "number" && typeof b === "number") return (a - b) * direction;

    return String(a).localeCompare(String(b)) * direction;
  });
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const admin = await requireAdminSession("/admin/analytics");
  const params = await searchParams;

  const range = resolveDateRange({
    range: one(params.range),
    from: one(params.from),
    to: one(params.to),
  });
  const device = one(params.device) as DeviceCategory | undefined;
  const source = one(params.source) as TrafficSource | undefined;
  const path = one(params.path) || undefined;
  const pageSearch = (one(params.q) || "").trim().toLowerCase();
  const pageNumber = Math.max(1, Number(one(params.p)) || 1);

  let events: AnalyticsEvent[] = [];
  let driver = "file";
  let loadError = "";

  try {
    const repository = getAnalyticsEventRepository();

    driver = repository.driver;
    events = await repository.list(eventReadLimit);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load analytics events.";
  }

  let chatRequests: Awaited<ReturnType<ReturnType<typeof getChatRequestRepository>["list"]>> = [];

  try {
    chatRequests = await getChatRequestRepository().list(5000);
  } catch {
    // Conversions simply show as 0 if the chat-request store is unreachable.
  }

  const summary = buildAnalyticsSummary(events, chatRequests, { from: range.from, to: range.to, device, source, path });

  const filteredPages = pageSearch
    ? summary.topPages.filter((row) => row.path.toLowerCase().includes(pageSearch))
    : summary.topPages;
  const sortedPages = sortPages(filteredPages, one(params.sort), one(params.dir));
  const totalPages = Math.max(1, Math.ceil(sortedPages.length / pageSize));
  const currentPage = Math.min(pageNumber, totalPages);
  const visiblePages = sortedPages.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function sortHref(key: string) {
    const nextDir = one(params.sort) === key && one(params.dir) !== "asc" ? "asc" : "desc";

    return buildHref(params, { sort: key, dir: nextDir, p: undefined });
  }

  const exportHref = (() => {
    const exportParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      const resolved = one(value);

      if (resolved && key !== "sort" && key !== "dir" && key !== "p" && key !== "q") {
        exportParams.set(key, resolved);
      }
    }

    const query = exportParams.toString();

    return `/api/admin/analytics/export${query ? `?${query}` : ""}`;
  })();

  return (
    <AdminShell
      adminEmail={admin.email}
      activeModule="analytics"
      title="Analytics"
      description="Real traffic from the public site, tracked by the built-in page-view logger — no third-party analytics account required."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold text-muted-foreground md:inline-flex">
            <Database size={14} aria-hidden />
            Stored in {driver === "firestore" ? "Firestore" : "the server's private data folder"}
          </span>
          <a
            href={exportHref}
            className="inline-flex items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-bold text-foreground transition hover:bg-accent"
          >
            <Download size={14} aria-hidden />
            Export page performance (CSV)
          </a>
        </div>
      }
    >
      <div className="space-y-5">
        {/* --------------------------------------------------------- filters */}
        <Panel contentClassName="p-4" className="overflow-visible">
          <div className="flex flex-wrap items-center justify-between gap-3">
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

            <form method="GET" className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="range" value="custom" />
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                From
                <input
                  type="date"
                  name="from"
                  defaultValue={toIstDateInput(range.from)}
                  className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground"
                />
              </label>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                To
                <input
                  type="date"
                  name="to"
                  defaultValue={toIstDateInput(range.to)}
                  className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground"
                />
              </label>
              {device ? <input type="hidden" name="device" value={device} /> : null}
              {source ? <input type="hidden" name="source" value={source} /> : null}
              {path ? <input type="hidden" name="path" value={path} /> : null}
              <button
                type="submit"
                className="h-8 rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground transition hover:opacity-90"
              >
                Apply
              </button>
            </form>
          </div>

          <form method="GET" className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
            <input type="hidden" name="range" value={range.preset} />
            {range.preset === "custom" ? (
              <>
                <input type="hidden" name="from" value={toIstDateInput(range.from)} />
                <input type="hidden" name="to" value={toIstDateInput(range.to)} />
              </>
            ) : null}

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

            <select
              name="source"
              defaultValue={source || ""}
              className="h-8 rounded-md border border-input bg-background px-2 text-xs font-semibold text-foreground"
            >
              <option value="">All traffic sources</option>
              {Object.entries(sourceLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <select
              name="path"
              defaultValue={path || ""}
              className="h-8 max-w-[220px] rounded-md border border-input bg-background px-2 text-xs font-semibold text-foreground"
            >
              <option value="">All pages</option>
              {summary.availablePaths.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>

            <input
              type="search"
              name="q"
              defaultValue={pageSearch}
              placeholder="Search pages…"
              className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground placeholder:text-muted-foreground"
            />

            <button
              type="submit"
              className="h-8 rounded-md border border-input px-3 text-xs font-bold text-foreground transition hover:bg-accent"
            >
              Apply filters
            </button>

            {device || source || path || pageSearch ? (
              <Link
                href={buildHref(params, { device: undefined, source: undefined, path: undefined, q: undefined, p: undefined })}
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
        ) : events.length === 0 ? (
          <Panel contentClassName="p-0">
            <div className="p-5">
              <EmptyState
                icon={MousePointerClick}
                title="No page views tracked yet"
                description="The page-view logger is live on every public page. Data will appear here as soon as visitors browse the site. While a Firebase service account is not configured, events are kept in the server's private data folder instead of Firestore."
              />
            </div>
          </Panel>
        ) : (
          <>
            {/* -------------------------------------------------------- KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <KpiCard label="Page views" trend={summary.totals.pageViews} icon={MousePointerClick} />
              <KpiCard label="Sessions" trend={summary.totals.sessions} icon={MonitorSmartphone} />
              <KpiCard label="Unique visitors" trend={summary.totals.uniqueVisitors} icon={Users} />
              <KpiCard label="New visitors" trend={summary.totals.newVisitors} icon={Users} />
              <SimpleStatCard label="Returning visitors" value={summary.totals.returningVisitors} />
              <KpiCard label="Conversions" trend={summary.totals.conversions} icon={ArrowUpDown} />
              <KpiCard label="CTA clicks" trend={summary.totals.ctaClicks} icon={MousePointerClick} />
              <KpiCard
                label="Avg. engagement time"
                trend={summary.totals.avgEngagementSeconds}
                icon={Clock}
                valueFormat="duration"
              />
              <KpiCard
                label="Bounce rate"
                trend={summary.totals.bounceRate}
                icon={Filter}
                valueFormat="percent"
                invertTone
              />
              <KpiCard label="Form submissions" trend={summary.totals.formSubmissions} icon={ArrowUpDown} />
            </div>

            {/* ------------------------------------------------------- trend */}
            <Panel
              eyebrow="Traffic trend"
              title="Page views & sessions over time"
              description={`${toIstDateInput(range.from)} to ${toIstDateInput(range.to)}, Asia/Kolkata`}
            >
              <TrendChart daily={summary.daily} />
            </Panel>

            {/* --------------------------------------------------- breakdowns */}
            <div className="grid gap-4 lg:grid-cols-3">
              <Panel eyebrow="Devices" title="Device breakdown">
                <BreakdownBars
                  rows={summary.devices.map((row) => ({ key: row.key, count: row.count, share: row.share }))}
                  iconFor={(key) => {
                    const Icon = deviceIcons[key];

                    return <Icon size={14} className="shrink-0 text-primary" aria-hidden />;
                  }}
                  labelFor={(key) => key.charAt(0).toUpperCase() + key.slice(1)}
                  emptyLabel="No device data in this range."
                />
              </Panel>

              <Panel eyebrow="Traffic sources" title="Where visitors came from">
                <BreakdownBars
                  rows={summary.sources.map((row) => ({ key: row.key, count: row.count, share: row.share }))}
                  labelFor={(key) => sourceLabels[key]}
                  emptyLabel="No traffic-source data in this range."
                />
              </Panel>

              <Panel eyebrow="Geography" title="Countries" icon={Globe2}>
                <BreakdownBars
                  rows={summary.countries.map((row) => ({ key: row.key, count: row.count, share: row.share }))}
                  emptyLabel="Country data needs a hosting platform that reports visitor geography (e.g. Vercel)."
                />
              </Panel>
            </div>

            {/* ----------------------------------------------- interactions */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel
                eyebrow="Click tracking"
                title="Interactions"
                icon={MousePointerClick}
                description="Every tel:, mailto:, WhatsApp, outbound and tagged-CTA click, site-wide — no per-page setup required."
              >
                <BreakdownBars
                  rows={summary.interactions.map((row) => ({ key: row.key, count: row.count, share: row.share }))}
                  labelFor={(key) => clickEventLabels[key]}
                  iconFor={(key) => {
                    const Icon = clickEventIcons[key];

                    return <Icon size={14} className="shrink-0 text-primary" aria-hidden />;
                  }}
                  emptyLabel="No clicks tracked in this range yet."
                />
              </Panel>

              <Panel eyebrow="Click tracking" title="Most clicked" icon={Sparkles}>
                {summary.topClickedElements.length === 0 ? (
                  <p className="py-6 text-center text-sm font-medium text-muted-foreground">
                    No individual buttons or links clicked in this range yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {summary.topClickedElements.map((element) => {
                      const Icon = clickEventIcons[element.eventName];

                      return (
                        <li key={element.key} className="flex items-center justify-between gap-3">
                          <span className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                            <Icon size={14} className="shrink-0 text-primary" aria-hidden />
                            <span className="truncate">{element.label}</span>
                          </span>
                          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold tabular-nums text-muted-foreground">
                            {element.count}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Panel>
            </div>

            {/* ------------------------------------------------- funnel + insights */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel
                eyebrow="Conversion path"
                title="Funnel"
                icon={Filter}
                description="Each step counts only sessions that also reached every step before it. CTA = any cta_click, outbound, phone, WhatsApp or email click."
              >
                {summary.funnel[0].sessions === 0 ? (
                  <p className="py-6 text-center text-sm font-medium text-muted-foreground">
                    No sessions in this range yet.
                  </p>
                ) : (
                  <ol className="space-y-3">
                    {summary.funnel.map((step) => (
                      <li key={step.id}>
                        <div className="flex items-center justify-between gap-2 text-sm">
                          <span className="font-semibold text-foreground">{step.label}</span>
                          <span className="tabular-nums text-muted-foreground">
                            {step.sessions} sessions
                            {step.pctOfPrevious !== null ? ` · ${step.pctOfPrevious}% of previous step` : ""}
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${Math.max(step.pctOfFirst ?? 100, step.sessions > 0 ? 2 : 0)}%`,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </Panel>

              <Panel eyebrow="Calculated from this range" title="Quick insights" icon={Lightbulb}>
                {summary.insights.length === 0 ? (
                  <p className="py-6 text-center text-sm font-medium text-muted-foreground">
                    Not enough data in this range to surface an insight yet.
                  </p>
                ) : (
                  <ul className="space-y-3.5">
                    {summary.insights.map((insight) => (
                      <li key={insight.id} className="rounded-lg border bg-secondary/30 px-3.5 py-3">
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">{insight.label}</p>
                        <p className="mt-1 text-sm text-foreground">{insight.detail}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>

            {/* --------------------------------------------------- top pages */}
            <Panel
              eyebrow="Page-wise analytics"
              title="Top pages"
              description="Select a page from the filter above to inspect it on its own, or sort the table to compare performance."
              contentClassName="p-0"
            >
              {visiblePages.length === 0 ? (
                <div className="p-5">
                  <EmptyState title="No pages match these filters" description="Try a different search term or clear the filters above." />
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        <TableHead className="px-5">Page</TableHead>
                        {[
                          { key: "views", label: "Views" },
                          { key: "uniqueVisitors", label: "Unique visitors" },
                          { key: "sessions", label: "Sessions" },
                          { key: "avgEngagementSeconds", label: "Avg. engagement" },
                          { key: "exitRate", label: "Exit rate" },
                          { key: "conversions", label: "Conversions" },
                        ].map((column) => (
                          <TableHead key={column.key} className="px-5">
                            <Link href={sortHref(column.key)} className="inline-flex items-center gap-1 transition hover:text-foreground">
                              {column.label}
                              {one(params.sort) === column.key ? (
                                one(params.dir) === "asc" ? (
                                  <ArrowUp size={12} aria-hidden />
                                ) : (
                                  <ArrowDown size={12} aria-hidden />
                                )
                              ) : (
                                <ArrowUpDown size={12} className="opacity-40" aria-hidden />
                              )}
                            </Link>
                          </TableHead>
                        ))}
                        <TableHead className="px-5">Share</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visiblePages.map((row) => (
                        <TableRow key={row.path}>
                          <TableCell className="px-5 py-3.5">
                            <Link href={buildHref(params, { path: row.path, p: undefined })} className="font-semibold text-foreground hover:text-primary">
                              {row.path}
                            </Link>
                          </TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{row.views}</TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{row.uniqueVisitors}</TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{row.sessions}</TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">
                            {row.avgEngagementSeconds > 0 ? formatDuration(row.avgEngagementSeconds) : "—"}
                          </TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{row.exitRate}%</TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{row.conversions}</TableCell>
                          <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">{row.share}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {totalPages > 1 ? (
                    <div className="flex items-center justify-between border-t px-5 py-3 text-xs font-semibold text-muted-foreground">
                      <span>
                        Page {currentPage} of {totalPages} · {sortedPages.length} pages
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
                </>
              )}
            </Panel>
          </>
        )}
      </div>
    </AdminShell>
  );
}
