"use client"
import type { Metadata } from "next";
import ArticlePageClient from "./ArticlePageClient";
import { pregnancyArticle } from "./articleData";

// export const metadata: Metadata = {
//   title: `${pregnancyArticle.title} ${pregnancyArticle.highlightedTitle}`,
//   description: pregnancyArticle.description,
// };

export default function ArticlePage() {
  return <ArticlePageClient article={pregnancyArticle} />;
}
