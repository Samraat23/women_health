import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Baby,
  CalendarCheck,
  HeartPulse,
  Salad,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from "lucide-react";

export type TrimesterName = "First" | "Second" | "Third";

export type PregnancyWeek = {
  week: number;
  trimester: TrimesterName;
  size: string;
  focus: string;
  baby: string;
  mother: string;
  food: string;
  checklist: string[];
};

export type TrimesterGuide = {
  name: TrimesterName;
  weeks: string;
  title: string;
  image: string;
  color: string;
  softColor: string;
  summary: string;
  keyCare: string[];
  tests: string[];
  food: string[];
};

export type VaccineGuide = {
  name: string;
  timing: string;
  note: string;
  icon: LucideIcon;
};

export const trimesterGuides: TrimesterGuide[] = [
  {
    name: "First",
    weeks: "Weeks 1-13",
    title: "Confirm pregnancy, protect early development",
    image:
      "https://images.unsplash.com/photo-1680987218595-2d514938a72c?auto=format&fit=crop&q=80&w=1400",
    color: "#be185d",
    softColor: "#fdf2f8",
    summary:
      "This stage is about confirmation, nausea support, folic acid, early scans, and making daily habits safer for the baby.",
    keyCare: [
      "Confirm pregnancy and calculate due date",
      "Start prenatal vitamins after doctor advice",
      "Review medicines, thyroid, diabetes and BP history",
      "Plan early ultrasound and first trimester screening",
    ],
    tests: [
      "Pregnancy confirmation and baseline blood tests",
      "Dating scan around 6-8 weeks when advised",
      "NT scan and dual marker around 11-13 weeks",
      "Blood group, thyroid, sugar, urine and infection screening",
    ],
    food: [
      "Folic acid rich foods: spinach, lentils, beans, citrus",
      "Small frequent meals for nausea",
      "Protein at each meal: dal, paneer, eggs, curd, fish or chicken",
      "Avoid raw, unpasteurized, undercooked and unsafe foods",
    ],
  },
  {
    name: "Second",
    weeks: "Weeks 14-27",
    title: "Growth, movement and anatomy scan",
    image:
      "https://images.unsplash.com/photo-1617184896380-579b1fa760aa?auto=format&fit=crop&q=80&w=1400",
    color: "#0f766e",
    softColor: "#ecfdf5",
    summary:
      "Many women feel more energetic here. The baby grows quickly, movement begins, and the detailed anomaly scan becomes important.",
    keyCare: [
      "Track weight gain and blood pressure",
      "Plan anomaly scan around 18-22 weeks",
      "Discuss fetal movement and safe exercise",
      "Screen for anemia, sugar and nutritional gaps",
    ],
    tests: [
      "Anomaly scan between 18-22 weeks",
      "Cervical length check if advised",
      "Gestational diabetes screening around 24-28 weeks",
      "Hemoglobin and urine monitoring",
    ],
    food: [
      "Iron plus vitamin C: chana with lemon, greens, sprouts",
      "Calcium: milk, curd, paneer, ragi, sesame",
      "Omega-3 choices: low-mercury fish, walnuts, chia, flax",
      "Hydration and fiber for constipation",
    ],
  },
  {
    name: "Third",
    weeks: "Weeks 28-41",
    title: "Growth checks, vaccines and birth readiness",
    image:
      "https://images.unsplash.com/photo-1637864176899-dceefcefcf00?auto=format&fit=crop&q=80&w=1400",
    color: "#5a4ffe",
    softColor: "#f1efff",
    summary:
      "The final trimester focuses on baby growth, movement awareness, vaccines, birth planning, hospital readiness and warning signs.",
    keyCare: [
      "Monitor baby movements every day",
      "Discuss delivery plan and hospital bag",
      "Take recommended vaccines on schedule",
      "Review swelling, BP, headaches and labor signs",
    ],
    tests: [
      "Growth scan and Doppler if advised",
      "Repeat hemoglobin, urine and BP checks",
      "GBS screening if part of your care protocol",
      "Non-stress test or extra monitoring for high-risk pregnancy",
    ],
    food: [
      "Protein-dense meals to support fetal weight gain",
      "Iron, calcium and vitamin D continuity",
      "Light dinners if heartburn increases",
      "Dates, nuts and fluids only if suitable for your health plan",
    ],
  },
];

