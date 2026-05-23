
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

export default function Home() {
  const WhyChooseData = data?.whyChooseUs;
  const { faq, testimonial, service, associations, WHealth, LaparoscopicSurgery, blogs, trianer } = data;

  const hospitalLogo = [
    { id: 1, img: clinicLogo, name: "Clinic" },
    { id: 2, img: sanar, name: "Sanar Hospital" },
    { id: 3, img: aiimsnewdelhi, name: "Aiims New Delhi" },
    { id: 4, img: medicity, name: "Medicity" },
    { id: 5, img: sitaram, name: "Sitaram Bhartia" },
    { id: 6, img: aiimsnewdelhi, name: "Paras Hospital" },
    { id: 7, img: sanar, name: "PGIMR" },
    { id: 8, img: motherhood, name: "Motherhood" },
  ];



  return (
    <div className="min-h-screen">
      <HeroSection />
      <Hospital hospitalLogo={hospitalLogo} />
      <Trainer d={trianer} />
      <AboutUs  />
      <SurgeryCategory data={LaparoscopicSurgery} />
      <Service service={service} />
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






