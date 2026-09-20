/**
 * Shape of every CMS document.
 *
 * Content is stored twice over, on purpose:
 *
 *   - `contentJson`  the full payload as a JSON string
 *   - top-level      a handful of plain fields used for querying and listing
 *
 * The JSON string exists because Firestore cannot store an array directly
 * inside another array, and the article/section payloads nest arrays several
 * levels deep. Flattening them into Firestore's native types would mean a
 * lossy conversion on every read and write, and would break the moment an
 * editor adds a nested list. Serialising once sidesteps all of it.
 *
 * The plain fields exist because a JSON string is not indexable. `category`,
 * `status` and `order` are duplicated out so the admin list views and the
 * public category pages can filter and sort without downloading everything.
 *
 * `updatedAt` and `updatedBy` are required by the Firestore rules, so a write
 * that skips them is rejected rather than silently losing its audit trail.
 */

export type CmsDocumentStatus = "published" | "draft";

export type CmsDocumentMeta = {
  id: string;
  status: CmsDocumentStatus;
  order: number;
  category?: string;
  title?: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type CmsDocument<TContent = unknown> = CmsDocumentMeta & {
  content: TContent;
};

/** Where the copy being served actually came from. */
export type CmsSource = "firestore" | "seed";

export type CmsRecord<TContent = unknown> = CmsDocument<TContent> & {
  source: CmsSource;
};

export function isCmsDocumentStatus(value: unknown): value is CmsDocumentStatus {
  return value === "published" || value === "draft";
}

/**
 * Builds the Firestore payload for a CMS write.
 *
 * `updatedAt` is left out deliberately: the caller sets it with
 * `serverTimestamp()` so it matches `request.time` and satisfies the rules.
 * A client clock cannot be trusted to do that.
 */
export function buildCmsPayload<TContent>(
  meta: Omit<CmsDocumentMeta, "updatedAt">,
  content: TContent
) {
  const payload: Record<string, unknown> = {
    id: meta.id,
    status: meta.status,
    order: meta.order,
    contentJson: JSON.stringify(content),
    updatedBy: meta.updatedBy,
  };

  if (meta.category) payload.category = meta.category;
  if (meta.title) payload.title = meta.title;

  return payload;
}
