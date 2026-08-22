import Link from "next/link";
import {
  CalendarDays,
  PhoneCall,
  Sparkles,
  Video,
} from "lucide-react";

import DoctorImageWithPattern from "@/components/shared/DoctorImageWithPattern";

const heroStats = [
  { value: "17+", label: "Years experience" },
  { value: "10k+", label: "Patients guided" },
  { value: "3", label: "Premier institutes" },
];

export default function HeroSection() {
  return (
    <section
      data-nav-surface="dark"
      className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:82px_82px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(247,244,238,0)_0%,rgba(247,244,238,0.88)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:min-h-[660px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="mx-auto max-w-3xl text-center text-white lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
              <Sparkles size={16} className="text-[var(--primary-color)]" />
              About Dr. Kusum Lata
            </div>

            <h1 className=" text-4xl font-black leading-tight tracking-normal text-white  lg:text-5xl">
              Compassionate specialist care, shaped by experience.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-white/82 lg:mx-0 lg:text-lg">
              Meet Dr. Kusum Lata Bhardwaj, a gynecologist and obstetrician
              focused on clear diagnosis, safe planning, and supportive
              follow-through for every patient.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/25 bg-white/14 p-4 text-left shadow-[0_16px_34px_rgba(27,20,99,0.14)] backdrop-blur-md"
                >
                  <p className="font-[var(--font-primary)] text-3xl font-black leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/68">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
              >
                <CalendarDays size={18} />
                Book Appointment
              </Link>
              <Link
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <Video size={18} />
                Video Consultation
              </Link>
              <Link
                href="tel:9289140812"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <PhoneCall size={18} />
                Call Now
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-125 rounded-[38px] border border-white/24 bg-white/12 p-3 shadow-[0_30px_70px_rgba(27,20,99,0.24)] backdrop-blur-md">
              <DoctorImageWithPattern className="pb-5" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
