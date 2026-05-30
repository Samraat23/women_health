"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NavbarPregnancyItem from "./NavbarPregnancyItem";
import Link from "next/link";
import logo from '../(assets)/ logo.png'
import Image from "next/image";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuBar = [
    { id: 1, name: "Home", redirect :"/"  },
    { id: 2, name: "About",redirect :"about-us" },
    { id: 7, name: "Endometrosis" , redirect :"endometrosis" },
    {
      id: 4,
      name: "Women Health",
      redirect :"women-health",

      subMenu:  [
        { 
          id:1,
          name: "We Treatment",
          links: [
            "Abnormal Bleeding",
            "Vaginal Infections",
            "Uterine Disorders",
            "Endometriosis",
            "Ovarian Cysts",
            "Fibroids"
          ],
        },
        {
          id:2,
          name: "Young Women Care",

          links: [
            "Puberty & Menstrual Health",
            "Irregular Periods",
            "PCOS / PCOD",
            "Menstrual Pain",
            "Hygiene & Lifestyle Education"
          ],
          
        },
        {
          id:3,
          name: "Prevent Women Health",
          links: [
            "Annual Checkup",
            "Pap Smear",
            "HPV Screening",
            "Breast Examination",
            "Cervical Cancer Examination"
          ],
          
        },
        {
          id:4,
          name: "Menopause",
          links: [
            "Menopause Management",
            "Hormonal Imbalance",
            "Urinary Problem",
            "Osteoporosis",
            "Lifestyle Counselling"
          ],
    
        },
        {
          id:5,
          name: "Vaccination",
          links: [
            "HPV Vaccination",
            "Flu",
            "Boostrix",
            "Tetanus"
          ],
         
        }
      ]
       
    },
    { id: 5, name: "Surgery" ,redirect :"surgery" },
    {
      id: 6,
      name: "Pregnancy",
      redirect :"pregnancy",
      subMenu: [
        { id: 1, name: "Normal Delivery" },
        { id: 2, name: "Pre-Pregnancy Counseling" },
        { id: 3, name: "Antenatal Care" },
      ],
    },
    
    
  ];

  const activeItem = menuBar.find((i) => i.name === activeMenu);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative z-50 mx-auto mt-1 w-[calc(100%-8px)] max-w-7xl rounded-[42px] border border-[var(--border)]/15 bg-white px-6 py-5 shadow-[0_8px_24px_rgba(27,20,99,0.16)] backdrop-blur-3xl md:px-12"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* NAVBAR */}
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="relative h-14 w-36 shrink-0">
          <Link href={"/"} >
          <Image src={logo} alt="logo" fill className="object-contain" />
          </Link>
          
        </div>

        {/* Menu */}
        <div className="hidden items-center gap-10 text-base font-black text-[var(--secondary-text)] md:flex">
          {menuBar.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => item.subMenu && setActiveMenu(item.name)}
              className="group flex cursor-pointer items-center gap-1 transition-colors hover:text-[var(--primary-color)]"
            >
              <Link href={item.redirect} >{item.name}</Link>
              
              {item.subMenu && <ChevronDown size={16} className="group-hover:rotate-180 group-hover:scale-120  duration-200 transition-transform " />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="https://wa.me/919289140812"
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-10 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_10px_24px_rgba(90,79,254,0.28)] transition hover:-translate-y-0.5 md:inline-flex"
        >
          Book Appointment
        </Link>
      
      </div>


      <AnimatePresence>
        {activeItem?.subMenu && ( 
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="
              absolute 
              left-1/2 
              -translate-x-1/2 
              top-full 
              mt-4 
              w-full 
              mx-auto 
              rounded-3xl 
              backdrop-blur-xl 
              shadow-2xl 
              z-50
            
              bg-blend-color
            "
            style={{ background:
              "linear-gradient(135deg, #1B1463 0%, #31285a 50%, #5a4ffe 100%)",}}
            
          >
            <div className="px-10 py-8  flex justify-between">
              {/* NORMAL SUBMENU */}
              {activeItem.name !== "Women Health" &&
                activeItem.subMenu.map((sub) => (
                  <Link
                    key={sub.id}
                    href={sub.name}
                    className="px-4 py-2 text-white font-black rounded-xl "
                  >
                    {sub.name}
                  </Link>
                ))}

              {/* MEGA MENU */}
              {activeItem.name === "Women Health" && (
                <NavbarPregnancyItem Menu={activeItem}  />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
