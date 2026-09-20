import chatIntents from "@/data/chat/intents.json";
import chatServices from "@/data/chat/services.json";
import chatSettings from "@/data/chat/settings.json";
import { gynecologyCategories } from "@/data/Categories";
import {
  foodPillars,
  pregnancyWeeks,
  trimesterGuides,
  vaccineGuides,
} from "@/data/PregnancyGuide";
import {
  surgeryBenefits,
  getSurgeryProcedureMeta,
} from "@/data/SurgeryServices";

import { cmsCollections } from "./collections";
import { cmsSectionDefinitions } from "./sections";
import { getSeedSectionContent } from "./sectionSeed";
import { toJsonSafeContent, type JsonSafe } from "./serialize";

/**
 * Seed builders for every collection except articles.
 *
 * Split out of `@/lib/cms/seed` so that a screen editing categories or the
 * pregnancy guide does not transitively import `BlogData.ts` (~300KB). Only
 * the migration route and the article screens pay that cost.
 */

export type SeedDocument = {
  documentId: string;
  title: string;
  category?: string;
  order: number;
  content: JsonSafe;
};

// ------------------------------------------------------------------ sections

export function buildSectionDocuments(): SeedDocument[] {
  return cmsSectionDefinitions.map((section, index) => {
    const raw = getSeedSectionContent(section.id);

    if (raw === null) {
      throw new Error(
        `Section "${section.id}" has no content in ${section.sourceFile}.json.`
      );
    }

    return {
      documentId: section.id,
      title: section.label,
      order: index,
      content: toJsonSafeContent(raw, `section:${section.id}`),
    };
  });
}

// ---------------------------------------------------------------- categories

export function buildCategoryDocuments(): SeedDocument[] {
  return gynecologyCategories.map((category, index) => ({
    documentId: category.slug,
    title: category.title,
    order: category.id ?? index,
    content: toJsonSafeContent(category, `category:${category.slug}`),
  }));
}

// ----------------------------------------------------------------- pregnancy

export function buildPregnancyDocuments(): SeedDocument[] {
  return [
    {
      documentId: "trimesters",
      title: "Trimester guides",
      order: 0,
      content: toJsonSafeContent(trimesterGuides, "pregnancy:trimesters"),
    },
    {
      documentId: "weeks",
      title: "Week by week",
      order: 1,
      content: toJsonSafeContent(pregnancyWeeks, "pregnancy:weeks"),
    },
    {
      documentId: "vaccines",
      title: "Vaccines",
      order: 2,
      content: toJsonSafeContent(vaccineGuides, "pregnancy:vaccines"),
    },
    {
      documentId: "food-pillars",
      title: "Nutrition pillars",
      order: 3,
      content: toJsonSafeContent(foodPillars, "pregnancy:food-pillars"),
    },
  ];
}

// ------------------------------------------------------------------- surgery

export function buildSurgeryDocuments(): SeedDocument[] {
  // `getSurgeryProcedureMeta` resolves a procedure name to its metadata. The
  // category's blog list is the canonical set of procedures, so each one is
  // resolved here and stored, rather than shipping the keyword matching into
  // the admin panel.
  const surgeryCategory = gynecologyCategories.find(
    (category) => category.slug === "laparoscopic-surgery"
  );

  const procedures = (surgeryCategory?.blogSlugs || []).map((slug, index) => {
    const name = slug.replace(/-/g, " ");

    return {
      slug,
      name,
      ...getSurgeryProcedureMeta(name, index),
    };
  });

  return [
    {
      documentId: "benefits",
      title: "Surgery benefits",
      order: 0,
      content: toJsonSafeContent(surgeryBenefits, "surgery:benefits"),
    },
    {
      documentId: "procedures",
      title: "Procedures",
      order: 1,
      content: toJsonSafeContent(procedures, "surgery:procedures"),
    },
  ];
}

// ---------------------------------------------------------------------- chat

export function buildChatDocuments(): SeedDocument[] {
  return [
    {
      documentId: "settings",
      title: "Assistant settings",
      order: 0,
      content: toJsonSafeContent(chatSettings, "chat:settings"),
    },
    {
      documentId: "services",
      title: "Services",
      order: 1,
      content: toJsonSafeContent(chatServices, "chat:services"),
    },
    {
      documentId: "intents",
      title: "Intents",
      order: 2,
      content: toJsonSafeContent(chatIntents, "chat:intents"),
    },
  ];
}

/** Seed documents for a collection, or null when it has no light builder. */
export function buildSeedDocumentsFor(
  collection: string
): SeedDocument[] | null {
  if (collection === cmsCollections.sections) return buildSectionDocuments();
  if (collection === cmsCollections.categories) return buildCategoryDocuments();
  if (collection === cmsCollections.pregnancy) return buildPregnancyDocuments();
  if (collection === cmsCollections.surgery) return buildSurgeryDocuments();
  if (collection === cmsCollections.chat) return buildChatDocuments();

  return null;
}
