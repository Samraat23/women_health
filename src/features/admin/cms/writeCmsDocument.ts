"use client";

import {
  collection as firestoreCollection,
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";

import { adminAuth, adminDb } from "@/features/admin/firebase/adminFirebase";
import { cmsCollections } from "@/lib/cms/collections";
import {
  buildCmsPayload,
  type CmsDocumentMeta,
  type CmsDocumentStatus,
} from "@/lib/cms/document";

/**
 * Client-side write path for CMS content.
 *
 * Writes go through the Firebase SDK as the signed-in admin, so Firestore's
 * rules are the thing actually enforcing access — not this file, and not the
 * Next.js session cookie. The cookie only decides who gets to see the admin
 * screens.
 *
 * Two fields are mandatory on every write because the rules check them:
 *
 *   updatedAt  must equal `request.time`, which only `serverTimestamp()` gives
 *   updatedBy  must equal the signed-in email, lowercased
 *
 * A write that omits either is rejected by Firestore, which is deliberate: it
 * makes the audit trail impossible to skip.
 */

/** Firestore caps a batched write at 500 operations. */
const maxBatchSize = 500;

export type CmsWriteInput<TContent> = {
  collection: string;
  documentId: string;
  content: TContent;
  title?: string;
  category?: string;
  order?: number;
  status?: CmsDocumentStatus;
};

function requireAdminEmail() {
  const email = adminAuth.currentUser?.email?.trim().toLowerCase();

  if (!email) {
    throw new Error(
      "You are signed out of Firebase. Reload the page and sign in again."
    );
  }

  return email;
}

function toPayload<TContent>(input: CmsWriteInput<TContent>, actor: string) {
  const meta: Omit<CmsDocumentMeta, "updatedAt"> = {
    id: input.documentId,
    status: input.status || "published",
    order: input.order ?? 0,
    category: input.category,
    title: input.title,
    updatedBy: actor,
  };

  return {
    ...buildCmsPayload(meta, input.content),
    updatedAt: serverTimestamp(),
  };
}

/** Writes one document, merging over whatever is already there. */
export async function writeCmsDocument<TContent>(
  input: CmsWriteInput<TContent>
) {
  const actor = requireAdminEmail();

  await setDoc(
    doc(adminDb, input.collection, input.documentId),
    toPayload(input, actor),
    { merge: true }
  );

  await recordAudit({
    action: "update",
    collection: input.collection,
    documentId: input.documentId,
    actor,
  });
}

export type BulkWriteProgress = {
  written: number;
  total: number;
};

/**
 * Writes many documents in batches.
 *
 * Reports progress between batches so the migration screen can show movement
 * on a 34-article import instead of appearing to hang.
 */
export async function writeCmsDocuments<TContent>(
  inputs: CmsWriteInput<TContent>[],
  onProgress?: (progress: BulkWriteProgress) => void
) {
  const actor = requireAdminEmail();
  const total = inputs.length;
  let written = 0;

  for (let start = 0; start < total; start += maxBatchSize) {
    const slice = inputs.slice(start, start + maxBatchSize);
    const batch = writeBatch(adminDb);

    for (const input of slice) {
      batch.set(
        doc(adminDb, input.collection, input.documentId),
        toPayload(input, actor),
        { merge: true }
      );
    }

    await batch.commit();

    written += slice.length;
    onProgress?.({ written, total });
  }

  return { written, total, actor };
}

export type AuditEntry = {
  action: "update" | "import" | "delete";
  collection: string;
  documentId?: string;
  documentCount?: number;
  actor: string;
};

/**
 * Appends to the audit trail.
 *
 * Never throws: an audit write failing must not roll back or mask a content
 * write that already succeeded. A missing audit row is a smaller problem than
 * an editor being told their save failed when it did not.
 */
export async function recordAudit(entry: AuditEntry) {
  try {
    await addDoc(firestoreCollection(adminDb, cmsCollections.audit), {
      ...entry,
      at: serverTimestamp(),
    });
  } catch {
    // Intentionally silent. See above.
  }
}
