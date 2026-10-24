import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  getGoogleAccessToken,
  getServiceAccount,
} from "@/features/chat/server/googleServiceAccount";
import type { AnalyticsEvent, AnalyticsEventRepository } from "@/features/analytics/core/types";

/**
 * Where page-view events are kept.
 *
 * Same two-driver shape as `@/features/chat/server/requestStore`: "firestore"
 * when a service account is configured (production), "file" otherwise (local
 * development, or any deployment without one). Analytics events never touch
 * the browser-facing Firestore rules — they are written server-side only,
 * through this repository, exactly like chat requests.
 *
 * Force one with ANALYTICS_STORAGE_DRIVER=file|firestore.
 */

function isValidEvent(value: unknown): value is AnalyticsEvent {
  const record = value as Partial<AnalyticsEvent> | null;

  return Boolean(
    record &&
      typeof record.id === "string" &&
      typeof record.path === "string" &&
      typeof record.createdAt === "string" &&
      typeof record.sessionId === "string" &&
      typeof record.visitorId === "string"
  );
}

// ---------------------------------------------------------------------------
// File driver
// ---------------------------------------------------------------------------

function getDataDirectory() {
  const root = process.cwd();
  const directory = path.resolve(root, process.env.ANALYTICS_DATA_DIR || ".data/analytics");

  for (const publicPath of [path.join(root, "public"), path.join(root, ".next")]) {
    if (directory === publicPath || directory.startsWith(`${publicPath}${path.sep}`)) {
      throw new Error("ANALYTICS_DATA_DIR must not be inside a publicly served folder.");
    }
  }

  return directory;
}

const fileRepository: AnalyticsEventRepository = {
  driver: "file",

  async save(event) {
    const directory = getDataDirectory();

    await mkdir(directory, { recursive: true, mode: 0o700 });
    await appendFile(path.join(directory, "events.jsonl"), `${JSON.stringify(event)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
  },

  async list(limit) {
    let contents = "";

    try {
      contents = await readFile(path.join(getDataDirectory(), "events.jsonl"), "utf8");
    } catch {
      return [];
    }

    const records: AnalyticsEvent[] = [];

    for (const line of contents.split("\n")) {
      if (!line.trim()) continue;

      try {
        const parsed = JSON.parse(line) as unknown;

        if (isValidEvent(parsed)) records.push(parsed);
      } catch {
        // A torn final line from an interrupted write; skip it.
      }
    }

    return records.slice(-limit).reverse();
  },
};

// ---------------------------------------------------------------------------
// Firestore driver (REST, authenticated as the service account)
// ---------------------------------------------------------------------------

function getCollection() {
  return process.env.ANALYTICS_EVENTS_COLLECTION || "analytics_events";
}

function firestoreRepository(): AnalyticsEventRepository {
  const account = getServiceAccount();

  if (!account?.projectId) {
    throw new Error("Firestore analytics storage needs a Firebase service account with a project id.");
  }

  const documentsUrl = `https://firestore.googleapis.com/v1/projects/${account.projectId}/databases/(default)/documents/${getCollection()}`;

  return {
    driver: "firestore",

    async save(event) {
      const token = await getGoogleAccessToken(account);
      const response = await fetch(`${documentsUrl}?documentId=${encodeURIComponent(event.id)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            id: { stringValue: event.id },
            path: { stringValue: event.path },
            createdAt: { timestampValue: event.createdAt },
            // The full record, so every field round-trips exactly.
            recordJson: { stringValue: JSON.stringify(event) },
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) throw new Error(`Firestore write failed with status ${response.status}.`);
    },

    async list(limit) {
      const token = await getGoogleAccessToken(account);
      const records: AnalyticsEvent[] = [];
      let pageToken: string | undefined;

      // Firestore REST pages at ~300 docs; loop until `limit` is covered or
      // the collection runs out. Ordered oldest-first server-side, reversed
      // once collected so the newest events win when `limit` truncates.
      while (records.length < limit) {
        const pageSize = Math.min(300, limit - records.length);
        const url =
          `${documentsUrl}?pageSize=${pageSize}&orderBy=${encodeURIComponent("createdAt desc")}` +
          (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "");

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        });

        if (!response.ok) throw new Error(`Firestore read failed with status ${response.status}.`);

        const data = (await response.json()) as {
          documents?: Array<{ fields?: { recordJson?: { stringValue?: string } } }>;
          nextPageToken?: string;
        };

        for (const document of data.documents ?? []) {
          try {
            const parsed = JSON.parse(document.fields?.recordJson?.stringValue ?? "") as unknown;

            if (isValidEvent(parsed)) records.push(parsed);
          } catch {
            // Skip a malformed row rather than fail the whole read.
          }
        }

        if (!data.nextPageToken || !data.documents?.length) break;
        pageToken = data.nextPageToken;
      }

      return records;
    },
  };
}

export function getAnalyticsEventRepository(): AnalyticsEventRepository {
  const driver = process.env.ANALYTICS_STORAGE_DRIVER || (getServiceAccount() ? "firestore" : "file");

  return driver === "firestore" ? firestoreRepository() : fileRepository;
}
