import {
  getConsultationType,
  getTimeSlot,
  getTopicLabel,
} from "@/features/chat/core/catalog";
import { formatLongDate } from "@/features/chat/core/dates";
import { formatIndianMobile } from "@/features/chat/core/validation";
import type {
  ChatConfig,
  ChatSubmission,
  SummaryRow,
} from "@/features/chat/core/types";

/**
 * Human-readable views of a request: the review card rows, the WhatsApp message,
 * and the clinic notification all come from here so they never disagree.
 */

// WhatsApp treats * _ ~ ` as formatting; keep patient text from restyling the message.
function plain(value: string) {
  return value.replace(/[*_~`]/g, "").trim();
}

export function getSummaryRows(submission: ChatSubmission, config: ChatConfig): SummaryRow[] {
  const { catalog } = config;

  if (submission.kind === "inquiry") {
    const rows: SummaryRow[] = [];

    if (submission.inquiry.serviceId) {
      rows.push({
        field: "serviceId",
        label: "Topic",
        value: getTopicLabel(catalog, submission.inquiry.serviceId),
      });
    }

    rows.push(
      { field: "inquiry", label: "Question", value: submission.inquiry.text },
      { field: "patientName", label: "Name", value: submission.patient.name },
      { field: "phone", label: "Mobile", value: formatIndianMobile(submission.patient.phone) }
    );

    return rows;
  }

  const { appointment, patient } = submission;
  const slot = getTimeSlot(config, appointment.timeSlotId);
  const topic = getTopicLabel(catalog, appointment.serviceId);

  return [
    {
      field: "serviceId",
      label: "Consulting for",
      value: appointment.concern ? `${topic} — “${appointment.concern}”` : topic,
    },
    {
      field: "consultationType",
      label: "Consultation",
      value: getConsultationType(config, appointment.consultationType)?.label ?? appointment.consultationType,
    },
    { field: "date", label: "Preferred date", value: formatLongDate(appointment.date) },
    {
      field: "timeSlotId",
      label: "Preferred time",
      value: slot ? `${slot.label} (${slot.range})` : appointment.timeSlotId,
    },
    { field: "patientName", label: "Patient", value: patient.name },
    { field: "age", label: "Age", value: `${patient.age} years` },
    { field: "phone", label: "Mobile", value: formatIndianMobile(patient.phone) },
  ];
}

/**
 * The message the patient sends from their own WhatsApp. It is written in the
 * first person because it arrives in the clinic's chat from the patient.
 */
export function buildPatientWhatsAppMessage(
  submission: ChatSubmission,
  config: ChatConfig,
  referenceId?: string
) {
  const rows = getSummaryRows(submission, config);
  const isAppointment = submission.kind === "appointment";
  const lines = [
    isAppointment ? "*New Appointment Request*" : "*New Patient Inquiry*",
    referenceId ? `Ref: ${referenceId} (website chat)` : "Sent from the website chat",
    "",
    ...rows.map((row) => `*${row.label}:* ${plain(row.value)}`),
    "",
    isAppointment
      ? "Kindly confirm my appointment. Thank you."
      : "Kindly reply at your convenience. Thank you.",
  ];

  return lines.join("\n");
}

/** Notification sent by the clinic's own WhatsApp Business number to the clinic. */
export function buildClinicNotification(
  submission: ChatSubmission,
  config: ChatConfig,
  referenceId: string
) {
  const rows = getSummaryRows(submission, config);
  const lines = [
    submission.kind === "appointment"
      ? "*New appointment request* — website chat"
      : "*New patient inquiry* — website chat",
    `Ref: ${referenceId}`,
    "",
    ...rows.map((row) => `*${row.label}:* ${plain(row.value)}`),
    "",
    `Reply on WhatsApp: https://wa.me/91${submission.patient.phone}`,
  ];

  return lines.join("\n");
}

export function getWhatsAppLink(phoneNumber: string, message?: string) {
  const href = `https://wa.me/${phoneNumber}`;

  return message ? `${href}?text=${encodeURIComponent(message)}` : href;
}
