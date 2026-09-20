import { firebasePublicConfig } from "@/lib/firebasePublicConfig";
import {
  isCmsDocumentStatus,
  type CmsDocument,
  type CmsDocumentStatus,
} from "./document";

/**
 * Server-side read path for CMS content.
 *
 * Mirrors the approach already proven in `@/lib/articleStore`: talk to the
 * Firestore REST API with the public web key, cache the response with the
 * Next.js data cache, and never let a page render block on Firebase. Callers
 * layer the result over compiled-in seed data, so the site keeps rendering when
 * Firestore is empty, unreachable, or locked down.
 *
 * This file is server-only. Client components write through the Firebase SDK
 * instead (see `@/features/admin/cms/writeCmsDocument`).
 */

const { projectId, apiKey } = firebasePublicConfig;

/** Published copy does not need to be fresh to the second. */
const revalidateSeconds = 60;

/** A page render must never wait on Firestore longer than this. */
const requestTimeoutMs = 4000;

const documentsBaseUrl =
  `https://firestore.googleapis.com/v1/projects/${projectId}` +
  `/databases/(default)/documents`;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
};

type FirestoreDocument = {
  name?: string;
  updateTime?: string;
  fields?: Record<string, FirestoreValue>;
};

type FirestoreListResponse = {
  documents?: FirestoreDocument[];
  nextPageToken?: string;
};

function isConfigured() {
  return Boolean(projectId && apiKey);
}

function readString(fields: Record<string, FirestoreValue> | undefined, key: string) {
  const value = fields?.[key];

  if (!value) return undefined;
  if (typeof value.stringValue === "string") return value.stringValue;
  if (typeof value.timestampValue === "string") return value.timestampValue;

  return undefined;
}

function readNumber(fields: Record<string, FirestoreValue> | undefined, key: string) {
  const value = fields?.[key];

  if (!value) return undefined;
  if (typeof value.doubleValue === "number") return value.doubleValue;
  if (typeof value.integerValue === "string") {
    const parsed = Number(value.integerValue);

    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

/** Document id from the REST `name` path, which is fully qualified. */
function readDocumentId(document: FirestoreDocument) {
  const segments = (document.name || "").split("/");

  return segments[segments.length - 1] || "";
}

/**
 * Turns a REST document into a CMS record.
 *
 * Returns null rather than throwing when `contentJson` is missing or corrupt,
 * so one hand-edited document cannot take down a public page.
 */
function parseDocument<TContent>(
  document: FirestoreDocument
): CmsDocument<TContent> | null {
  const contentJson = readString(document.fields, "contentJson");

  if (!contentJson) return null;

  let content: TContent;

  try {
    content = JSON.parse(contentJson) as TContent;
  } catch {
    return null;
  }

  const rawStatus = readString(document.fields, "status");
  const status: CmsDocumentStatus = isCmsDocumentStatus(rawStatus)
    ? rawStatus
    : "published";

  return {
    id: readString(document.fields, "id") || readDocumentId(document),
    status,
    order: readNumber(document.fields, "order") ?? 0,
    category: readString(document.fields, "category"),
    title: readString(document.fields, "title"),
    updatedAt: readString(document.fields, "updatedAt") || document.updateTime,
    updatedBy: readString(document.fields, "updatedBy"),
    content,
  };
}

async function fetchJson<TResponse>(
  url: string,
  tags: string[]
): Promise<TResponse | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(requestTimeoutMs),
      next: { revalidate: revalidateSeconds, tags },
    });

    if (!response.ok) return null;

    return (await response.json()) as TResponse;
  } catch {
    // Network failure, timeout, or malformed JSON. Callers fall back to seed.
    return null;
  }
}

/** One document. Null when absent, unreadable, or Firebase is unconfigured. */
export async function readCmsDocument<TContent>(
  collection: string,
  documentId: string
): Promise<CmsDocument<TContent> | null> {
  if (!isConfigured()) return null;

  const url =
    `${documentsBaseUrl}/${collection}/${encodeURIComponent(documentId)}` +
    `?key=${apiKey}`;

  const document = await fetchJson<FirestoreDocument>(url, [
    collection,
    `${collection}:${documentId}`,
  ]);

  return document ? parseDocument<TContent>(document) : null;
}

/**
 * Every readable document in a collection, oldest page first.
 *
 * Paginates so a collection larger than one page (34 articles today, more
 * later) does not come back truncated.
 */
export async function readCmsCollection<TContent>(
  collection: string,
  { pageSize = 300, maxPages = 10 }: { pageSize?: number; maxPages?: number } = {}
): Promise<CmsDocument<TContent>[]> {
  if (!isConfigured()) return [];

  const records: CmsDocument<TContent>[] = [];
  let pageToken: string | undefined;

  for (let page = 0; page < maxPages; page += 1) {
    const url =
      `${documentsBaseUrl}/${collection}` +
      `?pageSize=${pageSize}&key=${apiKey}` +
      (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "");

    const data = await fetchJson<FirestoreListResponse>(url, [collection]);

    if (!data) break;

    for (const document of data.documents || []) {
      const parsed = parseDocument<TContent>(document);

      if (parsed) records.push(parsed);
    }

    if (!data.nextPageToken) break;

    pageToken = data.nextPageToken;
  }

  return records.sort((left, right) => left.order - right.order);
}

/** Collection as a Map keyed by document id, for layering over seed data. */
export async function readCmsCollectionMap<TContent>(
  collection: string
): Promise<Map<string, CmsDocument<TContent>>> {
  const records = await readCmsCollection<TContent>(collection);

  return new Map(records.map((record) => [record.id, record]));
}
