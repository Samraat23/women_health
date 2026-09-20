"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  DatabaseZap,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { useAdminFirebaseUser } from "@/features/admin/cms/useAdminFirebaseUser";
import {
  recordAudit,
  writeCmsDocuments,
  type CmsWriteInput,
} from "@/features/admin/cms/writeCmsDocument";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  Panel,
  StatCard,
  StatusPill,
} from "@/features/admin/ui/primitives";
import type { JsonSafe } from "@/lib/cms/serialize";

/**
 * Moves the repository's built-in content into Firestore.
 *
 * The write happens here, in the browser, as the signed-in admin — so the
 * migration is subject to the same Firestore rules as any other edit and the
 * project never needs a service-account key on disk. The server only assembles
 * the payloads (see `/api/admin/migration`).
 *
 * Imports are idempotent: every document is written by a stable id with
 * `merge: true`, so re-running a group updates rather than duplicates.
 */

type SeedSummaryGroup = {
  moduleId: string;
  label: string;
  collection: string;
  description: string;
  documentCount: number;
  bytes: number;
  error: string | null;
};

type SeedDocument = {
  documentId: string;
  title: string;
  category?: string;
  order: number;
  content: JsonSafe;
};

type GroupState = {
  phase: "idle" | "loading" | "writing" | "done" | "error";
  written?: number;
  total?: number;
  message?: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MigrationPanel() {
  const { email, isResolving, isSignedIn } = useAdminFirebaseUser();
  const [groups, setGroups] = useState<SeedSummaryGroup[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [state, setState] = useState<Record<string, GroupState>>({});
  const [isRunningAll, setIsRunningAll] = useState(false);

  const loadSummary = useCallback(async () => {
    setLoadError(null);

    try {
      const response = await fetch("/api/admin/migration", {
        cache: "no-store",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        throw new Error(body?.message || `Request failed (${response.status}).`);
      }

      const data = (await response.json()) as { groups: SeedSummaryGroup[] };

      setGroups(data.groups);
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Could not load migration data."
      );
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const runGroup = useCallback(
    async (group: SeedSummaryGroup) => {
      setState((current) => ({
        ...current,
        [group.moduleId]: { phase: "loading" },
      }));

      try {
        const response = await fetch(
          `/api/admin/migration?group=${encodeURIComponent(group.moduleId)}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;

          throw new Error(body?.message || `Request failed (${response.status}).`);
        }

        const { group: payload } = (await response.json()) as {
          group: { collection: string; documents: SeedDocument[] };
        };

        const inputs: CmsWriteInput<JsonSafe>[] = payload.documents.map(
          (document) => ({
            collection: payload.collection,
            documentId: document.documentId,
            content: document.content,
            title: document.title,
            category: document.category,
            order: document.order,
            status: "published",
          })
        );

        setState((current) => ({
          ...current,
          [group.moduleId]: {
            phase: "writing",
            written: 0,
            total: inputs.length,
          },
        }));

        const result = await writeCmsDocuments(inputs, (progress) => {
          setState((current) => ({
            ...current,
            [group.moduleId]: {
              phase: "writing",
              written: progress.written,
              total: progress.total,
            },
          }));
        });

        await recordAudit({
          action: "import",
          collection: payload.collection,
          documentCount: result.written,
          actor: result.actor,
        });

        setState((current) => ({
          ...current,
          [group.moduleId]: {
            phase: "done",
            written: result.written,
            total: result.total,
          },
        }));

        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Import failed.";

        setState((current) => ({
          ...current,
          [group.moduleId]: { phase: "error", message },
        }));

        return false;
      }
    },
    []
  );

  const runAll = useCallback(async () => {
    if (!groups) return;

    setIsRunningAll(true);

    // Sequential on purpose. Running six groups at once would fan out to
    // hundreds of concurrent writes and trip Firestore's per-client limits;
    // the whole import is a few seconds either way.
    for (const group of groups) {
      if (group.error || group.documentCount === 0) continue;

      const ok = await runGroup(group);

      // Stop on the first failure so the operator sees which group broke
      // rather than a wall of six identical permission errors.
      if (!ok) break;
    }

    setIsRunningAll(false);
  }, [groups, runGroup]);

  const totalDocuments =
    groups?.reduce((total, group) => total + group.documentCount, 0) ?? 0;
  const totalBytes = groups?.reduce((total, group) => total + group.bytes, 0) ?? 0;
  const importedGroups = Object.values(state).filter(
    (entry) => entry.phase === "done"
  ).length;

  const isBusy =
    isRunningAll ||
    Object.values(state).some(
      (entry) => entry.phase === "loading" || entry.phase === "writing"
    );

  return (
    <div className="space-y-5">
      {/* ------------------------------------------------------- summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Documents to import" value={totalDocuments} tone="accent" />
        <StatCard
          label="Payload size"
          value={formatBytes(totalBytes)}
          tone="neutral"
        />
        <StatCard
          label="Groups imported"
          value={`${importedGroups}/${groups?.length ?? 0}`}
          tone={importedGroups > 0 ? "success" : "neutral"}
        />
      </div>

      {/* --------------------------------------------------- auth notice */}
      {!isResolving && !isSignedIn ? (
        <Alert variant="destructive">
          <AlertTriangle aria-hidden />
          <AlertTitle>Firebase session expired</AlertTitle>
          <AlertDescription>
            You are still signed into the admin panel, but the Firebase session
            that authorises writes has lapsed. Log out and back in before
            importing.
          </AlertDescription>
        </Alert>
      ) : null}

      {/* ---------------------------------------------------- group list */}
      <Panel
        eyebrow="Firestore"
        title="Content import"
        icon={DatabaseZap}
        description="Writes the built-in content into Firestore as the signed-in admin. Safe to re-run: documents are written by a stable id and merged, never duplicated."
        action={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void loadSummary()}
              disabled={isBusy}
            >
              <RefreshCw aria-hidden />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={() => void runAll()}
              disabled={isBusy || !isSignedIn || !groups?.length}
            >
              {isRunningAll ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <Database aria-hidden />
              )}
              {isRunningAll ? "Importing..." : "Import everything"}
            </Button>
          </div>
        }
        contentClassName="p-0"
      >
        {loadError ? (
          <div className="p-5">
            <EmptyState
              icon={AlertTriangle}
              title="Could not load the migration payload"
              description={loadError}
              action={
                <Button variant="outline" onClick={() => void loadSummary()}>
                  <RefreshCw aria-hidden />
                  Try again
                </Button>
              }
            />
          </div>
        ) : !groups ? (
          <div className="flex items-center justify-center gap-2 p-10 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" aria-hidden />
            Building payloads...
          </div>
        ) : (
          <ul className="divide-y">
            {groups.map((group) => {
              const groupState = state[group.moduleId] || { phase: "idle" };
              const isGroupBusy =
                groupState.phase === "loading" || groupState.phase === "writing";

              return (
                <li
                  key={group.moduleId}
                  className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <p className="text-sm font-bold text-foreground">
                        {group.label}
                      </p>
                      <code className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground">
                        {group.collection}
                      </code>
                      {groupState.phase === "done" ? (
                        <StatusPill tone="success">
                          Imported {groupState.written}
                        </StatusPill>
                      ) : null}
                      {groupState.phase === "error" ? (
                        <StatusPill tone="danger">Failed</StatusPill>
                      ) : null}
                      {group.error ? (
                        <StatusPill tone="warning">Source error</StatusPill>
                      ) : null}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {group.description}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {group.documentCount} document
                      {group.documentCount === 1 ? "" : "s"} ·{" "}
                      {formatBytes(group.bytes)}
                      {groupState.phase === "writing" &&
                      typeof groupState.written === "number"
                        ? ` · writing ${groupState.written}/${groupState.total}`
                        : ""}
                    </p>

                    {group.error || groupState.message ? (
                      <p className="mt-2 rounded-md bg-[var(--adm-danger-soft)] px-2.5 py-1.5 text-xs text-[var(--adm-danger)]">
                        {group.error || groupState.message}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    variant={groupState.phase === "done" ? "outline" : "default"}
                    size="sm"
                    onClick={() => void runGroup(group)}
                    disabled={
                      isBusy ||
                      !isSignedIn ||
                      Boolean(group.error) ||
                      group.documentCount === 0
                    }
                  >
                    {isGroupBusy ? (
                      <Loader2 className="animate-spin" aria-hidden />
                    ) : groupState.phase === "done" ? (
                      <CheckCircle2 aria-hidden />
                    ) : (
                      <Database aria-hidden />
                    )}
                    {isGroupBusy
                      ? "Importing"
                      : groupState.phase === "done"
                        ? "Re-import"
                        : "Import"}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      {/* ------------------------------------------------------ reminder */}
      <Panel eyebrow="Before you import" title="Firestore rules must be deployed">
        <p className="text-sm leading-6 text-muted-foreground">
          Importing writes to Firestore as{" "}
          <span className="font-semibold text-foreground">
            {email || "your admin account"}
          </span>
          . The rules in{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            firestore.rules
          </code>{" "}
          allow that account to write the{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            cms_*
          </code>{" "}
          collections. If they have not been deployed yet, every import fails
          with a permission error.
        </p>
        <pre className="admin-scroll mt-3 overflow-x-auto rounded-lg border border-input bg-background px-4 py-3 text-xs text-muted-foreground">
          firebase deploy --only firestore:rules,storage
        </pre>
      </Panel>
    </div>
  );
}
