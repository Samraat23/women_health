import type { LucideIcon } from "lucide-react";
import {
  Award,
  Baby,
  BadgeCheck,
  Building2,
  ClipboardList,
  DatabaseZap,
  FileText,
  FolderTree,
  HelpCircle,
  Images,
  LayoutDashboard,
  Menu,
  MessageSquareQuote,
  MessagesSquare,
  Newspaper,
  PanelBottom,
  Scissors,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  UserCircle,
  Users,
} from "lucide-react";

import { cmsCollections } from "./collections";
import { cmsSectionDefinitions } from "./sections";

/**
 * The admin panel's navigation model.
 *
 * Every editable block of the website is its own sidebar entry — Navbar, Hero,
 * Trainer, Why Choose Us, Footer and the rest — rather than one "Home" screen
 * stacking a dozen editors together. The website group is therefore generated
 * from the section registry: adding a section to `cmsSectionDefinitions` gives
 * it a sidebar entry and a working editor with no other change.
 */

export type AdminModuleGroupId =
  | "website"
  | "content"
  | "support"
  | "platform";

export type AdminModule = {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  group: AdminModuleGroupId;
  /** Collection this module reads and writes, when it maps to exactly one. */
  collection?: string;
  /** Set when the module edits a single `cms_sections` document. */
  sectionId?: string;
  hidden?: boolean;
};

export const adminModuleGroups: Array<{
  id: AdminModuleGroupId;
  label: string;
}> = [
  { id: "website", label: "Website Modules" },
  { id: "content", label: "Content & Catalog" },
  { id: "support", label: "Support" },
  { id: "platform", label: "Platform" },
];

/**
 * Sidebar icon per section.
 *
 * Kept here rather than in the section registry so that registry stays plain
 * data and does not pull lucide-react into the server-side seed path.
 */
const sectionIcons: Record<string, LucideIcon> = {
  navbar: Menu,
  hero: Sparkles,
  trainer: Award,
  "why-choose-us": BadgeCheck,
  services: Stethoscope,
  "whealth-categories": Users,
  "laparoscopic-surgery": Scissors,
  testimonial: MessageSquareQuote,
  faq: HelpCircle,
  associations: Building2,
  "doctor-detail": Star,
  gallery: Images,
  "blogs-preview": Newspaper,
  footer: PanelBottom,
};

/** Route for the screen that edits one section. */
export function sectionHref(sectionId: string) {
  return `/admin/section/${sectionId}`;
}

const dashboardModule: AdminModule = {
  id: "dashboard",
  label: "Dashboard",
  href: "/admin/dashboard",
  description: "Content health, recent edits, and what still needs review.",
  icon: LayoutDashboard,
  group: "website",
};

/**
 * One sidebar entry per website section, in registry order.
 *
 * SEO sections are excluded: they belong to the SEO module in the content
 * group, not to the website list.
 */
const websiteSectionModules: AdminModule[] = cmsSectionDefinitions
  .filter((section) => section.moduleId !== "seo")
  .map((section) => ({
    id: section.id,
    label: section.label,
    href: sectionHref(section.id),
    description: section.description,
    icon: sectionIcons[section.id] || FileText,
    group: "website" as const,
    collection: cmsCollections.sections,
    sectionId: section.id,
  }));

export const adminModules: AdminModule[] = [
  dashboardModule,
  ...websiteSectionModules,

  // ------------------------------------------------------ content & catalog
  {
    id: "categories",
    label: "Categories",
    href: "/admin/categories",
    description: "Gynecology categories and the articles in each.",
    icon: FolderTree,
    group: "content",
    collection: cmsCollections.categories,
  },
  {
    id: "articles",
    label: "Blog & Articles",
    href: "/admin/articles",
    description: "Article copy, sections, FAQs, and SEO for every post.",
    icon: FileText,
    group: "content",
    collection: cmsCollections.articles,
  },
  {
    id: "pregnancy",
    label: "Pregnancy Guide",
    href: "/admin/pregnancy",
    description: "Trimesters, week-by-week guide, vaccines, and nutrition.",
    icon: Baby,
    group: "content",
    collection: cmsCollections.pregnancy,
  },
  {
    id: "surgery",
    label: "Surgery Services",
    href: "/admin/surgery",
    description: "Procedures, benefits, and the surgery landing page.",
    icon: Stethoscope,
    group: "content",
    collection: cmsCollections.surgery,
  },
  {
    id: "media",
    label: "Media Library",
    href: "/admin/media",
    description: "Images used across the site, with upload and replace.",
    icon: Images,
    group: "content",
    collection: cmsCollections.media,
  },
  {
    id: "seo",
    label: "SEO",
    href: "/admin/seo",
    description: "Site-wide titles, descriptions, and verification tags.",
    icon: Search,
    group: "content",
    collection: cmsCollections.sections,
  },

  // ------------------------------------------------------------- support
  {
    id: "chat-requests",
    label: "Chat Requests",
    href: "/admin/chat-requests",
    description: "Appointment requests and inquiries from the website chat.",
    icon: ClipboardList,
    group: "support",
  },
  {
    id: "chat",
    label: "Chat Assistant",
    href: "/admin/chat",
    description: "Assistant copy, services, intents, and availability.",
    icon: MessagesSquare,
    group: "support",
    collection: cmsCollections.chat,
  },

  // ------------------------------------------------------------- platform
  {
    id: "migration",
    label: "Data Migration",
    href: "/admin",
    description: "Import the built-in content into Firestore, section by section.",
    icon: DatabaseZap,
    group: "platform",
  },
  {
    id: "profile",
    label: "My Profile",
    href: "/admin/profile",
    description: "Signed-in account, session, and Firebase connection status.",
    icon: UserCircle,
    group: "platform",
  },
];

export function getAdminModule(moduleId: string) {
  return adminModules.find((moduleItem) => moduleItem.id === moduleId);
}

export function getAdminModulesByGroup(group: AdminModuleGroupId) {
  return adminModules.filter(
    (moduleItem) => moduleItem.group === group && !moduleItem.hidden
  );
}
