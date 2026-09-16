import {
  getConsultationType,
  getTimeSlot,
  getTopic,
} from "@/features/chat/core/catalog";
import {
  describeDateIssue,
  getClinicNow,
  getDateIssue,
  isSlotClosed,
  type ClinicNow,
} from "@/features/chat/core/dates";
import type {
  AppointmentSubmission,
  ChatConfig,
  ChatField,
  ConsultationTypeId,
  InquirySubmission,
} from "@/features/chat/core/types";

// Same rules as the booking form, kept here so the chat doesn't depend on that module.
/** Accepts what people actually type or autofill: spaces, +91 or a leading 0. */
export function normalizeIndianMobile(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function formatIndianMobile(digits: string) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export type FieldResult<T> = { ok: true; value: T } | { ok: false; error: string };

const ok = <T,>(value: T): FieldResult<T> => ({ ok: true, value });
const fail = <T,>(error: string): FieldResult<T> => ({ ok: false, error });

// Replies that are clearly not a person's name, so "ok" or "hi" never ends up
// on an appointment request.
const notNames = new Set([
  "hi", "hii", "hello", "hey", "yes", "no", "ok", "okay", "sure", "thanks", "thank you",
  "test", "testing", "na", "nahi", "haan", "ji", "sir", "madam", "maam", "doctor", "patient",
  "me", "myself", "self", "book", "appointment", "help", "please", "hmm", "nothing", "none",
  "abc", "xyz", "asdf", "name", "my name", "unknown", "anonymous",
]);

const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}'’. -]*$/u;

