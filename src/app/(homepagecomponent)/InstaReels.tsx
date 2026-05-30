"use client";
import React from "react";
import SectionHeader from "../(dynamiccomponent)/SectionHeader";

function InstaReels() {
  const instaReel = [
    {
      id: "1",
      heading: "Patient testimonial",
      embed: "https://www.instagram.com/reel/DUDC8xekWUI/embed"
    },
    {
      id: "2",
      heading: "Patient testimonial 2",
      embed: "https://www.instagram.com/reel/DUDC8xekWUI/embed"
    },
    {
      id: "3",
      heading: "Patient testimonial 3",
      embed: "https://www.instagram.com/reel/DUDC8xekWUI/embed"
    },
    {
      id: "4",
      heading: "Patient testimonial 4",
      embed: "https://www.instagram.com/reel/DUDC8xekWUI/embed"
    }
  ];

  const headingObj = {
    budge: "Instagram Stories",
    heading:"Voices of Happy",
    bold:"Patients",
    paragraph:"Hear real patient experiences, recovery journeys, and stories of trust through our Instagram video testimonials."
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeader headingObj={headingObj} />
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {instaReel.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="w-full h-[400px] overflow-hidden">
              <iframe
                src={item.embed}
                className="w-full h-full"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                title={item.heading}
              />
            </div>

            <div className="p-4">
              <p className="line-clamp-2 text-sm font-black text-[var(--primary-text-color)]">
                {item.heading}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InstaReels;
