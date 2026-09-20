"use client";

import { useId, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import {
  blankEntryLike,
  humanizeKey,
  inferFieldKind,
  summarizeEntry,
  type FieldKind,
} from "./fieldMeta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contentIconNames } from "@/lib/cms/icons";
import { cn } from "@/lib/utils";

/**
 * Renders an editable form for arbitrary CMS content, built from shadcn/ui.
 *
 * Section payloads have no single schema — the navbar is an object with a
 * nested item list, the FAQ is an object with a question array, `associations`
 * is a flat array — so the editor derives its controls from the data's own
 * shape rather than from a schema written per section. That is what lets one
 * component serve every module, and what makes a newly registered section
 * editable without any further code.
 *
 * The trade-off: the editor can add and remove entries but cannot invent a key
 * that is absent from the data everywhere. Introducing a brand-new field means
 * editing the seed, which is much the rarer operation.
 */

const fieldLabelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground";

type ValueEditorProps = {
  fieldKey: string;
  value: unknown;
  onChange: (next: unknown) => void;
  depth: number;
};

// --------------------------------------------------------------- primitives

function PrimitiveField({
  fieldKey,
  kind,
  value,
  onChange,
}: {
  fieldKey: string;
  kind: FieldKind;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  const fieldId = useId();
  const label = humanizeKey(fieldKey);

  if (kind === "boolean") {
    return (
      <div className="flex items-center gap-2.5">
        <input
          id={fieldId}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-primary"
        />
        <Label htmlFor={fieldId} className="text-sm font-medium">
          {label}
        </Label>
      </div>
    );
  }

  if (kind === "number") {
    return (
      <div>
        <Label htmlFor={fieldId} className={fieldLabelClass}>
          {label}
        </Label>
        <Input
          id={fieldId}
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(event) => {
            const next = event.target.value;

            // An empty box is not 0 — keep it empty until they type, or the
            // field fights anyone trying to clear it before retyping.
            onChange(next === "" ? "" : Number(next));
          }}
        />
      </div>
    );
  }

  if (kind === "icon") {
    const current = typeof value === "string" ? value : "";
    const isKnown = contentIconNames.includes(current as never);

    return (
      <div>
        <Label className={fieldLabelClass}>{label}</Label>
        <Select
          // Radix treats "" as no selection, so the cleared state uses a
          // sentinel that is mapped back to an empty string on change.
          value={isKnown ? current : "__none__"}
          onValueChange={(next) => onChange(next === "__none__" ? "" : next)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="No icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">No icon</SelectItem>
            {contentIconNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (kind === "color") {
    const current = typeof value === "string" ? value : "";
    const isHex = /^#[0-9a-f]{3,8}$/i.test(current);

    return (
      <div>
        <Label htmlFor={fieldId} className={fieldLabelClass}>
          {label}
        </Label>
        <div className="flex items-center gap-2">
          {/* A colour input cannot represent the Tailwind class names and
              rgba() values some sections use, so the text field stays
              authoritative and the swatch is an optional helper. */}
          <input
            type="color"
            value={isHex ? current.slice(0, 7) : "#000000"}
            onChange={(event) => onChange(event.target.value)}
            className="h-9 w-10 shrink-0 cursor-pointer rounded-md border bg-background"
            aria-label={`${label} colour picker`}
          />
          <Input
            id={fieldId}
            value={current}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>
    );
  }

  if (kind === "image") {
    const current = typeof value === "string" ? value : "";

    // Only preview something actually addressable. A key the heuristic
    // mis-read as an image would otherwise resolve its value as a relative
    // path and fire a 404 on every keystroke.
    const isPreviewable =
      current.startsWith("/") ||
      current.startsWith("http://") ||
      current.startsWith("https://") ||
      current.startsWith("data:");

    return (
      <div>
        <Label htmlFor={fieldId} className={fieldLabelClass}>
          {label}
        </Label>
        <div className="flex items-start gap-3">
          <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border bg-secondary">
            {isPreviewable ? (
              // Deliberately a plain <img>: the value can be any path or
              // remote URL an editor types, and next/image throws on a host
              // that is not in next.config's allow-list.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current}
                alt=""
                className="size-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            ) : (
              <span className="text-[10px] text-muted-foreground">None</span>
            )}
          </span>
          <Input
            id={fieldId}
            value={current}
            placeholder="/image/example.png"
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>
    );
  }

  if (kind === "longText") {
    return (
      <div>
        <Label htmlFor={fieldId} className={fieldLabelClass}>
          {label}
        </Label>
        <Textarea
          id={fieldId}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className="resize-y leading-6"
        />
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor={fieldId} className={fieldLabelClass}>
        {label}
      </Label>
      <Input
        id={fieldId}
        type={kind === "url" ? "url" : "text"}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

// -------------------------------------------------------------------- lists

function ListEditor({
  fieldKey,
  value,
  onChange,
  depth,
}: {
  fieldKey: string;
  value: unknown[];
  onChange: (next: unknown[]) => void;
  depth: number;
}) {
  const [openItem, setOpenItem] = useState<string>(
    value.length === 1 ? "entry-0" : ""
  );

  const isPrimitiveList = value.every(
    (entry) => typeof entry === "string" || typeof entry === "number"
  );

  function replaceAt(index: number, next: unknown) {
    const copy = [...value];
    copy[index] = next;
    onChange(copy);
  }

  function removeAt(index: number) {
    onChange(value.filter((_, position) => position !== index));
    setOpenItem("");
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;

    if (target < 0 || target >= value.length) return;

    const copy = [...value];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
    setOpenItem(`entry-${target}`);
  }

  function add() {
    // Shape the new entry like the existing ones so the form knows which
    // controls to render for it. An empty list can only take a string.
    const template = value.length > 0 ? value[value.length - 1] : "";

    onChange([...value, blankEntryLike(template)]);
    setOpenItem(`entry-${value.length}`);
  }

  const heading = (
    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
      {humanizeKey(fieldKey)}
      <span className="ml-2 font-medium normal-case tracking-normal">
        {value.length} {value.length === 1 ? "item" : "items"}
      </span>
    </p>
  );

  const addButton = (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={add}
      className="mt-2 border-dashed"
    >
      <Plus aria-hidden />
      Add {isPrimitiveList ? "item" : "entry"}
    </Button>
  );

  // A list of plain strings (checklists, paragraphs, focus points) reads far
  // better as stacked inputs than as collapsible cards.
  if (isPrimitiveList) {
    return (
      <div>
        {heading}
        <div className="space-y-2">
          {value.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type={typeof entry === "number" ? "number" : "text"}
                value={entry as string | number}
                onChange={(event) =>
                  replaceAt(
                    index,
                    typeof entry === "number"
                      ? Number(event.target.value)
                      : event.target.value
                  )
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeAt(index)}
                aria-label={`Remove item ${index + 1}`}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 aria-hidden />
              </Button>
            </div>
          ))}
        </div>
        {addButton}
      </div>
    );
  }

  return (
    <div>
      {heading}

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="space-y-2"
      >
        {value.map((entry, index) => (
          <AccordionItem
            key={index}
            value={`entry-${index}`}
            className="overflow-hidden rounded-lg border bg-card last:border-b"
          >
            <div className="flex items-center gap-1 pr-2">
              <AccordionTrigger className="flex-1 px-3 py-2.5 hover:no-underline">
                <span className="truncate text-sm font-semibold">
                  {summarizeEntry(entry, `Item ${index + 1}`)}
                </span>
              </AccordionTrigger>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move ${index + 1} up`}
                className="shrink-0 text-muted-foreground"
              >
                <span aria-hidden>↑</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => move(index, 1)}
                disabled={index === value.length - 1}
                aria-label={`Move ${index + 1} down`}
                className="shrink-0 text-muted-foreground"
              >
                <span aria-hidden>↓</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeAt(index)}
                aria-label={`Remove ${index + 1}`}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 aria-hidden />
              </Button>
            </div>

            <AccordionContent className="border-t bg-secondary/50 px-3 py-3">
              <ValueEditor
                fieldKey={fieldKey}
                value={entry}
                onChange={(next) => replaceAt(index, next)}
                depth={depth + 1}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {addButton}
    </div>
  );
}

// --------------------------------------------------------------- dispatcher

function ValueEditor({ fieldKey, value, onChange, depth }: ValueEditorProps) {
  if (Array.isArray(value)) {
    return (
      <ListEditor
        fieldKey={fieldKey}
        value={value}
        onChange={onChange}
        depth={depth}
      />
    );
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;

    return (
      <div className={cn("space-y-4", depth > 0 && "space-y-3")}>
        {Object.entries(record).map(([key, entry]) => (
          <ValueEditor
            key={key}
            fieldKey={key}
            value={entry}
            onChange={(next) => onChange({ ...record, [key]: next })}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  }

  return (
    <PrimitiveField
      fieldKey={fieldKey}
      kind={inferFieldKind(fieldKey, value)}
      value={value}
      onChange={onChange}
    />
  );
}

export default function ContentEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (value === null || value === undefined) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
        This section has no content yet.
      </p>
    );
  }

  return (
    <ValueEditor fieldKey="content" value={value} onChange={onChange} depth={0} />
  );
}
