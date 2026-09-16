import type {
  ChatField,
  ChatSubmission,
  ConsultationTypeId,
  NluResult,
  RequestKind,
  SubmitSuccess,
} from "@/features/chat/core/types";

/**
 * The whole conversation as plain JSON. It is kept in sessionStorage, so it
 * survives page navigation and reloads but is gone once the tab is closed —
 * patient details never outlive the visit on a shared device.
 */

export const chatStateVersion = 1;

export type ChatLink = { label: string; href: string };

export type ChatMessage =
  | { id: string; at: number; role: "user"; type: "text"; text: string }
  | {
      id: string;
      at: number;
      role: "bot";
      type: "text";
      text: string;
      tone?: "default" | "note" | "warning" | "danger";
      link?: ChatLink;
    }
  | { id: string; at: number; role: "bot"; type: "menu" }
  /** A service or category card built from website content. */
  | { id: string; at: number; role: "bot"; type: "topic"; topicId: string; compact: boolean }
  | { id: string; at: number; role: "bot"; type: "categories" }
  | { id: string; at: number; role: "bot"; type: "category"; categoryId: string }
  | {
      id: string;
      at: number;
      role: "bot";
      type: "review";
      submission: ChatSubmission;
    }
  | {
      id: string;
      at: number;
      role: "bot";
      type: "success";
      submission: ChatSubmission;
      result: SubmitSuccess;
    }
  | {
      id: string;
      at: number;
      role: "bot";
      type: "contact";
      variant: "location" | "contact" | "emergency" | "crisis";
    }
  | { id: string; at: number; role: "bot"; type: "doctor" };

/** Values that describe the patient; remembered across requests in the visit. */
export type PatientMemory = {
  patientName?: string;
  age?: number;
  phone?: string;
};

/** Values that belong to one request; cleared once it is sent. */
export type RequestDraft = {
  serviceId?: string;
  /** What the patient typed when their concern isn't a listed service. */
  concern?: string;
  consultationType?: ConsultationTypeId;
  date?: string;
  timeSlotId?: string;
  inquiry?: string;
  /** Only set when the patient chose to ask about a specific service. */
  inquiryTopicId?: string;
};

export type ServicePicker =
  | { level: "featured" }
  | { level: "categories" }
  | { level: "category"; categoryId: string };

export type FlowState = {
  kind: RequestKind;
  awaiting: ChatField | "review";
  /** Changing a single answer from the review card. */
  editing: boolean;
  picker: ServicePicker;
  /** The native date picker is open instead of the quick date chips. */
  datePicker: boolean;
  /** Unusable answers in a row for the current question. */
  attempts: number;
  reviewId?: string;
  submitFailed?: boolean;
};

/** What to suggest when no request is in progress. */
export type IdleSuggestions =
  | { kind: "none" }
  | { kind: "home" }
  | { kind: "context"; topicId: string }
  | { kind: "topic"; topicId: string }
  | { kind: "category"; categoryId: string }
  | { kind: "explore" }
  | { kind: "unknown" }
  | { kind: "medical"; topicId?: string }
  | { kind: "fees" }
  | { kind: "contact" }
  | { kind: "success"; requestKind: RequestKind };

export type ChatState = {
  version: typeof chatStateVersion;
  counter: number;
  messages: ChatMessage[];
  patient: PatientMemory;
  draft: RequestDraft;
  flow: FlowState | null;
  idle: IdleSuggestions;
  /** A message the bot couldn't place, offered as a ready-made question. */
  pendingQuestion?: string;
  status: "idle" | "understanding" | "submitting";
};

export type ChatEvent =
  | { type: "menu_option"; optionId: string }
  | { type: "show_menu" }
  | { type: "answer"; field: ChatField; value: string | number; label: string }
  | { type: "picker"; picker: ServicePicker }
  | { type: "toggle_date_picker"; open: boolean }
  | { type: "user_text"; text: string }
  | { type: "understood"; text: string; nlu: NluResult | null }
  | { type: "edit"; field: ChatField }
  | { type: "confirm" }
  | { type: "submit_succeeded"; result: SubmitSuccess }
  | { type: "submit_failed"; message: string; fieldErrors?: Partial<Record<ChatField, string>> }
  | { type: "topic_action"; topicId: string; action: "view" | "book" | "video" | "audio" | "ask" }
  | { type: "show_category"; categoryId: string }
  | { type: "show_categories" }
  | { type: "send_pending_question" }
  | { type: "restart" }
  | { type: "forget_details" };

export type QuickReply = {
  id: string;
  label: string;
  hint?: string;
  icon?: string;
  tone?: "default" | "primary" | "subtle" | "whatsapp";
  disabled?: boolean;
  event?: ChatEvent;
  href?: string;
};

export type QuickReplyGroup = {
  /** Shown above the chips, e.g. "All concerns › Pregnancy Care". */
  heading?: string;
  replies: QuickReply[];
};

export type ComposerState = {
  placeholder: string;
  inputMode: "text" | "tel" | "numeric";
  autoComplete?: string;
  maxLength: number;
  multiline: boolean;
  disabled: boolean;
  /** Show the native date picker instead of the text box. */
  dateInput?: { min: string; max: string; value?: string };
};
