import {
  fillTemplate,
  getCategory,
  getFirstName,
  getTimeSlot,
  getTopic,
  getTopicLabel,
  isKnownTopic,
} from "@/features/chat/core/catalog";
import {
  describeDateIssue,
  formatShortDate,
  getDateIssue,
  isSlotClosed,
  parseIsoDate,
  type ClinicNow,
} from "@/features/chat/core/dates";
import {
  buildSubmission,
  clinicNow,
  describeFieldValue,
  getFieldOrder,
  getFieldValue,
  getQuestion,
} from "@/features/chat/core/prompts";
import {
  chatStateVersion,
  type ChatEvent,
  type ChatMessage,
  type ChatState,
  type FlowState,
  type IdleSuggestions,
} from "@/features/chat/core/state";
import type {
  ChatConfig,
  ChatField,
  ConsultationTypeId,
  IntentId,
  NluEntities,
  NluResult,
  RequestKind,
  SubmitSuccess,
} from "@/features/chat/core/types";
import {
  normalizeIndianMobile,
  validateChatField,
  validateConcern,
  validateInquiry,
  validatePatientName,
} from "@/features/chat/core/validation";

/**
 * The conversation as a pure reducer: (state, event) -> state. It never calls
 * the network; the provider asks /api/chat/understand for meaning and
 * /api/chat/requests to send, then feeds the answers back in as events.
 */

type Ctx = { config: ChatConfig; nowMs: number; now: ClinicNow };

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type NewMessage = DistributiveOmit<ChatMessage, "id" | "at">;
type TextOptions = { tone?: "default" | "note" | "warning" | "danger"; link?: { label: string; href: string } };

const identityFields: ChatField[] = ["patientName", "age", "phone"];
// Date comes before time so a new date is in place when the time is checked.
const entityFields: ChatField[] = [
  "serviceId",
  "consultationType",
  "date",
  "timeSlotId",
  "patientName",
  "age",
  "phone",
];
const informationalIntents: IntentId[] = [
  "clinic_location",
  "clinic_contact",
  "clinic_timings",
  "fees",
  "about_doctor",
  "human_handoff",
  "medical_advice",
  "service_info",
  "greeting",
  "thanks",
];

const fieldNames: Record<ChatField, string> = {
  serviceId: "consultation topic",
  consultationType: "consultation type",
  date: "date",
  timeSlotId: "time",
  patientName: "name",
  age: "age",
  phone: "mobile number",
  inquiry: "question",
};

// ---------------------------------------------------------------------------
// Message helpers
// ---------------------------------------------------------------------------

function push(state: ChatState, ctx: Ctx, message: NewMessage): ChatState {
  const counter = state.counter + 1;

  return {
    ...state,
    counter,
    messages: [...state.messages, { ...message, id: `m${counter}`, at: ctx.nowMs } as ChatMessage],
  };
}

function say(state: ChatState, ctx: Ctx, text: string, options: TextOptions = {}) {
  return push(state, ctx, { role: "bot", type: "text", text, ...options });
}

function echo(state: ChatState, ctx: Ctx, text: string) {
  return push(state, ctx, { role: "user", type: "text", text });
}

function lastMessageId(state: ChatState) {
  return state.messages[state.messages.length - 1]?.id;
}

function withIdle(state: ChatState, idle: IdleSuggestions): ChatState {
  return { ...state, idle };
}

function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function flowLabel(kind: RequestKind) {
  return kind === "appointment" ? "appointment request" : "question";
}

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const value = hour % 12 === 0 ? 12 : hour % 12;

  return `${value} ${suffix}`;
}

// ---------------------------------------------------------------------------
// State setup
// ---------------------------------------------------------------------------

function emptyState(): ChatState {
  return {
    version: chatStateVersion,
    counter: 0,
    messages: [],
    patient: {},
    draft: {},
    flow: null,
    idle: { kind: "none" },
    status: "idle",
  };
}

export function createInitialState(config: ChatConfig, nowMs: number, contextTopicId?: string | null) {
  const ctx: Ctx = { config, nowMs, now: clinicNow(config, nowMs) };
  const { copy } = config.settings;
  let state = emptyState();

  state = say(state, ctx, copy.welcomeTitle);
  state = say(state, ctx, copy.welcomeBody);
  state = push(state, ctx, { role: "bot", type: "menu" });

  if (contextTopicId && isKnownTopic(config.catalog, contextTopicId)) {
    state = say(
      state,
      ctx,
      fillTemplate(copy.contextNudge, { service: getTopicLabel(config.catalog, contextTopicId) })
    );
    state = withIdle(state, { kind: "context", topicId: contextTopicId });
  }

  return state;
}

