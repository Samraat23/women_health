"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import type { ClickEventName } from "@/features/analytics/core/types";
import { trackEvent } from "@/features/analytics/client/track";

/**
 * Site-wide click tracking via one delegated listener — mounted once in
 * `AppChrome`, instruments every `tel:`/`mailto:`/WhatsApp/external link
 * automatically, plus anything tagged `data-analytics-id` — with zero
 * changes to the dozens of components those links already live in.
 *
 * Deliberately does NOT track plain internal navigation clicks (the spec's
 * `internal_link_click`): the resulting `page_view` already records every
 * internal navigation, and tracking the click too would double-count it
 * without adding information a solo admin needs.
 */

const whatsappHostPattern = /(^|\.)(wa\.me|whatsapp\.com)$/i;
const maxLabelLength = 80;

function trackableAncestor(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;

  return target.closest<HTMLElement>("a[href], button, [data-analytics-id]");
}

function labelFor(element: HTMLElement): string | undefined {
  const explicit = element.getAttribute("data-analytics-label");

  if (explicit) return explicit.slice(0, maxLabelLength);

  const aria = element.getAttribute("aria-label");

  if (aria) return aria.slice(0, maxLabelLength);

  const text = (element.textContent || "").replace(/\s+/g, " ").trim();

  return text ? text.slice(0, maxLabelLength) : undefined;
}

function classify(
  element: HTMLElement
): { eventName: ClickEventName; destinationPath?: string } | null {
  const explicitId = element.getAttribute("data-analytics-id");

  if (element instanceof HTMLAnchorElement && element.href) {
    if (element.href.startsWith("tel:")) return { eventName: "phone_click" };
    if (element.href.startsWith("mailto:")) return { eventName: "email_click" };

    try {
      const url = new URL(element.href, window.location.href);

      if (whatsappHostPattern.test(url.hostname)) {
        return { eventName: "whatsapp_click", destinationPath: url.href };
      }

      if (url.hostname !== window.location.hostname) {
        return { eventName: "outbound_click", destinationPath: url.href };
      }

      // Internal link: only worth a click event if explicitly tagged a CTA.
      if (explicitId) return { eventName: "cta_click", destinationPath: url.pathname };

      return null;
    } catch {
      return explicitId ? { eventName: "cta_click" } : null;
    }
  }

  // A <button> or any element with data-analytics-id but no href.
  return explicitId ? { eventName: "cta_click" } : null;
}

export default function InteractionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    function onClick(event: MouseEvent) {
      const element = trackableAncestor(event.target);

      if (!element) return;

      const classified = classify(element);

      if (!classified) return;

      trackEvent({
        eventName: classified.eventName,
        path: pathname,
        elementId: element.getAttribute("data-analytics-id") || undefined,
        elementLabel: labelFor(element),
        destinationPath: classified.destinationPath,
      });
    }

    // Bubble phase: by the time this runs, the click has already done
    // whatever it does (navigate, open the chat widget, submit); tracking it
    // never risks intercepting or delaying the real interaction.
    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
