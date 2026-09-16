import intentsJson from "@/data/chat/intents.json";
import type { ChatField, IntentId } from "@/features/chat/core/types";
import { toTokens } from "@/features/chat/nlu/text";

/**
 * src/data/chat/intents.json, pre-tokenised once per server process.
 */

export type Phrase = { text: string; tokens: string[] };

type RawLexicon = typeof intentsJson;

function phrases(list: string[]): Phrase[] {
  return list
    .map((text) => ({ text, tokens: toTokens(text) }))
    .filter((phrase) => phrase.tokens.length > 0)
    // Longest first, so "day after tomorrow" wins over "tomorrow".
    .sort((a, b) => b.tokens.length - a.tokens.length);
}

function phraseMap<Key extends string>(source: Record<string, string[]>) {
  return Object.fromEntries(
    Object.entries(source).map(([key, list]) => [key, phrases(list)])
  ) as Record<Key, Phrase[]>;
}

function buildLexicon(raw: RawLexicon) {
  return {
    intents: phraseMap<Exclude<IntentId, "edit_field" | "provide_info" | "unknown">>(raw.intents),
    fields: phraseMap<ChatField>(raw.fields),
    editVerbs: phrases(raw.editVerbs),
    consultationTypes: phraseMap<"clinic" | "video" | "audio">(raw.consultationTypes),
    timeOfDay: phraseMap<string>(raw.timeOfDay),
    relativeDates: phraseMap<"today" | "tomorrow" | "dayAfterTomorrow">(raw.relativeDates),
    weekdays: raw.weekdays.map((names) => names.map((name) => name.toLowerCase())),
    months: raw.months.map((names) => names.map((name) => name.toLowerCase())),
    notNames: new Set(raw.notNames.map((word) => word.toLowerCase())),
    notNameLeadWords: new Set(raw.notNameLeadWords.map((word) => word.toLowerCase())),
  };
}

export type Lexicon = ReturnType<typeof buildLexicon>;

export const lexicon: Lexicon = buildLexicon(intentsJson);