export const pregnancyWeeks: PregnancyWeek[] = [
  {
    week: 1,
    trimester: "First",
    size: "Cycle start",
    focus: "Pregnancy dating begins",
    baby:
      "Pregnancy weeks are counted from the first day of your last period, even before conception has happened.",
    mother:
      "This is a good time to record dates, sleep well and prepare your body for a healthy cycle.",
    food: "Start folic acid rich foods like spinach, dal, beans, oranges and fortified grains.",
    checklist: ["Track period date", "Start prenatal vitamin if advised", "Avoid alcohol and smoking"],
  },
  {
    week: 2,
    trimester: "First",
    size: "Ovulation window",
    focus: "Egg release and fertile days",
    baby:
      "Ovulation may happen this week. If sperm meets egg, pregnancy can begin soon after.",
    mother:
      "Some women notice mild cramps or cervical mucus changes around ovulation.",
    food: "Choose balanced meals with protein, whole grains, fruits and plenty of water.",
    checklist: ["Track fertile window", "Continue folic acid", "Review medicines with doctor"],
  },
  {
    week: 3,
    trimester: "First",
    size: "Tiny cell cluster",
    focus: "Fertilization and cell division",
    baby:
      "After fertilization, cells divide quickly while moving toward the uterus.",
    mother:
      "You may not feel different yet, but hormones are beginning to shift.",
    food: "Add protein snacks like curd, paneer, eggs, sprouts or roasted chana.",
    checklist: ["Avoid self-medication", "Limit caffeine", "Keep hydration steady"],
  },
  {
    week: 4,
    trimester: "First",
    size: "Poppy seed",
    focus: "Implantation and missed period",
    baby:
      "The embryo implants in the uterine lining and the early placenta starts forming.",
    mother:
      "A missed period, fatigue, breast tenderness or light spotting may appear.",
    food: "Small meals with ginger tea, crackers, fruit and curd may help early nausea.",
    checklist: ["Take a pregnancy test", "Book confirmation visit", "Avoid raw or unsafe foods"],
  },
  {
    week: 5,
    trimester: "First",
    size: "Sesame seed",
    focus: "Neural tube and heart start",
    baby:
      "The neural tube and early heart structures begin forming. Folic acid is especially important now.",
    mother:
      "Nausea, sleepiness, smell sensitivity and mood changes can start.",
    food: "Focus on folate, iron and fluids: greens, lentils, beetroot, citrus and coconut water.",
    checklist: ["Confirm pregnancy", "Start doctor-approved supplements", "Note severe pain or bleeding"],
  },
  {
    week: 6,
    trimester: "First",
    size: "Lentil",
    focus: "Heartbeat may be seen",
    baby:
      "The tiny heart may begin beating, and early facial and limb buds start taking shape.",
    mother:
      "Morning sickness may increase. Eat before long gaps and rest when tired.",
    food: "Try bland, easy meals: poha, upma, curd rice, bananas, toast and lemon water.",
    checklist: ["Ask about early scan timing", "Eat small frequent meals", "Call doctor for heavy bleeding"],
  },
  {
    week: 7,
    trimester: "First",
    size: "Blueberry",
    focus: "Brain and limb growth",
    baby:
      "The brain grows rapidly, and arm and leg buds become more visible.",
    mother:
      "Frequent urination, tiredness and food aversions are common.",
    food: "Use protein in small portions: dal soup, yogurt, egg, paneer or nut butter.",
    checklist: ["Keep water nearby", "Plan first prenatal labs", "Avoid long fasting"],
  },
  {
    week: 8,
    trimester: "First",
    size: "Kidney bean",
    focus: "Hands, feet and organs develop",
    baby:
      "Tiny fingers and toes begin forming, and important organs continue early development.",
    mother:
      "Nausea, acidity, constipation or bloating may need simple diet changes.",
    food: "Add fiber from fruit, vegetables, oats, dalia and whole wheat.",
    checklist: ["Discuss nausea medicines if needed", "Walk gently if approved", "Avoid unpasteurized foods"],
  },
  {
    week: 9,
    trimester: "First",
    size: "Grape",
    focus: "Baby shape becomes clearer",
    baby:
      "The baby starts looking more human, with developing eyelids, joints and early muscles.",
    mother:
      "Hormones can bring mood shifts, fatigue and breast fullness.",
    food: "Iron support matters: spinach, rajma, chana, dates and vitamin C foods.",
    checklist: ["Do not skip breakfast", "Keep prenatal visit notes", "Report severe vomiting"],
  },
  {
    week: 10,
    trimester: "First",
    size: "Strawberry",
    focus: "Major structures are present",
    baby:
      "Most major body structures are present and continue maturing.",
    mother:
      "You may feel bloated, emotional or extra sleepy. Loose clothing can help comfort.",
    food: "Choose calcium foods daily: milk, curd, paneer, ragi or fortified options.",
    checklist: ["Review scan reports", "Continue supplements", "Avoid alcohol completely"],
  },
  {
    week: 11,
    trimester: "First",
    size: "Fig",
    focus: "Movement begins quietly",
    baby:
      "The baby may start tiny movements, though you cannot feel them yet.",
    mother:
      "Nausea may still be strong, but some women start feeling slightly better.",
    food: "Keep easy snacks ready: fruit, makhana, nuts, roasted chana and curd.",
    checklist: ["Plan NT scan window", "Ask about screening tests", "Stay hydrated"],
  },
  {
    week: 12,
    trimester: "First",
    size: "Lime",
    focus: "First trimester screening",
    baby:
      "Reflexes begin developing, and the baby is growing steadily.",
    mother:
      "The uterus is growing, and early pregnancy symptoms may slowly ease.",
    food: "Add colorful vegetables for folate, vitamin C and antioxidants.",
    checklist: ["Complete NT scan if advised", "Review thyroid and sugar", "Ask about safe exercise"],
  },
  {
    week: 13,
    trimester: "First",
    size: "Peach",
    focus: "First trimester wraps up",
    baby:
      "The baby has fingerprints forming and is moving more inside the uterus.",
    mother:
      "Energy may begin improving. Appetite can return gradually.",
    food: "Build meals with grain, protein, vegetable, curd and fruit.",
    checklist: ["Review first trimester results", "Plan next visit", "Continue balanced routine"],
  },
  {
    week: 14,
    trimester: "Second",
    size: "Lemon",
    focus: "Second trimester begins",
    baby:
      "Facial expressions begin, and the baby starts growing more quickly.",
    mother:
      "Nausea may reduce for many women, and energy often improves.",
    food: "Increase protein gently with dal, paneer, eggs, fish, chicken, tofu or soy.",
    checklist: ["Track weight gain", "Discuss exercise", "Plan anomaly scan timing"],
  },
  {
    week: 15,
    trimester: "Second",
    size: "Apple",
    focus: "Bones and taste buds",
    baby:
      "Bones are strengthening, and taste buds begin developing.",
    mother:
      "You may notice nasal stuffiness, gum sensitivity or a small bump.",
    food: "Support bones with calcium and vitamin D foods after doctor advice.",
    checklist: ["Book dental check if needed", "Eat calcium daily", "Ask about safe sleep posture"],
  },
  {
    week: 16,
    trimester: "Second",
    size: "Avocado",
    focus: "Growth spurt",
    baby:
      "The baby grows quickly, and limb movements become stronger.",
    mother:
      "Some women start feeling fluttering movements, especially in a second pregnancy.",
    food: "Iron plus vitamin C works well: chana with lemon, greens with citrus.",
    checklist: ["Monitor headaches", "Continue walking if approved", "Keep water intake steady"],
  },
  {
    week: 17,
    trimester: "Second",
    size: "Pear",
    focus: "Skeleton changes",
    baby:
      "The skeleton changes from soft cartilage toward bone, and the cord grows stronger.",
    mother:
      "Round ligament pain or stretching discomfort can appear.",
    food: "Use magnesium and fiber foods: nuts, seeds, banana, greens and whole grains.",
    checklist: ["Change position slowly", "Avoid heavy lifting", "Discuss persistent pain"],
  },
  {
    week: 18,
    trimester: "Second",
    size: "Capsicum",
    focus: "Hearing and movement",
    baby:
      "Hearing pathways develop, and the baby may respond to sounds soon.",
    mother:
      "Appetite may rise and backache may begin as posture changes.",
    food: "Choose filling snacks: fruit with curd, sprouts, paneer roll or dal chilla.",
    checklist: ["Schedule anomaly scan", "Support posture", "Add protein snacks"],
  },
  {
    week: 19,
    trimester: "Second",
    size: "Mango",
    focus: "Hair and skin coating",
    baby:
      "Fine hair and protective skin coating start developing.",
    mother:
      "You may feel more stretching, mild aches and increased appetite.",
    food: "Add healthy fats: nuts, seeds, avocado, olive oil or doctor-approved fish.",
    checklist: ["Watch swelling", "Discuss pain relief options", "Avoid long standing"],
  },
  {
    week: 20,
    trimester: "Second",
    size: "Banana",
    focus: "Halfway milestone",
    baby:
      "You are around the halfway mark, and the baby is swallowing fluid and moving often.",
    mother:
      "Movements may become easier to notice. The belly becomes more visible.",
    food: "Keep meals balanced and avoid excess sugar drinks.",
    checklist: ["Complete anomaly scan", "Review placenta position", "Ask about fetal movement"],
  },
  {
    week: 21,
    trimester: "Second",
    size: "Carrot",
    focus: "Kicks become stronger",
    baby:
      "The baby is active, swallowing and practicing small movements.",
    mother:
      "Early kicks may turn into clearer flutters or taps.",
    food: "Hydrate well and add potassium foods like banana, coconut water and lentils.",
    checklist: ["Notice movement pattern", "Plan comfortable footwear", "Continue supplements"],
  },
  {
    week: 22,
    trimester: "Second",
    size: "Papaya slice",
    focus: "Senses develop",
    baby:
      "The baby may hear your heartbeat and external sounds more clearly.",
    mother:
      "Leg cramps, constipation or backache may need stretching and hydration.",
    food: "Use fiber and fluids: salads, dal, vegetables, fruit and soups.",
    checklist: ["Stretch calves gently", "Discuss constipation", "Avoid skipping meals"],
  },
  {
    week: 23,
    trimester: "Second",
    size: "Corn",
    focus: "Movement sense develops",
    baby:
      "The baby develops a stronger sense of movement and balance.",
    mother:
      "Ankle swelling may start by evening, especially after long standing.",
    food: "Keep salt moderate and include protein to support fluid balance.",
    checklist: ["Elevate feet", "Report sudden swelling", "Track BP if advised"],
  },
  {
    week: 24,
    trimester: "Second",
    size: "Pomegranate",
    focus: "Lung practice",
    baby:
      "The lungs keep developing, and the baby practices breathing movements.",
    mother:
      "This is often the time to screen for gestational diabetes.",
    food: "Choose steady carbs: roti, dalia, oats, millets, dal and vegetables.",
    checklist: ["Plan glucose test", "Limit sugary drinks", "Ask about fetal growth"],
  },
  {
    week: 25,
    trimester: "Second",
    size: "Cauliflower",
    focus: "Weight gain and hair",
    baby:
      "The baby adds fat, grows hair and becomes more responsive.",
    mother:
      "Heartburn or rib discomfort can begin as the uterus rises.",
    food: "Try smaller dinners, curd, soft foods and avoid spicy late-night meals.",
    checklist: ["Sleep on side", "Manage heartburn", "Continue iron and calcium timing"],
  },
  {
    week: 26,
    trimester: "Second",
    size: "Lettuce",
    focus: "Eyes begin opening",
    baby:
      "Eyes may begin opening, and the baby responds to light and sound.",
    mother:
      "You may feel stronger kicks and occasional tightening.",
    food: "Add choline and protein from eggs, soy, dal, paneer or fish if suitable.",
    checklist: ["Discuss Braxton Hicks", "Keep scan follow-up", "Hydrate regularly"],
  },
  {
    week: 27,
    trimester: "Second",
    size: "Cabbage",
    focus: "Second trimester finishes",
    baby:
      "The brain and lungs continue maturing as the second trimester ends.",
    mother:
      "Sleep may become harder, and back support may feel useful.",
    food: "Protein, iron, calcium and fiber stay important every day.",
    checklist: ["Review diabetes test", "Plan third trimester visits", "Discuss vaccine timing"],
  },
  {
    week: 28,
    trimester: "Third",
    size: "Eggplant",
    focus: "Third trimester begins",
    baby:
      "The baby grows rapidly, and eyes may open and close.",
    mother:
      "You may feel heavier, and regular movement awareness becomes important.",
    food: "Prioritize protein and iron: dal, beans, greens, eggs, chicken or fish.",
    checklist: ["Start daily movement awareness", "Review Rh status", "Discuss Tdap vaccine"],
  },
  {
    week: 29,
    trimester: "Third",
    size: "Butternut squash",
    focus: "Muscle and lung maturity",
    baby:
      "Muscles and lungs mature, and the head grows to support brain development.",
    mother:
      "Fatigue, acidity and leg cramps may increase.",
    food: "Use light protein dinners and calcium-rich evening snacks.",
    checklist: ["Rest between tasks", "Check BP at visits", "Ask about growth monitoring"],
  },
  {
    week: 30,
    trimester: "Third",
    size: "Coconut",
    focus: "Brain growth",
    baby:
      "The baby gains weight and brain folds become more complex.",
    mother:
      "You may feel breathless on exertion and need slower movement.",
    food: "Add omega-3 choices and nuts if suitable for your diet.",
    checklist: ["Practice side sleeping", "Avoid overexertion", "Report reduced movements"],
  },
  {
    week: 31,
    trimester: "Third",
    size: "Pineapple",
    focus: "Strong kicks",
    baby:
      "Kicks may feel stronger as the baby has less empty space.",
    mother:
      "Braxton Hicks tightening may happen occasionally.",
    food: "Stay hydrated and eat fiber to reduce constipation.",
    checklist: ["Know contraction warning signs", "Prepare questions for visit", "Continue vaccines plan"],
  },
  {
    week: 32,
    trimester: "Third",
    size: "Melon",
    focus: "Baby plumps up",
    baby:
      "The baby gains fat and practices breathing movements.",
    mother:
      "Pelvic pressure, backache and sleep difficulty can increase.",
    food: "Protein-dense snacks help: milk, curd, paneer, nuts, dal soup or eggs.",
    checklist: ["Discuss RSV vaccine seasonally", "Plan growth scan if advised", "Pack reports folder"],
  },
  {
    week: 33,
    trimester: "Third",
    size: "Honeydew melon",
    focus: "Immune support",
    baby:
      "The baby continues gaining weight and receiving protective antibodies from you.",
    mother:
      "Walking may feel slower, and swelling should be watched carefully.",
    food: "Keep iron, vitamin C and hydration steady.",
    checklist: ["Report sudden swelling", "Check fetal movement", "Finalize hospital preference"],
  },
  {
    week: 34,
    trimester: "Third",
    size: "Cantaloupe",
    focus: "Lungs keep maturing",
    baby:
      "The central nervous system and lungs continue maturing.",
    mother:
      "Fatigue, dizziness or heartburn may need meal and posture adjustments.",
    food: "Eat smaller meals with curd, soup, khichdi, vegetables and protein.",
    checklist: ["Review warning signs", "Keep emergency numbers", "Discuss birth plan"],
  },
  {
    week: 35,
    trimester: "Third",
    size: "Small pumpkin",
    focus: "Less room to move",
    baby:
      "The baby has less room but should still move regularly.",
    mother:
      "Pelvic heaviness, frequent urination and disturbed sleep are common.",
    food: "Avoid very heavy dinners and keep water intake regular.",
    checklist: ["Track movement daily", "Prepare hospital bag", "Discuss labor signs"],
  },
  {
    week: 36,
    trimester: "Third",
    size: "Papaya",
    focus: "Near term preparation",
    baby:
      "The baby may start moving lower into the pelvis.",
    mother:
      "Breathing may feel easier if the baby drops, but pelvic pressure may rise.",
    food: "Continue protein, iron, calcium and fiber without crash dieting.",
    checklist: ["Confirm vaccine completion", "Review delivery route", "Keep documents ready"],
  },
  {
    week: 37,
    trimester: "Third",
    size: "Winter melon",
    focus: "Early term",
    baby:
      "The baby is early term and continues maturing brain and lungs.",
    mother:
      "Discharge, mild contractions and pressure may increase.",
    food: "Choose easy-to-digest meals and keep snacks ready for hospital days.",
    checklist: ["Know when to call doctor", "Keep transport plan", "Monitor fluid leakage"],
  },
  {
    week: 38,
    trimester: "Third",
    size: "Watermelon slice",
    focus: "Labor readiness",
    baby:
      "The baby has a firm grasp and continues gaining final weight.",
    mother:
      "Watch for contractions, water leakage, bleeding or reduced movements.",
    food: "Hydrate, eat light meals and avoid experimenting with unsafe foods.",
    checklist: ["Review labor signs", "Keep bag packed", "Call for reduced movements"],
  },
  {
    week: 39,
    trimester: "Third",
    size: "Watermelon",
    focus: "Full term",
    baby:
      "The baby is full term and ready for birth when labor begins.",
    mother:
      "You may feel anxious, excited and physically heavy.",
    food: "Small balanced meals can help energy if labor starts.",
    checklist: ["Confirm hospital route", "Keep phone charged", "Follow appointment schedule"],
  },
  {
    week: 40,
    trimester: "Third",
    size: "Full-term baby",
    focus: "Due date week",
    baby:
      "The baby is ready for birth, though many pregnancies continue beyond the due date.",
    mother:
      "Your doctor may discuss monitoring, membrane status and next steps.",
    food: "Eat simple, nourishing foods and keep fluids steady.",
    checklist: ["Attend due-date visit", "Discuss induction if needed", "Watch warning signs"],
  },
  {
    week: 41,
    trimester: "Third",
    size: "Ready for birth",
    focus: "Post-date monitoring",
    baby:
      "The baby is usually monitored more closely if pregnancy continues past 40 weeks.",
    mother:
      "Your doctor may advise extra monitoring or induction depending on your health and baby status.",
    food: "Keep meals light, safe and regular while awaiting the delivery plan.",
    checklist: ["Follow monitoring plan", "Do not miss appointments", "Call for reduced movement"],
  },
];

