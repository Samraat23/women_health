"use client";
import React, { useState } from "react";
import Image from "next/image";
import kusum_lata from "@/assets/ kusumLata.png";
import logo from "@/assets/ logo.png";
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
      <section className="my-20">

        {/* Header */}
       
          <SectionHeader headingObj={headingObj} />

        {/* Video Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden">

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
              <div className="w-20 h-20 bg-white/85 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="text-blue-600 w-8 h-8 ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Quote + Attribution */}
          <div className="px-7 py-5">
            <p className="text-lg my-2 md:text-xl text-black leading-relaxed">
              August Health is more than just a system. It has become how we
              operate and how we succeed together.
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 mt-4 pb-2">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <Image
                  src={kusum_lata}
                  alt="Dr Kusum Lata"
                  width={60}
                  height={60}
                  className="rounded-full  object-cover border border-(--border) shadow"
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
                <Image src={logo} alt="Logo" width={100} height={100} />
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
