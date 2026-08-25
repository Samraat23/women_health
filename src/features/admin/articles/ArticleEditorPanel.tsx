"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cloud,
  RotateCcw,
  Save,
  TriangleAlert,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlogFaq, BlogSection } from "@/data/BlogData";
import type { ArticleDoc, ArticleRecord } from "@/types/article";

import {
  resetArticleOverride,
  saveArticleOverride,
} from "./articleAdminStore";
import { StringListEditor, TextAreaField, TextField } from "./EditorFields";
import FaqEditor, { minimumFaqCount } from "./FaqEditor";
import SectionsEditor from "./SectionsEditor";

type ArticleEditorPanelProps = {
  record: ArticleRecord;
};

type Status = { tone: "ok" | "error"; message: string } | null;

function toDoc(record: ArticleRecord): ArticleDoc {
  return structuredClone({
    slug: record.slug,
    hero: record.hero,
    article: record.article,
    sections: record.sections,
    faqTitle: record.faqTitle,
    faqs: record.faqs,
    author: record.author,
  });
}

export default function ArticleEditorPanel({ record }: ArticleEditorPanelProps) {
  const router = useRouter();
  const initial = useMemo(() => toDoc(record), [record]);
  const [draft, setDraft] = useState<ArticleDoc>(initial);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(initial),
    [draft, initial]
  );

  const patchArticle = useCallback(
    (changes: Partial<ArticleDoc["article"]>) =>
      setDraft((current) => ({
        ...current,
        article: { ...current.article, ...changes },
      })),
    []
  );

  const patchHero = useCallback(
    (changes: Partial<ArticleDoc["hero"]>) =>
      setDraft((current) => ({
        ...current,
        hero: { ...current.hero, ...changes },
      })),
    []
  );

  const handleSave = async () => {
    setIsSaving(true);
    setStatus(null);

    const result = await saveArticleOverride(draft.slug, draft);

    setIsSaving(false);
    setStatus({ tone: result.ok ? "ok" : "error", message: result.message });

    if (result.ok) {
      // Pull the freshly stored copy back so the badge and baseline update.
      router.refresh();
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    setStatus(null);

    const result = await resetArticleOverride(draft.slug);

    setIsResetting(false);
    setIsResetOpen(false);
    setStatus({ tone: result.ok ? "ok" : "error", message: result.message });

    if (result.ok) {
      router.refresh();
    }
  };

  const faqShortfall = draft.faqs.length < minimumFaqCount;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-1">
            <Link href="/admin/articles">
              <ArrowLeft size={15} />
              All articles
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-black text-slate-950">
              {draft.article.title || "Untitled article"}
            </h2>
            {record.source === "firestore" ? (
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                <Cloud size={12} />
                Firebase
              </Badge>
            ) : (
              <Badge variant="secondary">Original</Badge>
            )}
            {isDirty ? (
              <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                Unsaved changes
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 truncate text-xs font-semibold text-slate-500">
            /{draft.slug}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/${draft.slug}`} target="_blank">
              View live
              <ArrowUpRight size={15} />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={record.source !== "firestore" || isResetting}
            onClick={() => setIsResetOpen(true)}
          >
            <RotateCcw size={15} />
            Reset
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving || !isDirty}>
            <Save size={15} />
            {isSaving ? "Saving…" : "Save to Firebase"}
          </Button>
        </div>
      </div>

      {status ? (
        <Alert variant={status.tone === "error" ? "destructive" : "default"}>
          {status.tone === "error" ? <TriangleAlert /> : <CheckCircle2 />}
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      ) : null}

      <Tabs defaultValue="article">
        <TabsList>
          <TabsTrigger value="article">Article</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="sections">
            Sections ({draft.sections.length})
          </TabsTrigger>
          <TabsTrigger value="faqs">
            FAQs ({draft.faqs.length})
            {faqShortfall ? (
              <span className="ml-1 text-amber-600" aria-hidden>
                !
              </span>
            ) : null}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="article">
          <Card>
            <CardContent className="space-y-4">
              <TextField
                label="Title"
                value={draft.article.title}
                onChange={(value) => patchArticle({ title: value })}
              />
              <TextAreaField
                label="Intro"
                value={draft.article.intro}
                onChange={(value) => patchArticle({ intro: value })}
                rows={3}
                hint="Shown under the title and used as the page description."
              />
              <TextField
                label="Header image URL"
                value={draft.article.image}
                onChange={(value) => patchArticle({ image: value })}
                hint="Use a path from /public (e.g. /image/photo.png) or a full https URL."
              />
              <StringListEditor
                label="Body paragraphs"
                items={draft.article.paragraphs}
                onChange={(paragraphs) => patchArticle({ paragraphs })}
                addLabel="Add paragraph"
                multiline
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Badge"
                value={draft.hero.badge}
                onChange={(value) => patchHero({ badge: value })}
              />
              <TextField
                label="Hero title"
                value={draft.hero.title}
                onChange={(value) => patchHero({ title: value })}
              />
              <TextField
                label="Date"
                value={draft.hero.date}
                onChange={(value) => patchHero({ date: value })}
              />
              <TextField
                label="Read time"
                value={draft.hero.readTime}
                onChange={(value) => patchHero({ readTime: value })}
              />
              <TextField
                label="Status"
                value={draft.hero.status}
                onChange={(value) => patchHero({ status: value })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <Card>
            <CardContent>
              <SectionsEditor
                sections={draft.sections}
                onChange={(sections: BlogSection[]) =>
                  setDraft((current) => ({ ...current, sections }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardContent>
              <FaqEditor
                faqs={draft.faqs}
                faqTitle={draft.faqTitle}
                onChangeFaqs={(faqs: BlogFaq[]) =>
                  setDraft((current) => ({ ...current, faqs }))
                }
                onChangeTitle={(faqTitle) =>
                  setDraft((current) => ({
                    ...current,
                    faqTitle: faqTitle || undefined,
                  }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset this article?</DialogTitle>
            <DialogDescription>
              This deletes the Firebase copy of “{draft.article.title}”. The page
              goes back to the article content stored in the repository. Any
              edits made here are lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={isResetting}
            >
              {isResetting ? "Resetting…" : "Reset article"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
