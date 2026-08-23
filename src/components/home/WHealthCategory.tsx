"use client";

import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import Link from "next/link";
import { getTopicHref } from "@/lib/topicRoutes";

type Item = {
  id: number;
  name: string;
  img: string;
};

const headingObj = {
  budge: "Women Health",
  heading: "Specialized Women's",
  bold: "Healthcare",
  paragraph:
    "Expert diagnosis, advanced treatments, and compassionate care for gynecological conditions, fertility concerns, pregnancy, menopause, and overall wellness.",
};

function WHealthCategory({ data }: { data: Item[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      <SectionHeader headingObj={headingObj} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        {data.map((cat) => (
          <Link href={getTopicHref(cat.name)} key={cat.id} className="block h-full">
            <CatCard item={cat} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default WHealthCategory;

function CatCard({ item }: { item: Item }) {
  return (
    <article className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[var(--border)]/10 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:aspect-auto sm:min-h-44 sm:p-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[var(--primary-color)]/15 bg-[var(--background)] p-2 sm:h-24 sm:w-24">
        <Image
          src={item.img}
          alt={item.name}
          fill
          sizes="(min-width: 640px) 96px, 80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <p className="mt-3 text-[13px] font-black leading-5 text-[var(--primary-text-color)] sm:mt-4 sm:text-sm">
        {item.name}
      </p>
    </article>
  );
}
