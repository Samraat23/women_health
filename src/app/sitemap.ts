import type { MetadataRoute } from "next";

import { gynecologyCategories } from "@/data/Categories";
import { getSeedArticleSlugs } from "@/lib/articleSeed";

const baseUrl = "https://www.drkusumlata.in";

/**
 * Next.js serves this at /sitemap.xml. Article slugs come from the seed set
 * (the same source generateStaticParams uses for /[slug]) so the sitemap
 * stays in sync with what's actually prerendered, without a Firestore call.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pregnancy`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/surgery`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = gynecologyCategories.map(
    (category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const articleRoutes: MetadataRoute.Sitemap = getSeedArticleSlugs().map(
    (slug) => ({
      url: `${baseUrl}/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
