import {
  fillTemplate,
  getBrowsableServices,
  getCategory,
  getEnabledConsultationTypes,
  getTimeSlot,
  getTopicLabel,
} from "@/features/chat/core/catalog";
import {
  formatShortDate,
  getClinicNow,
  getLastBookableDate,
  getQuickDates,
  getRelativeDayLabel,
  isSlotClosed,
  type ClinicNow,
} from "@/features/chat/core/dates";
import {
  buildPatientWhatsAppMessage,
  getWhatsAppLink,
} from "@/features/chat/core/requestSummary";
import type {
  ChatState,
  ComposerState,
  QuickReply,
  QuickReplyGroup,
} from "@/features/chat/core/state";
import type {
  ChatConfig,
  ChatField,
  ChatSubmission,
} from "@/features/chat/core/types";
import { formatIndianMobile } from "@/features/chat/core/validation";

export function clinicNow(config: ChatConfig, nowMs: number): ClinicNow {
  return getClinicNow(config.settings.availability.timeZone, nowMs);
}

export function getFieldOrder(config: ChatConfig, kind: "appointment" | "inquiry") {
  return kind === "appointment"
    ? config.settings.appointment.fieldOrder
    : config.settings.inquiry.fieldOrder;
}

export function getFieldValue(state: ChatState, field: ChatField) {
  switch (field) {
    case "patientName":
      return state.patient.patientName;
    case "age":
      return state.patient.age;
    case "phone":
      return state.patient.phone;
    default:
      return state.draft[field];
  }
}

/** The request as it would be sent, or null while anything is still missing. */
export function buildSubmission(state: ChatState, config: ChatConfig): ChatSubmission | null {
  const { patient, draft, flow } = state;

  if (!flow || !patient.patientName || !patient.phone) return null;

  if (flow.kind === "inquiry") {
    if (!draft.inquiry) return null;

    return {
      kind: "inquiry",
      patient: { name: patient.patientName, phone: patient.phone },
      inquiry: { text: draft.inquiry, serviceId: draft.inquiryTopicId },
    };
  }

  if (
    patient.age === undefined ||
    !draft.serviceId ||
    !draft.consultationType ||
    !draft.date ||
    !draft.timeSlotId
  ) {
    return null;
  }

  return {
    kind: "appointment",
    patient: { name: patient.patientName, age: patient.age, phone: patient.phone },
    appointment: {
      serviceId: draft.serviceId,
      consultationType: draft.consultationType,
      date: draft.date,
      timeSlotId: draft.timeSlotId,
      concern: draft.serviceId === config.settings.appointment.generalServiceId ? draft.concern : undefined,
    },
  };
}

/** The question for a field, phrased for the current request. */
export function getQuestion(state: ChatState, config: ChatConfig, field: ChatField) {
  const { questions } = config.settings.copy;
  const kind = state.flow?.kind ?? "appointment";

  switch (field) {
    case "timeSlotId":
      return fillTemplate(questions.timeSlotId, {
        date: state.draft.date ? formatShortDate(state.draft.date) : "your chosen date",
      });
    case "patientName":
      return kind === "inquiry" ? questions.patientNameInquiry : questions.patientName;
    case "phone":
      return kind === "inquiry" ? questions.phoneInquiry : questions.phone;
    case "inquiry":
      return state.draft.inquiryTopicId
        ? fillTemplate(questions.inquiryAboutTopic, {
            topic: getTopicLabel(config.catalog, state.draft.inquiryTopicId),
          })
        : questions.inquiry;
    default:
      return questions[field];
  }
}

/** The current answer, phrased for "Keep …" chips while editing. */
export function describeFieldValue(state: ChatState, config: ChatConfig, field: ChatField) {
  const value = getFieldValue(state, field);

  if (value === undefined || value === "") return "";

  switch (field) {
    case "serviceId":
      return getTopicLabel(config.catalog, String(value), true);
    case "consultationType":
      return config.settings.consultationTypes.find((type) => type.id === value)?.label ?? String(value);
    case "date":
      return formatShortDate(String(value));
    case "timeSlotId":
      return getTimeSlot(config, String(value))?.label ?? String(value);
    case "phone":
      return formatIndianMobile(String(value));
    case "age":
      return `${value} years`;
    case "inquiry":
      return String(value).length > 32 ? `${String(value).slice(0, 32)}…` : String(value);
    default:
      return String(value);
  }
}

