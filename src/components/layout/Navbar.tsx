"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarHeart,
  ChevronDown,
  Grid3X3,
  Home,
  Menu,
  Scissors,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/ logo.png";
import NavbarPregnancyItem from "@/components/layout/NavbarPregnancyItem";
import type {
  HomeNavbarContent,
  HomeNavItem,
  HomeNavSubmenuType,
} from "@/types/homeContent";

type NavbarProps = {
  content?: HomeNavbarContent | null;
};

type RenderNavItem = {
  id: string;
  name: string;
  redirect: string;
  submenuType?: HomeNavSubmenuType;
  subMenu?: Array<{
    id: number;
    name: string;
    href?: string;
    links?: string[];
  }>;
};

const womenHealthSubMenu = [
  {
    id: 1,
    name: "We Treatment",
    links: [
      "Abnormal Bleeding",
      "Vaginal Infections",
      "Uterine Disorders",
      "Endometriosis",
      "Ovarian Cysts",
      "Fibroids",
    ],
  },
  {
    id: 2,
    name: "Young Women Care",
    links: [
      "Puberty & Menstrual Health",
      "Irregular Periods",
      "PCOS / PCOD",
      "Menstrual Pain",
      "Hygiene & Lifestyle Education",
    ],
  },
  {
    id: 3,
    name: "Prevent Women Health",
    links: [
      "Annual Checkup",
      "Pap Smear",
      "HPV Screening",
      "Breast Examination",
      "Cervical Cancer Examination",
    ],
  },
  {
    id: 4,
    name: "Menopause",
    links: [
      "Menopause Management",
      "Hormonal Imbalance",
      "Urinary Problem",
      "Osteoporosis",
      "Lifestyle Counselling",
    ],
  },
  {
    id: 5,
    name: "Vaccination",
    links: ["HPV Vaccination", "Flu", "Boostrix", "Tetanus"],
  },
];

const pregnancySubMenu = [
  { id: 1, name: "Week by Week", href: "/pregnancy#weekly-guide" },
  { id: 2, name: "Trimester Care", href: "/pregnancy#trimester-care" },
  { id: 3, name: "Food & Vaccines", href: "/pregnancy#food-care" },
];

const defaultNavbarContent: HomeNavbarContent = {
  logoUrl: "",
  appointmentLabel: "Book Appointment",
  appointmentUrl: "https://wa.me/919289140812",
  items: [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About", href: "/about-us" },
    { id: "endometriosis", label: "Endometriosis", href: "/endometriosis-treatment" },
    {
      id: "women-health",
      label: "Women Health",
      href: "/category/young-women-care",
      submenuType: "womenHealth",
    },
    { id: "surgery", label: "Surgery", href: "/surgery" },
    {
      id: "pregnancy",
      label: "Pregnancy",
      href: "/pregnancy",
      submenuType: "pregnancy",
    },
  ],
};

function getSubMenu(type?: HomeNavSubmenuType) {
  if (type === "womenHealth") return womenHealthSubMenu;
  if (type === "pregnancy") return pregnancySubMenu;

  return undefined;
}

function toRenderItems(items: HomeNavItem[]): RenderNavItem[] {
  return items.map((item) => ({
    id: item.id,
    name: item.label,
    redirect: item.href,
    submenuType: item.submenuType,
    subMenu: getSubMenu(item.submenuType),
  }));
}

type MobileNavItem = {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
  isPrimary?: boolean;
  external?: boolean;
  isMore?: boolean;
};

