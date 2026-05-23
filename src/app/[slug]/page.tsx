import React from "react";
import HeroSection from "@/components/blogs/HeroSection";
import ContentTopics from "@/components/blogs/ContentTopics";
import DoctorBanner from "@/components/blogs/DoctorBanner";
import ReadArticle from "@/components/blogs/ReadArticle";


function Page() {
  return (
    <main className="relative -top-30 bg-[#faf7f2]">
      <HeroSection />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 md:px-6 lg:grid-cols-[260px_1fr_320px]">
        {/* Left Side */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ContentTopics />
          </div>
        </aside>

        {/* Center */}
        <article>
          <ReadArticle/>
        </article>

        {/* Right Side */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <DoctorBanner />
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Page;