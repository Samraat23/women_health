"use client";

import { AnimBox } from "../../../../utils/AnimBox";

function AboutSection() {
  const badges = [
    { icon: "🎓", label: "PGIMER Alumna" },
    { icon: "🏥", label: "AIIMS Faculty" },
    { icon: "💉", label: "Laparoscopy Expert" },
  ];

  return (
    <section className="bg-(--background) py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* IMAGE */}
          <AnimBox from="left">
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] shadow-2xl">
                <img
                  src="https://drkusumlata.in/Image/aboutus.webp"
                  alt="Dr. Kusum Lata"
                  className="w-full h-[650px] object-cover object-top"
                />
              </div>

              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-3xl shadow-xl">
                🏥
              </div>

              <div className="absolute bottom-6 -right-4 bg-[var(--secondary-color)] rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-purple-300 text-xs font-bold uppercase tracking-widest">
                  Clinic Location
                </p>

                <p className="text-white font-bold text-sm mt-1">
                  Sushant Lok-2
                </p>

                <p className="text-white/60 text-xs">
                  Sector 55, Gurgaon
                </p>
              </div>
            </div>
          </AnimBox>

          {/* CONTENT */}
          <AnimBox from="right" delay={0.15}>
            <p className="text-[var(--primary-text)] font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Who She Is
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--primary-text-color)] leading-tight mb-6">
              Redefining Women's
              <br />
              <span className="text-[var(--primary-color)]">
                Healthcare Excellence
              </span>
            </h2>

            <p className="text-slate-600 leading-8 mb-5">
              Dr. Kusum Lata is a renowned Gynecologist and Laparoscopic
              Surgeon with experience at premier institutions including
              <strong> PGI Chandigarh, AIIMS New Delhi,</strong> and
              <strong> PGIMS Rohtak.</strong>
            </p>

            <p className="text-slate-600 leading-8 mb-5">
              She completed her MD in Obstetrics & Gynecology from
              <strong> PGIMER Chandigarh</strong> and served as Consultant and
              Faculty at AIIMS New Delhi.
            </p>

            <p className="text-slate-600 leading-8 mb-8">
              She specializes in high-risk pregnancy care, infertility
              treatment, adolescent health issues, and advanced laparoscopic
              surgeries with compassionate patient-focused care.
            </p>

            {/* BADGES */}
            <div className="flex flex-wrap gap-6">
              {badges.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 flex items-center justify-center text-2xl mx-auto mb-2">
                    {item.icon}
                  </div>

                  <p className="text-sm font-semibold text-[var(--primary-text-color)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimBox>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;