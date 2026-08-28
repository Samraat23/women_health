import type { StaticImageData } from "next/image";

import { allBlogData, type BlogPageData } from "@/data/BlogData";
import type { ArticleDoc } from "@/types/article";

function toImageSrc(image: string | StaticImageData) {
  return typeof image === "string" ? image : image.src;
}

/**
 * Turns a compiled-in blog entry into the plain, JSON-safe shape the admin
 * panel edits and Firestore stores.
 */
export function toArticleDoc(blog: BlogPageData): ArticleDoc {
  return {
    slug: blog.article.slug || blog.article.id,
    hero: { ...blog.hero },
    article: {
      id: blog.article.id,
      slug: blog.article.slug || blog.article.id,
      category: blog.article.category || "",
      title: blog.article.title,
      intro: blog.article.intro,
      image: toImageSrc(blog.article.image),
      paragraphs: [...blog.article.paragraphs],
    },
    // Structured clone keeps the editor from mutating the compiled-in seed.
    sections: structuredClone(blog.sections),
    faqTitle: blog.faqTitle,
    faqs: blog.faqs ? structuredClone(blog.faqs) : [],
    author: {
      ...blog.author,
      image: toImageSrc(blog.author.image),
    },
    seo: blog.seo ? { ...blog.seo } : undefined,
  };
}

const seedBySlug = new Map<string, ArticleDoc>();

for (const blog of allBlogData) {
  const slug = blog.article.slug;

  if (slug) {
    seedBySlug.set(slug, toArticleDoc(blog));
  }
}

/** Every article exactly as it ships in the repository. */
export function getSeedArticles(): ArticleDoc[] {
  return [...seedBySlug.values()].map((doc) => structuredClone(doc));
}

export function getSeedArticle(slug: string): ArticleDoc | null {
  const doc = seedBySlug.get(slug);

  return doc ? structuredClone(doc) : null;
}

export function getSeedArticleSlugs() {
  return [...seedBySlug.keys()];
}
