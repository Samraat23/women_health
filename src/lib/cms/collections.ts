/**
 * Firestore collection names for the CMS.
 *
 * Kept free of any Node or seed imports so client components can pull these in
 * without dragging the 300KB article seed into the browser bundle.
 *
 * Layout is deliberately split two ways, matching how the admin panel is
 * organised:
 *
 *   section-wise   cms_sections/{sectionId}     hero, navbar, footer, faq, ...
 *   category-wise  cms_categories/{slug}        the 9 gynecology categories
 *                  cms_articles/{slug}          each doc carries `category`
 *
 * The remaining collections are page-scoped content that does not fit either
 * axis (pregnancy guide, surgery services, chat copy, media index).
 */

export const cmsCollections = {
  sections: "cms_sections",
  categories: "cms_categories",
  articles: "cms_articles",
  pregnancy: "cms_pregnancy",
  surgery: "cms_surgery",
  chat: "cms_chat",
  media: "cms_media",
  audit: "admin_audit",
} as const;

export type CmsCollectionKey = keyof typeof cmsCollections;
export type CmsCollectionName = (typeof cmsCollections)[CmsCollectionKey];

/** Collections the public website is allowed to read. Excludes chat_requests. */
export const publicCmsCollections: CmsCollectionName[] = [
  cmsCollections.sections,
  cmsCollections.categories,
  cmsCollections.articles,
  cmsCollections.pregnancy,
  cmsCollections.surgery,
  cmsCollections.chat,
  cmsCollections.media,
];

/** Legacy collections written by the pre-migration admin modules. */
export const legacyCollections = {
  adminContent:
    process.env.NEXT_PUBLIC_FIREBASE_CMS_COLLECTION || "kusumgynecentre",
  articles:
    process.env.NEXT_PUBLIC_FIREBASE_ARTICLES_COLLECTION || "whealth_articles",
  chatRequests: process.env.CHAT_REQUESTS_COLLECTION || "chat_requests",
} as const;