/** Accepts a stored conversation only if it still matches the current shape. */
export function restoreState(raw: unknown): ChatState | null {
  if (!raw || typeof raw !== "object") return null;

  const state = raw as Partial<ChatState>;

  if (
    state.version !== chatStateVersion ||
    !Array.isArray(state.messages) ||
    typeof state.counter !== "number" ||
    !state.patient ||
    !state.draft ||
    !state.idle
  ) {
    return null;
  }

  // A reload mid-request can't know how it ended; let the patient retry.
  return { ...(state as ChatState), status: "idle" };
}

// ---------------------------------------------------------------------------
// Reading and writing answers
// ---------------------------------------------------------------------------

function isMissing(state: ChatState, field: ChatField) {
  const value = getFieldValue(state, field);

  return value === undefined || value === "";
}

function setField(state: ChatState, ctx: Ctx, field: ChatField, value: string | number): ChatState {
  if (identityFields.includes(field)) {
    return { ...state, patient: { ...state.patient, [field]: value } };
  }

  const draft = { ...state.draft, [field]: value };

  if (field === "serviceId" && value !== ctx.config.settings.appointment.generalServiceId) {
    draft.concern = undefined;
  }

  if (field === "date" && draft.timeSlotId) {
    const slot = getTimeSlot(ctx.config, draft.timeSlotId);

    if (!slot || isSlotClosed(slot, String(value), ctx.now)) draft.timeSlotId = undefined;
  }

  return { ...state, draft };
}

function clearField(state: ChatState, field: ChatField): ChatState {
  if (identityFields.includes(field)) {
    return { ...state, patient: { ...state.patient, [field]: undefined } };
  }

  return { ...state, draft: { ...state.draft, [field]: undefined } };
}

/**
 * Applies values the patient volunteered. Only fields the current request uses
 * are touched, and every value goes through the same validators as a direct answer.
 */
function applyEntities(
  state: ChatState,
  ctx: Ctx,
  entities: NluEntities,
  options: { overwrite: boolean; skip?: ChatField; onlyIdentity?: boolean }
) {
  let next = state;
  const applied: ChatField[] = [];
  const kind = state.flow?.kind;
  const allowed = options.onlyIdentity
    ? identityFields
    : kind
      ? getFieldOrder(ctx.config, kind)
      : entityFields;

  for (const field of entityFields) {
    const value = entities[field as keyof NluEntities];

    if (value === undefined || field === options.skip || !allowed.includes(field)) continue;
    if (!options.overwrite && !isMissing(next, field)) continue;
    if (getFieldValue(next, field) === value) continue;

    const result = validateChatField(field, value as string | number, ctx.config, {
      date: next.draft.date,
      now: ctx.now,
    });

    if (result.ok) {
      next = setField(next, ctx, field, result.value);
      applied.push(field);
    }
  }

  return { state: next, applied };
}

/** Drops answers that stopped being valid, e.g. this evening's slot after 6 PM. */
function revalidateDraft(state: ChatState, ctx: Ctx) {
  const notes: string[] = [];
  const { availability } = ctx.config.settings;
  let next = state;

  if (next.draft.serviceId && !isKnownTopic(ctx.config.catalog, next.draft.serviceId)) {
    next = clearField(next, "serviceId");
  }

  if (next.draft.date) {
    const issue = getDateIssue(next.draft.date, availability, ctx.now);

    if (issue) {
      notes.push(
        `${formatShortDate(next.draft.date)} is no longer available. ${describeDateIssue(issue, availability, ctx.now)}`
      );
      next = clearField(clearField(next, "date"), "timeSlotId");
    }
  }

  if (next.draft.date && next.draft.timeSlotId) {
    const slot = getTimeSlot(ctx.config, next.draft.timeSlotId);

    if (!slot || isSlotClosed(slot, next.draft.date, ctx.now)) {
      if (slot) notes.push(`The ${slot.label.toLowerCase()} slot has now passed for today.`);
      next = clearField(next, "timeSlotId");
    }
  }

  return { state: next, notes };
}

// ---------------------------------------------------------------------------
// Moving through a request
// ---------------------------------------------------------------------------

function freshFlow(flow: FlowState, awaiting: FlowState["awaiting"]): FlowState {
  return {
    ...flow,
    awaiting,
    editing: false,
    attempts: 0,
    picker: { level: "featured" },
    datePicker: false,
    submitFailed: false,
  };
}

