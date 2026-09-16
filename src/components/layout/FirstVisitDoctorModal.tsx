"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

import BookingButton from "@/components/booking/BookingButton";
import { useBooking } from "@/components/booking/BookingProvider";

const doctorPortrait = "/image/dr-kusum-lata-bhardwaj.jpg";

const homePageModalDelayMs = 1200;
// Saved once the popup has shown, so it only greets a visitor's first landing.
const seenStorageKey = "kgc-first-visit-popup:seen";

// Also kept in memory for browsers that block storage: there it can return on
// a later visit, but not when the visitor comes back to the home page.
let hasBeenSeenThisLoad = false;

function hasSeenPopup() {
  if (hasBeenSeenThisLoad) {
    return true;
  }

  try {
    return window.localStorage.getItem(seenStorageKey) !== null;
  } catch {
    return false;
  }
}

function rememberPopupSeen() {
  hasBeenSeenThisLoad = true;

  try {
    window.localStorage.setItem(seenStorageKey, "1");
  } catch {
    // Storage is blocked; the in-memory flag still covers this visit.
  }
}

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
  const [lastPathname, setLastPathname] = useState(pathname);
  const { hasOpenedBooking } = useBooking();
  // A visitor who already opened the booking form doesn't need this prompt,
  // and its timer could otherwise pop it up over that form.
  const isVisible = isOpen && pathname === "/" && !hasOpenedBooking;

  // Leaving the page (e.g. with the browser's back button) counts as closing
  // it, so coming back to the home page doesn't show it a second time.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (pathname !== "/" || hasSeenPopup()) {
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

    rememberPopupSeen();

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
    // Scrolls as a whole on screens too short for the card (small or landscape
    // phones), so the booking button is never cut off.
    <div className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain bg-slate-950/58 backdrop-blur-sm">
      <div
        className="flex min-h-full items-center justify-center p-4 sm:p-6"
        onMouseDown={(event) => {
          // Only a press on the backdrop closes it, not one inside the card.
          if (event.target === event.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        {/* Phones and tablets stack the card; desktops put the intro beside
            the details so it fits laptop screens without scrolling. */}
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="doctor-modal-title"
          className="relative w-full max-w-[400px] overflow-hidden rounded-[24px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:max-w-[440px] sm:rounded-[28px] md:max-w-[500px] lg:grid lg:max-w-[900px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:rounded-[32px]"
        >
          <button
            type="button"
            aria-label="Close doctor popup"
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 z-20 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/16 text-white backdrop-blur transition hover:bg-white/26 sm:right-4 sm:top-4 sm:h-10 sm:w-10 lg:right-5 lg:top-5 lg:bg-[#f4f1ec] lg:text-[#21165f] lg:hover:bg-[#ebe6de]"
          >
            <X size={18} />
          </button>

          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#21165f_0%,#392d83_48%,#5a4ffe_100%)] p-5 text-white sm:p-7 lg:flex lg:flex-col lg:justify-center lg:p-10">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:70px_70px]" />

            <div className="relative z-10 flex items-start gap-3 sm:gap-5 lg:flex-col-reverse lg:gap-7">
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/16 px-3 py-1.5 text-xs font-black text-white backdrop-blur sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
                  <Stethoscope className="h-[15px] w-[15px] sm:h-[17px] sm:w-[17px]" />
                  Gynecologist
                </div>

                <h2
                  id="doctor-modal-title"
                  className="mt-3 text-xl font-black leading-[1.12] tracking-normal text-white min-[360px]:text-[22px] sm:mt-4 sm:text-[28px] md:text-[30px] lg:text-[34px]"
                >
                  Dr. Kusum Lata Bhardwaj
                </h2>

                <p className="mt-2 text-[13px] font-medium leading-5 text-white/76 sm:mt-3 sm:text-sm sm:leading-6 md:text-[15px] lg:text-base lg:leading-7">
                  Expert pregnancy care, women health consultation, prenatal
                  guidance, and safe motherhood support.
                </p>
              </div>

              {/* Starts below the close button that sits above it. */}
              <div className="relative mt-9 h-[88px] w-16 shrink-0 overflow-hidden rounded-t-[20px] rounded-b-xl border border-white/20 bg-white/12 shadow-[0_18px_44px_rgba(15,23,42,0.22)] min-[360px]:h-24 min-[360px]:w-[72px] sm:mt-10 sm:h-28 sm:w-[88px] sm:rounded-t-[26px] sm:rounded-b-2xl md:h-32 md:w-24 lg:mt-0 lg:h-48 lg:w-36 lg:rounded-t-[40px] lg:rounded-b-3xl">
                <Image
                  src={doctorPortrait}
                  alt="Dr. Kusum Lata Bhardwaj"
                  fill
                  sizes="(min-width: 1024px) 144px, 96px"
                  className="object-cover object-[center_18%]"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(33,22,95,0)_0%,rgba(33,22,95,0.58)_100%)]" />
              </div>
            </div>
          </div>

          <div className="p-5 pt-4 sm:p-7 sm:pt-6 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:pb-9 lg:pt-16">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
              <div className="rounded-2xl bg-[#f4f1ec] p-3 sm:rounded-[20px] sm:p-4">
                <Star className="h-5 w-5 text-[#f4aa00] sm:h-6 sm:w-6" />
                <p className="mt-2 text-xl font-black leading-none text-[#21165f] sm:mt-3 sm:text-2xl lg:text-[28px]">
                  19+
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:mt-1.5 sm:text-sm">
                  Years Exp.
                </p>
              </div>

              <div className="rounded-2xl bg-[#f4f1ec] p-3 sm:rounded-[20px] sm:p-4">
                <ShieldCheck className="h-5 w-5 text-[#06a84f] sm:h-6 sm:w-6" />
                <p className="mt-2 text-xl font-black leading-none text-[#21165f] sm:mt-3 sm:text-2xl lg:text-[28px]">
                  Trusted
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:mt-1.5 sm:text-sm">
                  Care
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
              {carePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-[13px] font-medium leading-snug text-slate-600 sm:gap-3 sm:text-[15px] md:text-base"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-[#5a4ffe] text-[#5a4ffe] sm:h-6 sm:w-6">
                    <Check
                      strokeWidth={4}
                      className="h-2.5 w-2.5 sm:h-[13px] sm:w-[13px]"
                    />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#f4f1ec] p-3 sm:mt-5 sm:gap-3.5 sm:rounded-[20px] sm:p-4">
              <CalendarDays className="h-[22px] w-[22px] shrink-0 text-[#5a4ffe] sm:h-7 sm:w-7" />
              <div className="min-w-0">
                <p className="text-[15px] font-black leading-tight text-[#21165f] sm:text-lg">
                  Book Appointment
                </p>
                <p className="mt-0.5 text-xs font-medium leading-tight text-slate-500 sm:mt-1 sm:text-sm">
                  Quick WhatsApp consultation booking
                </p>
              </div>
            </div>

            <BookingButton
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#5a4ffe] px-6 text-[15px] font-black text-white shadow-[0_18px_36px_rgba(90,79,254,0.24)] transition hover:-translate-y-0.5 hover:bg-[#463ee8] sm:mt-5 sm:h-[52px] sm:gap-3 sm:rounded-[17px] sm:text-lg"
            >
              <PhoneCall className="h-[19px] w-[19px] sm:h-[23px] sm:w-[23px]" />
              Book Now
            </BookingButton>
          </div>
        </section>
      </div>
    </div>
  );
}
