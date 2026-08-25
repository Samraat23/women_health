"use client";

import { Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import type { BlogCard, BlogSection, BlogTimeline } from "@/data/BlogData";
import {
  articleSectionTypes,
  getSectionBodyKind,
  sectionTypeLabels,
} from "@/types/article";

import {
  Field,
  RowActions,
  StringListEditor,
  TextAreaField,
  TextField,
  moveItem,
} from "./EditorFields";

type SectionsEditorProps = {
  sections: BlogSection[];
  onChange: (sections: BlogSection[]) => void;
};

function slugifyId(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug || fallback;
}

function emptySection(index: number): BlogSection {
  return {
    id: `section-${index + 1}`,
    type: "checkList",
    eyebrow: "New section",
    title: "New section",
    color: "#5a4ffe",
    paragraph: "",
    items: [],
  };
}

export default function SectionsEditor({
  sections,
  onChange,
}: SectionsEditorProps) {
  const patch = (index: number, changes: Partial<BlogSection>) => {
    const next = [...sections];
    next[index] = { ...next[index], ...changes };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-slate-950">
          Sections
          <span className="ml-1 font-semibold text-slate-400">
            ({sections.length})
          </span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...sections, emptySection(sections.length)])}
        >
          <Plus size={14} />
          Add section
        </Button>
      </div>

      {sections.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-200 px-3 py-6 text-center text-sm font-semibold text-slate-400">
          This article has no sections yet.
        </p>
      ) : (
        <Accordion type="multiple" className="space-y-2">
          {sections.map((section, index) => {
            const bodyKind = getSectionBodyKind(section.type);

            return (
              <AccordionItem
                key={`${section.id}-${index}`}
                value={`${section.id}-${index}`}
                className="rounded-lg border border-slate-200 bg-white px-3 last:border-b"
              >
                <div className="flex items-center gap-2">
                  <AccordionTrigger className="flex-1 hover:no-underline">
                    <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
                      <span
                        className="h-6 w-6 shrink-0 rounded-md"
                        style={{ backgroundColor: section.color }}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-black text-slate-950">
                          {section.title || "Untitled section"}
                        </span>
                        <span className="block truncate text-xs font-semibold text-slate-400">
                          #{section.id}
                        </span>
                      </span>
                      <Badge variant="secondary" className="ml-auto shrink-0">
                        {sectionTypeLabels[section.type] || section.type}
                      </Badge>
                    </span>
                  </AccordionTrigger>

                  <RowActions
                    index={index}
                    total={sections.length}
                    label="section"
                    onMove={(direction) =>
                      onChange(moveItem(sections, index, direction))
                    }
                    onRemove={() =>
                      onChange(sections.filter((_, i) => i !== index))
                    }
                  />
                </div>

                <AccordionContent className="space-y-4 pb-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextField
                      label="Eyebrow (small label above the heading)"
                      value={section.eyebrow}
                      onChange={(value) => patch(index, { eyebrow: value })}
                    />
                    <TextField
                      label="Heading"
                      value={section.title}
                      onChange={(value) =>
                        patch(index, {
                          title: value,
                          // Keep the anchor in step with the heading unless it
                          // was deliberately customised.
                          id:
                            section.id === slugifyId(section.title, section.id)
                              ? slugifyId(value, section.id)
                              : section.id,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label="Layout">
                      <Select
                        value={section.type}
                        onValueChange={(value) =>
                          patch(index, { type: value as BlogSection["type"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {articleSectionTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {sectionTypeLabels[type]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Accent colour">
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={section.color}
                          onChange={(event) =>
                            patch(index, { color: event.target.value })
                          }
                          className="h-9 w-14 p-1"
                          aria-label="Accent colour"
                        />
                        <Input
                          value={section.color}
                          onChange={(event) =>
                            patch(index, { color: event.target.value })
                          }
                        />
                      </div>
                    </Field>

                    <TextField
                      label="Anchor id"
                      value={section.id}
                      onChange={(value) =>
                        patch(index, { id: slugifyId(value, section.id) })
                      }
                      hint="Used for the sidebar links."
                    />
                  </div>

                  <TextAreaField
                    label="Intro paragraph"
                    value={section.paragraph}
                    onChange={(value) => patch(index, { paragraph: value })}
                    rows={3}
                  />

                  <StringListEditor
                    label="Extra paragraphs"
                    items={section.paragraphs || []}
                    onChange={(value) =>
                      patch(index, {
                        paragraphs: value.length ? value : undefined,
                      })
                    }
                    addLabel="Add paragraph"
                    multiline
                  />

                  <Separator />

                  {bodyKind === "items" ? (
                    <StringListEditor
                      label="List items"
                      items={section.items || []}
                      onChange={(value) => patch(index, { items: value })}
                      addLabel="Add item"
                    />
                  ) : null}

                  {bodyKind === "cards" ? (
                    <CardsEditor
                      cards={section.cards || []}
                      onChange={(cards) => patch(index, { cards })}
                    />
                  ) : null}

                  {bodyKind === "nutrition" ? (
                    <NutritionEditor
                      cards={section.cards || []}
                      onChange={(cards) => patch(index, { cards })}
                    />
                  ) : null}

                  {bodyKind === "timeline" ? (
                    <TimelineEditor
                      timeline={section.timeline || []}
                      onChange={(timeline) => patch(index, { timeline })}
                    />
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}

function CardsEditor({
  cards,
  onChange,
}: {
  cards: BlogCard[];
  onChange: (cards: BlogCard[]) => void;
}) {
  const patch = (index: number, changes: Partial<BlogCard>) => {
    const next = [...cards];
    next[index] = { ...next[index], ...changes };
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-black text-slate-700">
          Cards
          <span className="ml-1 font-semibold text-slate-400">
            ({cards.length})
          </span>
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...cards, { title: "", description: "" }])}
        >
          <Plus size={14} />
          Add card
        </Button>
      </div>

      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-start gap-2 rounded-md border border-slate-200 p-3"
        >
          <div className="grid flex-1 gap-2 md:grid-cols-[1fr_1.6fr]">
            <Input
              value={card.title}
              placeholder="Card title"
              onChange={(event) => patch(index, { title: event.target.value })}
            />
            <Input
              value={card.description || ""}
              placeholder="Card description"
              onChange={(event) =>
                patch(index, { description: event.target.value })
              }
            />
          </div>
          <RowActions
            index={index}
            total={cards.length}
            label="card"
            onMove={(direction) => onChange(moveItem(cards, index, direction))}
            onRemove={() => onChange(cards.filter((_, i) => i !== index))}
          />
        </div>
      ))}
    </div>
  );
}

function NutritionEditor({
  cards,
  onChange,
}: {
  cards: BlogCard[];
  onChange: (cards: BlogCard[]) => void;
}) {
  const patch = (index: number, changes: Partial<BlogCard>) => {
    const next = [...cards];
    next[index] = { ...next[index], ...changes };
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-black text-slate-700">
          Columns
          <span className="ml-1 font-semibold text-slate-400">
            ({cards.length})
          </span>
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange([...cards, { title: "", tone: "positive", items: [] }])
          }
        >
          <Plus size={14} />
          Add column
        </Button>
      </div>

      {cards.map((card, index) => (
        <div
          key={index}
          className="space-y-3 rounded-md border border-slate-200 p-3"
        >
          <div className="flex items-start gap-2">
            <div className="grid flex-1 gap-2 md:grid-cols-[1.6fr_1fr]">
              <Input
                value={card.title}
                placeholder="Column title"
                onChange={(event) => patch(index, { title: event.target.value })}
              />
              <Select
                value={card.tone || "positive"}
                onValueChange={(value) =>
                  patch(index, { tone: value as BlogCard["tone"] })
                }
              >
                <SelectTrigger aria-label="Column tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive (green)</SelectItem>
                  <SelectItem value="warning">Warning (red)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RowActions
              index={index}
              total={cards.length}
              label="column"
              onMove={(direction) => onChange(moveItem(cards, index, direction))}
              onRemove={() => onChange(cards.filter((_, i) => i !== index))}
            />
          </div>

          <StringListEditor
            label="Column items"
            items={card.items || []}
            onChange={(items) => patch(index, { items })}
          />
        </div>
      ))}
    </div>
  );
}

function TimelineEditor({
  timeline,
  onChange,
}: {
  timeline: BlogTimeline[];
  onChange: (timeline: BlogTimeline[]) => void;
}) {
  const patch = (index: number, changes: Partial<BlogTimeline>) => {
    const next = [...timeline];
    next[index] = { ...next[index], ...changes };
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-black text-slate-700">
          Timeline steps
          <span className="ml-1 font-semibold text-slate-400">
            ({timeline.length})
          </span>
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange([...timeline, { label: "", title: "", description: "" }])
          }
        >
          <Plus size={14} />
          Add step
        </Button>
      </div>

      {timeline.map((step, index) => (
        <div
          key={index}
          className="flex items-start gap-2 rounded-md border border-slate-200 p-3"
        >
          <div className="grid flex-1 gap-2">
            <div className="grid gap-2 md:grid-cols-[1fr_1.6fr]">
              <Input
                value={step.label}
                placeholder="Label (e.g. Stage 1)"
                onChange={(event) => patch(index, { label: event.target.value })}
              />
              <Input
                value={step.title}
                placeholder="Step title"
                onChange={(event) => patch(index, { title: event.target.value })}
              />
            </div>
            <Input
              value={step.description}
              placeholder="Step description"
              onChange={(event) =>
                patch(index, { description: event.target.value })
              }
            />
          </div>
          <RowActions
            index={index}
            total={timeline.length}
            label="step"
            onMove={(direction) => onChange(moveItem(timeline, index, direction))}
            onRemove={() => onChange(timeline.filter((_, i) => i !== index))}
          />
        </div>
      ))}
    </div>
  );
}
