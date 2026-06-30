import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  BookOpenText,
  CalendarCheck,
  ClipboardList,
  Database,
  HeartPulse,
  Home,
  LayoutDashboard,
  MessageSquareText,
  PencilLine,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

type AdminVisualMeta = {
  icon: LucideIcon;
  color: string;
  background: string;
};

export type AdminStat = AdminVisualMeta & {
  label: string;
  value: string;
  detail: string;
};

export type AdminModule = AdminVisualMeta & {
  title: string;
  description: string;
  collection: string;
};

export type AdminNavigationItem = {
  name: string;
  icon: LucideIcon;
};

export const adminStats: AdminStat[] = [
  {
    label: "Website Sections",
    value: "8",
    detail: "Ready to manage",
    icon: LayoutDashboard,
    color: "text-[#4f46e5]",
    background: "bg-[#eef2ff]",
  },
  {
    label: "Care Pages",
    value: "3",
    detail: "Home, surgery, pregnancy",
    icon: HeartPulse,
    color: "text-[#be185d]",
    background: "bg-[#fdf2f8]",
  },
  {
    label: "Data Source",
    value: "JSON",
    detail: "Firebase next",
    icon: Database,
    color: "text-[#0f766e]",
    background: "bg-[#ecfdf5]",
  },
  {
    label: "Route Status",
    value: "Private",
    detail: "Middleware protected",
    icon: ShieldCheck,
    color: "text-[#b45309]",
    background: "bg-[#fffbeb]",
  },
];

export const adminModules: AdminModule[] = [
  {
    title: "Home Page",
    description: "Hero, doctor profile, services, videos and review sections.",
    collection: "home_sections",
    icon: Home,
    color: "text-[#4f46e5]",
    background: "bg-[#eef2ff]",
  },
  {
    title: "Surgery Services",
    description: "Endometriosis, fibroid, hysteroscopy and procedure pages.",
    collection: "surgery_services",
    icon: Stethoscope,
    color: "text-[#be185d]",
    background: "bg-[#fdf2f8]",
  },
  {
    title: "Pregnancy Guide",
    description: "Trimester care, week-by-week cards, food and vaccines.",
    collection: "pregnancy_guides",
    icon: Baby,
    color: "text-[#0f766e]",
    background: "bg-[#ecfdf5]",
  },
  {
    title: "Blogs & Articles",
    description: "Patient education articles, authors and featured content.",
    collection: "articles",
    icon: BookOpenText,
    color: "text-[#b45309]",
    background: "bg-[#fffbeb]",
  },
  {
    title: "Women Health Categories",
    description: "PCOS, menopause, vaccination, bleeding and preventive care.",
    collection: "health_categories",
    icon: Activity,
    color: "text-[#7c3aed]",
    background: "bg-[#f5f3ff]",
  },
  {
    title: "Appointments",
    description: "WhatsApp leads, consultation requests and callback notes.",
    collection: "appointments",
    icon: CalendarCheck,
    color: "text-[#0369a1]",
    background: "bg-[#e0f2fe]",
  },
  {
    title: "Testimonials",
    description: "Patient stories, review images and clinic trust content.",
    collection: "testimonials",
    icon: MessageSquareText,
    color: "text-[#c2410c]",
    background: "bg-[#fff7ed]",
  },
  {
    title: "Site Settings",
    description: "Phone, WhatsApp, address, SEO defaults and social links.",
    collection: "site_settings",
    icon: Settings,
    color: "text-[#475569]",
    background: "bg-[#f1f5f9]",
  },
];

export const adminNavigation: AdminNavigationItem[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Content", icon: PencilLine },
  { name: "Appointments", icon: ClipboardList },
  { name: "Patients", icon: Users },
  { name: "Settings", icon: Settings },
];

export const adminSetupSteps = [
  "Create Firebase project and enable Firestore",
  "Add protected admin users or Firebase Auth roles",
  "Map these modules to Firestore collections",
  "Replace local JSON reads with Firebase queries",
];