/** Asks for the next missing answer, or shows the review card when nothing is missing. */
function advance(state: ChatState, ctx: Ctx, options: { lead?: string; notes?: string[] } = {}): ChatState {
  const revalidated = revalidateDraft(state, ctx);
  let next = revalidated.state;
  const flow = next.flow;

  if (!flow) return next;

  for (const note of [...(options.notes ?? []), ...revalidated.notes]) {
    next = say(next, ctx, note, { tone: "note" });
  }

  const missing = getFieldOrder(ctx.config, flow.kind).find((field) => isMissing(next, field));
  const withLead = (text: string) => (options.lead ? `${options.lead} ${text}` : text);

  if (missing) {
    next = say(next, ctx, withLead(getQuestion(next, ctx.config, missing)));

    return { ...next, flow: freshFlow(flow, missing) };
  }

  const submission = buildSubmission(next, ctx.config);

  if (!submission) return next;

  const { copy } = ctx.config.settings;

  next = say(next, ctx, withLead(flow.kind === "appointment" ? copy.reviewAppointment : copy.reviewInquiry));
  next = push(next, ctx, { role: "bot", type: "review", submission });

  return { ...next, flow: { ...freshFlow(flow, "review"), reviewId: lastMessageId(next) } };
}

function startFlow(
  state: ChatState,
  ctx: Ctx,
  kind: RequestKind,
  options: {
    consultationType?: ConsultationTypeId;
    topicId?: string;
    entities?: NluEntities;
    inquiryText?: string;
  } = {}
): ChatState {
  const { copy } = ctx.config.settings;
  const draft = { ...state.draft };

  const topicId =
    options.topicId && isKnownTopic(ctx.config.catalog, options.topicId) ? options.topicId : undefined;

  if (kind === "inquiry") {
    // Each question starts fresh; a service browsed earlier isn't silently attached.
    const inquiry = options.inquiryText ? validateInquiry(options.inquiryText, ctx.config) : null;

    draft.inquiry = inquiry?.ok ? inquiry.value : undefined;
    draft.inquiryTopicId = topicId;
  } else {
    if (options.consultationType) draft.consultationType = options.consultationType;

    if (topicId) {
      draft.serviceId = topicId;
      if (topicId !== ctx.config.settings.appointment.generalServiceId) draft.concern = undefined;
    }
  }

  const flow: FlowState = {
    kind,
    awaiting: getFieldOrder(ctx.config, kind)[0],
    editing: false,
    attempts: 0,
    picker: { level: "featured" },
    datePicker: false,
  };
  let next: ChatState = { ...state, draft, flow, idle: { kind: "none" }, pendingQuestion: undefined };
  let lead: string | undefined;

  if (options.entities) {
    const filled = applyEntities(next, ctx, options.entities, { overwrite: true });

    next = filled.state;

    // "Book a video consult for PCOS tomorrow evening" — read back what was understood.
    const understood = filled.applied.filter((field) => echoedFields.includes(field));

    if (understood.length) {
      lead = `Got it — ${understood.map((field) => describeFieldValue(next, ctx.config, field)).join(", ")}.`;
    }
  }

  // Say which saved details are being reused, so nothing is silently assumed.
  const remembered = getFieldOrder(ctx.config, kind).filter(
    (field) => identityFields.includes(field) && !isMissing(state, field)
  );
  const notes = remembered.length
    ? [
        fillTemplate(copy.rememberedDetails, {
          details: remembered.map((field) => describeFieldValue(state, ctx.config, field)).join(", "),
        }),
      ]
    : [];

  return advance(next, ctx, { notes, lead });
}

function startEdit(state: ChatState, ctx: Ctx, field: ChatField): ChatState {
  const flow = state.flow;

  if (!flow || !getFieldOrder(ctx.config, flow.kind).includes(field)) return state;

  const next = say(state, ctx, `Sure — ${lowerFirst(getQuestion(state, ctx.config, field))}`);

  return { ...next, flow: { ...freshFlow(flow, field), editing: true } };
}

function reprompt(state: ChatState, ctx: Ctx): ChatState {
  const flow = state.flow;

  if (!flow) return state;

  if (flow.awaiting === "review") return say(state, ctx, ctx.config.settings.copy.reviewPrompt);

  return say(
    state,
    ctx,
    `${fillTemplate(ctx.config.settings.copy.resume, { flow: flowLabel(flow.kind) })} ${lowerFirst(
      getQuestion(state, ctx.config, flow.awaiting)
    )}`
  );
}

// Answers worth reading back when they came from typed text rather than a tapped chip.
const echoedFields: ChatField[] = ["serviceId", "consultationType", "date", "timeSlotId"];

