import { readCmsCollectionMap } from "./read";
import { buildSeedDocumentsFor } from "./seedLight";

/**
 * Server-side loader for a whole CMS collection.
 *
 * Layers Firestore over the built-in seed the same way `sectionContent` does
 * for a single section: documents that have been imported or edited come from
 * Firestore, the rest fall back to the compiled-in copy. The admin screens can
 * therefore render and edit every collection before the migration has been
 * run, and a half-imported collection is not half-blank.
 */

export type CollectionEntry = {
  id: string;
  title: string;
  order: number;
  category?: string;
  content: unknown;
  source: "firestore" | "seed";
  updatedAt?: string;
  updatedBy?: string;
};

export async function loadCollectionEntries(
  collection: string
): Promise<CollectionEntry[]> {
  const [stored, seed] = await Promise.all([
    readCmsCollectionMap<unknown>(collection),
    Promise.resolve(safeBuildSeed(collection)),
  ]);

  const entries = new Map<string, CollectionEntry>();

  for (const document of seed) {
    entries.set(document.documentId, {
      id: document.documentId,
      title: document.title,
      order: document.order,
      category: document.category,
      content: document.content,
      source: "seed",
    });
  }

  // Firestore wins wherever it has a document, and adds any the seed does not
  // know about (created through the admin panel after the import).
  for (const [id, document] of stored) {
    entries.set(id, {
      id,
      title: document.title || entries.get(id)?.title || id,
      order: document.order,
      category: document.category,
      content: document.content,
      source: "firestore",
      updatedAt: document.updatedAt,
      updatedBy: document.updatedBy,
    });
  }

  return [...entries.values()].sort((left, right) => left.order - right.order);
}

/**
 * A seed builder throws when its source file changed shape. That should not
 * blank an admin screen whose Firestore data is fine, so the failure degrades
 * to "no seed" instead.
 */
function safeBuildSeed(collection: string) {
  try {
    return buildSeedDocumentsFor(collection) || [];
  } catch {
    return [];
  }
}
