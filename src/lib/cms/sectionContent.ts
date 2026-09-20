import { cmsCollections } from "./collections";
import { readCmsDocument } from "./read";
import { getSeedSectionContent } from "./sectionSeed";
import { getCmsSection, getSectionsForModule } from "./sections";

/**
 * Server-side loader for section content.
 *
 * Every admin section screen renders from this: Firestore when the section has
 * been imported or edited, the built-in seed otherwise. `source` is carried
 * through so the UI can tell the editor which one they are looking at — an
 * editor who does not know they are editing un-imported seed content will be
 * confused when the public site does not change.
 */

export type SectionContentResult = {
  id: string;
  label: string;
  description: string;
  content: unknown;
  source: "firestore" | "seed";
  updatedAt?: string;
  updatedBy?: string;
};

export async function loadSectionContent(
  sectionId: string
): Promise<SectionContentResult | null> {
  const section = getCmsSection(sectionId);

  if (!section) return null;

  const stored = await readCmsDocument<unknown>(
    cmsCollections.sections,
    sectionId
  );

  if (stored) {
    return {
      id: section.id,
      label: section.label,
      description: section.description,
      content: stored.content,
      source: "firestore",
      updatedAt: stored.updatedAt,
      updatedBy: stored.updatedBy,
    };
  }

  return {
    id: section.id,
    label: section.label,
    description: section.description,
    content: getSeedSectionContent(sectionId),
    source: "seed",
  };
}

/** Every section belonging to an admin module, in registry order. */
export async function loadModuleSections(moduleId: string) {
  const sections = getSectionsForModule(moduleId);

  // Parallel because each read is an independent HTTP call; serialising them
  // would make the Home screen (11 sections) visibly slow.
  const results = await Promise.all(
    sections.map((section) => loadSectionContent(section.id))
  );

  return results.filter(
    (result): result is SectionContentResult => result !== null
  );
}