function mainMenuReplies(config: ChatConfig): QuickReply[] {
  return config.settings.mainMenu.map((option) => ({
    id: `menu-${option.id}`,
    label: option.label,
    icon: option.icon,
    event: { type: "menu_option", optionId: option.id },
  }));
}

function whatsAppReply(config: ChatConfig, message?: string): QuickReply {
  return {
    id: "whatsapp",
    label: "Chat on WhatsApp",
    icon: "whatsapp",
    tone: "whatsapp",
    href: getWhatsAppLink(config.settings.clinic.whatsAppNumber, message),
  };
}

const menuReply: QuickReply = {
  id: "main-menu",
  label: "Main menu",
  icon: "menu",
  tone: "subtle",
  event: { type: "show_menu" },
};

function servicePickerGroup(state: ChatState, config: ChatConfig): QuickReplyGroup {
  const picker = state.flow?.picker ?? { level: "featured" };
  const { catalog } = config;
  const answer = (id: string, short = true): QuickReply => {
    const label = getTopicLabel(catalog, id, short);

    return {
      id: `topic-${id}`,
      label,
      event: { type: "answer", field: "serviceId", value: id, label },
    };
  };

  if (picker.level === "categories") {
    return {
      heading: "All areas of care",
      replies: [
        ...catalog.categories.map((category) => ({
          id: `category-${category.id}`,
          label: category.title,
          icon: category.icon,
          event: { type: "picker", picker: { level: "category", categoryId: category.id } } as const,
        })),
        {
          id: "picker-back",
          label: "Back",
          icon: "back",
          tone: "subtle",
          event: { type: "picker", picker: { level: "featured" } },
        },
      ],
    };
  }

  if (picker.level === "category") {
    const category = getCategory(catalog, picker.categoryId);

    return {
      heading: category ? `All areas of care › ${category.title}` : undefined,
      replies: [
        ...getBrowsableServices(catalog, picker.categoryId).map((service) => answer(service.id)),
        ...(category
          ? [
              {
                id: `topic-${category.id}`,
                label: `Other ${category.title} concern`,
                event: {
                  type: "answer",
                  field: "serviceId",
                  value: category.id,
                  label: category.title,
                } as const,
              },
            ]
          : []),
        {
          id: "picker-back",
          label: "Back",
          icon: "back",
          tone: "subtle",
          event: { type: "picker", picker: { level: "categories" } },
        },
      ],
    };
  }

  const { featuredServiceIds, generalServiceId } = config.settings.appointment;

  return {
    replies: [
      ...featuredServiceIds.filter((id) => getTopicLabel(catalog, id)).map((id) => answer(id)),
      {
        id: "picker-more",
        label: "More concerns",
        icon: "more",
        tone: "subtle",
        event: { type: "picker", picker: { level: "categories" } },
      },
      answer(generalServiceId),
    ],
  };
}