function acceptAnswer(
  state: ChatState,
  ctx: Ctx,
  field: ChatField,
  value: string | number,
  extras?: { entities?: NluEntities; concern?: string; typed?: boolean }
): ChatState {
  const flow = state.flow;

  if (!flow) return state;

  const result = validateChatField(field, value, ctx.config, { date: state.draft.date, now: ctx.now });

  if (!result.ok) return answerError(state, ctx, field, result.error);

  let next = setField(state, ctx, field, result.value);
  let understood = echoedFields.includes(field) ? [field] : [];

  if (field === "serviceId" && extras?.concern) {
    next = { ...next, draft: { ...next.draft, concern: extras.concern } };
    understood = [];
  }

  if (field === "inquiry" && extras?.entities?.serviceId && !next.draft.inquiryTopicId) {
    const topicId = extras.entities.serviceId;

    if (isKnownTopic(ctx.config.catalog, topicId)) {
      next = { ...next, draft: { ...next.draft, inquiryTopicId: topicId } };
    }
  }

  if (extras?.entities) {
    const filled = applyEntities(next, ctx, extras.entities, { overwrite: false, skip: field });

    next = filled.state;
    understood = [...understood, ...filled.applied];
  }

  // Share what the website says about the chosen service before moving on.
  if (field === "serviceId" && !flow.editing && flow.kind === "appointment") {
    const topicId = String(result.value);

    if (topicId === ctx.config.settings.appointment.generalServiceId) {
      if (next.draft.concern) {
        next = say(next, ctx, `I've noted “${next.draft.concern}” for the doctor.`, { tone: "note" });
      }
    } else if (hasTopicContent(ctx, topicId)) {
      next = push(next, ctx, { role: "bot", type: "topic", topicId, compact: true });
      // The card already names the service.
      understood = understood.filter((item) => item !== "serviceId");
    }
  }

  let lead: string | undefined;

  if (flow.editing) {
    lead = "Updated.";
  } else if (field === "patientName") {
    lead = fillTemplate(ctx.config.settings.copy.justNamed, { firstName: getFirstName(String(result.value)) });
  } else if (extras?.typed && understood.length) {
    // Read back how free text was understood, e.g. "Got it — Sat, 19 Sep, Evening."
    lead = `Got it — ${understood.map((item) => describeFieldValue(next, ctx.config, item)).join(", ")}.`;
  }

  return advance(next, ctx, { lead });
}

function hasTopicContent(ctx: Ctx, topicId: string) {
  const topic = getTopic(ctx.config.catalog, topicId);

  if (!topic) return false;

  return topic.kind === "category" ? Boolean(topic.category.description) : Boolean(topic.service.summary);
}

function answerError(state: ChatState, ctx: Ctx, field: ChatField, message: string): ChatState {
  const flow = state.flow;

  if (!flow) return state;

  const attempts = flow.attempts + 1;
  const help = attempts >= 3 ? " If it's easier, you can also send your request on WhatsApp." : "";
  const next = say(state, ctx, `${message}${help}`, { tone: "note" });

  return { ...next, flow: { ...flow, attempts } };
}

function describeIssue(ctx: Ctx, field: ChatField, nlu: NluResult) {
  const { availability } = ctx.config.settings;

  if (field === "phone" && nlu.issues.phone) {
    return "That doesn't look like a valid mobile number. Please enter a 10-digit number, e.g. 98765 43210.";
  }

  if (field === "date" && nlu.issues.date) {
    return nlu.issues.date === "invalid"
      ? "That date doesn't exist on the calendar. Please choose another date."
      : describeDateIssue(nlu.issues.date, availability, ctx.now);
  }

  if (field === "timeSlotId" && nlu.issues.timeSlotId) {
    const start = Math.min(...availability.timeSlots.map((slot) => slot.startHour));
    const end = Math.max(...availability.timeSlots.map((slot) => slot.endHour));

    return `Appointment slots run from ${formatHour(start)} to ${formatHour(end)}. Please choose one of the times below.`;
  }

  switch (field) {
    case "serviceId":
      return "I couldn't match that to one of our services. Please pick an option below, or choose “Not sure / Other”.";
    case "consultationType":
      return "Please choose an in-clinic visit, a video consultation or an audio consultation.";
    case "date":
      return "I couldn't understand that date. Pick one below, or type it like “25 Sep” or “next Monday”.";
    case "timeSlotId":
      return "Please choose Morning, Afternoon or Evening — or type a time like “5 pm”.";
    case "patientName":
      return "Please share the patient's full name, using letters only.";
    case "age":
      return `Please enter the patient's age in years (${ctx.config.settings.appointment.minAge}–${ctx.config.settings.appointment.maxAge}).`;
    case "phone":
      return "Please enter a valid 10-digit mobile number.";
    case "inquiry":
      return "Please type your question in a few words.";
  }
}

// ---------------------------------------------------------------------------
// Understanding free text
// ---------------------------------------------------------------------------

