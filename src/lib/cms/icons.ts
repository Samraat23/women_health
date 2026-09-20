import {
  Activity,
  Apple,
  Baby,
  BadgeCheck,
  CalendarCheck,
  CalendarHeart,
  FileText,
  FlaskConical,
  Heart,
  HeartPulse,
  Hospital,
  Image as ImageIcon,
  LayoutDashboard,
  Leaf,
  Menu,
  MessagesSquare,
  Microscope,
  Moon,
  PanelBottom,
  Salad,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  TimerReset,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Lucide icons referenced by content, addressed by name.
 *
 * The seed data in `@/data/SurgeryServices` and `@/data/PregnancyGuide` stores
 * icons as imported React components. A component cannot be written to
 * Firestore or round-tripped through JSON, so content documents store the
 * *name* instead and rendering resolves it back through this registry.
 *
 * Adding an icon here is the only step needed to make it selectable in the
 * admin panel's icon picker.
 */
export const contentIcons = {
  Activity,
  Apple,
  Baby,
  BadgeCheck,
  CalendarCheck,
  CalendarHeart,
  FileText,
  FlaskConical,
  Heart,
  HeartPulse,
  Hospital,
  Image: ImageIcon,
  LayoutDashboard,
  Leaf,
  Menu,
  MessagesSquare,
  Microscope,
  Moon,
  PanelBottom,
  Salad,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  TimerReset,
  Users,
} satisfies Record<string, LucideIcon>;

export type ContentIconName = keyof typeof contentIcons;

export const contentIconNames = Object.keys(contentIcons) as ContentIconName[];

/** Rendered when a document names an icon that is not in the registry. */
const fallbackIcon: LucideIcon = Sparkles;

export function isContentIconName(value: unknown): value is ContentIconName {
  return typeof value === "string" && value in contentIcons;
}

/** Name -> component. Never throws; unknown names render the fallback. */
export function resolveContentIcon(name: unknown): LucideIcon {
  return isContentIconName(name) ? contentIcons[name] : fallbackIcon;
}

/**
 * Component -> name, for the one-time migration of the compiled-in seed data.
 *
 * Lucide sets `displayName` on every icon, so this matches on identity first
 * and falls back to the display name for icons re-exported under an alias.
 */
export function serializeContentIcon(icon: unknown): ContentIconName | null {
  if (typeof icon === "string") {
    return isContentIconName(icon) ? icon : null;
  }

  if (typeof icon !== "function" && typeof icon !== "object") {
    return null;
  }

  for (const [name, candidate] of Object.entries(contentIcons)) {
    if (candidate === icon) {
      return name as ContentIconName;
    }
  }

  const displayName = (icon as { displayName?: string })?.displayName;

  return isContentIconName(displayName) ? displayName : null;
}