function flowReplies(state: ChatState, config: ChatConfig, now: ClinicNow): QuickReplyGroup {
  const flow = state.flow!;
  const { availability } = config.settings;
  const keepCurrent = (field: ChatField): QuickReply[] => {
    const value = getFieldValue(state, field);
    const description = describeFieldValue(state, config, field);

    return flow.editing && value !== undefined && description
      ? [
          {
            id: "keep-current",
            label: `Keep ${description}`,
            tone: "subtle",
            event: { type: "answer", field, value, label: `Keep ${description}` },
          },
        ]
      : [];
  };

  switch (flow.awaiting) {
    case "serviceId":
      return servicePickerGroup(state, config);

    case "consultationType":
      return {
        replies: getEnabledConsultationTypes(config).map((type) => ({
          id: `type-${type.id}`,
          label: type.label,
          icon: type.icon,
          event: { type: "answer", field: "consultationType", value: type.id, label: type.label },
        })),
      };

    case "date":
      return {
        replies: [
          ...getQuickDates(availability, now).map((date) => {
            const relative = getRelativeDayLabel(date, now);
            const isNamed = relative === "Today" || relative === "Tomorrow";
            const label = isNamed ? `${relative}, ${formatShortDate(date)}` : formatShortDate(date);

            return {
              id: `date-${date}`,
              label: isNamed ? relative : formatShortDate(date),
              hint: isNamed ? formatShortDate(date) : undefined,
              event: { type: "answer", field: "date", value: date, label } as const,
            };
          }),
          {
            id: "date-other",
            label: "Pick another date",
            icon: "calendar",
            tone: "subtle",
            event: { type: "toggle_date_picker", open: true },
          },
        ],
      };

    case "timeSlotId":
      return {
        replies: [
          ...availability.timeSlots.map((slot) => {
            const closed = Boolean(state.draft.date && isSlotClosed(slot, state.draft.date, now));

            return {
              id: `slot-${slot.id}`,
              label: slot.label,
              hint: closed ? "Passed for today" : slot.range,
              icon: slot.icon,
              disabled: closed,
              event: {
                type: "answer",
                field: "timeSlotId",
                value: slot.id,
                label: `${slot.label} (${slot.range})`,
              } as const,
            };
          }),
          {
            id: "change-date",
            label: "Change date",
            icon: "calendar",
            tone: "subtle",
            event: { type: "edit", field: "date" },
          },
        ],
      };

    case "review":
      if (flow.submitFailed) {
        const submission = buildSubmission(state, config);

        return {
          replies: [
            { id: "retry", label: "Try again", icon: "retry", tone: "primary", event: { type: "confirm" } },
            whatsAppReply(
              config,
              submission ? buildPatientWhatsAppMessage(submission, config) : undefined
            ),
          ],
        };
      }

      return { replies: [] };

    default:
      return { replies: keepCurrent(flow.awaiting) };
  }
}

function idleReplies(state: ChatState, config: ChatConfig): QuickReplyGroup {
  const { catalog } = config;
  const idle = state.idle;

  switch (idle.kind) {
    case "home":
      return { replies: mainMenuReplies(config) };

    case "context":
    case "topic": {
      const label = getTopicLabel(catalog, idle.topicId, true);

      return {
        replies: [
          {
            id: "topic-book",
            label: `Book for ${label}`,
            icon: "calendar",
            tone: "primary",
            event: { type: "topic_action", topicId: idle.topicId, action: "book" },
          },
          {
            id: "topic-ask",
            label: `Ask about ${label}`,
            icon: "inquiry",
            event: { type: "topic_action", topicId: idle.topicId, action: "ask" },
          },
          // The welcome menu is already on screen for the page-context nudge.
          ...(idle.kind === "topic"
            ? [
                { id: "explore", label: "Other services", icon: "explore", event: { type: "show_categories" } } as QuickReply,
                menuReply,
              ]
            : []),
        ],
      };
    }

    case "category": {
      const category = getCategory(catalog, idle.categoryId);

      return {
        replies: [
          ...(category
            ? [
                {
                  id: "category-book",
                  label: `Book for ${category.title}`,
                  icon: "calendar",
                  tone: "primary",
                  event: { type: "topic_action", topicId: category.id, action: "book" },
                } as QuickReply,
              ]
            : []),
          { id: "explore", label: "All services", icon: "explore", event: { type: "show_categories" } },
          menuReply,
        ],
      };
    }

    case "unknown":
      return {
        replies: [
          ...(state.pendingQuestion
            ? [
                {
                  id: "send-question",
                  label: "Send this as a question",
                  icon: "inquiry",
                  tone: "primary",
                  event: { type: "send_pending_question" },
                } as QuickReply,
              ]
            : []),
          ...mainMenuReplies(config).filter((reply) => reply.id !== "menu-inquiry"),
          whatsAppReply(config),
        ],
      };

    case "medical":
      return {
        replies: [
          {
            id: "medical-book",
            label: idle.topicId
              ? `Book for ${getTopicLabel(catalog, idle.topicId, true)}`
              : "Book a consultation",
            icon: "calendar",
            tone: "primary",
            event: idle.topicId
              ? { type: "topic_action", topicId: idle.topicId, action: "book" }
              : { type: "menu_option", optionId: "book" },
          },
          ...(state.pendingQuestion
            ? [
                {
                  id: "send-question",
                  label: "Send my question to the clinic",
                  icon: "inquiry",
                  event: { type: "send_pending_question" },
                } as QuickReply,
              ]
            : []),
          { id: "menu-video", label: "Video Consultation", icon: "video", event: { type: "menu_option", optionId: "video" } },
          menuReply,
        ],
      };

    case "fees":
      return {
        replies: [
          ...(state.pendingQuestion
            ? [
                {
                  id: "send-question",
                  label: "Send my question to the clinic",
                  icon: "inquiry",
                  tone: "primary",
                  event: { type: "send_pending_question" },
                } as QuickReply,
              ]
            : []),
          { id: "menu-book", label: "Book Appointment", icon: "calendar", event: { type: "menu_option", optionId: "book" } },
          { id: "call", label: "Call the clinic", icon: "audio", href: config.settings.clinic.phoneHref },
        ],
      };

    case "contact":
      return { replies: [...mainMenuReplies(config).slice(0, 3), menuReply] };

    case "explore":
      return { replies: [menuReply] };

    case "success":
      return {
        replies: [
          {
            id: "again-book",
            label: idle.requestKind === "appointment" ? "Book another appointment" : "Book an appointment",
            icon: "calendar",
            event: { type: "menu_option", optionId: "book" },
          },
          { id: "again-ask", label: "Ask a question", icon: "inquiry", event: { type: "menu_option", optionId: "inquiry" } },
          menuReply,
        ],
      };

    default:
      return { replies: [] };
  }
}

