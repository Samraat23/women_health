import { getClinicNow } from "@/features/chat/core/dates";
import type {
  ChatConfig,
  IntentId,
  NluEntities,
  NluIssues,
  NluResult,
  UnderstandRequest,
} from "@/features/chat/core/types";
import {
  extractAge,
  extractConsultationType,
  extractDate,
  extractEditField,
  extractName,
  extractPhone,
  extractTimeSlot,
  extractTopic,
  findPhrase,
  hasEditVerb,
} from "@/features/chat/nlu/entities";
import { lexicon } from "@/features/chat/nlu/lexicon";
import { normalizeMessage, toMatchText } from "@/features/chat/nlu/text";

/**
 * Deterministic understanding: fast, free, and predictable. The optional AI
 * reader is only consulted when this can't make sense of a message.
 */

type LexiconIntent = keyof typeof lexicon.intents;

// Higher wins when two intents match equally long phrases.
const weights: Record<LexiconIntent, number> = {
  crisis: 100,
  emergency: 90,
  cancel: 30,
  restart: 30,
  menu: 28,
  fees: 25,
  clinic_location: 25,
  clinic_timings: 25,
  medical_advice: 24,
  clinic_contact: 22,
  start_booking: 20,
  about_doctor: 18,
  human_handoff: 18,
  explore_services: 15,
  service_info: 12,
  start_inquiry: 10,
  affirm: 8,
  deny: 8,
  thanks: 6,
  greeting: 5,
};

// Short replies only count when they are most of the message: "no" is a
// refusal, "no periods for 3 months" is not.
const strictCommands = new Set<LexiconIntent>(["menu", "restart", "cancel", "deny"]);
const softCommands = new Set<LexiconIntent>(["greeting", "thanks", "affirm"]);

const contentIntents = new Set<IntentId>([
  "fees",
  "clinic_location",
  "clinic_timings",
  "clinic_contact",
  "about_doctor",
  "medical_advice",
  "service_info",
]);

type Candidate = { intent: LexiconIntent; score: number; coverage: number; length: number };

const negations = new Set(["not", "no", "dont", "didnt", "isnt", "nahi", "nahin", "mat", "never"]);

function scoreIntents(match: ReturnType<typeof toMatchText>) {
  const candidates: Candidate[] = [];
  const negated = match.tokens.some((token) => negations.has(token));

  for (const [intent, list] of Object.entries(lexicon.intents) as [LexiconIntent, typeof lexicon.intents.greeting][]) {
    const phrase = findPhrase(match, list);

    if (!phrase) continue;

    const coverage = phrase.tokens.length / Math.max(1, match.tokens.length);

    if (strictCommands.has(intent) && coverage < 0.75) continue;
    if (softCommands.has(intent) && coverage < 0.5) continue;
    // "not sure" or "nahi, theek nahi hai" must never count as a yes — on the review card it would send the request.
    if (intent === "affirm" && negated) continue;

    candidates.push({
      intent,
      score: phrase.tokens.length * 10 + weights[intent],
      coverage,
      length: phrase.tokens.length,
    });
  }

  return candidates.sort((a, b) => b.score - a.score);
}

export function understandWithRules(request: UnderstandRequest, config: ChatConfig, nowMs: number): NluResult {
  const raw = request.text.slice(0, 1000);
  const norm = normalizeMessage(raw);
  const match = toMatchText(raw);
  const awaiting = request.awaiting ?? null;
  const now = getClinicNow(config.settings.availability.timeZone, nowMs);
  const entities: NluEntities = {};
  const issues: NluIssues = {};

  const phone = extractPhone(raw);

  if (phone.phone) entities.phone = phone.phone;
  else if (awaiting === "phone" && (phone.issue || (raw.match(/\d/g)?.length ?? 0) >= 5)) issues.phone = "invalid";

  const age = extractAge(norm, awaiting, config);

  if (age.age !== undefined) entities.age = age.age;
  else if (age.issue && awaiting === "age") issues.age = age.issue;

  const date = extractDate(norm, match, config, now, awaiting);

  if (date.date) entities.date = date.date;
  else if (date.issue) issues.date = date.issue;

  const time = extractTimeSlot(norm, match, config, awaiting);

  if (time.timeSlotId) entities.timeSlotId = time.timeSlotId;
  else if (time.issue) issues.timeSlotId = time.issue;

  const consultationType = extractConsultationType(match);

  if (consultationType) entities.consultationType = consultationType;

  const topic = extractTopic(match, config, { includeBookingOnly: awaiting === "serviceId" });

  if (topic.topicId) entities.serviceId = topic.topicId;
  if (topic.caution) entities.caution = true;

  const patientName = extractName(raw, awaiting);

  if (patientName) entities.patientName = patientName;

  const candidates = scoreIntents(match);
  const has = (intent: LexiconIntent) => candidates.some((candidate) => candidate.intent === intent);
  let best = candidates[0];
  let intent: IntentId | undefined = best?.intent;

  if (has("crisis")) {
    intent = "crisis";
  } else if (has("emergency")) {
    intent = "emergency";
  } else if (best) {
    // "I have a question about fees" is about fees.
    if (intent === "start_inquiry") {
      const specific = candidates.find((candidate) => contentIntents.has(candidate.intent));

      if (specific) {
        best = specific;
        intent = specific.intent;
      }
    }

    // "Tell me about PCOS" is about the service, not the doctor.
    if (entities.serviceId && intent === "about_doctor" && has("service_info")) intent = "service_info";

    // "Is tomorrow evening available?" is a booking.
    if (intent === "clinic_timings" && (entities.date || entities.timeSlotId)) intent = "start_booking";
  }

  // Mid-request, "change my number" or "actually make it evening" edits an answer.
  const field = awaiting ? extractEditField(match) : undefined;
  const flowEntities = Boolean(
    entities.date || entities.timeSlotId || entities.consultationType || entities.phone || entities.age
  );

  if (awaiting && intent !== "crisis" && intent !== "emergency" && hasEditVerb(match) && (field || flowEntities)) {
    intent = "edit_field";
    if (field) entities.field = field;
  }

  // A name alone ("Kusum Sharma") while we're asking for one is an answer, not a question.
  if (awaiting === "patientName" && entities.patientName && intent === "about_doctor") intent = undefined;

  const hasEntities = Object.keys(entities).some((key) => key !== "caution");

  if (!intent) {
    return {
      intent: hasEntities ? "provide_info" : "unknown",
      confidence: hasEntities ? 0.7 : 0.2,
      entities,
      issues,
      source: "rules",
    };
  }

  const confidence =
    intent === "edit_field" ? 0.85 : !best ? 0.7 : best.coverage >= 0.6 ? 0.95 : best.length >= 2 ? 0.85 : 0.75;

  return { intent, confidence, entities, issues, source: "rules" };
}
