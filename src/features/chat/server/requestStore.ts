import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  getConsultationType,
  getTimeSlot,
  getTopicLabel,
} from "@/features/chat/core/catalog";
import { formatLongDate } from "@/features/chat/core/dates";
import type { ChatConfig, ChatSubmission, RequestKind } from "@/features/chat/core/types";
import {
  getGoogleAccessToken,
  getServiceAccount,
} from "@/features/chat/server/googleServiceAccount";

/**
 * Where chat appointments and inquiries are kept.
 *
 * - "firestore": used automatically when a Firebase service account is
 *   configured. Suitable for serverless hosting; rules can deny all browser access.
 * - "file": JSON lines in a private folder (default .data/chat). Suitable for
 *   local development or a single long-running server with a persistent disk.
 *
 * Force one with CHAT_STORAGE_DRIVER=file|firestore.
 */

export type StoredChatRequest = {
  referenceId: string;
  kind: RequestKind;
  status: "new";
  createdAt: string;
  patient: { name: string; phone: string; age?: number };
  appointment?: {
    serviceId: string;
    serviceLabel: string;
    consultationType: string;
    consultationLabel: string;
    date: string;
    dateLabel: string;
    timeSlotId: string;
    timeSlotLabel: string;
    concern?: string;
  };
  inquiry?: { text: string; serviceId?: string; serviceLabel?: string };
  sourcePath?: string;
  clinicNotified: boolean;
};

export type ChatRequestRepository = {
  driver: "file" | "firestore";
  save(record: StoredChatRequest): Promise<void>;
  list(limit: number): Promise<StoredChatRequest[]>;
};

// No 0/O or 1/I, so a reference read out over the phone is unambiguous.
const referenceAlphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function createReferenceId(kind: RequestKind) {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = Array.from(bytes, (byte) => referenceAlphabet[byte % referenceAlphabet.length]).join("");

  return `KGC-${kind === "appointment" ? "A" : "Q"}${code}`;
}

export function toStoredRequest(
  submission: ChatSubmission,
  config: ChatConfig,
  referenceId: string,
  createdAt: Date,
  clinicNotified: boolean
): StoredChatRequest {
  const base = {
    referenceId,
    kind: submission.kind,
    status: "new" as const,
    createdAt: createdAt.toISOString(),
    sourcePath: submission.sourcePath,
    clinicNotified,
  };

  if (submission.kind === "inquiry") {
    return {
      ...base,
      patient: { name: submission.patient.name, phone: submission.patient.phone },
      inquiry: {
        text: submission.inquiry.text,
        serviceId: submission.inquiry.serviceId,
        serviceLabel: submission.inquiry.serviceId
          ? getTopicLabel(config.catalog, submission.inquiry.serviceId)
          : undefined,
      },
    };
  }

  const { appointment, patient } = submission;
  const slot = getTimeSlot(config, appointment.timeSlotId);

  return {
    ...base,
    patient: { name: patient.name, phone: patient.phone, age: patient.age },
    appointment: {
      serviceId: appointment.serviceId,
      serviceLabel: getTopicLabel(config.catalog, appointment.serviceId),
      consultationType: appointment.consultationType,
      consultationLabel: getConsultationType(config, appointment.consultationType)?.label ?? appointment.consultationType,
      date: appointment.date,
      dateLabel: formatLongDate(appointment.date),
      timeSlotId: appointment.timeSlotId,
      timeSlotLabel: slot ? `${slot.label} (${slot.range})` : appointment.timeSlotId,
      concern: appointment.concern,
    },
  };
}

function isStoredRequest(value: unknown): value is StoredChatRequest {
  const record = value as Partial<StoredChatRequest> | null;

  return Boolean(record && typeof record.referenceId === "string" && record.patient && record.createdAt);
}

// ---------------------------------------------------------------------------
// File driver
// ---------------------------------------------------------------------------

function getDataDirectory() {
  const root = process.cwd();
  const directory = path.resolve(root, process.env.CHAT_DATA_DIR || ".data/chat");

  // Never somewhere the web server would hand the file out.
  for (const publicPath of [path.join(root, "public"), path.join(root, ".next")]) {
    if (directory === publicPath || directory.startsWith(`${publicPath}${path.sep}`)) {
      throw new Error("CHAT_DATA_DIR must not be inside a publicly served folder.");
    }
  }

  return directory;
}

const fileRepository: ChatRequestRepository = {
  driver: "file",

  async save(record) {
    const directory = getDataDirectory();

    await mkdir(directory, { recursive: true, mode: 0o700 });
    await appendFile(path.join(directory, "requests.jsonl"), `${JSON.stringify(record)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
  },

  async list(limit) {
    let contents = "";

    try {
      contents = await readFile(path.join(getDataDirectory(), "requests.jsonl"), "utf8");
    } catch {
      return [];
    }

    const records: StoredChatRequest[] = [];

    for (const line of contents.split("\n")) {
      if (!line.trim()) continue;

      try {
        const parsed = JSON.parse(line) as unknown;

        if (isStoredRequest(parsed)) records.push(parsed);
      } catch {
        // A torn final line from an interrupted write; skip it.
      }
    }

    return records.reverse().slice(0, limit);
  },
};

// ---------------------------------------------------------------------------
// Firestore driver (REST, authenticated as the service account)
// ---------------------------------------------------------------------------

function getCollection() {
  return process.env.CHAT_REQUESTS_COLLECTION || "chat_requests";
}

function firestoreRepository(): ChatRequestRepository {
  const account = getServiceAccount();

  if (!account?.projectId) {
    throw new Error("Firestore chat storage needs a Firebase service account with a project id.");
  }

  const documentsUrl = `https://firestore.googleapis.com/v1/projects/${account.projectId}/databases/(default)/documents/${getCollection()}`;

  return {
    driver: "firestore",

    async save(record) {
      const token = await getGoogleAccessToken(account);
      const response = await fetch(`${documentsUrl}?documentId=${encodeURIComponent(record.referenceId)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            referenceId: { stringValue: record.referenceId },
            kind: { stringValue: record.kind },
            status: { stringValue: record.status },
            createdAt: { timestampValue: record.createdAt },
            patientName: { stringValue: record.patient.name },
            patientPhone: { stringValue: record.patient.phone },
            // The full record, so nested details round-trip exactly.
            recordJson: { stringValue: JSON.stringify(record) },
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) throw new Error(`Firestore write failed with status ${response.status}.`);
    },

    async list(limit) {
      const token = await getGoogleAccessToken(account);
      const response = await fetch(
        `${documentsUrl}?pageSize=${Math.min(limit, 300)}&orderBy=${encodeURIComponent("createdAt desc")}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        }
      );

      if (!response.ok) throw new Error(`Firestore read failed with status ${response.status}.`);

      const data = (await response.json()) as {
        documents?: Array<{ fields?: { recordJson?: { stringValue?: string } } }>;
      };

      return (data.documents ?? []).flatMap((document) => {
        try {
          const parsed = JSON.parse(document.fields?.recordJson?.stringValue ?? "") as unknown;

          return isStoredRequest(parsed) ? [parsed] : [];
        } catch {
          return [];
        }
      });
    },
  };
}

export function getChatRequestRepository(): ChatRequestRepository {
  const driver = process.env.CHAT_STORAGE_DRIVER || (getServiceAccount() ? "firestore" : "file");

  return driver === "firestore" ? firestoreRepository() : fileRepository;
}
