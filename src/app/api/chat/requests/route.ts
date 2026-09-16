import { NextResponse } from "next/server";

import {
  buildPatientWhatsAppMessage,
  getWhatsAppLink,
} from "@/features/chat/core/requestSummary";
import type { SubmitResponse } from "@/features/chat/core/types";
import { validateSubmission } from "@/features/chat/core/validation";
import { notifyClinic } from "@/features/chat/server/clinicNotifier";
import { getChatConfig } from "@/features/chat/server/config";
import {
  getClientIp,
  isSameOrigin,
  jsonError,
  readJsonBody,
  takeRateLimit,
} from "@/features/chat/server/http";
import {
  createReferenceId,
  getChatRequestRepository,
  toStoredRequest,
} from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

/**
 * Receives a confirmed appointment request or inquiry from the chat.
 * Everything the browser sent is validated again here; the browser's own
 * checks are only for instant feedback.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError(403, "Not allowed.");

  const ip = getClientIp(request);
  const limit = ip ? takeRateLimit(`chat-submit:${ip}`, 8, 15 * 60_000) : ({ ok: true } as const);

  if (!limit.ok) {
    return jsonError(429, "Too many requests. Please try again in a few minutes, or contact the clinic on WhatsApp.", {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const body = await readJsonBody(request, 8_000);

  if (!body.ok) return jsonError(body.status, body.message);

  const config = await getChatConfig();
  const now = new Date();
  const payload = body.value as { website?: unknown } | null;

  // Honeypot field that people never see: quietly accept and drop bot traffic.
  if (payload && typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json(
      { ok: true, kind: "inquiry", referenceId: createReferenceId("inquiry"), whatsAppUrl: getWhatsAppLink(config.settings.clinic.whatsAppNumber), clinicNotified: false, stored: false } satisfies SubmitResponse,
      { status: 201 }
    );
  }

  const validation = validateSubmission(body.value, config, now.getTime());

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some details need a quick fix.",
        fieldErrors: validation.fieldErrors,
      } satisfies SubmitResponse,
      { status: 422, headers: { "Cache-Control": "no-store" } }
    );
  }

  const submission = validation.value;
  const perPhone = takeRateLimit(`chat-submit-phone:${submission.patient.phone}`, 5, 60 * 60_000);

  if (!perPhone.ok) {
    return jsonError(429, "We've already received several requests for this number. The clinic will contact you shortly.");
  }

  const referenceId = createReferenceId(submission.kind);
  const clinicNotified = await notifyClinic(submission, config, referenceId);
  let stored = true;

  try {
    await getChatRequestRepository().save(toStoredRequest(submission, config, referenceId, now, clinicNotified));
  } catch (error) {
    stored = false;
    // Details stay out of the logs; the reference is enough to trace it.
    console.error(
      `[chat] Could not store request ${referenceId}:`,
      error instanceof Error ? error.message : "unknown error"
    );
  }

  return NextResponse.json(
    {
      ok: true,
      kind: submission.kind,
      referenceId,
      whatsAppUrl: getWhatsAppLink(
        config.settings.clinic.whatsAppNumber,
        buildPatientWhatsAppMessage(submission, config, referenceId)
      ),
      clinicNotified,
      stored,
    } satisfies SubmitResponse,
    { status: 201, headers: { "Cache-Control": "no-store" } }
  );
}
