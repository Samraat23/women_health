
import Image from "next/image"

import doctor from "../(assets)/ kusumLata.png"

export default function DoctorImageWithPattern() {
  return (
    <>
       <style>{`
        @keyframes ripplePulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .ring2 { animation: ripplePulse 2.5s ease-out infinite 0.6s; }
        .ring3 { animation: ripplePulse 2.5s ease-out infinite 1.2s; }
        .ring4 { animation: ripplePulse 2.5s ease-out infinite 1.8s; }
      `}</style>

      <div className="relative w-full h-150 flex items-center justify-center overflow-hidden rounded-full">

        {/* BACKGROUND RIPPLE */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at center,
                #f56a4d 22%,
                #f56a4d 42%,
                #ee5b40 42%,
                #ee5b40 62%,
                #e44f37 62%,
                #e44f37 82%,
                transparent 82%
              )
            `,
          }}
        />

        {/* RIPPLE PULSE RINGS */}
        <div className="ring2 absolute rounded-full border-8 border-[#f56a4d] opacity-60 w-[520px] h-[520px]" />
        <div className="ring3 absolute rounded-full border-8 border-[#ee5b40] opacity-60 w-[520px] h-[520px]" />
        <div className="ring4 absolute rounded-full border-8 border-[#e44f37] opacity-60 w-[520px] h-[520px]" />

        {/* IMAGE */}
        <div className="relative w-90 h-90 rounded-full overflow-hidden">
          <Image
            src={doctor}
            alt="Dr Kusum Lata"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

      </div>
    </>
  )
}

// #fb7a5a 0%,
// #fb7a5a 22%,


