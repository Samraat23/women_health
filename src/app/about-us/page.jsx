"use client";
import HeroSection from  "../about-us/component/HeroSection"
import StatsBar from "./component/StatsBar";
import AboutSection from "../about-us/component/AboutSection"
import { ExpertiseSection } from "./component/ExpertiseSection";
import JourneySection from "./component/JourneySection";
import QualificationsSection from "./component/QualificationsSection";
import AwardsSection from "./component/AwardsSection";
import ClinicSection from "./component/ClinicSection";
import CTASection from "./component/CTASection";


const stats = [
  { value: "17+", label: "Years Experience" },
  { value: "12+", label: "Years as Specialist" },
  { value: "10k+", label: "Women Treated" },
  { value: "3", label: "Premier Institutes" },
];

const qualifications = [
  { degree: "MBBS", institute: "GMCH, Chandigarh", year: "2008" },
  { degree: "MD", institute: "PGIMER, Chandigarh", year: "2012" },
  { degree: "DNB", institute: "New Delhi", year: "2013" },
];

const awards = [
  {
    icon: "🏆",
    title: "National Conference Award",
    body: "Best Prize at National Conference of Indian Menopause Society, Faridabad — Feb 2012.",
  },
  {
    icon: "🥇",
    title: "Kuldeep Jain – BSVL Award",
    body: "Best paper in IVF at National Conference of Indian Fertility Society, New Delhi — Dec 2013.",
  },
  {
    icon: "🎖️",
    title: "FENIX 2015 – AIIMS",
    body: "Won Best Prize in ART category for paper presentation at FENIX 2015, AIIMS.",
  },
];

const expertise = [
  { icon: "🔬", label: "Laparoscopic Surgery" },
  { icon: "🤱", label: "High-Risk Pregnancy" },
  { icon: "🧬", label: "Infertility Treatment" },
  { icon: "🩺", label: "Endometriosis" },
  { icon: "💊", label: "PCOS Management" },
  { icon: "🌸", label: "Adolescent Health" },
  { icon: "🏥", label: "Hysteroscopy" },
  { icon: "🧪", label: "Ovarian Cyst Surgery" },
  { icon: "👶", label: "Obstetrics" },
  { icon: "🌡️", label: "Fibroid Removal" },
];

const journey = [
  {
    period: "2008 – 2012",
    role: "MD Residency",
    org: "PGIMER, Chandigarh",
    color: "#5a4ffe",
    desc: "Completed post-graduation (MD) in Obstetrics & Gynecology at one of India's most prestigious apex institutes. Demonstrated unwavering dedication, exceptional diligence, and deep commitment to women's health.",
    side: "left",
  },
  {
    period: "2012 – 2019",
    role: "Senior Resident → Faculty",
    org: "AIIMS, New Delhi",
    color: "#7c6fff",
    desc: "Joined AIIMS New Delhi as Senior Resident. Developed mastery in laparoscopic surgery, authored research papers, and later served as Faculty. Helped thousands of women through minimally invasive surgical expertise.",
    side: "right",
  },
  {
    period: "Aug 2018 – Oct 2019",
    role: "Consultant – Minimal Invasive Gynecology",
    org: "Paras Healthcare",
    color: "#9a8bff",
    desc: "Managed complex surgical cases including infertility and high-risk pregnancies. Led nationwide training programs for gynecologists and organised workshops for expectant mothers.",
    side: "left",
  },
  {
    period: "2021 – Present",
    role: "Founder & Chief Surgeon",
    org: "Dr. Kusum Gynecology Centre, Gurgaon",
    color: "#31285a",
    desc: "Founded the centre on Golf Course Road, Gurgaon with a mission of affordable, world-class women's care across Delhi NCR. Renowned for laparoscopic precision in endometriosis, fibroids, and ovarian cysts.",
    side: "right",
  },
];


export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar stats={stats} />
      <AboutSection  />
      <ExpertiseSection expertise={expertise} />
      <JourneySection journey={journey} />
      <QualificationsSection qualifications={qualifications} />
      <AwardsSection awards={awards} />
      <ClinicSection />
      <CTASection />
    </main>
  );
}