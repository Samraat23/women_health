import Image from "next/image";
import { BadgeCheck, MapPin, Stethoscope } from "lucide-react";

const doctor = "/image/dr-kusum-lata.png";
const brandGradient =
  "bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))]";

type DoctorImageWithPatternProps = {
  // Replace the default 4:5 shape, e.g. to stretch to a neighbouring column.
  className?: string;
  priority?: boolean;
};

export default function DoctorImageWithPattern({
  className = "",
  priority = false,
}: DoctorImageWithPatternProps) {
  return (
    <figure
      className={`relative isolate mx-auto aspect-[4/5] w-full max-w-[460px] ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[36px] bg-[radial-gradient(45%_32%_at_50%_35%,rgba(255,255,255,0.22),transparent_70%),radial-gradient(60%_45%_at_15%_0%,rgba(160,152,255,0.55),transparent_70%),radial-gradient(55%_40%_at_100%_100%,rgba(239,110,83,0.28),transparent_70%),linear-gradient(165deg,#5a4ffe_0%,#3a2fb2_50%,#1b1463_100%)] shadow-[0_30px_70px_rgba(27,20,99,0.3)] ring-1 ring-white/20">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[35%] aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[35%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
        />

        {/* Wider than the card, so a tall card sizes the portrait by its height
            and the card's rounded corners crop the shoulders. */}
        <div className="absolute inset-x-[-15%] bottom-0 top-[7%]">
          <Image
            src={doctor}
            alt="Dr. Kusum Lata Bhardwaj"
            fill
            sizes="(min-width: 1024px) 680px, (min-width: 640px) 600px, 120vw"
            className="object-contain object-bottom"
            priority={priority}
          />
        </div>

        {/* Darkens the white coat so the glass caption stays readable. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(0deg,rgba(27,20,99,0.92)_0%,rgba(27,20,99,0.55)_45%,rgba(27,20,99,0)_100%)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[-3%] top-[-3%] z-10 grid aspect-square w-[26%] min-w-24 max-w-[132px] place-items-center rounded-full bg-white shadow-[0_14px_34px_rgba(27,20,99,0.22)]"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full motion-safe:animate-spin"
          style={{ animationDuration: "24s" }}
        >
          <defs>
            <path
              id="doctor-badge-ring"
              d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="fill-[var(--primary-text-color)] text-[8.5px] font-black">
            <textPath
              href="#doctor-badge-ring"
              textLength="228"
              lengthAdjust="spacing"
            >
              GYNECOLOGIST • LAPAROSCOPIC SURGEON •
            </textPath>
          </text>
        </svg>
        <span
          className={`grid aspect-square w-[44%] place-items-center rounded-full text-white ${brandGradient}`}
        >
          <Stethoscope className="size-[48%]" />
        </span>
      </div>

      <figcaption className="absolute inset-x-4 bottom-4 z-10 rounded-3xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
        <p className="flex items-center gap-1.5 text-base font-black sm:text-lg">
          Dr. Kusum Lata Bhardwaj
          <BadgeCheck
            size={18}
            aria-hidden="true"
            className="shrink-0 text-[#c7c2ff]"
          />
        </p>
        <p className="mt-1 text-xs font-bold text-white/75 sm:text-sm">
          MD Obs &amp; Gynae · Laparoscopic Surgeon
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-white/75">
          <MapPin size={14} aria-hidden="true" className="shrink-0" />
          Golf Course Road, Gurgaon
        </p>
      </figcaption>
    </figure>
  );
}
