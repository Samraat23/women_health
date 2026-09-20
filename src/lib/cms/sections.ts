/**
 * Section-wise registry for `cms_sections`.
 *
 * Every editable block of the marketing site is one document, keyed by the ids
 * below. The registry is the single source of truth for:
 *
 *   - which admin module owns the section,
 *   - which built-in file seeds it,
 *   - what the admin panel labels it.
 *
 * Two source files feed this. `homePageContent.json` is the one the previous
 * admin already wrote to (navbar, hero, trainer); `siteData.json` holds
 * everything else. Where both define a block, homePageContent wins because it
 * is what the live page renders today.
 */

export type SectionSourceFile = "homePageContent" | "siteData" | "inline";

export type CmsSectionDefinition = {
  id: string;
  label: string;
  description: string;
  /** Admin module whose screen edits this section. */
  moduleId: string;
  sourceFile: SectionSourceFile;
  /** Key within the source file. Defaults to the section id. */
  sourceKey?: string;
  /**
   * Starting content for a section with no source file.
   *
   * Sections added by the admin panel itself (site-wide SEO defaults, for
   * instance) have nothing to migrate from, so they ship their blank shape
   * here. The editor infers its fields from this, which is also why the
   * defaults are fully populated keys rather than an empty object.
   */
  defaultContent?: unknown;
};

export const cmsSectionDefinitions: CmsSectionDefinition[] = [
  // --------------------------------------------------------------- navbar
  {
    id: "navbar",
    label: "Navbar",
    description: "Logo, menu items, and the appointment button.",
    moduleId: "navbar",
    sourceFile: "homePageContent",
  },

  // ----------------------------------------------------------------- home
  {
    id: "hero",
    label: "Hero",
    description: "Headline, description, CTAs, and doctor credit.",
    moduleId: "home",
    sourceFile: "homePageContent",
  },
  {
    id: "trainer",
    label: "Trainer",
    description: "Laparoscopic training block and its image gallery.",
    moduleId: "home",
    sourceFile: "homePageContent",
  },
  {
    id: "why-choose-us",
    label: "Why Choose Us",
    description: "Badge, highlights, features, and CTA.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "whyChooseUs",
  },
  {
    id: "services",
    label: "Services",
    description: "The eight service cards on the home page.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "service",
  },
  {
    id: "whealth-categories",
    label: "WHealth Categories",
    description: "Women's health category tiles.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "WHealth",
  },
  {
    id: "laparoscopic-surgery",
    label: "Laparoscopic Surgery",
    description: "Surgery highlight block on the home page.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "LaparoscopicSurgery",
  },
  {
    id: "testimonial",
    label: "Patient Reviews",
    description: "Google rating, avatars, and review cards.",
    moduleId: "home",
    sourceFile: "siteData",
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Home page questions and answers.",
    moduleId: "home",
    sourceFile: "siteData",
  },
  {
    id: "associations",
    label: "Associations",
    description: "Hospital and institution logos.",
    moduleId: "home",
    sourceFile: "siteData",
  },
  {
    id: "doctor-detail",
    label: "Doctor Details",
    description: "Credential and achievement list.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "doctorDetail",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Clinic and doctor photo strip.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "KusumImage",
  },
  {
    id: "blogs-preview",
    label: "Recent Blogs",
    description: "Featured posts shown on the home page.",
    moduleId: "home",
    sourceFile: "siteData",
    sourceKey: "blogs",
  },

  // --------------------------------------------------------------- footer
  {
    id: "footer",
    label: "Footer",
    description: "Footer description, link columns, and sub-footer.",
    moduleId: "footer",
    sourceFile: "siteData",
  },

  // ------------------------------------------------------------------ seo
  //
  // Per-article SEO is edited on the article itself. These are the site-wide
  // defaults a page falls back to when it has none of its own.
  {
    id: "seo-defaults",
    label: "Site SEO defaults",
    description:
      "Fallback title, description, and social image for pages without their own.",
    moduleId: "seo",
    sourceFile: "inline",
    defaultContent: {
      siteName: "Dr. Kusum Lata Bhardwaj",
      titleTemplate: "%s | Dr. Kusum Lata Bhardwaj",
      defaultTitle:
        "Best Gynecologist for Women's Health | Dr. Kusum Lata Bhardwaj",
      defaultDescription:
        "Dr. Kusum Lata Bhardwaj provides expert gynecology, pregnancy care, infertility treatment, endometriosis care, and advanced laparoscopic surgery for women's health.",
      canonicalBase: "https://drkusumlata.in",
      ogImage: "/image/dr-kusum-lata-bhardwaj.jpg",
      twitterHandle: "",
      robots: "index, follow",
    },
  },
  {
    id: "seo-verification",
    label: "Search console & analytics",
    description: "Verification tags and analytics identifiers.",
    moduleId: "seo",
    sourceFile: "inline",
    defaultContent: {
      googleSiteVerification: "",
      bingSiteVerification: "",
      googleAnalyticsId: "G-ZX7VN8155C",
    },
  },
];

export function getCmsSection(sectionId: string) {
  return cmsSectionDefinitions.find((section) => section.id === sectionId);
}

export function getSectionsForModule(moduleId: string) {
  return cmsSectionDefinitions.filter(
    (section) => section.moduleId === moduleId
  );
}

export const cmsSectionIds = cmsSectionDefinitions.map((section) => section.id);
