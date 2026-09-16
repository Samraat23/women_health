import {
  buildClinicNotification,
  getSummaryRows,
} from "@/features/chat/core/requestSummary";
import type { ChatConfig, ChatSubmission } from "@/features/chat/core/types";
import { formatIndianMobile } from "@/features/chat/core/validation";

/**
 * Optional: message the clinic automatically through the WhatsApp Cloud API
 * as soon as a request arrives, so it never depends on the patient pressing
 * Send in WhatsApp.
 *
 *   WHATSAPP_CLOUD_API_TOKEN     permanent access token
 *   WHATSAPP_PHONE_NUMBER_ID     the clinic's WhatsApp Business sender id
 *   WHATSAPP_CLINIC_RECIPIENT    number to notify (defaults to the clinic's WhatsApp)
 *   WHATSAPP_TEMPLATE_NAME       approved template (needed outside WhatsApp's 24-hour
 *                                window); body variables, in order: request type,
 *                                reference, patient name, mobile, details
 *   WHATSAPP_TEMPLATE_LANGUAGE   template language code, default "en"
 *   WHATSAPP_GRAPH_API_VERSION   default "v23.0"
 */

export function isClinicNotifierConfigured() {
  return Boolean(process.env.WHATSAPP_CLOUD_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

// Template variables may not contain new lines, tabs or long runs of spaces.
function templateText(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 900) || "-";
}

export async function notifyClinic(
  submission: ChatSubmission,
  config: ChatConfig,
  referenceId: string
): Promise<boolean> {
  if (!isClinicNotifierConfigured()) return false;

  const version = process.env.WHATSAPP_GRAPH_API_VERSION || "v23.0";
  const recipient = (process.env.WHATSAPP_CLINIC_RECIPIENT || config.settings.clinic.whatsAppNumber).replace(/\D/g, "");
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const details = getSummaryRows(submission, config)
    .filter((row) => row.field !== "patientName" && row.field !== "phone")
    .map((row) => `${row.label}: ${row.value}`)
    .join(" | ");

  const message = templateName
    ? {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
          name: templateName,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en" },
          components: [
            {
              type: "body",
              parameters: [
                submission.kind === "appointment" ? "Appointment request" : "Patient inquiry",
                referenceId,
                submission.patient.name,
                formatIndianMobile(submission.patient.phone),
                details,
              ].map((value) => ({ type: "text", text: templateText(value) })),
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: { preview_url: false, body: buildClinicNotification(submission, config, referenceId) },
      };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${version}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn(`[chat] WhatsApp notification for ${referenceId} failed with status ${response.status}.`);
    }

    return response.ok;
  } catch {
    console.warn(`[chat] WhatsApp notification for ${referenceId} could not be sent.`);

    return false;
  }
}
