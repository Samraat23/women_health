/**
 * Shared chat types. Everything in `core/` is plain TypeScript with no React or
 * Node imports, so the browser (instant feedback) and the API routes
 * (authoritative checks) run exactly the same rules.
 */

export type ConsultationTypeId = "clinic" | "video" | "audio";

export type RequestKind = "appointment" | "inquiry";

/** Every piece of information the chat can collect. */
export type ChatField =
  | "serviceId"
  | "consultationType"
  | "date"
  | "timeSlotId"
  | "patientName"
  | "age"
  | "phone"
  | "inquiry";

export type MenuAction = "start_booking" | "start_inquiry" | "explore_services";

export type ChatIconKey = string;

// ---------------------------------------------------------------------------
// Configuration (src/data/chat/*.json, served by /api/chat/config)
// ---------------------------------------------------------------------------

export type ConsultationTypeOption = {
  id: ConsultationTypeId;
  label: string;
  shortLabel: string;
  description: string;
  icon: ChatIconKey;
  enabled: boolean;
};

export type MainMenuOption = {
  id: string;
  action: MenuAction;
  consultationType?: ConsultationTypeId;
  label: string;
  description: string;
  icon: ChatIconKey;
};

export type TimeSlot = {
  id: string;
  label: string;
  range: string;
  startHour: number;
  endHour: number;
  /** First hour (clinic time) at which the slot can no longer be requested for today. */
  closesAtHour: number;
  icon: ChatIconKey;
};

export type Availability = {
  timeZone: string;
  bookingWindowDays: number;
  quickDateCount: number;
  /** 0 = Sunday … 6 = Saturday. */
  closedWeekdays: number[];
  /** YYYY-MM-DD */
  closedDates: string[];
  timeSlots: TimeSlot[];
};

export type ChatCopy = {
  welcomeTitle: string;
  welcomeBody: string;
  contextNudge: string;
  emergencyNote: string;
  privacyNote: string;
  rememberedDetails: string;
  questions: {
    serviceId: string;
    consultationType: string;
    date: string;
    timeSlotId: string;
    patientName: string;
    patientNameInquiry: string;
    age: string;
    phone: string;
    phoneInquiry: string;
    inquiry: string;
    inquiryAboutTopic: string;
  };
  justNamed: string;
  reviewAppointment: string;
  reviewInquiry: string;
  successAppointmentTitle: string;
  successAppointmentBody: string;
  successInquiryTitle: string;
  successInquiryBody: string;
  fees: string;
  timings: string;
  location: string;
  contact: string;
  humanHandoff: string;
  medicalAdvice: string;
  emergency: string;
  crisis: string;
  caution: string;
  unknown: string;
  greeting: string;
  thanks: string;
  cancelled: string;
  exploreIntro: string;
  resume: string;
  reviewPrompt: string;
  submitError: string;
  offline: string;
};

export type ChatSettings = {
  version: number;
  enabled: boolean;
  assistant: {
    name: string;
    teamName: string;
    doctorName: string;
    doctorCredentials: string;
    avatar: string;
    statusText: string;
    launcherLabel: string;
    teaser: { enabled: boolean; delayMs: number; text: string };
  };
  clinic: {
    name: string;
    address: string;
    mapsUrl: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsAppNumber: string;
    instagramUrl: string;
    emergencyNumber: string;
    mentalHealthHelpline: string;
  };
  doctor: {
    name: string;
    title: string;
    credentials: string;
    qualifications: string[];
    highlights: string[];
    profileUrl: string;
  };
  consultationTypes: ConsultationTypeOption[];
  mainMenu: MainMenuOption[];
  availability: Availability;
  appointment: {
    fieldOrder: ChatField[];
    minAge: number;
    maxAge: number;
    featuredServiceIds: string[];
    generalServiceId: string;
  };
  inquiry: {
    fieldOrder: ChatField[];
    minLength: number;
    maxLength: number;
  };
  copy: ChatCopy;
};

export type ChatCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: ChatIconKey;
  keywords: string[];
};

export type ChatService = {
  id: string;
  title: string;
  shortTitle?: string;
  categoryId: string | null;
  articleSlug?: string;
  href?: string;
  /** Short description taken from the website (article intro or site data). */
  summary?: string;
  /** Adds a gentle "seek urgent care if severe" note when mentioned. */
  caution?: boolean;
  /** Offered while booking, but never shown as a browsable service. */
  bookingOnly?: boolean;
  keywords: string[];
};

export type ChatCatalog = {
  categories: ChatCategory[];
  services: ChatService[];
};

export type ChatConfig = {
  settings: ChatSettings;
  catalog: ChatCatalog;
};

// ---------------------------------------------------------------------------
// Understanding (POST /api/chat/understand)
// ---------------------------------------------------------------------------

export type IntentId =
  | "crisis"
  | "emergency"
  | "greeting"
  | "thanks"
  | "affirm"
  | "deny"
  | "restart"
  | "menu"
  | "cancel"
  | "start_booking"
  | "start_inquiry"
  | "explore_services"
  | "service_info"
  | "clinic_location"
  | "clinic_contact"
  | "clinic_timings"
  | "fees"
  | "about_doctor"
  | "human_handoff"
  | "medical_advice"
  | "edit_field"
  | "provide_info"
  | "unknown";

export type NluEntities = {
  consultationType?: ConsultationTypeId;
  /** A service id or a category id from the catalog. */
  serviceId?: string;
  date?: string;
  timeSlotId?: string;
  patientName?: string;
  age?: number;
  phone?: string;
  /** For "change my phone number"-style requests. */
  field?: ChatField;
  /** The message mentions something that warrants a gentle safety note. */
  caution?: boolean;
};

/** Why a value the patient clearly tried to give could not be used. */
export type NluIssues = {
  phone?: "invalid";
  date?: "past" | "too_far" | "closed" | "full" | "invalid";
  timeSlotId?: "outside_hours";
  age?: "invalid";
};

export type NluResult = {
  intent: IntentId;
  confidence: number;
  entities: NluEntities;
  issues: NluIssues;
  source: "rules" | "ai" | "local";
};

export type UnderstandRequest = {
  text: string;
  awaiting?: ChatField | "review" | null;
  flow?: RequestKind | null;
};

// ---------------------------------------------------------------------------
// Submission (POST /api/chat/requests)
// ---------------------------------------------------------------------------

export type AppointmentSubmission = {
  kind: "appointment";
  patient: { name: string; age: number; phone: string };
  appointment: {
    serviceId: string;
    consultationType: ConsultationTypeId;
    date: string;
    timeSlotId: string;
    concern?: string;
  };
  sourcePath?: string;
  /** Honeypot: real browsers leave this empty. */
  website?: string;
};

export type InquirySubmission = {
  kind: "inquiry";
  patient: { name: string; phone: string };
  inquiry: { text: string; serviceId?: string };
  sourcePath?: string;
  website?: string;
};

export type ChatSubmission = AppointmentSubmission | InquirySubmission;

export type SummaryRow = { field: ChatField; label: string; value: string };

export type SubmitSuccess = {
  ok: true;
  kind: RequestKind;
  referenceId: string;
  whatsAppUrl: string;
  /** The clinic was messaged automatically (WhatsApp Cloud API). */
  clinicNotified: boolean;
  /** The request is in the clinic's inbox; when false WhatsApp is the only copy. */
  stored: boolean;
};

export type SubmitFailure = {
  ok: false;
  message: string;
  fieldErrors?: Partial<Record<ChatField, string>>;
};

export type SubmitResponse = SubmitSuccess | SubmitFailure;
