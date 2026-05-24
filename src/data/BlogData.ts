import type { StaticImageData } from "next/image";
import happyPatient from "../../public/image/ happypatent.jpeg";

export type BlogSectionType =
  | "checkList"
  | "nutrition"
  | "cards"
  | "timeline"
  | "warning";

export type BlogCard = {
  title: string;
  description?: string;
  tone?: "positive" | "warning";
  items?: string[];
};

export type BlogTimeline = {
  label: string;
  title: string;
  description: string;
};

export type BlogSection = {
  id: string;
  type: BlogSectionType;
  eyebrow: string;
  title: string;
  color: string;
  paragraph: string;
  items?: string[];
  cards?: BlogCard[];
  timeline?: BlogTimeline[];
};

export type BlogAuthor = {
  name: string;
  label: string;
  designation: string;
  image: StaticImageData;
};

export const pregnancyBlogData = {
  hero: {
    badge: "Pregnancy Guide",
    title: "Healthy Pregnancy Tips Every Mother Should Know",
    date: "May 21, 2026",
    readTime: "5 min read",
    status: "Doctor Reviewed",
  },

  article: {
    id: "introduction",
    title: "Healthy Pregnancy Tips Every Mother Should Know",
    intro:
      "Pregnancy brings physical, emotional, and lifestyle changes. Timely prenatal care helps protect both mother and baby while making each trimester easier to understand.",
    image: happyPatient,
    paragraphs: [
      "This guide brings the essentials together in one place: symptoms, diet, exercise, testing, warning signs, and when to speak with your gynecologist.",
      "A healthy pregnancy journey starts with regular checkups, balanced nutrition, gentle movement, proper rest, and timely medical advice.",
    ],
  },

  sections: [
    {
      id: "symptoms",
      type: "checkList",
      eyebrow: "First Signs",
      title: "Early pregnancy symptoms",
      color: "#ec4899",
      paragraph:
        "Early symptoms vary from person to person. A missed period is common, but many women also notice body changes before a test confirms pregnancy.",
      items: [
        "Missed or delayed menstrual period",
        "Nausea, vomiting, or morning sickness",
        "Unusual tiredness and low energy",
        "Breast tenderness or swelling",
        "Frequent urination",
        "Mood changes or heightened emotions",
        "Mild cramping or light spotting",
      ],
    },
    {
      id: "diet",
      type: "nutrition",
      eyebrow: "Nutrition",
      title: "Healthy pregnancy diet",
      color: "#10b981",
      paragraph:
        "Pregnancy nutrition is about nutrient density, hydration, and consistency. Choose fresh foods that support baby growth while helping with energy, digestion, and healthy weight gain.",
      cards: [
        {
          title: "Eat more of",
          tone: "positive",
          items: [
            "Leafy greens and seasonal fruits",
            "Iron-rich lentils, beans, and spinach",
            "Protein from eggs, fish, chicken, paneer, or tofu",
            "Calcium from milk, curd, yogurt, and paneer",
            "Whole grains and complex carbohydrates",
            
          ],
        },
        {
          title: "Avoid or limit",
          tone: "warning",
          items: [
            "Alcohol and tobacco",
            "Raw or undercooked meat, eggs, and seafood",
            "Excess caffeine",
            "Unpasteurized dairy",
            "High-mercury fish",
            "Very sugary drinks and frequent junk food",
            
          ],
        },
      ],
    },
    {
      id: "exercise",
      type: "cards",
      eyebrow: "Movement",
      title: "Exercise during pregnancy",
      color: "#f59e0b",
      paragraph:
        "Light, regular movement can improve circulation, mood, sleep, back discomfort, and stamina. Begin only after your doctor confirms what is suitable for your pregnancy.",
      cards: [
        {
          title: "Walking",
          description:
            "A simple 20 to 30 minute routine that can work across most trimesters.",
        },
        {
          title: "Prenatal yoga",
          description:
            "Supports flexibility, breathing, posture, and stress control.",
        },
        {
          title: "Swimming",
          description:
            "A low-impact option that can reduce pressure on joints and swelling.",
        },
        
      ],
    },
    {
      id: "tests",
      type: "timeline",
      eyebrow: "Medical Care",
      title: "Important prenatal tests",
      color: "#6366f1",
      paragraph:
        "Prenatal tests help confirm dates, screen for common risks, and monitor baby development.",
      timeline: [
        {
          label: "6-8 wks",
          title: "Dating ultrasound",
          description: "Confirms pregnancy, heartbeat, and estimated due date.",
        },
        {
          label: "11-14 wks",
          title: "NT scan and blood tests",
          description: "Screens for selected chromosomal risks.",
        },
        {
          label: "18-20 wks",
          title: "Anomaly scan",
          description: "Checks baby anatomy in detail.",
        },
        {
          label: "24-28 wks",
          title: "Glucose tolerance test",
          description: "Screens for gestational diabetes.",
        },
        {
          label: "36+ wks",
          title: "Late pregnancy review",
          description: "Assesses delivery readiness and fetal wellbeing.",
        },
      ],
    },
    {
      id: "warning",
      type: "warning",
      eyebrow: "Urgent Signs",
      title: "Warning signs to watch",
      color: "#ef4444",
      paragraph:
        "Some symptoms need prompt medical attention. Contact your doctor immediately if you notice any of the following.",
      items: [
        "Heavy bleeding or unusual vaginal discharge",
        "Severe abdominal pain or persistent cramping",
        "Sudden swelling of hands, face, or feet",
        "Severe headache or vision changes",
        "Reduced or absent fetal movement after 28 weeks",
        "High fever above 38 C / 100.4 F",
        "Breathing difficulty or chest pain",
      ],
    },
  ] satisfies BlogSection[],

  author: {
    name: "Dr. Kusum Lata Bhardwaj",
    label: "Written and reviewed by",
    designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
    image: happyPatient,
  } satisfies BlogAuthor,
};


