import { CalendarCheck, MapPin, MessageCircle, Phone } from "lucide-react";

import { AnimBox } from "../../../../utils/AnimBox";

function CTASection() {
  return (
    <section className="bg-[var(--background)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimBox>
          <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 py-12 text-center shadow-[0_30px_70px_rgba(27,20,99,0.18)] sm:px-8 lg:px-12 lg:py-16">
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:78px_78px]" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[var(--primary-color)] shadow-[0_16px_34px_rgba(27,20,99,0.16)]">
                <CalendarCheck size={28} />
              </span>

              <h2 className="mt-6 font-[var(--font-primary)] text-3xl font-black leading-tight text-white sm:text-5xl">
                Ready to take the first step?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-white/74">
                Consult Dr. Kusum Lata for expert, compassionate gynecological
                care. Book your appointment today.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="https://wa.me/919289140812"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
                <a
                  href="tel:9289140812"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
                >
                  <Phone size={18} />
                  +91 92891 40812
                </a>
              </div>

              <p className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold leading-5 text-white/68 backdrop-blur-md">
                <MapPin size={16} className="shrink-0" />
                287, Fourth Floor, A1 Block, Sushant Lok-2, Sector 55, Gurgaon
                - 122011
              </p>
            </div>
          </div>
        </AnimBox>
      </div>
    </section>
  );
}

export default CTASection;