export const vaccineGuides: VaccineGuide[] = [
  {
    name: "Flu vaccine",
    timing: "Any trimester during flu season",
    note:
      "Helps protect mother and baby from flu-related complications. Ask which flu vaccine is suitable in pregnancy.",
    icon: Syringe,
  },
  {
    name: "Tdap",
    timing: "Weeks 27-36 of each pregnancy",
    note:
      "Given in late pregnancy to pass antibodies that help protect the newborn from whooping cough.",
    icon: ShieldCheck,
  },
  {
    name: "RSV vaccine",
    timing: "Weeks 32-36 when seasonally appropriate",
    note:
      "Used in selected seasons to lower severe RSV risk in newborns. Your doctor will confirm timing.",
    icon: Baby,
  },
  {
    name: "COVID-19 vaccine",
    timing: "Stay up to date as advised",
    note:
      "Recommended for pregnant women to reduce severe illness risk. Confirm the current schedule with your doctor.",
    icon: HeartPulse,
  },
];

export const foodPillars = [
  {
    title: "Build the plate",
    icon: Salad,
    items: ["Protein", "Whole grains", "Vegetables", "Fruit", "Curd or milk"],
  },
  {
    title: "Nutrients to remember",
    icon: Apple,
    items: ["Folic acid", "Iron", "Calcium", "Vitamin D", "Omega-3"],
  },
  {
    title: "Avoid or limit",
    icon: Stethoscope,
    items: ["Alcohol", "Raw seafood", "Undercooked meat", "Unpasteurized foods", "High-mercury fish"],
  },
  {
    title: "Weekly habit",
    icon: CalendarCheck,
    items: ["Hydrate", "Eat small meals", "Do not skip protein", "Track symptoms", "Ask before supplements"],
  },
];

export function getTrimesterGuide(name: TrimesterName) {
  return trimesterGuides.find((trimester) => trimester.name === name) || trimesterGuides[0];
}
