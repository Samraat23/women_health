"use client"
import React from "react";
import data from "../(data)/db.json";
import Image from "next/image";
import logo from "../(assets)/ logo.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import facebook from "../../../public/image/pngwing.com (3).png"
import instagram from "../../../public/image/pngwing.com (1).png"
import youtube from "../../../public/image/pngwing.com (2).png"

function Footer() {
  const footerData = data.footer;
  const {KusumImage} = data


  return (
    <div className="relative py-16">

      {/* SOCIAL SECTION */}
      <div className="max-w-7xl mx-auto bg-white rounded-[40px] p-10 mb-12 overflow-hidden">

{/* Header */}
<div className="flex justify-between items-center mb-6">
  <h2 className="text-3xl text-(--primary-text) font-bold">
    Our Happy Patient
  </h2>
 
</div>

{/* Auto Scroll */}
<div className="overflow-hidden">
  <motion.div
    className="flex gap-6 w-max"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 60, 
      ease: "linear",
      repeat: Infinity,
    }}
  >
    {[...KusumImage, ...KusumImage].map((item, index) => (
      <div
        key={index}
        className="relative border-2 border-gray-200 w-56 h-56 shrink-0 rounded-3xl overflow-hidden"
      >
        <Image
          src={item.img}
          fill
          alt="social"
          className="object-cover scale-110"
        />
      </div>
    ))}
  </motion.div>
</div>
</div>


      {/* FOOTER SECTION */}
      <div className="max-w-7xl mx-auto bg-white rounded-[40px] p-12 relative">

        <div className="grid  grid-cols-4 gap-10">

          {/* LEFT SIDE */}
          <div  >
            <div className="relative  w-30 h-16 mb-4 ">
              <Image src={logo} alt="KusumLogo" fill className="object-cover" />
            </div>

            <p className="text-(--secondary-text) text-sm leading-relaxed mb-6">
              {footerData?.description}
            </p>

             <Button size="lg" className="px-8 py-6 text-base md:text-lg font-medium bg-(--primary-text)  ">
                              Book Appointment
                            </Button>

            <p className="text-sm text-(--secondary-text) mt-2">
               Address - 287 A1 Block Sushant Lok - 2 Sector-55 Gurgaon Haryana 122002  
            </p>
          </div>


          {/* LINKS */}
          {footerData?.subFooter.map((item) => (
            <div key={item.id}>

              <h3 className="text-lg text-(--primary-text) font-bold mb-5">
                {item.title}
              </h3>

              <ul className="space-y-2 text-md text-(--secondary-text)">
                {item.links.map((link) => (
                  <li key={link.id} className="hover:text-black cursor-pointer">
                    {link.name}
                  </li>
                ))}
              </ul>

              {/* Social icons only for last column */}
              {item.id === "3" && (
                <div className="flex gap-4 mt-6">

                  <div className="w-10 relative cursor-pointer h-10 rounded-full bg-(--secondary-text)">
                    <Image  src={facebook} alt="d" fill className="object-contain" />
                  </div>

                  <div className="w-10 h-10 rounded-full relative">
                  <Image  src={instagram} alt="d" fill className="object-contain" />
                  </div>

                  <div className="w-10 h-10 relative rounded-full flex items-center justify-center">
                  <Image  src={youtube} alt="d" fill className="object-contain" />
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
        {/* BOTTOM BAR */}
        <div className="flex justify-between items-center mt-14 text-sm text-(--secondary-text) ">
               <span></span>
          <div className="px-6 py-3 rounded-full flex items-center gap-6 shadow">
            <span>
            Disclaimer: For educational purposes only, not medical advice. Results may vary. © Copyright 2025, Dr. Kusum Lata | All Rights Reserved.
            </span>
           
          </div>

          <span></span>

        </div>

      </div>

    </div>
  );
}

export default Footer;
