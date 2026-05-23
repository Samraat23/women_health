

// "use client";
// import Image from "next/image";

// import { ArrowLeft, ArrowRight, BabyIcon } from "lucide-react";

// const bgColors = [
//   "bg-rose-400",
//   "bg-pink-500",
//   "bg-fuchsia-500",
//   "bg-purple-500",
//   "bg-violet-500",
//   "bg-indigo-500",
//   "bg-blue-500",
//   "bg-sky-500",
//   "bg-cyan-500",
//   "bg-teal-500",
//   "bg-emerald-500",
//   "bg-green-500",
// ];

// export default function SurgeryCategory({ data }: any) {
//   const section = data?.[0];
//   const surgeries = section?.surgery || [];

//   return (
//     <section className="w-full h-200 mx-4 relative overflow-hidden">

//       {/* Dot background */}
//       <div
//         className="absolute inset-0 -z-10"
//         style={{
//           backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
//           backgroundSize: "28px 28px",
//         }}
//       />

//       {/* Heading */}
//       <div className="my-16 text-center">
//         <h1 className="text-4xl font-bold mb-4 text-black">
//           {section?.title}
//         </h1>
//         <p className="text-black text-lg">
//           {section?.highlight}
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="flex gap-8 justify-between">
//         {surgeries.map((item: any, i: number) => (
//           <SurgeryCard
//             key={item.id}
//             data={item}
//             bg={bgColors[i % bgColors.length]}
          
//           />
//         ))}
//       </div>

//       <div className="flex gap-8 mt-10 justify-center" >
//         <div className="w-16 hover:scale-105 duration-200 easy-in-out h-16 cursor-pointer  flex justify-center items-center rounded-full border border-black" >
//           <ArrowLeft className="text-black"  size={30} /></div>
//         <div className="w-16 h-16 cursor-pointer  flex justify-center items-center rounded-full border  hover:scale-105 duration-200 easy-in-out border-black" ><ArrowRight size={30} className="text-black" /></div>
//       </div>
//     </section>
//   );
// }

// function SurgeryCard({
//   data,
//   bg,
// }: {
//   data: any;
//   bg: string;
// }) {
//   return (
//     <div
//       className={`w-96 flex-shrink-0 h-120 p-4 rounded-md border cursor-pointer text-white ${bg}
//       transition-transform duration-200 hover:-translate-y-[2px]`}
//     >
//       <div className="h-10">
//         <BabyIcon size={30} />
//       </div>

//       <div className="text-2xl font-semibold  pb-4">
//         {data.name}
//       </div>

//       <div className="p-4 border rounded-sm overflow-hidden relative h-64 my-4" >
//             <Image src={data.img} alt="kk" fill className="object-cover" />
//       </div>

//       <div className="flex my-2  items-end gap-2">
//         <div className="w-[70%] line-clamp-3 text-sm">
//           {data.description}
//         </div>

//         <div className="w-[30%] flex justify-end">
//           <div className="p-2 rounded-full w-10 h-10 border flex items-center justify-center">
//             <ArrowRight />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Scissors } from "lucide-react";

const ICONS: Record<string, string> = {
  default: "✦",
  laparoscopy: "⚕",
  hysterectomy: "♀",
  myomectomy: "◈",
  cyst: "◉",
  endometriosis: "✿",
  tubal: "⟳",
  repair: "◆",
};

const CARD_WIDTH = 340;
const CARD_GAP = 24;

