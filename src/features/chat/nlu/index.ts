import type {
  ChatConfig,
  NluResult,
  UnderstandRequest,
} from "@/features/chat/core/types";
import { isAiConfigured, understandWithAi } from "@/features/chat/nlu/ai";
import { understandWithRules } from "@/features/chat/nlu/rules";

/** Rules first; the AI reader only for messages the rules couldn't place. */
function needsAi(request: UnderstandRequest, rules: NluResult) {
  if (rules.intent === "crisis" || rules.intent === "emergency") return false;
  if (rules.intent === "unknown") return true;

  // Waiting for a specific answer that the rules couldn't find in the message.
  const awaiting = request.awaiting;

  return (
    rules.intent === "provide_info" &&
    Boolean(awaiting) &&
    awaiting !== "review" &&
    awaiting !== "inquiry" &&
    !(awaiting! in rules.entities) &&
    !Object.keys(rules.issues).length
  );
}

export async function understandMessage(
  request: UnderstandRequest,
  config: ChatConfig,
  nowMs: number
): Promise<NluResult> {
  const rules = understandWithRules(request, config, nowMs);

  if (!isAiConfigured() || !needsAi(request, rules)) return rules;

  const ai = await understandWithAi(request, config, nowMs);

  if (!ai || ai.intent === "unknown") return rules;

  return {
    ...ai,
    // Deterministic readings (phone numbers, exact dates) take precedence.
    entities: { ...ai.entities, ...rules.entities },
    issues: rules.issues,
  };
}
