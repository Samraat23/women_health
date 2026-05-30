"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, type Variants } from "framer-motion";

type HospitalLogo = {
  id: number;
  img: string | StaticImageData;
  name: string;
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

export default function AssociationSection({ hospitalLogo }: { hospitalLogo: HospitalLogo[] }) {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--border)]/10 bg-white p-6 shadow-sm md:p-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--primary-color)]">
            Associations
          </p>
          <h2 className="mt-3 font-[var(--font-primary)] text-3xl font-black text-[var(--primary-text-color)] md:text-4xl">
            Trusted Healthcare Network
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#667085]">
            Recognized hospital associations and clinical environments supporting modern
            women&apos;s healthcare.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {hospitalLogo.map((logo) => (
            <motion.div
              key={logo.id}
              variants={item}
              className="flex min-h-28 items-center justify-center rounded-2xl border border-[var(--border)]/10 bg-[var(--background)] p-5 transition hover:bg-white hover:shadow-sm"
            >
              <div className="relative h-16 w-36">
                <Image src={logo.img} alt={logo.name} fill className="object-contain" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
