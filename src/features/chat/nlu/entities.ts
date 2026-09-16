import {
  addDays,
  getDateIssue,
  parseIsoDate,
  type ClinicNow,
} from "@/features/chat/core/dates";
import type {
  ChatConfig,
  ChatField,
  ConsultationTypeId,
  NluIssues,
} from "@/features/chat/core/types";
import { normalizeIndianMobile, validatePatientName } from "@/features/chat/core/validation";
import { lexicon, type Phrase } from "@/features/chat/nlu/lexicon";
import {
  allowedTypos,
  containsPhrase,
  editDistance,
  toTokens,
  type MatchText,
} from "@/features/chat/nlu/text";

type Awaiting = ChatField | "review" | null;

export function findPhrase(match: MatchText, list: Phrase[]) {
  // Lists are sorted longest-first, so the most specific phrase wins.
  return list.find((phrase) => containsPhrase(match, phrase.tokens)) ?? null;
}

// ---------------------------------------------------------------------------
// Mobile number
// ---------------------------------------------------------------------------

// 98765 43210 · +91-9876543210 · 09876543210 · 987 654 3210
const mobilePattern =
  /(?<![\d+])(?:\+?91[\s-]?|0)?[6-9](?:\d{9}|\d{4}[\s-]\d{5}|\d{2}[\s-]\d{3}[\s-]\d{4})(?!\d)/g;
const digitRunPattern = /\+?\d[\d\s-]{6,}\d/g;
const numericDatePattern = /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/;

export function stripMobileNumbers(text: string, replacement = " ") {
  return text.replace(mobilePattern, replacement);
}

export function extractPhone(raw: string): { phone?: string; issue?: "invalid" } {
  for (const candidate of raw.match(mobilePattern) ?? []) {
    const phone = normalizeIndianMobile(candidate);

    if (phone) return { phone };
  }

  const attempted = (raw.match(digitRunPattern) ?? []).some((run) => {
    const digits = run.replace(/\D/g, "").length;

    return digits >= 8 && digits <= 13 && !numericDatePattern.test(run.trim());
  });

  return attempted ? { issue: "invalid" } : {};
}

// ---------------------------------------------------------------------------
// Age
// ---------------------------------------------------------------------------

const agePatterns = [
  /\b(?:age|aged|umar|umr)\s*(?:is|of|to|:|-)?\s*(\d{1,3})\b/,
  // "29 years", but not "trying for 2 years"
  /(?<!\b(?:for|since|past|last|from|over|in|within|after|before)\s)\b(\d{1,3})\s*(?:years?|yrs?|yr|yo|saal|sal)\b/,
  /\b(?:i am|im|she is|shes|he is|hes|patient is)\s+(\d{1,3})\b(?!\s*(?:am|pm|weeks?|months?|days?|kgs?|cm|th|st|nd|rd|:))/,
];

export function extractAge(
  norm: string,
  awaiting: Awaiting,
  config: ChatConfig
): { age?: number; issue?: "invalid" } {
  const { minAge, maxAge } = config.settings.appointment;
  const bare =
    awaiting === "age"
      ? /^(?:about|around|approx|approximately)?\s*(\d{1,3})\s*(?:years?|yrs?|yr|saal)?(?:\s*old)?$/.exec(norm)
      : null;
  const match = bare ?? agePatterns.map((pattern) => pattern.exec(norm)).find(Boolean);

  if (!match) return {};

  const age = Number(match[1]);

  return age >= minAge && age <= maxAge ? { age } : { issue: "invalid" };
}

// ---------------------------------------------------------------------------
// Consultation type
// ---------------------------------------------------------------------------

export function extractConsultationType(match: MatchText): ConsultationTypeId | undefined {
  let best: { id: ConsultationTypeId; length: number } | null = null;

  for (const [id, list] of Object.entries(lexicon.consultationTypes)) {
    const phrase = findPhrase(match, list);

    if (phrase && (!best || phrase.tokens.length > best.length)) {
      best = { id: id as ConsultationTypeId, length: phrase.tokens.length };
    }
  }

  return best?.id;
}

// ---------------------------------------------------------------------------
// Time of day
// ---------------------------------------------------------------------------

