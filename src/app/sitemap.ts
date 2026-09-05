import type { MetadataRoute } from "next";

const baseUrl = "https://www.drkusumlata.in";
const lastModified = "2026-08-29";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1.0 },
    { path: "/about-us", priority: 0.9 },
    { path: "/endometriosis-doctor-in-gurgaon", priority: 0.9 },
    { path: "/category/young-women-care", priority: 0.8 },
    { path: "/surgery", priority: 0.9 },
    { path: "/pregnancy", priority: 0.9 },
    { path: "/uterine-fibroids-doctor-in-gurgaon", priority: 0.9 },
    { path: "/ovarian-cyst-doctor-in-gurgaon", priority: 0.9 },
    { path: "/category/laparoscopic-surgery", priority: 0.8 },
    { path: "/fertility-enhancing-surgery", priority: 0.9 },
    { path: "/hysteroscopy-treatment", priority: 0.9 },
    { path: "/cervical-cerclage", priority: 0.9 },
    { path: "/category/preventive-women-health", priority: 0.8 },
    { path: "/category/hormonal-imbalance", priority: 0.8 },
    { path: "/category/pregnancy-care", priority: 0.8 },
    { path: "/category/fertility-infertility", priority: 0.8 },
    { path: "/category/menopause-care", priority: 0.8 },
    { path: "/category/sexual-intimate-health", priority: 0.8 },
    { path: "/uterine-bleeding-doctor-in-gurgaon", priority: 0.9 },
    { path: "/vaginal-infection-doctor-in-gurgaon", priority: 0.9 },
    { path: "/puberty-disorder-doctor-in-gurgaon", priority: 0.9 },
    { path: "/irregular-periods-treatment", priority: 0.9 },
    { path: "/pcos-pcod-doctor-in-gurgaon", priority: 0.9 },
    { path: "/menstrual-cycle-problems", priority: 0.9 },
    { path: "/regular-gynecology-checkup", priority: 0.9 },
    { path: "/cervical-cancer-screening", priority: 0.9 },
    { path: "/breast-cancer-doctor-in-gurgaon", priority: 0.9 },
    { path: "/menopause-management", priority: 0.9 },
    { path: "/urinary-tract-infection-women", priority: 0.9 },
    { path: "/hpv-vaccination", priority: 0.9 },
    { path: "/normal-pregnancy-care", priority: 0.9 },
    { path: "/high-risk-pregnancy", priority: 0.9 },
    { path: "/pregnancy-ultrasound", priority: 0.9 },
    { path: "/post-pregnancy-recovery", priority: 0.9 },
    { path: "/thyroid-problems-women", priority: 0.9 },
    { path: "/hormonal-weight-gain", priority: 0.9 },
    { path: "/hormonal-hair-fall-acne", priority: 0.9 },
    { path: "/mood-swings-hormones", priority: 0.9 },
    { path: "/white-discharge-treatment", priority: 0.9 },
    { path: "/pain-during-intercourse", priority: 0.9 },
    { path: "/hot-flashes-treatment", priority: 0.9 },
    { path: "/vaginal-dryness-treatment", priority: 0.9 },
    { path: "/bone-health-after-menopause", priority: 0.9 },
    { path: "/infertility-treatment", priority: 0.9 },
    { path: "/ivf-consultation", priority: 0.9 },
    { path: "/ovulation-problems", priority: 0.9 },
    { path: "/tubal-blockage-treatment", priority: 0.9 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    priority,
  }));
}
