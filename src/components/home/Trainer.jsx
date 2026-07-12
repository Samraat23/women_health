"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Scissors,
} from "lucide-react";

const appointmentHref = "https://wa.me/919289140812";
const readMoreHref = "https://themedicity.com/dr-kusum-lata/";

const trainerImages = [
  {
    img: "/image/ lecturecertificated.jpeg",
    alt: "Training certificate ceremony",
  },
  {
    img: "/image/ lacture.jpeg",
    alt: "Women health lecture session",
  },
  {
    img: "/image/ drkusumlatamedicity.jpeg",
    alt: "Dr. Kusum Lata at Medicity",
  },
  {
    img: "/image/ collegesession.jpeg",
    alt: "Doctors and students attending a training session",
  },
  {
    img: "/image/ partycipate.jpeg",
    alt: "Training participation moment",
  },
  {
    img: "/image/ ujbistan.jpeg",
    alt: "International professional learning moment",
  },
  {
    img: "/image/ medicityfaculty.jpeg",
    alt: "Medicity faculty session",
  },
];

function Trainer({ d }) {
  const trainerData = d || {};
  const images =
    Array.isArray(trainerData.images) && trainerData.images.length
      ? trainerData.images
      : trainerImages;
  const item = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <section className="bg-[var(--background)] px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={item(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/15 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[var(--primary-color)] shadow-sm">
            <Scissors size={16} />
            {trainerData.subtitle}
          </span>

          <h2 className="mt-4 font-[var(--font-primary)] text-2xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl md:mt-5 md:text-5xl">
            {trainerData.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/75 md:mt-5 md:text-base md:leading-8">
            {trainerData.description}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-7 md:gap-4">
            <a
              href={trainerData.primaryCtaUrl || appointmentHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-6 py-3.5 text-sm font-black text-white shadow-[0_14px_28px_rgba(90,79,254,0.24)] transition hover:-translate-y-0.5 md:px-7 md:py-4"
            >
              <CalendarCheck size={18} />
              {trainerData.primaryCta || "Consult for Surgery"}
            </a>
            <Link
              href={trainerData.secondaryCtaUrl || readMoreHref}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--primary-color)]/20 bg-white px-6 py-3.5 text-sm font-black text-[var(--primary-text-color)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--primary-color)]/35 md:px-7 md:py-4"
            >
              {trainerData.secondaryCta}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 md:mt-12">
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:hidden no-scrollbar">
            {images.map((image, index) => (
              <TrainerImage
                key={`${image.img}-${index}`}
                image={image}
                className="h-[220px] min-w-[82%] snap-center"
                delay={index * 0.04}
                item={item}
                featured={index === 3}
              />
            ))}
          </div>

          <motion.div
            variants={item(0.18)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="hidden md:block"
          >
            <div className="grid gap-3 md:h-[560px] md:grid-cols-[0.8fr_0.95fr_1.35fr_0.95fr_0.8fr]">
              <TrainerImage
                image={images[0]}
                className="hidden md:block md:h-[58%] md:self-center"
                delay={0.1}
                item={item}
              />

              <div className="grid gap-3 md:h-[84%] md:self-center">
                <TrainerImage image={images[1]} delay={0.18} item={item} />
                <TrainerImage image={images[2]} delay={0.26} item={item} />
              </div>

              <TrainerImage
                image={images[3]}
                className="min-h-[360px] md:h-full"
                delay={0.34}
                item={item}
                featured
              />

              <div className="grid gap-3 md:h-[84%] md:self-center">
                <TrainerImage image={images[4]} delay={0.42} item={item} />
                <TrainerImage image={images[5]} delay={0.5} item={item} />
              </div>

              <TrainerImage
                image={images[6]}
                className="hidden md:block md:h-[58%] md:self-center"
                delay={0.58}
                item={item}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrainerImage({ image, className = "", delay, item, featured = false }) {
  if (!image?.img) {
    return null;
  }

  return (
    <motion.div
      variants={item(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={`group relative min-h-[180px] overflow-hidden rounded-3xl border border-[var(--border)]/10 bg-[var(--background)] shadow-sm ${className}`}
    >
      <Image
        src={image.img}
        alt={image.alt}
        fill
        sizes={
          featured
            ? "(min-width: 1024px) 360px, 92vw"
            : "(min-width: 1024px) 220px, (min-width: 640px) 45vw, 92vw"
        }
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,99,0)_45%,rgba(27,20,99,0.58)_100%)] opacity-80" />
    </motion.div>
  );
}

export default Trainer;