export default function SurgeryCategory({ data }: any) {
  const section = data?.[0];
  const surgeries = section?.surgery || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = useCallback(
    (dir: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;
      const step = CARD_WIDTH + CARD_GAP;
      const nextIdx =
        dir === "right"
          ? Math.min(activeIdx + 1, surgeries.length - 1)
          : Math.max(activeIdx - 1, 0);
      setActiveIdx(nextIdx);
      container.scrollTo({
        left: nextIdx * step,
        behavior: "smooth",
      });
    },
    [activeIdx, surgeries.length]
  );

  const imgBanner =   "https://images.unsplash.com/photo-1584515933487-779824d29309"

  return (
    <section className="relative my-20 w-full min-h-screen overflow-hidden font-sans">
      {/* ── Full-div background video / image ── */}
      <div className="absolute inset-0 z-0">
        {/* Replace src with a real video for video background */}
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/surgery-bg.jpg"
        >
         
        </video> */}
       

        {/* Fallback / overlay image (shown when video not present) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584515933487-779824d29309)" }}
        />

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-black/80 " />

      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-screen  py-16">

        {/* Header */}
        <div className="max-w-2xl  mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-rose-400" />
            <span className="text-rose-400 text-xs tracking-[0.3em] uppercase font-semibold">
              Surgical Excellence
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight">
            {section?.title || "Gynaecological Surgeries"}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {section?.highlight ||
              "Advanced minimally-invasive procedures performed by expert surgeons for comprehensive women's health care."}
          </p>
        </div>

        {/* ── Scrollable Cards ── */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {surgeries.map((item: any, i: number) => (
            <SurgeryCard key={item.id ?? i} data={item} index={i} />
          ))}
        </div>

        {/* ── Controls Row ── */}
        <div className="flex items-center justify-between mt-10">
          {/* Progress dots */}
          <div className="flex gap-2">
            {surgeries.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIdx(i);
                  scrollRef.current?.scrollTo({
                    left: i * (CARD_WIDTH + CARD_GAP),
                    behavior: "smooth",
                  });
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIdx
                    ? "w-8 h-2 bg-(--primary-text)"
                    : "w-2 h-2 bg-white/30 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={activeIdx === 0}
              className={`group w-14 h-14 rounded-full border flex items-center justify-center
                transition-all duration-200
                ${activeIdx === 0
                  ? "border-white/20 text-white/20 cursor-not-allowed"
                  : "border-white/50 cursor-pointer text-white hover:border-(--primary-text) hover:text-(--primary-text) hover:scale-110 hover:bg-white/5"
                }`}
            >
              <ArrowLeft size={22} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={activeIdx === surgeries.length - 1}
              className={`group w-14 h-14 rounded-full border flex items-center justify-center
                transition-all duration-200
                ${activeIdx === surgeries.length - 1
                  ? "border-white/20 text-white/20 cursor-not-allowed"
                  : "border-white/50 cursor-pointer text-white hover:border-(--primary-text) hover:text-(--primary-text) hover:scale-110 hover:bg-white/5"
                }`}
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Surgery Card
───────────────────────────────────────────── */
function SurgeryCard({ data, index }: { data: any; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-85 rounded-2xl overflow-hidden cursor-pointer
                 border  backdrop-blur-md bg-white/10
                  hover:bg-white/10
                 transition-all duration-500 group"
      style={{ transform: hovered ? "translateY(-6px)" : "translateY(0)" }}
    >
      {/* Image */}
      <div className="relative  h-55 overflow-hidden">
        <Image
          src={data.img || "/placeholder.jpg"}
          alt={data.name}
          fill
          className=" transition-transform duration-700 group-hover:scale-102"
        />
        {/* Image overlay */}
        <div className="absolute inset-0 " />

        {/* Index badge */}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-(--primary-text) backdrop-blur
                        flex items-center justify-center text-white text-xs font-bold">
          {String(index + 1).padStart(2, "0")}
        </div>

      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        {/* Name */}
        <h3 className="text-xl font-bold text-white leading-snug">
          {data.name}
        </h3>

        {/* Divider */}
        <div className="w-10 h-0.5 bg-(--primary-text) rounded-full
                        transition-all duration-300 group-hover:w-20" />

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
          {data.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-(--primary-text) text-xs tracking-widest uppercase font-semibold">
            Learn More
          </span>
          <div
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                       group-hover:border-(--primary-text) 
                       transition-all duration-300"
          >
            <ArrowRight size={15} className="text-white group-hover:text-(--primary-text) transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}



