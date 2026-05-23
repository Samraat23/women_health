"use client";

import React from "react";
import Image from "next/image";
import doctorImage from "../../../public/image/ happypatent.jpeg";

function AuthorDoctor() {
  return (
    <section className=" rounded-2xl border border-[#eadfd5] bg-white p-5 backdrop-blur-md">
         
                         <div className="flex items-center gap-3">
                           <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                             <Image src={doctorImage} alt={"nsm,d"} fill className="object-cover" sizes="56px" />
                           </div>
                           <div>
                             <p className="text-xs uppercase tracking-[0.14em] text-(--primary-text)">Written and reviewed by</p>
                             <h2 className="text-gray-600 text-base font-black">{"Dr. Kusum Lata Bhardwaj"}</h2>
                             <p className="text-xs text-gray-400">{"MD (Obs & Gyn), Laparoscopic Surgeon"}</p>
                           </div>
                         </div>
                      
    </section>
  );
}

export default AuthorDoctor;