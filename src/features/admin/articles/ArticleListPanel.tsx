"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cloud, FileText, Pencil, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ArticleSummary = {
  slug: string;
  title: string;
  category: string;
  categoryTitle: string;
  sectionCount: number;
  faqCount: number;
  source: "firestore" | "seed";
  updatedAt?: string;
};

type ArticleListPanelProps = {
  articles: ArticleSummary[];
  categories: Array<{ slug: string; title: string }>;
};

const allCategories = "all";

function formatUpdatedAt(value?: string) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ArticleListPanel({
  articles,
  categories,
}: ArticleListPanelProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allCategories);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        category === allCategories || article.category === category;
      const matchesSearch =
        !search ||
        article.title.toLowerCase().includes(search) ||
        article.slug.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [articles, category, query]);

  const editedCount = articles.filter(
    (article) => article.source === "firestore"
  ).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Total articles"
          value={String(articles.length)}
          icon={FileText}
        />
        <SummaryTile
          label="Edited in Firebase"
          value={String(editedCount)}
          icon={Cloud}
        />
        <SummaryTile
          label="Categories"
          value={String(categories.length)}
          icon={Search}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or slug"
            className="pl-9"
            aria-label="Search articles"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-64" aria-label="Filter by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={allCategories}>All categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item.slug} value={item.slug}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visible.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm font-semibold text-slate-500">
            No articles match this search.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {visible.map((article) => {
            const updated = formatUpdatedAt(article.updatedAt);

            return (
              <Card key={article.slug} className="overflow-hidden py-0">
                <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black text-slate-950">
                        {article.title}
                      </p>
                      {article.source === "firestore" ? (
                        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                          Edited
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Original</Badge>
                      )}
                    </div>

                    <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                      /{article.slug} · {article.categoryTitle} ·{" "}
                      {article.sectionCount} sections · {article.faqCount} FAQs
                      {updated ? ` · updated ${updated}` : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${article.slug}`} target="_blank">
                        View
                        <ArrowUpRight size={15} />
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/admin/articles/${article.slug}`}>
                        <Pencil size={15} />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SummaryTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof FileText;
}) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
          <Icon size={18} />
        </span>
        <div>
          <p className="text-xl font-black leading-none text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
