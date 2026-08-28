import type { BlogFaq, BlogSection } from "@/data/BlogData";

/**
 * Editable shape of an article.
 *
 * This mirrors `BlogPageData` from `@/data/BlogData` with one difference: every
 * image is a plain string. The seed data imports some images as static assets,
 * which cannot be stored in Firestore or round-tripped through JSON.
 */
export type ArticleHero = {
  badge: string;
  title: string;
  date: string;
  readTime: string;
  status: string;
};

export type ArticleBody = {
  id: string;
  slug: string;
  category: string;
  title: string;
  intro: string;
  image: string;
  paragraphs: string[];
};

export type ArticleAuthor = {
  name: string;
  label: string;
  designation: string;
  image: string;
};

export type ArticleSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
};

export type ArticleDoc = {
  slug: string;
  hero: ArticleHero;
  article: ArticleBody;
  sections: BlogSection[];
  faqTitle?: string;
  faqs: BlogFaq[];
  author: ArticleAuthor;
  seo?: ArticleSeo;
};

/** An article plus where the copy currently being served came from. */
export type ArticleRecord = ArticleDoc & {
  source: "firestore" | "seed";
  updatedAt?: string;
};

export const articleSectionTypes = [
  "checkList",
  "warning",
  "cards",
  "timeline",
  "nutrition",
] as const;

export const sectionTypeLabels: Record<string, string> = {
  checkList: "Check list",
  warning: "Warning list",
  cards: "Cards",
  timeline: "Timeline",
  nutrition: "Nutrition (two columns)",
};

/** Which content field a section type actually renders on the page. */
export function getSectionBodyKind(type: string) {
  if (type === "cards") return "cards" as const;
  if (type === "nutrition") return "nutrition" as const;
  if (type === "timeline") return "timeline" as const;

  return "items" as const;
}
