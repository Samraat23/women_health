"use client";
import HeroSection from "../about-us/component/HeroSection";
import AboutSection from "../about-us/component/AboutSection";
import { ExpertiseSection } from "./component/ExpertiseSection";
import JourneySection from "./component/JourneySection";
import QualificationsSection from "./component/QualificationsSection";
import AwardsSection from "./component/AwardsSection";
import ClinicSection from "./component/ClinicSection";
import CTASection from "./component/CTASection";


const qualifications = [
  { degree: "MBBS", institute: "GMCH, Chandigarh", year: "2008" },
  { degree: "MD", institute: "PGIMER, Chandigarh", year: "2012" },
  { degree: "DNB", institute: "New Delhi", year: "2013" },
];

const awards = [
  {
    title: "National Conference Award",
    body: "Best Prize at National Conference of Indian Menopause Society, Faridabad - Feb 2012.",
  },
  {
    title: "Kuldeep Jain - BSVL Award",
    body: "Best paper in IVF at National Conference of Indian Fertility Society, New Delhi - Dec 2013.",
  },
  {
    title: "FENIX 2015 - AIIMS",
    body: "Won Best Prize in ART category for paper presentation at FENIX 2015, AIIMS.",
  },
];

const expertise = [
  { label: "Laparoscopic Surgery" },
  { label: "High-Risk Pregnancy" },
  { label: "Infertility Treatment" },
  { label: "Endometriosis" },
  { label: "PCOS Management" },
  { label: "Adolescent Health" },
  { label: "Hysteroscopy" },
  { label: "Ovarian Cyst Surgery" },
  { label: "Obstetrics" },
  { label: "Fibroid Removal" },
];

const journey = [
  {
    period: "2008 - 2012",
    role: "MD Residency",
    org: "PGIMER, Chandigarh",
    desc: "Completed MD training at one of India's premier medical institutes and built a rigorous clinical foundation in obstetrics and gynecology.",
    side: "left",
  },
  {
    period: "2012 - 2019",
    role: "Senior Resident to Faculty",
    org: "AIIMS, New Delhi",
    desc: "Managed complex cases, authored research papers, mentored teams, and later served as faculty in a demanding academic environment.",
    side: "right",
  },
  {
    period: "Aug 2018 - Oct 2019",
    role: "Consultant - Minimal Invasive Gynecology",
    org: "Paras Healthcare",
    desc: "Handled advanced clinical cases, led training programs for doctors, and organised practical workshops for expectant mothers.",
    side: "left",
  },
  {
    period: "2021 - Present",
    role: "Founder & Chief Surgeon",
    org: "Dr. Kusum Gynecology Centre, Gurgaon",
    desc: "Founded the Gurgaon centre with a mission to provide accessible specialist care and careful surgical planning across Delhi NCR.",
    side: "right",
  },
  {
    period: "2018 - Present",
    role: "Senior Gynecologist & Laparoscopic Surgeon",
    org: "Sitaram Bhartia Hospital, Delhi",
    desc: "Continues specialist gynecology and minimally invasive surgical work with a focus on careful evaluation and recovery planning.",
    side: "left",
  },
  {
    period: "2024 - Present",
    role: "Senior Gynecologist & Laparoscopic Surgeon",
    org: "Motherhood Hospital",
    desc: "Provides senior consultation and surgical support for women seeking coordinated hospital-based care.",
    side: "right",
  },
];


export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[var(--background)] text-[var(--secondary-text)]">
      <HeroSection />
      <AboutSection />
      <ExpertiseSection expertise={expertise} />
      <JourneySection journey={journey} />
      <QualificationsSection qualifications={qualifications} />
      <AwardsSection awards={awards} />
      <ClinicSection />
      <CTASection />
    </main>
  );
}
