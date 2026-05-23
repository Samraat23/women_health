"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NavbarPregnancyItem from "./NavbarPregnancyItem";
import Link from "next/link";
import logo from '../(assets)/ logo.png'
import Image from "next/image";
import Cbutton from "../(dynamiccomponent)/Button";

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
    { id: 7, name: "Cosmetic Gyne",redirect :"cosmetic" },
    
  ];

  const activeItem = menuBar.find((i) => i.name === activeMenu);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className=" relative  max-w-7xl  z-50  mx-auto mt-4 bg-(--foreground) backdrop-blur-3xl  border border-(--border)/15 rounded-xl shadow-lg p-4"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* NAVBAR */}
      <div className="flex  items-center justify-between">
        {/* Logo */}
        <div className=" relative w-30 h-15 ">
          <Link href={"/"} >
          <Image src={logo} alt="logo" fill className="object-cover" />
          </Link>
          
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-6 font-medium
         text-(--secondary-text)">
          {menuBar.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => item.subMenu && setActiveMenu(item.name)}
              className="flex group  items-center gap-1 cursor-pointer "
            >
              <Link href={item.redirect} >{item.name}</Link>
              
              {item.subMenu && <ChevronDown size={16} className="group-hover:rotate-180 group-hover:scale-120  duration-200 transition-transform " />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Cbutton name="Book Appointment" />
      
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
