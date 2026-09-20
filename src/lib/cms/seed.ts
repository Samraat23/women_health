import { getSeedArticles } from "@/lib/articleSeed";

import { cmsCollections } from "./collections";
import {
  buildCategoryDocuments,
  buildChatDocuments,
  buildPregnancyDocuments,
  buildSectionDocuments,
  buildSurgeryDocuments,
  type SeedDocument,
} from "./seedLight";
import { toJsonSafeContent } from "./serialize";

/**
 * Builds the migration payloads that move the repository's built-in content
 * into Firestore.
 *
 * Import this from server code only. It pulls in `BlogData.ts` (~300KB) via the
 * article seed, which does not belong in the browser bundle. The admin
 * migration screen fetches the payloads over `/api/admin/migration`, then
 * performs the writes itself with the signed-in user's credentials — so this
 * module stays behind the route handler and never crosses into a client
 * component.
 *
 * Every builder except the article one lives in `./seedLight`, so screens that
 * only need sections or categories can import those without the article cost.
 */

export type { SeedDocument };

export type SeedGroup = {
  moduleId: string;
  label: string;
  collection: string;
  description: string;
  documents: SeedDocument[];
};

// ------------------------------------------------------------------ articles

function buildArticleDocuments(): SeedDocument[] {
  return getSeedArticles().map((article, index) => ({
    documentId: article.slug,
    title: article.article.title,
    // Duplicated out of the payload so category pages can query without
    // downloading every article.
    category: article.article.category || "uncategorised",
    order: index,
    content: toJsonSafeContent(article, `article:${article.slug}`),
  }));
}

// -------------------------------------------------------------------- groups

const groupBuilders: Array<Omit<SeedGroup, "documents"> & {
  build: () => SeedDocument[];
}> = [
  {
    moduleId: "sections",
    label: "Site sections",
    collection: cmsCollections.sections,
    description: "Navbar, hero, services, testimonials, FAQ, footer, and more.",
    build: buildSectionDocuments,
  },
  {
    moduleId: "categories",
    label: "Categories",
    collection: cmsCollections.categories,
    description: "Gynecology categories and their article lists.",
    build: buildCategoryDocuments,
  },
  {
    moduleId: "articles",
    label: "Articles",
    collection: cmsCollections.articles,
    description: "Every blog article, tagged with its category.",
    build: buildArticleDocuments,
  },
  {
    moduleId: "pregnancy",
    label: "Pregnancy guide",
    collection: cmsCollections.pregnancy,
    description: "Trimesters, week-by-week guide, vaccines, and nutrition.",
    build: buildPregnancyDocuments,
  },
  {
    moduleId: "surgery",
    label: "Surgery services",
    collection: cmsCollections.surgery,
    description: "Procedure metadata and surgery benefits.",
    build: buildSurgeryDocuments,
  },
  {
    moduleId: "chat",
    label: "Chat assistant",
    collection: cmsCollections.chat,
    description: "Assistant copy, service list, and intent routing.",
    build: buildChatDocuments,
  },
];

export const seedGroupIds = groupBuilders.map((group) => group.moduleId);

export function buildSeedGroup(moduleId: string): SeedGroup | null {
  const group = groupBuilders.find((entry) => entry.moduleId === moduleId);

  if (!group) return null;

  const { build, ...rest } = group;

  return { ...rest, documents: build() };
}

/**
 * Every group, with document counts only.
 *
 * The migration screen lists this first so the operator can see what is about
 * to be written without transferring 300KB of article bodies to the browser.
 */
export function buildSeedSummary() {
  return groupBuilders.map((group) => {
    const { build, ...rest } = group;

    try {
      const documents = build();

      return {
        ...rest,
        documentCount: documents.length,
        bytes: documents.reduce(
          (total, document) => total + JSON.stringify(document.content).length,
          0
        ),
        error: null as string | null,
      };
    } catch (error) {
      return {
        ...rest,
        documentCount: 0,
        bytes: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });
}
