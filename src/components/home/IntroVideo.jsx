"use client";
import React, { useState } from "react";
import Image from "next/image";
const kusum_lata = "/image/dr-kusum-lata.png";
const logo = "/image/dr-kusum-gynae-centre-logo.png";
import { Play, X } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

function IntroVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const videoSrc =
    "https://www.youtube.com/embed/WHjNV8dEh5U?si=9J8bSjfE0iLoTRYV&autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0";

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // disable scroll
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = ""; // restore scroll
  };

  const headingObj = {
    budge :"Introduction Video",
    heading:"Our Patient Care ",
    bold:" Experience",
    paragraph:"Advanced gynecology and laparoscopic treatments, patient care approach, and modern medical facilities."
  }

  return (
    <>
      <section className="my-12 px-4 md:my-20 md:px-6">

        {/* Header */}
       
          <SectionHeader headingObj={headingObj} />

        {/* Video Card */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Thumbnail + Play Button */}
          <div
            className="relative w-full aspect-video cursor-pointer group"
            onClick={openModal}
          >
            {/* YouTube thumbnail as static image */}
            <Image
              src="https://img.youtube.com/vi/WHjNV8dEh5U/maxresdefault.jpg"
              alt="Video thumbnail"
              fill
              sizes="(min-width: 1024px) 1024px, 92vw"
              className="object-cover"
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/85 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <Play className="ml-1 h-7 w-7 text-blue-600 md:h-8 md:w-8" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Quote + Attribution */}
          <div className="px-5 py-5 md:px-7">
            <p className="my-1 text-base leading-7 text-black md:my-2 md:text-xl md:leading-relaxed">
              August Health is more than just a system. It has become how we
              operate and how we succeed together.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pb-2">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <Image
                  src={kusum_lata}
                  alt="Dr Kusum Lata"
                  width={56}
                  height={56}
                  className="rounded-full border border-(--border) object-cover shadow"
                />
                <div>
                  <p className="font-bold text-(--primary-color) text-sm">
                    Dr Kusum Lata (Ex-AIIMS)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Senior Gynecologist & Laparoscopic Surgeon
                  </p>
                </div>
              </div>

              {/* Logo */}
              <div>
                <Image src={logo} alt="Logo" width={86} height={86} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Fullscreen Modal ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={closeModal} 
        >
          {/* Modal Box */}
          <div
            className="relative w-full max-w-7xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking video
          >
            <iframe
              className="w-full h-full"
              src={videoSrc}
              title="Patient Care Video"
              frameBorder="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-10 right-5 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      )}
    </>
  );
}

export default IntroVideo;
