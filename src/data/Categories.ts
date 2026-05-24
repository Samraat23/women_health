import happyPatient from "../../public/image/ happypatent.jpeg";
export type GynecologyCategory = {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    blogSlugs: string[];
  };
  
  export const gynecologyCategories: GynecologyCategory[] = [
    {
      id: 1,
      title: "Laparoscopic Surgery",
      slug: "laparoscopic-surgery",
      description:
        "Advanced minimally invasive gynecological surgeries with faster recovery, less pain, and smaller scars.",
      image: happyPatient,
      blogSlugs: [
        "endometriosis-treatment",
        "uterus-removal-hysterectomy",
        "fibroid-removal-surgery",
        "ovarian-cyst-surgery",
      ],
    },
    {
      id: 2,
      title: "Young Women Care",
      slug: "young-women-care",
      description:
        "Special care for teenage girls and young women dealing with periods, PCOD, acne, weight gain, and hormonal changes.",
      image: "/images/categories/young-women-care.jpg",
      blogSlugs: [
        "pcod-pcos-treatment",
        "menstrual-cycle-problems",
        "irregular-periods-treatment",
        "teenage-gynecology-care",
      ],
    },
    {
      id: 3,
      title: "Preventive Women Health",
      slug: "preventive-women-health",
      description:
        "Preventive screenings and checkups to detect women’s health problems early and reduce future risks.",
      image: "/images/categories/preventive-women-health.jpg",
      blogSlugs: [
        "cervical-cancer-screening",
        "hpv-vaccination",
        "regular-gynecology-checkup",
        "breast-health-checkup",
      ],
    },
    {
      id: 4,
      title: "Hormonal Imbalance",
      slug: "hormonal-imbalance",
      description:
        "Complete care for hormonal problems affecting periods, weight, skin, mood, fertility, and menopause.",
      image: "/images/categories/hormonal-imbalance.jpg",
      blogSlugs: [
        "thyroid-problems-women",
        "hormonal-weight-gain",
        "hormonal-hair-fall-acne",
        "mood-swings-hormones",
      ],
    },
    {
      id: 5,
      title: "Pregnancy Care",
      slug: "pregnancy-care",
      description:
        "Complete pregnancy care from early pregnancy confirmation to prenatal checkups, delivery guidance, and postnatal recovery.",
      image: "/images/categories/pregnancy-care.jpg",
      blogSlugs: [
        "normal-pregnancy-care",
        "high-risk-pregnancy",
        "pregnancy-ultrasound",
        "post-pregnancy-recovery",
      ],
    },
    {
      id: 6,
      title: "Fertility & Infertility",
      slug: "fertility-infertility",
      description:
        "Advanced fertility evaluation and treatment support for ovulation problems, tubal blockage, low AMH, and recurrent pregnancy loss.",
      image: "/images/categories/fertility-infertility.jpg",
      blogSlugs: [
        "infertility-treatment",
        "ivf-consultation",
        "ovulation-problems",
        "tubal-blockage-treatment",
      ],
    },
    {
      id: 7,
      title: "Menopause Care",
      slug: "menopause-care",
      description:
        "Personalized menopause care for hot flashes, mood changes, sleep problems, vaginal dryness, and bone health.",
      image: "/images/categories/menopause-care.jpg",
      blogSlugs: [
        "menopause-management",
        "hot-flashes-treatment",
        "vaginal-dryness-treatment",
        "bone-health-after-menopause",
      ],
    },
    {
      id: 8,
      title: "Sexual & Intimate Health",
      slug: "sexual-intimate-health",
      description:
        "Confidential care for intimate hygiene, vaginal infections, white discharge, urinary problems, and sexual wellness concerns.",
      image: "/images/categories/sexual-intimate-health.jpg",
      blogSlugs: [
        "vaginal-infection-treatment",
        "white-discharge-treatment",
        "urinary-tract-infection-women",
        "pain-during-intercourse",
      ],
    },
  ];