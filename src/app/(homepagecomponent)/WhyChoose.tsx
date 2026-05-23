
"use client";

import { motion, useInView } from "framer-motion";
import {
  Award,
  Baby,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import kusum from "../../../public/image/ FLIPING1.jpeg";
import robot from "../../../public/image/ robottariner.jpeg"
import lacture from "../../../public/image/ lacture.jpeg"
import lacture2 from "../../../public/image/ impowerwomen.jpeg"
import img4 from "../../../public/image/ drkusumlatagynecologist.jpeg"
import CountUp from "react-countup";
import SectionHeader from "../(dynamiccomponent)/SectionHeader"

// ─── Data ──────────────────────────────────────────────────────────────────
const leftCards = [
  {
    badge: "Ex-AIIMS",
    title: "Elite Academic Training",
    text: "Shaped by AIIMS New Delhi, PGIMER Chandigarh & PGIMS Rohtak — the pinnacle of Indian medical education.",
    icon: Award,
    stat: "17+",
    statLabel: "Years",
  },
  {
    badge: "Surgical Precision",
    title: "Advanced Laparoscopy",
    text: "7,000+ minimally invasive procedures. Smaller scars, faster recovery, proven outcomes.",
    icon: Microscope,
    stat: "7K+",
    statLabel: "Surgeries",
  },
  {
    badge: "Specialised",
    title: "High-Risk Pregnancies",
    text: "Structured, calm guidance through complex pregnancies and complicated deliveries with expert postnatal care.",
    icon: Baby,
    stat: "10K+",
    statLabel: "Deliveries",
  },
];

const rightCards = [
  {
    badge: "Patient-First",
    title: "Empathetic Consultations",
    text: "Every concern heard with patience, dignity and a personalised care plan — never rushed, always thorough.",
    icon: HeartPulse,
    stat: "27K+",
    statLabel: "OPD Consults",
  },
  {
    badge: "Motherhood Hospital",
    title: "Senior Consultant",
    text: "Currently serving as Senior Consultant at Motherhood Hospital, Gurugram — a leading women's care facility.",
    icon: ShieldCheck,
    stat: "5★",
    statLabel: "Google Rating",
  },
  {
    badge: "Complete Care",
    title: "Full Spectrum Gynaecology",
    text: "From adolescent health and infertility to menopause management and 12,000+ hysteroscopic procedures.",
    icon: Stethoscope,
    stat: "12K+",
    statLabel: "Hysteroscopic",
  },
];

// ─── Card ──────────────────────────────────────────────────────────────────
type CardData = (typeof leftCards)[0];

function Card({
  card,
  align,
  index,
}: {
  card: CardData;
  align: "left" | "right";
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = card.icon;
  const isRight = align === "right";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 36 : -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
      className={`group relative flex items-start gap-4 p-5 rounded-2xl bg-white/80 cursor-pointer backdrop-blur-sm border ${
        isRight ? "flex-row-reverse text-right" : ""
      }`}
    >
      {/* Icon circle */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-xl border border-(--secondary-text) bg-(--secondary-text) flex items-center justify-center ">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="inline-block text-[9px] uppercase tracking-[0.18em] font-bold text-black border border-pink-200 bg-pink-50 px-2 py-0.5 rounded-full mb-1.5">
          {card.badge}
        </span>

        <h3 className=" text-(--secondary-text) font-semibold text-[13px] leading-snug mb-1 font-serif">
          {card.title}
        </h3>

        <p className="text-gray-700 text-[11.5px] leading-relaxed">
          {card.text}
        </p>
      </div>
    </motion.div>
  );
}


const headingObj = {
  budge :"Trusted by Thousands of Women",
  heading:"Why Choose",
  bold:"Dr. Kusum Lata?",
  paragraph:"Combining the highest standards of academic medicine with genuine compassion — Gurugram&apos;s most trusted gynaecologist and laparoscopic surgeon."
}

export default function WhyChoose() {
  
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, {
    once: true,
    margin: "-60px",
  });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "-40px",
  });

  

  const ImageBanner = [
    {
      img: kusum,
      id: 1,
    },
    {
      img: robot,
      id: 2,
    },
    {
      img: lacture,
      id: 3,
    },
    {
      img: img4,
      id: 4,
    },
    {
      img: lacture2,
      id: 5,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ImageBanner.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ImageBanner.length]);

  return (
    <section className="relative w-full overflow-hidden py-20 px-4 lg:px-10">
      <div className="relative max-w-7xl mx-auto">
        {/* ── Section Header ── */}
     <SectionHeader headingObj={headingObj} />

        {/* ── Three Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_1fr] gap-6 items-stretch">
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-4 justify-center">
            {leftCards.map((card, i) => (
              <Card key={card.title} card={card} align="left" index={i} />
            ))}
          </div>

          {/* ── Center Image ── */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={imgInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden cursor-pointer shadow-xl">
              
              {/* FIXED IMAGE SCROLL */}
              <motion.div
                animate={{ x: `-${current * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex w-full h-full"
              >
                {ImageBanner.map((banner) => (
                  <div
                    key={banner.id}
                    className="relative min-w-full h-full"
                  >
                    <Image
                      src={banner.img}
                      alt="Dr. Kusum Lata"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 h-12 w-full bg-(--secondary-text)/90 backdrop-blur-sm z-10">
                <div className="px-3 py-1.5 text-white">
                  <p className="text-[14px] font-medium">
                    Dr Kusum Lata Bhardwaj
                  </p>

                  <p className="text-[10px]">Ex-AIIMS New Delhi</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-4 justify-center">
            {rightCards.map((card, i) => (
              <Card key={card.title} card={card} align="left" index={i} />
            ))}
          </div>
        </div>

        {/* ── Bottom stat strip ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { n: 17, suffix: "+", l: "Years Experience" },
            { n: 7000, suffix: "+", l: "Laparoscopic Surgeries" },
            { n: 12000, suffix: "+", l: "Hysteroscopic Procedures" },
            { n: 27000, suffix: "+", l: "OPD Consultations" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center py-5 px-4 rounded-2xl bg-white border cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* FIXED COUNTUP */}
              <span className="text-3xl font-bold text-(--secondary-text) group-hover:scale-105 transition-transform duration-200">
                {statsInView && (
                  <CountUp
                    start={0}
                    end={s.n}
                    duration={3}
                    separator=","
                    suffix={s.suffix}
                  />
                )}
              </span>

              <span className="text-[10px] uppercase tracking-widest text-gray-700 font-medium mt-1 text-center">
                {s.l}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}