/** A minimal reading used when /api/chat/understand can't be reached. */
export function understandLocally(state: ChatState, text: string): NluResult {
  const entities: NluEntities = {};
  const trimmed = text.trim();
  const awaiting = state.flow?.awaiting;
  const phone = normalizeIndianMobile(trimmed);

  if (phone) entities.phone = phone;
  if (awaiting === "age" && /^\d{1,3}$/.test(trimmed)) entities.age = Number(trimmed);
  if (awaiting === "date" && parseIsoDate(trimmed)) entities.date = trimmed;

  if (awaiting === "patientName" && trimmed.split(/\s+/).length <= 4 && !/\d/.test(trimmed)) {
    const name = validatePatientName(trimmed);

    if (name.ok) entities.patientName = name.value;
  }

  const affirm = awaiting === "review" && /^(yes|y|ok|okay|confirm|sure|haan|han|done|send)\b/i.test(trimmed);

  return {
    intent: affirm ? "affirm" : Object.keys(entities).length ? "provide_info" : "unknown",
    confidence: 0.4,
    entities,
    issues: {},
    source: "local",
  };
}

function isCommand(state: ChatState, text: string, nlu: NluResult) {
  const words = text.trim().split(/\s+/).length;
  const flow = state.flow;

  if (["menu", "restart", "cancel"].includes(nlu.intent)) return nlu.confidence >= 0.7;

  if (!flow || words > 6 || nlu.confidence < 0.7) return false;
  if (nlu.intent === "start_booking") return flow.kind === "inquiry";
  if (nlu.intent === "start_inquiry") return flow.kind === "appointment" && flow.awaiting !== "inquiry";

  return nlu.intent === "explore_services";
}

function runCommand(state: ChatState, ctx: Ctx, nlu: NluResult): ChatState {
  const { copy } = ctx.config.settings;

  switch (nlu.intent) {
    case "cancel": {
      const next = say({ ...state, flow: null, draft: {} }, ctx, copy.cancelled);

      return withIdle(next, { kind: "home" });
    }
    case "restart":
    case "menu":
      return showMenu(state, ctx);
    case "start_booking":
      return startFlow(state, ctx, "appointment", {
        consultationType: nlu.entities.consultationType,
        entities: nlu.entities,
      });
    case "start_inquiry":
      return startFlow(state, ctx, "inquiry", { topicId: nlu.entities.serviceId });
    case "explore_services":
      return showCategories(state, ctx);
    default:
      return state;
  }
}

/** Answers a side question (location, fees, …) without changing any request. */
function answerInformational(state: ChatState, ctx: Ctx, text: string, nlu: NluResult): ChatState {
  const { copy, clinic, availability } = ctx.config.settings;
  const topicId = nlu.entities.serviceId;
  let next = state;

  switch (nlu.intent) {
    case "clinic_location":
      next = say(next, ctx, fillTemplate(copy.location, { address: clinic.address }));
      return push(next, ctx, { role: "bot", type: "contact", variant: "location" });
    case "clinic_contact":
      next = say(next, ctx, copy.contact);
      return push(next, ctx, { role: "bot", type: "contact", variant: "contact" });
    case "human_handoff":
      next = say(next, ctx, copy.humanHandoff);
      return push(next, ctx, { role: "bot", type: "contact", variant: "contact" });
    case "clinic_timings":
      return say(
        next,
        ctx,
        fillTemplate(copy.timings, {
          slots: availability.timeSlots.map((slot) => `${slot.label} (${slot.range})`).join(", "),
        })
      );
    case "fees":
      return { ...say(next, ctx, copy.fees), pendingQuestion: text };
    case "about_doctor":
      return push(next, ctx, { role: "bot", type: "doctor" });
    case "medical_advice":
      next = { ...say(next, ctx, copy.medicalAdvice), pendingQuestion: text };
      return topicId && getTopic(ctx.config.catalog, topicId)?.kind === "service"
        ? push(next, ctx, { role: "bot", type: "topic", topicId, compact: true })
        : next;
    case "service_info":
      return topicId ? showTopicCard(next, ctx, topicId, Boolean(state.flow)) : next;
    case "greeting":
      return say(next, ctx, copy.greeting);
    case "thanks":
      return say(next, ctx, copy.thanks);
    default:
      return next;
  }
}

