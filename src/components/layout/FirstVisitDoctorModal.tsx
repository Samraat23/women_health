"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Check,
  PhoneCall,
  ShieldCheck,
  Star,
  Stethoscope,
  X,
} from "lucide-react";

import doctorPortrait from "@/assets/kusummam.jpg";

const homePageModalDelayMs = 1200;
const appointmentHref = "https://wa.me/919289140812";

const carePoints = [
  "Pregnancy consultation",
  "High-risk pregnancy care",
  "Normal delivery guidance",
  "PCOS & women health care",
  "Ultrasound & prenatal tests advice",
];

export default function FirstVisitDoctorModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = isOpen && pathname === "/";

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, homePageModalDelayMs);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-start bg-slate-950/58 px-3 py-2 backdrop-blur-sm sm:justify-center"
      onMouseDown={() => setIsOpen(false)}
    >
      <section
        className="relative max-h-[calc(100dvh-16px)] w-full max-w-[366px] overflow-hidden rounded-[24px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:max-w-[430px] sm:rounded-[26px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close doctor popup"
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/16 text-white backdrop-blur transition hover:bg-white/26"
        >
          <X size={18} />
        </button>

        <div className="overflow-hidden">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#21165f_0%,#392d83_48%,#5a4ffe_100%)] px-4 py-5 text-white sm:px-5">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:70px_70px]" />

            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3.5 py-2 text-xs font-black text-white backdrop-blur sm:text-sm">
                  <Stethoscope size={17} />
                  Gynecologist
                </div>

                <h2
                  id="doctor-modal-title"
                  className="mt-4 text-[26px] font-black leading-[1.08] tracking-normal text-white sm:text-[30px]"
                >
                  Dr. Kusum Lata Bhardwaj
                </h2>

                <p className="mt-3 text-[13px] font-medium leading-6 text-white/76 sm:text-sm">
                  Expert pregnancy care, women health consultation, prenatal
                  guidance, and safe motherhood support.
                </p>
              </div>

              <div className="relative mt-8 h-28 w-20 shrink-0 overflow-hidden rounded-t-[24px] rounded-b-2xl border border-white/20 bg-white/12 shadow-[0_18px_44px_rgba(15,23,42,0.22)] sm:h-32 sm:w-24 sm:rounded-t-[28px]">
                <Image
                  src={doctorPortrait}
                  alt="Dr. Kusum Lata Bhardwaj"
                  fill
                  sizes="96px"
                  className="object-cover object-[center_18%]"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(33,22,95,0)_0%,rgba(33,22,95,0.58)_100%)]" />
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 pt-4 sm:px-5 sm:pt-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[18px] bg-[#f4f1ec] p-3.5 sm:rounded-[20px] sm:p-4">
                <Star size={23} className="text-[#f4aa00]" />
                <p className="mt-3 text-2xl font-black leading-none text-[#21165f] sm:mt-4">
                  19+
                </p>
                <p className="mt-1.5 text-sm font-medium text-slate-500">
                  Years Exp.
                </p>
              </div>

              <div className="rounded-[18px] bg-[#f4f1ec] p-3.5 sm:rounded-[20px] sm:p-4">
                <ShieldCheck size={23} className="text-[#06a84f]" />
                <p className="mt-3 text-2xl font-black leading-none text-[#21165f] sm:mt-4">
                  Trusted
                </p>
                <p className="mt-1.5 text-sm font-medium text-slate-500">
                  Care
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
              {carePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm font-medium leading-tight text-slate-600 sm:text-[15px]"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-[#5a4ffe] text-[#5a4ffe]">
                    <Check size={13} strokeWidth={4} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-3 rounded-[18px] bg-[#f4f1ec] p-3.5 sm:mt-5 sm:rounded-[20px] sm:p-4">
              <CalendarDays size={27} className="shrink-0 text-[#5a4ffe]" />
              <div className="min-w-0">
                <p className="text-base font-black leading-tight text-[#21165f] sm:text-lg">
                  Book Appointment
                </p>
                <p className="mt-1 text-sm font-medium leading-tight text-slate-500">
                  Quick WhatsApp consultation booking
                </p>
              </div>
            </div>

            <Link
              href={appointmentHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 rounded-[16px] bg-[#5a4ffe] px-6 text-base font-black text-white shadow-[0_18px_36px_rgba(90,79,254,0.24)] transition hover:-translate-y-0.5 hover:bg-[#463ee8] sm:mt-5 sm:h-[52px] sm:rounded-[17px] sm:text-lg"
            >
              <PhoneCall size={23} />
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
