"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertTriangle, Check, Loader2, RotateCcw, Save } from "lucide-react";

import ContentEditor from "./ContentEditor";
import { useAdminFirebaseUser } from "./useAdminFirebaseUser";
import { writeCmsDocument } from "./writeCmsDocument";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Panel, StatusPill } from "@/features/admin/ui/primitives";

/**
 * One editable section: the form, its save state, and where the copy came from.
 *
 * Content is held as a plain value and compared against the version that was
 * loaded, so the Save button can stay disabled until something actually
 * changes and a stray click cannot write an identical document (and a
 * pointless audit entry) to Firestore.
 */

type SectionEditorPanelProps = {
  sectionId: string;
  collection: string;
  label: string;
  description: string;
  initialContent: unknown;
  source: "firestore" | "seed";
  updatedAt?: string;
  updatedBy?: string;
  order?: number;
};

type SaveState =
  | { phase: "idle" }
  | { phase: "saving" }
  | { phase: "saved" }
  | { phase: "error"; message: string };

const updatedFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});

function formatUpdated(value?: string) {
  if (!value) return null;

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : updatedFormat.format(parsed);
}

export default function SectionEditorPanel({
  sectionId,
  collection,
  label,
  description,
  initialContent,
  source,
  updatedAt,
  updatedBy,
  order = 0,
}: SectionEditorPanelProps) {
  const { isSignedIn, isResolving } = useAdminFirebaseUser();

  // The baseline the dirty check compares against. It advances on a successful
  // save so the panel returns to a clean state without a page reload.
  const [baseline, setBaseline] = useState(initialContent);
  const [content, setContent] = useState(initialContent);
  const [saveState, setSaveState] = useState<SaveState>({ phase: "idle" });
  const [currentSource, setCurrentSource] = useState(source);

  const isDirty = useMemo(
    () => JSON.stringify(content) !== JSON.stringify(baseline),
    [content, baseline]
  );

  const handleChange = useCallback((next: unknown) => {
    setContent(next);
    // Any edit clears a previous outcome, so a stale green tick does not sit
    // next to unsaved changes.
    setSaveState((current) =>
      current.phase === "idle" ? current : { phase: "idle" }
    );
  }, []);

  const handleReset = useCallback(() => {
    setContent(baseline);
    setSaveState({ phase: "idle" });
  }, [baseline]);

  const handleSave = useCallback(async () => {
    setSaveState({ phase: "saving" });

    try {
      await writeCmsDocument({
        collection,
        documentId: sectionId,
        content,
        title: label,
        order,
        status: "published",
      });

      // Purge the public page cache so the edit is visible straight away.
      // A failure here is not a failed save, so it must not surface as one.
      await fetch("/api/admin/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection }),
      }).catch(() => null);

      setBaseline(content);
      setCurrentSource("firestore");
      setSaveState({ phase: "saved" });
    } catch (error) {
      setSaveState({
        phase: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not save. Check your Firestore rules and try again.",
      });
    }
  }, [collection, content, label, order, sectionId]);

  const lastUpdated = formatUpdated(updatedAt);
  const isSaving = saveState.phase === "saving";

  return (
    <Panel
      eyebrow={sectionId}
      title={label}
      description={description}
      action={
        <div className="flex flex-wrap items-center gap-2">
          {currentSource === "seed" ? (
            <StatusPill tone="warning">Not imported</StatusPill>
          ) : (
            <StatusPill tone="success">Live</StatusPill>
          )}
          {isDirty ? <StatusPill tone="neutral">Unsaved</StatusPill> : null}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!isDirty || isSaving}
          >
            <RotateCcw aria-hidden />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => void handleSave()}
            disabled={!isDirty || isSaving || (!isSignedIn && !isResolving)}
          >
            {isSaving ? (
              <Loader2 className="animate-spin" aria-hidden />
            ) : (
              <Save aria-hidden />
            )}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      }
    >
      {currentSource === "seed" ? (
        <Alert className="mb-4 border-transparent bg-[var(--adm-warning-soft)] text-[var(--adm-warning)]">
          <AlertDescription className="text-[var(--adm-warning)]">
            This section has not been imported into Firestore yet, so you are
            editing the copy built into the site. Saving will create the
            document and take over from the built-in version.
          </AlertDescription>
        </Alert>
      ) : null}

      {saveState.phase === "error" ? (
        <Alert className="mb-4 border-transparent bg-[var(--adm-danger-soft)] text-[var(--adm-danger)]">
          <AlertTriangle aria-hidden />
          <AlertDescription className="text-[var(--adm-danger)]">
            {saveState.message}
          </AlertDescription>
        </Alert>
      ) : null}

      {saveState.phase === "saved" ? (
        <Alert className="mb-4 border-transparent bg-[var(--adm-success-soft)] text-[var(--adm-success)]">
          <Check aria-hidden />
          <AlertDescription className="text-[var(--adm-success)]">
            Saved. The public site is updated.
          </AlertDescription>
        </Alert>
      ) : null}

      <ContentEditor value={content} onChange={handleChange} />

      {lastUpdated ? (
        <p className="mt-5 border-t pt-3 text-xs text-muted-foreground">
          Last updated {lastUpdated}
          {updatedBy ? ` by ${updatedBy}` : ""}
        </p>
      ) : null}
    </Panel>
  );
}