export function extractTimeSlot(
  norm: string,
  match: MatchText,
  config: ChatConfig,
  awaiting: Awaiting
): { timeSlotId?: string; issue?: "outside_hours" } {
  const slots = config.settings.availability.timeSlots;
  const clock =
    /\b(\d{1,2})(?:[:.](\d{2}))?\s*(a\.?\s?m\.?|p\.?\s?m\.?|baje)(?![a-z])/.exec(norm) ??
    (awaiting === "timeSlotId"
      ? /^(?:at|around|by|after|about)?\s*(\d{1,2})(?:[:.](\d{2}))?\s*(?:oclock|o clock)?$/.exec(norm)
      : null);

  if (clock) {
    let hour = Number(clock[1]);
    const suffix = clock[3]?.charAt(0);

    if (hour <= 23) {
      if (suffix === "p") hour = (hour % 12) + 12;
      else if (suffix === "a") hour %= 12;
      // "at 5" or "5 baje" during clinic hours means the evening, not 5 AM.
      else if (hour >= 1 && hour <= 7) hour += 12;

      const slot = slots.find((item) => hour >= item.startHour && hour < item.endHour);

      return slot ? { timeSlotId: slot.id } : { issue: "outside_hours" };
    }
  }

  for (const [slotId, list] of Object.entries(lexicon.timeOfDay)) {
    if (slots.some((slot) => slot.id === slotId) && findPhrase(match, list)) {
      return { timeSlotId: slotId };
    }
  }

  return {};
}

// ---------------------------------------------------------------------------
// Date
// ---------------------------------------------------------------------------

const pad = (value: number) => String(value).padStart(2, "0");

function isoFrom(year: number, month: number, day: number) {
  const iso = `${year}-${pad(month)}-${pad(day)}`;

  return parseIsoDate(iso) ? iso : "invalid";
}

/** The next time this month/day comes round, starting today. */
function upcoming(now: ClinicNow, month: number, day: number) {
  const year = Number(now.date.slice(0, 4));
  const thisYear = isoFrom(year, month, day);

  if (thisYear === "invalid") return isoFrom(year + 1, month, day);

  return thisYear >= now.date ? thisYear : isoFrom(year + 1, month, day);
}

/** The next time this day of the month comes round, starting today. */
function upcomingDay(now: ClinicNow, day: number) {
  const [year, month, today] = now.date.split("-").map(Number);

  if (day >= today) {
    const thisMonth = isoFrom(year, month, day);

    if (thisMonth !== "invalid") return thisMonth;
  }

  return month === 12 ? isoFrom(year + 1, 1, day) : isoFrom(year, month + 1, day);
}

function monthNumber(name: string) {
  return lexicon.months.findIndex((names) => names.includes(name)) + 1;
}

const monthAlternation = lexicon.months
  .flat()
  .sort((a, b) => b.length - a.length)
  .join("|");
const dayMonthPattern = new RegExp(
  String.raw`\b(\d{1,2})(?:st|nd|rd|th)?\s*(?:of\s+)?(${monthAlternation})\b(?:,?\s*(\d{4}))?`
);
const monthDayPattern = new RegExp(
  String.raw`\b(${monthAlternation})\s+(\d{1,2})(?:st|nd|rd|th)?\b(?:,?\s*(\d{4}))?`
);

