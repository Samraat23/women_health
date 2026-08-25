
import HeroSection from "@/components/home/HeroSection";
import AboutUs from "@/components/home/AboutUs";
import Service from "@/components/home/Service";
import IntroVideo from "@/components/home/IntroVideo";
import WhyChoose from "@/components/home/WhyChoose"
import data from "@/data/siteData.json"
import Faq from "@/components/Faq";
import PatientReview from "@/components/home/PatientReview";
import AssociationSection from "@/components/home/AssociationSection"
import SurgeryCategory from "@/components/home/SurgeryCategory";
import WHealthCategory from "@/components/home/WHealthCategory";
import  RecentBlog from "@/components/home/RecentBlog"
import InstaReels from "@/components/home/InstaReels"
import Trainer from "@/components/home/Trainer"
import clinicLogo from "@/assets/ logo.png"
import sanar from "@/assets/ sanal_Logo.png"
import motherhood from "@/assets/MotherHoodlogo.png"
import medicity from "@/assets/ medicity.webp"
import sitaram from "@/assets/ sitarambhartiLogo.png"
import aiimsnewdelhi from "@/assets/AiimsNewDelhi.png"
import paras from "@/assets/ paras.jpg"
import pgimr from "@/assets/ pgimr.png"
import {gynecologyCategories} from "@/data/Categories"
import { getHomePageContent } from "@/lib/homeContentStore";

// Prerendered like every other page; the admin save route revalidates it so
// content edits still show up straight away.
export const revalidate = 60;

export default async function Home() {
  const homeContent = await getHomePageContent();
  const WhyChooseData = data?.whyChooseUs;
  const { faq, testimonial, WHealth, LaparoscopicSurgery, blogs } = data;

  const hospitalLogo = [
    {
      id: 1,
      img: paras,
      name: "Paras Health",
      url: "https://www.parashospitals.com/",
    },
    {
      id: 2,
      img: aiimsnewdelhi,
      name: "AIIMS New Delhi",
      url: "https://www.aiims.edu/",
    },
    {
      id: 3,
      img: motherhood,
      name: "Motherhood Hospitals",
      url: "https://www.motherhoodindia.com/",
    },
    {
      id: 4,
      img: clinicLogo,
      name: "Dr. Kusum Gynae Centre",
      url: "https://drkusumlata.in/",
    },
    {
      id: 5,
      img: sitaram,
      name: "Sitaram Bhartia",
      url: "https://www.sitarambhartia.org/",
    },
    {
      id: 6,
      img: pgimr,
      name: "PGIMER Chandigarh",
      url: "https://pgimer.edu.in/",
    },
    {
      id: 7,
      img: sanar,
      name: "Sanar International Hospitals",
      url: "https://www.sanarhospitals.com/",
    },
    {
      id: 8,
      img: medicity,
      name: "The Medicity",
      url: "https://themedicity.com/",
    },
  ];



  return (
    <div className="min-h-screen bg-(--background) text-(--secondary-text)">
      <HeroSection data={homeContent.hero} />
      {/* <Hospital hospitalLogo={hospitalLogo} /> */}
      <Trainer d={homeContent.trainer} />
      <AboutUs  />
      <SurgeryCategory data={LaparoscopicSurgery} />
      <Service service={gynecologyCategories} />
      <WHealthCategory data={WHealth} />
      <WhyChoose data={WhyChooseData} />
      <IntroVideo />
      <PatientReview data={testimonial} />
      <InstaReels />
      <AssociationSection hospitalLogo={hospitalLogo} />
      <RecentBlog data={blogs} />
      <Faq data={faq} />
    </div>
  );
}
