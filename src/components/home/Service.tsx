"use client";

import { type StaticImageData } from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import ServiceCard from "@/components/shared/ServiceCard";

type ServiceItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | StaticImageData;
  icon?: string;
};

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

      <div className="grid auto-rows-fr gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {service.map((item) => (
          <ServiceCard
            key={item.id}
            item={item}
            // The category owns its slug: deriving one from the title sent
            // "Fertility & Infertility" to /category/fertility-and-infertility.
            href={`/category/${item.slug}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Service;
