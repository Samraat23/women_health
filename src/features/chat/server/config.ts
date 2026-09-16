import { z } from "zod";

import servicesJson from "@/data/chat/services.json";
import settingsJson from "@/data/chat/settings.json";
import type {
  ChatCatalog,
  ChatConfig,
  ChatCopy,
  ChatSettings,
} from "@/features/chat/core/types";
import { getArticleRecords } from "@/lib/articleStore";

/**
 * Chat configuration for the server. Settings and the service catalog live in
 * src/data/chat/*.json; service descriptions are read from the website's own
 * articles (including admin edits), so the chat never invents medical content.
 */

const fieldSchema = z.enum([
  "serviceId",
  "consultationType",
  "date",
  "timeSlotId",
  "patientName",
  "age",
  "phone",
  "inquiry",
]);
const consultationTypeSchema = z.enum(["clinic", "video", "audio"]);
const text = z.string().min(1);
const hour = z.number().int().min(0).max(24);

const questionKeys = [
  "serviceId",
  "consultationType",
  "date",
  "timeSlotId",
  "patientName",
  "patientNameInquiry",
  "age",
  "phone",
  "phoneInquiry",
  "inquiry",
  "inquiryAboutTopic",
] as const satisfies readonly (keyof ChatCopy["questions"])[];

const copyKeys = [
  "welcomeTitle",
  "welcomeBody",
  "contextNudge",
  "emergencyNote",
  "privacyNote",
  "rememberedDetails",
  "justNamed",
  "reviewAppointment",
  "reviewInquiry",
  "successAppointmentTitle",
  "successAppointmentBody",
  "successInquiryTitle",
  "successInquiryBody",
  "fees",
  "timings",
  "location",
  "contact",
  "humanHandoff",
  "medicalAdvice",
  "emergency",
  "crisis",
  "caution",
  "unknown",
  "greeting",
  "thanks",
  "cancelled",
  "exploreIntro",
  "resume",
  "reviewPrompt",
  "submitError",
  "offline",
] as const satisfies readonly Exclude<keyof ChatCopy, "questions">[];

// Fails to compile if ChatCopy gains a key that the lists above don't check.
type UncheckedCopyKey =
  | Exclude<keyof ChatCopy, (typeof copyKeys)[number] | "questions">
  | Exclude<keyof ChatCopy["questions"], (typeof questionKeys)[number]>;
const everyCopyKeyChecked: [UncheckedCopyKey] extends [never] ? true : never = true;

void everyCopyKeyChecked;

const requiredText = (keys: readonly string[]) =>
  z.object(Object.fromEntries(keys.map((key) => [key, text])));

const settingsSchema = z.object({
  version: z.number(),
  enabled: z.boolean(),
  assistant: z.object({
    name: text,
    teamName: text,
    doctorName: text,
    doctorCredentials: text,
    avatar: text,
    statusText: text,
    launcherLabel: text,
    teaser: z.object({ enabled: z.boolean(), delayMs: z.number().min(0), text: text }),
  }),
  clinic: z.object({
    name: text,
    address: text,
    mapsUrl: z.url(),
    phoneDisplay: text,
    phoneHref: text,
    whatsAppNumber: z.string().regex(/^\d{10,15}$/),
    instagramUrl: z.url(),
    emergencyNumber: text,
    mentalHealthHelpline: text,
  }),
  doctor: z.object({
    name: text,
    title: text,
    credentials: text,
    qualifications: z.array(text),
    highlights: z.array(text),
    profileUrl: text,
  }),
  consultationTypes: z
    .array(
      z.object({
        id: consultationTypeSchema,
        label: text,
        shortLabel: text,
        description: text,
        icon: text,
        enabled: z.boolean(),
      })
    )
    .min(1),
  mainMenu: z
    .array(
      z.object({
        id: text,
        action: z.enum(["start_booking", "start_inquiry", "explore_services"]),
        consultationType: consultationTypeSchema.optional(),
        label: text,
        description: text,
        icon: text,
      })
    )
    .min(1),
  availability: z.object({
    timeZone: text,
    bookingWindowDays: z.number().int().min(1).max(365),
    quickDateCount: z.number().int().min(1).max(14),
    closedWeekdays: z.array(z.number().int().min(0).max(6)),
    closedDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    timeSlots: z
      .array(
        z.object({
          id: text,
          label: text,
          range: text,
          startHour: hour,
          endHour: hour,
          closesAtHour: hour,
          icon: text,
        })
      )
      .min(1),
  }),
  appointment: z.object({
    fieldOrder: z.array(fieldSchema),
    minAge: z.number().int().min(0),
    maxAge: z.number().int().max(130),
    featuredServiceIds: z.array(text),
    generalServiceId: text,
  }),
  inquiry: z.object({
    fieldOrder: z.array(fieldSchema),
    minLength: z.number().int().min(1),
    maxLength: z.number().int().max(5000),
  }),
  copy: requiredText(copyKeys).extend({ questions: requiredText(questionKeys) }),
});

