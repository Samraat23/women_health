"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import SectionHeader from "../(dynamiccomponent)/SectionHeader";
import Link from "next/link";
import { slugify } from "@/components/blogs/Slugify";


/* ================= ICON ================= */
const DynamicIcon = ({ name }: { name: string }) => {
  const Icon = (Icons as any)[name];
  return Icon ? <Icon size={22} /> : null;
};



const headingObj = {
  budge: " OUR SERVICE",
  heading: "Expert Care for",
  bold: "Every Woman",
  paragraph: "World-class gynecology and laparoscopic care designed around your comfort and health."
}


function Service({ service }: any) {
  return (
    <section className="max-w-7xl mx-auto overflow-hidden">
      {/* Heading */}
      <SectionHeader headingObj={headingObj} />
      <div className="flex flex-wrap justify-between gap-5  " >
        {service.map((item: any) => (
          <Link href={`category/${slugify(item.title)}`}>
             <ServiceCard key={item.id} item={item} />
          </Link>
         
        ))}
      </div>

    </section>
  );
}

export default Service;

const ServiceCard = ({ item }: any) => (
  <motion.div
    className="h-100 w-95 flex-shrink-0 cursor-pointer group bg-white rounded-2xl  border border-gray-100"
  >

    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
      <div className="flex gap-3 items-center">
        <div className="w-11 h-11 flex items-center justify-center border-2 border-(--primary-text) text-(--primary-text) rounded-lg">
          <DynamicIcon name={item.icon} />
        </div>        <p className="text-md text-(--primary-text) font-bold">
          {item.title}
        </p>
      </div>

      <ArrowRight
        size={26}
        className="-rotate-45 group-hover:rotate-0 transition-all duration-200 text-gray-900"
      />
    </div>

    {/* Content */}
    <div className="px-5 mt-4">
      <p className="text-sm text-gray-600 line-clamp-2">
        {item.description}
      </p>
    </div>

    {/* Image */}
    <div className="relative mx-5 mt-4 rounded-xl overflow-hidden h-50 ">
      <Image
        src={item.image}
        alt="service"
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />   
      </div>

  </motion.div>
);