function handleFlowText(state: ChatState, ctx: Ctx, text: string, nlu: NluResult): ChatState {
  const flow = state.flow!;
  const field = flow.awaiting as ChatField;
  const { entities } = nlu;

  if (isCommand(state, text, nlu)) return runCommand(state, ctx, nlu);

  // 1. A direct answer to the question on screen.
  const direct = entities[field as keyof NluEntities];

  if (direct !== undefined && field !== "inquiry") {
    return acceptAnswer(state, ctx, field, direct as string | number, { entities, typed: true });
  }

  if (field === "age" && /^\s*\d{1,3}\s*$/.test(text)) {
    return acceptAnswer(state, ctx, field, text.trim(), { entities, typed: true });
  }

  // 2. The question on screen is a free-text one: take the message as the answer.
  if (field === "inquiry") {
    return acceptAnswer(state, ctx, field, text, { entities: { serviceId: entities.serviceId }, typed: true });
  }

  // 3. A side question — answer it, then come back.
  if (informationalIntents.includes(nlu.intent) && nlu.intent !== "greeting") {
    return reprompt(answerInformational(state, ctx, text, nlu), ctx);
  }

  // 4. A concern that isn't a listed service still books a general consultation.
  if (field === "serviceId" && flow.kind === "appointment" && ["unknown", "provide_info"].includes(nlu.intent)) {
    const concern = validateConcern(text);

    if (concern.ok && Object.keys(entities).length === 0) {
      return acceptAnswer(state, ctx, field, ctx.config.settings.appointment.generalServiceId, {
        concern: concern.value,
      });
    }
  }

  // 5. Details for other questions ("make it video", "my number is …").
  const updated = applyEntities(state, ctx, entities, {
    overwrite: nlu.intent === "edit_field",
    skip: undefined,
  });

  if (updated.applied.length) {
    const changes = updated.applied.map((item) => describeFieldValue(updated.state, ctx.config, item));

    return advance(updated.state, ctx, { lead: `Noted — ${changes.join(", ")}.` });
  }

  if (nlu.intent === "edit_field" && entities.field) return startEdit(state, ctx, entities.field);
  if (nlu.intent === "greeting") return reprompt(say(state, ctx, ctx.config.settings.copy.greeting), ctx);

  return answerError(state, ctx, field, describeIssue(ctx, field, nlu));
}

function handleReviewText(state: ChatState, ctx: Ctx, text: string, nlu: NluResult): ChatState {
  const { entities } = nlu;

  if (["menu", "restart", "cancel"].includes(nlu.intent) && nlu.confidence >= 0.7) {
    return runCommand(state, ctx, nlu);
  }

  if (nlu.intent === "affirm") return beginSubmit(state);

  // Only an explicit change request may alter a confirmed detail. A side
  // question that happens to mention a service must not rebook it.
  if (nlu.intent === "edit_field" || nlu.intent === "provide_info") {
    const changes =
      nlu.intent === "edit_field" ? entities : { ...entities, serviceId: undefined };
    const updated = applyEntities(state, ctx, changes, { overwrite: true });

    if (updated.applied.length) return advance(updated.state, ctx, { lead: "Updated." });
    if (entities.field) return startEdit(state, ctx, entities.field);
  }

  if (nlu.intent === "deny") {
    return say(
      state,
      ctx,
      "No problem — tap the pencil next to any detail to change it, or tell me what to change (for example, “change the date to Monday”)."
    );
  }

  if (informationalIntents.includes(nlu.intent)) {
    return reprompt(answerInformational(state, ctx, text, nlu), ctx);
  }

  return say(state, ctx, ctx.config.settings.copy.reviewPrompt);
}

function handleIdleText(state: ChatState, ctx: Ctx, text: string, nlu: NluResult): ChatState {
  const { copy } = ctx.config.settings;
  const { entities } = nlu;
  const identity = applyEntities(state, ctx, entities, { overwrite: true, onlyIdentity: true });
  let next = identity.state;

  if (entities.caution) next = say(next, ctx, copy.caution, { tone: "warning" });

  switch (nlu.intent) {
    case "start_booking":
      return startFlow(next, ctx, "appointment", {
        consultationType: entities.consultationType,
        entities,
      });
    case "start_inquiry":
      return startFlow(next, ctx, "inquiry", { topicId: entities.serviceId });
    case "explore_services":
      return showCategories(next, ctx);
    case "service_info":
      return entities.serviceId ? showTopic(next, ctx, entities.serviceId) : showCategories(next, ctx);
    case "medical_advice":
      return withIdle(answerInformational(next, ctx, text, nlu), {
        kind: "medical",
        topicId: entities.serviceId,
      });
    case "fees":
      return withIdle(answerInformational(next, ctx, text, nlu), { kind: "fees" });
    case "clinic_location":
    case "clinic_contact":
    case "human_handoff":
      return withIdle(answerInformational(next, ctx, text, nlu), { kind: "contact" });
    case "clinic_timings":
    case "about_doctor":
    case "thanks":
      return withIdle(answerInformational(next, ctx, text, nlu), { kind: "home" });
    case "greeting": {
      const firstName = getFirstName(next.patient.patientName);
      const greeting = firstName && identity.applied.includes("patientName")
        ? `Hello, ${firstName}! How can I help you today?`
        : copy.greeting;

      return withIdle(say(next, ctx, greeting), { kind: "home" });
    }
    case "menu":
    case "restart":
    case "affirm":
    case "deny":
    case "edit_field":
      return showMenu(next, ctx);
    case "cancel":
      return withIdle(say(next, ctx, copy.cancelled), { kind: "home" });
    case "provide_info":
    case "unknown":
    default: {
      if (entities.consultationType || entities.date || entities.timeSlotId) {
        return startFlow(next, ctx, "appointment", { consultationType: entities.consultationType, entities });
      }

      if (entities.serviceId) return showTopic(next, ctx, entities.serviceId);

      if (identity.applied.length) {
        return withIdle(say(next, ctx, "Thanks, I've noted that. What would you like to do next?"), { kind: "home" });
      }

      return { ...withIdle(say(next, ctx, copy.unknown), { kind: "unknown" }), pendingQuestion: text };
    }
  }
}

