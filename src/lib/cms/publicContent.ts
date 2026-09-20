import { cmsCollections } from "./collections";
import { readCmsDocument } from "./read";
import { getSeedSectionContent } from "./sectionSeed";

/**
 * Public-site read path for CMS sections.
 *
 * This is the bridge that makes an admin edit visible on the website. Pages
 * used to import `siteData.json` and `homePageContent.json` directly, which
 * meant a saved edit went to Firestore and the page kept rendering the file
 * that shipped with the build — the change appeared nowhere.
 *
 * Order of preference:
 *
 *   1. Firestore, when the section has been imported or edited
 *   2. the section's built-in seed
 *   3. the caller's fallback
 *
 * Reads are cached for 60 seconds under a tag per collection, and the admin
 * save handler purges that tag, so an edit shows up immediately rather than
 * after the window expires. If Firestore is slow or unreachable the read times
 * out and the page renders the seed instead of failing.
 */

export async function getSection<TContent>(
  sectionId: string,
  fallback: TContent
): Promise<TContent> {
  const stored = await readCmsDocument<TContent>(
    cmsCollections.sections,
    sectionId
  );

  if (stored && stored.content !== null && stored.content !== undefined) {
    return stored.content;
  }

  const seed = getSeedSectionContent(sectionId);

  return (seed as TContent) ?? fallback;
}

/**
 * Several sections in one pass.
 *
 * Each read is an independent HTTP call, so the home page — which needs nine
 * of them — would otherwise pay for them one after another.
 */
export async function getSections<TShape extends Record<string, unknown>>(
  requests: { [K in keyof TShape]: { sectionId: string; fallback: TShape[K] } }
): Promise<TShape> {
  const keys = Object.keys(requests) as Array<keyof TShape>;

  const values = await Promise.all(
    keys.map((key) =>
      getSection(requests[key].sectionId, requests[key].fallback)
    )
  );

  return keys.reduce((result, key, index) => {
    result[key] = values[index] as TShape[keyof TShape];

    return result;
  }, {} as TShape);
}