function findDate(norm: string, match: MatchText, now: ClinicNow, awaiting: Awaiting): string | null {
  let found = /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/.exec(norm);

  if (found) return isoFrom(Number(found[1]), Number(found[2]), Number(found[3]));

  // Day first, as written in India: 25/09, 25-09-2026, 25.09.2026
  found =
    /(?<![\d:.])(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?(?![\d:])/.exec(norm) ??
    /(?<![\d:.])(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?![\d:])/.exec(norm);

  if (found) {
    const [day, month] = [Number(found[1]), Number(found[2])];

    if (month < 1 || month > 12) return "invalid";
    if (!found[3]) return upcoming(now, month, day);

    const year = Number(found[3]);

    return isoFrom(year < 100 ? 2000 + year : year, month, day);
  }

  found = dayMonthPattern.exec(norm);

  if (found) {
    const [day, month] = [Number(found[1]), monthNumber(found[2])];

    return found[3] ? isoFrom(Number(found[3]), month, day) : upcoming(now, month, day);
  }

  found = monthDayPattern.exec(norm);

  if (found) {
    const [month, day] = [monthNumber(found[1]), Number(found[2])];

    return found[3] ? isoFrom(Number(found[3]), month, day) : upcoming(now, month, day);
  }

  if (findPhrase(match, lexicon.relativeDates.dayAfterTomorrow)) return addDays(now.date, 2);
  if (findPhrase(match, lexicon.relativeDates.tomorrow)) return addDays(now.date, 1);
  if (findPhrase(match, lexicon.relativeDates.today)) return now.date;

  found = /\b(?:in|after)\s+(\d{1,2})\s+days?\b/.exec(norm);

  if (found) return addDays(now.date, Number(found[1]));

  const todayWeekday = parseIsoDate(now.date)?.weekday ?? 0;

  for (let weekday = 0; weekday < 7; weekday += 1) {
    for (const name of lexicon.weekdays[weekday]) {
      const index = match.tokens.indexOf(name);

      if (index === -1) continue;

      const previous = match.tokens[index - 1];
      const qualified = ["on", "next", "this", "coming"].includes(previous ?? "");

      // "sat", "sun", "wed" are ordinary words unless we're asking for a date.
      if (name.length <= 3 && !qualified && awaiting !== "date") continue;

      const offset = (weekday - todayWeekday + 7) % 7;

      return addDays(now.date, previous === "next" && offset === 0 ? 7 : offset);
    }
  }

  found = /\b(?:on\s+)?(?:the\s+)?(\d{1,2})(?:st|nd|rd|th)\b/.exec(norm);

  if (found) return upcomingDay(now, Number(found[1]));

  if (awaiting === "date") {
    found = /^(\d{1,2})$/.exec(norm);

    if (found) return upcomingDay(now, Number(found[1]));
  }

  return null;
}

export function extractDate(
  norm: string,
  match: MatchText,
  config: ChatConfig,
  now: ClinicNow,
  awaiting: Awaiting
): { date?: string; issue?: NluIssues["date"] } {
  const candidate = findDate(norm, match, now, awaiting);

  if (!candidate) return {};
  if (candidate === "invalid") return { issue: "invalid" };

  const issue = getDateIssue(candidate, config.settings.availability, now);

  return issue ? { issue } : { date: candidate };
}

// ---------------------------------------------------------------------------
// Service or category
// ---------------------------------------------------------------------------

// Real words that sit one typo away from a service keyword.
const neverFuzzy = new Set([
  "breath", "breathe", "injection", "injections", "discharged", "question", "questions",
  "direction", "directions", "section", "session", "pension", "affection", "detection",
]);

type TopicKeywords = { id: string; bonus: number; caution: boolean; bookingOnly: boolean; keywords: string[][] };

const keywordCache = new WeakMap<ChatConfig["catalog"], TopicKeywords[]>();

function getTopicKeywords(catalog: ChatConfig["catalog"]) {
  let cached = keywordCache.get(catalog);

  if (!cached) {
    cached = [
      ...catalog.services.map((service) => ({
        id: service.id,
        // A named service is more specific than its category.
        bonus: 3,
        caution: Boolean(service.caution),
        bookingOnly: Boolean(service.bookingOnly),
        keywords: [service.title, service.shortTitle ?? "", ...service.keywords].map(toTokens),
      })),
      ...catalog.categories.map((category) => ({
        id: category.id,
        bonus: 0,
        caution: false,
        bookingOnly: false,
        keywords: [category.title, ...category.keywords].map(toTokens),
      })),
    ];
    keywordCache.set(catalog, cached);
  }

  return cached;
}

export function extractTopic(
  match: MatchText,
  config: ChatConfig,
  options: { includeBookingOnly: boolean }
): { topicId?: string; caution?: boolean } {
  let best: { id: string; score: number; caution: boolean } | null = null;

  for (const topic of getTopicKeywords(config.catalog)) {
    if (topic.bookingOnly && !options.includeBookingOnly) continue;

    for (const keyword of topic.keywords) {
      let score = 0;

      if (containsPhrase(match, keyword)) {
        score = 100 + keyword.length * 10 + topic.bonus;
      } else if (keyword.length === 1 && keyword[0].length >= 5) {
        const limit = allowedTypos(keyword[0].length);

        for (const token of match.tokens) {
          if (token.length < 5 || neverFuzzy.has(token)) continue;

          const distance = editDistance(token, keyword[0], limit);

          if (distance > 0 && distance <= limit) {
            score = Math.max(score, 60 - distance * 10 + topic.bonus);
          }
        }
      }

      if (score && (!best || score > best.score)) {
        best = { id: topic.id, score, caution: topic.caution };
      }
    }
  }

  return best ? { topicId: best.id, caution: best.caution || undefined } : {};
}

// ---------------------------------------------------------------------------
// Name
// ---------------------------------------------------------------------------

const nameStopWords = new Set([
  "and", "age", "aged", "years", "year", "phone", "number", "mobile", "my", "is", "from", "hai",
  "here", "speaking", "ji", "with", "for", "the", "contact",
]);

function cleanName(fragment: string) {
  const taken: string[] = [];

  for (const word of fragment.split(/[\s,;/]+/)) {
    const bare = word.replace(/^[.'’-]+|[.,'’-]+$/g, "");

    if (!bare) continue;
    if (/\d/.test(bare) || !/^[\p{L}\p{M}][\p{L}\p{M}'’.-]*$/u.test(bare)) break;
    if (nameStopWords.has(bare.toLowerCase())) break;

    taken.push(bare);

    if (taken.length === 4) break;
  }

  const lead = taken[0]?.toLowerCase();

  if (!lead || lexicon.notNames.has(lead) || lexicon.notNameLeadWords.has(lead)) return undefined;

  const result = validatePatientName(taken.join(" "));

  return result.ok ? result.value : undefined;
}

export function extractName(raw: string, awaiting: Awaiting) {
  const text = raw.normalize("NFKC").replace(/\s+/g, " ").trim();
  const stated =
    /\b(?:my name is|my names|my name's|name is|mera naam|mera nam|naam hai|patient(?:'s|s)? name is|patient name|her name is|his name is|name\s*[:=-])\s*(.+)$/iu.exec(
      text
    ) ?? /^(.+?)\s+is my name\b/iu.exec(text);

  if (stated) return cleanName(stated[1]);

  // "I'm Priya" — only when the next word looks like a name, not "I'm pregnant".
  // Outside the name question, also require a capital letter, as people write names.
  const introduced =
    /^(?:(?:hi|hello|hey|namaste)[\s,!.]+)?(?:i am|i'm|i’m|im|this is|it's|it’s|its)\s+(.+)$/iu.exec(text);
  const looksIntroduced =
    introduced &&
    (awaiting === "patientName" || (/^(?:(?:hi|hello|hey|namaste)[\s,!.]+)?(?:i am|i'm|i’m)\s/iu.test(text) && /^\p{Lu}/u.test(introduced[1])));

  if (introduced && looksIntroduced) return cleanName(introduced[1]);

  if (awaiting !== "patientName" || text.includes("?")) return undefined;

  // A reply to "May I have the patient's name?" is usually just the name.
  const rest = stripMobileNumbers(text)
    .replace(/\b\d{1,3}\s*(?:years?|yrs?|yr|saal)?(?:\s*old)?\b/gi, " ")
    .replace(/[,;:!]+/g, " ")
    .trim();
  const words = rest.split(/\s+/).filter(Boolean);

  if (!words.length || words.length > 5) return undefined;
  if (words.some((word) => lexicon.notNames.has(word.toLowerCase()))) return undefined;

  return cleanName(rest);
}

// ---------------------------------------------------------------------------
// Which answer the patient wants to change
// ---------------------------------------------------------------------------

export function hasEditVerb(match: MatchText) {
  return Boolean(findPhrase(match, lexicon.editVerbs));
}

export function extractEditField(match: MatchText): ChatField | undefined {
  if (!hasEditVerb(match)) return undefined;

  for (const [field, list] of Object.entries(lexicon.fields)) {
    if (findPhrase(match, list)) return field as ChatField;
  }

  return undefined;
}
