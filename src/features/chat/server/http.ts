import { NextResponse } from "next/server";

/**
 * Guards shared by the public chat endpoints.
 *
 * The rate limiter is in-memory, so each server instance counts separately.
 * That is enough to stop a script hammering one instance; put a shared limiter
 * (e.g. at the CDN) in front if the site runs on many instances.
 */

const buckets = new Map<string, number[]>();

/**
 * The visitor's IP as reported by the hosting proxy, or null when there is no
 * proxy header — then every visitor would share one bucket, so callers skip
 * per-IP limits rather than throttle the whole site.
 */
export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwarded || request.headers.get("x-real-ip") || null;
}

export function takeRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);

  if (hits.length >= limit) {
    buckets.set(key, hits);

    return { ok: false as const, retryAfterSeconds: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 10_000) {
    for (const [bucketKey, times] of buckets) {
      if (times.every((time) => now - time >= windowMs)) buckets.delete(bucketKey);
    }
  }

  return { ok: true as const };
}

/** Blocks other websites from posting to the chat from a visitor's browser. */
export function isSameOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;

  const origin = request.headers.get("origin");

  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function readJsonBody(request: Request, maxBytes: number) {
  const declared = Number(request.headers.get("content-length") ?? 0);

  if (declared > maxBytes) return { ok: false as const, status: 413, message: "Request is too large." };

  const body = await request.text();

  if (body.length > maxBytes) return { ok: false as const, status: 413, message: "Request is too large." };

  try {
    return { ok: true as const, value: JSON.parse(body) as unknown };
  } catch {
    return { ok: false as const, status: 400, message: "Invalid request." };
  }
}

export function jsonError(status: number, message: string, headers?: HeadersInit) {
  return NextResponse.json(
    { ok: false, message },
    { status, headers: { "Cache-Control": "no-store", ...headers } }
  );
}
