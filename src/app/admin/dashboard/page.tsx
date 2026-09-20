import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, DatabaseZap, Layers } from "lucide-react";

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
  StatCard,
  StatusPill,
} from "@/features/admin/ui/primitives";
import { cmsCollections } from "@/lib/cms/collections";
import { readCmsCollection } from "@/lib/cms/read";
import { adminModules } from "@/lib/cms/modules";

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

function formatUpdatedAt(value?: string) {
  if (!value) return "—";

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? "—" : updatedFormat.format(parsed);
}

export default async function AdminDashboardPage() {
  const admin = await requireAdminSession("/admin/dashboard");

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

  const totalDocuments = snapshots.reduce(
    (total, snapshot) => total + snapshot.count,
    0
  );
  const liveCollections = snapshots.filter((snapshot) => snapshot.count > 0);
  const emptyCollections = snapshots.filter((snapshot) => snapshot.count === 0);
  const hasAnyContent = totalDocuments > 0;

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
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Documents in Firestore"
            value={totalDocuments}
            tone="accent"
          />
          <StatCard
            label="Live collections"
            value={liveCollections.length}
            tone="success"
          />
          <StatCard
            label="Still on seed"
            value={emptyCollections.length}
            tone={emptyCollections.length > 0 ? "warning" : "neutral"}
          />
        </div>

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
                  <TableRow key={snapshot.key}>
                    <TableCell className="px-5 py-3.5">
                      <p className="font-semibold">{snapshot.label}</p>
                      <code className="text-[11px] text-muted-foreground">
                        {snapshot.collection}
                      </code>
                    </TableCell>
                    <TableCell className="px-5 py-3.5 tabular-nums text-muted-foreground">
                      {snapshot.count}
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
                    className="flex items-start gap-3 rounded-lg border bg-card px-4 py-3 transition hover:bg-accent"
                  >
                    <Icon
                      size={17}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {moduleItem.label}
                      </span>
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
    </AdminShell>
  );
}
