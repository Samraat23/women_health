import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  HeartPulse,
  Salad,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export type ArticleSection = {
  id: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: {
    title: string;
    description?: string;
    items?: string[];
    tone?: "positive" | "warning" | "neutral";
  }[];
  timeline?: {
    label: string;
    title: string;
    description: string;
  }[];
};

export type ArticlePageData = {
  title: string;
  highlightedTitle: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  heroImage: string;
  author: {
    name: string;
    role: string;
    experience: string;
    image: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  summary: string[];
  sections: ArticleSection[];
  doctorNote: {
    title: string;
    text: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedArticles: {
    title: string;
    category: string;
    excerpt: string;
    image: string;
    href: string;
  }[];
};

export const pregnancyArticle: ArticlePageData = {
  title: "Healthy Pregnancy Tips",
  highlightedTitle: "Every Mother Should Know",
  description:
    "A practical doctor-reviewed guide to early symptoms, nutrition, exercise, tests, warning signs, and prenatal care for a calmer pregnancy journey.",
  category: "Pregnancy Care",
  date: "17 May 2026",
  readTime: "8 min read",
  heroImage:
    "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?q=80&w=1600&auto=format&fit=crop",
  author: {
    name: "Dr. Kusum Lata Bhardwaj",
    role: "MD (Obs & Gyn), Laparoscopic Surgeon",
    experience: "19+ years of clinical experience",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
  },
  stats: [
    { value: "10k+", label: "Women guided" },
    { value: "500+", label: "Deliveries" },
    { value: "19+", label: "Years experience" },
  ],
  summary: [
    "Know the early pregnancy symptoms that deserve attention.",
    "Build a simple nutrition routine with safer food choices.",
    "Understand safe activity options across pregnancy.",
    "Track important scans, blood tests, and screening windows.",
    "Recognize warning signs that need urgent medical help.",
    "Plan consultation and follow-up care with confidence.",
  ],
  doctorNote: {
    title: "Book the first appointment early",
    text:
      "As soon as pregnancy is suspected, schedule a consultation. Early prenatal care, ideally before 8 weeks, helps start supplements, confirm dates, review health risks, and plan the right tests at the right time.",
  },
  sections: [
    {
      id: "introduction",
      eyebrow: "Start here",
      title: "Introduction",
      icon: Baby,
      accent: "#5a4ffe",
      paragraphs: [
        "Pregnancy brings physical, emotional, and lifestyle changes. Timely prenatal care helps protect both mother and baby while making each trimester easier to understand.",
        "This guide brings the essentials together in one place: symptoms, diet, exercise, testing, warning signs, and when to speak with your gynecologist.",
      ],
    },
    {
      id: "symptoms",
      eyebrow: "First signs",
      title: "Early pregnancy symptoms",
      icon: HeartPulse,
      accent: "#ec4899",
      paragraphs: [
        "Early symptoms vary from person to person. A missed period is common, but many women also notice body changes before a test confirms pregnancy.",
      ],
      bullets: [
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
      eyebrow: "Nutrition",
      title: "Healthy pregnancy diet",
      icon: Salad,
      accent: "#10b981",
      paragraphs: [
        "Pregnancy nutrition is about nutrient density, hydration, and consistency. Choose fresh foods that support baby growth while helping with energy, digestion, and healthy weight gain.",
      ],
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
            "Water through the day, around 2.5 to 3 L if allowed",
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
      eyebrow: "Movement",
      title: "Exercise during pregnancy",
      icon: Activity,
      accent: "#f59e0b",
      paragraphs: [
        "Light, regular movement can improve circulation, mood, sleep, back discomfort, and stamina. Begin only after your doctor confirms what is suitable for your pregnancy.",
      ],
      cards: [
        {
          title: "Walking",
          description: "A simple 20 to 30 minute routine that can work across most trimesters.",
        },
        {
          title: "Prenatal yoga",
          description: "Supports flexibility, breathing, posture, and stress control.",
        },
        {
          title: "Swimming",
          description: "A low-impact option that can reduce pressure on joints and swelling.",
        },
      ],
    },
    {
      id: "tests",
      eyebrow: "Medical care",
      title: "Important prenatal tests",
      icon: Stethoscope,
      accent: "#6366f1",
      paragraphs: [
        "Prenatal tests help confirm dates, screen for common risks, and monitor baby development. Your doctor may adjust this schedule depending on your history and pregnancy needs.",
      ],
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
      eyebrow: "Urgent signs",
      title: "Warning signs to watch",
      icon: ShieldCheck,
      accent: "#ef4444",
      paragraphs: [
        "Some symptoms need prompt medical attention. Contact your doctor immediately if you notice any of the following.",
      ],
      bullets: [
        "Heavy bleeding or unusual vaginal discharge",
        "Severe abdominal pain or persistent cramping",
        "Sudden swelling of hands, face, or feet",
        "Severe headache or vision changes",
        "Reduced or absent fetal movement after 28 weeks",
        "High fever above 38 C / 100.4 F",
        "Breathing difficulty or chest pain",
      ],
    },
  ],
  faqs: [
    {
      question: "What foods should be avoided during pregnancy?",
      answer:
        "Avoid alcohol, tobacco, raw or undercooked meat and eggs, unpasteurized dairy, and high-mercury fish. Limit caffeine and discuss any diet restriction with your doctor.",
    },
    {
      question: "Is exercise safe during pregnancy?",
      answer:
        "Light exercise is often helpful, but safety depends on your health and pregnancy risk. Walking, prenatal yoga, and swimming are common options after medical clearance.",
    },
    {
      question: "When should the first ultrasound happen?",
      answer:
        "A first dating ultrasound is commonly done around 6 to 8 weeks to confirm pregnancy location, heartbeat, and estimated due date.",
    },
    {
      question: "How often should I visit the doctor?",
      answer:
        "Many pregnancies follow monthly visits until 28 weeks, then more frequent reviews later. High-risk pregnancies may need a personalized schedule.",
    },
  ],
  relatedArticles: [
    {
      title: "Best pregnancy diet plan",
      category: "Nutrition",
      excerpt: "Simple meal ideas and nutrient priorities for each trimester.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=900&auto=format&fit=crop",
      href: "/article",
    },
    {
      title: "Normal delivery preparation tips",
      category: "Labour",
      excerpt: "Practical ways to prepare your body and mind for birth.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=900&auto=format&fit=crop",
      href: "/article",
    },
    {
      title: "High-risk pregnancy care",
      category: "Specialised care",
      excerpt: "What extra monitoring means and when it becomes important.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop",
      href: "/article",
    },
  ],
};
