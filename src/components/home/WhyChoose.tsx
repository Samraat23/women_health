"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Award, Baby, HeartPulse, Microscope, ShieldCheck, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import SectionHeader from "@/components/shared/SectionHeader";
import kusum from "../../../public/image/ FLIPING1.jpeg";
import robot from "../../../public/image/ robottariner.jpeg";
import lacture from "../../../public/image/ lacture.jpeg";
import lacture2 from "../../../public/image/ impowerwomen.jpeg";
import img4 from "../../../public/image/ drkusumlatagynecologist.jpeg";

const cards = [
  {
    badge: "Ex-AIIMS",
    title: "Elite Academic Training",
    text: "Trained at AIIMS New Delhi, PGIMER Chandigarh and PGIMS Rohtak.",
    icon: Award,
  },
  {
    badge: "Precision",
    title: "Advanced Laparoscopy",
    text: "Minimally invasive procedures focused on faster recovery and smaller scars.",
    icon: Microscope,
  },
  {
    badge: "Pregnancy",
    title: "High-Risk Pregnancy Care",
    text: "Structured guidance through complex pregnancies, delivery, and postnatal care.",
    icon: Baby,
  },
  {
    badge: "Patient-First",
    title: "Empathetic Consultations",
    text: "Every concern is heard with dignity, patience, and clear next steps.",
    icon: HeartPulse,
  },
  {
    badge: "Hospital Care",
    title: "Senior Consultant",
    text: "Modern hospital-based care with strong clinical standards.",
    icon: ShieldCheck,
  },
  {
    badge: "Complete Care",
    title: "Full Spectrum Gynecology",
    text: "From adolescent health and fertility to menopause and surgical care.",
    icon: Stethoscope,
  },
];

const stats = [
  { n: 17, suffix: "+", label: "Years Experience" },
  { n: 7000, suffix: "+", label: "Laparoscopic Surgeries" },
  { n: 12000, suffix: "+", label: "Hysteroscopic Procedures" },
  { n: 27000, suffix: "+", label: "OPD Consultations" },
];

const headingObj = {
  budge: "Trusted by Thousands of Women",
  heading: "Why Choose",
  bold: "Dr. Kusum Lata?",
  paragraph:
    "Combining high standards of academic medicine with genuine compassion and a complete women's health approach.",
};

export default function WhyChoose({ data: _data }: { data?: unknown }) {
  void _data;

  const images = useMemo(
    () => [
      { img: kusum, id: 1 },
      { img: robot, id: 2 },
      { img: lacture, id: 3 },
      { img: img4, id: 4 },
      { img: lacture2, id: 5 },
    ],
    []
  );
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader headingObj={headingObj} />

        <div className="grid gap-4 md:gap-6 lg:grid-cols-[1fr_360px_1fr]">
          <div className="grid gap-4">
            {cards.slice(0, 3).map((card, index) => (
              <FeatureCard key={card.title} card={card} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] bg-white shadow-xl sm:min-h-[430px] lg:min-h-[520px] lg:rounded-[2rem]"
          >
            <motion.div
              animate={{ x: `-${current * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex h-full"
            >
              {images.map((banner) => (
                <div key={banner.id} className="relative min-w-full">
                  <Image
                    src={banner.img}
                    alt="Dr. Kusum Lata Bhardwaj"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-[var(--secondary-color)]/90 p-4 text-white backdrop-blur">
              <p className="font-[var(--font-primary)] font-black">Dr. Kusum Lata Bhardwaj</p>
              <p className="text-xs text-white/70">Ex-AIIMS New Delhi</p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {cards.slice(3).map((card, index) => (
              <FeatureCard key={card.title} card={card} index={index + 3} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-2xl border border-[var(--border)]/10 bg-white p-4 text-center shadow-sm md:p-5"
            >
              <p className="font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)] md:text-3xl">
                <CountUp start={0} end={stat.n} duration={3} separator="," suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  const Icon = card.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="rounded-2xl border border-[var(--border)]/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-5"
    >
      <div className="mb-3 flex items-center gap-3 md:mb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
          <Icon size={21} />
        </span>
        <span className="rounded-full bg-[var(--background)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--primary-color)] md:tracking-[0.16em]">
          {card.badge}
        </span>
      </div>
      <h3 className="font-[var(--font-primary)] text-base font-black text-[var(--primary-text-color)] md:text-lg">
        {card.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#667085]">{card.text}</p>
    </motion.article>
  );
}
