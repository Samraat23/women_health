"use client";

import { AlertTriangle, Plus } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BlogFaq } from "@/data/BlogData";

import { RowActions, TextField, moveItem } from "./EditorFields";

/** Every article is expected to carry at least this many questions. */
export const minimumFaqCount = 10;

type FaqEditorProps = {
  faqs: BlogFaq[];
  faqTitle?: string;
  onChangeFaqs: (faqs: BlogFaq[]) => void;
  onChangeTitle: (title: string) => void;
};

/** Ids only need to be unique and stable within one article. */
function nextFaqId(faqs: BlogFaq[]) {
  const highest = faqs.reduce((max, faq) => {
    const numeric = Number.parseInt(faq.id, 10);

    return Number.isFinite(numeric) && numeric > max ? numeric : max;
  }, 0);

  return String(highest + 1);
}

export default function FaqEditor({
  faqs,
  faqTitle,
  onChangeFaqs,
  onChangeTitle,
}: FaqEditorProps) {
  const patch = (index: number, changes: Partial<BlogFaq>) => {
    const next = [...faqs];
    next[index] = { ...next[index], ...changes };
    onChangeFaqs(next);
  };

  const isBelowMinimum = faqs.length < minimumFaqCount;

  return (
    <div className="space-y-4">
      <TextField
        label="FAQ heading"
        value={faqTitle || ""}
        onChange={onChangeTitle}
        placeholder="Your questions answered"
        hint="Leave blank to use the default heading."
      />

      {isBelowMinimum ? (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertDescription>
            This article has {faqs.length} question
            {faqs.length === 1 ? "" : "s"}. The site standard is at least{" "}
            {minimumFaqCount}.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex items-center justify-between">
        <Label className="text-xs font-black text-slate-700">
          Questions
          <span className="ml-1 font-semibold text-slate-400">
            ({faqs.length})
          </span>
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChangeFaqs([
              ...faqs,
              { id: nextFaqId(faqs), question: "", answer: "" },
            ])
          }
        >
          <Plus size={14} />
          Add question
        </Button>
      </div>

      {faqs.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-200 px-3 py-6 text-center text-sm font-semibold text-slate-400">
          No questions yet.
        </p>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.id || index}
              className="flex items-start gap-2 rounded-md border border-slate-200 p-3"
            >
              <span className="mt-2.5 w-5 shrink-0 text-right text-xs font-black text-slate-400">
                {index + 1}
              </span>

              <div className="grid flex-1 gap-2">
                <Input
                  value={faq.question}
                  placeholder="Question"
                  onChange={(event) =>
                    patch(index, { question: event.target.value })
                  }
                />
                <Textarea
                  rows={3}
                  value={faq.answer}
                  placeholder="Answer"
                  onChange={(event) =>
                    patch(index, { answer: event.target.value })
                  }
                />
              </div>

              <RowActions
                index={index}
                total={faqs.length}
                label="question"
                onMove={(direction) =>
                  onChangeFaqs(moveItem(faqs, index, direction))
                }
                onRemove={() =>
                  onChangeFaqs(faqs.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
