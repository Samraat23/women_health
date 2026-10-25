import {
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  FileWarning,
  Mail,
  MessageCircle,
  MousePointerClick,
  Phone,
  SendHorizontal,
  type LucideIcon,
} from "lucide-react";

import type { AnalyticsEventName, ClickEventName } from "@/features/analytics/core/types";

/** Shared across the Analytics page, the Session Explorer and the Event Explorer. */
export const clickEventLabels: Record<ClickEventName, string> = {
  cta_click: "CTA / button clicks",
  outbound_click: "Outbound link clicks",
  phone_click: "Phone number clicks",
  whatsapp_click: "WhatsApp clicks",
  email_click: "Email clicks",
};

export const clickEventIcons: Record<ClickEventName, LucideIcon> = {
  cta_click: MousePointerClick,
  outbound_click: ExternalLink,
  phone_click: Phone,
  whatsapp_click: MessageCircle,
  email_click: Mail,
};

export const eventNameLabels: Record<AnalyticsEventName, string> = {
  page_view: "Page view",
  engagement: "Engagement",
  cta_click: "CTA click",
  outbound_click: "Outbound click",
  phone_click: "Phone click",
  whatsapp_click: "WhatsApp click",
  email_click: "Email click",
  form_start: "Form started",
  form_submit: "Form submitted",
  form_error: "Form error",
};

export const eventNameIcons: Record<AnalyticsEventName, LucideIcon> = {
  page_view: Eye,
  engagement: Clock3,
  cta_click: MousePointerClick,
  outbound_click: ExternalLink,
  phone_click: Phone,
  whatsapp_click: MessageCircle,
  email_click: Mail,
  form_start: SendHorizontal,
  form_submit: SendHorizontal,
  form_error: FileWarning,
};

export function eventNameLabel(name: AnalyticsEventName): string {
  return eventNameLabels[name] ?? name;
}

export function eventNameIcon(name: AnalyticsEventName): LucideIcon {
  return eventNameIcons[name] ?? CircleHelp;
}
