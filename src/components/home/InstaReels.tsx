"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, Play } from "lucide-react";
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
      accent: "#e11d48",
    },
    {
      id: "2",
      heading: "Pregnancy reel",
      url: "https://www.instagram.com/reel/DNSrmu1hQyd/",
      image: "/image/normalPregnancy.png",
      label: "Pregnancy",
      accent: "#7c3aed",
    },
    {
      id: "3",
      heading: "Podcast reel",
      url: "https://www.instagram.com/reel/DOG783RgWlh/",
      image: "/image/ lacture.jpeg",
      label: "Podcast",
      accent: "#0891b2",
    },
    {
      id: "4",
      heading: "Delivery reel",
      url: "https://www.instagram.com/reel/DL4tt0puZDW/",
      image: "/image/ FLIP3.jpeg",
      label: "Delivery",
      accent: "#2563eb",
    },
    {
      id: "5",
      heading: "Patient story reel",
      url: "https://www.instagram.com/reel/DVJFgAOEb13/",
      image: "/image/ happytestimonial.jpeg",
      label: "Patient Story",
      accent: "#059669",
    },
    {
      id: "6",
      heading: "Women health reel",
      url: "https://www.instagram.com/reel/DOxp9j5Ece4/",
      image: "/image/ drkusumlata_bestTrainer.jpeg",
      label: "Women Health",
      accent: "#db2777",
    },
    {
      id: "7",
      heading: "Mother care reel",
      url: profileUrl,
      image: "/image/ FLIPING1.jpeg",
      label: "Mother Care",
      accent: "#ea580c",
    },
    {
      id: "8",
      heading: "Laparoscopy reel",
      url: profileUrl,
      image: "/image/ robottrianer2.jpeg",
      label: "Laparoscopy",
      accent: "#4f46e5",
    },
    {
      id: "9",
      heading: "Doctor talk reel",
      url: profileUrl,
      image: "/image/ medicityfaculty.jpeg",
      label: "Doctor Talk",
      accent: "#0d9488",
    },
    {
      id: "10",
      heading: "Awareness reel",
      url: profileUrl,
      image: "/image/ impowerwomen.jpeg",
      label: "Awareness",
      accent: "#b45309",
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
            className="group relative block aspect-[9/16] w-[min(68vw,230px)] flex-none snap-start overflow-hidden rounded-2xl bg-[var(--background)] shadow-[0_10px_30px_rgba(27,20,99,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(27,20,99,0.18)] focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 sm:w-[286px] sm:rounded-[20px]"
          >
            <Image
              src={item.image}
              alt={item.heading}
              fill
              sizes="(min-width: 640px) 286px, 76vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0)_34%,rgba(0,0,0,0.78)_100%)]" />

            <span
              className="absolute left-3 top-3 inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-black leading-none text-white shadow-[0_6px_16px_rgba(0,0,0,0.22)] sm:left-4 sm:top-4 sm:text-xs"
              style={{ backgroundColor: item.accent }}
            >
              {item.label}
            </span>

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/22 text-white shadow-[0_14px_32px_rgba(0,0,0,0.28)] ring-1 ring-white/40 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white/35">
                <Play size={22} fill="currentColor" className="ml-0.5" />
              </span>
            </span>

            <span className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
              <span className="line-clamp-2 block text-[15px] font-black leading-snug text-white sm:text-base">
                {item.heading}
              </span>
              <span className="mt-1.5 flex min-w-0 items-center gap-1 text-[11px] font-bold text-white/65">
                <span className="truncate">@{username}</span>
                <BadgeCheck
                  size={14}
                  className="shrink-0 fill-[#19a7ff] text-white"
                />
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex justify-center md:mt-6">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)] transition hover:gap-3 sm:text-base"
        >
          Explore all reels
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

export default InstaReels;
