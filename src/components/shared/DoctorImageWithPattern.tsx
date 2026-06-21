import Image from "next/image";
import { Award, HeartPulse, MapPin, ShieldCheck } from "lucide-react";

import doctor from "@/assets/ kusumLata.png";

type DoctorImageWithPatternProps = {
  className?: string;
  priority?: boolean;
};

const trustBadges = [
  {
    icon: ShieldCheck,
    label: "AIIMS New Delhi",
    value: "Faculty experience",
  },
  {
    icon: HeartPulse,
    label: "Women treated",
    value: "10k+ patients",
  },
];

export default function DoctorImageWithPattern({
  className = "",
  priority = false,
}: DoctorImageWithPatternProps) {
  return (
    <figure
      className={`relative isolate mx-auto w-full max-w-[440px] ${className}`}
      aria-label="Dr. Kusum Lata portrait with professional highlights"
    >
      <style>{`
        @keyframes softFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        .doctor-float { animation: softFloat 6s ease-in-out infinite; }
      `}</style>

      <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/80 bg-[#fffaf7] shadow-[0_28px_70px_rgba(27,20,99,0.16)]">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(90,79,254,0.16),rgba(255,255,255,0)_42%),linear-gradient(315deg,rgba(239,110,83,0.20),rgba(255,255,255,0)_38%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(#5a4ffe_1px,transparent_1px),linear-gradient(90deg,#5a4ffe_1px,transparent_1px)] [background-size:34px_34px]" />

        <div className="absolute left-1/2 top-[18%] h-[58%] w-[70%] -translate-x-1/2 rounded-full border border-[#5a4ffe]/20" />
        <div className="absolute left-1/2 top-[24%] h-[46%] w-[58%] -translate-x-1/2 rounded-full border border-[#ef6e53]/25" />

        <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-[180px] bg-[linear-gradient(180deg,rgba(90,79,254,0.18),rgba(49,40,90,0.92))]" />

        <Image
          src={doctor}
          alt="Dr. Kusum Lata"
          fill
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 55vw, 92vw"
          className="doctor-float object-contain object-bottom drop-shadow-[0_22px_24px_rgba(27,20,99,0.22)]"
          priority={priority}
        />

        <figcaption className="absolute inset-x-4 bottom-4 rounded-lg border border-white/70 bg-white/95 p-4 shadow-[0_16px_36px_rgba(27,20,99,0.14)] backdrop-blur">
          <p className="text-sm font-black text-[var(--primary-text-color)]">
            Dr. Kusum Lata Bhardwaj
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-600">
            MD Obstetrics & Gynaecology, Laparoscopic Surgeon
          </p>
        </figcaption>
      </div>

      <div className="absolute left-3 top-4 rounded-lg border border-white/80 bg-white/95 px-3 py-2 shadow-[0_12px_26px_rgba(27,20,99,0.12)] sm:-left-5 sm:top-10">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5a4ffe]/10 text-[var(--primary-color)]">
            <Award size={18} />
          </span>
          <span>
            <span className="block text-base font-black leading-none text-[var(--primary-text-color)]">
              17+
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Years
            </span>
          </span>
        </div>
      </div>

      <div className="absolute right-3 top-[28%] space-y-3 sm:-right-6">
        {trustBadges.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-lg border border-white/80 bg-white/95 px-3 py-2 shadow-[0_12px_26px_rgba(27,20,99,0.12)]"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ef6e53]/10 text-[#df5f45]">
                  <Icon size={16} />
                </span>
                <span>
                  <span className="block text-xs font-black text-[var(--primary-text-color)]">
                    {item.label}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-500">
                    {item.value}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute -bottom-4 left-1/2 w-[82%] -translate-x-1/2 rounded-lg border border-white/80 bg-[var(--secondary-color)] px-4 py-3 text-white shadow-[0_18px_42px_rgba(27,20,99,0.22)]">
        <div className="flex items-center justify-center gap-2 text-center text-xs font-bold sm:text-sm">
          <MapPin size={16} className="shrink-0 text-[#f8b7a8]" />
          <span>Golf Course Road, Gurgaon</span>
        </div>
      </div>
    </figure>
  );
}
