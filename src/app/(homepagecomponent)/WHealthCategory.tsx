"use client";

import Image from "next/image";
import SectionHeader from "../(dynamiccomponent)/SectionHeader";

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
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeader headingObj={headingObj} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.map((cat) => (
          <CatCard key={cat.id} item={cat} />
        ))}
      </div>
    </section>
  );
}

export default WHealthCategory;

function CatCard({ item }: { item: Item }) {
  return (
    <article className="group flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[var(--border)]/10 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[var(--primary-color)]/15 bg-[var(--background)] p-2">
        <Image
          src={item.img}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-sm font-black leading-5 text-[var(--primary-text-color)]">
        {item.name}
      </p>
    </article>
  );
}
