import { NextResponse } from "next/server";
import { z } from "zod";

import { classifyDevice, classifyTrafficSource } from "@/features/analytics/core/classify";
import type { AnalyticsEvent, AnalyticsEventName } from "@/features/analytics/core/types";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import {
  getClientIp,
  isSameOrigin,
  jsonError,
  readJsonBody,
  takeRateLimit,
} from "@/features/chat/server/http";

export const dynamic = "force-dynamic";

/**
 * Records one analytics event — a page view, an `engagement` report, or a
 * tracked click (`cta_click`, `phone_click`, …). Fired by `PageTracker` and
 * `InteractionTracker` on the public site. Never blocks or breaks the page it
 * came from — on any failure the client simply drops the event.
 *
 * One schema for every event name rather than a discriminated union: nearly
 * every field is already optional per event, the server only reads the ones
 * relevant to the `eventName` it got, and a single shape keeps the client's
 * `trackEvent()` call site uniform.
 */

const eventNames = [
  "page_view",
  "engagement",
  "cta_click",
  "outbound_click",
  "phone_click",
  "whatsapp_click",
  "email_click",
  "form_start",
  "form_submit",
  "form_error",
] as const satisfies readonly AnalyticsEventName[];

const trackSchema = z.object({
  eventName: z.enum(eventNames).optional(),
  path: z.string().min(1).max(500),
  referrer: z.string().max(1000).optional(),
  sessionId: z.string().min(1).max(100),
  visitorId: z.string().min(1).max(100),
  pageViewId: z.string().min(1).max(100).optional(),
  isNewSession: z.boolean().optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  screenWidth: z.number().optional(),
  elementId: z.string().max(200).optional(),
  elementLabel: z.string().max(200).optional(),
  destinationPath: z.string().max(1000).optional(),
  engagementMs: z.number().min(0).max(6 * 60 * 60 * 1000).optional(),
  scrollDepth: z
    .union([z.literal(25), z.literal(50), z.literal(75), z.literal(90), z.literal(100)])
    .optional(),
  formId: z.string().max(100).optional(),
  formField: z.string().max(100).optional(),
});

function referenceId() {
  return `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
const longDigitRunPattern = /\d{7,}/g;

/**
 * Defense-in-depth for the one free-text-ish field this schema accepts
 * (`elementLabel`, read from a tagged element's own markup — see
 * `InteractionTracker`'s `labelFor`). The client should never send PII here,
 * but a redaction pass costs nothing and the spec is explicit: no emails,
 * phone numbers or other personal data in analytics event properties.
 */
function sanitizeLabel(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const redacted = value.replace(emailPattern, "[redacted]").replace(longDigitRunPattern, "[redacted]");

  return redacted.slice(0, 120);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError(403, "Not allowed.");

  const ip = getClientIp(request);
  const limit = ip ? takeRateLimit(`analytics-track:${ip}`, 120, 60_000) : ({ ok: true } as const);

  if (!limit.ok) {
    return jsonError(429, "Too many requests.", { "Retry-After": String(limit.retryAfterSeconds) });
  }

  const body = await readJsonBody(request, 4_000);

  if (!body.ok) return jsonError(body.status, body.message);

  const parsed = trackSchema.safeParse(body.value);

  if (!parsed.success) return jsonError(422, "Invalid analytics payload.");

  const payload = parsed.data;
  const siteHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? undefined;
  const { source, referrerHost } = classifyTrafficSource({
    referrer: payload.referrer,
    siteHost: siteHost?.split(":")[0],
    utmSource: payload.utmSource,
  });

  const event: AnalyticsEvent = {
    id: referenceId(),
    schemaVersion: 2,
    eventName: payload.eventName ?? "page_view",
    path: payload.path,
    referrer: payload.referrer,
    referrerHost,
    trafficSource: source,
    device: classifyDevice(request.headers.get("user-agent") || ""),
    sessionId: payload.sessionId,
    visitorId: payload.visitorId,
    pageViewId: payload.pageViewId,
    isNewSession: payload.isNewSession ?? false,
    country: request.headers.get("x-vercel-ip-country") || undefined,
    campaign: payload.utmCampaign,
    elementId: sanitizeLabel(payload.elementId),
    elementLabel: sanitizeLabel(payload.elementLabel),
    destinationPath: payload.destinationPath,
    engagementMs: payload.engagementMs !== undefined ? Math.round(payload.engagementMs) : undefined,
    scrollDepth: payload.scrollDepth,
    formId: payload.formId,
    formField: sanitizeLabel(payload.formField),
    createdAt: new Date().toISOString(),
  };

  try {
    await getAnalyticsEventRepository().save(event);
  } catch (error) {
    console.error(
      "[analytics] Could not store event:",
      error instanceof Error ? error.message : "unknown error"
    );

    // Still 204 — a storage hiccup is never the visitor's problem.
  }

  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
