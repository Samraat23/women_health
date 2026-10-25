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

/**
 * Browser and OS from the User-Agent string, by hand-rolled pattern match —
 * no parsing library, matching every other classifier in this file. Good
 * enough to answer "which browsers/OSes actually visit this site" at a
 * glance; it will misread an obscure in-app or embedded browser as "Other"
 * rather than name it precisely. Order matters: most browser UAs also
 * contain "Safari" and/or "Chrome" tokens from the engines they're built on,
 * so the more specific checks run first.
 */
export function classifyBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (/edg\//.test(ua)) return "Edge";
  if (/samsungbrowser\//.test(ua)) return "Samsung Internet";
  if (/opr\/|opera/.test(ua)) return "Opera";
  if (/firefox\/|fxios\//.test(ua)) return "Firefox";
  if (/crios\/|chrome\/|chromium\//.test(ua)) return "Chrome";
  if (/version\/.*safari\//.test(ua) || (/safari\//.test(ua) && !/chrome|crios|chromium/.test(ua))) {
    return "Safari";
  }
  if (/msie |trident\//.test(ua)) return "Internet Explorer";

  return "Other";
}

export function classifyOperatingSystem(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return "iOS";
  if (/android/.test(ua)) return "Android";
  if (/windows nt/.test(ua)) return "Windows";
  if (/cros/.test(ua)) return "Chrome OS";
  if (/mac os x|macintosh/.test(ua)) return "macOS";
  if (/linux/.test(ua)) return "Linux";

  return "Other";
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
