
import HeroSection from "./(homepagecomponent)/HeroSection";
import AboutUs from "./(homepagecomponent)/AboutUs";
import Service from "./(homepagecomponent)/Service";
import IntroVideo from "./(homepagecomponent)/IntroVideo";
import WhyChoose from "./(homepagecomponent)/WhyChoose"
import data from "./(data)/db.json"
import Faq from "@/components/Faq";
import PatientReview from "./(homepagecomponent)/PatientReview";
import AssociationSection from "./(homepagecomponent)/AssociationSection"
import SurgeryCategory from "./(homepagecomponent)/SurgeryCategory";
import WHealthCategory from "./(homepagecomponent)/WHealthCategory";
import  RecentBlog from "./(homepagecomponent)/RecentBlog"
import InstaReels from "./(homepagecomponent)/InstaReels"
import Trainer from "./(homepagecomponent)/Trainer"
import Hospital from "./(homepagecomponent)/Hospital";
import clinicLogo from "./(assets)/ logo.png"
import sanar from "./(assets)/ sanal_Logo.png"
import motherhood from "./(assets)/MotherHoodlogo.png"
import medicity from "./(assets)/ medicity.webp"
import sitaram from "./(assets)/ sitarambhartiLogo.png"
import aiimsnewdelhi from "./(assets)/AiimsNewDelhi.png"
import paras from "./(assets)/ paras.jpg"
import pgimr from "./(assets)/ pgimr.png"
import {gynecologyCategories} from "@/data/Categories"

export default function Home() {
  const WhyChooseData = data?.whyChooseUs;
  const { faq, testimonial, WHealth, LaparoscopicSurgery, blogs, trianer } = data;

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
      <HeroSection />
      {/* <Hospital hospitalLogo={hospitalLogo} /> */}
      <Trainer d={trianer} />
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



