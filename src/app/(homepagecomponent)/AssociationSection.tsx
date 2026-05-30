"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, type Variants } from "framer-motion";
import SectionHeader from "../(dynamiccomponent)/SectionHeader";

type HospitalLogo = {
  id: number;
  img: string | StaticImageData;
  name: string;
  url: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function AssociationSection({
  hospitalLogo,
}: {
  hospitalLogo: HospitalLogo[];
}) {
  const headingObj = {
    budge: "Associations",
    heading: "Trusted Healthcare",
    bold: "Network",
    paragraph:
      "Recognized hospital associations and clinical environments supporting modern women's healthcare.",
  };

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader headingObj={headingObj} />

        <div className="rounded-[32px] border border-[var(--border)]/10 bg-white p-4 shadow-sm md:p-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4"
          >
            {hospitalLogo.map((logo) => (
              <motion.a
                key={logo.id}
                href={logo.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${logo.name} website`}
                variants={item}
                className="group flex h-32 items-center justify-center rounded-2xl border border-[var(--border)]/10 bg-[var(--background)] px-5 transition hover:-translate-y-1 hover:border-[var(--primary-color)]/20 hover:bg-white hover:shadow-[0_18px_34px_rgba(27,20,99,0.10)] focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/15 sm:h-36"
              >
                <div className="relative h-16 w-40 max-w-full transition duration-300 group-hover:scale-105 sm:w-44">
                  <Image
                    src={logo.img}
                    alt={`${logo.name} logo`}
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
