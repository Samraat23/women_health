import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleEditorPanel from "@/features/admin/articles/ArticleEditorPanel";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { getArticleRecord } from "@/lib/articleStore";

export const dynamic = "force-dynamic";

type AdminArticleEditorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AdminArticleEditorPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Edit ${slug} | WHealth Admin`,
  };
}

export default async function AdminArticleEditorPage({
  params,
}: AdminArticleEditorPageProps) {
  const { slug } = await params;

  const admin = await requireAdminSession(`/admin/articles/${slug}`);

  const record = await getArticleRecord(slug);

  if (!record) {
    notFound();
  }

  return (
    <AdminShell
      adminEmail={admin.email}
      activeModule="articles"
      title="Edit article"
      description="Saved changes publish to the live page within a minute."
    >
      <ArticleEditorPanel record={record} />
    </AdminShell>
  );
}
