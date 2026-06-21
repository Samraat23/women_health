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
  image: string | StaticImageData;
};

export type BlogPageData = {
  hero: {
    badge: string;
    title: string;
    date: string;
    readTime: string;
    status: string;
  };
  article: {
    id: string;
    slug?: string;
    category?: string;
    title: string;
    intro: string;
    image: string | StaticImageData;
    paragraphs: string[];
  };
  sections: BlogSection[];
  author: BlogAuthor;
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


const doctorImage =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1400&auto=format&fit=crop";

export const preventiveWomenHealthBlogs = [
  {
    hero: {
      badge: "Preventive Women Health",
      title: "Cervical Cancer Screening and Early Detection",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "cervical-cancer-screening",
      slug: "cervical-cancer-screening",
      category: "preventive-women-health",
      title: "Cervical Cancer Screening and Early Detection",
      intro:
        "Cervical cancer screening helps detect abnormal cervical changes early before they become dangerous. Regular screening improves women’s health and supports early treatment.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Many women do not experience symptoms during the early stages of cervical abnormalities, making routine screening extremely important.",
        "Pap smear tests and HPV testing help identify abnormal cervical cells early and reduce future cervical cancer risk.",
      ],
    },

    sections: [
      {
        id: "importance",
        type: "checkList",
        eyebrow: "Screening Benefits",
        title: "Why cervical cancer screening matters",
        color: "#ec4899",
        paragraph:
          "Regular screening helps identify cervical abnormalities before cancer develops.",
        items: [
          "Early detection of abnormal cervical cells",
          "Improved treatment outcomes",
          "Lower cervical cancer risk",
          "Routine preventive women care",
          "Better reproductive health awareness",
          "Early HPV detection",
        ],
      },

      {
        id: "tests",
        type: "cards",
        eyebrow: "Tests",
        title: "Common cervical screening tests",
        color: "#8b5cf6",
        paragraph:
          "Doctors may recommend screening tests based on age, symptoms, and medical history.",
        cards: [
          {
            title: "Pap smear",
            description:
              "Detects abnormal cervical cells before cancer develops.",
          },
          {
            title: "HPV test",
            description:
              "Checks for high-risk HPV infection associated with cervical cancer.",
          },
          {
            title: "Pelvic examination",
            description:
              "Helps evaluate cervical and reproductive health.",
          },
        ],
      },

      {
        id: "care",
        type: "timeline",
        eyebrow: "Prevention",
        title: "How to reduce cervical cancer risk",
        color: "#10b981",
        paragraph:
          "Preventive care and regular screening play an important role in women’s long-term health.",
        timeline: [
          {
            label: "Step 1",
            title: "Regular screening",
            description:
              "Schedule routine Pap smear and HPV testing.",
          },
          {
            label: "Step 2",
            title: "HPV vaccination",
            description:
              "Vaccination can reduce HPV-related cervical cancer risk.",
          },
          {
            label: "Step 3",
            title: "Safe health practices",
            description:
              "Maintain healthy hygiene and reproductive care.",
          },
          {
            label: "Step 4",
            title: "Follow medical advice",
            description:
              "Consult a gynecologist if symptoms or abnormal results appear.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Preventive Women Health",
      title: "HPV Vaccination for Women Health Protection",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "hpv-vaccination",
      slug: "hpv-vaccination",
      category: "preventive-women-health",
      title: "HPV Vaccination for Women Health Protection",
      intro:
        "HPV vaccination helps protect women against high-risk HPV infections linked to cervical cancer and other reproductive health conditions.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Human papillomavirus (HPV) is one of the most common viral infections affecting reproductive health.",
        "Vaccination is most effective before HPV exposure and is recommended for young girls and women according to medical guidelines.",
      ],
    },

    sections: [
      {
        id: "benefits",
        type: "checkList",
        eyebrow: "Benefits",
        title: "Benefits of HPV vaccination",
        color: "#f43f5e",
        paragraph:
          "HPV vaccination plays a major role in cervical cancer prevention.",
        items: [
          "Reduces cervical cancer risk",
          "Protection against high-risk HPV strains",
          "Supports preventive women health",
          "Long-term reproductive health protection",
          "Safe and medically recommended",
          "Helps reduce HPV infection complications",
        ],
      },

      {
        id: "vaccination",
        type: "cards",
        eyebrow: "Vaccination Guide",
        title: "Who should consider HPV vaccination",
        color: "#6366f1",
        paragraph:
          "Vaccination recommendations may vary based on age and medical advice.",
        cards: [
          {
            title: "Teenage girls",
            description:
              "Vaccination before HPV exposure offers stronger protection.",
          },
          {
            title: "Young women",
            description:
              "Women may still benefit from vaccination after adolescence.",
          },
          {
            title: "Preventive care",
            description:
              "Vaccination supports long-term cervical health monitoring.",
          },
        ],
      },

      {
        id: "support",
        type: "warning",
        eyebrow: "Medical Advice",
        title: "Important things to remember",
        color: "#f59e0b",
        paragraph:
          "Vaccination is preventive but routine cervical screening is still important.",
        items: [
          "Continue regular Pap smear tests",
          "Consult a gynecologist before vaccination",
          "Complete all vaccine doses",
          "Follow age-specific recommendations",
          "Maintain reproductive hygiene",
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Preventive Women Health",
      title: "Why Regular Gynecology Checkups Matter",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "regular-gynecology-checkup",
      slug: "regular-gynecology-checkup",
      category: "preventive-women-health",
      title: "Why Regular Gynecology Checkups Matter",
      intro:
        "Routine gynecology checkups help identify health concerns early and support better reproductive, hormonal, and preventive women care.",
      image:
        "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Regular women health checkups allow doctors to detect issues before they become serious.",
        "Preventive care improves awareness about reproductive health, periods, hormones, breast health, and overall wellbeing.",
      ],
    },

    sections: [
      {
        id: "importance",
        type: "checkList",
        eyebrow: "Health Benefits",
        title: "Benefits of regular gynecology visits",
        color: "#ec4899",
        paragraph:
          "Routine health checkups help women maintain long-term wellness and reproductive health.",
        items: [
          "Early disease detection",
          "Hormonal health monitoring",
          "Menstrual cycle evaluation",
          "Breast health awareness",
          "Cervical screening support",
          "Preventive reproductive care",
        ],
      },

      {
        id: "tests",
        type: "cards",
        eyebrow: "Routine Care",
        title: "Common health evaluations",
        color: "#0ea5e9",
        paragraph:
          "Gynecology visits may include several preventive health assessments.",
        cards: [
          {
            title: "Pelvic examination",
            description:
              "Helps evaluate reproductive organ health and symptoms.",
          },
          {
            title: "Pap smear",
            description:
              "Supports cervical cancer prevention and screening.",
          },
          {
            title: "Hormonal evaluation",
            description:
              "Checks period irregularities and hormonal symptoms.",
          },
        ],
      },

      {
        id: "tips",
        type: "timeline",
        eyebrow: "Healthy Lifestyle",
        title: "Women health care routine",
        color: "#14b8a6",
        paragraph:
          "Simple healthy habits improve women’s reproductive and hormonal health.",
        timeline: [
          {
            label: "Step 1",
            title: "Regular checkups",
            description:
              "Schedule yearly gynecology appointments.",
          },
          {
            label: "Step 2",
            title: "Healthy lifestyle",
            description:
              "Maintain nutrition, hydration, and physical activity.",
          },
          {
            label: "Step 3",
            title: "Track symptoms",
            description:
              "Monitor menstrual changes or unusual symptoms.",
          },
          {
            label: "Step 4",
            title: "Follow screening advice",
            description:
              "Complete age-recommended health tests.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Preventive Women Health",
      title: "Breast Health Awareness and Screening",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "breast-health-checkup",
      slug: "breast-health-checkup",
      category: "preventive-women-health",
      title: "Breast Health Awareness and Screening",
      intro:
        "Breast health awareness helps women identify unusual breast changes early and encourages timely medical evaluation and preventive care.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Regular breast examinations and awareness of body changes help improve early detection of breast-related conditions.",
        "Women should not ignore breast pain, swelling, lumps, or nipple discharge and should consult a doctor if symptoms appear.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Warning Signs",
        title: "Breast symptoms that need medical attention",
        color: "#ef4444",
        paragraph:
          "Early evaluation is important if breast-related symptoms appear.",
        items: [
          "Breast lump",
          "Persistent breast pain",
          "Nipple discharge",
          "Skin dimpling",
          "Swelling or redness",
          "Changes in breast shape",
        ],
      },

      {
        id: "screening",
        type: "cards",
        eyebrow: "Screening",
        title: "Common breast health evaluations",
        color: "#8b5cf6",
        paragraph:
          "Doctors may recommend screening tests depending on symptoms and age.",
        cards: [
          {
            title: "Clinical breast examination",
            description:
              "Physical evaluation performed during women health visits.",
          },
          {
            title: "Breast ultrasound",
            description:
              "Helps assess lumps, swelling, or breast discomfort.",
          },
          {
            title: "Mammography",
            description:
              "Recommended for breast cancer screening in selected age groups.",
          },
        ],
      },

      {
        id: "care",
        type: "checkList",
        eyebrow: "Prevention",
        title: "Healthy breast care habits",
        color: "#10b981",
        paragraph:
          "Preventive awareness and regular self-checks support better breast health.",
        items: [
          "Perform self-breast awareness",
          "Schedule routine checkups",
          "Maintain healthy lifestyle",
          "Consult doctor for unusual changes",
          "Follow screening recommendations",
          "Avoid ignoring persistent symptoms",
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];


export const hormonalImbalanceBlogs = [
  {
    hero: {
      badge: "Hormonal Imbalance",
      title: "Thyroid Problems in Women: Symptoms and Treatment",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "thyroid-problems-women",
      slug: "thyroid-problems-women",
      category: "hormonal-imbalance",
      title: "Thyroid Problems in Women: Symptoms and Treatment",
      intro:
        "Thyroid imbalance can affect periods, fertility, mood, energy levels, metabolism, and overall women health. Early diagnosis helps improve long-term hormonal balance.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Thyroid hormones control metabolism, reproductive health, energy production, and menstrual cycles in women.",
        "Untreated thyroid disorders may lead to fatigue, irregular periods, hair fall, mood changes, fertility problems, and weight fluctuations.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Symptoms",
        title: "Common thyroid symptoms in women",
        color: "#ec4899",
        paragraph:
          "Symptoms may appear slowly and are often ignored during the early stage.",
        items: [
          "Fatigue and weakness",
          "Irregular periods",
          "Weight gain or weight loss",
          "Hair fall",
          "Mood changes",
          "Low energy",
          "Difficulty in pregnancy",
        ],
      },

      {
        id: "types",
        type: "cards",
        eyebrow: "Thyroid Conditions",
        title: "Different thyroid problems",
        color: "#8b5cf6",
        paragraph:
          "Both low and high thyroid hormone levels can affect women health.",
        cards: [
          {
            title: "Hypothyroidism",
            description:
              "Low thyroid activity causing tiredness, weight gain, and slow metabolism.",
          },
          {
            title: "Hyperthyroidism",
            description:
              "Excess thyroid hormones causing anxiety, weight loss, and fast heartbeat.",
          },
          {
            title: "Autoimmune thyroid disease",
            description:
              "Immune system attacks thyroid gland and affects hormone production.",
          },
        ],
      },

      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Thyroid care and management",
        color: "#10b981",
        paragraph:
          "Regular medical care and hormone monitoring help manage thyroid disorders effectively.",
        timeline: [
          {
            label: "Step 1",
            title: "Diagnosis",
            description:
              "Blood tests and thyroid hormone evaluation.",
          },
          {
            label: "Step 2",
            title: "Medication",
            description:
              "Hormone balancing medicines based on thyroid condition.",
          },
          {
            label: "Step 3",
            title: "Lifestyle support",
            description:
              "Balanced nutrition, sleep, and stress management.",
          },
          {
            label: "Step 4",
            title: "Regular follow-up",
            description:
              "Routine testing helps maintain stable hormone levels.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Hormonal Imbalance",
      title: "Hormonal Weight Gain in Women",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "hormonal-weight-gain",
      slug: "hormonal-weight-gain",
      category: "hormonal-imbalance",
      title: "Hormonal Weight Gain in Women",
      intro:
        "Hormonal imbalance can contribute to weight gain, especially around the abdomen, while also affecting energy, metabolism, periods, and emotional wellbeing.",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Hormonal weight gain may happen due to PCOS, thyroid disorders, menopause, insulin resistance, or chronic stress.",
        "Understanding the root cause helps women manage weight more effectively with proper lifestyle and medical support.",
      ],
    },

    sections: [
      {
        id: "reasons",
        type: "checkList",
        eyebrow: "Common Causes",
        title: "Why hormonal weight gain happens",
        color: "#f43f5e",
        paragraph:
          "Hormones affect metabolism, fat storage, appetite, and energy levels.",
        items: [
          "PCOS and insulin resistance",
          "Thyroid disorders",
          "Stress hormones",
          "Poor sleep patterns",
          "Menopause-related changes",
          "Sedentary lifestyle",
        ],
      },

      {
        id: "effects",
        type: "cards",
        eyebrow: "Health Effects",
        title: "How hormones affect body weight",
        color: "#6366f1",
        paragraph:
          "Hormonal imbalance may impact both physical and emotional health.",
        cards: [
          {
            title: "Slow metabolism",
            description:
              "Hormonal changes may reduce calorie burning and energy production.",
          },
          {
            title: "Increased cravings",
            description:
              "Stress and insulin imbalance may trigger unhealthy food cravings.",
          },
          {
            title: "Fat accumulation",
            description:
              "Weight may increase around the abdomen and hips.",
          },
        ],
      },

      {
        id: "management",
        type: "timeline",
        eyebrow: "Management",
        title: "Healthy hormonal weight management",
        color: "#14b8a6",
        paragraph:
          "Healthy habits and medical care help support hormonal balance.",
        timeline: [
          {
            label: "Step 1",
            title: "Hormone evaluation",
            description:
              "Medical testing identifies the hormonal cause of weight gain.",
          },
          {
            label: "Step 2",
            title: "Balanced nutrition",
            description:
              "Healthy food habits improve metabolism and insulin balance.",
          },
          {
            label: "Step 3",
            title: "Regular exercise",
            description:
              "Physical activity supports fat burning and hormonal health.",
          },
          {
            label: "Step 4",
            title: "Medical treatment",
            description:
              "Treat underlying hormonal disorders if required.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Hormonal Imbalance",
      title: "Hormonal Hair Fall and Acne in Women",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "hormonal-hair-fall-acne",
      slug: "hormonal-hair-fall-acne",
      category: "hormonal-imbalance",
      title: "Hormonal Hair Fall and Acne in Women",
      intro:
        "Hormonal imbalance can affect hair growth, skin health, and oil production, leading to acne, hair fall, and excess facial hair growth.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "PCOS, stress hormones, thyroid imbalance, and androgen-related changes commonly affect hair and skin health in women.",
        "Early hormonal evaluation and treatment help reduce long-term skin and hair complications.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Symptoms",
        title: "Signs of hormonal skin and hair imbalance",
        color: "#ec4899",
        paragraph:
          "Hormonal imbalance may affect both appearance and emotional confidence.",
        items: [
          "Persistent acne",
          "Hair thinning",
          "Excess facial hair",
          "Oily skin",
          "Irregular periods",
          "Scalp hair fall",
        ],
      },

      {
        id: "causes",
        type: "cards",
        eyebrow: "Causes",
        title: "Why hormonal acne and hair fall happen",
        color: "#8b5cf6",
        paragraph:
          "Several hormone-related conditions can affect skin and hair.",
        cards: [
          {
            title: "PCOS",
            description:
              "Excess androgen hormones can increase acne and hair growth.",
          },
          {
            title: "Stress hormones",
            description:
              "Stress may worsen inflammation, acne, and hair shedding.",
          },
          {
            title: "Thyroid imbalance",
            description:
              "Thyroid disorders can affect hair texture and skin health.",
          },
        ],
      },

      {
        id: "care",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Managing hormonal skin and hair problems",
        color: "#10b981",
        paragraph:
          "Treatment focuses on balancing hormones and improving skin and hair health.",
        timeline: [
          {
            label: "Step 1",
            title: "Hormone testing",
            description:
              "Medical evaluation identifies underlying hormonal conditions.",
          },
          {
            label: "Step 2",
            title: "Lifestyle improvement",
            description:
              "Healthy sleep, diet, and stress control improve hormone balance.",
          },
          {
            label: "Step 3",
            title: "Skin and hair treatment",
            description:
              "Doctors may recommend medication or supportive care.",
          },
          {
            label: "Step 4",
            title: "Regular follow-up",
            description:
              "Ongoing care helps monitor progress and symptom improvement.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Hormonal Imbalance",
      title: "Mood Swings and Hormonal Changes in Women",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "mood-swings-hormones",
      slug: "mood-swings-hormones",
      category: "hormonal-imbalance",
      title: "Mood Swings and Hormonal Changes in Women",
      intro:
        "Hormonal fluctuations can influence emotions, mood, sleep, stress levels, and overall mental wellbeing in women at different life stages.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Mood changes are commonly linked with menstrual cycles, pregnancy, menopause, thyroid imbalance, and chronic stress.",
        "Understanding hormonal triggers helps women manage emotional wellbeing more effectively.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Emotional Symptoms",
        title: "Common hormonal mood symptoms",
        color: "#ef4444",
        paragraph:
          "Hormonal imbalance may affect emotions, concentration, and mental wellbeing.",
        items: [
          "Irritability",
          "Anxiety",
          "Mood swings",
          "Low motivation",
          "Sleep problems",
          "Emotional sensitivity",
        ],
      },

      {
        id: "triggers",
        type: "cards",
        eyebrow: "Hormonal Triggers",
        title: "What causes hormonal mood changes",
        color: "#6366f1",
        paragraph:
          "Hormonal fluctuations can happen during multiple stages of women health.",
        cards: [
          {
            title: "Menstrual cycle",
            description:
              "Hormone changes before periods may affect mood and emotions.",
          },
          {
            title: "Menopause",
            description:
              "Reduced estrogen levels may contribute to emotional instability.",
          },
          {
            title: "Stress and thyroid issues",
            description:
              "Stress hormones and thyroid imbalance can worsen emotional symptoms.",
          },
        ],
      },

      {
        id: "wellness",
        type: "timeline",
        eyebrow: "Emotional Wellness",
        title: "Managing hormonal mood swings",
        color: "#14b8a6",
        paragraph:
          "Lifestyle support and medical guidance help improve emotional wellbeing.",
        timeline: [
          {
            label: "Step 1",
            title: "Hormone evaluation",
            description:
              "Identify possible hormonal or thyroid-related causes.",
          },
          {
            label: "Step 2",
            title: "Healthy routine",
            description:
              "Maintain sleep, exercise, hydration, and balanced nutrition.",
          },
          {
            label: "Step 3",
            title: "Stress management",
            description:
              "Meditation, relaxation, and emotional support may help.",
          },
          {
            label: "Step 4",
            title: "Medical consultation",
            description:
              "Seek professional support if symptoms affect daily life.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];




export const pregnancyCareBlogs = [
  {
    hero: {
      badge: "Pregnancy Care",
      title: "Normal Pregnancy Care and Healthy Motherhood",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "normal-pregnancy-care",
      slug: "normal-pregnancy-care",
      category: "pregnancy-care",
      title: "Normal Pregnancy Care and Healthy Motherhood",
      intro:
        "Healthy pregnancy care supports both mother and baby throughout every trimester with regular checkups, balanced nutrition, and medical guidance.",
      image:
        "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Pregnancy is a special journey involving physical, emotional, and hormonal changes in women.",
        "Regular prenatal care helps monitor baby growth, maternal health, nutrition, and pregnancy progress safely.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Pregnancy Signs",
        title: "Common early pregnancy symptoms",
        color: "#ec4899",
        paragraph:
          "Many women notice physical and hormonal changes during early pregnancy.",
        items: [
          "Missed periods",
          "Morning sickness",
          "Breast tenderness",
          "Fatigue",
          "Mood swings",
          "Frequent urination",
          "Food cravings",
        ],
      },

      {
        id: "care",
        type: "cards",
        eyebrow: "Healthy Care",
        title: "Important pregnancy care habits",
        color: "#8b5cf6",
        paragraph:
          "Healthy lifestyle habits support baby development and maternal wellbeing.",
        cards: [
          {
            title: "Balanced nutrition",
            description:
              "Healthy meals provide essential nutrients for mother and baby.",
          },
          {
            title: "Regular checkups",
            description:
              "Prenatal visits help monitor pregnancy growth and health.",
          },
          {
            title: "Rest and hydration",
            description:
              "Proper sleep and hydration support healthy pregnancy.",
          },
        ],
      },

      {
        id: "trimester",
        type: "timeline",
        eyebrow: "Pregnancy Journey",
        title: "Pregnancy care through each trimester",
        color: "#10b981",
        paragraph:
          "Each trimester involves important baby growth and health monitoring.",
        timeline: [
          {
            label: "1st Trimester",
            title: "Early pregnancy care",
            description:
              "Initial checkups, blood tests, and nutritional support.",
          },
          {
            label: "2nd Trimester",
            title: "Baby development monitoring",
            description:
              "Ultrasound scans and fetal growth assessments.",
          },
          {
            label: "3rd Trimester",
            title: "Delivery preparation",
            description:
              "Monitoring baby position, maternal health, and labor planning.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Pregnancy Care",
      title: "High-Risk Pregnancy Care and Monitoring",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "high-risk-pregnancy",
      slug: "high-risk-pregnancy",
      category: "pregnancy-care",
      title: "High-Risk Pregnancy Care and Monitoring",
      intro:
        "High-risk pregnancy requires specialized medical care and close monitoring to protect both mother and baby during pregnancy.",
      image:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Some pregnancies require additional medical attention because of maternal health conditions, pregnancy complications, or fetal concerns.",
        "Early diagnosis and regular monitoring improve pregnancy safety and delivery outcomes.",
      ],
    },

    sections: [
      {
        id: "risk",
        type: "warning",
        eyebrow: "Risk Factors",
        title: "Common high-risk pregnancy conditions",
        color: "#ef4444",
        paragraph:
          "Several medical factors can increase pregnancy-related risks.",
        items: [
          "High blood pressure",
          "Gestational diabetes",
          "Twin pregnancy",
          "Previous pregnancy complications",
          "Advanced maternal age",
          "Thyroid disorders",
        ],
      },

      {
        id: "monitoring",
        type: "cards",
        eyebrow: "Medical Monitoring",
        title: "How high-risk pregnancies are monitored",
        color: "#6366f1",
        paragraph:
          "Specialized prenatal monitoring helps reduce pregnancy complications.",
        cards: [
          {
            title: "Frequent checkups",
            description:
              "Regular visits help monitor maternal and fetal health.",
          },
          {
            title: "Advanced ultrasounds",
            description:
              "Detailed scans monitor fetal growth and pregnancy progress.",
          },
          {
            title: "Blood pressure and sugar control",
            description:
              "Monitoring reduces complications during pregnancy.",
          },
        ],
      },

      {
        id: "support",
        type: "timeline",
        eyebrow: "Care Plan",
        title: "High-risk pregnancy care approach",
        color: "#10b981",
        paragraph:
          "Close medical support helps maintain safer pregnancy outcomes.",
        timeline: [
          {
            label: "Step 1",
            title: "Early diagnosis",
            description:
              "Identify risk factors during initial pregnancy visits.",
          },
          {
            label: "Step 2",
            title: "Special monitoring",
            description:
              "Routine tests and fetal health assessments.",
          },
          {
            label: "Step 3",
            title: "Lifestyle guidance",
            description:
              "Healthy nutrition, rest, and medical management.",
          },
          {
            label: "Step 4",
            title: "Delivery planning",
            description:
              "Safe labor and delivery preparation with specialists.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Pregnancy Care",
      title: "Pregnancy Ultrasound and Baby Monitoring",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "pregnancy-ultrasound",
      slug: "pregnancy-ultrasound",
      category: "pregnancy-care",
      title: "Pregnancy Ultrasound and Baby Monitoring",
      intro:
        "Pregnancy ultrasound helps monitor baby growth, heartbeat, development, and maternal health during each stage of pregnancy.",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Ultrasound scans are important for tracking fetal development and identifying possible pregnancy concerns early.",
        "Doctors may recommend different ultrasound scans during different pregnancy stages.",
      ],
    },

    sections: [
      {
        id: "purpose",
        type: "checkList",
        eyebrow: "Ultrasound Benefits",
        title: "Why pregnancy ultrasounds are important",
        color: "#ec4899",
        paragraph:
          "Ultrasound helps doctors monitor pregnancy safely and effectively.",
        items: [
          "Check baby heartbeat",
          "Monitor fetal growth",
          "Estimate due date",
          "Detect pregnancy complications",
          "Assess placenta position",
          "Monitor amniotic fluid",
        ],
      },

      {
        id: "types",
        type: "cards",
        eyebrow: "Ultrasound Types",
        title: "Common pregnancy scans",
        color: "#8b5cf6",
        paragraph:
          "Different scans are performed during different pregnancy stages.",
        cards: [
          {
            title: "Dating scan",
            description:
              "Confirms pregnancy age and estimated delivery date.",
          },
          {
            title: "Anomaly scan",
            description:
              "Checks fetal anatomy and baby development.",
          },
          {
            title: "Growth scan",
            description:
              "Monitors baby growth during later pregnancy stages.",
          },
        ],
      },

      {
        id: "timeline",
        type: "timeline",
        eyebrow: "Pregnancy Timeline",
        title: "Important pregnancy scan schedule",
        color: "#14b8a6",
        paragraph:
          "Routine scans help monitor baby development throughout pregnancy.",
        timeline: [
          {
            label: "6-8 Weeks",
            title: "Early pregnancy scan",
            description:
              "Confirms pregnancy and fetal heartbeat.",
          },
          {
            label: "11-14 Weeks",
            title: "NT scan",
            description:
              "Screens for selected fetal abnormalities.",
          },
          {
            label: "18-22 Weeks",
            title: "Detailed anomaly scan",
            description:
              "Checks fetal anatomy and development.",
          },
          {
            label: "28+ Weeks",
            title: "Growth monitoring scan",
            description:
              "Tracks fetal growth and wellbeing.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Pregnancy Care",
      title: "Post Pregnancy Recovery and Mother Care",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "post-pregnancy-recovery",
      slug: "post-pregnancy-recovery",
      category: "pregnancy-care",
      title: "Post Pregnancy Recovery and Mother Care",
      intro:
        "Post pregnancy recovery focuses on healing, emotional wellbeing, breastfeeding support, nutrition, and restoring women health after childbirth.",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "The body requires time and support to recover after delivery, whether childbirth was vaginal or cesarean.",
        "Healthy nutrition, emotional support, sleep, and medical follow-up improve postnatal recovery and maternal wellbeing.",
      ],
    },

    sections: [
      {
        id: "changes",
        type: "checkList",
        eyebrow: "Post Delivery Changes",
        title: "Common post pregnancy symptoms",
        color: "#f43f5e",
        paragraph:
          "Women experience physical and emotional changes after childbirth.",
        items: [
          "Fatigue",
          "Body pain",
          "Breast discomfort",
          "Mood changes",
          "Sleep disturbance",
          "Hormonal fluctuations",
        ],
      },

      {
        id: "recovery",
        type: "cards",
        eyebrow: "Recovery Support",
        title: "Healthy postnatal recovery habits",
        color: "#6366f1",
        paragraph:
          "Healthy care habits support healing and emotional wellness after childbirth.",
        cards: [
          {
            title: "Nutritious diet",
            description:
              "Healthy meals support healing and breastfeeding health.",
          },
          {
            title: "Rest and sleep",
            description:
              "Proper rest helps body recovery after delivery.",
          },
          {
            title: "Emotional support",
            description:
              "Mental wellbeing is important during postnatal recovery.",
          },
        ],
      },

      {
        id: "followup",
        type: "timeline",
        eyebrow: "Postnatal Care",
        title: "Important recovery care steps",
        color: "#10b981",
        paragraph:
          "Medical follow-up helps monitor healing and maternal health after childbirth.",
        timeline: [
          {
            label: "Week 1",
            title: "Initial recovery",
            description:
              "Focus on healing, rest, and hydration.",
          },
          {
            label: "Week 2-4",
            title: "Routine postnatal care",
            description:
              "Monitor physical recovery and emotional wellbeing.",
          },
          {
            label: "Week 6",
            title: "Postpartum checkup",
            description:
              "Doctor evaluates recovery progress and reproductive health.",
          },
          {
            label: "Long-Term",
            title: "Healthy motherhood",
            description:
              "Maintain healthy nutrition, fitness, and regular checkups.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];


export const fertilityInfertilityBlogs = [
  {
    hero: {
      badge: "Fertility & Infertility",
      title: "Infertility Treatment and Fertility Care",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "infertility-treatment",
      slug: "infertility-treatment",
      category: "fertility-infertility",
      title: "Infertility Treatment and Fertility Care",
      intro:
        "Infertility affects many couples and may happen due to ovulation disorders, hormonal imbalance, tubal problems, age-related fertility decline, or male fertility factors.",
      image:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Fertility treatment depends on identifying the underlying cause affecting conception.",
        "Early fertility evaluation and medical guidance improve the chances of healthy pregnancy and reproductive wellness.",
      ],
    },

    sections: [
      {
        id: "causes",
        type: "checkList",
        eyebrow: "Common Causes",
        title: "Possible causes of infertility",
        color: "#ec4899",
        paragraph:
          "Both female and male factors can affect fertility and pregnancy planning.",
        items: [
          "Ovulation disorders",
          "PCOS",
          "Tubal blockage",
          "Hormonal imbalance",
          "Low sperm count",
          "Age-related fertility decline",
          "Endometriosis",
        ],
      },

      {
        id: "evaluation",
        type: "cards",
        eyebrow: "Fertility Evaluation",
        title: "Important fertility assessments",
        color: "#8b5cf6",
        paragraph:
          "Doctors recommend several fertility evaluations before treatment planning.",
        cards: [
          {
            title: "Hormone tests",
            description:
              "Hormonal evaluation helps assess ovulation and reproductive health.",
          },
          {
            title: "Ultrasound",
            description:
              "Scans help monitor ovaries, uterus, and reproductive organs.",
          },
          {
            title: "Semen analysis",
            description:
              "Male fertility testing helps assess sperm health and count.",
          },
        ],
      },

      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Treatment Options",
        title: "Fertility treatment approach",
        color: "#10b981",
        paragraph:
          "Treatment depends on fertility goals, age, and medical condition.",
        timeline: [
          {
            label: "Step 1",
            title: "Fertility diagnosis",
            description:
              "Medical evaluation identifies the fertility-related issue.",
          },
          {
            label: "Step 2",
            title: "Lifestyle support",
            description:
              "Healthy diet, exercise, and stress management improve fertility.",
          },
          {
            label: "Step 3",
            title: "Medical treatment",
            description:
              "Ovulation medicines or hormonal support may be recommended.",
          },
          {
            label: "Step 4",
            title: "Advanced fertility care",
            description:
              "IUI, IVF, or fertility procedures may be advised if required.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Fertility Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Fertility & Infertility",
      title: "IVF Consultation and Fertility Support",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "ivf-consultation",
      slug: "ivf-consultation",
      category: "fertility-infertility",
      title: "IVF Consultation and Fertility Support",
      intro:
        "IVF treatment helps couples facing fertility challenges achieve pregnancy through advanced reproductive technology and specialized fertility care.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "In Vitro Fertilization (IVF) is commonly recommended when natural conception becomes difficult due to fertility-related medical conditions.",
        "A detailed fertility consultation helps doctors understand reproductive health and choose the best fertility treatment plan.",
      ],
    },

    sections: [
      {
        id: "who",
        type: "checkList",
        eyebrow: "Who May Need IVF",
        title: "Common reasons for IVF treatment",
        color: "#f43f5e",
        paragraph:
          "IVF may be recommended for several fertility-related conditions.",
        items: [
          "Tubal blockage",
          "Low AMH",
          "Male infertility",
          "Failed previous fertility treatments",
          "Advanced maternal age",
          "Unexplained infertility",
        ],
      },

      {
        id: "process",
        type: "cards",
        eyebrow: "IVF Process",
        title: "Important IVF treatment stages",
        color: "#6366f1",
        paragraph:
          "IVF treatment involves multiple carefully monitored steps.",
        cards: [
          {
            title: "Ovarian stimulation",
            description:
              "Medicines help stimulate healthy egg production.",
          },
          {
            title: "Egg retrieval",
            description:
              "Mature eggs are collected during a minor procedure.",
          },
          {
            title: "Embryo transfer",
            description:
              "Healthy embryo is transferred into the uterus.",
          },
        ],
      },

      {
        id: "support",
        type: "timeline",
        eyebrow: "Fertility Journey",
        title: "IVF treatment and monitoring",
        color: "#14b8a6",
        paragraph:
          "Careful fertility monitoring improves treatment success and reproductive health.",
        timeline: [
          {
            label: "Step 1",
            title: "Fertility consultation",
            description:
              "Doctors review fertility history and medical reports.",
          },
          {
            label: "Step 2",
            title: "Hormone and scan monitoring",
            description:
              "Regular monitoring supports healthy egg development.",
          },
          {
            label: "Step 3",
            title: "Embryo development",
            description:
              "Fertilization and embryo growth are monitored carefully.",
          },
          {
            label: "Step 4",
            title: "Pregnancy support",
            description:
              "Doctors monitor early pregnancy after embryo transfer.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Fertility Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Fertility & Infertility",
      title: "Ovulation Problems and Fertility Health",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "ovulation-problems",
      slug: "ovulation-problems",
      category: "fertility-infertility",
      title: "Ovulation Problems and Fertility Health",
      intro:
        "Ovulation problems are one of the most common causes of infertility and may affect menstrual cycles, hormone balance, and pregnancy chances.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Healthy ovulation is important for natural conception and reproductive health.",
        "Irregular ovulation may happen due to PCOS, hormonal imbalance, stress, thyroid disorders, or lifestyle factors.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Ovulation Signs",
        title: "Symptoms of ovulation problems",
        color: "#ef4444",
        paragraph:
          "Hormonal imbalance may affect regular ovulation and menstrual cycles.",
        items: [
          "Irregular periods",
          "Missed periods",
          "Difficulty in pregnancy",
          "Hormonal acne",
          "Weight gain",
          "Excess facial hair",
        ],
      },

      {
        id: "reasons",
        type: "cards",
        eyebrow: "Possible Causes",
        title: "Why ovulation problems happen",
        color: "#8b5cf6",
        paragraph:
          "Several hormonal and reproductive conditions can affect ovulation.",
        cards: [
          {
            title: "PCOS",
            description:
              "PCOS is one of the leading causes of ovulation disorders.",
          },
          {
            title: "Thyroid imbalance",
            description:
              "Thyroid hormones play an important role in ovulation.",
          },
          {
            title: "Stress and lifestyle",
            description:
              "Stress and poor lifestyle habits may disrupt hormonal balance.",
          },
        ],
      },

      {
        id: "care",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Ovulation treatment and fertility support",
        color: "#10b981",
        paragraph:
          "Ovulation disorders are often manageable with medical care and lifestyle support.",
        timeline: [
          {
            label: "Step 1",
            title: "Hormonal evaluation",
            description:
              "Doctors assess reproductive hormones and menstrual history.",
          },
          {
            label: "Step 2",
            title: "Lifestyle correction",
            description:
              "Healthy diet, exercise, and stress control support ovulation.",
          },
          {
            label: "Step 3",
            title: "Ovulation medicines",
            description:
              "Doctors may prescribe medicines to stimulate ovulation.",
          },
          {
            label: "Step 4",
            title: "Fertility monitoring",
            description:
              "Regular scans help monitor ovulation and fertility progress.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Fertility Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Fertility & Infertility",
      title: "Tubal Blockage Treatment and Fertility Care",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "tubal-blockage-treatment",
      slug: "tubal-blockage-treatment",
      category: "fertility-infertility",
      title: "Tubal Blockage Treatment and Fertility Care",
      intro:
        "Blocked fallopian tubes can affect natural conception by preventing eggs and sperm from meeting during fertilization.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Tubal blockage may happen due to pelvic infections, endometriosis, previous surgery, or reproductive inflammation.",
        "Early fertility evaluation helps identify tubal conditions and improves pregnancy treatment planning.",
      ],
    },

    sections: [
      {
        id: "effects",
        type: "checkList",
        eyebrow: "Fertility Impact",
        title: "How tubal blockage affects pregnancy",
        color: "#ec4899",
        paragraph:
          "Healthy fallopian tubes are important for natural fertilization.",
        items: [
          "Difficulty conceiving naturally",
          "Higher infertility risk",
          "Pelvic discomfort",
          "Reproductive inflammation",
          "Ectopic pregnancy risk",
          "Fertility complications",
        ],
      },

      {
        id: "diagnosis",
        type: "cards",
        eyebrow: "Diagnosis",
        title: "How tubal blockage is diagnosed",
        color: "#6366f1",
        paragraph:
          "Doctors use fertility investigations to evaluate tubal health.",
        cards: [
          {
            title: "HSG test",
            description:
              "Checks whether fallopian tubes are open or blocked.",
          },
          {
            title: "Ultrasound",
            description:
              "Monitors reproductive organs and pelvic health.",
          },
          {
            title: "Laparoscopy",
            description:
              "Advanced evaluation for tubal and pelvic conditions.",
          },
        ],
      },

      {
        id: "options",
        type: "timeline",
        eyebrow: "Treatment Options",
        title: "Tubal blockage fertility treatment",
        color: "#10b981",
        paragraph:
          "Treatment depends on blockage severity and reproductive goals.",
        timeline: [
          {
            label: "Step 1",
            title: "Fertility evaluation",
            description:
              "Doctors assess tube condition and fertility history.",
          },
          {
            label: "Step 2",
            title: "Medical or surgical care",
            description:
              "Some tubal conditions may improve with treatment or surgery.",
          },
          {
            label: "Step 3",
            title: "Fertility planning",
            description:
              "Doctors discuss natural conception or IVF support.",
          },
          {
            label: "Step 4",
            title: "Pregnancy monitoring",
            description:
              "Special care supports safe conception and pregnancy progress.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Fertility Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];


export const menopauseCareBlogs = [
  {
    hero: {
      badge: "Menopause Care",
      title: "Menopause Management and Women Wellness",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "menopause-management",
      slug: "menopause-management",
      category: "menopause-care",
      title: "Menopause Management and Women Wellness",
      intro:
        "Menopause is a natural stage in women’s life when periods stop permanently. Proper care helps manage hormonal changes, emotional health, sleep, and long-term wellness.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Menopause usually brings changes in periods, mood, sleep, skin, energy, and bone health.",
        "With medical guidance, lifestyle care, and regular checkups, women can manage menopause symptoms and maintain a healthy life.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Symptoms",
        title: "Common menopause symptoms",
        color: "#ec4899",
        paragraph:
          "Menopause symptoms can be mild or severe depending on hormonal changes.",
        items: [
          "Irregular periods before menopause",
          "Hot flashes",
          "Night sweats",
          "Mood changes",
          "Sleep problems",
          "Low energy",
          "Vaginal dryness",
        ],
      },
      {
        id: "care",
        type: "cards",
        eyebrow: "Care Plan",
        title: "How menopause is managed",
        color: "#8b5cf6",
        paragraph:
          "Menopause care focuses on symptom relief, hormonal balance, and long-term health protection.",
        cards: [
          {
            title: "Lifestyle support",
            description:
              "Healthy food, exercise, hydration, and sleep improve menopause wellbeing.",
          },
          {
            title: "Medical guidance",
            description:
              "Doctors may suggest medicines or hormone therapy in selected cases.",
          },
          {
            title: "Bone protection",
            description:
              "Calcium, vitamin D, and activity help protect bone strength.",
          },
        ],
      },
      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Menopause treatment approach",
        color: "#10b981",
        paragraph:
          "Treatment depends on symptom severity, age, medical history, and health goals.",
        timeline: [
          {
            label: "Step 1",
            title: "Health assessment",
            description:
              "Doctor reviews symptoms, periods, lifestyle, and medical history.",
          },
          {
            label: "Step 2",
            title: "Hormonal evaluation",
            description:
              "Tests may be advised if symptoms are severe or unclear.",
          },
          {
            label: "Step 3",
            title: "Symptom management",
            description:
              "Medicines, lifestyle care, or hormone therapy may be planned.",
          },
          {
            label: "Step 4",
            title: "Long-term follow-up",
            description:
              "Regular checkups help monitor bones, heart, and overall health.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Menopause Care",
      title: "Hot Flashes Treatment During Menopause",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "hot-flashes-treatment",
      slug: "hot-flashes-treatment",
      category: "menopause-care",
      title: "Hot Flashes Treatment During Menopause",
      intro:
        "Hot flashes are sudden feelings of heat, sweating, and discomfort commonly experienced during menopause due to changing estrogen levels.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Hot flashes can disturb sleep, daily comfort, mood, and energy levels.",
        "Treatment focuses on identifying triggers, improving lifestyle habits, and using medical support when symptoms are frequent or severe.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Hot Flash Signs",
        title: "Common symptoms of hot flashes",
        color: "#ef4444",
        paragraph:
          "Hot flashes may happen during the day or night and can vary in intensity.",
        items: [
          "Sudden warmth in face or chest",
          "Sweating",
          "Night sweats",
          "Fast heartbeat",
          "Sleep disturbance",
          "Anxiety or discomfort",
        ],
      },
      {
        id: "triggers",
        type: "cards",
        eyebrow: "Triggers",
        title: "Common hot flash triggers",
        color: "#f59e0b",
        paragraph:
          "Avoiding triggers can reduce the frequency and severity of hot flashes.",
        cards: [
          {
            title: "Spicy food and caffeine",
            description:
              "These may trigger heat episodes in some women.",
          },
          {
            title: "Stress",
            description:
              "Emotional stress may increase hot flash frequency.",
          },
          {
            title: "Warm environment",
            description:
              "Heat, tight clothing, or poor ventilation can worsen symptoms.",
          },
        ],
      },
      {
        id: "management",
        type: "timeline",
        eyebrow: "Management",
        title: "Hot flashes care plan",
        color: "#14b8a6",
        paragraph:
          "A combination of lifestyle changes and medical care can improve comfort.",
        timeline: [
          {
            label: "Step 1",
            title: "Track triggers",
            description:
              "Note food, stress, sleep, and timing of symptoms.",
          },
          {
            label: "Step 2",
            title: "Lifestyle changes",
            description:
              "Use breathable clothing, hydration, and cooling methods.",
          },
          {
            label: "Step 3",
            title: "Medical consultation",
            description:
              "Discuss treatment options if symptoms affect daily life.",
          },
          {
            label: "Step 4",
            title: "Follow-up care",
            description:
              "Review improvement and adjust treatment as needed.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Menopause Care",
      title: "Vaginal Dryness Treatment After Menopause",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "vaginal-dryness-treatment",
      slug: "vaginal-dryness-treatment",
      category: "menopause-care",
      title: "Vaginal Dryness Treatment After Menopause",
      intro:
        "Vaginal dryness is a common menopause-related concern caused by reduced estrogen levels. Timely care improves comfort, intimacy, and vaginal health.",
      image:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Many women feel discomfort, itching, burning, or pain during intercourse because of vaginal dryness after menopause.",
        "A gynecologist can suggest safe treatment options based on symptoms, medical history, and comfort level.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Symptoms",
        title: "Signs of vaginal dryness",
        color: "#ec4899",
        paragraph:
          "Symptoms may affect daily comfort and intimate health.",
        items: [
          "Vaginal dryness",
          "Itching or burning",
          "Pain during intercourse",
          "Recurrent irritation",
          "Discomfort while walking",
          "Urinary discomfort",
        ],
      },
      {
        id: "causes",
        type: "cards",
        eyebrow: "Causes",
        title: "Why vaginal dryness happens",
        color: "#8b5cf6",
        paragraph:
          "Reduced estrogen levels can make vaginal tissues thinner and less lubricated.",
        cards: [
          {
            title: "Menopause",
            description:
              "Lower estrogen levels commonly cause dryness and discomfort.",
          },
          {
            title: "Hormonal changes",
            description:
              "Breastfeeding, stress, or medicines may also contribute.",
          },
          {
            title: "Vaginal tissue changes",
            description:
              "Tissues may become sensitive, dry, and easily irritated.",
          },
        ],
      },
      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Vaginal dryness care approach",
        color: "#10b981",
        paragraph:
          "Treatment helps restore comfort and protect intimate health.",
        timeline: [
          {
            label: "Step 1",
            title: "Gynecology consultation",
            description:
              "Doctor evaluates symptoms and rules out infection.",
          },
          {
            label: "Step 2",
            title: "Moisturizers or lubricants",
            description:
              "Non-hormonal options may improve comfort.",
          },
          {
            label: "Step 3",
            title: "Hormonal treatment",
            description:
              "Local estrogen therapy may be advised in selected patients.",
          },
          {
            label: "Step 4",
            title: "Follow-up",
            description:
              "Regular review helps ensure long-term relief.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Menopause Care",
      title: "Bone Health After Menopause",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "bone-health-after-menopause",
      slug: "bone-health-after-menopause",
      category: "menopause-care",
      title: "Bone Health After Menopause",
      intro:
        "After menopause, reduced estrogen levels can increase the risk of bone weakness and osteoporosis. Preventive care helps maintain strength and mobility.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Bone loss can happen silently after menopause, so regular screening and preventive care are important.",
        "Nutrition, exercise, vitamin support, and medical guidance help reduce fracture risk and protect long-term health.",
      ],
    },

    sections: [
      {
        id: "risk",
        type: "warning",
        eyebrow: "Risk Factors",
        title: "Who has higher bone weakness risk",
        color: "#ef4444",
        paragraph:
          "Some women need extra attention for bone health after menopause.",
        items: [
          "Early menopause",
          "Low calcium intake",
          "Vitamin D deficiency",
          "Sedentary lifestyle",
          "Family history of osteoporosis",
          "Previous fracture history",
        ],
      },
      {
        id: "care",
        type: "cards",
        eyebrow: "Bone Care",
        title: "Ways to protect bone strength",
        color: "#6366f1",
        paragraph:
          "Daily habits play an important role in maintaining bone density.",
        cards: [
          {
            title: "Calcium and vitamin D",
            description:
              "These nutrients support strong bones and muscle function.",
          },
          {
            title: "Weight-bearing exercise",
            description:
              "Walking, strength training, and yoga help improve bone strength.",
          },
          {
            title: "Bone density test",
            description:
              "DEXA scan helps detect osteoporosis or low bone mass.",
          },
        ],
      },
      {
        id: "prevention",
        type: "timeline",
        eyebrow: "Prevention",
        title: "Bone health prevention plan",
        color: "#10b981",
        paragraph:
          "Preventive steps help reduce future fracture and osteoporosis risk.",
        timeline: [
          {
            label: "Step 1",
            title: "Risk assessment",
            description:
              "Doctor reviews age, menopause history, diet, and lifestyle.",
          },
          {
            label: "Step 2",
            title: "Bone density check",
            description:
              "DEXA scan may be recommended for bone strength evaluation.",
          },
          {
            label: "Step 3",
            title: "Nutrition and exercise",
            description:
              "Calcium-rich diet and regular movement support bone health.",
          },
          {
            label: "Step 4",
            title: "Medical support",
            description:
              "Medicines may be advised if bone density is low.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];



export const sexualIntimateHealthBlogs = [
  {
    hero: {
      badge: "Sexual & Intimate Health",
      title: "Vaginal Infection Treatment and Intimate Care",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "vaginal-infection-treatment",
      slug: "vaginal-infection-treatment",
      category: "sexual-intimate-health",
      title: "Vaginal Infection Treatment and Intimate Care",
      intro:
        "Vaginal infections are common women health conditions that may cause itching, discharge, irritation, discomfort, or unusual odor. Early treatment helps prevent complications and improves intimate wellness.",
      image:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Vaginal infections may happen because of bacterial imbalance, fungal infection, poor hygiene, hormonal changes, or irritation.",
        "A gynecology consultation helps identify the exact cause and provides the right treatment plan for long-term relief.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Common signs of vaginal infection",
        color: "#ef4444",
        paragraph:
          "Symptoms can vary depending on the type and severity of infection.",
        items: [
          "Itching or irritation",
          "Burning sensation",
          "Unusual vaginal discharge",
          "Bad odor",
          "Pain during urination",
          "Discomfort during intimacy",
        ],
      },

      {
        id: "causes",
        type: "cards",
        eyebrow: "Possible Causes",
        title: "Why vaginal infections happen",
        color: "#8b5cf6",
        paragraph:
          "Different factors can disturb natural vaginal balance and increase infection risk.",
        cards: [
          {
            title: "Bacterial imbalance",
            description:
              "Changes in healthy vaginal bacteria may trigger infection.",
          },
          {
            title: "Fungal infection",
            description:
              "Yeast overgrowth may cause itching and thick discharge.",
          },
          {
            title: "Hormonal changes",
            description:
              "Pregnancy, menopause, or hormonal imbalance may affect vaginal health.",
          },
        ],
      },

      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Vaginal infection care approach",
        color: "#10b981",
        paragraph:
          "Early diagnosis and proper treatment help restore intimate health and comfort.",
        timeline: [
          {
            label: "Step 1",
            title: "Medical examination",
            description:
              "Doctor evaluates symptoms and vaginal health condition.",
          },
          {
            label: "Step 2",
            title: "Testing if needed",
            description:
              "Samples may be tested to identify infection type.",
          },
          {
            label: "Step 3",
            title: "Medicines and hygiene care",
            description:
              "Treatment may include antifungal or antibacterial medicines.",
          },
          {
            label: "Step 4",
            title: "Preventive care",
            description:
              "Lifestyle and hygiene support help reduce recurrence.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Women Health Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Sexual & Intimate Health",
      title: "White Discharge Treatment and Women Wellness",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "white-discharge-treatment",
      slug: "white-discharge-treatment",
      category: "sexual-intimate-health",
      title: "White Discharge Treatment and Women Wellness",
      intro:
        "White discharge is common in women and may happen naturally or due to infection, hormonal changes, or reproductive health concerns.",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Normal vaginal discharge helps maintain vaginal cleanliness and protection against infection.",
        "Medical attention may be needed if discharge changes in color, smell, quantity, or causes discomfort.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "checkList",
        eyebrow: "Warning Signs",
        title: "When white discharge needs medical attention",
        color: "#ec4899",
        paragraph:
          "Some symptoms may indicate infection or hormonal imbalance.",
        items: [
          "Foul-smelling discharge",
          "Yellow or green discharge",
          "Itching or burning",
          "Pelvic discomfort",
          "Pain during urination",
          "Thick or unusual texture",
        ],
      },

      {
        id: "causes",
        type: "cards",
        eyebrow: "Causes",
        title: "Possible reasons for white discharge",
        color: "#6366f1",
        paragraph:
          "Discharge patterns may change due to hormones, infection, or reproductive conditions.",
        cards: [
          {
            title: "Hormonal changes",
            description:
              "Ovulation, pregnancy, or menstrual cycles may affect discharge.",
          },
          {
            title: "Vaginal infection",
            description:
              "Bacterial or fungal infection may cause abnormal discharge.",
          },
          {
            title: "Poor intimate hygiene",
            description:
              "Improper hygiene habits can disturb vaginal balance.",
          },
        ],
      },

      {
        id: "care",
        type: "timeline",
        eyebrow: "Treatment",
        title: "White discharge treatment approach",
        color: "#14b8a6",
        paragraph:
          "Treatment depends on the cause and severity of symptoms.",
        timeline: [
          {
            label: "Step 1",
            title: "Gynecology consultation",
            description:
              "Doctor reviews symptoms and reproductive health history.",
          },
          {
            label: "Step 2",
            title: "Testing if required",
            description:
              "Tests help identify bacterial, fungal, or hormonal causes.",
          },
          {
            label: "Step 3",
            title: "Medical treatment",
            description:
              "Medicines or hygiene guidance may be recommended.",
          },
          {
            label: "Step 4",
            title: "Preventive care",
            description:
              "Healthy hygiene and regular checkups support intimate wellness.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Women Health Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Sexual & Intimate Health",
      title: "Urinary Tract Infection in Women",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "urinary-tract-infection-women",
      slug: "urinary-tract-infection-women",
      category: "sexual-intimate-health",
      title: "Urinary Tract Infection in Women",
      intro:
        "Urinary tract infections (UTIs) are common in women and may cause burning urination, pelvic discomfort, and frequent urge to urinate.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "UTIs happen when bacteria enter the urinary tract and multiply, causing irritation and infection.",
        "Early diagnosis and proper treatment help prevent kidney-related complications and recurring infections.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Common signs of urinary tract infection",
        color: "#ef4444",
        paragraph:
          "UTI symptoms may become severe if treatment is delayed.",
        items: [
          "Burning during urination",
          "Frequent urge to urinate",
          "Pelvic pain",
          "Cloudy urine",
          "Strong urine odor",
          "Fever in severe infections",
        ],
      },

      {
        id: "risk",
        type: "cards",
        eyebrow: "Risk Factors",
        title: "Who may have higher UTI risk",
        color: "#8b5cf6",
        paragraph:
          "Certain conditions and habits may increase urinary infection risk.",
        cards: [
          {
            title: "Poor hydration",
            description:
              "Low water intake may increase bacterial growth risk.",
          },
          {
            title: "Hormonal changes",
            description:
              "Pregnancy and menopause may affect urinary health.",
          },
          {
            title: "Recurrent infections",
            description:
              "Previous UTIs may increase recurrence risk.",
          },
        ],
      },

      {
        id: "treatment",
        type: "timeline",
        eyebrow: "Care Plan",
        title: "UTI treatment and prevention",
        color: "#10b981",
        paragraph:
          "Prompt treatment and healthy habits help reduce infection recurrence.",
        timeline: [
          {
            label: "Step 1",
            title: "Urine testing",
            description:
              "Tests help confirm urinary infection and bacteria type.",
          },
          {
            label: "Step 2",
            title: "Medical treatment",
            description:
              "Antibiotics and hydration support recovery.",
          },
          {
            label: "Step 3",
            title: "Lifestyle support",
            description:
              "Hydration and hygiene help maintain urinary health.",
          },
          {
            label: "Step 4",
            title: "Follow-up care",
            description:
              "Doctors monitor recurring infections if symptoms persist.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Women Health Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },

  {
    hero: {
      badge: "Sexual & Intimate Health",
      title: "Pain During Intercourse: Causes and Treatment",
      date: "May 24, 2026",
      readTime: "5 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "pain-during-intercourse",
      slug: "pain-during-intercourse",
      category: "sexual-intimate-health",
      title: "Pain During Intercourse: Causes and Treatment",
      intro:
        "Pain during intercourse can affect physical comfort, emotional wellbeing, relationships, and intimate confidence in women.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Pain during intimacy may happen because of infection, vaginal dryness, hormonal imbalance, pelvic conditions, or emotional stress.",
        "A gynecological evaluation helps identify the underlying cause and provides the right treatment support.",
      ],
    },

    sections: [
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Common symptoms associated with painful intercourse",
        color: "#ef4444",
        paragraph:
          "Pain may happen before, during, or after intercourse.",
        items: [
          "Burning sensation",
          "Deep pelvic pain",
          "Vaginal dryness",
          "Muscle tightness",
          "Fear or anxiety during intimacy",
          "Discomfort after intercourse",
        ],
      },

      {
        id: "causes",
        type: "cards",
        eyebrow: "Possible Causes",
        title: "Why painful intercourse happens",
        color: "#6366f1",
        paragraph:
          "Several physical and hormonal conditions may contribute to discomfort.",
        cards: [
          {
            title: "Vaginal dryness",
            description:
              "Reduced lubrication may cause pain and irritation.",
          },
          {
            title: "Infections",
            description:
              "Vaginal or pelvic infections may increase sensitivity and discomfort.",
          },
          {
            title: "Hormonal imbalance",
            description:
              "Hormonal changes during menopause or postpartum periods may affect intimacy.",
          },
        ],
      },

      {
        id: "management",
        type: "timeline",
        eyebrow: "Treatment",
        title: "Pain during intercourse treatment plan",
        color: "#10b981",
        paragraph:
          "Treatment focuses on improving comfort, emotional wellbeing, and intimate health.",
        timeline: [
          {
            label: "Step 1",
            title: "Medical consultation",
            description:
              "Doctors evaluate symptoms and reproductive health history.",
          },
          {
            label: "Step 2",
            title: "Diagnosis",
            description:
              "Tests may identify infection, hormonal changes, or pelvic conditions.",
          },
          {
            label: "Step 3",
            title: "Treatment support",
            description:
              "Medicines, lubricants, or hormonal therapy may be advised.",
          },
          {
            label: "Step 4",
            title: "Follow-up care",
            description:
              "Ongoing care helps improve comfort and confidence.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Women Health Specialist",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];



export const laparoscopicSurgeryBlogs = [
  {
    hero: {
      badge: "Laparoscopic Surgery",
      title: "Endometriosis Treatment in Gurgaon",
      date: "May 24, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "endometriosis-treatment",
      slug: "endometriosis-treatment",
      category: "laparoscopic-surgery",
      title: "Endometriosis Treatment in Gurgaon",
      intro:
        "Endometriosis is a painful gynecological condition where tissue similar to the lining of the uterus grows outside the uterus, affecting ovaries, tubes, bladder, and pelvic organs.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Many women silently suffer from severe period pain, fertility problems, and chronic pelvic discomfort without realizing that endometriosis may be the reason.",
        "Early diagnosis and advanced laparoscopic surgery can help preserve fertility, reduce pain, and improve quality of life significantly.",
      ],
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What is Endometriosis?",
        title: "Understanding endometriosis",
        color: "#ec4899",
        paragraph:
          "Endometriosis happens when tissue similar to the uterine lining grows outside the uterus and causes inflammation, pain, and scarring.",
        cards: [
          {
            title: "Pelvic pain",
            description:
              "Pain may become severe during periods and daily activities.",
          },
          {
            title: "Fertility issues",
            description:
              "Endometriosis may affect ovaries, tubes, and conception chances.",
          },
          {
            title: "Progressive condition",
            description:
              "Without treatment, disease severity may increase over time.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Symptoms you should not ignore",
        color: "#ef4444",
        paragraph:
          "Many women think severe pain is normal — but it is not.",
        items: [
          "Severe pain during periods",
          "Pain during or after intercourse",
          "Difficulty in conceiving",
          "Chronic pelvic pain",
          "Painful urination during periods",
          "Painful bowel movements",
          "Recurrent chocolate cyst",
        ],
      },

      {
        id: "cyst",
        type: "cards",
        eyebrow: "Chocolate Cyst",
        title: "What is a chocolate cyst?",
        color: "#8b5cf6",
        paragraph:
          "Chocolate cysts are ovarian cysts formed because of endometriosis tissue inside ovaries.",
        cards: [
          {
            title: "Dark blood-filled cyst",
            description:
              "The cyst contains old blood, giving a chocolate-like appearance.",
          },
          {
            title: "Pelvic discomfort",
            description:
              "Cysts may cause pain, pressure, or discomfort during periods.",
          },
          {
            title: "Fertility impact",
            description:
              "Large or recurrent cysts may affect ovarian reserve and fertility.",
          },
        ],
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why It Happens",
        title: "Possible causes of endometriosis",
        color: "#f97316",
        paragraph:
          "The exact cause is not completely understood, but several factors may contribute.",
        items: [
          "Retrograde menstruation",
          "Hormonal imbalance",
          "Genetic factors",
          "Immune system abnormalities",
          "Estrogen-related growth stimulation",
          "Inflammatory pelvic environment",
        ],
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Why Early Diagnosis Matters",
        title: "How delayed treatment affects health",
        color: "#10b981",
        paragraph:
          "Endometriosis is a progressive condition and may worsen without treatment.",
        timeline: [
          {
            label: "Stage 1",
            title: "Increasing pain",
            description:
              "Pelvic pain and period pain may become more severe.",
          },
          {
            label: "Stage 2",
            title: "Ovarian damage",
            description:
              "Chocolate cysts may affect healthy ovarian tissue.",
          },
          {
            label: "Stage 3",
            title: "Fertility reduction",
            description:
              "Adhesions and inflammation may reduce pregnancy chances.",
          },
          {
            label: "Stage 4",
            title: "Organ adhesions",
            description:
              "Scar tissue may affect bowel, bladder, and pelvic organs.",
          },
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "Advanced Treatment",
        title: "Treatment options we offer",
        color: "#14b8a6",
        paragraph:
          "Treatment depends on symptoms, fertility goals, age, and disease severity.",
        cards: [
          {
            title: "Medical management",
            description:
              "Pain relief medicines and hormonal therapy help control progression.",
          },
          {
            title: "Laparoscopic surgery",
            description:
              "Keyhole surgery removes endometriosis tissue with minimal cuts.",
          },
          {
            title: "Fertility preservation",
            description:
              "Treatment focuses on protecting reproductive health whenever possible.",
          },
        ],
      },

      {
        id: "laparoscopy",
        type: "checkList",
        eyebrow: "Laparoscopic Surgery",
        title: "Benefits of minimally invasive surgery",
        color: "#0ea5e9",
        paragraph:
          "Advanced laparoscopic surgery offers faster recovery and better long-term results.",
        items: [
          "Tiny keyhole incisions",
          "Minimal scars",
          "Faster recovery",
          "Less postoperative pain",
          "Early return to work",
          "Precise disease removal",
          "Better fertility outcomes",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "When To Consult",
        title: "When should you meet a specialist?",
        color: "#dc2626",
        paragraph:
          "Do not delay medical evaluation if symptoms affect your quality of life.",
        items: [
          "Pain affects daily routine",
          "Difficulty conceiving",
          "Repeated chocolate cysts",
          "Heavy painful periods",
          "Previous treatment failure",
          "Severe pelvic discomfort",
        ],
      },

      {
        id: "cost",
        type: "timeline",
        eyebrow: "Surgery Information",
        title: "Endometriosis surgery and recovery",
        color: "#22c55e",
        paragraph:
          "Cost and recovery depend on disease severity, cyst size, and previous surgeries.",
        timeline: [
          {
            label: "Hospital Stay",
            title: "3–4 days admission",
            description:
              "Most patients recover quickly after laparoscopic surgery.",
          },
          {
            label: "Recovery",
            title: "Faster healing",
            description:
              "Patients usually return to normal activities early.",
          },
         
          {
            label: "Consultation",
            title: "Expert evaluation",
            description:
              "Discuss your symptoms and fertility goals with a specialist.",
          },
        ],
      },
    ] satisfies BlogSection[],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
  {
    hero: {
      badge: "Laparoscopic Surgery",
      title: "Fibroid Treatment in Gurgaon",
      date: "May 24, 2026",
      readTime: "7 min read",
      status: "Doctor Reviewed",
    },
  
    article: {
      id: "fibroid-removal-surgery",
      slug: "fibroid-removal-surgery",
      category: "laparoscopic-surgery",
      title: "Fibroid Treatment in Gurgaon",
      intro:
        "Fibroids are non-cancerous growths inside or around the uterus that may cause heavy bleeding, pelvic pain, pressure symptoms, and fertility problems in women.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1400&auto=format&fit=crop",
  
      paragraphs: [
        "Fibroids are one of the most common gynecological conditions affecting women between 30 to 50 years of age.",
        "Modern laparoscopic surgery allows fibroid removal with minimal cuts, faster recovery, less pain, and preservation of fertility whenever possible.",
      ],
    },
  
    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What is a Fibroid?",
        title: "Understanding uterine fibroids",
        color: "#ec4899",
        paragraph:
          "Fibroids are benign (non-cancerous) growths that develop inside or around the uterus.",
        cards: [
          {
            title: "Intramural fibroid",
            description:
              "Fibroid present within the muscular wall of the uterus.",
          },
          {
            title: "Submucosal fibroid",
            description:
              "Fibroid inside the uterine cavity that may affect bleeding and fertility.",
          },
          {
            title: "Subserosal fibroid",
            description:
              "Fibroid on the outer surface of the uterus causing pressure symptoms.",
          },
        ],
      },
  
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Symptoms you should not ignore",
        color: "#ef4444",
        paragraph:
          "Many women ignore fibroid symptoms for years, but timely treatment improves quality of life.",
        items: [
          "Heavy or prolonged periods",
          "Passing clots during menstruation",
          "Low hemoglobin and weakness",
          "Pelvic pain or pressure",
          "Frequent urination",
          "Bloating or abdominal heaviness",
          "Difficulty in conceiving",
        ],
      },
  
      {
        id: "common",
        type: "checkList",
        eyebrow: "How Common Are Fibroids?",
        title: "Fibroids are very common in women",
        color: "#8b5cf6",
        paragraph:
          "Fibroids affect a large number of women during reproductive age.",
        items: [
          "Seen in approximately 1 in 4 women",
          "Common between age 30 to 50 years",
          "May occur in multiple family members",
          "Can remain silent for years",
          "Some fibroids grow slowly over time",
          "Large fibroids may affect fertility and daily life",
        ],
      },
  
      {
        id: "treatment-needed",
        type: "timeline",
        eyebrow: "When Treatment Is Needed",
        title: "When should fibroids be treated?",
        color: "#10b981",
        paragraph:
          "Not every fibroid needs surgery, but proper evaluation is important.",
        timeline: [
          {
            label: "Condition 1",
            title: "Heavy bleeding",
            description:
              "Treatment is needed if bleeding affects hemoglobin or daily life.",
          },
          {
            label: "Condition 2",
            title: "Pain or pressure",
            description:
              "Pelvic discomfort or abdominal pressure may require treatment.",
          },
          {
            label: "Condition 3",
            title: "Increasing fibroid size",
            description:
              "Large or growing fibroids may create complications.",
          },
          {
            label: "Condition 4",
            title: "Infertility concerns",
            description:
              "Fibroids affecting fertility may require surgical removal.",
          },
        ],
      },
  
      {
        id: "management",
        type: "cards",
        eyebrow: "Treatment Options",
        title: "Fibroid treatment options",
        color: "#14b8a6",
        paragraph:
          "Treatment depends on fibroid size, symptoms, age, and fertility plans.",
        cards: [
          {
            title: "Medical management",
            description:
              "Medicines and hormonal therapy may help control bleeding temporarily.",
          },
          {
            title: "Laparoscopic Myomectomy",
            description:
              "Fibroid removal surgery preserving the uterus and fertility.",
          },
          {
            title: "Hysterectomy",
            description:
              "Uterus removal may be advised in selected severe or recurrent cases.",
          },
        ],
      },
  
      {
        id: "laparoscopy",
        type: "checkList",
        eyebrow: "Laparoscopic Surgery",
        title: "Benefits of laparoscopic fibroid surgery",
        color: "#0ea5e9",
        paragraph:
          "Modern minimally invasive surgery offers safer recovery and better comfort.",
        items: [
          "Minimal cuts",
          "Less postoperative pain",
          "Minimal blood loss",
          "Faster healing",
          "Short hospital stay",
          "Early return to work",
          "Better cosmetic outcome",
        ],
      },
  
      {
        id: "cost",
        type: "timeline",
        eyebrow: "Surgery Cost & Recovery",
        title: "Fibroid surgery recovery and cost",
        color: "#22c55e",
        paragraph:
          "Cost depends on fibroid size, number, and previous surgical history.",
        timeline: [
          {
            label: "Hospital Stay",
            title: "3–4 days stay",
            description:
              "Most patients recover quickly after laparoscopic surgery.",
          },
          {
            label: "Recovery",
            title: "Quick healing",
            description:
              "Women usually return to normal routine early.",
          },
          {
            label: "Approx Cost",
            title: "₹1–1.5 lakh",
            description:
              "Cost varies depending on complexity and hospital factors.",
          },
          {
            label: "Expert Consultation",
            title: "Specialized evaluation",
            description:
              "Discuss treatment options with Dr. Kusum Lata.",
          },
        ],
      },
  
      {
        id: "faq",
        type: "cards",
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        color: "#f97316",
        paragraph:
          "Common questions women ask regarding fibroid treatment and surgery.",
        cards: [
          {
            title: "Are fibroids cancerous?",
            description:
              "No, fibroids are benign (non-cancerous) in most cases.",
          },
          {
            title: "Can fibroids affect fertility?",
            description:
              "Yes, especially large or submucosal fibroids may affect pregnancy chances.",
          },
          {
            title: "Is surgery always necessary?",
            description:
              "No, many fibroids can be managed medically without surgery.",
          },
          {
            title: "Is laparoscopy safe?",
            description:
              "Yes, laparoscopic surgery is a safe minimally invasive procedure with faster recovery.",
          },
        ],
      },
    ] satisfies BlogSection[],
  
    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
  {
    hero: {
      badge: "Laparoscopic Surgery",
      title: "Ovarian Cyst Treatment in Gurgaon",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },
  
    article: {
      id: "ovarian-cyst-surgery",
      slug: "ovarian-cyst-surgery",
      category: "laparoscopic-surgery",
      title: "Ovarian Cyst Treatment in Gurgaon",
      intro:
        "An ovarian cyst is a fluid-filled swelling inside or on the ovary. While many cysts are harmless and disappear naturally, some may cause pain, irregular periods, fertility problems, or complications requiring treatment.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",
  
      paragraphs: [
        "Ovarian cysts are common in women of reproductive age and are often detected during routine ultrasound examinations.",
        "Advanced laparoscopic surgery allows safe cyst removal while preserving healthy ovarian tissue and fertility whenever possible.",
      ],
    },
  
    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What is an Ovarian Cyst?",
        title: "Understanding ovarian cysts",
        color: "#ec4899",
        paragraph:
          "An ovarian cyst is a fluid-filled sac that develops in or around the ovary.",
        cards: [
          {
            title: "Fluid-filled swelling",
            description:
              "Most cysts contain fluid and vary in size from small to large.",
          },
          {
            title: "Hormonal influence",
            description:
              "Some cysts develop naturally during menstrual cycles.",
          },
          {
            title: "Fertility concerns",
            description:
              "Large or recurrent cysts may affect reproductive health.",
          },
        ],
      },
  
      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Common symptoms of ovarian cysts",
        color: "#ef4444",
        paragraph:
          "Some cysts cause symptoms while others are detected only during scans.",
        items: [
          "Pain in lower abdomen",
          "One-sided pelvic pain",
          "Bloating or heaviness",
          "Irregular or delayed periods",
          "Sudden severe pain",
          "Difficulty in conceiving",
          "Pelvic pressure or discomfort",
        ],
      },
  
      {
        id: "types",
        type: "cards",
        eyebrow: "Types of Cysts",
        title: "Different types of ovarian cysts",
        color: "#8b5cf6",
        paragraph:
          "Correct diagnosis is important before planning treatment.",
        cards: [
          {
            title: "Functional cyst",
            description:
              "Common cysts that usually disappear naturally over time.",
          },
          {
            title: "Chocolate cyst",
            description:
              "Endometriosis-related cyst filled with old blood.",
          },
          {
            title: "Dermoid cyst",
            description:
              "Contains tissues like hair, fat, or skin elements.",
          },
          {
            title: "Hemorrhagic cyst",
            description:
              "Bleeding occurs inside the ovarian cyst.",
          },
        ],
      },
  
      {
        id: "treatment-needed",
        type: "timeline",
        eyebrow: "When Treatment Is Needed",
        title: "When should ovarian cysts be treated?",
        color: "#10b981",
        paragraph:
          "Not every cyst requires surgery, but timely treatment may prevent complications.",
        timeline: [
          {
            label: "Condition 1",
            title: "Large or persistent cyst",
            description:
              "Cysts that remain for long duration may need treatment.",
          },
          {
            label: "Condition 2",
            title: "Pain and discomfort",
            description:
              "Pelvic pain or pressure symptoms may require surgery.",
          },
          {
            label: "Condition 3",
            title: "Suspicious ultrasound findings",
            description:
              "Complex cysts may require detailed evaluation.",
          },
          {
            label: "Condition 4",
            title: "Fertility concerns",
            description:
              "Cysts associated with infertility may require removal.",
          },
        ],
      },
  
      {
        id: "management",
        type: "cards",
        eyebrow: "Treatment Options",
        title: "Ovarian cyst treatment options",
        color: "#14b8a6",
        paragraph:
          "Treatment depends on cyst type, size, symptoms, and fertility goals.",
        cards: [
          {
            title: "Observation",
            description:
              "Simple cysts may be monitored with regular ultrasounds.",
          },
          {
            title: "Medical management",
            description:
              "Medicines may help control symptoms or hormonal imbalance.",
          },
          {
            title: "Laparoscopic cyst removal",
            description:
              "Minimally invasive surgery removes cyst while preserving ovary.",
          },
        ],
      },
  
      {
        id: "laparoscopy",
        type: "checkList",
        eyebrow: "Laparoscopic Surgery",
        title: "Benefits of laparoscopic ovarian cyst removal",
        color: "#0ea5e9",
        paragraph:
          "Advanced minimally invasive surgery provides quicker healing and better comfort.",
        items: [
          "Minimal cuts",
          "Faster recovery",
          "Less pain",
          "Minimal blood loss",
          "Short hospital stay",
          "Preservation of ovary",
          "Early return to normal routine",
        ],
      },
  
      {
        id: "fertility",
        type: "checkList",
        eyebrow: "Fertility Protection",
        title: "Special care for fertility preservation",
        color: "#f97316",
        paragraph:
          "Preserving healthy ovarian tissue is extremely important for women planning pregnancy.",
        items: [
          "Ovary-preserving surgery",
          "Careful cyst removal technique",
          "Protection of ovarian reserve",
          "Fertility-focused surgical planning",
          "Hormonal balance monitoring",
        ],
      },
  
      {
        id: "faq",
        type: "cards",
        eyebrow: "Frequently Asked Questions",
        title: "Common questions about ovarian cysts",
        color: "#22c55e",
        paragraph:
          "Women commonly have questions regarding ovarian cyst diagnosis and treatment.",
        cards: [
          {
            title: "Are ovarian cysts dangerous?",
            description:
              "Most ovarian cysts are benign and harmless, but some need monitoring or treatment.",
          },
          {
            title: "Can cysts disappear naturally?",
            description:
              "Yes, many functional cysts resolve on their own without surgery.",
          },
          {
            title: "Will surgery remove my ovary?",
            description:
              "No, surgery usually aims to remove only the cyst while preserving the ovary.",
          },
          {
            title: "Can ovarian cysts affect pregnancy?",
            description:
              "Some cysts may affect fertility, but treatment can improve pregnancy chances.",
          },
        ],
      },
    ] satisfies BlogSection[],
  
    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
  {
    hero: {
      badge: "Laparoscopic Surgery",
      title: "Laparoscopic Cervical Cerclage in Gurgaon",
      date: "May 24, 2026",
      readTime: "7 min read",
      status: "Doctor Reviewed",
    },
  
    article: {
      id: "cervical-cerclage",
      slug: "cervical-cerclage",
      category: "laparoscopic-surgery",
      title: "Laparoscopic Cervical Cerclage in Gurgaon",
      intro:
        "Laparoscopic cervical cerclage is an advanced minimally invasive procedure used to support weak cervix and help prevent recurrent miscarriages and preterm birth.",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1400&auto=format&fit=crop",
  
      paragraphs: [
        "Some women experience repeated second trimester pregnancy losses because the cervix opens too early without pain during pregnancy.",
        "Laparoscopic cervical cerclage provides strong cervical support and improves the chances of carrying pregnancy safely to term.",
      ],
    },
  
    sections: [
      {
        id: "incompetence",
        type: "cards",
        eyebrow: "What is Cervical Incompetence?",
        title: "Understanding weak cervix in pregnancy",
        color: "#ec4899",
        paragraph:
          "The cervix should remain closed during pregnancy, but in some women it opens too early and may lead to pregnancy loss.",
        cards: [
          {
            title: "Recurrent miscarriages",
            description:
              "Especially repeated second trimester pregnancy losses.",
          },
          {
            title: "Early cervical opening",
            description:
              "Cervix may open painlessly during pregnancy.",
          },
          {
            title: "Preterm birth risk",
            description:
              "Weak cervix may lead to premature delivery.",
          },
        ],
      },
  
      {
        id: "who-needs",
        type: "warning",
        eyebrow: "Who Needs Cerclage?",
        title: "Women who may benefit from laparoscopic cerclage",
        color: "#ef4444",
        paragraph:
          "Specialized cervical support may be needed in selected pregnancy cases.",
        items: [
          "Recurrent second trimester pregnancy losses",
          "Previous failed vaginal cerclage",
          "Very short cervix",
          "Damaged cervix after procedures",
          "Congenital cervical weakness",
          "History of painless cervical opening",
        ],
      },
  
      {
        id: "procedure",
        type: "cards",
        eyebrow: "Procedure",
        title: "What is laparoscopic cervical cerclage?",
        color: "#8b5cf6",
        paragraph:
          "A strong stitch is placed around the cervix through minimally invasive laparoscopic surgery.",
        cards: [
          {
            title: "Keyhole surgery",
            description:
              "Procedure is performed using tiny laparoscopic cuts.",
          },
          {
            title: "Upper cervical support",
            description:
              "Stitch is placed higher on the cervix for stronger support.",
          },
          {
            title: "Future pregnancy support",
            description:
              "The stitch may remain in place for future pregnancies.",
          },
        ],
      },
  
      {
        id: "benefits",
        type: "checkList",
        eyebrow: "Benefits",
        title: "Advantages of laparoscopic cerclage",
        color: "#10b981",
        paragraph:
          "Modern minimally invasive cerclage offers stronger support and faster recovery.",
        items: [
          "Higher success rate in preventing pregnancy loss",
          "Stronger than vaginal cerclage",
          "Minimal cuts and scars",
          "Less postoperative pain",
          "Less blood loss",
          "Faster recovery",
          "Can be performed before pregnancy",
        ],
      },
  
      {
        id: "timing",
        type: "timeline",
        eyebrow: "Best Timing",
        title: "When should cerclage be done?",
        color: "#14b8a6",
        paragraph:
          "Timing of cerclage depends on medical history and pregnancy stage.",
        timeline: [
          {
            label: "Before Pregnancy",
            title: "Pre-pregnancy cerclage",
            description:
              "Ideal for women with repeated pregnancy losses or failed previous stitch.",
          },
          {
            label: "12–14 Weeks",
            title: "Early pregnancy cerclage",
            description:
              "Procedure may also be performed in early pregnancy.",
          },
          {
            label: "Pregnancy Monitoring",
            title: "Regular follow-up",
            description:
              "Cervical length and pregnancy progress are monitored carefully.",
          },
          {
            label: "Delivery",
            title: "Cesarean section",
            description:
              "Delivery is usually planned by C-section because the stitch remains in place.",
          },
        ],
      },
  
      {
        id: "recovery",
        type: "checkList",
        eyebrow: "Recovery",
        title: "Recovery after laparoscopic cerclage",
        color: "#0ea5e9",
        paragraph:
          "Most women recover quickly after minimally invasive surgery.",
        items: [
          "Short hospital stay",
          "Minimal postoperative discomfort",
          "Early return to routine",
          "Small laparoscopic cuts",
          "Quick healing process",
          "Pregnancy monitoring support",
        ],
      },
  
      {
        id: "faq",
        type: "cards",
        eyebrow: "Frequently Asked Questions",
        title: "Common questions about cervical cerclage",
        color: "#f97316",
        paragraph:
          "Women often have concerns regarding pregnancy safety and cerclage procedure.",
        cards: [
          {
            title: "Is the procedure safe?",
            description:
              "Yes, laparoscopic cerclage is a safe minimally invasive procedure in experienced hands.",
          },
          {
            title: "Can I conceive naturally after cerclage?",
            description:
              "Yes, natural conception is possible after cerclage placement.",
          },
          {
            title: "Will I need cesarean delivery?",
            description:
              "Yes, delivery is usually performed by C-section because the stitch stays in place.",
          },
          {
            title: "Does cerclage improve pregnancy outcome?",
            description:
              "Yes, it significantly improves chances of carrying pregnancy to term.",
          },
        ],
      },
    ] satisfies BlogSection[],
  
    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
  {
    hero: {
      badge: "Laparoscopic Surgery",
      title: "Hysteroscopy Treatment in Gurgaon",
      date: "May 24, 2026",
      readTime: "6 min read",
      status: "Doctor Reviewed",
    },
  
    article: {
      id: "hysteroscopy-treatment",
      slug: "hysteroscopy-treatment",
      category: "laparoscopic-surgery",
      title: "Hysteroscopy Treatment in Gurgaon",
      intro:
        "Hysteroscopy is an advanced minimally invasive gynecological procedure used to diagnose and treat problems inside the uterus with high precision and faster recovery.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",
  
      paragraphs: [
        "During hysteroscopy, a thin telescope-like camera is inserted through the vagina to directly examine the inside of the uterus.",
        "Most hysteroscopy procedures are day-care surgeries, allowing women to return home the same day with quicker recovery and minimal discomfort.",
      ],
    },
  
    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What is Hysteroscopy?",
        title: "Understanding hysteroscopy procedure",
        color: "#ec4899",
        paragraph:
          "Hysteroscopy allows direct visualization and treatment of uterine problems without abdominal cuts.",
        cards: [
          {
            title: "Advanced camera procedure",
            description:
              "A thin hysteroscope is inserted through the vagina into the uterus.",
          },
          {
            title: "Diagnosis and treatment",
            description:
              "Used to identify and treat uterine abnormalities accurately.",
          },
          {
            title: "Day-care surgery",
            description:
              "Most women go home on the same day after the procedure.",
          },
        ],
      },
  
      {
        id: "conditions",
        type: "warning",
        eyebrow: "Conditions Treated",
        title: "Common problems treated by hysteroscopy",
        color: "#ef4444",
        paragraph:
          "Hysteroscopy helps diagnose and treat multiple uterine conditions.",
        items: [
          "Heavy menstrual bleeding",
          "Irregular periods",
          "Bleeding after menopause",
          "Endometrial polyps",
          "Fibroids inside uterus",
          "Recurrent miscarriages",
          "Infertility and IVF failure",
          "Uterine septum",
          "Asherman syndrome",
          "Embedded Copper-T",
          "Retained tissue after miscarriage",
        ],
      },
  
      {
        id: "benefits",
        type: "checkList",
        eyebrow: "Benefits",
        title: "Advantages of hysteroscopy",
        color: "#10b981",
        paragraph:
          "Modern minimally invasive hysteroscopy provides faster healing and better comfort.",
        items: [
          "No abdominal cuts",
          "Minimal pain",
          "Less blood loss",
          "Faster recovery",
          "High precision treatment",
          "Fertility-preserving procedure",
          "Short hospital stay",
          "Quick return to daily routine",
        ],
      },
  
      {
        id: "recovery",
        type: "timeline",
        eyebrow: "Recovery",
        title: "Recovery after hysteroscopy",
        color: "#14b8a6",
        paragraph:
          "Most women recover quickly and resume normal activities early.",
        timeline: [
          {
            label: "Same Day",
            title: "Day-care discharge",
            description:
              "Most patients return home on the same day.",
          },
          {
            label: "1–2 Days",
            title: "Mild spotting",
            description:
              "Light spotting or discharge may occur temporarily.",
          },
          {
            label: "Few Days",
            title: "Quick recovery",
            description:
              "Normal activities are usually resumed quickly.",
          },
          {
            label: "Follow-Up",
            title: "Post-procedure review",
            description:
              "Doctors review recovery and treatment results.",
          },
        ],
      },
  
      {
        id: "why-minimal",
        type: "cards",
        eyebrow: "Why Women Prefer Hysteroscopy",
        title: "Benefits of minimally invasive hysteroscopy",
        color: "#8b5cf6",
        paragraph:
          "Women prefer hysteroscopy because it avoids open surgery in many uterine conditions.",
        cards: [
          {
            title: "Less postoperative pain",
            description:
              "Minimal tissue injury reduces discomfort after surgery.",
          },
          {
            title: "Minimal hospital stay",
            description:
              "Most procedures are performed as day-care surgery.",
          },
          {
            title: "Better cosmetic outcome",
            description:
              "No abdominal scars because surgery is done internally.",
          },
          {
            title: "Early return to work",
            description:
              "Recovery is much faster compared to open procedures.",
          },
        ],
      },
  
      {
        id: "fertility",
        type: "checkList",
        eyebrow: "Fertility Support",
        title: "How hysteroscopy helps fertility",
        color: "#0ea5e9",
        paragraph:
          "Correcting uterine abnormalities may improve fertility and IVF outcomes.",
        items: [
          "Removal of uterine polyps",
          "Fibroid treatment",
          "Correction of uterine septum",
          "Removal of adhesions",
          "Improved implantation chances",
          "Better IVF success support",
        ],
      },
  
      {
        id: "faq",
        type: "cards",
        eyebrow: "Frequently Asked Questions",
        title: "Common questions about hysteroscopy",
        color: "#f97316",
        paragraph:
          "Women often ask about pain, recovery, and fertility after hysteroscopy.",
        cards: [
          {
            title: "Is hysteroscopy painful?",
            description:
              "The procedure is usually performed under short anesthesia or sedation, so discomfort is minimal.",
          },
          {
            title: "How long does hysteroscopy take?",
            description:
              "Most procedures take around 15–45 minutes depending on the condition.",
          },
          {
            title: "Can hysteroscopy improve pregnancy chances?",
            description:
              "Yes, correcting uterine abnormalities may improve fertility and IVF success.",
          },
          {
            title: "Is hospital admission required?",
            description:
              "Most hysteroscopy procedures are day-care surgeries with same-day discharge.",
          },
        ],
      },
    ] satisfies BlogSection[],
  
    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
  {
    hero: {
      badge: "Laparoscopic Surgery",
      title: "Fertility Enhancing Surgery in Gurgaon",
      date: "May 24, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },
  
    article: {
      id: "fertility-enhancing-surgery",
      slug: "fertility-enhancing-surgery",
      category: "laparoscopic-surgery",
      title:
        "Fertility Enhancing Surgery – Advanced Reproductive & Minimally Invasive Care",
      intro:
        "Fertility-enhancing surgery includes advanced minimally invasive procedures designed to improve pregnancy chances by correcting reproductive problems affecting the uterus, ovaries, fallopian tubes, and pelvic organs.",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1400&auto=format&fit=crop",
  
      paragraphs: [
        "Modern laparoscopic and hysteroscopic fertility procedures help improve natural conception and IVF outcomes while preserving reproductive organs.",
        "Advanced fertility-preserving surgery focuses not only on removing disease but also on protecting ovarian reserve and reproductive function.",
      ],
    },
  
    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What is Fertility Enhancing Surgery?",
        title: "Advanced reproductive surgical care",
        color: "#ec4899",
        paragraph:
          "These procedures are performed to improve fertility and reproductive outcomes using minimally invasive techniques.",
        cards: [
          {
            title: "Laparoscopic surgery",
            description:
              "Keyhole surgery used for pelvic and reproductive disorders.",
          },
          {
            title: "Hysteroscopic surgery",
            description:
              "Treatment inside the uterus without abdominal cuts.",
          },
          {
            title: "Fertility preservation",
            description:
              "Focus on protecting ovarian reserve and reproductive organs.",
          },
        ],
      },
  
      {
        id: "who-needs",
        type: "warning",
        eyebrow: "Who May Need Surgery?",
        title: "Conditions where fertility surgery may help",
        color: "#ef4444",
        paragraph:
          "Fertility-enhancing surgery may improve conception chances in selected reproductive conditions.",
        items: [
          "Difficulty conceiving naturally",
          "Repeated IVF failure",
          "Recurrent miscarriages",
          "Endometriosis",
          "Blocked fallopian tubes",
          "Ovarian cysts",
          "Fibroids affecting fertility",
          "Uterine polyps",
          "Pelvic adhesions",
          "Hydrosalpinx",
          "Abnormal uterine cavity",
        ],
      },
  
      {
        id: "procedures",
        type: "cards",
        eyebrow: "Procedures Offered",
        title: "Advanced fertility-enhancing procedures",
        color: "#8b5cf6",
        paragraph:
          "Specialized minimally invasive procedures are tailored according to fertility goals and reproductive health.",
        cards: [
          {
            title: "Endometriosis surgery",
            description:
              "Removal of endometriosis to improve fertility and reduce pelvic pain.",
          },
          {
            title: "Fibroid removal",
            description:
              "Myomectomy for fibroids affecting implantation or pregnancy.",
          },
          {
            title: "Tubal surgery",
            description:
              "Treatment for blocked or damaged fallopian tubes.",
          },
          {
            title: "Ovarian cyst surgery",
            description:
              "Fertility-preserving removal of ovarian cysts and endometriomas.",
          },
          {
            title: "Adhesiolysis",
            description:
              "Removal of pelvic scar tissue affecting reproductive organs.",
          },
          {
            title: "Hysteroscopic septum resection",
            description:
              "Correction of uterine septum linked with infertility or miscarriages.",
          },
        ],
      },
  
      {
        id: "benefits",
        type: "checkList",
        eyebrow: "Benefits",
        title: "Benefits of minimally invasive fertility surgery",
        color: "#10b981",
        paragraph:
          "Modern fertility surgery offers better recovery and improved reproductive outcomes.",
        items: [
          "Improved natural conception chances",
          "Better IVF success rates",
          "Preservation of reproductive organs",
          "Minimal pain and blood loss",
          "Smaller scars",
          "Faster recovery",
          "Reduced hospital stay",
          "Early return to normal routine",
        ],
      },
  
      {
        id: "endometriosis",
        type: "cards",
        eyebrow: "Specialized Expertise",
        title: "Fertility and endometriosis expertise",
        color: "#14b8a6",
        paragraph:
          "Endometriosis is one of the leading causes of infertility and pelvic pain in women.",
        cards: [
          {
            title: "Advanced laparoscopic surgery",
            description:
              "Precise removal of endometriosis tissue while preserving fertility.",
          },
          {
            title: "Ovarian reserve protection",
            description:
              "Careful surgical techniques help preserve healthy ovarian tissue.",
          },
          {
            title: "Pelvic anatomy restoration",
            description:
              "Surgery helps improve pelvic function and reproductive outcomes.",
          },
        ],
      },
  
      {
        id: "personalized",
        type: "timeline",
        eyebrow: "Personalized Fertility Approach",
        title: "Individualized fertility treatment planning",
        color: "#0ea5e9",
        paragraph:
          "Every fertility journey is unique and requires careful reproductive evaluation.",
        timeline: [
          {
            label: "Step 1",
            title: "Ultrasound and imaging",
            description:
              "Detailed pelvic assessment helps identify reproductive conditions.",
          },
          {
            label: "Step 2",
            title: "Hormonal evaluation",
            description:
              "Hormonal testing helps understand ovarian and fertility health.",
          },
          {
            label: "Step 3",
            title: "Fertility history review",
            description:
              "Previous IVF outcomes, miscarriages, and pregnancy history are evaluated.",
          },
          {
            label: "Step 4",
            title: "Treatment planning",
            description:
              "Doctors plan the most suitable path for natural conception or assisted reproduction.",
          },
        ],
      },
  
      {
        id: "faq",
        type: "cards",
        eyebrow: "Frequently Asked Questions",
        title: "Common questions about fertility surgery",
        color: "#f97316",
        paragraph:
          "Women commonly ask about fertility outcomes, ovarian reserve, and recovery after surgery.",
        cards: [
          {
            title: "Can surgery improve fertility?",
            description:
              "Yes, treating endometriosis, fibroids, adhesions, or tubal problems may improve pregnancy chances.",
          },
          {
            title: "Will surgery affect ovarian reserve?",
            description:
              "Fertility-preserving surgical techniques are used carefully to protect ovarian function.",
          },
          {
            title: "Is fertility surgery painful?",
            description:
              "Most procedures are minimally invasive with less pain and faster recovery.",
          },
          {
            title: "When can I try for pregnancy after surgery?",
            description:
              "Timing depends on the procedure and condition treated. Personalized advice is provided after surgery.",
          },
        ],
      },
    ] satisfies BlogSection[],
  
    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic & Fertility Surgeon",
      image: doctorImage,
    } satisfies BlogAuthor,
  },
];

export const allBlogData: BlogPageData[] = [
  ...youngWomenCareBlogs,
  ...preventiveWomenHealthBlogs,
  ...hormonalImbalanceBlogs,
  ...pregnancyCareBlogs,
  ...fertilityInfertilityBlogs,
  ...menopauseCareBlogs,
  ...sexualIntimateHealthBlogs,
  ...laparoscopicSurgeryBlogs
];
