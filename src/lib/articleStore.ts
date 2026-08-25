import { articlesCollection } from "@/lib/articlesCollection";
import { getSeedArticle, getSeedArticles } from "@/lib/articleSeed";
import type { ArticleDoc, ArticleRecord } from "@/types/article";

/**
 * Server-side read path for article content.
 *
 * Firestore holds only the articles an admin has edited. Everything else falls
 * back to the compiled-in seed, so the site keeps rendering when Firebase is
 * unconfigured, unreachable, or the rules deny reads.
 */

const projectId =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "drkusumlata-36b7a";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";

// Published copy does not need to be fresh to the second, and this keeps the
// public pages off the Firestore read path for most requests.
const revalidateSeconds = 60;

// A page render must never wait on Firestore. If the lookup is slow the request
// falls back to the seed rather than hanging.
const requestTimeoutMs = 4000;

type FirestoreDocument = {
  name?: string;
  updateTime?: string;
  fields?: {
    slug?: { stringValue?: string };
    contentJson?: { stringValue?: string };
  };
};

type FirestoreListResponse = {
  documents?: FirestoreDocument[];
  nextPageToken?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Guards against a partially written or hand-edited Firestore document taking
 * down a public page.
 */
export function isValidArticleDoc(value: unknown): value is ArticleDoc {
  if (!value || typeof value !== "object") return false;

  const doc = value as Partial<ArticleDoc>;

  return (
    isNonEmptyString(doc.slug) &&
    Boolean(doc.hero) &&
    Boolean(doc.article) &&
    isNonEmptyString(doc.article?.title) &&
    isNonEmptyString(doc.article?.id) &&
    Array.isArray(doc.sections) &&
    Array.isArray(doc.article?.paragraphs) &&
    Boolean(doc.author)
  );
}

function parseDocument(document: FirestoreDocument) {
  const contentJson = document.fields?.contentJson?.stringValue;

  if (!isNonEmptyString(contentJson)) return null;

  try {
    const parsed = JSON.parse(contentJson) as unknown;

    if (!isValidArticleDoc(parsed)) return null;

    return { doc: parsed, updatedAt: document.updateTime };
  } catch {
    return null;
  }
}

async function fetchOverrides(): Promise<
  Map<string, { doc: ArticleDoc; updatedAt?: string }>
> {
  const overrides = new Map<string, { doc: ArticleDoc; updatedAt?: string }>();

  if (!projectId || !apiKey) return overrides;

  const url =
    `https://firestore.googleapis.com/v1/projects/${projectId}` +
    `/databases/(default)/documents/${articlesCollection}` +
    `?pageSize=300&key=${apiKey}`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(requestTimeoutMs),
      next: { revalidate: revalidateSeconds, tags: ["articles"] },
    });

    if (!response.ok) return overrides;

    const data = (await response.json()) as FirestoreListResponse;

    for (const document of data.documents || []) {
      const parsed = parseDocument(document);

      if (parsed) {
        overrides.set(parsed.doc.slug, parsed);
      }
    }
  } catch {
    // Network or parse failure: callers fall back to the seed.
  }

  return overrides;
}

async function fetchOverride(slug: string) {
  if (!projectId || !apiKey) return null;

  const url =
    `https://firestore.googleapis.com/v1/projects/${projectId}` +
    `/databases/(default)/documents/${articlesCollection}/${encodeURIComponent(slug)}` +
    `?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(requestTimeoutMs),
      next: { revalidate: revalidateSeconds, tags: ["articles", `article:${slug}`] },
    });

    if (!response.ok) return null;

    return parseDocument((await response.json()) as FirestoreDocument);
  } catch {
    return null;
  }
}

/** Every article, with any Firestore edits applied over the seed. */
export async function getArticleRecords(): Promise<ArticleRecord[]> {
  const overrides = await fetchOverrides();

  return getSeedArticles().map((seed) => {
    const override = overrides.get(seed.slug);

    return override
      ? { ...override.doc, source: "firestore" as const, updatedAt: override.updatedAt }
      : { ...seed, source: "seed" as const };
  });
}

export async function getArticleRecord(
  slug: string
): Promise<ArticleRecord | null> {
  const seed = getSeedArticle(slug);
  const override = await fetchOverride(slug);

  if (override) {
    return {
      ...override.doc,
      source: "firestore",
      updatedAt: override.updatedAt,
    };
  }

  return seed ? { ...seed, source: "seed" } : null;
}
