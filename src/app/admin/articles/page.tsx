import type { Metadata } from "next";

import ArticleListPanel, {
  type ArticleSummary,
} from "@/features/admin/articles/ArticleListPanel";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminModuleShell from "@/features/admin/modules/AdminModuleShell";
import { gynecologyCategories } from "@/data/Categories";
import { getArticleRecords } from "@/lib/articleStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles | WHealth Admin",
  description: "Manage every published article from one place.",
};

export default async function AdminArticlesPage() {
  await requireAdminSession("/admin/articles");

  const records = await getArticleRecords();
  const categoryTitles = new Map(
    gynecologyCategories.map((category) => [category.slug, category.title])
  );

  const articles: ArticleSummary[] = records.map((record) => ({
    slug: record.slug,
    title: record.article.title,
    category: record.article.category,
    categoryTitle:
      categoryTitles.get(record.article.category) || "Uncategorised",
    sectionCount: record.sections.length,
    faqCount: record.faqs.length,
    source: record.source,
    updatedAt: record.updatedAt,
  }));

  return (
    <AdminModuleShell
      activeModule="articles"
      title="Articles"
      description="Edit article copy, sections, and FAQs. Changes are stored in Firebase."
    >
      <ArticleListPanel
        articles={articles}
        categories={gynecologyCategories.map((category) => ({
          slug: category.slug,
          title: category.title,
        }))}
      />
    </AdminModuleShell>
  );
}