import youngWomenImage from "../../public/image/ happypatent.jpeg";
import pcosImage from "../../public/image/ happypatent.jpeg";
import menstrualImage from "../../public/image/ happypatent.jpeg";
import irregularImage from "../../public/image/ happypatent.jpeg";
import teenageImage from "../../public/image/ happypatent.jpeg";

export const youngWomenCareBlogs = [
  {
    hero: {
      badge: "Young Women Care",
      title: "PCOD / PCOS Treatment and Lifestyle Care",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "pcod-pcos-treatment",
      slug: "pcod-pcos-treatment",
      category: "young-women-care",
      title: "PCOD / PCOS Treatment and Lifestyle Care",
      intro:
        "PCOD and PCOS are common hormonal conditions affecting young women. Early diagnosis and lifestyle management can help control symptoms and improve long-term reproductive health.",
      image: pcosImage,

      paragraphs: [
        "Many young women experience irregular periods, acne, weight gain, or hair fall without understanding the hormonal reason behind these symptoms.",
        "Proper diagnosis, healthy eating habits, physical activity, stress management, and medical treatment can help manage PCOS effectively.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Symptoms",
        title: "Common symptoms of PCOD / PCOS",
        color: "#ec4899",
        paragraph:
          "Symptoms can vary from person to person depending on hormonal imbalance severity.",
        items: [
          "Irregular periods",
          "Weight gain",
          "Acne and oily skin",
          "Hair fall",
          "Facial hair growth",
          "Mood swings",
          "Difficulty in pregnancy",
        ],
      },

      {
        id: "causes",
        type: "cards",
        eyebrow: "Causes",
        title: "Why PCOS happens",
        color: "#8b5cf6",
        paragraph:
          "PCOS is influenced by hormones, lifestyle, genetics, and insulin resistance.",
        cards: [
          {
            title: "Hormonal imbalance",
            description:
              "Changes in reproductive hormones can affect ovulation and periods.",
          },
          {
            title: "Insulin resistance",
            description:
              "High insulin levels may increase male hormones in the body.",
          },
          {
            title: "Lifestyle factors",
            description:
              "Stress, unhealthy eating, and low physical activity can worsen symptoms.",
          },
        ],
      },

      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Treatment",
        title: "PCOS treatment approach",
        color: "#10b981",
        paragraph:
          "Treatment depends on symptoms, age, and fertility goals.",
        timeline: [
          {
            label: "Step 1",
            title: "Diagnosis",
            description:
              "Hormone tests, ultrasound, and medical history evaluation.",
          },
          {
            label: "Step 2",
            title: "Lifestyle correction",
            description:
              "Balanced diet, weight management, and exercise routine.",
          },
          {
            label: "Step 3",
            title: "Medical treatment",
            description:
              "Hormonal medicines and symptom-specific treatment.",
          },
          {
            label: "Step 4",
            title: "Fertility support",
            description:
              "Ovulation support and fertility treatment if required.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: youngWomenImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Young Women Care",
      title: "Menstrual Cycle Problems in Young Women",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "menstrual-cycle-problems",
      slug: "menstrual-cycle-problems",
      category: "young-women-care",
      title: "Menstrual Cycle Problems in Young Women",
      intro:
        "Menstrual cycle problems can affect daily life, confidence, physical health, and emotional wellbeing in teenagers and young women.",
      image: menstrualImage,

      paragraphs: [
        "Some women experience painful periods, delayed cycles, heavy bleeding, or irregular spotting due to hormonal changes or medical conditions.",
        "Understanding the menstrual cycle helps identify early warning signs and allows timely medical care.",
      ],
    },

    sections: [
      {
        id: "problems",
        type: "checkList",
        eyebrow: "Common Problems",
        title: "Types of menstrual cycle problems",
        color: "#ef4444",
        paragraph:
          "Menstrual issues may happen occasionally or become long-term concerns.",
        items: [
          "Painful periods",
          "Heavy bleeding",
          "Delayed periods",
          "Frequent periods",
          "Spotting between periods",
          "Missed periods",
        ],
      },

      {
        id: "causes",
        type: "cards",
        eyebrow: "Causes",
        title: "Common causes behind menstrual problems",
        color: "#6366f1",
        paragraph:
          "Hormonal imbalance is one of the most common causes of menstrual cycle changes.",
        cards: [
          {
            title: "PCOS",
            description:
              "PCOS may disrupt ovulation and lead to irregular periods.",
          },
          {
            title: "Stress",
            description:
              "Mental stress and poor sleep can affect hormonal balance.",
          },
          {
            title: "Thyroid disorder",
            description:
              "Thyroid problems can make periods irregular or heavy.",
          },
        ],
      },

      {
        id: "care",
        type: "nutrition",
        eyebrow: "Care Tips",
        title: "Lifestyle support for healthy cycles",
        color: "#f59e0b",
        paragraph:
          "Healthy lifestyle choices can improve hormonal balance and reduce symptoms.",
        cards: [
          {
            title: "Healthy habits",
            tone: "positive",
            items: [
              "Regular exercise",
              "Balanced diet",
              "Hydration",
              "Good sleep",
              "Stress management",
            ],
          },
          {
            title: "Avoid",
            tone: "warning",
            items: [
              "Excess junk food",
              "Skipping meals",
              "Extreme dieting",
              "High stress",
              "Lack of sleep",
            ],
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: youngWomenImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Young Women Care",
      title: "Irregular Periods: Causes and Treatment",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "irregular-periods-treatment",
      slug: "irregular-periods-treatment",
      category: "young-women-care",
      title: "Irregular Periods: Causes and Treatment",
      intro:
        "Irregular periods are common in young women and may occur due to stress, PCOS, thyroid problems, weight changes, or hormonal imbalance.",
      image: irregularImage,

      paragraphs: [
        "A normal menstrual cycle usually occurs every 21 to 35 days. Delayed, missed, or unpredictable periods may indicate hormonal imbalance.",
        "Early diagnosis can help prevent future reproductive and hormonal complications.",
      ],
    },

    sections: [
      {
        id: "signs",
        type: "warning",
        eyebrow: "Warning Signs",
        title: "When irregular periods need medical attention",
        color: "#ef4444",
        paragraph:
          "Medical evaluation is important if periods stay irregular for a long time.",
        items: [
          "Missed periods for several months",
          "Heavy bleeding",
          "Severe pain",
          "Excess facial hair",
          "Sudden weight gain",
          "Difficulty in pregnancy",
        ],
      },

      {
        id: "diagnosis",
        type: "timeline",
        eyebrow: "Diagnosis",
        title: "How doctors diagnose irregular periods",
        color: "#10b981",
        paragraph:
          "The diagnosis depends on medical history, symptoms, and hormone evaluation.",
        timeline: [
          {
            label: "Step 1",
            title: "Medical history",
            description:
              "Cycle tracking and symptom understanding.",
          },
          {
            label: "Step 2",
            title: "Blood tests",
            description:
              "Hormone and thyroid evaluation.",
          },
          {
            label: "Step 3",
            title: "Ultrasound",
            description:
              "Checks ovaries and uterus structure.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: youngWomenImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Young Women Care",
      title: "Teenage Gynecology and Puberty Care",
      date: "May 24, 2026",
      readTime: "4 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "teenage-gynecology-care",
      slug: "teenage-gynecology-care",
      category: "young-women-care",
      title: "Teenage Gynecology and Puberty Care",
      intro:
        "Teenage gynecology focuses on puberty, menstrual health, hormonal changes, hygiene education, and emotional wellbeing.",
      image: teenageImage,

      paragraphs: [
        "Puberty is an important stage of physical and emotional growth for young girls.",
        "Professional guidance helps teenagers understand periods, hygiene, body changes, and hormonal health confidently.",
      ],
    },

    sections: [
      {
        id: "puberty",
        type: "cards",
        eyebrow: "Puberty",
        title: "Body changes during puberty",
        color: "#ec4899",
        paragraph:
          "Hormonal changes during puberty can affect emotions, skin, growth, and menstrual cycles.",
        cards: [
          {
            title: "Breast development",
            description:
              "One of the earliest signs of puberty in girls.",
          },
          {
            title: "Periods begin",
            description:
              "Menstruation usually starts between 10 to 15 years of age.",
          },
          {
            title: "Hormonal skin changes",
            description:
              "Acne and oily skin are common during puberty.",
          },
        ],
      },

      {
        id: "hygiene",
        type: "checkList",
        eyebrow: "Healthy Habits",
        title: "Important teenage health tips",
        color: "#14b8a6",
        paragraph:
          "Healthy habits support confidence and reproductive health during teenage years.",
        items: [
          "Maintain menstrual hygiene",
          "Eat balanced meals",
          "Stay physically active",
          "Drink enough water",
          "Get proper sleep",
          "Avoid excessive junk food",
        ],
      },

      {
        id: "support",
        type: "warning",
        eyebrow: "Medical Support",
        title: "When to visit a gynecologist",
        color: "#f97316",
        paragraph:
          "Some symptoms should not be ignored during teenage years.",
        items: [
          "Very painful periods",
          "Heavy bleeding",
          "No periods by age 15",
          "Severe acne",
          "Excess facial hair",
          "Irregular cycles for long duration",
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: youngWomenImage,
    } satisfies BlogAuthor,
  },
];

