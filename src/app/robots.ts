import type { MetadataRoute } from "next";

const baseUrl = "https://www.drkusumlata.in";

/**
 * Next.js serves this at /robots.txt. Matches the site's existing
 * "Allow: /" policy, plus keeping the admin panel and API routes out of
 * crawlers since they're not public-facing content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