const catalogSchema = z.object({
  categories: z.array(
    z.object({
      id: text,
      title: text,
      description: text,
      href: text,
      icon: text,
      keywords: z.array(text),
    })
  ),
  services: z.array(
    z.object({
      id: text,
      title: text,
      shortTitle: text.optional(),
      categoryId: text.nullable(),
      articleSlug: text.optional(),
      href: text.optional(),
      summary: text.optional(),
      caution: z.boolean().optional(),
      bookingOnly: z.boolean().optional(),
      keywords: z.array(text),
    })
  ),
});

function parseConfig() {
  // The schemas check every field at runtime; the casts only restore the literal types.
  const settings = settingsSchema.parse(settingsJson) as unknown as ChatSettings;
  const catalog = catalogSchema.parse(servicesJson) as ChatCatalog;
  const topicIds = new Set([...catalog.categories, ...catalog.services].map((item) => item.id));

  for (const id of [...settings.appointment.featuredServiceIds, settings.appointment.generalServiceId]) {
    if (!topicIds.has(id)) throw new Error(`Chat settings reference an unknown service "${id}".`);
  }

  for (const service of catalog.services) {
    if (service.categoryId && !topicIds.has(service.categoryId)) {
      throw new Error(`Chat service "${service.id}" has an unknown category "${service.categoryId}".`);
    }
  }

  return { settings, catalog };
}

const baseConfig = parseConfig();

/** First sentence or two of an article intro, as a short service description. */
function summarize(intro: string) {
  let summary = "";

  for (const sentence of intro.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/)) {
    if (summary && summary.length + sentence.length > 260) break;

    summary = summary ? `${summary} ${sentence}` : sentence;

    if (summary.length >= 140) break;
  }

  return summary;
}

const cacheMs = 60_000;
let cached: { config: ChatConfig; expiresAt: number } | null = null;

export async function getChatConfig(): Promise<ChatConfig> {
  if (cached && cached.expiresAt > Date.now()) return cached.config;

  const intros = new Map<string, string>();

  try {
    for (const record of await getArticleRecords()) {
      intros.set(record.slug, record.article.intro);
    }
  } catch {
    // Without articles the chat still works; cards simply show no description.
  }

  const config: ChatConfig = {
    settings: baseConfig.settings,
    catalog: {
      categories: baseConfig.catalog.categories,
      services: baseConfig.catalog.services.map((service) => {
        const intro = service.articleSlug ? intros.get(service.articleSlug) : undefined;

        return { ...service, summary: service.summary ?? (intro ? summarize(intro) : undefined) };
      }),
    },
  };

  cached = { config, expiresAt: Date.now() + cacheMs };

  return config;
}

/** What the browser needs: the matching keywords stay on the server. */
export function toPublicConfig(config: ChatConfig): ChatConfig {
  return {
    settings: config.settings,
    catalog: {
      categories: config.catalog.categories.map((category) => ({ ...category, keywords: [] })),
      services: config.catalog.services.map((service) => ({ ...service, keywords: [] })),
    },
  };
}