function handleText(state: ChatState, ctx: Ctx, text: string, nlu: NluResult): ChatState {
  const { copy, clinic } = ctx.config.settings;

  if (nlu.intent === "crisis" || nlu.intent === "emergency") {
    const message = fillTemplate(nlu.intent === "crisis" ? copy.crisis : copy.emergency, {
      emergencyNumber: clinic.emergencyNumber,
      mentalHealthHelpline: clinic.mentalHealthHelpline,
    });
    const next = push(say(state, ctx, message, { tone: "danger" }), ctx, {
      role: "bot",
      type: "contact",
      variant: nlu.intent === "crisis" ? "crisis" : "emergency",
    });

    return next.flow ? next : withIdle(next, { kind: "none" });
  }

  if (state.flow && state.flow.awaiting !== "review") return handleFlowText(state, ctx, text, nlu);
  if (state.flow) return handleReviewText(state, ctx, text, nlu);

  return handleIdleText(state, ctx, text, nlu);
}

// ---------------------------------------------------------------------------
// Browsing
// ---------------------------------------------------------------------------

function showMenu(state: ChatState, ctx: Ctx): ChatState {
  const next = push({ ...state, flow: null }, ctx, { role: "bot", type: "menu" });

  return withIdle(next, { kind: "none" });
}

function showCategories(state: ChatState, ctx: Ctx): ChatState {
  let next = say({ ...state, flow: null }, ctx, ctx.config.settings.copy.exploreIntro);

  next = push(next, ctx, { role: "bot", type: "categories" });

  return withIdle(next, { kind: "explore" });
}

function showTopicCard(state: ChatState, ctx: Ctx, topicId: string, compact: boolean): ChatState {
  const topic = getTopic(ctx.config.catalog, topicId);

  if (!topic) return state;

  if (topic.kind === "category") {
    return push(state, ctx, { role: "bot", type: "category", categoryId: topic.category.id });
  }

  return push(state, ctx, { role: "bot", type: "topic", topicId, compact });
}

function showTopic(state: ChatState, ctx: Ctx, topicId: string): ChatState {
  const topic = getTopic(ctx.config.catalog, topicId);

  if (!topic) return state;

  const next = showTopicCard({ ...state, flow: null }, ctx, topicId, false);

  if (topic.kind === "category") return withIdle(next, { kind: "category", categoryId: topic.category.id });

  const caution = topic.service.caution
    ? say(next, ctx, ctx.config.settings.copy.caution, { tone: "warning" })
    : next;

  return withIdle(caution, { kind: "topic", topicId });
}

// ---------------------------------------------------------------------------
// Sending
// ---------------------------------------------------------------------------

function beginSubmit(state: ChatState): ChatState {
  const flow = state.flow;

  if (!flow || flow.awaiting !== "review") return state;

  return { ...state, status: "submitting", flow: { ...flow, submitFailed: false } };
}

/** The request shown on the active review card — exactly what the patient confirmed. */
export function getPendingSubmission(state: ChatState) {
  const reviewId = state.flow?.reviewId;
  const message = state.messages.find((item) => item.id === reviewId);

  return message?.type === "review" ? message.submission : null;
}

function submitSucceeded(state: ChatState, ctx: Ctx, result: SubmitSuccess): ChatState {
  const submission = getPendingSubmission(state);

  if (!submission) return { ...state, status: "idle" };

  const next = push({ ...state, status: "idle" }, ctx, {
    role: "bot",
    type: "success",
    submission,
    result,
  });

  return {
    ...next,
    draft: {},
    flow: null,
    pendingQuestion: undefined,
    idle: { kind: "success", requestKind: submission.kind },
  };
}

