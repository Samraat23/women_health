"use client";

import React from "react";
import {
  Flame,
  Droplet,
  Activity,
  Heart,
  Brain,
  Shield,
  Circle,
} from "lucide-react";
import SectionHeader from "../(dynamiccomponent)/SectionHeader";

import Image from "next/image";
/* ================= ICON MAP ================= */


/* ================= TYPES ================= */
type Item = {
  id: number;
  name: string;
  img: string;
};
const headingObj = {
  budge :" OUR SERVICE",
  heading:"Specialized Women’s ",
  bold:"Healthcare",
  paragraph:"Expert diagnosis, advanced treatments, and compassionate care for gynecological conditions, fertility concerns, pregnancy, menopause, and overall women’s wellness."
}

function WHealthCategory({ data }: { data: Item[] }) {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      
      {/* Heading */}
      <SectionHeader headingObj={headingObj} />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {data.map((cat) => {
         
          return <CatCard key={cat.id} item={cat} />;
        })}
      </div>
    </section>
  );
}

export default WHealthCategory;


function CatCard({
  item,
}: {
  item: { id: number; name: string; img: string };
}) {
  return (
    <div className="flex flex-col items-center text-center cursor-pointer group">
      
      {/* Image ONLY */}
      <Image
        src={item.img}
        alt={item.name}
        width={120}
        height={120}
        className="rounded-full hover:scale-105 duration-200 transition-transform ease-in-out border bg-[#fefefe] border-gray-200 drop-shadow-xs  object-cover"
      />

      {/* Title */}
      <p className="mt-3 text-sm font-medium text-(--secondary-text)">
        {item.name}
      </p>
    </div>
  );
}