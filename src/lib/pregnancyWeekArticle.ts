import type { BlogPageData } from "@/data/BlogData";
import {
  getTrimesterGuide,
  pregnancyWeeks,
  type PregnancyWeek,
} from "@/data/PregnancyGuide";

const doctorPortrait = "/image/dr-kusum-lata-bhardwaj.jpg";

const urgentSigns = [
  "Heavy bleeding or severe abdominal pain",
  "Severe headache, vision changes or sudden swelling",
  "Fever, breathlessness or chest pain",
  "Persistent vomiting or dehydration",
  "Water leakage before labor",
  "Reduced or absent baby movements after they become regular",
];

export function getPregnancyWeekByNumber(
  week: number
): PregnancyWeek | undefined {
  return pregnancyWeeks.find((item) => item.week === week);
}

export function getPregnancyWeekArticle(week: number): BlogPageData | null {
  const data = getPregnancyWeekByNumber(week);
  if (!data) return null;

  const trimester = getTrimesterGuide(data.trimester);

  return {
    hero: {
      badge: `${trimester.name} Trimester - Week ${data.week}`,
      title: `${data.week} Weeks Pregnant: ${data.focus}`,
      date: `Week ${data.week} of ${pregnancyWeeks.length}`,
      readTime: "3 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "introduction",
      slug: `week-${data.week}`,
      category: "pregnancy-care",
      title: `${data.week} Weeks Pregnant: ${data.focus}`,
      intro: `${data.size}. ${data.baby}`,
      image: trimester.image,
      paragraphs: [data.baby],
    },

    sections: [
      {
        id: "mother-body",
        type: "cards",
        eyebrow: "Mother's Body",
        title: "What you may feel this week",
        color: "#ec4899",
        paragraph: data.mother,
      },
      {
        id: "food-focus",
        type: "nutrition",
        eyebrow: "Nutrition",
        title: `Food focus for week ${data.week}`,
        color: "#10b981",
        paragraph: data.food,
      },
      {
        id: "checklist",
        type: "checkList",
        eyebrow: "Checklist",
        title: "Things to do this week",
        color: "#6366f1",
        paragraph: `Simple reminders to keep week ${data.week} on track.`,
        items: data.checklist,
      },
      {
        id: "trimester-care",
        type: "cards",
        eyebrow: "Trimester Care",
        title: `${trimester.name} trimester highlights`,
        color: trimester.color,
        paragraph: trimester.summary,
        cards: trimester.keyCare.map((item) => ({ title: item })),
      },
      {
        id: "warning",
        type: "warning",
        eyebrow: "Urgent Signs",
        title: "Call your doctor urgently if these happen",
        color: "#ef4444",
        paragraph:
          "Some symptoms need prompt medical attention, whichever week you are in.",
        items: urgentSigns,
      },
    ],

    faqs: [
      {
        id: "size",
        question: `How big is my baby at ${data.week} weeks?`,
        answer: `${data.size}. ${data.baby}`,
      },
      {
        id: "focus",
        question: "What is the main focus this week?",
        answer: `${data.focus}. ${data.mother}`,
      },
      {
        id: "food",
        question: "Which foods should I prioritise this week?",
        answer: data.food,
      },
    ],

    author: {
      name: "Dr. Kusum Lata Bhardwaj",
      label: "Written and reviewed by",
      designation: "MD (Obs & Gyn), Laparoscopic Surgeon",
      image: doctorPortrait,
    },
  };
}
