import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
} from "lucide-react";

function DoctorBanner() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm">
      <div className="bg-[linear-gradient(135deg,var(--primary-text-color),var(--secondary-color),var(--primary-color))] p-6 text-white">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
          <Stethoscope size={14} />
          Gynecologist
        </div>

        <p className="text-2xl font-black leading-tight">
          Dr. Kusum Lata Bhardwaj
        </p>

        <p className="mt-2 text-sm leading-6 text-white/75">
          Expert pregnancy care, women health consultation, prenatal guidance,
          and safe motherhood support.
        </p>
      </div>

      <div className="p-5">
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#f7f4ee] p-4">
            <Star size={18} className="mb-2 text-yellow-500" />
            <p className="text-lg font-black text-[var(--primary-text-color)]">
              15+
            </p>
            <p className="text-xs text-[#667085]">Years Exp.</p>
          </div>

          <div className="rounded-2xl bg-[#f7f4ee] p-4">
            <ShieldCheck size={18} className="mb-2 text-green-600" />
            <p className="text-lg font-black text-[var(--primary-text-color)]">
              Trusted
            </p>
            <p className="text-xs text-[#667085]">Care</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            "Pregnancy consultation",
            "High-risk pregnancy care",
            "Normal delivery guidance",
            "PCOS & women health care",
            "Ultrasound & prenatal tests advice",
          ].map((item) => (
            <div key={item} className="flex gap-3 text-sm text-[#4b5563]">
              <CheckCircle2
                size={18}
                className="shrink-0 text-[var(--primary-color)]"
              />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-[#f7f4ee] p-4">
          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-[var(--primary-color)]" />
            <div>
              <p className="text-sm font-black text-[var(--primary-text-color)]">
                Book Appointment
              </p>
              <p className="text-xs text-[#667085]">
                Quick WhatsApp consultation booking
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://wa.me/919289140812"
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-color)] px-5 py-3 text-sm font-black text-white transition hover:opacity-90"
        >
          <Phone size={17} />
          Book Now
        </a>
      </div>
    </div>
  );
}

export default DoctorBanner;