const topicHrefMap: Record<string, string> = {
  "Abnormal Bleeding": "/menstrual-cycle-problems",
  "Vaginal Infections": "/vaginal-infection-treatment",
  "Uterine Disorders": "/fibroid-removal-surgery",
  Endometriosis: "/endometriosis-treatment",
  "Ovarian Cysts": "/ovarian-cyst-surgery",
  Fibroids: "/fibroid-removal-surgery",
  "Puberty & Menstrual Health": "/teenage-gynecology-care",
  "Irregular Periods": "/irregular-periods-treatment",
  "PCOS / PCOD": "/pcod-pcos-treatment",
  "Menstrual Pain": "/menstrual-cycle-problems",
  "Hygiene & Lifestyle Education": "/teenage-gynecology-care",
  "Annual Checkup": "/regular-gynecology-checkup",
  "Pap Smear": "/cervical-cancer-screening",
  "HPV Screening": "/cervical-cancer-screening",
  "Breast Examination": "/breast-health-checkup",
  "Cervical Cancer Examination": "/cervical-cancer-screening",
  "Menopause Management": "/menopause-management",
  "Hormonal Imbalance": "/category/hormonal-imbalance",
  "Urinary Problem": "/urinary-tract-infection-women",
  Osteoporosis: "/bone-health-after-menopause",
  "Lifestyle Counselling": "/menopause-management",
  "HPV Vaccination": "/hpv-vaccination",
  Flu: "/category/preventive-women-health",
  Boostrix: "/category/preventive-women-health",
  Tetanus: "/category/preventive-women-health",
  "Normal Pregnancy": "/pregnancy",
};

// The home page carousel is fed by siteData.json, whose slugs predate the
// article pages. Map them onto the guides that actually exist.
const legacyArticleHrefMap: Record<string, string> = {
  "pcos-symptoms-and-treatment": "/pcod-pcos-treatment",
  "laparoscopic-surgery-benefits": "/category/laparoscopic-surgery",
  "pregnancy-care-tips": "/normal-pregnancy-care",
  "irregular-periods-causes": "/irregular-periods-treatment",
};

function slugifyPathSegment(value: string | number) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export function getTopicHref(label: string | number) {
  const normalizedLabel = String(label).trim();

  return topicHrefMap[normalizedLabel] || `/${slugifyPathSegment(normalizedLabel)}`;
}

/**
 * Resolves a home page blog card to a real article route. Falls back to the
 * topic map so a card that gains a proper slug keeps working.
 */
export function getArticleHref(slug?: string, title?: string) {
  if (slug && legacyArticleHrefMap[slug]) {
    return legacyArticleHrefMap[slug];
  }

  if (slug) {
    return `/${slugifyPathSegment(slug)}`;
  }

  return getTopicHref(title || "");
}

/** Used by /articles/[slug] to rescue any link pointing at the old route. */
export function getLegacyArticleHref(slug: string) {
  return legacyArticleHrefMap[slug];
}
