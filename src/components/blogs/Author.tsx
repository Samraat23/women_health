"use client";

import React from "react";
import Image from "next/image";
import type { BlogAuthor } from "@/data/BlogData";

type AuthorProps = {
  data: BlogAuthor;
};

function Author({ data }: AuthorProps) {
  return (
    <section className="rounded-2xl border border-[#eadfd5] bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5a4ffe]">
            {data.label}
          </p>

          <p className="mt-1 text-base font-black text-[#21145f]">
            {data.name}
          </p>

          <p className="text-xs font-medium text-[#667085]">
            {data.designation}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Author;