export function getQuickReplies(state: ChatState, config: ChatConfig, nowMs: number): QuickReplyGroup {
  if (state.status !== "idle") return { replies: [] };

  if (!state.flow) return idleReplies(state, config);

  const group = flowReplies(state, config, clinicNow(config, nowMs));

  // After a couple of answers that didn't work, offer a human route out.
  return state.flow.attempts >= 2 && !group.replies.some((reply) => reply.id === "whatsapp")
    ? { ...group, replies: [...group.replies, whatsAppReply(config)] }
    : group;
}

export function getComposerState(state: ChatState, config: ChatConfig, nowMs: number): ComposerState {
  const base: ComposerState = {
    placeholder: "Type your message…",
    inputMode: "text",
    maxLength: 500,
    multiline: false,
    disabled: state.status === "submitting",
  };

  if (state.status === "submitting") {
    return { ...base, placeholder: "Sending your request…" };
  }

  const flow = state.flow;

  if (!flow) return base;

  switch (flow.awaiting) {
    case "patientName":
      return { ...base, placeholder: "Full name", autoComplete: "name", maxLength: 60 };
    case "age":
      // Room for "29 years old"; phones still show the number pad.
      return { ...base, placeholder: "Age in years", inputMode: "numeric", autoComplete: "off", maxLength: 24 };
    case "phone":
      return {
        ...base,
        placeholder: "10-digit mobile number",
        inputMode: "tel",
        autoComplete: "tel-national",
        maxLength: 16,
      };
    case "inquiry":
      return {
        ...base,
        placeholder: "Type your question…",
        maxLength: config.settings.inquiry.maxLength,
        multiline: true,
      };
    case "date": {
      const now = clinicNow(config, nowMs);

      return flow.datePicker
        ? {
            ...base,
            placeholder: "Choose a date",
            dateInput: {
              min: now.date,
              max: getLastBookableDate(config.settings.availability, now),
              value: state.draft.date,
            },
          }
        : { ...base, placeholder: "Or type a date, e.g. next Monday" };
    }
    case "timeSlotId":
      return { ...base, placeholder: "Or type a time, e.g. 5 pm" };
    case "serviceId":
      return { ...base, placeholder: "Or type your concern…", maxLength: 120 };
    case "consultationType":
      return { ...base, placeholder: "Or type clinic, video or audio" };
    case "review":
      return { ...base, placeholder: "Type “confirm”, or what to change…" };
    default:
      return base;
  }
}
