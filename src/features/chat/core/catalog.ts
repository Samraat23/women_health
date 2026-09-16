import type {
  ChatCatalog,
  ChatCategory,
  ChatConfig,
  ChatService,
  ConsultationTypeId,
} from "@/features/chat/core/types";

/**
 * A "topic" is whatever the patient picked as the reason for the visit: a
 * specific service (PCOS / PCOD) or a whole category (Pregnancy Care).
 */
export type ChatTopic =
  | { kind: "service"; service: ChatService; category: ChatCategory | null }
  | { kind: "category"; category: ChatCategory };

export function getService(catalog: ChatCatalog, id: string | undefined) {
  return id ? catalog.services.find((service) => service.id === id) ?? null : null;
}

export function getCategory(catalog: ChatCatalog, id: string | null | undefined) {
  return id ? catalog.categories.find((category) => category.id === id) ?? null : null;
}

export function getTopic(catalog: ChatCatalog, id: string | undefined): ChatTopic | null {
  const service = getService(catalog, id);

  if (service) {
    return { kind: "service", service, category: getCategory(catalog, service.categoryId) };
  }

  const category = getCategory(catalog, id);

  return category ? { kind: "category", category } : null;
}

export function isKnownTopic(catalog: ChatCatalog, id: string | undefined) {
  return Boolean(getTopic(catalog, id));
}

export function getTopicLabel(catalog: ChatCatalog, id: string | undefined, short = false) {
  const topic = getTopic(catalog, id);

  if (!topic) return "";
  if (topic.kind === "category") return topic.category.title;

  return short ? topic.service.shortTitle || topic.service.title : topic.service.title;
}

export function getTopicHref(catalog: ChatCatalog, id: string | undefined) {
  const topic = getTopic(catalog, id);

  if (!topic) return undefined;
  if (topic.kind === "category") return topic.category.href;

  return getServiceHref(topic.service);
}

export function getServiceHref(service: ChatService) {
  if (service.href) return service.href;

  return service.articleSlug ? `/${service.articleSlug}` : undefined;
}

export function getBrowsableServices(catalog: ChatCatalog, categoryId: string) {
  return catalog.services.filter(
    (service) => service.categoryId === categoryId && !service.bookingOnly
  );
}

/** Finds the service or category a site page is about, e.g. /pcos-pcod-doctor-in-gurgaon. */
export function findTopicByPath(catalog: ChatCatalog, pathname: string | null | undefined) {
  if (!pathname || pathname === "/") return null;

  const path = pathname.replace(/\/+$/, "");
  const service = catalog.services.find(
    (item) => !item.bookingOnly && item.articleSlug && `/${item.articleSlug}` === path
  );

  if (service) return service.id;

  if (path === "/pregnancy") return "pregnancy-care";
  if (path === "/surgery") return "laparoscopic-surgery";

  return catalog.categories.find((category) => category.href === path)?.id ?? null;
}

export function getConsultationType(config: ChatConfig, id: ConsultationTypeId | undefined) {
  return id
    ? config.settings.consultationTypes.find((type) => type.id === id && type.enabled) ?? null
    : null;
}

export function getTimeSlot(config: ChatConfig, id: string | undefined) {
  return id ? config.settings.availability.timeSlots.find((slot) => slot.id === id) ?? null : null;
}

export function getEnabledConsultationTypes(config: ChatConfig) {
  return config.settings.consultationTypes.filter((type) => type.enabled);
}

/** Replaces {placeholders} in configurable copy. Unknown placeholders are left as-is. */
export function fillTemplate(template: string, values: Record<string, string | number | undefined>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];

    return value === undefined || value === "" ? match : String(value);
  });
}

export function getFirstName(name: string | undefined) {
  return (name || "").trim().split(/\s+/)[0] || "";
}