function submitFailed(
  state: ChatState,
  ctx: Ctx,
  message: string,
  fieldErrors?: Partial<Record<ChatField, string>>
): ChatState {
  const flow = state.flow;
  const next: ChatState = { ...state, status: "idle" };

  if (!flow) return next;

  const field = getFieldOrder(ctx.config, flow.kind).find((item) => fieldErrors?.[item]);

  if (field) {
    const cleared = say(clearField(next, field), ctx, fieldErrors![field]!, { tone: "note" });

    return advance({ ...cleared, flow: { ...flow, editing: true } }, ctx);
  }

  return {
    ...say(next, ctx, message || ctx.config.settings.copy.submitError, { tone: "warning" }),
    flow: { ...flow, submitFailed: true },
  };
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

export function reduceChat(state: ChatState, event: ChatEvent, config: ChatConfig, nowMs: number): ChatState {
  const ctx: Ctx = { config, nowMs, now: clinicNow(config, nowMs) };
  const { settings, catalog } = config;
  const busy = state.status !== "idle";

  switch (event.type) {
    case "understood":
      if (state.status !== "understanding") return state;
      return handleText({ ...state, status: "idle" }, ctx, event.text, event.nlu ?? understandLocally(state, event.text));

    case "submit_succeeded":
      return state.status === "submitting" ? submitSucceeded(state, ctx, event.result) : state;

    case "submit_failed":
      return state.status === "submitting" ? submitFailed(state, ctx, event.message, event.fieldErrors) : state;

    case "restart":
      return { ...createInitialState(config, nowMs), patient: state.patient };

    case "forget_details":
      return say(createInitialState(config, nowMs), ctx, "I've cleared the details you shared in this chat.", {
        tone: "note",
      });
  }

  if (busy) return state;

  switch (event.type) {
    case "user_text": {
      const text = event.text.trim().slice(0, 1000);

      return text ? { ...echo(state, ctx, text), status: "understanding" } : state;
    }

    case "menu_option": {
      const option = settings.mainMenu.find((item) => item.id === event.optionId);

      if (!option) return state;

      const next = echo(state, ctx, option.label);

      if (option.action === "explore_services") return showCategories(next, ctx);
      if (option.action === "start_inquiry") return startFlow(next, ctx, "inquiry");

      return startFlow(next, ctx, "appointment", { consultationType: option.consultationType });
    }

    case "show_menu":
      return showMenu(echo(state, ctx, "Main menu"), ctx);

    case "show_categories":
      return showCategories(echo(state, ctx, "Explore services"), ctx);

    case "show_category": {
      const category = getCategory(catalog, event.categoryId);

      return category ? showTopic(echo(state, ctx, category.title), ctx, category.id) : state;
    }

    case "answer": {
      if (!state.flow || state.flow.awaiting !== event.field) return state;

      return acceptAnswer(echo(state, ctx, event.label), ctx, event.field, event.value);
    }

    case "picker":
      return state.flow ? { ...state, flow: { ...state.flow, picker: event.picker } } : state;

    case "toggle_date_picker":
      return state.flow?.awaiting === "date"
        ? { ...state, flow: { ...state.flow, datePicker: event.open } }
        : state;

    case "edit": {
      if (!state.flow) return state;

      return startEdit(echo(state, ctx, `Change ${fieldNames[event.field]}`), ctx, event.field);
    }

    case "confirm": {
      if (state.flow?.awaiting !== "review" || !getPendingSubmission(state)) return state;

      return beginSubmit(echo(state, ctx, state.flow.submitFailed ? "Try again" : "Confirm and send"));
    }

    case "topic_action": {
      const label = getTopicLabel(catalog, event.topicId, true);

      if (!label) return state;

      switch (event.action) {
        case "view":
          return showTopic(echo(state, ctx, label), ctx, event.topicId);
        case "ask":
          return startFlow(echo(state, ctx, `Ask about ${label}`), ctx, "inquiry", { topicId: event.topicId });
        case "video":
        case "audio":
          return startFlow(
            echo(state, ctx, `${event.action === "video" ? "Video" : "Audio"} consultation for ${label}`),
            ctx,
            "appointment",
            { topicId: event.topicId, consultationType: event.action }
          );
        default:
          return startFlow(echo(state, ctx, `Book for ${label}`), ctx, "appointment", { topicId: event.topicId });
      }
    }

    case "send_pending_question": {
      if (!state.pendingQuestion) return state;

      const topicId = state.idle.kind === "medical" ? state.idle.topicId : undefined;

      return startFlow(echo(state, ctx, "Send my question to the clinic"), ctx, "inquiry", {
        inquiryText: state.pendingQuestion,
        topicId,
      });
    }

    default:
      return state;
  }
}
