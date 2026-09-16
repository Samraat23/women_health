import {
  Activity,
  Baby,
  BadgeCheck,
  CalendarHeart,
  ChevronLeft,
  HeartPulse,
  LayoutGrid,
  MessageSquareText,
  Microscope,
  PhoneCall,
  Plus,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Sun,
  SunMedium,
  Sunrise,
  Sunset,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

// Category icons match the ones on the site's category pages.
const icons: Record<string, LucideIcon> = {
  calendar: CalendarHeart,
  video: Video,
  audio: PhoneCall,
  inquiry: MessageSquareText,
  explore: LayoutGrid,
  menu: LayoutGrid,
  clinic: Stethoscope,
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  back: ChevronLeft,
  more: Plus,
  retry: RotateCcw,
  pregnancy: Baby,
  fertility: HeartPulse,
  youngWomen: Users,
  surgery: Microscope,
  preventive: BadgeCheck,
  hormonal: Activity,
  menopause: SunMedium,
  intimate: ShieldCheck,
};

export default function ChatIcon({
  name,
  size = 16,
  className,
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  if (!name) return null;

  if (name === "whatsapp") {
    return <WhatsAppIcon className={className} />;
  }

  const Icon = icons[name];

  return Icon ? <Icon size={size} aria-hidden="true" className={className} /> : null;
}
