"use client";

import {
  Award,
  HeartHandshake,
  MapPin,
  Microscope,
  Phone,
  WalletCards,
} from "lucide-react";

import { AnimBox } from "@/utils/AnimBox";

const clinicCards = [
  {
    icon: WalletCards,
    title: "Affordable Care",
    desc: "World-class treatment at accessible prices for women across Delhi NCR.",
  },
  {
    icon: Microscope,
    title: "Minimally Invasive",
    desc: "Advanced laparoscopic surgery planned for comfort and faster recovery.",
  },
  {
    icon: HeartHandshake,
    title: "Compassionate",
    desc: "Genuine empathy, clear communication, and personal attention.",
  },
  {
    icon: Award,
    title: "Nationally Awarded",
    desc: "Recognised at national conferences for research excellence.",
  },
];

function ClinicSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:78px_78px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <AnimBox from="left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
              <MapPin size={16} className="text-[var(--primary-color)]" />
              Established 2021
            </span>

            <h2 className="font-[var(--font-primary)] text-3xl font-black leading-tight text-white sm:text-5xl">
              Dr. Kusum Gynecology Centre
            </h2>

            <div className="mt-6 space-y-5 text-base font-semibold leading-8 text-white/76">
              <p>
                Founded in 2021 with a mission to provide affordable,
                world-class women&apos;s healthcare across Delhi NCR. The centre
                is located near Golf Course Road, Gurgaon, Sector 55.
              </p>
              <p>
                The clinic specialises in outpatient consultations, while
                laparoscopic and gynecological procedures are performed at
                associated hospitals with careful surgical planning.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md">
                <MapPin size={17} />
                Sushant Lok-2, Sec 55, Gurgaon
              </div>
              <a
                href="tel:9289140812"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/18"
              >
                <Phone size={17} />
                +91 92891 40812
              </a>
            </div>
          </AnimBox>

          <AnimBox from="right" delay={0.15}>
            <div className="grid gap-4 sm:grid-cols-2">
              {clinicCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[26px] border border-white/18 bg-white/10 p-6 shadow-[0_18px_42px_rgba(27,20,99,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/16"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--primary-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
                      <Icon size={23} />
                    </span>
                    <h3 className="mt-5 font-[var(--font-primary)] text-lg font-black text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-white/66">
                      {card.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </AnimBox>
        </div>
      </div>
    </section>
  );
}

export default ClinicSection;
