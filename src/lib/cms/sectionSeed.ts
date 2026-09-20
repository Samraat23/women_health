import homePageContent from "@/data/homePageContent.json";
import siteData from "@/data/siteData.json";

import { getCmsSection, type CmsSectionDefinition } from "./sections";

/**
 * Seed content for `cms_sections`, without the article payload.
 *
 * Deliberately separate from `@/lib/cms/seed`: that module imports
 * `BlogData.ts` (~300KB) to build the article group, and a page that only
 * needs the navbar or footer should not pay for it. Section pages import this
 * instead.
 */

type SourceRecord = Record<string, unknown>;

const homeSource = homePageContent as SourceRecord;
const siteSource = siteData as SourceRecord;

function readSource(section: CmsSectionDefinition) {
  // Sections with no source file carry their starting shape in the registry.
  if (section.sourceFile === "inline") {
    return section.defaultContent;
  }

  const source =
    section.sourceFile === "homePageContent" ? homeSource : siteSource;

  return source[section.sourceKey || section.id];
}

/**
 * The built-in content for one section.
 *
 * Returns a structured clone so an editor mutating the result cannot corrupt
 * the module-level JSON import, which is shared across every request in the
 * same server process.
 */
export function getSeedSectionContent(sectionId: string): unknown {
  const section = getCmsSection(sectionId);

  if (!section) return null;

  const raw = readSource(section);

  return raw === undefined ? null : structuredClone(raw);
}
