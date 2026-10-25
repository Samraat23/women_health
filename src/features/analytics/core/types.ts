export type DeviceCategory = "mobile" | "tablet" | "desktop";

export type TrafficSource = "direct" | "search" | "social" | "referral" | "campaign";

/**
 * Event names this pipeline actually understands.
 *
 * A deliberately small subset of the "full" GA4-style vocabulary — only
 * events this codebase can emit correctly today. Adding a new one means
 * adding both a real emitter (a client tracker, a form, the chat widget)
 * and the aggregation that reads it; a name with nothing wired to it would
 * just be an invented metric with a fancier label.
 */
export type AnalyticsEventName =
  | "page_view"
  | "engagement"
  | "cta_click"
  | "outbound_click"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "form_start"
  | "form_submit"
  | "form_error";

export const clickEventNames = [
  "cta_click",
  "outbound_click",
  "phone_click",
  "whatsapp_click",
  "email_click",
] as const satisfies readonly AnalyticsEventName[];

export type ClickEventName = (typeof clickEventNames)[number];

export const formEventNames = [
  "form_start",
  "form_submit",
  "form_error",
] as const satisfies readonly AnalyticsEventName[];

export type FormEventName = (typeof formEventNames)[number];

type SchemaVersion = 2;

/** What the browser sends to `/api/analytics/track`, before server enrichment. */
export type TrackPayload = {
  eventName?: AnalyticsEventName;
  path: string;
  referrer?: string;
  sessionId: string;
  visitorId: string;
  pageViewId?: string;
  /** Only meaningful on `page_view` — every other event name omits it. */
  isNewSession?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  screenWidth?: number;
  /** `cta_click` / `outbound_click` / `phone_click` / `whatsapp_click` / `email_click` only. */
  elementId?: string;
  elementLabel?: string;
  destinationPath?: string;
  /** `engagement` only — the previous page view's active-visible time and deepest scroll milestone reached. */
  engagementMs?: number;
  scrollDepth?: 25 | 50 | 75 | 90 | 100;
  /** `form_start` / `form_submit` / `form_error` only — a stable id, never the form's field values. */
  formId?: string;
  /** `form_error` only — which field failed, by name (e.g. "phone"), never its value. */
  formField?: string;
};

/**
 * A stored analytics event. `page_view` is the original (and still most
 * common) shape; the click and `engagement` variants reuse the same record
 * so one repository, one query, one `list()` serves all of them — `aggregate.ts`
 * is what tells them apart, by `eventName`.
 */
export type AnalyticsEvent = {
  id: string;
  schemaVersion: SchemaVersion;
  eventName: AnalyticsEventName;
  path: string;
  referrer?: string;
  referrerHost?: string;
  trafficSource: TrafficSource;
  device: DeviceCategory;
  sessionId: string;
  visitorId: string;
  pageViewId?: string;
  isNewSession: boolean;
  country?: string;
  browser?: string;
  os?: string;
  campaign?: string;
  elementId?: string;
  elementLabel?: string;
  destinationPath?: string;
  engagementMs?: number;
  scrollDepth?: 25 | 50 | 75 | 90 | 100;
  formId?: string;
  formField?: string;
  createdAt: string;
};

export type AnalyticsEventRepository = {
  driver: "file" | "firestore";
  save(event: AnalyticsEvent): Promise<void>;
  list(limit: number): Promise<AnalyticsEvent[]>;
};
