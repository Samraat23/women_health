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

    heading:"Voices of Happy  ",
    bold:"Patients",
    paragraph:"Hear real patient experiences, recovery journeys, and stories of trust through our Instagram video testimonials."
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-10">
      {/* Heading */}
      <SectionHeader headingObj={headingObj} />
      
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {instaReel.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden bg-white border hover:shadow-lg transition"
          >
            {/* Reel Embed */}
            <div className="w-full h-[400px] overflow-hidden">
              <iframe
                src={item.embed}
                className="w-full h-full"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>

            {/* Title */}
            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2">
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