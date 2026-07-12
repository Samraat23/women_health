"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  Baby,
  CalendarDays,
  Smile,
  Stethoscope,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import DoctorImageWithPattern from "@/components/shared/DoctorImageWithPattern";

const aboutExperience = [
  { id: 1, title: "Surgeries", number: 7000, suffix: "+", icon: Stethoscope },
  { id: 2, title: "Pregnancy Care", number: 5000, suffix: "+", icon: Baby },
  { id: 3, title: "Years Experience", number: 19, suffix: "+", icon: Award },
  { id: 4, title: "Happy Patients", number: 98, suffix: "%", icon: Smile },
];

function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(90,79,254,0.22),transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <DoctorImageWithPattern className="pb-5" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl lg:mx-0"
        >
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-color)] sm:text-sm sm:tracking-[0.2em]">
            Know About Dr. Kusum Lata
          </p>

          <h2 className="font-[var(--font-primary)] text-2xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl lg:text-5xl">
            Dedicated Women&apos;s Wellness with AIIMS New Delhi Experience
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8 md:mt-5">
            Dr. Kusum Lata is an experienced Gynecologist, Obstetrician and
            Laparoscopic Surgeon with deep expertise in high-risk pregnancy care,
            infertility treatment, and advanced gynecological surgeries.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4">
            {aboutExperience.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="min-h-[112px] rounded-lg border border-[var(--border)]/10 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(27,20,99,0.10)] md:min-h-[132px] md:p-4"
                >
                  <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                    <Icon size={20} />
                  </span>
                  <p className="font-[var(--font-primary)] text-xl font-black text-[var(--primary-text-color)] md:text-2xl">
                    <CountUp end={item.number} start={0} duration={3} suffix={item.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#667085]">{item.title}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
            <Link
              href="https://wa.me/919289140812"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_28px_rgba(90,79,254,0.24)] transition hover:-translate-y-0.5 md:px-6 md:py-4"
            >
              <CalendarDays size={18} />
              Book Appointment
            </Link>
            <Link
              href="https://wa.me/919289140812"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--primary-color)]/25 bg-white px-5 py-3.5 text-sm font-black text-[var(--secondary-text)] transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] md:px-6 md:py-4"
            >
              <Video size={18} />
              Video Consultation
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-black text-[var(--primary-color)] transition hover:bg-white md:py-4"
            >
              Read More
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutUs;
