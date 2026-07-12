"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { slugify } from "@/components/blogs/Slugify";

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  icon?: string;
};

const iconSet = Icons as unknown as Record<string, LucideIcon>;

const headingObj = {
  budge: "Our Services",
  heading: "Expert Care for",
  bold: "Every Woman",
  paragraph:
    "World-class gynecology and laparoscopic care designed around your comfort and health.",
};

function Service({ service }: { service: ServiceItem[] }) {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 md:px-6 md:py-20">
      <SectionHeader headingObj={headingObj} />

      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {service.map((item) => (
          <Link key={item.id} href={`category/${slugify(item.title)}`} className="block">
            <ServiceCard item={item} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Service;

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon ? iconSet[item.icon] : undefined;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group h-full min-h-[320px] overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white shadow-sm md:min-h-[390px]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)]/10 px-4 py-3.5 md:px-5 md:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-color)]/20 bg-[var(--primary-color)]/10 text-[var(--primary-color)] md:h-11 md:w-11">
            {Icon ? <Icon size={22} /> : <ShieldCheck size={22} />}
          </div>
          <p className="line-clamp-2 text-[15px] font-black leading-5 text-[var(--primary-text-color)] md:text-base">
            {item.title}
          </p>
        </div>

        <ArrowRight
          size={25}
          className="-rotate-45 shrink-0 text-[var(--secondary-text)] transition-all duration-200 group-hover:rotate-0 group-hover:text-[var(--primary-color)]"
        />
      </div>

      <div className="px-4 pt-3 md:px-5 md:pt-4">
        <p className="line-clamp-2 text-sm leading-6 text-[#667085]">
          {item.description}
        </p>
      </div>

      <div className="relative mx-4 mt-3 h-[150px] overflow-hidden rounded-xl bg-[var(--background)] sm:h-[180px] md:mx-5 md:mt-4 md:h-[210px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 390px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </motion.article>
  );
}
