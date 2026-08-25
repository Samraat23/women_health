"use client";

import type { ReactNode } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/** Moves an item within a list, returning a new array. */
export function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;

  if (target < 0 || target >= items.length) return items;

  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];

  return next;
}

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-black text-slate-700">
        {label}
      </Label>
      {children}
      {hint ? (
        <p className="text-xs font-semibold text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  id?: string;
}) {
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 4,
  id,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
  id?: string;
}) {
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

/** Small toolbar of move-up / move-down / delete actions for list rows. */
export function RowActions({
  index,
  total,
  onMove,
  onRemove,
  label,
}: {
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move ${label} up`}
        disabled={index === 0}
        onClick={() => onMove(-1)}
      >
        <ChevronUp size={15} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Move ${label} down`}
        disabled={index === total - 1}
        onClick={() => onMove(1)}
      >
        <ChevronDown size={15} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Delete ${label}`}
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={onRemove}
      >
        <Trash2 size={15} />
      </Button>
    </div>
  );
}

/** Editable list of plain strings — used for bullet items and paragraphs. */
export function StringListEditor({
  label,
  items,
  onChange,
  addLabel = "Add item",
  multiline = false,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  multiline?: boolean;
  placeholder?: string;
}) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-black text-slate-700">
          {label}
          <span className="ml-1 font-semibold text-slate-400">
            ({items.length})
          </span>
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...items, ""])}
        >
          <Plus size={14} />
          {addLabel}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-200 px-3 py-4 text-center text-xs font-semibold text-slate-400">
          Nothing here yet.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-2.5 w-5 shrink-0 text-right text-xs font-black text-slate-400">
                {index + 1}
              </span>
              {multiline ? (
                <Textarea
                  rows={3}
                  value={item}
                  placeholder={placeholder}
                  onChange={(event) => update(index, event.target.value)}
                />
              ) : (
                <Input
                  value={item}
                  placeholder={placeholder}
                  onChange={(event) => update(index, event.target.value)}
                />
              )}
              <RowActions
                index={index}
                total={items.length}
                label={label}
                onMove={(direction) => onChange(moveItem(items, index, direction))}
                onRemove={() =>
                  onChange(items.filter((_, position) => position !== index))
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
