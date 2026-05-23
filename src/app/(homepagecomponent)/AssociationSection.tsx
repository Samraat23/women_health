"use client";

import Image from "next/image";
import { motion ,Variants } from "framer-motion";

export default function AssociationSection({ hospitalLogo }: any) {

  // 🔹 Parent container (stagger effect)
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // 🔹 Child animation (each logo)
  const item : Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // 🔹 Section animation (main card)
  const sectionAnimation : Variants = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }} // 👈 smooth trigger
        className="max-w-7xl relative mx-auto border border-(--border) rounded-3xl p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50 shadow-sm"
      >
        
        {/* Floating Heading */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="bg-white px-6 py-2 border rounded-2xl border-(--border)/20 shadow-sm">
            <h2 className="text-center text-sm md:text-lg font-semibold text-indigo-700 whitespace-nowrap">
              Trusted & Secure • Healthcare Standard Integration
            </h2>
          </div>
        </div>

        {/* Logos Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center mt-6"
        >
          {hospitalLogo.map((itemData: any) => (
            <motion.div
              key={itemData.id}
              variants={item}
              className="flex justify-center items-center group"
            >
              <div
                className="relative w-28 h-14 md:w-40 md:h-20 cursor-pointer
                transition duration-300 ease-out
                group-hover:scale-110 group-hover:opacity-100"
              >
                <Image
                  src={itemData.img}
                  alt={itemData.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}