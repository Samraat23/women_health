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
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeader headingObj={headingObj} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      className="group h-full min-h-[390px] overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)]/10 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-color)]/20 bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
            {Icon ? <Icon size={22} /> : <ShieldCheck size={22} />}
          </div>
          <p className="line-clamp-2 text-base font-black leading-5 text-[var(--primary-text-color)]">
            {item.title}
          </p>
        </div>

        <ArrowRight
          size={25}
          className="-rotate-45 shrink-0 text-[var(--secondary-text)] transition-all duration-200 group-hover:rotate-0 group-hover:text-[var(--primary-color)]"
        />
      </div>

      <div className="px-5 pt-4">
        <p className="line-clamp-2 text-sm leading-6 text-[#667085]">
          {item.description}
        </p>
      </div>

      <div className="relative mx-5 mt-4 h-[210px] overflow-hidden rounded-xl bg-[var(--background)]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </motion.article>
  );
}
