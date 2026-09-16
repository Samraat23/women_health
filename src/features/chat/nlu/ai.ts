import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import { formatLongDate, getClinicNow } from "@/features/chat/core/dates";
import type {
  ChatConfig,
  ChatField,
  IntentId,
  NluEntities,
  NluResult,
  UnderstandRequest,
} from "@/features/chat/core/types";
import { validateChatField } from "@/features/chat/core/validation";
import { stripMobileNumbers } from "@/features/chat/nlu/entities";

/**
 * Optional AI reading of messages the rules engine couldn't place.
 *
 * Claude only classifies: it returns an intent and entity values, never text
 * for the patient. Replies still come from the site's own content, and every
 * value is re-checked with the same validators as a typed answer.
 *
 * Enabled when ANTHROPIC_API_KEY is set (and CHAT_AI_ENABLED isn't "false").
 */

const requestTimeoutMs = 9000;

const intents = [
  "crisis",
  "emergency",
  "greeting",
  "thanks",
  "affirm",
  "deny",
  "restart",
  "menu",
  "cancel",
  "start_booking",
  "start_inquiry",
  "explore_services",
  "service_info",
  "clinic_location",
  "clinic_contact",
  "clinic_timings",
  "fees",
  "about_doctor",
  "human_handoff",
  "medical_advice",
  "edit_field",
  "provide_info",
  "unknown",
] as const satisfies readonly IntentId[];

const fields = [
  "serviceId",
  "consultationType",
  "date",
  "timeSlotId",
  "patientName",
  "age",
  "phone",
  "inquiry",
] as const satisfies readonly ChatField[];

const AiReading = z.object({
  intent: z.enum(intents),
  serviceId: z.string().nullable(),
  consultationType: z.enum(["clinic", "video", "audio"]).nullable(),
  date: z.string().nullable(),
  timeSlotId: z.string().nullable(),
  patientName: z.string().nullable(),
  age: z.number().int().nullable(),
  field: z.enum(fields).nullable(),
});

type AiReadingValue = z.infer<typeof AiReading>;

let client: Anthropic | null = null;

export function isAiConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY) && process.env.CHAT_AI_ENABLED !== "false";
}

function getClient() {
  client ??= new Anthropic({ maxRetries: 0, timeout: requestTimeoutMs });

  return client;
}

const systemPromptCache = new WeakMap<ChatConfig, string>();

function getSystemPrompt(config: ChatConfig) {
  const cached = systemPromptCache.get(config);

  if (cached) return cached;

  const { settings, catalog } = config;
  const services = catalog.services
    .map((service) => `- ${service.id}: ${service.title}`)
    .join("\n");
  const categories = catalog.categories
    .map((category) => `- ${category.id}: ${category.title}`)
    .join("\n");
  const slots = settings.availability.timeSlots
    .map((slot) => `- ${slot.id}: ${slot.label}, ${slot.range}`)
    .join("\n");

  const prompt = `You read messages that patients type into the website chat of ${settings.clinic.name}, the gynecology clinic of ${settings.doctor.name} in Gurgaon, India. The chat books appointments and forwards questions to the clinic. You never reply to the patient: you only return structured data describing what the message means. Patients often write in English, Hindi or Hinglish, with typos.

Intents:
- crisis: thoughts of suicide or self-harm.
- emergency: urgent symptoms needing immediate care (heavy ongoing bleeding, severe pain, fainting, labour signs, reduced baby movement).
- start_booking: wants an appointment or consultation. start_inquiry: wants to send a question to the clinic. explore_services: wants to see what the clinic treats.
- service_info: wants to know about a condition or treatment the clinic offers. medical_advice: asks for a diagnosis, medicine, dose or whether a symptom is normal.
- clinic_location, clinic_contact, clinic_timings, fees, about_doctor, human_handoff (wants a real person or WhatsApp): questions about the clinic.
- greeting, thanks, affirm (yes / confirm), deny (no), cancel, restart, menu.
- edit_field: wants to change an answer already given; set "field" to which one.
- provide_info: the message only supplies details, such as a name, date or time.
- unknown: none of the above.

Services (use these ids for serviceId):
${services}

Categories (also valid for serviceId when no single service fits):
${categories}

Time slots (timeSlotId):
${slots}

Consultation types: clinic (in-person visit), video, audio (phone call).

Extraction rules:
- Leave a value null unless the message states it. Don't infer a service from a symptom unless the symptom clearly names that service.
- date: YYYY-MM-DD on the clinic's calendar, resolving words like "tomorrow", "kal", "parso" or "next Friday" from the date given with the message.
- timeSlotId: the slot containing the time the patient asks for.
- patientName: only a person's name the patient gives for the appointment.
- age: whole years, only when stated.`;

  systemPromptCache.set(config, prompt);

  return prompt;
}

function toResult(reading: AiReadingValue, config: ChatConfig, request: UnderstandRequest, nowMs: number): NluResult {
  const now = getClinicNow(config.settings.availability.timeZone, nowMs);
  const entities: NluEntities = {};
  const accept = (field: ChatField, value: string | number | null) => {
    if (value === null || value === "") return;

    const result = validateChatField(field, value, config, { date: entities.date, now });

    if (result.ok) Object.assign(entities, { [field]: result.value });
  };

  accept("serviceId", reading.serviceId);
  accept("consultationType", reading.consultationType);
  accept("date", reading.date);
  accept("timeSlotId", reading.timeSlotId);
  accept("age", reading.age);

  // Only trust a bare name while the chat is actually asking for one.
  if (request.awaiting === "patientName" || reading.intent === "provide_info") {
    accept("patientName", reading.patientName);
  }

  if (reading.field) entities.field = reading.field;

  return {
    intent: reading.intent,
    confidence: reading.intent === "unknown" ? 0.3 : 0.8,
    entities,
    issues: {},
    source: "ai",
  };
}

export async function understandWithAi(
  request: UnderstandRequest,
  config: ChatConfig,
  nowMs: number
): Promise<NluResult | null> {
  if (!isAiConfigured()) return null;

  const now = getClinicNow(config.settings.availability.timeZone, nowMs);
  const awaiting = request.awaiting
    ? `The chat is currently waiting for: ${request.awaiting}${request.flow ? ` (${request.flow} request)` : ""}.`
    : "No request is in progress.";

  try {
    const response = await getClient().beta.messages.parse({
      model: process.env.CHAT_AI_MODEL || "claude-opus-5",
      max_tokens: 4096,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: getSystemPrompt(config), cache_control: { type: "ephemeral" } }],
      output_config: { effort: "low", format: betaZodOutputFormat(AiReading) },
      messages: [
        {
          role: "user",
          content: [
            `Today at the clinic: ${formatLongDate(now.date)} (${now.date}), ${String(now.hour).padStart(2, "0")}:${String(now.minute).padStart(2, "0")}.`,
            awaiting,
            "Patient message:",
            // Mobile numbers are read by the rules engine; they never leave the server.
            `<message>${stripMobileNumbers(request.text, "[mobile number]")}</message>`,
          ].join("\n"),
        },
      ],
    });

    if (response.stop_reason === "refusal" || response.stop_reason === "max_tokens" || !response.parsed_output) {
      return null;
    }

    return toResult(response.parsed_output, config, request, nowMs);
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.warn("[chat] AI understanding rate limited; using rules only.");
    } else if (error instanceof Anthropic.APIError) {
      console.warn(`[chat] AI understanding failed with status ${error.status}; using rules only.`);
    } else {
      console.warn("[chat] AI understanding unavailable; using rules only.");
    }

    return null;
  }
}
