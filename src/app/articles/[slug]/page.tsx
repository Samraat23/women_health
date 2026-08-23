import { notFound, redirect } from "next/navigation";

import { allBlogData } from "@/data/BlogData";
import { getLegacyArticleHref } from "@/lib/topicRoutes";

type ArticlesRedirectProps = {
  params: Promise<{
    slug: string;
  }>;
};

const articleSlugs = new Set(
  allBlogData
    .map((blog) => blog.article.slug)
    .filter((slug): slug is string => Boolean(slug))
);

/**
 * Articles live at /<slug>. This route only exists to rescue the older
 * /articles/<slug> links instead of serving them a blank page.
 */
export default async function ArticlesRedirectPage({
  params,
}: ArticlesRedirectProps) {
  const { slug } = await params;
  const legacyHref = getLegacyArticleHref(slug);

  if (legacyHref) {
    redirect(legacyHref);
  }

  if (articleSlugs.has(slug)) {
    redirect(`/${slug}`);
  }

  notFound();
}
