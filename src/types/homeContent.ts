export type HomeNavSubmenuType = "pregnancy" | "womenHealth";

export type HomeNavItem = {
  id: string;
  label: string;
  href: string;
  submenuType?: HomeNavSubmenuType;
};

export type HomeNavbarContent = {
  logoUrl: string;
  appointmentLabel: string;
  appointmentUrl: string;
  items: HomeNavItem[];
};

export type HomeHeroContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  imageUrl: string;
  imageAlt: string;
  doctorName: string;
  doctorMeta: string;
};

export type HomeTrainerImage = {
  id: string;
  img: string;
  alt: string;
};

export type HomeTrainerContent = {
  subtitle: string;
  title: string;
  description: string;
  primaryCta: string;
  primaryCtaUrl: string;
  secondaryCta: string;
  secondaryCtaUrl: string;
  images: HomeTrainerImage[];
};

export type HomePageContent = {
  navbar: HomeNavbarContent;
  hero: HomeHeroContent;
  trainer: HomeTrainerContent;
};
