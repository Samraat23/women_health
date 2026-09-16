import { NextResponse } from "next/server";

import type { ChatField, UnderstandRequest } from "@/features/chat/core/types";
import { understandMessage } from "@/features/chat/nlu";
import { getChatConfig } from "@/features/chat/server/config";
import {
  getClientIp,
  isSameOrigin,
  jsonError,
  readJsonBody,
  takeRateLimit,
} from "@/features/chat/server/http";

export const dynamic = "force-dynamic";

const awaitingValues = new Set<string>([
  "serviceId",
  "consultationType",
  "date",
  "timeSlotId",
  "patientName",
  "age",
  "phone",
  "inquiry",
  "review",
]);

/** Works out what a typed chat message means. Stateless; nothing is stored. */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError(403, "Not allowed.");

  const ip = getClientIp(request);
  const limit = ip ? takeRateLimit(`chat-understand:${ip}`, 90, 5 * 60_000) : ({ ok: true } as const);

  if (!limit.ok) {
    return jsonError(429, "Too many messages. Please slow down.", {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const body = await readJsonBody(request, 4_000);

  if (!body.ok) return jsonError(body.status, body.message);

  const input = (body.value ?? {}) as Record<string, unknown>;
  const text = typeof input.text === "string" ? input.text.trim() : "";

  if (!text || text.length > 1000) return jsonError(400, "Please send a message of up to 1000 characters.");

  const understandRequest: UnderstandRequest = {
    text,
    awaiting:
      typeof input.awaiting === "string" && awaitingValues.has(input.awaiting)
        ? (input.awaiting as ChatField | "review")
        : null,
    flow: input.flow === "appointment" || input.flow === "inquiry" ? input.flow : null,
  };

  const result = await understandMessage(understandRequest, await getChatConfig(), Date.now());

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