function Navbar({ content }: NavbarProps) {
  const pathname = usePathname();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarContent = content || defaultNavbarContent;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuBar = useMemo(
    () =>
      toRenderItems(
        navbarContent.items.length ? navbarContent.items : defaultNavbarContent.items
      ),
    [navbarContent.items]
  );

  const activeItem = menuBar.find((item) => item.id === activeMenuId);
  const logoSrc = navbarContent.logoUrl || logo;
  const appointmentUrl =
    navbarContent.appointmentUrl || defaultNavbarContent.appointmentUrl;
  const appointmentLabel =
    navbarContent.appointmentLabel || defaultNavbarContent.appointmentLabel;
  const mobileNavItems: MobileNavItem[] = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "services", label: "Services", href: "/#services", icon: Stethoscope },
    {
      id: "appointment",
      label: "Book",
      href: appointmentUrl,
      icon: CalendarHeart,
      isPrimary: true,
      external: true,
    },
    { id: "surgery", label: "Surgery", href: "/surgery", icon: Scissors },
    { id: "more", label: "More", icon: Grid3X3, isMore: true },
  ];

  const isMobileNavActive = (item: MobileNavItem) => {
    if (item.isMore) return isMobileMenuOpen;
    if (!item.href) return false;
    if (item.id === "home") return pathname === "/";
    if (item.id === "services") return pathname.startsWith("/category");

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };
  const mobileSurfaceClass = isScrolled
    ? "border-white/70 bg-white/80 text-[var(--primary-text-color)] shadow-[0_14px_30px_rgba(27,20,99,0.14)]"
    : "border-white/45 bg-white/20 text-white shadow-[0_14px_30px_rgba(27,20,99,0.16)]";

  return (
    <>
      <header
        className="fixed left-0 top-0 z-[120] w-[100dvw] max-w-[100dvw] md:hidden"
      >
        <div className="px-5 pt-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              aria-label="Go to home"
              className={`relative h-14 w-14  overflow-hidden rounded-full border  backdrop-blur-2xl transition-all duration-300 ${mobileSurfaceClass}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src={logoSrc}
                alt="Dr. Kusum Gynae Centre"
                fill
                className="object-contain p-2.5"
              />
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close more menu" : "Open more menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className={`grid h-14 w-14 place-items-center rounded-full border bg-red-600 transition-all duration-300 active:scale-95 ${mobileSurfaceClass}`}
            >
              {isMobileMenuOpen ? <X size={23} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <header
        className={`fixed left-1/2 top-5 z-[100] hidden w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 rounded-[36px] border px-8 transition-all duration-300 md:block ${
          isScrolled
            ? "border-white/50 bg-white/90 py-2 shadow-[0_14px_34px_rgba(27,20,99,0.18)] backdrop-blur-2xl md:bg-white/75"
            : "border-white/25 bg-white/15 py-2.5 shadow-[0_12px_30px_rgba(27,20,99,0.16)] backdrop-blur-2xl md:bg-white/10 md:py-3"
        }`}
        onMouseLeave={() => setActiveMenuId(null)}
      >
        <div className="relative flex min-h-14 items-center justify-between gap-3 md:gap-8">
          <div
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/60 transition-all duration-300 md:h-18 md:w-18 ${
              isScrolled ? "bg-white/90" : "bg-white/95"
            }`}
          >
            <Link href="/" aria-label="Go to home">
              <Image
                src={logoSrc}
                alt="Dr. Kusum Gynae Centre"
                fill
                className="object-contain p-2"
              />
            </Link>
          </div>

          <div
            className={`hidden items-center gap-8 text-sm font-black transition-colors md:flex lg:gap-10 ${
              isScrolled ? "text-[var(--primary-text-color)]" : "text-white"
            }`}
          >
            {menuBar.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => item.subMenu && setActiveMenuId(item.id)}
                className={`group flex cursor-pointer items-center gap-1 transition-colors ${
                  isScrolled
                    ? "hover:text-[var(--primary-color)]"
                    : "hover:text-white/70"
                }`}
              >
                <Link href={item.redirect}>{item.name}</Link>
                {item.subMenu && (
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180 group-hover:scale-120"
                  />
                )}
              </div>
            ))}
          </div>

          <Link
            href={appointmentUrl}
            target="_blank"
            rel="noreferrer"
            className={`hidden shrink-0 rounded-full px-8 py-3.5 text-sm font-black uppercase tracking-wide shadow-[0_10px_24px_rgba(90,79,254,0.28)] transition hover:-translate-y-0.5 md:inline-flex ${
              isScrolled
                ? "bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white"
                : "bg-white text-[var(--primary-text-color)]"
            }`}
          >
            {appointmentLabel}
          </Link>
        </div>

        <AnimatePresence>
          {activeItem?.subMenu && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 top-full z-50 mx-auto mt-4 w-full -translate-x-1/2 rounded-3xl bg-(--secondary-text) shadow-2xl backdrop-blur-xl"
            >
              <div className="flex justify-between px-10 py-8">
                {activeItem.submenuType !== "womenHealth" &&
                  activeItem.subMenu.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.href || sub.name}
                      className="rounded-xl px-4 py-2 font-black text-white"
                    >
                      {sub.name}
                    </Link>
                  ))}

                {activeItem.submenuType === "womenHealth" && (
                  <NavbarPregnancyItem Menu={{ subMenu: activeItem.subMenu }} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 bottom-[calc(74px+env(safe-area-inset-bottom))] z-[118] overflow-hidden rounded-[28px] border border-white/10 bg-[#11162b]/96 p-3 shadow-[0_24px_70px_rgba(6,10,28,0.4)] backdrop-blur-2xl md:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {menuBar.map((item) => (
                <Link
                  key={item.id}
                  href={item.redirect}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black text-white/85 transition active:scale-[0.98]"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={appointmentUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="col-span-2 rounded-2xl bg-[linear-gradient(135deg,var(--primary-color),#3aa7ff)] px-5 py-3 text-center text-sm font-black text-white shadow-[0_14px_30px_rgba(90,79,254,0.28)]"
              >
                {appointmentLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Mobile primary navigation"
        className="fixed bottom-0 left-0 z-[115] w-[100dvw] max-w-[100dvw] md:hidden"
      >
        <div className="  border-white/20 bg-(--secondary-text) mx-2 border-2 px-3 py-2 rounded-2xl  pb-[calc(0.55rem+env(safe-area-inset-bottom))] backdrop-blur-2xl shadow-[0_-14px_36px_rgba(27,20,99,0.14)] ">
          <div className="grid grid-cols-5 place-items-center gap-1.5">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMobileNavActive(item);
            const itemClass = `relative flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-xl transition active:scale-95 ${
              isActive
                ? "border-white/70 bg-white/85 text-[var(--primary-color)] shadow-[0_10px_24px_rgba(27,20,99,0.14)]"
                : item.isPrimary
                  ? "border-white/45 bg-[var(--primary-color)]/80 text-white shadow-[0_10px_24px_rgba(90,79,254,0.18)]"
                  : "border-white/35 bg-white/18 text-white hover:bg-white/28"
            }`;
            const content = (
              <>
                <span className="grid h-7 w-7 place-items-center rounded-xl">
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.7 : 1.9}
                  />
                </span>
                <span className="sr-only">{item.label}</span>
              </>
            );

            if (item.isMore) {
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={isMobileMenuOpen ? "Close more menu" : "Open more menu"}
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((value) => !value)}
                  className={itemClass}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href || "/"}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                aria-label={item.label === "Book" ? "Book appointment" : item.label}
                onClick={() => setIsMobileMenuOpen(false)}
                className={itemClass}
              >
                {content}
              </Link>
            );
          })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
