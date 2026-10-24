import type { DeviceCategory, TrafficSource } from "./types";

/**
 * Pure classification helpers, shared by the ingestion route and anywhere
 * else that needs to interpret a user agent or referrer the same way.
 */

export function classifyDevice(userAgent: string): DeviceCategory {
  const ua = userAgent.toLowerCase();

  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android/i.test(ua)) return "mobile";

  return "desktop";
}

const searchEngineHosts = [
  "google.",
  "bing.com",
  "yahoo.",
  "duckduckgo.com",
  "baidu.com",
  "yandex.",
];

const socialHosts = [
  "facebook.com",
  "fb.com",
  "instagram.com",
  "twitter.com",
  "x.com",
  "t.co",
  "linkedin.com",
  "whatsapp.com",
  "wa.me",
  "pinterest.",
  "reddit.com",
  "youtube.com",
];

function hostOf(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function classifyTrafficSource({
  referrer,
  siteHost,
  utmSource,
}: {
  referrer?: string;
  siteHost?: string;
  utmSource?: string;
}): { source: TrafficSource; referrerHost?: string } {
  if (utmSource) return { source: "campaign" };

  const referrerHost = referrer ? hostOf(referrer) : undefined;

  if (!referrerHost || referrerHost === siteHost) return { source: "direct" };
  if (searchEngineHosts.some((host) => referrerHost.includes(host))) {
    return { source: "search", referrerHost };
  }
  if (socialHosts.some((host) => referrerHost.includes(host))) {
    return { source: "social", referrerHost };
  }

  return { source: "referral", referrerHost };
}
