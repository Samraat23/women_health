"use client";

import Image from "next/image";
import { BadgeCheck, Play } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

function InstaReels() {
  const profileUrl =
    "https://www.instagram.com/drkusumendometriosissurgeon/reels/";
  const username = "drkusumendometriosissurgeon";

  const instaReel = [
    {
      id: "1",
      heading: "Surgery reel",
      url: "https://www.instagram.com/reel/DUDC8xekWUI/",
      image: "/image/ fibroid.png",
      label: "Surgery",
    },
    {
      id: "2",
      heading: "Pregnancy reel",
      url: "https://www.instagram.com/reel/DNSrmu1hQyd/",
      image: "/image/ normalPregnancy.png",
      label: "Pregnancy",
    },
    {
      id: "3",
      heading: "Podcast reel",
      url: "https://www.instagram.com/reel/DOG783RgWlh/",
      image: "/image/ lacture.jpeg",
      label: "Podcast",
    },
    {
      id: "4",
      heading: "Delivery reel",
      url: "https://www.instagram.com/reel/DL4tt0puZDW/",
      image: "/image/ FLIP3.jpeg",
      label: "Delivery",
    },
    {
      id: "5",
      heading: "Patient story reel",
      url: "https://www.instagram.com/reel/DVJFgAOEb13/",
      image: "/image/ happytestimonial.jpeg",
      label: "Patient Story",
    },
    {
      id: "6",
      heading: "Women health reel",
      url: "https://www.instagram.com/reel/DOxp9j5Ece4/",
      image: "/image/ drkusumlata_bestTrainer.jpeg",
      label: "Women Health",
    },
    {
      id: "7",
      heading: "Mother care reel",
      url: profileUrl,
      image: "/image/ FLIPING1.jpeg",
      label: "Mother Care",
    },
    {
      id: "8",
      heading: "Laparoscopy reel",
      url: profileUrl,
      image: "/image/ robottrianer2.jpeg",
      label: "Laparoscopy",
    },
    {
      id: "9",
      heading: "Doctor talk reel",
      url: profileUrl,
      image: "/image/ medicityfaculty.jpeg",
      label: "Doctor Talk",
    },
    {
      id: "10",
      heading: "Awareness reel",
      url: profileUrl,
      image: "/image/ impowerwomen.jpeg",
      label: "Awareness",
    },
  ];

  const headingObj = {
    budge: "Instagram Stories",
    heading: "Voices of Happy",
    bold: "Patients",
    paragraph:
      "Hear real patient experiences, recovery journeys, and stories of trust through our Instagram video testimonials.",
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      <SectionHeader headingObj={headingObj} />

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar md:gap-5 md:pb-6">
        {instaReel.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${item.heading} on Instagram`}
            className="group relative block aspect-[9/16] w-[min(68vw,230px)] flex-none snap-start overflow-hidden rounded-[24px] border border-[var(--border)]/10 bg-[var(--background)] shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(27,20,99,0.14)] focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 sm:w-[286px] sm:rounded-[28px]"
          >
            <Image
              src={item.image}
              alt={item.heading}
              fill
              sizes="(min-width: 640px) 286px, 76vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.34)_45%,rgba(0,0,0,0.82)_100%)]" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-white shadow-[0_18px_42px_rgba(0,0,0,0.25)] backdrop-blur-md transition group-hover:scale-110 group-hover:bg-white/35">
                <Play size={30} fill="currentColor" className="ml-1 md:size-[34px]" />
              </span>
            </span>

            <span className="absolute inset-x-4 bottom-5 sm:inset-x-6 sm:bottom-7">
              <span className="flex min-w-0 items-center gap-2 text-base font-black leading-none text-white sm:text-lg">
                <span className="truncate">@{username}</span>
                <BadgeCheck
                  size={22}
                  className="shrink-0 fill-[#19a7ff] text-white"
                />
              </span>
              <span className="mt-3 inline-flex rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold text-white/85 backdrop-blur-md">
                {item.label}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default InstaReels;
