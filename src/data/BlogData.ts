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
  /** Extra body paragraphs rendered under `paragraph`. */
  paragraphs?: string[];
  /** Closing paragraph rendered after the list/cards, when the source article has one. */
  note?: string;
  items?: string[];
  cards?: BlogCard[];
  timeline?: BlogTimeline[];
};

export type BlogFaq = {
  id: string;
  question: string;
  answer: string;
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
  faqs?: BlogFaq[];
  /** Overrides the default FAQ heading when the source article names its own. */
  faqTitle?: string;
  author: BlogAuthor;
  /** Per-article overrides for generateMetadata; falls back to title/intro when omitted. */
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    robots?: string;
  };
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
      title: "Best Doctor for PCOS/PCOD Treatment in Gurgaon",
      date: "May 24, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "pcos-pcod-doctor-in-gurgaon",
      slug: "pcos-pcod-doctor-in-gurgaon",
      category: "young-women-care",
      title: "Best Doctor for PCOS/PCOD Treatment in Gurgaon",
      intro:
        "PCOS, also commonly called PCOD, is a hormonal condition that can affect periods, ovulation, skin, hair growth, weight, and fertility. Some women may have irregular periods, acne, unwanted facial hair, weight changes, or difficulty getting pregnant, while others may have only a few symptoms.",
      image: pcosImage,

      paragraphs: [
        "If your periods are irregular or you are dealing with ongoing hormonal or fertility concerns, consulting the Best Doctor for PCOS/PCOD Treatment in Gurgaon can help you understand the cause and choose a suitable treatment plan based on your symptoms and health needs.",
      ],
    },

    seo: {
      title: "Best Gynecologist for PCOS/PCOD Treatment in Gurgaon",
      description:
        "Get personalised PCOS/PCOD treatment in Gurgaon from Dr. Kusum Lata Bhardwaj, with 17+ years of experience. Get expert guidance for hormonal, period and fertility concerns.",
      canonical: "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Is PCOS/PCOD?",
        title: "Understanding PCOS and PCOD",
        color: "#ec4899",
        paragraph:
          "PCOS is a common hormonal condition that can affect how the ovaries work and how the body handles hormones such as androgens. It may lead to irregular periods, problems with ovulation, acne, excess facial or body hair, and fertility concerns. Having polycystic-looking ovaries on an ultrasound is not required for a PCOS diagnosis.",
        paragraphs: ["Common areas affected:"],
        cards: [
          {
            title: "Periods",
            description:
              "May become irregular, delayed, or sometimes absent.",
          },
          {
            title: "Hormones",
            description:
              "Higher androgen levels may contribute to acne or unwanted hair growth.",
          },
          {
            title: "Skin & Hair",
            description:
              "Some women may notice acne, oily skin, or thinning scalp hair.",
          },
          {
            title: "Fertility",
            description:
              "Irregular ovulation can make it harder to become pregnant.",
          },
          {
            title: "Metabolic Health",
            description:
              "PCOS can also be linked with insulin resistance and other long-term health risks.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "15 Symptoms of PCOS/PCOD You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "PCOS does not affect everyone in the same way. Some women may have only a few symptoms, while others may experience several hormonal, menstrual, skin, or fertility-related changes.",
        items: [
          "Irregular periods",
          "Delayed periods",
          "Missed periods",
          "Heavy or prolonged periods",
          "Acne or oily skin",
          "Excess facial hair",
          "Increased body hair",
          "Hair thinning or hair loss",
          "Unexplained weight gain",
          "Difficulty losing weight",
          "Difficulty getting pregnant",
          "Irregular ovulation",
          "Darkened skin in some body areas",
          "Mood changes",
          "Tiredness or low energy",
        ],
        note: "Having one or more of these symptoms does not automatically mean you have PCOS. A proper medical evaluation is important because other conditions can cause similar symptoms.",
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why It Happens",
        title: "Possible Causes and Risk Factors of PCOS/PCOD",
        color: "#f97316",
        paragraph:
          "The exact cause of PCOS is not fully understood. Hormonal changes, genetics, insulin resistance, and family history may all play a role. PCOS can also be associated with metabolic and cardiovascular risk factors, which is why proper evaluation is important.",
        items: [
          "Hormonal Changes: Changes in hormone levels may affect ovulation and periods.",
          "Insulin Resistance: The body may have difficulty using insulin effectively.",
          "Family History: PCOS may be more common among women with a family history of the condition.",
          "Genetic Factors: Certain inherited factors may increase the likelihood of developing PCOS.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See a PCOS Doctor?",
        color: "#f43f5e",
        paragraph:
          "Irregular periods are not always caused by PCOS, but repeated changes in your menstrual cycle should not be ignored. If you are experiencing hormonal symptoms, fertility problems, or sudden changes in your periods, it is a good idea to speak with a specialist.",
        paragraphs: ["You should consider seeing a doctor if you have:"],
        items: [
          "Irregular Periods",
          "Missed Periods",
          "Heavy or Unusual Bleeding",
          "Persistent Acne",
          "Excess Facial Hair",
          "Hair Thinning",
          "Unexplained Weight Changes",
          "Difficulty Getting Pregnant",
        ],
      },

      {
        id: "diagnosis",
        type: "checkList",
        eyebrow: "Diagnosis",
        title: "How Is PCOS/PCOD Diagnosed?",
        color: "#8b5cf6",
        paragraph:
          "PCOS diagnosis is based on your symptoms, medical history, examination, and appropriate tests. In adults, doctors generally look at features such as irregular ovulation, signs or blood-test evidence of higher androgen levels, and polycystic ovaries, while ruling out other possible causes. Not every woman with PCOS will have polycystic ovaries on an ultrasound.",
        items: [
          "Medical History: Your doctor asks about periods, symptoms, weight changes, and fertility.",
          "Physical Examination: May check signs such as acne, excess hair growth, or other hormonal changes.",
          "Blood Tests: Can check hormone levels and other health markers.",
          "Ultrasound: May be used to assess the ovaries and uterus when appropriate.",
          "Additional Health Checks: Your doctor may also assess blood sugar and other metabolic health factors.",
        ],
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Health Effects",
        title: "How Delayed PCOS Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "PCOS can affect more than just periods and fertility. If symptoms are left unmanaged, some women may have a higher risk of metabolic, cardiovascular, psychological, and reproductive health concerns. Early evaluation can help identify these concerns and plan suitable care.",
        timeline: [
          {
            label: "Stage 1",
            title: "Irregular Periods",
            description:
              "Periods may become less predictable or occur less often.",
          },
          {
            label: "Stage 2",
            title: "Hormonal Symptoms",
            description:
              "Acne, excess facial hair, or hair thinning may continue or become more noticeable.",
          },
          {
            label: "Stage 3",
            title: "Fertility Concerns",
            description:
              "Irregular ovulation may make it more difficult to become pregnant.",
          },
          {
            label: "Stage 4",
            title: "Long-Term Health Risks",
            description:
              "PCOS can be linked with insulin resistance and increased metabolic and cardiovascular risks.",
          },
        ],
      },

      {
        id: "pcos-treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "PCOS Treatment in Gurgaon",
        color: "#14b8a6",
        paragraph:
          "PCOS treatment is not the same for everyone. Your treatment plan depends on your symptoms, health, age, and whether you are planning a pregnancy. Treatment may focus on managing periods, hormonal symptoms, metabolic health, or fertility. Lifestyle changes are an important part of PCOS care, and medicines may be added when needed.",
        cards: [
          {
            title: "Period Management",
            description:
              "Treatment can help make irregular periods more manageable.",
          },
          {
            title: "Hormonal Treatment",
            description:
              "Medicines may help control certain hormonal symptoms.",
          },
          {
            title: "Acne & Hair Treatment",
            description:
              "Suitable treatment can help manage acne and unwanted hair growth.",
          },
          {
            title: "Lifestyle Support",
            description:
              "Healthy eating and regular physical activity are important parts of PCOS care.",
          },
          {
            title: "Fertility Treatment",
            description:
              "Treatment can support ovulation and pregnancy goals when required.",
          },
          {
            title: "Regular Monitoring",
            description:
              "Follow-ups can help track symptoms and overall health.",
          },
        ],
      },

      {
        id: "pcod-treatment",
        type: "checkList",
        eyebrow: "PCOD Care",
        title: "PCOD Treatment in Gurgaon",
        color: "#0ea5e9",
        paragraph:
          "PCOD is a term commonly used for hormonal and ovarian problems related to irregular ovulation. Treatment depends on the symptoms and the underlying cause rather than using the same approach for everyone.",
        items: [
          "Cycle Regulation",
          "Hormonal Management",
          "Weight & Lifestyle Support",
          "Acne Management",
          "Fertility Support",
          "Regular Health Monitoring",
        ],
      },

      {
        id: "fertility",
        type: "checkList",
        eyebrow: "Fertility Support",
        title: "Fertility Treatment for PCOS/PCOD",
        color: "#a855f7",
        paragraph:
          "PCOS can affect ovulation, which may make pregnancy more difficult for some women. However, many women with PCOS can become pregnant with appropriate medical care. Treatment is planned according to ovulation, age, fertility history, and other individual factors.",
        items: [
          "Ovulation Assessment",
          "Fertility Evaluation",
          "Ovulation Support",
          "Lifestyle Guidance",
          "Pregnancy Planning",
          "Fertility Specialist Referral When Needed",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a PCOS Specialist?",
        color: "#dc2626",
        paragraph:
          "If your periods are frequently irregular, you have ongoing hormonal symptoms, or you are having difficulty getting pregnant, meeting a specialist can help identify the possible cause. Early evaluation can also help with managing symptoms and checking related health concerns.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "Irregular or Missed Periods",
          "Persistent Acne",
          "Excess Facial Hair",
          "Hair Thinning",
          "Unexplained Weight Changes",
          "Difficulty Getting Pregnant",
          "Repeated Ovulation Problems",
          "Symptoms Not Improving",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title: "Why Choose the Best Doctor for PCOS/PCOD Treatment in Gurgaon?",
        color: "#6366f1",
        paragraph:
          "Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician focused on clear diagnosis, safe planning, and supportive follow-through for every patient. With 17+ years of experience, 10k+ patients guided, and experience across 3 premier institutes, she focuses on understanding each patient's concerns and providing clear, personalised care.",
        paragraphs: [
          "PCOS can affect periods, hormones, skin, weight, fertility, and overall health differently in every woman. The Best Doctor for PCOS/PCOD Treatment in Gurgaon can understand your symptoms, suggest the right tests, explain the condition in simple terms, and recommend treatment based on your individual needs and health goals.",
        ],
        note: "Looking for Top PCOS Treatment in Gurgaon? A personalised evaluation can help identify your symptoms and guide you toward suitable treatment and long-term care.",
      },
    ] satisfies BlogSection[],
    faqTitle: "Frequently Asked Questions About PCOS/PCOD",

    faqs: [
      {
        id: "1",
        question: "What is PCOD and PCOS?",
        answer:
          "PCOS stands for Polycystic Ovary Syndrome. PCOD is a commonly used term for Polycystic Ovarian Disease. A doctor can assess your symptoms and provide the correct diagnosis.",
      },
      {
        id: "2",
        question: "Is PCOS and PCOD the same?",
        answer:
          "The terms are often used interchangeably, but they are not always used in exactly the same way. A doctor can assess your symptoms and give the correct diagnosis.",
      },
      {
        id: "3",
        question: "What are the common symptoms of PCOS?",
        answer:
          "Irregular periods, acne, excess facial hair, hair thinning, weight changes, and difficulty getting pregnant are common symptoms.",
      },
      {
        id: "4",
        question: "How is PCOS diagnosed?",
        answer:
          "Your doctor may review your symptoms and medical history and recommend blood tests, an examination, and sometimes an ultrasound.",
      },
      {
        id: "5",
        question: "Can PCOS be treated without surgery?",
        answer:
          "Yes. PCOS is usually managed with lifestyle changes, medicines, and other treatments based on your symptoms and goals.",
      },
      {
        id: "6",
        question: "Can PCOS affect fertility?",
        answer:
          "Yes, PCOS can affect ovulation and may make getting pregnant more difficult for some women.",
      },
      {
        id: "7",
        question: "Can PCOS be completely cured?",
        answer:
          "There is no single permanent cure, but symptoms can often be managed effectively with the right treatment and regular care.",
      },
      {
        id: "8",
        question: "Does PCOS always cause weight gain?",
        answer:
          "No. PCOS can affect women of different body sizes, and not everyone with PCOS experiences weight gain.",
      },
      {
        id: "9",
        question: "Can PCOS cause irregular periods?",
        answer:
          "Yes. Irregular or missed periods are common because PCOS can affect regular ovulation.",
      },
      {
        id: "10",
        question: "When should I see a PCOS doctor in Gurgaon?",
        answer:
          "You should consider seeing a specialist if you have repeated irregular periods, hormonal symptoms, or difficulty getting pregnant.",
      },
    ] satisfies BlogFaq[],


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
      title: "Best Uterine Bleeding Doctors In Gurgaon",
      date: "May 24, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "uterine-bleeding-doctor-in-gurgaon",
      slug: "uterine-bleeding-doctor-in-gurgaon",
      category: "young-women-care",
      title: "Best Uterine Bleeding Doctors In Gurgaon",
      intro:
        "Abnormal uterine bleeding means your periods are different from what is normal for you, such as very heavy bleeding, periods that last too long, bleeding between periods, or periods that come too often or too rarely. It can happen due to hormonal changes, fibroids, polyps, thyroid problems, or other conditions.",
      image: menstrualImage,

      paragraphs: [
        "If your bleeding is heavy, keeps happening, or is affecting your daily life, it is important to get it checked. An experienced Best Uterine Bleeding Doctors In Gurgaon can help find the possible cause and suggest suitable treatment based on your symptoms and health.",
      ],
    },

    seo: {
      title: "Best Uterine Bleeding Doctor in Gurgaon | Dr. Kusum Lata",
      description:
        "Meet Dr. Kusum Lata Bhardwaj, a uterine bleeding specialist in Gurgaon with 17+ years of experience. Get guidance for heavy periods, irregular bleeding and treatment options.",
      canonical: "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Is Abnormal Uterine Bleeding?",
        title: "Understanding Abnormal Uterine Bleeding",
        color: "#ec4899",
        paragraph:
          "Abnormal uterine bleeding refers to bleeding that is unusual in its amount, timing, regularity, or duration. It may include very heavy periods, bleeding between periods, or periods that last longer than usual. The cause can be different for each person, so proper evaluation is important.",
        paragraphs: ["Common types of abnormal bleeding:"],
        cards: [
          {
            title: "Heavy Periods",
            description:
              "Bleeding may be much heavier than your usual period.",
          },
          {
            title: "Long Periods",
            description: "Your period may continue for more than 7 days.",
          },
          {
            title: "Irregular Periods",
            description:
              "Your periods may come earlier, later, or at unpredictable times.",
          },
          {
            title: "Bleeding Between Periods",
            description:
              "You may notice bleeding or spotting between your regular periods.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "10 Signs of Abnormal Uterine Bleeding You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "Abnormal bleeding can look different from one person to another. Some women may notice heavier periods, while others may experience irregular cycles or bleeding between periods.",
        items: [
          "Very heavy menstrual bleeding",
          "Periods lasting more than 7 days",
          "Bleeding between periods",
          "Frequent periods",
          "Irregular menstrual cycles",
          "Bleeding after sexual intercourse",
          "Passing large blood clots",
          "Feeling tired or weak during or after periods",
          "Dizziness or light-headedness",
          "Bleeding that affects daily activities",
        ],
        note: "Heavy bleeding can sometimes lead to anemia, which may cause tiredness, weakness, or dizziness.",
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why it Happens",
        title: "Possible Causes of Abnormal Uterine Bleeding",
        color: "#f97316",
        paragraph:
          "The cause of abnormal uterine bleeding can vary from hormonal changes to problems affecting the uterus. Your doctor may consider several possible causes before deciding on treatment.",
        items: [
          "Hormonal Changes: Changes in hormones can affect ovulation and make periods irregular or heavy.",
          "Uterine Fibroids: These are usually non-cancerous growths in the uterus that can cause heavy or prolonged bleeding.",
          "Uterine Polyps: Small growths inside the uterus can sometimes cause irregular or heavy bleeding.",
          "Thyroid Problems: Changes in thyroid function can affect your menstrual cycle.",
          "PCOS: Polycystic ovary syndrome can affect ovulation and lead to irregular bleeding.",
          "Bleeding Disorders: Some blood-clotting problems can cause unusually heavy periods.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See a Uterine Bleeding Doctor?",
        color: "#f43f5e",
        paragraph:
          "Some changes in your period can happen occasionally, but repeated or unusually heavy bleeding should not be ignored. If your bleeding is affecting your daily routine or you are feeling weak or dizzy, it is a good idea to consult a specialist.",
        paragraphs: ["You should consider seeing a doctor if you have:"],
        items: [
          "Very Heavy Periods",
          "Periods Lasting More Than 7 Days",
          "Bleeding Between Periods",
          "Frequent or Irregular Periods",
          "Bleeding After Sex",
          "Large Blood Clots",
          "Dizziness or Weakness",
          "Ongoing Changes in Your Period",
        ],
      },

      {
        id: "diagnosis",
        type: "checkList",
        eyebrow: "Diagnosis",
        title: "How Is Abnormal Uterine Bleeding Diagnosed?",
        color: "#8b5cf6",
        paragraph:
          "Finding the cause of abnormal bleeding usually starts with understanding your periods, symptoms, medical history, and any medicines you take. Your doctor may then recommend tests based on your symptoms and age.",
        items: [
          "Medical History: Your doctor may ask about your periods, previous health problems, and medicines.",
          "Bleeding Pattern: Tracking when and how heavily you bleed can help identify changes.",
          "Pelvic Examination: May help check for certain causes of abnormal bleeding.",
          "Blood Tests: May be recommended to check for anemia or other problems.",
          "Ultrasound: Can help examine the uterus, ovaries, fibroids, or other pelvic changes.",
          "Hysteroscopy: A small camera may be used to look inside the uterus when required.",
          "Endometrial Sampling: In selected patients, a small sample of the uterine lining may be tested to find certain abnormalities.",
        ],
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Risks of Delay",
        title: "How Delayed Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "Ignoring abnormal uterine bleeding for a long time may allow the underlying problem to continue. Heavy or ongoing bleeding can also lead to anemia and may affect your energy and daily life.",
        timeline: [
          {
            label: "Stage 1",
            title: "Increasing Blood Loss",
            description:
              "Repeated heavy periods may cause ongoing blood loss and leave you feeling tired or weak.",
          },
          {
            label: "Stage 2",
            title: "Iron Deficiency",
            description:
              "Regular heavy bleeding can reduce iron levels and may contribute to iron-deficiency anemia.",
          },
          {
            label: "Stage 3",
            title: "Daily Life Impact",
            description:
              "Continued bleeding may affect work, sleep, exercise, travel, and other everyday activities.",
          },
          {
            label: "Stage 4",
            title: "Underlying Condition",
            description:
              "If the bleeding is caused by fibroids, polyps, hormonal problems, or another condition, delaying evaluation may delay appropriate treatment.",
          },
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Treatment For Abnormal Uterine Bleeding In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "The Treatment For Abnormal Uterine Bleeding depends on the cause, amount of bleeding, age, overall health, and whether you want to become pregnant in the future. Treatment may include medicines, hormonal options, treatment for an underlying condition, or procedures when needed.",
        cards: [
          {
            title: "Hormonal Treatment",
            description:
              "May help regulate periods and reduce heavy bleeding.",
          },
          {
            title: "Pain Management",
            description: "Medicines may help with period-related discomfort.",
          },
          {
            title: "Iron Support",
            description:
              "Iron may be recommended if heavy bleeding has caused low iron or anemia.",
          },
          {
            title: "Fibroid Treatment",
            description:
              "Treatment may be suggested when fibroids are causing heavy bleeding.",
          },
          {
            title: "Polyp Removal",
            description: "Polyps causing abnormal bleeding may be removed.",
          },
          {
            title: "Surgical Treatment",
            description:
              "A procedure may be considered when medicines do not work or when a structural problem needs treatment.",
          },
        ],
      },

      {
        id: "hysteroscopy",
        type: "checkList",
        eyebrow: "Hysteroscopy",
        title: "Hysteroscopy for Abnormal Uterine Bleeding",
        color: "#0ea5e9",
        paragraph:
          "Hysteroscopy may be recommended when your doctor needs to look inside the uterus to find the cause of abnormal bleeding. It can also allow certain problems, such as some polyps or fibroids inside the uterus, to be treated during the procedure.",
        paragraphs: ["Possible benefits include:"],
        items: [
          "Finds the Cause",
          "Checks the Uterine Lining",
          "Identifies Polyps",
          "Finds Some Fibroids",
          "Allows Targeted Treatment",
          "Can Remove Certain Growths",
          "Helps Guide Further Treatment",
          "Minimally Invasive Approach",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a Specialist?",
        color: "#dc2626",
        paragraph:
          "If your periods have suddenly become much heavier, last longer than usual, or occur at unusual times, it is worth speaking with a specialist. Getting the cause checked can help you understand your condition and choose the right treatment.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "Very Heavy Periods",
          "Periods Lasting More Than 7 Days",
          "Bleeding Between Periods",
          "Bleeding After Sex",
          "Frequent or Irregular Periods",
          "Large Blood Clots",
          "Dizziness or Weakness",
          "Bleeding Not Improving With Treatment",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title:
          "Why Choose Dr. Kusum Lata Bhardwaj for Best Treatment For Abnormal Uterine Bleeding In Gurgaon?",
        color: "#6366f1",
        paragraph:
          "When abnormal bleeding keeps happening or starts affecting your daily life, choosing the right doctor can make the process easier. Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician with 17+ years of experience who has guided 10K+ patients across 3 premier institutes. She focuses on understanding your symptoms, finding the possible cause, and explaining treatment options in simple terms, with an approach centered on clear diagnosis, safe planning, and supportive follow-through for every patient.",
        paragraphs: [
          "Every woman can have different reasons for abnormal bleeding, so treatment should be planned according to individual needs. Whether the cause is hormonal changes, fibroids, polyps, or another health concern, Dr. Kusum Lata Bhardwaj considers your symptoms, overall health, and future fertility plans while discussing suitable treatment options.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Abnormal Uterine Bleeding",

    faqs: [
      {
        id: "1",
        question: "What is abnormal uterine bleeding?",
        answer:
          "Abnormal uterine bleeding means bleeding that is heavier, longer, more frequent, or occurs at an unusual time compared with your normal menstrual pattern.",
      },
      {
        id: "2",
        question: "How to stop abnormal uterine bleeding?",
        answer:
          "Treatment depends on the cause of the bleeding. A doctor may recommend medicines, hormonal treatment, or other procedures after checking your symptoms and medical history.",
      },
      {
        id: "3",
        question: "Is heavy bleeding a sign of uterine cancer?",
        answer:
          "Heavy bleeding can have many causes, and it does not always mean cancer. However, unusual or ongoing bleeding should be checked by a doctor, especially after menopause.",
      },
      {
        id: "4",
        question: "Can stress cause abnormal uterine bleeding?",
        answer:
          "Stress can affect your hormones and menstrual cycle, which may sometimes lead to changes in bleeding. If the bleeding continues or becomes heavy, medical evaluation is recommended.",
      },
      {
        id: "5",
        question: "Can uterine fibroids cause bleeding?",
        answer:
          "Yes. Uterine fibroids can cause heavy periods, longer periods, spotting, or bleeding between periods.",
      },
      {
        id: "6",
        question: "How to stop bleeding from uterine fibroids?",
        answer:
          "Treatment depends on the size and location of the fibroids and how much bleeding they cause. Medicines, hormonal treatment, or procedures may be considered.",
      },
      {
        id: "7",
        question: "What can cause abnormal uterine bleeding?",
        answer:
          "Abnormal bleeding can be caused by hormonal changes, fibroids, polyps, adenomyosis, certain medicines, pregnancy-related problems, or other health conditions.",
      },
      {
        id: "8",
        question: "What causes dysfunctional uterine bleeding?",
        answer:
          "Dysfunctional uterine bleeding is commonly related to hormonal changes that affect ovulation and the menstrual cycle. Your doctor may recommend tests to find the underlying cause.",
      },
      {
        id: "9",
        question: "When should I see a doctor for abnormal uterine bleeding?",
        answer:
          "See a doctor if bleeding is very heavy, lasts longer than usual, happens between periods, occurs after sex, or keeps coming back.",
      },
      {
        id: "10",
        question: "Can abnormal uterine bleeding affect fertility?",
        answer:
          "It depends on the underlying cause. Conditions such as fibroids, polyps, or hormonal problems may sometimes affect fertility, so finding the cause is important.",
      },
    ] satisfies BlogFaq[],

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
    faqs: [
      {
        id: "1",
        question: "What are irregular periods?",
        answer:
          "Periods are considered irregular when the gap between cycles keeps changing, when cycles are shorter than 21 days or longer than 35 days, or when periods are frequently missed.",
      },
      {
        id: "2",
        question: "What causes irregular periods?",
        answer:
          "Common causes include PCOS, thyroid problems, stress, sudden weight change, excessive exercise, certain medicines, and the years approaching menopause.",
      },
      {
        id: "3",
        question: "Are irregular periods dangerous?",
        answer:
          "They are not always dangerous, but they can signal an underlying hormonal problem. Long gaps between periods may also need treatment to protect the uterine lining.",
      },
      {
        id: "4",
        question: "How are irregular periods diagnosed?",
        answer:
          "Your doctor will review your cycle history and may advise a pelvic ultrasound along with hormone and thyroid blood tests.",
      },
      {
        id: "5",
        question: "Can irregular periods be treated?",
        answer:
          "Yes. Treatment depends on the cause and may include hormonal medicines, thyroid correction, PCOS management, and lifestyle changes.",
      },
      {
        id: "6",
        question: "Can I get pregnant with irregular periods?",
        answer:
          "Yes, though it may take longer because ovulation is harder to predict. Treatment can help make cycles and ovulation more regular.",
      },
      {
        id: "7",
        question: "Do irregular periods mean I have PCOS?",
        answer:
          "Not necessarily. PCOS is one common cause, but thyroid disorders, stress, and other conditions can also cause irregular cycles.",
      },
      {
        id: "8",
        question: "How long should I wait before seeing a doctor?",
        answer:
          "If your cycles have been irregular for three months or more, or if you have missed periods without being pregnant, it is reasonable to get checked.",
      },
      {
        id: "9",
        question: "Can diet and exercise regulate periods?",
        answer:
          "Balanced nutrition, steady weight, regular sleep, and moderate exercise support hormonal balance and can help, though some causes still need medical treatment.",
      },
      {
        id: "10",
        question: "Are irregular periods normal in teenagers?",
        answer:
          "Cycles can be irregular for the first year or two after periods begin. If they remain irregular beyond that, an evaluation is advisable.",
      },
    ] satisfies BlogFaq[],


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
      title: "Best Doctor for Puberty Disorder Treatment in Gurgaon",
      date: "Aug 27, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "puberty-disorder-doctor-in-gurgaon",
      slug: "puberty-disorder-doctor-in-gurgaon",
      category: "young-women-care",
      title: "Best Doctor for Puberty Disorder Treatment in Gurgaon",
      intro:
        "Puberty is a natural stage when a child's body starts changing into an adult body. Sometimes these changes may begin too early, happen later than expected, or not progress normally. These problems are known as puberty disorders and may affect growth, hormones, and emotional well-being.",
      image: teenageImage,

      paragraphs: [
        "If you notice unusual or early physical changes, delayed development, or concerns about your child's growth, consulting the Best Doctor for Puberty Disorder Treatment in Gurgaon can help identify the reason and guide the right treatment.",
      ],
    },

    seo: {
      title: "Best Puberty Disorder Doctor in Gurgaon | Dr. Kusum Lata",
      description:
        "Concerned about early or delayed puberty? Meet Dr. Kusum Lata Bhardwaj in Gurgaon with 17+ years of experience for growth, development and hormone-related concerns.",
      canonical: "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Are Puberty Disorders?",
        title: "Understanding Puberty Disorders",
        color: "#ec4899",
        paragraph:
          "Puberty disorders happen when the normal timing or development of puberty is different from what is expected. Some children may enter puberty too early, while others may not show expected changes at the usual age. In some cases, hormone or other health conditions may be involved.",
        paragraphs: ["Common puberty problems include:"],
        cards: [
          {
            title: "Early Puberty",
            description: "Physical changes begin earlier than expected.",
          },
          {
            title: "Delayed Puberty",
            description: "Puberty changes do not start at the expected age.",
          },
          {
            title: "Hormonal Problems",
            description:
              "Changes in hormone levels may affect normal development.",
          },
          {
            title: "Growth Concerns",
            description:
              "Puberty disorders may sometimes affect growth and final height.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "20 Symptoms of Puberty Disorders You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "Puberty disorders can look different from one child to another. Some changes may be normal variations, while others may need medical evaluation. Common signs can include:",
        items: [
          "Breast development at an unusually young age",
          "Early periods",
          "Pubic hair appearing early",
          "Underarm hair appearing early",
          "Rapid growth at a young age",
          "Acne developing unusually early",
          "Strong body odour at an early age",
          "Early enlargement of the testicles",
          "Early growth of the penis",
          "Deepening of the voice earlier than expected",
          "Facial hair appearing early",
          "No signs of puberty by the expected age",
          "Delayed breast development",
          "No periods by the expected age",
          "Delayed testicular development",
          "Slow or limited pubertal changes",
          "Growth that seems slower than expected",
          "Puberty that starts but does not progress normally",
          "Emotional distress related to body changes",
          "Significant difference in development compared with peers",
        ],
        note: "Puberty normally occurs within a broad age range. Early or delayed development does not always mean there is a serious medical problem, but unusual changes should be discussed with a doctor when there is concern.",
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why it Happens",
        title: "Why Do Puberty Disorders Happen?",
        color: "#f97316",
        paragraph:
          "The reasons behind puberty disorders can vary. Sometimes there is no clear cause, while in other cases the condition may be linked to hormones, family history, nutrition, chronic health problems, or problems affecting the glands involved in puberty.",
        items: [
          "Hormonal Changes: Hormone levels can affect when and how puberty begins.",
          "Family History: The timing of puberty can sometimes run in families.",
          "Nutrition and Health: Poor nutrition or certain long-term health conditions may delay normal development.",
          "Brain or Gland Problems: Conditions affecting the brain, pituitary gland, ovaries, or testicles may affect puberty.",
          "Genetic Conditions: Some genetic conditions can affect hormone production and development.",
          "Other Medical Conditions: Thyroid and other hormonal problems may sometimes affect normal puberty.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See a Puberty Disorder Doctor?",
        color: "#f43f5e",
        paragraph:
          "Some children naturally develop earlier or later than others. However, unusual or rapidly changing physical development should be discussed with a doctor, especially when puberty appears much earlier than expected or has not started when expected.",
        paragraphs: [
          "You should consider seeing a specialist if your child has:",
        ],
        items: [
          "Very Early Physical Changes",
          "Early Breast Development",
          "Early Periods",
          "Early Facial or Body Hair",
          "Rapid Growth",
          "No Signs of Puberty",
          "Delayed Sexual Development",
          "Puberty That Stops Progressing",
        ],
      },

      {
        id: "types",
        type: "cards",
        eyebrow: "Types",
        title: "Types of Puberty Disorders",
        color: "#8b5cf6",
        paragraph:
          "Puberty disorders can mainly involve puberty starting too early, starting later than expected, or not progressing normally.",
        cards: [
          {
            title: "Early Puberty",
            description:
              "Early or precocious puberty means puberty-related physical changes begin earlier than expected. Signs may include breast development, pubic hair, rapid growth, acne, body odour, or other changes associated with puberty.",
          },
          {
            title: "Delayed Puberty",
            description:
              "Delayed puberty means that expected signs of puberty have not started by the usual age. It may sometimes run in families, but medical conditions, nutritional problems, hormone issues, or other factors can also be involved.",
          },
        ],
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Health Impact",
        title: "How Delayed Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "Puberty disorders do not affect every child in the same way. When unusual development is not evaluated, an underlying hormonal or medical problem may remain untreated. Early assessment can help doctors understand the cause and decide whether treatment is needed.",
        timeline: [
          {
            label: "Early Puberty",
            title: "Growth Concerns",
            description:
              "Children may grow quickly at first, but their bones can mature earlier than expected, which may affect adult height.",
          },
          {
            label: "Delayed Puberty",
            title: "Delayed Development",
            description:
              "Puberty-related physical changes may take longer to appear and may sometimes affect a child's confidence or emotional well-being.",
          },
          {
            label: "Hormonal Problems",
            title: "Underlying Condition",
            description:
              "In some children, abnormal puberty may be linked to a hormone or other medical condition that needs treatment.",
          },
          {
            label: "Emotional Impact",
            title: "Confidence and Well-Being",
            description:
              "Being noticeably different from peers can sometimes cause embarrassment, stress, or concerns about body changes.",
          },
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Puberty Disorder Treatment In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "Puberty Disorder Treatment In Gurgaon depends on the child's age, symptoms, growth pattern, hormone levels, and the reason behind the condition. Some children may only need regular monitoring, while others may require medicines or treatment for an underlying medical problem.",
        cards: [
          {
            title: "Hormone Assessment",
            description:
              "Helps understand whether hormone levels are appropriate for the child's age.",
          },
          {
            title: "Growth Monitoring",
            description: "Regular checks help track height and development.",
          },
          {
            title: "Treatment for Early Puberty",
            description:
              "Medicines may be used in selected cases to delay further puberty changes.",
          },
          {
            title: "Treatment for Delayed Puberty",
            description:
              "Treatment may be considered when an underlying hormone problem is identified.",
          },
          {
            title: "Underlying Condition Treatment",
            description:
              "Thyroid, nutritional, or other medical problems may need appropriate care.",
          },
          {
            title: "Regular Follow-Up",
            description:
              "Continued monitoring helps track growth, hormones, and treatment response.",
          },
        ],
      },

      {
        id: "treatment-options",
        type: "cards",
        eyebrow: "Treatment Options",
        title: "Treatment for Early and Delayed Puberty",
        color: "#0ea5e9",
        paragraph:
          "Treatment depends on the cause and how quickly puberty is progressing. Some children may only need observation, while others may benefit from medicines that delay or support puberty.",
        cards: [
          {
            title: "Early Puberty Treatment",
            description:
              "In selected cases of early puberty, medicines may be used to temporarily delay further pubertal development. The decision depends on the child's age, development, growth pattern, and underlying cause. Possible goals of treatment include:",
            items: [
              "Slow Early Development",
              "Support Normal Growth",
              "Protect Adult Height",
              "Manage Hormonal Changes",
              "Address Underlying Causes",
              "Support Emotional Well-Being",
            ],
          },
          {
            title: "Delayed Puberty Treatment",
            description:
              "Treatment for delayed puberty depends on why puberty is late. Some children may simply need monitoring, while others may require treatment for an underlying medical or hormonal condition. Treatment may focus on:",
            items: [
              "Finding the Cause",
              "Supporting Normal Development",
              "Managing Hormone Problems",
              "Monitoring Growth",
              "Improving Bone Health",
              "Supporting Overall Well-Being",
            ],
          },
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a Specialist?",
        color: "#dc2626",
        paragraph:
          "If your child's puberty seems much earlier or later than expected, or development has started but is not progressing normally, it is worth discussing the changes with a specialist. Early evaluation can help identify whether the changes are simply part of normal development or need treatment.",
        paragraphs: ["See a specialist if your child has:"],
        items: [
          "Very Early Puberty Signs",
          "Delayed Puberty",
          "Rapid Growth",
          "Early Periods",
          "Early Breast or Testicular Development",
          "No Expected Puberty Changes",
          "Puberty That Stops Progressing",
          "Concerns About Growth or Development",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title:
          "Why Choose the Best Doctor for Puberty Disorder Treatment in Gurgaon?",
        color: "#6366f1",
        paragraph:
          "Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician focused on clear diagnosis, safe planning, and supportive follow-through for every patient. With 17+ years of experience, 10k+ patients guided, and experience across 3 premier institutes, she focuses on understanding each child's growth, development, and health concerns before suggesting tests or treatment.",
        paragraphs: [
          "Puberty can be different for every child, so having a doctor who listens to parents and explains things in simple language can make the process easier. Regular follow-ups can help keep track of growth, hormone levels, physical changes, and treatment progress while providing ongoing support to the child and family.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Puberty Disorders",

    faqs: [
      {
        id: "1",
        question: "What is a puberty disorder?",
        answer:
          "A puberty disorder occurs when puberty starts too early, happens later than expected, or does not progress normally.",
      },
      {
        id: "2",
        question: "What is early puberty?",
        answer:
          "Early puberty means that puberty-related body changes begin earlier than expected for the child's age.",
      },
      {
        id: "3",
        question: "What is delayed puberty?",
        answer:
          "Delayed puberty means that expected signs of puberty have not started by the usual age or are progressing much later than expected.",
      },
      {
        id: "4",
        question: "What are the signs of early puberty?",
        answer:
          "Early body hair, breast or testicular development, rapid growth, acne, body odour, and early periods can be signs of early puberty.",
      },
      {
        id: "5",
        question: "How are puberty disorders diagnosed?",
        answer:
          "The doctor may check growth and physical development and may recommend blood tests, a bone-age X-ray, ultrasound, or MRI when needed.",
      },
      {
        id: "6",
        question: "Can puberty disorders be treated?",
        answer:
          "Yes. Treatment depends on the cause. Some children need only monitoring, while others may need medicines or treatment for an underlying condition.",
      },
      {
        id: "7",
        question: "Can early puberty affect height?",
        answer:
          "Early puberty can cause children to grow quickly at first, but their bones may mature sooner, which can affect their final adult height.",
      },
      {
        id: "8",
        question: "Can delayed puberty be treated?",
        answer:
          "Yes, depending on the cause. The doctor may monitor development or recommend suitable treatment when a medical or hormonal problem is found.",
      },
      {
        id: "9",
        question: "What does Puberty Disorder Treatment In Gurgaon include?",
        answer:
          "Treatment may include growth monitoring, hormone testing, medicines, treatment of underlying conditions, and regular follow-ups depending on the child's needs.",
      },
      {
        id: "10",
        question:
          "How do I choose the Best Doctor for Puberty Disorder Treatment in Gurgaon?",
        answer:
          "Look for a qualified specialist experienced in children's growth and hormone-related conditions who explains the diagnosis and treatment options clearly.",
      },
    ] satisfies BlogFaq[],

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
    faqs: [
      {
        id: "1",
        question: "What is cervical cancer screening?",
        answer:
          "It is a routine test that looks for early changes in the cells of the cervix, long before cancer develops, so that treatment can begin early.",
      },
      {
        id: "2",
        question: "What is a Pap smear?",
        answer:
          "A Pap smear collects a small sample of cells from the cervix to check for abnormal changes. It takes only a few minutes.",
      },
      {
        id: "3",
        question: "Is a Pap smear painful?",
        answer:
          "Most women feel mild pressure or brief discomfort rather than pain. The test is quick and does not usually need any preparation.",
      },
      {
        id: "4",
        question: "At what age should cervical screening start?",
        answer:
          "Screening usually begins in the early twenties or as advised by your doctor, based on your age and history.",
      },
      {
        id: "5",
        question: "How often should I be screened?",
        answer:
          "Depending on the test used and your previous results, screening is generally repeated every three to five years. Your doctor will advise your schedule.",
      },
      {
        id: "6",
        question: "What is an HPV test?",
        answer:
          "An HPV test checks for the virus that causes most cervical cancers. It may be done alone or together with a Pap smear.",
      },
      {
        id: "7",
        question: "What happens if my result is abnormal?",
        answer:
          "An abnormal result does not mean cancer. It usually means some cells need a closer look, often with a colposcopy, and early changes are very treatable.",
      },
      {
        id: "8",
        question: "Do I still need screening if I have had the HPV vaccine?",
        answer:
          "Yes. The vaccine protects against most high-risk HPV types but not all of them, so routine screening is still recommended.",
      },
      {
        id: "9",
        question: "Do I need screening after menopause?",
        answer:
          "Yes. Screening continues after menopause according to your doctor's advice, as risk does not disappear with age.",
      },
      {
        id: "10",
        question: "Can cervical cancer be prevented?",
        answer:
          "In most cases early changes can be found and treated before they become cancer, which is why regular screening and HPV vaccination are so effective.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is the HPV vaccine?",
        answer:
          "It is a vaccine that protects against the human papillomavirus types most often linked to cervical cancer and genital warts.",
      },
      {
        id: "2",
        question: "Who should get the HPV vaccine?",
        answer:
          "It is generally recommended for girls and young women, ideally before any exposure to the virus. Your doctor can advise based on your age.",
      },
      {
        id: "3",
        question: "What is the best age for HPV vaccination?",
        answer:
          "The vaccine works best when given in the pre-teen or teenage years, though older women may still benefit. Your doctor can guide you.",
      },
      {
        id: "4",
        question: "How many doses are needed?",
        answer:
          "Depending on the age at which the course is started, two or three doses are usually given over several months.",
      },
      {
        id: "5",
        question: "Is the HPV vaccine safe?",
        answer:
          "It has been widely used and studied. Most people have no more than mild arm soreness, slight fever, or brief tiredness.",
      },
      {
        id: "6",
        question: "Can adult women take the HPV vaccine?",
        answer:
          "Yes, many adult women can still be vaccinated. The benefit depends on age and previous exposure, so discuss it with your doctor.",
      },
      {
        id: "7",
        question: "Can I take the vaccine if I am already sexually active?",
        answer:
          "Yes. You may still be protected against HPV types you have not encountered, though the benefit may be smaller.",
      },
      {
        id: "8",
        question: "Does the vaccine mean I can skip Pap smears?",
        answer:
          "No. Vaccination does not cover every high-risk HPV type, so routine cervical screening is still needed.",
      },
      {
        id: "9",
        question: "Can the HPV vaccine be taken during pregnancy?",
        answer:
          "Vaccination is usually postponed until after pregnancy. Tell your doctor if you are pregnant or planning to conceive.",
      },
      {
        id: "10",
        question: "Does the HPV vaccine affect fertility?",
        answer:
          "There is no evidence that HPV vaccination affects fertility or future pregnancy.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "How often should I have a gynecology checkup?",
        answer:
          "An annual visit suits most women. Your doctor may suggest more frequent visits if you have ongoing symptoms or a specific condition.",
      },
      {
        id: "2",
        question: "What happens during a routine gynecology checkup?",
        answer:
          "It usually includes a discussion of your cycle and symptoms, a general and pelvic examination, and screening tests such as a Pap smear where appropriate.",
      },
      {
        id: "3",
        question: "Do I need a checkup if I have no symptoms?",
        answer:
          "Yes. Many conditions, including early cervical changes, fibroids, and thyroid problems, cause no symptoms at first and are found on routine review.",
      },
      {
        id: "4",
        question: "Should I book the visit at a particular time in my cycle?",
        answer:
          "For most tests, a few days after your period ends is convenient. If you have unusual bleeding, do not delay the visit waiting for a particular day.",
      },
      {
        id: "5",
        question: "Do unmarried women need gynecology checkups?",
        answer:
          "Yes. Gynecological health concerns periods, hormones, and general well-being, and they apply regardless of marital status.",
      },
      {
        id: "6",
        question: "Is a pelvic examination always done?",
        answer:
          "Not always. What is examined depends on your age, symptoms, and consent, and everything is explained to you beforehand.",
      },
      {
        id: "7",
        question: "Which tests are commonly advised?",
        answer:
          "Depending on your age and history, a doctor may suggest a Pap smear, pelvic ultrasound, haemoglobin, thyroid, and blood sugar tests.",
      },
      {
        id: "8",
        question: "Should I continue checkups after menopause?",
        answer:
          "Yes. Post-menopausal visits help monitor bone health, screening tests, and any unusual bleeding, which should always be reported.",
      },
      {
        id: "9",
        question: "Can I discuss contraception at a routine visit?",
        answer:
          "Yes. A routine visit is a good time to discuss contraception, family planning, and any concerns about intimate health.",
      },
      {
        id: "10",
        question: "When should I book an appointment sooner than planned?",
        answer:
          "Book earlier if you have heavy or irregular bleeding, pelvic pain, unusual discharge, breast changes, or bleeding after intercourse or after menopause.",
      },
    ] satisfies BlogFaq[],


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
      title: "Breast Cancer Specialist In Gurgaon",
      date: "Aug 28, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "breast-cancer-doctor-in-gurgaon",
      slug: "breast-cancer-doctor-in-gurgaon",
      category: "preventive-women-health",
      title: "Breast Cancer Specialist In Gurgaon",
      intro:
        "Breast cancer develops when abnormal cells in the breast grow in an uncontrolled way. It can cause a lump, changes in the breast or nipple, unusual discharge, or changes in the shape or skin of the breast. However, many breast changes are not cancer, so unusual changes should be checked by a doctor.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "If you notice a new lump, change in breast size or shape, nipple changes, or unusual discharge, consulting an experienced Breast Cancer Specialist In Gurgaon can help identify the cause and guide you toward the right tests and treatment.",
      ],
    },

    seo: {
      title: "Best Breast Cancer Specialist Doctor in Gurgaon",
      description:
        "Consult Dr. Kusum Lata Bhardwaj, Breast Cancer Specialist Doctor in Gurgaon, for breast lump evaluation, cancer diagnosis, personalised treatment & surgical care. ✔ 17+ years experience ✔ 10K+ patients",
      canonical: "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Is Breast Cancer?",
        title: "Understanding Breast Cancer",
        color: "#ec4899",
        paragraph:
          "Breast cancer occurs when abnormal cells in breast tissue grow and multiply in an uncontrolled way. It can begin in the milk ducts or milk-producing glands and may sometimes spread to nearby lymph nodes or other parts of the body. Early evaluation of unusual breast changes can help with timely diagnosis and treatment.",
        paragraphs: ["Common areas involved:"],
        cards: [
          {
            title: "Breast Tissue",
            description: "Can develop as a lump or abnormal area.",
          },
          {
            title: "Milk Ducts",
            description:
              "Some breast cancers begin in the cells lining the milk ducts.",
          },
          {
            title: "Lobules",
            description: "Cancer can also start in the milk-producing glands.",
          },
          {
            title: "Lymph Nodes",
            description:
              "Breast cancer can sometimes spread to nearby lymph nodes, particularly those in the underarm area.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "10 Signs & Symptoms of Breast Cancer You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "Breast cancer can cause different changes in different people. A new breast change does not always mean cancer, but it is important to have unusual or persistent changes checked by a doctor.",
        items: [
          "New breast lump",
          "Change in breast size",
          "Change in breast shape",
          "Breast swelling",
          "Skin changes on the breast",
          "Nipple turning inward",
          "Nipple discharge, especially if unusual",
          "Change in nipple appearance",
          "Lump or swelling under the arm",
          "Persistent breast or nipple discomfort",
        ],
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why It Happens",
        title: "Possible Causes & Risk Factors of Breast Cancer",
        color: "#f97316",
        paragraph:
          "The exact reason why one person develops breast cancer and another does not is not always clear. However, certain factors can increase the chance of developing breast cancer. Your personal and family history can help a doctor understand your individual risk.",
        items: [
          "Family History: A family history of breast cancer may increase your risk.",
          "Age: The risk of breast cancer generally increases as people get older.",
          "Genetic Changes: Changes in certain genes, including BRCA1 and BRCA2, can increase breast cancer risk in some people.",
          "Hormonal Factors: Long-term exposure to certain hormones can influence breast cancer risk.",
          "Previous Breast Conditions: Some breast conditions may be linked with a higher risk of breast cancer.",
          "Lifestyle Factors: Certain lifestyle factors may also affect breast cancer risk.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See a Breast Cancer Specialist?",
        color: "#f43f5e",
        paragraph:
          "Not every breast lump or change is cancer. However, a new or unusual change should not be ignored, especially if it remains or becomes more noticeable.",
        paragraphs: ["You should consider seeing a specialist if you have:"],
        items: [
          "New Breast Lump",
          "Breast Swelling",
          "Change in Breast Shape",
          "Nipple Changes",
          "Unusual Nipple Discharge",
          "Skin Changes",
          "Underarm Lump",
          "Persistent Breast Changes",
        ],
      },

      {
        id: "diagnosis",
        type: "checkList",
        eyebrow: "Diagnosis",
        title: "How Is Breast Cancer Diagnosed?",
        color: "#8b5cf6",
        paragraph:
          "Finding the cause of a breast change usually starts with a discussion about your symptoms and medical history. Your doctor may then recommend an examination and imaging tests. If an abnormal area is found, a biopsy may be needed to confirm whether cancer is present.",
        items: [
          "Medical History: Your doctor asks about your symptoms and family history.",
          "Breast Examination: The breast and nearby areas are checked for unusual changes.",
          "Mammogram: Uses X-rays to create detailed images of the breast.",
          "Breast Ultrasound: Uses sound waves to examine areas inside the breast.",
          "Breast MRI: May be recommended in certain situations for more detailed images.",
          "Biopsy: A tissue sample is examined in a laboratory to check for cancer cells.",
        ],
      },

      {
        id: "stages",
        type: "timeline",
        eyebrow: "Stages",
        title: "Stages of Breast Cancer",
        color: "#0ea5e9",
        paragraph:
          "Breast cancer is generally staged from Stage 0 to Stage IV. Staging looks at factors such as the size of the tumour, whether nearby lymph nodes are involved, whether the cancer has spread, and other features such as tumour grade and biomarkers. The stage helps doctors plan treatment.",
        timeline: [
          {
            label: "Stage 0",
            title: "Abnormal Cells",
            description:
              "Abnormal cells are found in the breast but have not spread into nearby breast tissue.",
          },
          {
            label: "Stage 1",
            title: "Early Breast Cancer",
            description:
              "The cancer is relatively small and has not spread widely.",
          },
          {
            label: "Stage 2",
            title: "Limited Spread",
            description:
              "The cancer may be larger or may involve nearby lymph nodes.",
          },
          {
            label: "Stage 3",
            title: "More Advanced Cancer",
            description:
              "The cancer has spread more extensively within the breast or nearby lymph nodes.",
          },
          {
            label: "Stage 4",
            title: "Metastatic Breast Cancer",
            description:
              "The cancer has spread to distant parts of the body.",
          },
        ],
        note:
          "The exact stage is determined using medical examination, imaging, biopsy results, tumour characteristics, and other tests when required.",
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Delayed Treatment",
        title: "How Delayed Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "Delaying the evaluation of a suspicious breast change can delay diagnosis and treatment. Breast cancer is not the same for everyone, and the effects of delay depend on the type and stage of the disease.",
        timeline: [
          {
            label: "Stage 1",
            title: "Growing Tumour",
            description:
              "The cancer may continue to grow if it is not identified and treated.",
          },
          {
            label: "Stage 2",
            title: "Lymph Node Involvement",
            description:
              "Some breast cancers may spread to nearby lymph nodes.",
          },
          {
            label: "Stage 3",
            title: "Local Spread",
            description:
              "More extensive disease may involve nearby tissues or lymph nodes.",
          },
          {
            label: "Stage 4",
            title: "Distant Spread",
            description:
              "Breast cancer may spread to other parts of the body, where it requires treatment as metastatic disease.",
          },
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Breast Cancer Treatment In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "Breast cancer treatment depends on the type and stage of cancer, tumour characteristics, overall health, and individual treatment needs. Treatment may involve surgery, radiation therapy, chemotherapy, hormone therapy, targeted therapy, immunotherapy, or a combination of these approaches.",
        cards: [
          {
            title: "Breast Surgery",
            description:
              "Removes the cancerous area or, when needed, the breast.",
          },
          {
            title: "Lumpectomy",
            description:
              "Removes the tumour while keeping most of the breast.",
          },
          {
            title: "Mastectomy",
            description:
              "Removes the breast and may be recommended in certain cases.",
          },
          {
            title: "Radiation Therapy",
            description:
              "Uses radiation to destroy or control cancer cells.",
          },
          {
            title: "Chemotherapy",
            description:
              "Uses medicines to destroy or slow the growth of cancer cells.",
          },
          {
            title: "Hormone Therapy",
            description:
              "May be used for hormone-receptor-positive breast cancers.",
          },
          {
            title: "Targeted Therapy",
            description:
              "Targets specific features of certain cancer cells.",
          },
          {
            title: "Immunotherapy",
            description:
              "May be used for selected types of breast cancer.",
          },
        ],
      },

      {
        id: "surgery",
        type: "checkList",
        eyebrow: "Surgical Care",
        title: "Breast Cancer Surgery",
        color: "#6366f1",
        paragraph:
          "Surgery is an important part of treatment for many people with breast cancer. Depending on the tumour and individual condition, surgery may involve removing the tumour while preserving the breast or removing the whole breast. Nearby lymph nodes may also be checked.",
        paragraphs: ["Possible surgical approaches include:"],
        items: [
          "Breast-Conserving Surgery",
          "Lumpectomy",
          "Mastectomy",
          "Sentinel Lymph Node Biopsy",
          "Lymph Node Surgery",
          "Breast Reconstruction",
          "Tumour Removal",
          "Surgical Staging",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a Specialist?",
        color: "#dc2626",
        paragraph:
          "If you notice a new breast lump or any unusual breast or nipple change, it is better to get it checked rather than waiting for it to disappear. Early evaluation can help identify the cause and determine whether further tests are needed.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "New Breast Lump",
          "Unusual Nipple Discharge",
          "Nipple Retraction",
          "Breast Skin Changes",
          "Persistent Breast Swelling",
          "Change in Breast Shape",
          "Underarm Lump",
          "Unexplained Breast Changes",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title: "Why Choose the Best Breast Cancer Doctor In Gurugram?",
        color: "#a855f7",
        paragraph:
          "Choosing the right specialist is important when you have a breast lump, unusual breast changes, or a breast cancer diagnosis. Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician focused on clear diagnosis, safe treatment planning, and supportive care throughout your journey. With 17+ years of experience, she has guided 10k+ patients and has experience across 3 premier institutes. She takes time to understand each patient's concerns and explains the next steps in simple language.",
        paragraphs: [
          "Every breast cancer case is different, so treatment needs to be planned according to the patient's condition. An experienced Breast Specialist In Gurgaon can review your reports, biopsy results, tumour type, stage, and overall health before discussing suitable treatment options. Depending on the case, care may include surgery, medicines, radiation, or a combination of treatments.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Breast Cancer",

    faqs: [
      {
        id: "1",
        question: "What is breast cancer?",
        answer:
          "Breast cancer happens when abnormal cells in the breast grow uncontrollably. It can start in the milk ducts or lobules.",
      },
      {
        id: "2",
        question: "What are the common signs of breast cancer?",
        answer:
          "A new lump, breast or nipple changes, unusual discharge, skin changes, or underarm swelling can be signs that need medical evaluation.",
      },
      {
        id: "3",
        question: "Does every breast lump mean cancer?",
        answer:
          "No. Many breast lumps are not cancer. However, a new or unusual lump should be checked by a doctor.",
      },
      {
        id: "4",
        question: "How is breast cancer diagnosed?",
        answer:
          "Diagnosis may involve a breast examination, mammogram, ultrasound, MRI in selected cases, and a biopsy when needed.",
      },
      {
        id: "5",
        question: "What are the stages of breast cancer?",
        answer:
          "Breast cancer is generally classified from Stage 0 to Stage IV, depending on the extent and spread of the disease.",
      },
      {
        id: "6",
        question: "Can breast cancer be treated?",
        answer:
          "Yes. Treatment options depend on the type and stage and may include surgery, radiation, chemotherapy, hormone therapy, targeted therapy, or immunotherapy.",
      },
      {
        id: "7",
        question: "When is breast cancer surgery needed?",
        answer:
          "Surgery is commonly used to remove breast cancer, but the exact type of surgery depends on the tumour and individual condition.",
      },
      {
        id: "8",
        question: "What is the difference between lumpectomy and mastectomy?",
        answer:
          "A lumpectomy removes the tumour and some surrounding tissue, while a mastectomy removes the breast. Your surgeon can explain which option is suitable for you.",
      },
      {
        id: "9",
        question: "Can breast cancer come back after treatment?",
        answer:
          "Breast cancer can return in some patients. The risk depends on several factors, so regular follow-up with your cancer care team is important.",
      },
      {
        id: "10",
        question: "When should I see a Breast Cancer Specialist In Gurgaon?",
        answer:
          "See a specialist if you notice a new breast lump, unusual nipple discharge, skin or nipple changes, breast swelling, or another persistent breast change.",
      },
    ] satisfies BlogFaq[],

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
    faqs: [
      {
        id: "1",
        question: "Why are thyroid problems more common in women?",
        answer:
          "Women are more prone to thyroid disorders because of hormonal changes around periods, pregnancy, and menopause, and a higher rate of autoimmune thyroid conditions.",
      },
      {
        id: "2",
        question: "What are the symptoms of an underactive thyroid?",
        answer:
          "Tiredness, weight gain, feeling cold, dry skin, hair fall, constipation, low mood, and heavier or irregular periods are common.",
      },
      {
        id: "3",
        question: "What are the symptoms of an overactive thyroid?",
        answer:
          "Weight loss, rapid heartbeat, anxiety, tremor, feeling hot, disturbed sleep, and lighter or irregular periods can occur.",
      },
      {
        id: "4",
        question: "How are thyroid problems diagnosed?",
        answer:
          "A blood test measuring TSH along with T3 and T4 is the main test. An ultrasound or antibody test may be added if needed.",
      },
      {
        id: "5",
        question: "Can thyroid problems affect my periods?",
        answer:
          "Yes. Both underactive and overactive thyroid can make periods heavier, lighter, irregular, or absent.",
      },
      {
        id: "6",
        question: "Can thyroid problems affect fertility?",
        answer:
          "Yes. Untreated thyroid disorders can interfere with ovulation and increase the risk of miscarriage, which is why testing is common in fertility evaluation.",
      },
      {
        id: "7",
        question: "Do I need thyroid testing in pregnancy?",
        answer:
          "Thyroid testing is often advised in early pregnancy, particularly if you have symptoms, a family history, or a previous thyroid problem.",
      },
      {
        id: "8",
        question: "Is thyroid medication lifelong?",
        answer:
          "Often it is, especially for an underactive thyroid, but the dose is reviewed regularly and adjusted as needed.",
      },
      {
        id: "9",
        question: "Can diet alone correct a thyroid problem?",
        answer:
          "Diet supports general health but does not replace medication when it is needed. Adequate iodine and a balanced diet are helpful alongside treatment.",
      },
      {
        id: "10",
        question: "How often should thyroid levels be rechecked?",
        answer:
          "Usually every few months when starting or adjusting treatment, and then once or twice a year when levels are stable.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is hormonal weight gain?",
        answer:
          "It is weight gain driven mainly by hormonal changes rather than diet alone, often involving insulin, thyroid hormones, cortisol, or estrogen.",
      },
      {
        id: "2",
        question: "Which hormonal conditions commonly cause weight gain?",
        answer:
          "PCOS, an underactive thyroid, insulin resistance, high cortisol from long-term stress, and the menopausal transition are common contributors.",
      },
      {
        id: "3",
        question: "Why does hormonal weight settle around the abdomen?",
        answer:
          "Insulin resistance and cortisol tend to encourage fat storage around the waist, which is why the change is often noticed there first.",
      },
      {
        id: "4",
        question: "How do I know if my weight gain is hormonal?",
        answer:
          "Weight gain that continues despite reasonable eating and activity, especially with irregular periods, tiredness, hair changes, or skin changes, may be hormonal and should be tested.",
      },
      {
        id: "5",
        question: "Which tests help identify the cause?",
        answer:
          "Thyroid function, fasting insulin and blood sugar, and hormone tests such as prolactin and androgens are commonly used, along with a pelvic ultrasound where relevant.",
      },
      {
        id: "6",
        question: "Can hormonal weight gain be reversed?",
        answer:
          "In many cases yes. Treating the underlying hormonal problem alongside sustained diet, activity, and sleep changes usually improves weight over time.",
      },
      {
        id: "7",
        question: "Does crash dieting help?",
        answer:
          "No. Very restrictive dieting can worsen hormonal balance, slow metabolism, and disturb periods. Gradual, sustainable change works better.",
      },
      {
        id: "8",
        question: "What type of exercise is most useful?",
        answer:
          "A combination of regular walking or cardio with strength training helps improve insulin sensitivity and preserve muscle.",
      },
      {
        id: "9",
        question: "Does poor sleep affect weight?",
        answer:
          "Yes. Insufficient or irregular sleep raises cortisol and appetite-related hormones and can make weight harder to control.",
      },
      {
        id: "10",
        question: "When should I see a doctor about weight gain?",
        answer:
          "See a doctor if weight rises quickly without a change in habits, or if it comes with irregular periods, extreme tiredness, hair fall, or unusual hair growth.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What causes hormonal acne?",
        answer:
          "Higher androgen activity increases oil production and blocks pores, which leads to acne along the jawline, chin, and lower face.",
      },
      {
        id: "2",
        question: "What causes hormonal hair fall?",
        answer:
          "Androgen sensitivity, thyroid problems, low iron, PCOS, and post-pregnancy hormonal shifts are common causes of hair thinning in women.",
      },
      {
        id: "3",
        question: "How is hormonal acne different from ordinary acne?",
        answer:
          "Hormonal acne tends to appear on the lower face and jawline, flares before periods, and often persists into adult life.",
      },
      {
        id: "4",
        question: "Which tests may be advised?",
        answer:
          "Depending on your symptoms, a doctor may check thyroid function, androgens, prolactin, vitamin D, iron stores, and blood sugar, along with a pelvic ultrasound.",
      },
      {
        id: "5",
        question: "Can PCOS cause both acne and hair fall?",
        answer:
          "Yes. PCOS commonly causes acne, scalp hair thinning, and unwanted facial or body hair together with irregular periods.",
      },
      {
        id: "6",
        question: "How long does treatment take to show results?",
        answer:
          "Skin usually improves over about two to three months, and hair changes take longer, often three to six months, because of the hair growth cycle.",
      },
      {
        id: "7",
        question: "Do hormonal treatments help acne and hair fall?",
        answer:
          "They can. Hormonal medicines may reduce androgen effects, but they are prescribed after assessment and are not suitable for everyone.",
      },
      {
        id: "8",
        question: "Does diet affect hormonal acne?",
        answer:
          "For some women, high-sugar and highly processed foods worsen acne through insulin effects. A balanced diet supports treatment but rarely replaces it.",
      },
      {
        id: "9",
        question: "Will hair grow back after treatment?",
        answer:
          "Regrowth is often possible when the underlying cause is corrected early, though long-standing thinning may improve only partially.",
      },
      {
        id: "10",
        question: "When should I see a doctor?",
        answer:
          "See a doctor if acne is persistent or scarring, if hair fall is heavy or patchy, or if these come with irregular periods or unwanted hair growth.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "Why do hormones affect mood?",
        answer:
          "Estrogen and progesterone influence brain chemicals that regulate mood and sleep, so when their levels shift, mood can change too.",
      },
      {
        id: "2",
        question: "What is PMS?",
        answer:
          "Premenstrual syndrome refers to mood and physical symptoms in the days before a period, such as irritability, low mood, bloating, and breast tenderness.",
      },
      {
        id: "3",
        question: "What is PMDD?",
        answer:
          "Premenstrual dysphoric disorder is a more severe form of PMS with intense mood symptoms that interfere with work and relationships. It is treatable.",
      },
      {
        id: "4",
        question: "When are hormonal mood changes most common?",
        answer:
          "They are most common before periods, after childbirth, during breastfeeding, and during the years approaching menopause.",
      },
      {
        id: "5",
        question: "Are mood swings a sign of thyroid problems?",
        answer:
          "They can be. Both underactive and overactive thyroid can cause low mood, anxiety, or irritability, so thyroid testing is often advised.",
      },
      {
        id: "6",
        question: "How are hormonal mood changes diagnosed?",
        answer:
          "A doctor will review your symptom pattern in relation to your cycle and may advise thyroid, hormone, vitamin D, and haemoglobin tests.",
      },
      {
        id: "7",
        question: "Can lifestyle changes improve mood symptoms?",
        answer:
          "Yes. Regular sleep, physical activity, reduced caffeine, balanced meals, and stress management often make a noticeable difference.",
      },
      {
        id: "8",
        question: "Do these symptoms need medication?",
        answer:
          "Not always. Many women improve with lifestyle support. Medication or hormonal treatment is considered when symptoms are severe or persistent.",
      },
      {
        id: "9",
        question: "Is postnatal low mood the same as hormonal mood swings?",
        answer:
          "No. Persistent low mood after childbirth may be postnatal depression, which needs proper assessment and support rather than being dismissed as normal.",
      },
      {
        id: "10",
        question: "When should I seek help?",
        answer:
          "Seek help if mood changes affect your daily life, relationships, or work, if they last beyond your period, or if you have thoughts of harming yourself.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "When should I book my first pregnancy visit?",
        answer:
          "Book as soon as your pregnancy is confirmed, ideally within the first six to eight weeks, so that early checks and supplements can begin.",
      },
      {
        id: "2",
        question: "How often are antenatal visits needed?",
        answer:
          "Usually monthly until about 28 weeks, then every two weeks until 36 weeks, and weekly after that, unless your doctor advises otherwise.",
      },
      {
        id: "3",
        question: "Which supplements are important in pregnancy?",
        answer:
          "Folic acid in early pregnancy, along with iron, calcium, and vitamin D as advised by your doctor, are commonly recommended.",
      },
      {
        id: "4",
        question: "What are common early pregnancy symptoms?",
        answer:
          "Nausea, tiredness, breast tenderness, frequent urination, food aversions, and mild cramping are common in the first trimester.",
      },
      {
        id: "5",
        question: "Is exercise safe during pregnancy?",
        answer:
          "Moderate activity such as walking or prenatal yoga is usually safe in an uncomplicated pregnancy. Check with your doctor before starting.",
      },
      {
        id: "6",
        question: "What foods should be avoided?",
        answer:
          "Raw or undercooked meat and eggs, unpasteurised dairy, high-mercury fish, excess caffeine, and alcohol are generally avoided.",
      },
      {
        id: "7",
        question: "How much weight gain is normal?",
        answer:
          "It depends on your pre-pregnancy weight. Your doctor will suggest a suitable range and monitor it at each visit.",
      },
      {
        id: "8",
        question: "Which warning signs need urgent attention?",
        answer:
          "Bleeding, severe abdominal pain, severe headache, blurred vision, high fever, fluid leaking, or reduced baby movements need prompt medical attention.",
      },
      {
        id: "9",
        question: "Is travel safe during pregnancy?",
        answer:
          "Travel is often safest in the second trimester. Discuss your plans with your doctor, especially for long journeys or air travel.",
      },
      {
        id: "10",
        question: "When should I contact my doctor between visits?",
        answer:
          "Contact your doctor any time you have bleeding, persistent pain, fever, vomiting that prevents eating or drinking, or reduced fetal movements.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What makes a pregnancy high risk?",
        answer:
          "Factors include maternal age, high blood pressure, diabetes, thyroid disease, twin pregnancy, previous pregnancy loss, previous caesarean, and certain medical conditions.",
      },
      {
        id: "2",
        question: "Does high risk mean something will go wrong?",
        answer:
          "No. It means the pregnancy needs closer monitoring so that problems can be identified and managed early. Many high-risk pregnancies have healthy outcomes.",
      },
      {
        id: "3",
        question: "How is a high-risk pregnancy monitored?",
        answer:
          "With more frequent visits, additional ultrasound scans, blood pressure and blood sugar checks, and growth and Doppler studies as needed.",
      },
      {
        id: "4",
        question: "What is gestational diabetes?",
        answer:
          "It is diabetes that appears during pregnancy. It is usually detected by a glucose test and managed with diet, monitoring, and sometimes medication.",
      },
      {
        id: "5",
        question: "What is preeclampsia?",
        answer:
          "Preeclampsia involves high blood pressure with protein in the urine during pregnancy. It needs close monitoring and can be serious if untreated.",
      },
      {
        id: "6",
        question: "Can I have a normal delivery in a high-risk pregnancy?",
        answer:
          "Sometimes yes. The mode of delivery depends on your specific condition, the baby's position and growth, and how the pregnancy progresses.",
      },
      {
        id: "7",
        question: "Are extra scans harmful to the baby?",
        answer:
          "Ultrasound scans are considered safe in pregnancy and are done only when clinically useful.",
      },
      {
        id: "8",
        question: "Does a previous miscarriage make this pregnancy high risk?",
        answer:
          "Repeated pregnancy loss can place a pregnancy in the high-risk group, and additional tests and monitoring are usually offered.",
      },
      {
        id: "9",
        question: "Will I need to be admitted early?",
        answer:
          "Not always. Admission is advised only if monitoring, medication, or early delivery becomes necessary for your safety or the baby's.",
      },
      {
        id: "10",
        question: "What warning signs should I never ignore?",
        answer:
          "Bleeding, severe headache, blurred vision, swelling of the face or hands, severe abdominal pain, fever, or reduced baby movements need immediate attention.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "Are pregnancy ultrasounds safe?",
        answer:
          "Yes. Ultrasound uses sound waves rather than radiation and is considered safe when performed for medical reasons.",
      },
      {
        id: "2",
        question: "How many scans are needed in pregnancy?",
        answer:
          "Most uncomplicated pregnancies need about three to four scans, though more may be advised if closer monitoring is required.",
      },
      {
        id: "3",
        question: "What is the dating scan?",
        answer:
          "An early scan, usually in the first trimester, that confirms the pregnancy, checks the heartbeat, and estimates the due date.",
      },
      {
        id: "4",
        question: "What is the NT scan?",
        answer:
          "The nuchal translucency scan is done around 11 to 14 weeks and helps assess the risk of certain chromosomal conditions.",
      },
      {
        id: "5",
        question: "What is the anomaly scan?",
        answer:
          "Performed around 18 to 22 weeks, it examines the baby's organs and structure in detail.",
      },
      {
        id: "6",
        question: "What is a growth scan?",
        answer:
          "A third-trimester scan that checks the baby's growth, amniotic fluid, and blood flow through the placenta.",
      },
      {
        id: "7",
        question: "Do I need a full bladder for the scan?",
        answer:
          "A full bladder is usually needed for early scans. For later scans it is generally not required. The clinic will tell you what to do.",
      },
      {
        id: "8",
        question: "Can an ultrasound tell the baby's sex?",
        answer:
          "Determining or disclosing the sex of the fetus is prohibited by law in India, so scans are used only for medical assessment.",
      },
      {
        id: "9",
        question: "What is a Doppler scan?",
        answer:
          "A Doppler study assesses blood flow between the placenta and the baby, and is often used in high-risk pregnancies.",
      },
      {
        id: "10",
        question: "What if the scan shows something unexpected?",
        answer:
          "Your doctor will explain the finding, arrange any further tests needed, and discuss the options with you. Many findings turn out to be minor.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "How long does recovery after delivery take?",
        answer:
          "Most women feel substantially better within about six weeks, though full recovery, especially after a caesarean, can take longer.",
      },
      {
        id: "2",
        question: "How long does bleeding continue after delivery?",
        answer:
          "Postnatal bleeding usually lasts around two to six weeks and gradually reduces. Sudden heavy bleeding or clots should be reported.",
      },
      {
        id: "3",
        question: "When is the first postnatal checkup?",
        answer:
          "A checkup around six weeks after delivery is usual, with an earlier visit if you had a caesarean or any complication.",
      },
      {
        id: "4",
        question: "When do periods return after delivery?",
        answer:
          "This varies. Periods may return within a couple of months if you are not breastfeeding, or take several months if you are breastfeeding.",
      },
      {
        id: "5",
        question: "Can I get pregnant before my periods return?",
        answer:
          "Yes. Ovulation can occur before the first period, so contraception should be discussed even while breastfeeding.",
      },
      {
        id: "6",
        question: "How should I care for a caesarean wound?",
        answer:
          "Keep it clean and dry, avoid heavy lifting, and report redness, swelling, discharge, or increasing pain to your doctor.",
      },
      {
        id: "7",
        question: "When can I resume exercise?",
        answer:
          "Gentle walking can usually begin early. More intense exercise and core work are generally started after your postnatal check and your doctor's approval.",
      },
      {
        id: "8",
        question: "What is postnatal depression?",
        answer:
          "It is persistent low mood, anxiety, or hopelessness after childbirth that goes beyond the short-lived baby blues and needs proper support and treatment.",
      },
      {
        id: "9",
        question: "What diet supports recovery and breastfeeding?",
        answer:
          "A balanced diet with adequate protein, iron, calcium, and fluids, along with any supplements your doctor advises, supports recovery and milk supply.",
      },
      {
        id: "10",
        question: "Which symptoms need urgent care after delivery?",
        answer:
          "Heavy bleeding, fever, severe abdominal or wound pain, foul-smelling discharge, breathing difficulty, calf pain, or thoughts of self-harm need urgent attention.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "When is a couple considered infertile?",
        answer:
          "Usually after one year of regular unprotected intercourse without conception, or after six months if the woman is over 35.",
      },
      {
        id: "2",
        question: "Is infertility always a female problem?",
        answer:
          "No. Male factors account for a substantial share of cases, so evaluation of both partners is standard.",
      },
      {
        id: "3",
        question: "What tests are done for the female partner?",
        answer:
          "Common tests include hormone and thyroid blood tests, ovulation assessment, a pelvic ultrasound, and tubal patency tests such as an HSG.",
      },
      {
        id: "4",
        question: "What tests are done for the male partner?",
        answer:
          "A semen analysis is the main first test, sometimes followed by hormone tests or a specialist referral.",
      },
      {
        id: "5",
        question: "What are the common causes of infertility?",
        answer:
          "Ovulation disorders such as PCOS, blocked fallopian tubes, endometriosis, fibroids, low sperm count or motility, and age-related decline are common.",
      },
      {
        id: "6",
        question: "Does age affect fertility?",
        answer:
          "Yes. Egg quality and quantity decline with age, particularly after the mid-thirties, which is why earlier evaluation is advised for older couples.",
      },
      {
        id: "7",
        question: "Can infertility be treated without IVF?",
        answer:
          "Often yes. Ovulation induction, timed intercourse, correction of hormonal problems, IUI, and surgery help many couples conceive without IVF.",
      },
      {
        id: "8",
        question: "Does stress cause infertility?",
        answer:
          "Stress alone is rarely the sole cause, but it can affect cycles and intimacy. Managing stress supports treatment without replacing it.",
      },
      {
        id: "9",
        question: "How long does fertility treatment take?",
        answer:
          "It varies widely. Some couples conceive within a few cycles of simple treatment, while others need longer or more advanced care.",
      },
      {
        id: "10",
        question: "When should we see a fertility specialist?",
        answer:
          "See a specialist after a year of trying, after six months if over 35, or sooner if there are irregular periods, known endometriosis, previous pelvic surgery, or repeated miscarriage.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is IVF?",
        answer:
          "In vitro fertilisation is a procedure where eggs and sperm are combined in a laboratory and the resulting embryo is transferred into the uterus.",
      },
      {
        id: "2",
        question: "Who may need IVF?",
        answer:
          "IVF may be advised for blocked tubes, severe male factor infertility, advanced endometriosis, reduced ovarian reserve, or when other treatments have not worked.",
      },
      {
        id: "3",
        question: "What are the main stages of IVF?",
        answer:
          "Ovarian stimulation, egg retrieval, fertilisation in the laboratory, embryo culture, embryo transfer, and a pregnancy test about two weeks later.",
      },
      {
        id: "4",
        question: "How long does one IVF cycle take?",
        answer:
          "A single cycle usually takes around four to six weeks from the start of stimulation to the pregnancy test.",
      },
      {
        id: "5",
        question: "Is egg retrieval painful?",
        answer:
          "It is done under sedation or short anaesthesia, so you should not feel pain during the procedure. Mild cramping afterwards is common.",
      },
      {
        id: "6",
        question: "What is the success rate of IVF?",
        answer:
          "Success depends strongly on age, egg and sperm quality, and the underlying cause. Your doctor can give a realistic estimate for your situation.",
      },
      {
        id: "7",
        question: "Does IVF always result in twins?",
        answer:
          "No. Transferring a single embryo, which is now commonly preferred, greatly reduces the chance of a multiple pregnancy.",
      },
      {
        id: "8",
        question: "Do I need bed rest after embryo transfer?",
        answer:
          "Prolonged bed rest is not required. Most women can return to normal light activity, avoiding heavy exertion.",
      },
      {
        id: "9",
        question: "Are IVF babies different from naturally conceived babies?",
        answer:
          "No. Children conceived through IVF develop in the same way as naturally conceived children.",
      },
      {
        id: "10",
        question: "What should I bring to an IVF consultation?",
        answer:
          "Bring previous test reports, scan records, semen analysis, details of past treatments, and a list of your questions.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is an ovulation problem?",
        answer:
          "It means the ovary does not release an egg regularly or at all, which makes conception difficult and often causes irregular periods.",
      },
      {
        id: "2",
        question: "What are the signs of not ovulating?",
        answer:
          "Irregular or absent periods, very unpredictable cycles, absent mid-cycle discharge changes, and difficulty conceiving can all suggest an ovulation problem.",
      },
      {
        id: "3",
        question: "What causes ovulation problems?",
        answer:
          "PCOS is the most common cause. Thyroid disorders, raised prolactin, very low or very high body weight, excessive exercise, and stress can also contribute.",
      },
      {
        id: "4",
        question: "How is ovulation confirmed?",
        answer:
          "Through cycle tracking, mid-luteal progesterone blood tests, follicular ultrasound monitoring, and sometimes ovulation predictor kits.",
      },
      {
        id: "5",
        question: "Can I ovulate without having a period?",
        answer:
          "It is uncommon. Regular periods usually indicate ovulation, though ovulation can occasionally occur before periods return, for example after childbirth.",
      },
      {
        id: "6",
        question: "Are ovulation problems treatable?",
        answer:
          "Yes. Treatment may include correcting thyroid or prolactin problems, weight and lifestyle changes, and ovulation induction medicines.",
      },
      {
        id: "7",
        question: "What is ovulation induction?",
        answer:
          "It is the use of medicines to stimulate the ovary to release an egg, usually with ultrasound monitoring to track the response.",
      },
      {
        id: "8",
        question: "Can lifestyle changes restore ovulation?",
        answer:
          "In many women with PCOS or weight-related problems, weight and lifestyle changes alone can restore regular ovulation.",
      },
      {
        id: "9",
        question: "Does irregular ovulation mean I cannot conceive?",
        answer:
          "No. It means conception may take longer or need help, but many women with ovulation problems conceive with treatment.",
      },
      {
        id: "10",
        question: "When should I see a doctor about ovulation?",
        answer:
          "See a doctor if your cycles are irregular or absent, if you have been trying to conceive for six to twelve months, or if you have PCOS or thyroid problems.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is tubal blockage?",
        answer:
          "It is an obstruction in one or both fallopian tubes that prevents the egg and sperm from meeting or stops a fertilised egg reaching the uterus.",
      },
      {
        id: "2",
        question: "What causes blocked fallopian tubes?",
        answer:
          "Previous pelvic infection, tuberculosis, endometriosis, previous pelvic or abdominal surgery, and ectopic pregnancy are common causes.",
      },
      {
        id: "3",
        question: "Are there symptoms of blocked tubes?",
        answer:
          "Often there are none. Many women discover it only during a fertility evaluation, though some have pelvic pain or a history of infection.",
      },
      {
        id: "4",
        question: "How is tubal blockage diagnosed?",
        answer:
          "Usually with a hysterosalpingography (HSG), a sono-salpingography, or laparoscopy with a dye test.",
      },
      {
        id: "5",
        question: "What is an HSG test?",
        answer:
          "It is an X-ray test in which dye is passed through the uterus and tubes to see whether they are open. It takes a few minutes and may cause brief cramping.",
      },
      {
        id: "6",
        question: "Can blocked tubes be opened?",
        answer:
          "Sometimes. Laparoscopic surgery may correct adhesions or mild blockage, though severely damaged tubes may not be repairable.",
      },
      {
        id: "7",
        question: "Can I conceive naturally with one open tube?",
        answer:
          "Yes, natural conception is possible with one healthy tube, though it may take longer.",
      },
      {
        id: "8",
        question: "When is IVF advised instead of surgery?",
        answer:
          "IVF is often preferred when both tubes are severely damaged, when age or ovarian reserve is a concern, or when surgery has not succeeded.",
      },
      {
        id: "9",
        question: "Does tubal blockage increase ectopic pregnancy risk?",
        answer:
          "Yes. Damaged tubes raise the risk of ectopic pregnancy, so early pregnancy monitoring is important.",
      },
      {
        id: "10",
        question: "Can blocked tubes be treated with medicines?",
        answer:
          "Medicines do not open a mechanical blockage. They are used only to treat an underlying infection such as tuberculosis when present.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is menopause?",
        answer:
          "Menopause is confirmed when a woman has had no periods for twelve consecutive months, marking the natural end of reproductive years.",
      },
      {
        id: "2",
        question: "At what age does menopause usually occur?",
        answer:
          "Most commonly between 45 and 55 years, though it can happen earlier or later.",
      },
      {
        id: "3",
        question: "What is perimenopause?",
        answer:
          "It is the transition period before menopause, often lasting several years, when cycles become irregular and symptoms begin.",
      },
      {
        id: "4",
        question: "What are the common symptoms?",
        answer:
          "Hot flashes, night sweats, disturbed sleep, mood changes, vaginal dryness, reduced libido, joint aches, and irregular periods.",
      },
      {
        id: "5",
        question: "Is menopause a disease?",
        answer:
          "No, it is a natural life stage. However, its symptoms and long-term effects on bone and heart health can be managed.",
      },
      {
        id: "6",
        question: "What is hormone replacement therapy?",
        answer:
          "HRT replaces declining estrogen, sometimes with progesterone, to relieve symptoms. It suits some women and not others, and needs individual assessment.",
      },
      {
        id: "7",
        question: "Is HRT safe?",
        answer:
          "For many women it is effective and reasonably safe when started at the right time and monitored, but risks and benefits differ for each person.",
      },
      {
        id: "8",
        question: "Can menopause symptoms be managed without hormones?",
        answer:
          "Yes. Lifestyle changes, non-hormonal medicines, vaginal moisturisers, calcium and vitamin D, and exercise all help.",
      },
      {
        id: "9",
        question: "Is bleeding after menopause normal?",
        answer:
          "No. Any bleeding after menopause should be evaluated promptly, even if it is light or occurs only once.",
      },
      {
        id: "10",
        question: "When should I see a doctor about menopause?",
        answer:
          "See a doctor if symptoms disturb your sleep or daily life, if periods become very heavy or irregular, or if you have any bleeding after menopause.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is a hot flash?",
        answer:
          "It is a sudden feeling of intense heat, usually in the face, neck, and chest, often with flushing, sweating, and a rapid heartbeat.",
      },
      {
        id: "2",
        question: "Why do hot flashes happen?",
        answer:
          "Falling estrogen affects the part of the brain that regulates body temperature, making it react to small temperature changes.",
      },
      {
        id: "3",
        question: "How long do hot flashes last?",
        answer:
          "Each episode usually lasts a few minutes. The overall phase can continue for several years, varying widely between women.",
      },
      {
        id: "4",
        question: "What are night sweats?",
        answer:
          "They are hot flashes that occur during sleep, often causing sweating that disturbs rest.",
      },
      {
        id: "5",
        question: "What triggers hot flashes?",
        answer:
          "Spicy food, hot drinks, caffeine, alcohol, smoking, stress, warm rooms, and heavy clothing are common triggers.",
      },
      {
        id: "6",
        question: "What lifestyle changes help?",
        answer:
          "Dressing in layers, keeping the room cool, avoiding known triggers, regular exercise, and relaxation techniques often reduce frequency.",
      },
      {
        id: "7",
        question: "Which treatments are available?",
        answer:
          "Options include hormone therapy for suitable women, non-hormonal prescription medicines, and supportive measures. Your doctor will advise what fits you.",
      },
      {
        id: "8",
        question: "Are hot flashes dangerous?",
        answer:
          "They are not dangerous in themselves, but frequent episodes can disturb sleep and quality of life and deserve treatment.",
      },
      {
        id: "9",
        question: "Can younger women get hot flashes?",
        answer:
          "Yes. They can occur in early menopause, after surgical removal of the ovaries, or with certain medical treatments.",
      },
      {
        id: "10",
        question: "When should I see a doctor about hot flashes?",
        answer:
          "See a doctor if hot flashes disturb your sleep or daily activities, or if they occur with palpitations, weight loss, or other unexplained symptoms.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What causes vaginal dryness after menopause?",
        answer:
          "Falling estrogen thins and dries the vaginal lining, reducing natural lubrication and elasticity.",
      },
      {
        id: "2",
        question: "What are the symptoms?",
        answer:
          "Dryness, itching, burning, irritation, discomfort or pain during intercourse, and sometimes urinary symptoms.",
      },
      {
        id: "3",
        question: "Is vaginal dryness only a menopausal problem?",
        answer:
          "No. It can also occur while breastfeeding, with certain medicines, after cancer treatment, or with some medical conditions.",
      },
      {
        id: "4",
        question: "Is it a normal part of ageing that I must accept?",
        answer:
          "It is common, but it is treatable. There is no need to live with discomfort or pain.",
      },
      {
        id: "5",
        question: "What treatments are available?",
        answer:
          "Vaginal moisturisers, lubricants for intercourse, local vaginal estrogen, and systemic hormone therapy in suitable women.",
      },
      {
        id: "6",
        question: "What is the difference between a moisturiser and a lubricant?",
        answer:
          "A moisturiser is used regularly to improve tissue hydration, while a lubricant is used at the time of intercourse to reduce friction.",
      },
      {
        id: "7",
        question: "Is local vaginal estrogen safe?",
        answer:
          "Local estrogen acts mainly in the vaginal tissue with very little absorption, and is often suitable even for women who cannot take systemic hormones.",
      },
      {
        id: "8",
        question: "Can vaginal dryness cause urinary problems?",
        answer:
          "Yes. The same tissue changes can cause urinary urgency, discomfort, and recurrent urinary infections.",
      },
      {
        id: "9",
        question: "How long does treatment take to work?",
        answer:
          "Lubricants help immediately, while moisturisers and local estrogen usually show clear improvement over a few weeks of regular use.",
      },
      {
        id: "10",
        question: "When should I see a doctor?",
        answer:
          "See a doctor if there is bleeding, persistent pain during intercourse, unusual discharge, or if symptoms do not improve with simple measures.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "Why does bone loss increase after menopause?",
        answer:
          "Estrogen helps protect bone. When its level falls after menopause, bone is lost faster than it is rebuilt.",
      },
      {
        id: "2",
        question: "What is osteoporosis?",
        answer:
          "Osteoporosis is a condition in which bones become thin and fragile, increasing the risk of fracture even after a minor fall.",
      },
      {
        id: "3",
        question: "Does osteoporosis have symptoms?",
        answer:
          "Usually not until a fracture occurs. Loss of height, a stooped posture, or back pain may be later signs.",
      },
      {
        id: "4",
        question: "What is a DEXA scan?",
        answer:
          "A DEXA scan is a quick, low-radiation test that measures bone density and helps diagnose osteopenia or osteoporosis.",
      },
      {
        id: "5",
        question: "When should bone density testing begin?",
        answer:
          "Often around or after menopause, and earlier if you have risk factors such as early menopause, steroid use, or a family history.",
      },
      {
        id: "6",
        question: "How much calcium and vitamin D do I need?",
        answer:
          "Requirements vary, but adequate dietary calcium with vitamin D is important. Your doctor will advise the right amount and whether supplements are needed.",
      },
      {
        id: "7",
        question: "Which exercises protect bone?",
        answer:
          "Weight-bearing activity such as brisk walking, along with resistance and balance training, helps maintain bone strength and prevent falls.",
      },
      {
        id: "8",
        question: "Which habits weaken bone?",
        answer:
          "Smoking, excessive alcohol, very low body weight, prolonged inactivity, and long-term steroid use all reduce bone strength.",
      },
      {
        id: "9",
        question: "Can osteoporosis be treated?",
        answer:
          "Yes. Calcium and vitamin D, exercise, and prescription medicines can slow bone loss and reduce fracture risk.",
      },
      {
        id: "10",
        question: "How can I reduce my risk of falling?",
        answer:
          "Good lighting, non-slip mats, avoiding loose rugs, suitable footwear, regular vision checks, and balance exercises all help.",
      },
    ] satisfies BlogFaq[],


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
      title: "Best Vaginal Infections Doctor In Gurgaon",
      date: "May 24, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "vaginal-infection-doctor-in-gurgaon",
      slug: "vaginal-infection-doctor-in-gurgaon",
      category: "sexual-intimate-health",
      title: "Best Vaginal Infections Doctor In Gurgaon",
      intro:
        "Vaginal infections are common and can cause itching, unusual discharge, unpleasant smell, irritation, burning, or discomfort while urinating. Different infections can cause similar symptoms, so finding the actual cause is important before starting treatment.",
      image:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "If you are experiencing unusual vaginal discharge, itching, burning, pain, or repeated infections, consulting a Best Vaginal Infections Doctor In Gurgaon can help identify the cause and guide you toward suitable treatment.",
      ],
    },

    seo: {
      title: "Best Vaginal Infection Doctor in Gurgaon | Dr. Kusum Lata",
      description:
        "Meet Dr. Kusum Lata Bhardwaj, a vaginal infection specialist in Gurgaon with 17+ years of experience. Get help for itching, unusual discharge, burning and repeated infections.",
      canonical: "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Is a Vaginal Infection?",
        title: "Understanding Vaginal Infections",
        color: "#ec4899",
        paragraph:
          "A vaginal infection occurs when there is an imbalance or infection affecting the vagina. Common causes include bacterial vaginosis, yeast infection, and some sexually transmitted infections. Symptoms can vary depending on the cause, so proper evaluation is important.",
        paragraphs: ["Common types of vaginal infections:"],
        cards: [
          {
            title: "Bacterial Vaginosis",
            description:
              "Can cause thin discharge and a strong or fishy smell.",
          },
          {
            title: "Yeast Infection",
            description:
              "Often causes itching, irritation, and thick white discharge.",
          },
          {
            title: "Trichomoniasis",
            description:
              "May cause yellow-green or frothy discharge, itching, and discomfort while urinating.",
          },
          {
            title: "Other Infections",
            description:
              "Some STIs can also cause unusual discharge, pelvic pain, bleeding, or discomfort.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "15 Symptoms of Vaginal Infection You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "Vaginal infections can cause different symptoms, and you may not experience all of them. A change in discharge, smell, itching, or discomfort can be a reason to seek medical advice.",
        items: [
          "Unusual vaginal discharge",
          "Change in discharge colour",
          "Strong vaginal smell",
          "Vaginal itching",
          "Vaginal irritation",
          "Burning sensation",
          "Redness around the vagina",
          "Vaginal soreness",
          "Pain while urinating",
          "Pain during intercourse",
          "Vaginal dryness",
          "Pelvic discomfort",
          "Vaginal swelling",
          "Spotting or unusual bleeding",
          "Repeated vaginal infections",
        ],
        note: "Normal vaginal discharge can vary throughout the menstrual cycle. However, a noticeable change in its colour, smell, amount, or texture may need medical evaluation.",
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why it Happens",
        title: "Possible Causes of Vaginal Infection",
        color: "#f97316",
        paragraph:
          "The cause of a vaginal infection can vary from person to person. Some infections are caused by bacteria or yeast, while others may be linked to sexually transmitted infections or irritation.",
        items: [
          "Bacterial Imbalance: Changes in the normal vaginal bacteria can lead to bacterial vaginosis.",
          "Yeast Overgrowth: Candida yeast can grow excessively and cause a yeast infection.",
          "Sexually Transmitted Infections: Infections such as trichomoniasis can cause vaginal symptoms.",
          "Hormonal Changes: Changes during pregnancy, breastfeeding, or menopause can affect the vaginal area.",
          "Scented Products: Perfumed soaps, washes, and vaginal deodorants may cause irritation.",
          "Douching: Washing inside the vagina can disturb its natural balance.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See a Vaginal Infection Doctor?",
        color: "#f43f5e",
        paragraph:
          "Mild changes in vaginal discharge can sometimes be normal, but unusual discharge, strong smell, itching, burning, or pain should not be ignored. Seeing a specialist can help identify the actual cause instead of treating the wrong infection.",
        paragraphs: ["You should consider seeing a doctor if you have:"],
        items: [
          "Unusual Discharge",
          "Strong Vaginal Odour",
          "Persistent Itching",
          "Burning Sensation",
          "Pain While Urinating",
          "Pain During Intercourse",
          "Pelvic Pain",
          "Repeated Infections",
        ],
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Stages of Vaginal Infection",
        title: "How Delayed Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "Ignoring persistent vaginal infection symptoms may allow the underlying problem to continue. The possible effects depend on the type and cause of the infection.",
        timeline: [
          {
            label: "Stage 1",
            title: "Ongoing Discomfort",
            description:
              "Itching, burning, unusual discharge, or irritation may continue.",
          },
          {
            label: "Stage 2",
            title: "Recurring Symptoms",
            description:
              "The infection or symptoms may return if the underlying cause is not properly identified.",
          },
          {
            label: "Stage 3",
            title: "Pelvic Concerns",
            description:
              "Some infections, particularly certain untreated STIs, can be associated with pelvic complications and require timely medical care.",
          },
          {
            label: "Stage 4",
            title: "Pregnancy Concerns",
            description:
              "Certain vaginal or sexually transmitted infections can require special attention during pregnancy, so unusual symptoms should be discussed with a doctor.",
          },
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Vaginal Infections Treatment In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "Vaginal Infections Treatment In Gurgaon depends on the type and cause of infection. Your doctor may recommend antifungal treatment for yeast infections, antibiotics for certain bacterial infections, or specific treatment for sexually transmitted infections. The right treatment should be selected after evaluating the symptoms and, when needed, testing.",
        cards: [
          {
            title: "Antifungal Treatment",
            description: "Used for confirmed yeast infections.",
          },
          {
            title: "Antibiotic Treatment",
            description:
              "May be prescribed for bacterial infections such as bacterial vaginosis.",
          },
          {
            title: "STI Treatment",
            description:
              "Specific medicines may be needed when an STI is diagnosed.",
          },
          {
            title: "Symptom Relief",
            description:
              "Treatment can help reduce itching, irritation, burning, and discomfort.",
          },
          {
            title: "Recurrent Infection Care",
            description:
              "Repeated infections may need further evaluation and a longer-term treatment plan.",
          },
          {
            title: "Follow-Up Care",
            description:
              "Follow-up may be recommended if symptoms continue or return.",
          },
        ],
      },

      {
        id: "diagnosis",
        type: "checkList",
        eyebrow: "Diagnosis",
        title: "How Are Vaginal Infections Diagnosed?",
        color: "#0ea5e9",
        paragraph:
          "Finding the cause of a vaginal infection is important because different infections may need different treatments. Your doctor may ask about your symptoms and medical history and perform an examination or take a vaginal swab when required.",
        items: [
          "Medical History: Your doctor asks about your symptoms and when they started.",
          "Vaginal Examination: Helps check for irritation, discharge, redness, or swelling.",
          "Vaginal Swab: A small sample may be tested to identify the infection.",
          "Vaginal pH Test: May help identify certain causes of vaginal symptoms.",
          "Lab Testing: Additional testing may be recommended when the cause is unclear or symptoms keep returning.",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a Specialist?",
        color: "#dc2626",
        paragraph:
          "If you notice unusual discharge, persistent itching, burning, pain, or repeated vaginal infections, it is better to consult a specialist rather than guessing the cause. Proper diagnosis can help you receive the right treatment.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "Persistent Vaginal Itching",
          "Unusual Discharge",
          "Strong Vaginal Smell",
          "Pain While Urinating",
          "Pain During Sex",
          "Pelvic Discomfort",
          "Repeated Infections",
          "Symptoms Not Improving With Treatment",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title:
          "Why Choose the Best Doctors For Vaginal Infection Treatment In Gurgaon?",
        color: "#6366f1",
        paragraph:
          "When vaginal itching, unusual discharge, burning, or repeated infections are affecting your comfort, choosing the right doctor can make treatment easier. Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician with 17+ years of experience who has guided 10K+ patients across 3 premier institutes. She focuses on understanding your symptoms, finding the possible cause, and explaining treatment options in simple terms, with an approach based on clear diagnosis, safe planning, and supportive follow-through.",
        paragraphs: [
          "Every vaginal infection can have a different cause, so the right treatment depends on your individual condition. Whether the symptoms are related to a bacterial infection, yeast infection, STI, irritation, or another concern, Dr. Kusum Lata Bhardwaj can assess your symptoms and recommend appropriate testing and treatment when needed. Regular follow-up can also help manage infections that keep coming back.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Vaginal Infections",

    faqs: [
      {
        id: "1",
        question: "What is a vaginal infection?",
        answer:
          "A vaginal infection occurs when an infection or imbalance affects the vagina. It can cause discharge, itching, smell, burning, or discomfort.",
      },
      {
        id: "2",
        question: "What are the common symptoms of vaginal infection?",
        answer:
          "Common symptoms include unusual discharge, itching, burning, unpleasant smell, pain while urinating, and discomfort during sex.",
      },
      {
        id: "3",
        question: "What causes vaginal infections?",
        answer:
          "They can be caused by bacteria, yeast, certain sexually transmitted infections, hormonal changes, or irritation from some products.",
      },
      {
        id: "4",
        question: "How are vaginal infections diagnosed?",
        answer:
          "A doctor may check your symptoms, examine the vaginal area, and take a swab or other test when needed.",
      },
      {
        id: "5",
        question: "Can vaginal infections be treated?",
        answer:
          "Yes. Treatment depends on the cause and may include antifungal medicines, antibiotics, or specific treatment for an STI.",
      },
      {
        id: "6",
        question: "Can a vaginal infection go away on its own?",
        answer:
          "Some symptoms may improve, but it is better to identify the cause if symptoms are unusual, persistent, or recurring rather than self-treating.",
      },
      {
        id: "7",
        question: "Can vaginal infections come back?",
        answer:
          "Yes, some infections can return. Repeated infections may need further testing and a different treatment approach.",
      },
      {
        id: "8",
        question: "Can vaginal infections affect pregnancy?",
        answer:
          "Some infections need special attention during pregnancy. If you are pregnant and notice unusual discharge, itching, smell, or pain, speak with your doctor.",
      },
      {
        id: "9",
        question: "When should I see a vaginal infection specialist?",
        answer:
          "See a specialist if you have persistent itching, unusual discharge, strong smell, pain, repeated infections, or symptoms that are not improving.",
      },
      {
        id: "10",
        question: "Where can I get Vaginal Infections Treatment In Gurgaon?",
        answer:
          "A qualified Vaginal Infection Doctor In Gurgaon can evaluate your symptoms, identify the likely cause, and recommend suitable treatment based on your condition.",
      },
    ] satisfies BlogFaq[],

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
    faqs: [
      {
        id: "1",
        question: "Is white discharge normal?",
        answer:
          "A small amount of clear or milky discharge without itching or odour is normal and changes naturally through the cycle.",
      },
      {
        id: "2",
        question: "When is white discharge a concern?",
        answer:
          "When it is thick and curd-like, yellow or green, foul-smelling, blood-stained, or comes with itching, burning, or pelvic pain.",
      },
      {
        id: "3",
        question: "What causes abnormal white discharge?",
        answer:
          "Yeast infection, bacterial vaginosis, sexually transmitted infections, cervical problems, and sometimes hormonal changes.",
      },
      {
        id: "4",
        question: "Does discharge change during the menstrual cycle?",
        answer:
          "Yes. It typically becomes clearer and stretchier around ovulation and thicker afterwards. This variation is normal.",
      },
      {
        id: "5",
        question: "Can stress cause white discharge?",
        answer:
          "Stress does not directly cause discharge, but it can affect hormones and immunity, which may make infections more likely.",
      },
      {
        id: "6",
        question: "Does white discharge cause weakness?",
        answer:
          "Discharge itself does not cause weakness. Persistent tiredness usually has another cause, such as anaemia, and should be checked separately.",
      },
      {
        id: "7",
        question: "How is abnormal discharge diagnosed?",
        answer:
          "Through an examination and, where needed, a swab test, vaginal pH testing, and sometimes a Pap smear or ultrasound.",
      },
      {
        id: "8",
        question: "Can white discharge affect fertility?",
        answer:
          "Ordinary discharge does not. Untreated infections that spread to the uterus or tubes can affect fertility, which is why treatment matters.",
      },
      {
        id: "9",
        question: "Is discharge normal in pregnancy?",
        answer:
          "Increased clear or white discharge is common in pregnancy. Any itching, odour, blood, or watery leaking should be reported promptly.",
      },
      {
        id: "10",
        question: "When should I see a doctor?",
        answer:
          "See a doctor if discharge changes in colour, smell, or amount, or if it comes with itching, pain, fever, or bleeding.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is a urinary tract infection?",
        answer:
          "A UTI is an infection of the urinary system, most often the bladder, usually caused by bacteria entering through the urethra.",
      },
      {
        id: "2",
        question: "What are the symptoms of a UTI?",
        answer:
          "Burning while passing urine, frequent urge to urinate, passing small amounts, lower abdominal discomfort, cloudy or strong-smelling urine, and sometimes blood in the urine.",
      },
      {
        id: "3",
        question: "Why are UTIs more common in women?",
        answer:
          "The female urethra is shorter and closer to the anus, making it easier for bacteria to reach the bladder.",
      },
      {
        id: "4",
        question: "How is a UTI diagnosed?",
        answer:
          "With a urine routine examination and, when needed, a urine culture to identify the bacteria and the right antibiotic.",
      },
      {
        id: "5",
        question: "Can a UTI go away without treatment?",
        answer:
          "Mild cases occasionally settle, but untreated infection can spread to the kidneys, so a UTI should be assessed rather than ignored.",
      },
      {
        id: "6",
        question: "What are the signs of a kidney infection?",
        answer:
          "Fever with chills, back or flank pain, nausea, and vomiting alongside urinary symptoms suggest the infection has spread and need prompt care.",
      },
      {
        id: "7",
        question: "Why do I keep getting UTIs?",
        answer:
          "Recurrence can relate to incomplete bladder emptying, diabetes, menopause-related tissue changes, sexual activity, or an incomplete previous course of treatment.",
      },
      {
        id: "8",
        question: "How can I prevent UTIs?",
        answer:
          "Drink plenty of water, do not hold urine, pass urine after intercourse, wipe front to back, and wear breathable cotton underwear.",
      },
      {
        id: "9",
        question: "Are UTIs dangerous in pregnancy?",
        answer:
          "They need prompt treatment in pregnancy, as untreated infection can cause complications. Urine is routinely checked during antenatal visits.",
      },
      {
        id: "10",
        question: "When should I see a doctor?",
        answer:
          "See a doctor if symptoms last more than a day or two, if there is fever or back pain, if you see blood in the urine, or if you are pregnant.",
      },
    ] satisfies BlogFaq[],


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
    faqs: [
      {
        id: "1",
        question: "What is dyspareunia?",
        answer:
          "Dyspareunia is the medical term for persistent or recurrent pain during or after sexual intercourse.",
      },
      {
        id: "2",
        question: "Is pain during intercourse common?",
        answer:
          "It is common and many women experience it at some point. It is not something you have to accept, as most causes are treatable.",
      },
      {
        id: "3",
        question: "What causes pain during intercourse?",
        answer:
          "Vaginal dryness, infection, endometriosis, fibroids, pelvic inflammatory disease, vaginismus, scarring after childbirth or surgery, and menopausal tissue changes.",
      },
      {
        id: "4",
        question: "What is vaginismus?",
        answer:
          "Vaginismus is involuntary tightening of the pelvic floor muscles that makes penetration painful or impossible. It responds well to treatment.",
      },
      {
        id: "5",
        question: "Can psychological factors cause it?",
        answer:
          "Yes. Anxiety, past trauma, relationship stress, and fear of pain can contribute, often alongside a physical cause.",
      },
      {
        id: "6",
        question: "How is it evaluated?",
        answer:
          "Through a careful history and a gentle examination, with an ultrasound or swab tests when needed to identify the cause.",
      },
      {
        id: "7",
        question: "Can it be treated?",
        answer:
          "Yes. Treatment depends on the cause and may include lubricants, local estrogen, treating infection or endometriosis, pelvic floor therapy, and counselling.",
      },
      {
        id: "8",
        question: "Can pain during intercourse affect fertility?",
        answer:
          "It does not directly cause infertility, but it can make conception harder by making intercourse difficult, and some underlying causes affect fertility.",
      },
      {
        id: "9",
        question: "Is pain after childbirth normal?",
        answer:
          "Some discomfort is common in the early months, especially after stitches or while breastfeeding. Persistent pain should be evaluated.",
      },
      {
        id: "10",
        question: "When should I see a doctor?",
        answer:
          "See a doctor if pain is persistent, worsening, occurs with bleeding, unusual discharge, or pelvic pain, or if it is affecting your relationship.",
      },
    ] satisfies BlogFaq[],


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
      title: "Endometriosis Doctor In Gurgaon",
      date: "May 24, 2026",
      readTime: "9 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "endometriosis-doctor-in-gurgaon",
      slug: "endometriosis-doctor-in-gurgaon",
      category: "laparoscopic-surgery",
      title: "Endometriosis Doctor In Gurgaon",
      intro:
        "Endometriosis is a condition in which tissue that resembles the lining of the uterus develops outside of the uterus. It can cause painful periods, pelvic pain, heavy bleeding, pain during intercourse, and sometimes difficulty getting pregnant.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Having some period pain can be normal, but very painful or ongoing symptoms should not be ignored. If you are facing these problems, an experienced Endometriosis Doctor In Gurgaon can help find the cause and suggest the right treatment based on your condition.",
      ],
    },

    seo: {
      title: "Best Endometriosis Specialist Doctor in Gurgaon | Symptoms & Treatment",
      description:
        "Meet Dr. Kusum Lata Bhardwaj, an endometriosis specialist in Gurgaon with 17+ years of experience. Get guidance on symptoms, diagnosis and treatment options.",
      canonical: "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Is Endometriosis?",
        title: "Understanding Endometriosis",
        color: "#ec4899",
        paragraph:
          "Endometriosis is a condition where tissue similar to the lining of the uterus grows outside the uterus, often around the ovaries, fallopian tubes, or other parts of the pelvic area. It can cause inflammation, pain, and sometimes scar tissue. In some cases, it may also affect the bowel or bladder.",
        paragraphs: ["Common areas affected:"],
        cards: [
          {
            title: "Ovaries",
            description:
              "Can cause pain, inflammation, cysts, and menstrual discomfort.",
          },
          {
            title: "Fallopian Tubes",
            description:
              "Can cause inflammation, blockage, and fertility problems.",
          },
          {
            title: "Pelvic Area",
            description: "May cause pain, pressure, and daily discomfort.",
          },
          {
            title: "Bowel or Bladder",
            description: "Can cause pain while urinating or passing stool.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "20 Symptoms of Endometriosis you should not ignore",
        color: "#ef4444",
        paragraph:
          "Endometriosis does not produce exactly the same symptoms in everyone. Some people experience only a few symptoms, while others may have several. Common symptoms that can be associated with endometriosis include:",
        items: [
          "Severe period pain",
          "Pelvic pain",
          "Lower abdominal pain",
          "Lower back pain",
          "Heavy menstrual bleeding",
          "Pain during or after sexual intercourse",
          "Pain while passing stool",
          "Pain while urinating",
          "Bloating",
          "Abdominal discomfort",
          "Fatigue or extreme tiredness",
          "Nausea",
          "Irregular or difficult periods",
          "Pain that continues beyond menstruation",
          "Difficulty becoming pregnant",
          "Pain that interferes with work or everyday activities",
          "Bowel-related discomfort during periods",
          "Urinary discomfort during periods",
          "Mood changes or emotional distress related to chronic symptoms",
          "Persistent pelvic discomfort between periods",
        ],
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why it Happens",
        title: "Possible Causes of Endometriosis",
        color: "#f97316",
        paragraph:
          "The exact cause of endometriosis is not fully known. Doctors believe that several factors may play a role in causing the condition. It may be linked to:",
        items: [
          "Hormonal Factors: Hormonal changes, especially estrogen, may support the growth of endometriosis tissue.",
          "Family History: Having a close family member with endometriosis may increase your risk.",
          "Backward Menstrual Flow: Menstrual blood may flow backward through the fallopian tubes into the pelvic area.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See an Endometriosis Doctor?",
        color: "#f43f5e",
        paragraph:
          "Period pain can be common, but severe or ongoing pain should not be ignored. If your symptoms are affecting your daily life or getting worse over time, it may be time to consult an Endometriosis Doctor In Gurgaon.",
        paragraphs: ["You should consider seeing a doctor if you have:"],
        items: [
          "Severe Period Pain",
          "Persistent Pelvic Pain",
          "Pain During Sex",
          "Pain During Bowel Movements",
          "Pain While Urinating",
          "Heavy Periods",
          "Difficulty Getting Pregnant",
          "Worsening Symptoms",
        ],
      },

      {
        id: "risk",
        type: "timeline",
        eyebrow: "Stages of Endometriosis",
        title: "How Delayed Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "Endometriosis symptoms can continue or become harder to manage when proper medical care is delayed. The effects are different for everyone and may depend on the extent of the condition.",
        timeline: [
          {
            label: "Stage 1",
            title: "Increasing Pain",
            description:
              "Period and pelvic pain may become more frequent or difficult to manage.",
          },
          {
            label: "Stage 2",
            title: "Ovarian Cysts",
            description:
              "Endometriosis may lead to cysts on the ovaries, which can cause pain and discomfort.",
          },
          {
            label: "Stage 3",
            title: "Fertility Concerns",
            description:
              "Deeper lesions and adhesions may affect the reproductive organs and make pregnancy more difficult.",
          },
          {
            label: "Stage 4",
            title: "Organ Adhesions",
            description:
              "Extensive scar tissue may cause pelvic organs, including the bowel or bladder, to stick together.",
          },
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Endometriosis Treatment In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "Endometriosis treatment depends on your symptoms, age, overall health, and whether you are planning a pregnancy. There is no single treatment that works for everyone. The best Endometriosis Doctor In Gurgaon may recommend medicines, hormonal treatment, pain management, surgery, or fertility support based on your individual condition.",
        cards: [
          {
            title: "Pain Relief",
            description: "Medicines can help manage period and pelvic pain.",
          },
          {
            title: "Hormonal Therapy",
            description: "Helps control hormone-related symptoms.",
          },
          {
            title: "Laparoscopic Surgery",
            description: "May remove endometriosis tissue and adhesions.",
          },
          {
            title: "Ovarian Cyst Treatment",
            description:
              "Cysts related to endometriosis may require treatment.",
          },
          {
            title: "Fertility Support",
            description:
              "Treatment can be planned if you are having difficulty conceiving.",
          },
          {
            title: "Regular Follow-Up",
            description:
              "Check-ups help monitor symptoms and treatment progress.",
          },
        ],
      },

      {
        id: "laparoscopy",
        type: "checkList",
        eyebrow: "Laparoscopic Surgery",
        title: "Laparoscopic Surgery for Endometriosis",
        color: "#0ea5e9",
        paragraph:
          "Laparoscopic surgery may be considered for severe symptoms, when medicines do not provide enough relief, or when endometriosis affects fertility. It uses small incisions to examine and treat affected areas.",
        items: [
          "Pain Relief",
          "Lesion Removal",
          "Adhesion Treatment",
          "Ovarian Cyst Treatment",
          "Fertility Support",
          "Reduced Pelvic Pain",
          "Improved Daily Comfort",
          "Better Quality of Life",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a Specialist?",
        color: "#dc2626",
        paragraph:
          "If your period pain is getting worse or affecting your daily life, it's time to see a specialist. Early diagnosis and treatment can help manage symptoms and prevent the condition from becoming more severe.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "Severe Period Pain",
          "Pelvic Pain Between Periods",
          "Heavy or Irregular Periods",
          "Pain During Intercourse",
          "Pain While Passing Urine or Stool",
          "Difficulty Getting Pregnant",
          "Symptoms Not Improving with Medicines",
          "Frequent Missed Work or School Due to Pain",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title: "Why Choose the Best Endometriosis Doctor In Gurgaon?",
        color: "#6366f1",
        paragraph:
          "Choosing the right specialist is important when endometriosis symptoms are affecting your daily life, periods, or fertility. The Best Endometriosis Doctor In Gurgaon can carefully understand your symptoms, medical history, and concerns before suggesting the right tests and treatment. A specialist can also explain your condition in simple terms so you can make informed decisions about your care.",
        paragraphs: [
          "Every patient experiences endometriosis differently, so treatment should be planned according to individual needs. An experienced doctor can discuss different options, including medicines, hormonal treatment, laparoscopic surgery, and fertility support when required. Regular follow-ups can also help monitor your symptoms and make changes to the treatment plan when needed.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Endometriosis",

    faqs: [
      {
        id: "1",
        question: "What is endometriosis?",
        answer:
          "Endometriosis happens when tissue similar to the uterus lining grows outside the uterus. It can cause pain, heavy periods, and fertility problems.",
      },
      {
        id: "2",
        question: "What are the common symptoms of endometriosis?",
        answer:
          "Common symptoms include severe period pain, pelvic pain, heavy bleeding, pain during sex, bloating, and difficulty getting pregnant.",
      },
      {
        id: "3",
        question: "What causes endometriosis?",
        answer:
          "The exact cause is not known. Hormones, family history, genetics, and other factors may play a role.",
      },
      {
        id: "4",
        question: "How is endometriosis diagnosed?",
        answer:
          "Your doctor will review your symptoms and medical history and may recommend an ultrasound, MRI, or other tests.",
      },
      {
        id: "5",
        question: "What are the stages of endometriosis?",
        answer:
          "There are four stages: minimal, mild, moderate, and severe. The stage does not always indicate how much pain you may have.",
      },
      {
        id: "6",
        question: "Can endometriosis be treated without surgery?",
        answer:
          "Yes. Depending on your condition, medicines and hormonal treatment may help control symptoms.",
      },
      {
        id: "7",
        question: "When is surgery needed for endometriosis?",
        answer:
          "Surgery may be considered when symptoms are severe, medicines are not helping enough, or fertility is affected.",
      },
      {
        id: "8",
        question: "Can endometriosis affect fertility?",
        answer:
          "Yes, endometriosis can sometimes make it harder to get pregnant. Your doctor can suggest treatment based on your fertility plans.",
      },
      {
        id: "9",
        question: "Can endometriosis come back after treatment?",
        answer:
          "Yes, symptoms may return in some patients. Regular follow-ups can help keep the condition under control.",
      },
      {
        id: "10",
        question: "When should I see an Endometriosis Doctor In Gurgaon?",
        answer:
          "See a specialist if you have severe period pain, ongoing pelvic pain, heavy periods, pain during sex, or difficulty getting pregnant.",
      },
    ] satisfies BlogFaq[],

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
      title: "Best Uterine Fibroids Doctor In Gurgaon",
      date: "Aug 27, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "uterine-fibroids-doctor-in-gurgaon",
      slug: "uterine-fibroids-doctor-in-gurgaon",
      category: "laparoscopic-surgery",
      title: "Best Uterine Fibroids Doctor In Gurgaon",
      intro:
        "Uterine fibroids are non-cancerous growths that develop in or around the uterus. They can cause heavy periods, pelvic pain, pressure, frequent urination, and sometimes difficulty getting pregnant.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "Some women may have fibroids without any symptoms, while others may experience problems that affect their daily life. Consulting an experienced top Uterine Fibroids Doctor In Gurgaon can help identify the size, number, and location of fibroids and guide you toward suitable treatment.",
      ],
    },

    seo: {
      title: "Best Uterine Fibroids Doctor in Gurgaon | Dr. Kusum Lata",
      description:
        "Having heavy periods, pelvic pain or pressure? Meet Dr. Kusum Lata Bhardwaj in Gurgaon with 17+ years of experience for fibroid diagnosis and suitable treatment options.",
      canonical: "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Are Uterine Fibroids?",
        title: "Understanding Uterine Fibroids",
        color: "#ec4899",
        paragraph:
          "Uterine fibroids are growths that develop from the muscle tissue of the uterus. They can be small or large, and a woman may have one fibroid or several. Fibroids are usually non-cancerous, and their symptoms can vary depending on their size and location.",
        paragraphs: ["Common areas where fibroids develop:"],
        cards: [
          {
            title: "Uterine Wall",
            description:
              "Fibroids can grow within the muscular wall of the uterus.",
          },
          {
            title: "Inner Uterine Cavity",
            description:
              "Some fibroids grow toward the inside of the uterus and may affect menstrual bleeding.",
          },
          {
            title: "Outer Surface",
            description:
              "Fibroids may grow on the outer side of the uterus and cause pressure or discomfort.",
          },
          {
            title: "Attached by a Stalk",
            description:
              "Some fibroids grow on a thin, stalk-like structure and are called pedunculated fibroids.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "Common Symptoms of Uterine Fibroids You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "Not everyone with fibroids experiences symptoms. When symptoms do occur, they can depend on the size, number, and location of the fibroids.",
        items: [
          "Heavy menstrual bleeding",
          "Painful periods",
          "Longer periods",
          "Pelvic pain",
          "Pelvic pressure",
          "Lower abdominal discomfort",
          "Lower back pain",
          "Frequent urination",
          "Difficulty emptying the bladder",
          "Constipation",
          "Pain during intercourse",
          "Abdominal swelling",
          "Tiredness due to heavy blood loss",
          "Anemia",
          "Bleeding between periods",
          "Abdominal cramps",
          "Difficulty getting pregnant",
          "Pregnancy-related complications in some cases",
          "Feeling pressure in the lower abdomen",
          "Sudden pelvic pain in some cases",
        ],
      },

      {
        id: "types",
        type: "cards",
        eyebrow: "Types of Fibroids",
        title: "Types of Uterine Fibroids",
        color: "#8b5cf6",
        paragraph:
          "The types of uterine fibroids are mainly classified according to where they grow in or around the uterus. Their location can affect the symptoms they cause and the treatment that may be recommended.",
        cards: [
          {
            title: "Intramural Fibroids",
            description: "Grow within the muscular wall of the uterus.",
          },
          {
            title: "Submucosal Fibroids",
            description:
              "Grow toward the inner cavity of the uterus and may cause heavy bleeding.",
          },
          {
            title: "Subserosal Fibroids",
            description:
              "Grow on the outer surface of the uterus and may cause pressure.",
          },
          {
            title: "Pedunculated Fibroids",
            description: "Grow on a thin stalk attached to the uterus.",
          },
        ],
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why it Happens",
        title: "Why Do Uterine Fibroids Happen?",
        color: "#f97316",
        paragraph:
          "The exact reason why fibroids develop is not fully understood. Hormones such as estrogen and progesterone appear to play a role in their growth, while family history may also increase the likelihood of developing fibroids.",
        items: [
          "Hormonal Factors: Estrogen and progesterone may support fibroid growth.",
          "Family History: Fibroids may be more likely if they run in your family.",
          "Genetic Factors: Changes in certain cells of the uterus may contribute to fibroid development.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See a Uterine Fibroids Doctor?",
        color: "#f43f5e",
        paragraph:
          "Heavy periods or pelvic discomfort should not always be ignored, especially when they affect your daily routine. If symptoms continue or become more severe, a specialist can check whether fibroids or another condition may be responsible.",
        paragraphs: ["You should consider seeing a doctor if you have:"],
        items: [
          "Very Heavy Periods",
          "Long or Frequent Periods",
          "Persistent Pelvic Pain",
          "Pelvic Pressure",
          "Frequent Urination",
          "Constipation",
          "Pain During Intercourse",
          "Difficulty Getting Pregnant",
        ],
      },

      {
        id: "impact",
        type: "timeline",
        eyebrow: "Health Effects",
        title: "How Uterine Fibroids Can Affect Your Health",
        color: "#10b981",
        paragraph:
          "Fibroids do not always cause problems, but larger or strategically located fibroids can lead to symptoms that affect daily life. Heavy bleeding may also cause anemia, while some fibroids may be associated with fertility or pregnancy concerns.",
        timeline: [
          {
            label: "Mild Symptoms",
            title: "Heavy Periods",
            description:
              "Some women may notice heavier or longer menstrual bleeding.",
          },
          {
            label: "Increasing Symptoms",
            title: "Pelvic Pressure",
            description:
              "Larger fibroids may create pressure or discomfort in the lower abdomen.",
          },
          {
            label: "Advanced Symptoms",
            title: "Bladder or Bowel Problems",
            description:
              "Fibroids pressing on nearby organs may cause frequent urination or constipation.",
          },
          {
            label: "Fertility Concerns",
            title: "Difficulty Getting Pregnant",
            description:
              "Certain fibroids, depending on their location, may affect fertility or pregnancy and may need evaluation.",
          },
        ],
      },

      {
        id: "diagnosis",
        type: "checkList",
        eyebrow: "Diagnosis",
        title: "How Are Uterine Fibroids Diagnosed?",
        color: "#0ea5e9",
        paragraph:
          "Diagnosing fibroids usually starts with understanding your symptoms and medical history. Your doctor may perform a pelvic examination and recommend imaging tests to check the number, size, and location of the fibroids.",
        items: [
          "Pelvic Examination: Helps check the size and shape of the uterus.",
          "Ultrasound: Helps identify and measure fibroids.",
          "MRI Scan: Can provide a more detailed view of the size and location of fibroids.",
          "Hysteroscopy: Allows the doctor to look inside the uterus when needed.",
          "Blood Tests: May be used to check for anemia caused by heavy bleeding.",
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Uterine Fibroid Treatment In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "Treatment for uterine fibroids depends on factors such as your symptoms, fibroid size and location, age, overall health, and pregnancy plans. Some fibroids may only need monitoring, while others may require medicines, minimally invasive procedures, or surgery.",
        cards: [
          {
            title: "Watchful Waiting",
            description:
              "Small or symptom-free fibroids may only need regular monitoring.",
          },
          {
            title: "Medication",
            description: "Medicines may help manage heavy bleeding and pain.",
          },
          {
            title: "Hormonal Treatment",
            description:
              "Certain medicines can help control fibroid-related symptoms.",
          },
          {
            title: "Uterine Artery Embolization",
            description:
              "A minimally invasive procedure that reduces blood flow to fibroids so they shrink.",
          },
          {
            title: "Radiofrequency Ablation",
            description:
              "Uses heat energy to treat fibroid tissue and reduce its size.",
          },
          {
            title: "Surgical Treatment",
            description:
              "Procedures such as myomectomy may be considered when fibroids cause significant problems.",
          },
        ],
      },

      {
        id: "surgery",
        type: "checkList",
        eyebrow: "Surgical Treatment",
        title: "Fibroid Removal Surgery",
        color: "#3b82f6",
        paragraph:
          "Fibroid removal surgery may be considered when fibroids cause significant symptoms, affect fertility, or do not respond adequately to other treatments. The type of procedure depends mainly on the size and location of the fibroids and your treatment goals.",
        paragraphs: ["Possible treatment approaches include:"],
        items: [
          "Myomectomy",
          "Laparoscopic Myomectomy",
          "Hysteroscopic Myomectomy",
          "Abdominal Myomectomy",
          "Uterine Artery Embolization",
          "Radiofrequency Ablation",
          "Hysterectomy",
          "Minimally Invasive Treatment",
        ],
      },

      {
        id: "myomectomy",
        type: "checkList",
        eyebrow: "Myomectomy",
        title: "Benefits of Myomectomy for Suitable Patients",
        color: "#22c55e",
        paragraph:
          "Myomectomy removes fibroids while keeping the uterus in place. It may be an option for women who want treatment while preserving their uterus, although the suitability of the procedure depends on the individual case.",
        items: [
          "Fibroid Removal",
          "Reduced Heavy Bleeding",
          "Pain Relief",
          "Reduced Pelvic Pressure",
          "Uterus Preservation",
          "Fertility Consideration",
          "Improved Daily Comfort",
          "Better Quality of Life",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet a Specialist?",
        color: "#dc2626",
        paragraph:
          "If heavy periods, pelvic pain, or pressure are affecting your everyday life, it is worth getting checked. Early evaluation can help identify the cause of your symptoms and determine whether fibroid treatment is needed.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "Very Heavy Periods",
          "Persistent Pelvic Pain",
          "Long Menstrual Periods",
          "Pelvic Pressure",
          "Frequent Urination",
          "Constipation",
          "Pain During Intercourse",
          "Difficulty Getting Pregnant",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title:
          "Why Choose the Best Doctors For Uterine Fibroids Treatment In Gurgaon?",
        color: "#6366f1",
        paragraph:
          "Choosing the right specialist is important when fibroids are causing heavy bleeding, pain, pelvic pressure, or fertility concerns. The Best Doctors For Uterine Fibroids Treatment In Gurgaon can assess your symptoms, review your scan reports, and explain suitable treatment options based on the size, number, and location of your fibroids.",
        paragraphs: [
          "Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician focused on clear diagnosis, safe treatment planning, and supportive follow-through for every patient. With 17+ years of experience, guidance provided to 10k+ patients, and experience across 3 premier institutes, she focuses on personalised care based on each patient's needs and treatment goals. Options may include monitoring, medicines, minimally invasive procedures, or fibroid removal surgery when appropriate.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Uterine Fibroids",

    faqs: [
      {
        id: "1",
        question: "What Causes Uterine Fibroids?",
        answer:
          "The exact cause is not fully known. Hormonal changes, genetics, and family history may play a role in the development of fibroids.",
      },
      {
        id: "2",
        question: "How to Treat Uterine Fibroids?",
        answer:
          "Treatment depends on the size, location, symptoms, and pregnancy plans. Options may include medicines, monitoring, minimally invasive procedures, or surgery.",
      },
      {
        id: "3",
        question: "What Is an Intramural Uterine Fibroid?",
        answer:
          "An intramural fibroid grows within the muscular wall of the uterus. It may cause heavy periods, pelvic pressure, or pain depending on its size.",
      },
      {
        id: "4",
        question: "Can Uterine Fibroids Cause Back Pain?",
        answer:
          "Yes, larger fibroids may put pressure on nearby areas and can sometimes cause lower back pain or discomfort.",
      },
      {
        id: "5",
        question: "Can Uterine Fibroids Go Away on Their Own?",
        answer:
          "Fibroids do not usually disappear completely on their own. However, some may shrink naturally, especially when hormone levels change.",
      },
      {
        id: "6",
        question: "Can Uterine Fibroids Shrink on Their Own?",
        answer:
          "Yes, some fibroids may shrink over time. This can happen when hormone levels decrease, such as around or after menopause.",
      },
      {
        id: "7",
        question: "Can Uterine Fibroids Cause Irregular Periods?",
        answer:
          "Yes, fibroids can sometimes cause changes in your menstrual cycle, including heavier, longer, or irregular bleeding.",
      },
      {
        id: "8",
        question: "How to Know If You Have Uterine Fibroids?",
        answer:
          "Common signs include heavy periods, pelvic pressure, abdominal pain, frequent urination, or back pain. An ultrasound or other tests can help confirm whether fibroids are present.",
      },
      {
        id: "9",
        question: "How Are Uterine Fibroids Formed?",
        answer:
          "Fibroids develop from muscle cells in the uterus that grow abnormally. Hormones and genetic factors may influence their growth.",
      },
      {
        id: "10",
        question: "Can I Get Pregnant If I Have Uterine Fibroids?",
        answer:
          "Yes, many women with fibroids can become pregnant. However, some fibroids, depending on their size and location, may affect fertility or pregnancy.",
      },
    ] satisfies BlogFaq[],

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
      title: "Best Doctor for Ovarian Cyst Treatment In Gurgaon",
      date: "Aug 27, 2026",
      readTime: "8 min read",
      status: "Doctor Reviewed",
    },

    article: {
      id: "ovarian-cyst-doctor-in-gurgaon",
      slug: "ovarian-cyst-doctor-in-gurgaon",
      category: "laparoscopic-surgery",
      title: "Best Doctor for Ovarian Cyst Treatment In Gurgaon",
      intro:
        "An ovarian cyst is a fluid-filled sac that develops on or inside an ovary. Many ovarian cysts are harmless and go away on their own, but some can cause pelvic pain, bloating, heavy periods, or discomfort.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",

      paragraphs: [
        "If you are experiencing ongoing pelvic pain, changes in your periods, or have been diagnosed with an ovarian cyst, consulting a Best Doctor for Ovarian Cyst Treatment In Gurgaon can help you understand the type of cyst and the right treatment for your condition.",
      ],
    },

    seo: {
      title: "Best Ovarian Cyst Doctor in Gurgaon | Dr. Kusum Lata",
      description:
        "Meet Dr. Kusum Lata Bhardwaj, an ovarian cyst specialist in Gurgaon with 17+ years of experience. Get help for pelvic pain, ovarian cysts and suitable treatment options.",
      canonical: "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon",
      robots: "index, follow",
    },

    sections: [
      {
        id: "about",
        type: "cards",
        eyebrow: "What Is an Ovarian Cyst?",
        title: "Understanding Ovarian Cysts",
        color: "#ec4899",
        paragraph:
          "An ovarian cyst is a sac filled with fluid or other tissue that forms on an ovary. Ovarian cysts are common, and many do not cause any symptoms. Some cysts may disappear without treatment, while larger, persistent, or painful cysts may need closer monitoring or treatment.",
        paragraphs: ["Common areas and effects:"],
        cards: [
          {
            title: "Ovaries",
            description: "Cysts develop on one or sometimes both ovaries.",
          },
          {
            title: "Pelvic Area",
            description:
              "Larger cysts may cause pressure, heaviness, or pelvic pain.",
          },
          {
            title: "Abdomen",
            description: "Some cysts can cause bloating or a swollen feeling.",
          },
          {
            title: "Reproductive System",
            description:
              "Certain cysts or underlying conditions may affect fertility.",
          },
        ],
      },

      {
        id: "symptoms",
        type: "warning",
        eyebrow: "Symptoms",
        title: "20 Symptoms of Ovarian Cyst You Should Not Ignore",
        color: "#ef4444",
        paragraph:
          "Many ovarian cysts do not cause noticeable symptoms. However, symptoms can occur when a cyst becomes large, ruptures, or causes the ovary to twist.",
        paragraphs: ["Common symptoms may include:"],
        items: [
          "Pelvic pain",
          "Lower abdominal pain",
          "Sudden or sharp abdominal pain",
          "Bloating",
          "Abdominal fullness",
          "Heavy periods",
          "Irregular periods",
          "Lighter-than-usual periods",
          "Pain during intercourse",
          "Frequent need to urinate",
          "Difficulty emptying the bowel",
          "Feeling full quickly",
          "Pressure in the lower abdomen",
          "Pain on one side of the pelvis",
          "Abdominal swelling",
          "Pain that comes and goes",
          "Nausea",
          "Vomiting with severe pain",
          "Difficulty getting pregnant",
          "Sudden severe pelvic pain",
        ],
        note: "Sudden severe pain, especially when accompanied by nausea or vomiting, needs urgent medical attention because it can occur with complications such as ovarian torsion or a ruptured cyst.",
      },

      {
        id: "causes",
        type: "checkList",
        eyebrow: "Why Do Ovarian Cysts Happen?",
        title: "Possible Causes of Ovarian Cysts",
        color: "#f97316",
        paragraph:
          "Ovarian cysts can develop for different reasons. Many are related to the normal menstrual cycle, while others may develop because of conditions such as endometriosis or abnormal cell growth.",
        items: [
          "Menstrual Cycle: Some cysts form when a follicle does not release an egg or does not shrink normally.",
          "Hormonal Changes: Changes in hormones can sometimes contribute to the development of functional cysts.",
          "Endometriosis: Endometriosis can cause blood-filled cysts called endometriomas to develop on the ovaries.",
        ],
      },

      {
        id: "when-to-see",
        type: "warning",
        eyebrow: "When To See A Doctor",
        title: "When Should You See an Ovarian Cyst Doctor?",
        color: "#f43f5e",
        paragraph:
          "Many ovarian cysts do not need immediate treatment. However, you should see a specialist if you have ongoing symptoms, a cyst that is getting larger, or concerns about your fertility.",
        paragraphs: ["You should consider seeing a doctor if you have:"],
        items: [
          "Persistent Pelvic Pain",
          "Sudden Severe Pain",
          "Heavy or Irregular Periods",
          "Pain During Sex",
          "Frequent Urination",
          "Bloating or Abdominal Swelling",
          "Difficulty Getting Pregnant",
          "Nausea or Vomiting With Pain",
        ],
      },

      {
        id: "impact",
        type: "timeline",
        eyebrow: "Health Effects",
        title: "How Delayed Treatment Can Affect Health",
        color: "#10b981",
        paragraph:
          "Not every ovarian cyst needs treatment, and many disappear naturally. However, a cyst that remains, grows, causes symptoms, or develops complications may require medical attention.",
        timeline: [
          {
            label: "Stage 1",
            title: "Mild or No Symptoms",
            description:
              "Small cysts may cause little or no noticeable discomfort.",
          },
          {
            label: "Stage 2",
            title: "Increasing Discomfort",
            description:
              "A larger or persistent cyst may cause pelvic pressure, pain, bloating, or period changes.",
          },
          {
            label: "Stage 3",
            title: "Cyst Complications",
            description:
              "Some cysts may rupture or cause the ovary to twist, leading to sudden and severe pain.",
          },
          {
            label: "Stage 4",
            title: "Complex or Persistent Cyst",
            description:
              "Large, persistent, or concerning cysts may need detailed evaluation and, in some cases, surgery.",
          },
        ],
      },

      {
        id: "types",
        type: "cards",
        eyebrow: "Types of Cysts",
        title: "Types of Ovarian Cysts",
        color: "#8b5cf6",
        paragraph:
          "Ovarian cysts can be different in type and appearance. The most common functional cysts are usually linked to the menstrual cycle and often disappear on their own. Other types include endometriomas, cystadenomas, and teratomas.",
        cards: [
          {
            title: "Functional Cysts",
            description:
              "These cysts are linked to the menstrual cycle and often disappear without treatment.",
          },
          {
            title: "Endometrioma",
            description:
              "These cysts can develop when endometriosis affects the ovary.",
          },
          {
            title: "Cystadenoma",
            description:
              "These usually develop on the outer surface of the ovary and may grow larger.",
          },
          {
            title: "Teratoma",
            description:
              "These are usually benign growths that can contain different types of body tissue.",
          },
        ],
      },

      {
        id: "diagnosis",
        type: "checkList",
        eyebrow: "Diagnosis",
        title: "How Are Ovarian Cysts Diagnosed?",
        color: "#0ea5e9",
        paragraph:
          "Finding an ovarian cyst usually starts with understanding your symptoms and medical history. Your doctor may recommend imaging or other tests to check the cyst's size, appearance, and location.",
        items: [
          "Medical History: Your doctor asks about your symptoms, periods, and health history.",
          "Pelvic Examination: May help identify tenderness or other concerns.",
          "Ultrasound: Helps check the cyst's size, location, and appearance.",
          "Blood Tests: May be recommended in some cases when further evaluation is needed.",
          "Follow-Up Scan: A repeat ultrasound may be suggested to see whether the cyst changes or disappears.",
        ],
      },

      {
        id: "treatment",
        type: "cards",
        eyebrow: "ADVANCED TREATMENT",
        title: "Ovarian Cyst Treatment In Gurgaon",
        color: "#14b8a6",
        paragraph:
          "Ovarian Cyst Treatment is planned according to your individual condition. Your doctor may recommend monitoring, medicines for symptoms, or surgery when a cyst is large, persistent, painful, or has concerning features.",
        cards: [
          {
            title: "Watchful Waiting",
            description:
              "Some cysts disappear naturally and only need monitoring.",
          },
          {
            title: "Pain Management",
            description:
              "Medicines may help manage discomfort when appropriate.",
          },
          {
            title: "Regular Ultrasound",
            description: "Follow-up scans can monitor changes in the cyst.",
          },
          {
            title: "Hormonal Treatment",
            description:
              "May be considered in selected situations to manage certain types of cysts.",
          },
          {
            title: "Laparoscopic Surgery",
            description: "Keyhole surgery may be used to remove suitable cysts.",
          },
          {
            title: "Fertility-Focused Care",
            description:
              "Treatment can be planned with fertility preservation in mind.",
          },
        ],
      },

      {
        id: "surgery",
        type: "cards",
        eyebrow: "Surgical Treatment",
        title: "Ovarian Cyst Surgery In Gurgaon",
        color: "#3b82f6",
        paragraph:
          "Ovarian cyst surgery may be recommended when a cyst is large, persistent, causing significant symptoms, or has features that need further evaluation. The type of surgery depends on the cyst and your individual circumstances.",
      },

      {
        id: "laparoscopy",
        type: "checkList",
        eyebrow: "Laparoscopic Surgery",
        title: "Laparoscopic Surgery for Ovarian Cysts",
        color: "#22c55e",
        paragraph:
          "Laparoscopic surgery is a minimally invasive procedure performed through small cuts in the abdomen. When suitable, the surgeon can remove the cyst while aiming to preserve healthy ovarian tissue.",
        paragraphs: ["Possible benefits include:"],
        items: [
          "Small Incisions",
          "Cyst Removal",
          "Less Surgical Discomfort",
          "Shorter Recovery",
          "Ovary Preservation",
          "Fertility Consideration",
          "Reduced Scarring",
          "Better Daily Comfort",
        ],
      },

      {
        id: "consult",
        type: "warning",
        eyebrow: "WHEN TO CONSULT",
        title: "When Should You Meet an Ovarian Cyst Specialist?",
        color: "#dc2626",
        paragraph:
          "If you have been diagnosed with an ovarian cyst or are experiencing ongoing pelvic symptoms, meeting a specialist can help you understand whether the cyst needs monitoring or treatment. Early evaluation can also help identify complications that may require prompt care.",
        paragraphs: ["See a specialist if you have:"],
        items: [
          "Persistent Pelvic Pain",
          "Sudden Severe Abdominal Pain",
          "Heavy or Irregular Periods",
          "Pain During Intercourse",
          "Bloating or Abdominal Swelling",
          "Frequent Urination",
          "Difficulty Getting Pregnant",
          "A Cyst That Is Growing or Not Going Away",
        ],
      },

      {
        id: "why-choose",
        type: "cards",
        eyebrow: "Why Choose Us",
        title: "Why Choose the Best Doctor for Ovarian Cyst Treatment In Gurgaon?",
        color: "#6366f1",
        paragraph:
          "Choosing the right doctor can make dealing with an ovarian cyst much easier. If you have pain, a cyst that is getting bigger, or one that is not going away, a specialist can check your symptoms and scan reports and explain what treatment may be needed. Sometimes, regular check-ups are enough, while some patients may need medicines or Ovarian Cyst Surgery In Gurgaon.",
        paragraphs: [
          "Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician with 17+ years of experience and 10k+ patients guided across 3 premier institutes. Her approach focuses on clear diagnosis, safe treatment planning, and supportive follow-up, helping patients understand their condition and feel more confident about their care.",
        ],
      },
    ] satisfies BlogSection[],

    faqTitle: "Frequently Asked Questions About Ovarian Cysts",

    faqs: [
      {
        id: "1",
        question: "What Is an Ovarian Cyst?",
        answer:
          "An ovarian cyst is a fluid-filled sac that develops on or inside an ovary. Many ovarian cysts are harmless and may go away on their own.",
      },
      {
        id: "2",
        question: "What Size of Ovarian Cyst Is Dangerous?",
        answer:
          "There is no single size that is considered dangerous. Doctors also look at the cyst's type, appearance, symptoms, and whether it is growing or persistent.",
      },
      {
        id: "3",
        question: "What Causes Ovarian Cysts in Young Females?",
        answer:
          "In young women, many cysts are linked to the normal menstrual cycle. Hormonal changes can sometimes cause a follicle to grow into a cyst.",
      },
      {
        id: "4",
        question: "Why Do Ovarian Cysts Occur?",
        answer:
          "Ovarian cysts can develop due to normal changes during the menstrual cycle. Some may also be linked to conditions such as endometriosis or other ovarian changes.",
      },
      {
        id: "5",
        question: "Can I Get Pregnant With an Ovarian Cyst?",
        answer:
          "Yes, many women can get pregnant with an ovarian cyst. However, fertility can depend on the type of cyst and any underlying condition.",
      },
      {
        id: "6",
        question: "Can an Ovarian Cyst Affect Pregnancy?",
        answer:
          "Some cysts may need monitoring during pregnancy, while others may not cause any problems. Your doctor can advise you based on the cyst's type and size.",
      },
      {
        id: "7",
        question: "Can Ovarian Cysts Cause Cancer?",
        answer:
          "Most ovarian cysts are not cancerous. However, some cysts may have features that need further testing, especially after menopause.",
      },
      {
        id: "8",
        question: "How Are Ovarian Cysts Diagnosed?",
        answer:
          "Your doctor may ask about your symptoms and perform an examination. An ultrasound is commonly used to check the cyst's size and appearance.",
      },
      {
        id: "9",
        question: "Do All Ovarian Cysts Need Surgery?",
        answer:
          "No. Many cysts go away on their own and only need monitoring. Surgery may be considered if a cyst is large, persistent, painful, or has concerning features.",
      },
      {
        id: "10",
        question: "Who is the Best Doctor for Ovarian Cyst Treatment In Gurgaon?",
        answer:
          "Choose a qualified gynaecology specialist who can assess your cyst, explain your treatment choices, and consider your health and fertility goals when planning care.",
      },
    ] satisfies BlogFaq[],

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
  
    ] satisfies BlogSection[],
    faqs: [
      {
        id: "1",
        question: "Is the procedure safe?",
        answer:
          "Yes, laparoscopic cerclage is a safe minimally invasive procedure in experienced hands.",
      },
      {
        id: "2",
        question: "What is cervical cerclage?",
        answer:
          "It is a stitch placed around the cervix to keep it closed and support the pregnancy when the cervix is weak.",
      },
      {
        id: "3",
        question: "What is a weak or incompetent cervix?",
        answer:
          "It is a cervix that opens too early in pregnancy without labour pains, which can lead to late miscarriage or premature birth.",
      },
      {
        id: "4",
        question: "Who may need a cerclage?",
        answer:
          "Women with a history of late miscarriage, previous premature birth, a short cervix on scan, or previous cervical surgery.",
      },
      {
        id: "5",
        question: "Can I conceive naturally after cerclage?",
        answer:
          "Yes, natural conception is possible after cerclage placement.",
      },
      {
        id: "6",
        question: "What is the difference between vaginal and laparoscopic cerclage?",
        answer:
          "A vaginal cerclage is placed through the vagina, while a laparoscopic cerclage is placed higher, through keyhole abdominal surgery, often when a vaginal stitch has failed.",
      },
      {
        id: "7",
        question: "When is cerclage usually done?",
        answer:
          "A vaginal stitch is commonly placed in the second trimester, while a laparoscopic cerclage may be placed before pregnancy or in early pregnancy.",
      },
      {
        id: "8",
        question: "Will I need cesarean delivery?",
        answer:
          "Yes, delivery is usually performed by C-section because the stitch stays in place.",
      },
      {
        id: "9",
        question: "Does cerclage improve pregnancy outcome?",
        answer:
          "Yes, it significantly improves chances of carrying pregnancy to term.",
      },
      {
        id: "10",
        question: "What precautions are needed after cerclage?",
        answer:
          "Your doctor will advise on rest, activity, and intercourse, and will monitor you with regular scans and check-ups.",
      },
      {
        id: "11",
        question: "What symptoms should I report after cerclage?",
        answer:
          "Report bleeding, fluid leaking, regular cramps or contractions, fever, or unusual discharge without delay.",
      },
      {
        id: "12",
        question: "Can the stitch be used again in future pregnancies?",
        answer:
          "A laparoscopic cerclage often remains in place for future pregnancies. Your doctor will advise based on your situation.",
      },
    ] satisfies BlogFaq[],

  
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
  
    ] satisfies BlogSection[],
    faqs: [
      {
        id: "1",
        question: "What is hysteroscopy?",
        answer:
          "It is a procedure in which a thin telescope is passed through the cervix to look inside the uterus, and to treat problems found there.",
      },
      {
        id: "2",
        question: "Is hysteroscopy painful?",
        answer:
          "The procedure is usually performed under short anesthesia or sedation, so discomfort is minimal.",
      },
      {
        id: "3",
        question: "Which conditions can hysteroscopy treat?",
        answer:
          "Polyps, submucosal fibroids, uterine septum, intrauterine adhesions, abnormal bleeding, and a displaced contraceptive device.",
      },
      {
        id: "4",
        question: "How long does hysteroscopy take?",
        answer:
          "Most procedures take around 15–45 minutes depending on the condition.",
      },
      {
        id: "5",
        question: "Is hospital admission required?",
        answer:
          "Most hysteroscopy procedures are day-care surgeries with same-day discharge.",
      },
      {
        id: "6",
        question: "Can hysteroscopy improve pregnancy chances?",
        answer:
          "Yes, correcting uterine abnormalities may improve fertility and IVF success.",
      },
      {
        id: "7",
        question: "What is the difference between diagnostic and operative hysteroscopy?",
        answer:
          "Diagnostic hysteroscopy only inspects the uterine cavity, while operative hysteroscopy also treats the problem in the same sitting.",
      },
      {
        id: "8",
        question: "Are there any cuts or scars?",
        answer:
          "No. Hysteroscopy is performed through the natural passage of the cervix, so there are no abdominal incisions or scars.",
      },
      {
        id: "9",
        question: "What is normal after the procedure?",
        answer:
          "Mild cramping and light spotting for a few days are common. Heavy bleeding, fever, or severe pain should be reported.",
      },
      {
        id: "10",
        question: "When can I resume normal activities?",
        answer:
          "Most women return to routine activities within a day or two, following the advice given at discharge.",
      },
      {
        id: "11",
        question: "When can I try to conceive after hysteroscopy?",
        answer:
          "Many women are advised to wait until after the next period or as guided by their doctor, depending on what was treated.",
      },
      {
        id: "12",
        question: "Is hysteroscopy safe?",
        answer:
          "It is a widely used and generally safe procedure. Complications are uncommon and are discussed with you beforehand.",
      },
    ] satisfies BlogFaq[],

  
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
  
    ] satisfies BlogSection[],
    faqs: [
      {
        id: "1",
        question: "What is fertility-enhancing surgery?",
        answer:
          "It is surgery aimed at correcting conditions that reduce fertility, such as endometriosis, fibroids, adhesions, tubal disease, or uterine abnormalities.",
      },
      {
        id: "2",
        question: "Can surgery improve fertility?",
        answer:
          "Yes, treating endometriosis, fibroids, adhesions, or tubal problems may improve pregnancy chances.",
      },
      {
        id: "3",
        question: "Which conditions may benefit from fertility surgery?",
        answer:
          "Endometriosis, submucosal or large fibroids, pelvic adhesions, tubal blockage, uterine septum, polyps, and some ovarian cysts.",
      },
      {
        id: "4",
        question: "Will surgery affect ovarian reserve?",
        answer:
          "Fertility-preserving surgical techniques are used carefully to protect ovarian function.",
      },
      {
        id: "5",
        question: "Is fertility surgery painful?",
        answer:
          "Most procedures are minimally invasive with less pain and faster recovery.",
      },
      {
        id: "6",
        question: "When can I try for pregnancy after surgery?",
        answer:
          "Timing depends on the procedure and condition treated. Personalized advice is provided after surgery.",
      },
      {
        id: "7",
        question: "Is surgery done before or instead of IVF?",
        answer:
          "It depends. Surgery may improve natural conception, or improve IVF success by correcting the uterine cavity. Your doctor will advise the right sequence.",
      },
      {
        id: "8",
        question: "What is the recovery time?",
        answer:
          "Most laparoscopic and hysteroscopic fertility procedures allow a return to routine activity within one to two weeks.",
      },
      {
        id: "9",
        question: "Does surgery guarantee pregnancy?",
        answer:
          "No treatment can guarantee pregnancy. Surgery improves the conditions for conception, and outcomes depend on age, ovarian reserve, and other factors.",
      },
      {
        id: "10",
        question: "Are the tests done before surgery?",
        answer:
          "Yes. Hormone tests, ultrasound, tubal assessment, and a semen analysis for the partner are usually completed before planning surgery.",
      },
      {
        id: "11",
        question: "Can both partners be evaluated together?",
        answer:
          "Yes, and it is recommended. Fertility assessment is most useful when both partners are evaluated.",
      },
      {
        id: "12",
        question: "When should we consider fertility surgery?",
        answer:
          "Consider it when investigations show a correctable problem, when conception has not occurred despite other treatment, or when symptoms such as severe pelvic pain also need management.",
      },
    ] satisfies BlogFaq[],

  
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
