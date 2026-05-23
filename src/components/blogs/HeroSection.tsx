"use client";

import React from "react";
import {
  CalendarDays,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function HeroSection() {
  return (
    <section className=" relative bg-[linear-gradient(135deg,var(--primary-text-color)_0%,var(--secondary-color)_12%,var(--primary-color)_100%)]">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-160 max-w-7xl items-center justify-center ">
        
        <div className="max-w-4xl  text-center">
          
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
            <Sparkles size={15} className="text-pink-300" />
            Pregnancy Guide
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-tight text-white md:text-6xl md:leading-[1.1]">
            Healthy Pregnancy Tips Every Mother Should Know
          </h1>

          {/* Meta Info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              <CalendarDays size={17} />
              May 21, 2026
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              <Clock3 size={17} />
              5 min read
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              <ShieldCheck size={17} />
              Doctor Reviewed
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;