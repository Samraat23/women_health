"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
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

const logo = "/image/dr-kusum-gynae-centre-logo.png";
import NavbarPregnancyItem from "@/components/layout/NavbarPregnancyItem";
import { getTopicHref } from "@/lib/topicRoutes";
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

// Vertical space the floating navbar occupies, used to work out what sits behind it.
const NAV_SURFACE_HEIGHT = 108;

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

type SubLink = {
  key: string;
  label: string;
  href: string;
};

// The desktop dropdown renders grouped columns; the mobile sheet needs the
// same destinations as a flat list, so resolve both from one place.
function getSubLinks(item: RenderNavItem): SubLink[] {
  if (!item.subMenu) return [];

  return item.subMenu.flatMap((group) =>
    group.links?.length
      ? group.links.map((link) => ({
          key: `${group.id}-${link}`,
          label: link,
          href: getTopicHref(link),
        }))
      : [
          {
            key: `${group.id}`,
            label: group.name,
            href: group.href || getTopicHref(group.name),
          },
        ]
  );
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
  const [isOverDarkHero, setIsOverDarkHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroupId, setOpenMobileGroupId] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);
  const navbarContent = content || defaultNavbarContent;

  useEffect(() => {
    let frame = 0;

    const readNavSurface = () => {
      setIsScrolled(window.scrollY > 24);

      const hero = document.querySelector<HTMLElement>(
        '[data-nav-surface="dark"]'
      );

      // Pages without a dark hero keep the solid navbar so it never blends
      // into the light page background.
      if (!hero) {
        setIsOverDarkHero(false);

        return;
      }

      // Heroes fade into the page background across their lower half, so only
      // the solid upper part counts as a dark surface behind the navbar.
      const { bottom, height } = hero.getBoundingClientRect();
      setIsOverDarkHero(bottom - height * 0.35 > NAV_SURFACE_HEIGHT);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(readNavSurface);
    };

    handleScroll();

    // A route change can stream the next hero in after this effect has run.
    const timers = [0, 150, 450].map((delay) =>
      window.setTimeout(readNavSurface, delay)
    );

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  // A finished navigation must never leave the dropdown or the mobile sheet
  // hanging over the new page. Adjusting during render (rather than in an
  // effect) closes them before the new page paints.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setActiveMenuId(null);
    setIsMobileMenuOpen(false);
    setOpenMobileGroupId(null);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setActiveMenuId(null);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
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
  // Translucent white-on-dark styling is only safe while the navbar actually
  // sits on top of a dark hero; everywhere else it needs a solid surface.
  const isTransparent = isOverDarkHero;
  const mobileSurfaceClass = isTransparent
    ? "border-white/45 bg-white/20 text-white shadow-[0_14px_30px_rgba(27,20,99,0.16)]"
    : "border-[var(--primary-color)]/12 bg-white/92 text-[var(--primary-text-color)] shadow-[0_14px_30px_rgba(27,20,99,0.14)]";

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
              className={`grid h-14 w-14 place-items-center rounded-full border backdrop-blur-2xl transition-all duration-300 active:scale-95 ${mobileSurfaceClass}`}
            >
              {isMobileMenuOpen ? <X size={23} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <header
        className={`fixed left-1/2 top-5 z-[100] hidden w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 rounded-[36px] border px-8 transition-all duration-300 md:block ${
          isTransparent
            ? "border-white/25 bg-white/15 py-2.5 shadow-[0_12px_30px_rgba(27,20,99,0.16)] backdrop-blur-2xl md:bg-white/10 md:py-3"
            : `border-[var(--primary-color)]/12 bg-white/92 py-2 backdrop-blur-2xl md:bg-white/90 ${
                isScrolled
                  ? "shadow-[0_16px_38px_rgba(27,20,99,0.16)]"
                  : "shadow-[0_10px_26px_rgba(27,20,99,0.10)]"
              }`
        }`}
        onMouseLeave={() => setActiveMenuId(null)}
      >
        <div className="relative flex min-h-14 items-center justify-between gap-3 md:gap-8">
          <div
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/60 transition-all duration-300 md:h-18 md:w-18 ${
              isTransparent ? "bg-white/95" : "bg-white"
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
              isTransparent
                ? "text-white [text-shadow:0_1px_12px_rgba(15,10,60,0.45)]"
                : "text-[var(--primary-text-color)]"
            }`}
          >
            {menuBar.map((item) => {
              const isOpen = activeMenuId === item.id;

              return (
                <div
                  key={item.id}
                  // Moving onto an item without a submenu has to close whatever
                  // dropdown is open, otherwise it stays stuck over the page.
                  onMouseEnter={() =>
                    setActiveMenuId(item.subMenu ? item.id : null)
                  }
                  className={`group flex cursor-pointer items-center gap-1 transition-colors ${
                    isTransparent
                      ? "hover:text-white/70"
                      : "hover:text-[var(--primary-color)]"
                  }`}
                >
                  <Link
                    href={item.redirect}
                    onFocus={() =>
                      setActiveMenuId(item.subMenu ? item.id : null)
                    }
                    onClick={() => setActiveMenuId(null)}
                  >
                    {item.name}
                  </Link>
                  {item.subMenu && (
                    <button
                      type="button"
                      // Tablets and keyboards never fire hover, so the arrow is
                      // the accessible way into the submenu.
                      aria-label={`${item.name} submenu`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setActiveMenuId((current) =>
                          current === item.id ? null : item.id
                        )
                      }
                      className="flex items-center"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180 scale-120" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href={appointmentUrl}
            target="_blank"
            rel="noreferrer"
            className={`hidden shrink-0 rounded-full px-8 py-3.5 text-sm font-black uppercase tracking-wide shadow-[0_10px_24px_rgba(90,79,254,0.28)] transition hover:-translate-y-0.5 md:inline-flex ${
              isTransparent
                ? "bg-white text-[var(--primary-text-color)]"
                : "bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white"
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
              // The offset below the navbar is padding, not margin: it keeps the
              // gap inside the header so travelling into the panel never leaves
              // the hover area.
              className="absolute left-1/2 top-full z-50 mx-auto w-full -translate-x-1/2 pt-4"
              onMouseEnter={() => setActiveMenuId(activeItem.id)}
            >
              <div className="rounded-3xl bg-(--secondary-text) shadow-2xl backdrop-blur-xl">
                <div className="flex justify-between px-10 py-8">
                  {activeItem.submenuType !== "womenHealth" &&
                    activeItem.subMenu.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href || getTopicHref(sub.name)}
                        onClick={() => setActiveMenuId(null)}
                        className="rounded-xl px-4 py-2 font-black text-white"
                      >
                        {sub.name}
                      </Link>
                    ))}

                  {activeItem.submenuType === "womenHealth" && (
                    <NavbarPregnancyItem
                      Menu={{ subMenu: activeItem.subMenu }}
                      onNavigate={() => setActiveMenuId(null)}
                    />
                  )}
                </div>
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
            className="fixed inset-x-4 bottom-[calc(74px+env(safe-area-inset-bottom))] z-[118] max-h-[70dvh] overflow-y-auto overscroll-contain rounded-[28px] border border-white/10 bg-[#11162b]/96 p-3 shadow-[0_24px_70px_rgba(6,10,28,0.4)] backdrop-blur-2xl md:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {menuBar.map((item) => {
                const subLinks = getSubLinks(item);
                const isGroupOpen = openMobileGroupId === item.id;

                return (
                  <Fragment key={item.id}>
                    <div className="flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
                      <Link
                        href={item.redirect}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 px-4 py-3 text-sm font-black text-white/85 transition active:scale-[0.98]"
                      >
                        {item.name}
                      </Link>
                      {subLinks.length > 0 && (
                        <button
                          type="button"
                          // Without this the phone menu had no route at all into
                          // the category and treatment pages.
                          aria-label={`${item.name} topics`}
                          aria-expanded={isGroupOpen}
                          onClick={() =>
                            setOpenMobileGroupId((current) =>
                              current === item.id ? null : item.id
                            )
                          }
                          className="grid w-11 shrink-0 place-items-center border-l border-white/10 text-white/70 transition active:scale-95"
                        >
                          <ChevronDown
                            size={17}
                            className={`transition-transform duration-200 ${
                              isGroupOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {isGroupOpen && subLinks.length > 0 && (
                      <div className="col-span-2 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                        {subLinks.map((subLink) => (
                          <Link
                            key={subLink.key}
                            href={subLink.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-xl px-3 py-2.5 text-xs font-bold leading-4 text-white/75 transition active:scale-[0.98]"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </Fragment>
                );
              })}
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
