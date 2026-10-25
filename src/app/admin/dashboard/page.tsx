import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Clock,
  DatabaseZap,
  Filter,
  Lightbulb,
  Layers,
  MessageSquareText,
  MousePointerClick,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EmptyState,
  Panel,
  StatusPill,
} from "@/features/admin/ui/primitives";
import { AnimatedNumber } from "@/features/admin/ui/AnimatedNumber";
import { RadialProgress } from "@/features/admin/ui/RadialProgress";
import { StorageHealthBanner } from "@/features/admin/ui/StorageHealthBanner";
import { BreakdownBars } from "@/features/admin/analytics/BreakdownBars";
import { KpiCard } from "@/features/admin/analytics/KpiCard";
import { TrendChart } from "@/features/admin/analytics/TrendChart";
import { rangePresets, resolveDateRange } from "@/features/admin/analytics/resolveRange";
import { cmsCollections } from "@/lib/cms/collections";
import { readCmsCollection } from "@/lib/cms/read";
import { adminModules } from "@/lib/cms/modules";
import { buildAnalyticsSummary, type AnalyticsSummary } from "@/features/analytics/server/aggregate";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import { getChatRequestRepository } from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | WHealth Admin",
  robots: { index: false, follow: false },
};

/** Collections surfaced on the dashboard, in the order they are listed. */
const trackedCollections: Array<{
  key: string;
  label: string;
  collection: string;
  href: string;
}> = [
  {
    key: "sections",
    label: "Site sections",
    collection: cmsCollections.sections,
    href: "/admin/home",
  },
  {
    key: "categories",
    label: "Categories",
    collection: cmsCollections.categories,
    href: "/admin/categories",
  },
  {
    key: "articles",
    label: "Articles",
    collection: cmsCollections.articles,
    href: "/admin/articles",
  },
  {
    key: "pregnancy",
    label: "Pregnancy guide",
    collection: cmsCollections.pregnancy,
    href: "/admin/pregnancy",
  },
  {
    key: "surgery",
    label: "Surgery services",
    collection: cmsCollections.surgery,
    href: "/admin/surgery",
  },
  {
    key: "chat",
    label: "Chat assistant",
    collection: cmsCollections.chat,
    href: "/admin/chat",
  },
];

const updatedFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});

const todayFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  day: "numeric",
  month: "long",
});

function formatUpdatedAt(value?: string) {
  if (!value) return "—";

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? "—" : updatedFormat.format(parsed);
}

/** IST hour of day, so "good morning" lines up with Gurgaon, not the server. */
function istGreeting() {
  const istHour = Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }).format(
      new Date()
    )
  );

  if (istHour < 12) return "Good morning";
  if (istHour < 17) return "Good afternoon";
  return "Good evening";
}

function displayNameFrom(email: string) {
  const [localPart] = email.split("@");

  if (!localPart) return "there";

  return localPart.split(/[._-]+/).filter(Boolean)[0] || "there";
}

const lastUpdatedFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "medium",
});

type SearchParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const admin = await requireAdminSession("/admin/dashboard");
  const params = await searchParams;
  const range = resolveDateRange({ range: one(params.range) || "7d" });
  const rangeHref = (presetId: string) =>
    presetId === "7d" ? "/admin/dashboard" : `/admin/dashboard?range=${presetId}`;

  // Read every tracked collection in parallel. Each read already falls back to
  // an empty list on failure, so one unreachable collection cannot blank the
  // whole dashboard.
  const snapshots = await Promise.all(
    trackedCollections.map(async (entry) => {
      const documents = await readCmsCollection(entry.collection);
      const latest = documents.reduce<string | undefined>((newest, document) => {
        if (!document.updatedAt) return newest;
        if (!newest) return document.updatedAt;

        return document.updatedAt > newest ? document.updatedAt : newest;
      }, undefined);

      return {
        ...entry,
        count: documents.length,
        updatedAt: latest,
        updatedBy: documents.find((document) => document.updatedBy)?.updatedBy,
      };
    })
  );

  const totalDocuments = snapshots.reduce((total, snapshot) => total + snapshot.count, 0);
  const liveCollections = snapshots.filter((snapshot) => snapshot.count > 0);
  const emptyCollections = snapshots.filter((snapshot) => snapshot.count === 0);
  const hasAnyContent = totalDocuments > 0;
  const contentHealthPct =
    snapshots.length > 0 ? (liveCollections.length / snapshots.length) * 100 : 0;

  const compositionRows = snapshots
    .filter((snapshot) => snapshot.count > 0)
    .map((snapshot) => ({
      key: snapshot.key,
      count: snapshot.count,
      share: totalDocuments > 0 ? Math.round((snapshot.count / totalDocuments) * 1000) / 10 : 0,
    }))
    .sort((left, right) => right.count - left.count);
  const compositionLabels = new Map(snapshots.map((snapshot) => [snapshot.key, snapshot.label]));

  let summary: AnalyticsSummary | null = null;
  let analyticsDriver: "file" | "firestore" = "file";

  try {
    const eventRepository = getAnalyticsEventRepository();

    analyticsDriver = eventRepository.driver;

    const [events, chatRequests] = await Promise.all([
      eventRepository.list(20_000),
      getChatRequestRepository().list(5_000),
    ]);

    summary = buildAnalyticsSummary(events, chatRequests, {
      from: range.from,
      to: range.to,
    });
  } catch {
    // The dashboard's own collection table still renders; analytics is a bonus tile.
  }

  const renderedAt = new Date();

  return (
    <AdminShell
      activeModule="dashboard"
      title="Dashboard"
      description="What is live in Firestore right now, and what is still served from the built-in seed."
      adminEmail={admin.email}
      actions={
        <Link href="/admin">
          <Button>
            <DatabaseZap aria-hidden />
            Data migration
          </Button>
        </Link>
      }
    >
      <div className="space-y-5">
        {analyticsDriver !== "firestore" ? <StorageHealthBanner subject="Analytics" /> : null}

        {/* -------------------------------------------------------- welcome */}
        <div
          className="wh-rise flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-5"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(90,79,254,0.08), rgba(27,20,99,0.04) 55%, transparent)",
          }}
        >
          <div className="flex items-center gap-3.5">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_24px_-10px_rgba(27,20,99,0.6)]"
              style={{ backgroundImage: "linear-gradient(135deg, var(--ui-primary), var(--adm-ink))" }}
            >
              <Sparkles size={20} aria-hidden />
            </span>
            <div>
              <h2 className="font-admin-display text-lg font-extrabold tracking-tight text-foreground">
                {istGreeting()}, {displayNameFrom(admin.email)}
              </h2>
              <p className="text-xs text-muted-foreground">{todayFormat.format(new Date())}</p>
            </div>
          </div>

          <RadialProgress
            percent={contentHealthPct}
            label="Content live"
            sublabel={`${liveCollections.length} of ${snapshots.length} collections`}
          />
        </div>

        {/* ---------------------------------------------- range + refresh */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            className="flex flex-wrap gap-1 rounded-lg border border-input bg-secondary/40 p-1"
            aria-label="Date range"
          >
            {rangePresets
              .filter((preset) => preset.id !== "today")
              .map((preset) => (
                <Link
                  key={preset.id}
                  href={rangeHref(preset.id)}
                  aria-current={range.preset === preset.id ? "page" : undefined}
                  className={`rounded-md px-3 py-1.5 text-sm font-bold transition ${
                    range.preset === preset.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {preset.label}
                </Link>
              ))}
            <Link
              href="/admin/analytics"
              className="rounded-md px-3 py-1.5 text-sm font-bold text-muted-foreground transition hover:bg-accent"
            >
              Custom…
            </Link>
          </nav>

          <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
            <span>Updated {lastUpdatedFormat.format(renderedAt)}, Asia/Kolkata</span>
            <Link
              href={rangeHref(range.preset)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5 text-foreground transition hover:bg-accent"
            >
              <RefreshCw size={13} aria-hidden />
              Refresh
            </Link>
          </div>
        </div>

        {/* --------------------------------------------------------- KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary ? (
            <>
              <div className="wh-rise" style={{ "--wh-delay": "40ms" } as CSSProperties}>
                <KpiCard label="Page views" trend={summary.totals.pageViews} icon={BarChart3} />
              </div>
              <div className="wh-rise" style={{ "--wh-delay": "90ms" } as CSSProperties}>
                <KpiCard label="Sessions" trend={summary.totals.sessions} icon={MousePointerClick} />
              </div>
              <div className="wh-rise" style={{ "--wh-delay": "140ms" } as CSSProperties}>
                <KpiCard label="Unique visitors" trend={summary.totals.uniqueVisitors} icon={Users} />
              </div>
              <div className="wh-rise" style={{ "--wh-delay": "190ms" } as CSSProperties}>
                <KpiCard label="Chat conversions" trend={summary.totals.conversions} icon={MessageSquareText} />
              </div>
              <div className="wh-rise" style={{ "--wh-delay": "230ms" } as CSSProperties}>
                <KpiCard label="CTA clicks" trend={summary.totals.ctaClicks} icon={MousePointerClick} />
              </div>
              <div className="wh-rise" style={{ "--wh-delay": "270ms" } as CSSProperties}>
                <KpiCard
                  label="Avg. engagement"
                  trend={summary.totals.avgEngagementSeconds}
                  icon={Clock}
                  valueFormat="duration"
                />
              </div>
              <div className="wh-rise" style={{ "--wh-delay": "310ms" } as CSSProperties}>
                <KpiCard
                  label="Bounce rate"
                  trend={summary.totals.bounceRate}
                  icon={Filter}
                  valueFormat="percent"
                  invertTone
                />
              </div>
            </>
          ) : (
            <div className="sm:col-span-2 xl:col-span-4">
              <EmptyState
                icon={BarChart3}
                title="No analytics yet"
                description="Traffic KPIs will appear here as soon as the site starts logging page views."
              />
            </div>
          )}
        </div>

        {/* --------------------------------------------- trend + composition */}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="wh-rise" style={{ "--wh-delay": "80ms" } as CSSProperties}>
            <Panel
              eyebrow={rangePresets.find((preset) => preset.id === range.preset)?.label ?? "Custom range"}
              title="Site traffic"
              icon={BarChart3}
              action={
                <Link href="/admin/analytics">
                  <Button variant="outline" size="sm">
                    Open analytics
                    <ArrowRight aria-hidden />
                  </Button>
                </Link>
              }
            >
              {summary ? (
                <TrendChart daily={summary.daily} />
              ) : (
                <div className="flex h-[220px] items-center justify-center text-sm font-medium text-muted-foreground">
                  No page views in this range yet.
                </div>
              )}
            </Panel>
          </div>

          <div className="wh-rise" style={{ "--wh-delay": "130ms" } as CSSProperties}>
            <Panel eyebrow="Content" title="Composition" icon={Layers}>
              <BreakdownBars
                rows={compositionRows}
                labelFor={(key) => compositionLabels.get(key) ?? key}
                emptyLabel="Nothing imported into Firestore yet."
              />
            </Panel>
          </div>
        </div>

        {/* ------------------------------------------------- funnel + insights */}
        {summary ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="wh-rise" style={{ "--wh-delay": "160ms" } as CSSProperties}>
              <Panel
                eyebrow="Conversion path"
                title="Funnel"
                icon={Filter}
                description="Each step counts only sessions that also reached every step before it."
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
            </div>

            <div className="wh-rise" style={{ "--wh-delay": "200ms" } as CSSProperties}>
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
          </div>
        ) : null}

        {/* -------------------------------------------------- collections */}
        <div className="wh-rise" style={{ "--wh-delay": "100ms" } as CSSProperties}>
          <Panel
            eyebrow="Content"
            title="Collection status"
            icon={Layers}
            description="A collection with no documents falls back to the content compiled into the repository, so the site keeps rendering either way."
            contentClassName="p-0"
          >
            {!hasAnyContent ? (
              <div className="p-5">
                <EmptyState
                  icon={DatabaseZap}
                  title="Firestore is empty"
                  description="Nothing has been imported yet. Every page is currently served from the built-in seed data. Run the migration to make content editable."
                  action={
                    <Link href="/admin">
                      <Button>
                        <DatabaseZap aria-hidden />
                        Go to data migration
                      </Button>
                    </Link>
                  }
                />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    <TableHead className="px-5">Collection</TableHead>
                    <TableHead className="px-5">Documents</TableHead>
                    <TableHead className="px-5">Last updated</TableHead>
                    <TableHead className="px-5">Status</TableHead>
                    <TableHead className="px-5" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {snapshots.map((snapshot) => (
                    <TableRow key={snapshot.key} className="transition-colors hover:bg-accent/50">
                      <TableCell className="px-5 py-3.5">
                        <p className="font-semibold">{snapshot.label}</p>
                        <code className="text-[11px] text-muted-foreground">{snapshot.collection}</code>
                      </TableCell>
                      <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">
                        <AnimatedNumber value={snapshot.count} />
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-muted-foreground">
                        {formatUpdatedAt(snapshot.updatedAt)}
                      </TableCell>
                      <TableCell className="px-5 py-3.5">
                        {snapshot.count > 0 ? (
                          <StatusPill tone="success">Live</StatusPill>
                        ) : (
                          <StatusPill tone="warning">Seed</StatusPill>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-right">
                        <Link
                          href={snapshot.href}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:gap-2.5"
                        >
                          Open
                          <ArrowRight size={13} aria-hidden />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Panel>
        </div>

        {/* ---------------------------------------------------- shortcuts */}
        <div className="wh-rise" style={{ "--wh-delay": "150ms" } as CSSProperties}>
          <Panel eyebrow="Shortcuts" title="All modules" contentClassName="p-4">
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {adminModules
                .filter((moduleItem) => !moduleItem.hidden && moduleItem.id !== "dashboard")
                .map((moduleItem) => {
                  const Icon = moduleItem.icon;

                  return (
                    <Link
                      key={moduleItem.id}
                      href={moduleItem.href}
                      className="wh-hover-lift flex items-start gap-3 rounded-lg border border-transparent bg-card px-4 py-3 hover:bg-card"
                    >
                      <Icon size={17} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{moduleItem.label}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                          {moduleItem.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
            </div>
          </Panel>
        </div>

        {emptyCollections.length > 0 && hasAnyContent ? (
          <p className="text-xs text-muted-foreground">
            {emptyCollections.length} collection{emptyCollections.length === 1 ? "" : "s"} still on seed data.
          </p>
        ) : null}
      </div>
    </AdminShell>
  );
}