/** Strips control characters and tidies whitespace in free text. */
export function sanitizeText(value: string, maxLength: number) {
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F\u200B-\u200F\u2028\u2029]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function toTitleCase(name: string) {
  return name
    .toLowerCase()
    .replace(/(^|[\s'’-])(\p{L})/gu, (_match, lead: string, letter: string) => lead + letter.toUpperCase());
}

export function validatePatientName(raw: string): FieldResult<string> {
  const name = sanitizeText(raw, 80)
    .replace(/\s+/g, " ")
    .replace(/^[\s.,'’-]+|[\s,'’-]+$/g, "");
  const letters = name.match(/\p{L}/gu)?.length ?? 0;

  if (!name || letters < 2) return fail("Please enter the patient's full name.");
  if (name.length > 60) return fail("That name is a little long. Please use up to 60 characters.");
  if (!namePattern.test(name)) return fail("Please enter a name using letters only.");
  if (name.split(" ").length > 6 || notNames.has(name.toLowerCase())) {
    return fail("Please enter the patient's full name.");
  }

  // Keep deliberate capitalisation (e.g. "DeSouza"), fix all-lower or all-caps typing.
  const isUniformCase = name === name.toLowerCase() || name === name.toUpperCase();

  return ok(isUniformCase ? toTitleCase(name) : name);
}

export function validatePhone(raw: string): FieldResult<string> {
  const phone = normalizeIndianMobile(String(raw));

  return phone ? ok(phone) : fail("Please enter a valid 10-digit Indian mobile number.");
}

export function validateAge(raw: string | number, config: ChatConfig): FieldResult<number> {
  const text = String(raw).trim();
  const { minAge, maxAge } = config.settings.appointment;
  const age = Number(text);

  if (!/^\d{1,3}$/.test(text) || !Number.isInteger(age) || age < minAge || age > maxAge) {
    return fail(`Please enter a valid age in years (${minAge}–${maxAge}).`);
  }

  return ok(age);
}

export function validateDate(raw: string, config: ChatConfig, now: ClinicNow): FieldResult<string> {
  const date = String(raw).trim();
  const issue = getDateIssue(date, config.settings.availability, now);

  return issue ? fail(describeDateIssue(issue, config.settings.availability, now)) : ok(date);
}

export function validateTimeSlot(
  raw: string,
  date: string | undefined,
  config: ChatConfig,
  now: ClinicNow
): FieldResult<string> {
  const slot = getTimeSlot(config, raw);

  if (!slot) return fail("Please choose a preferred time.");

  if (date && isSlotClosed(slot, date, now)) {
    return fail(`The ${slot.label.toLowerCase()} slot has passed for today. Please choose a later time.`);
  }

  return ok(slot.id);
}

export function validateConsultationType(raw: string, config: ChatConfig): FieldResult<ConsultationTypeId> {
  const type = getConsultationType(config, raw as ConsultationTypeId);

  return type ? ok(type.id) : fail("Please choose how you would like to consult.");
}

export function validateTopic(raw: string, config: ChatConfig): FieldResult<string> {
  return getTopic(config.catalog, raw) ? ok(raw) : fail("Please choose a service from the list.");
}

export function validateInquiry(raw: string, config: ChatConfig): FieldResult<string> {
  const { minLength, maxLength } = config.settings.inquiry;
  const text = sanitizeText(String(raw), maxLength + 1);
  const meaningful = text.match(/[\p{L}\p{N}]/gu)?.length ?? 0;

  if (text.length > maxLength) {
    return fail(`Please keep your question under ${maxLength} characters.`);
  }

  if (text.length < minLength || meaningful < 3) {
    return fail("Please type your question in a few words.");
  }

  return ok(text);
}

/** Optional free-text concern the patient typed instead of picking a listed service. */
export function validateConcern(raw: string): FieldResult<string> {
  const text = sanitizeText(String(raw), 121);
  const letters = text.match(/\p{L}/gu)?.length ?? 0;

  if (letters < 3 || text.length > 120) return fail("");

  return ok(text);
}

/** Validates one answer typed or tapped in the chat. */
export function validateChatField(
  field: ChatField,
  raw: string | number,
  config: ChatConfig,
  context: { date?: string; now: ClinicNow }
): FieldResult<string | number> {
  switch (field) {
    case "patientName":
      return validatePatientName(String(raw));
    case "phone":
      return validatePhone(String(raw));
    case "age":
      return validateAge(raw, config);
    case "date":
      return validateDate(String(raw), config, context.now);
    case "timeSlotId":
      return validateTimeSlot(String(raw), context.date, config, context.now);
    case "consultationType":
      return validateConsultationType(String(raw), config);
    case "serviceId":
      return validateTopic(String(raw), config);
    case "inquiry":
      return validateInquiry(String(raw), config);
  }
}

// ---------------------------------------------------------------------------
// Whole-request validation, run by the API on untrusted input.
// ---------------------------------------------------------------------------

export type ValidSubmission = AppointmentSubmission | InquirySubmission;

type SubmissionResult =
  | { ok: true; value: ValidSubmission }
  | { ok: false; fieldErrors: Partial<Record<ChatField, string>> };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : typeof value === "number" ? String(value) : "";
}

function collect<T>(
  result: FieldResult<T>,
  field: ChatField,
  errors: Partial<Record<ChatField, string>>
) {
  if (!result.ok) errors[field] = result.error;

  return result.ok ? result.value : undefined;
}

export function validateSubmission(
  input: unknown,
  config: ChatConfig,
  nowMs: number = Date.now()
): SubmissionResult {
  const body = asRecord(input);
  const patient = asRecord(body.patient);
  const now = getClinicNow(config.settings.availability.timeZone, nowMs);
  const errors: Partial<Record<ChatField, string>> = {};
  const sourcePath = sanitizeText(asString(body.sourcePath), 200) || undefined;

  const name = collect(validatePatientName(asString(patient.name)), "patientName", errors);
  const phone = collect(validatePhone(asString(patient.phone)), "phone", errors);

  if (body.kind === "appointment") {
    const appointment = asRecord(body.appointment);
    const age = collect(validateAge(asString(patient.age), config), "age", errors);
    const serviceId = collect(validateTopic(asString(appointment.serviceId), config), "serviceId", errors);
    const consultationType = collect(
      validateConsultationType(asString(appointment.consultationType), config),
      "consultationType",
      errors
    );
    const date = collect(validateDate(asString(appointment.date), config, now), "date", errors);
    const timeSlotId = collect(
      validateTimeSlot(asString(appointment.timeSlotId), date, config, now),
      "timeSlotId",
      errors
    );
    const concernResult = appointment.concern ? validateConcern(asString(appointment.concern)) : null;

    if (
      Object.keys(errors).length ||
      !name || !phone || age === undefined || !serviceId || !consultationType || !date || !timeSlotId
    ) {
      return { ok: false, fieldErrors: errors };
    }

    return {
      ok: true,
      value: {
        kind: "appointment",
        patient: { name, age, phone },
        appointment: {
          serviceId,
          consultationType,
          date,
          timeSlotId,
          concern: concernResult?.ok ? concernResult.value : undefined,
        },
        sourcePath,
      },
    };
  }

  if (body.kind === "inquiry") {
    const inquiry = asRecord(body.inquiry);
    const text = collect(validateInquiry(asString(inquiry.text), config), "inquiry", errors);
    const topicId = asString(inquiry.serviceId);
    const serviceId = topicId && getTopic(config.catalog, topicId) ? topicId : undefined;

    if (Object.keys(errors).length || !name || !phone || !text) {
      return { ok: false, fieldErrors: errors };
    }

    return {
      ok: true,
      value: {
        kind: "inquiry",
        patient: { name, phone },
        inquiry: { text, serviceId },
        sourcePath,
      },
    };
  }

  return { ok: false, fieldErrors: { inquiry: "Unknown request type." } };
}
