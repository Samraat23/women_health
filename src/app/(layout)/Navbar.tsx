"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import NavbarPregnancyItem from "./NavbarPregnancyItem";
import Link from "next/link";
import logo from '../(assets)/ logo.png'
import Image from "next/image";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuBar = [
    { id: 1, name: "Home", redirect :"/"  },
    { id: 2, name: "About",redirect :"about-us" },
    { id: 7, name: "Endometrosis" , redirect :"endometriosis-treatment" },
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
        { id: 3, name: "Care in Pregnancy" },
      ],
    },
    
    
  ];

  const activeItem = menuBar.find((i) => i.name === activeMenu);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed left-1/2 top-5 z-[100] w-[calc(100%-16px)] max-w-7xl -translate-x-1/2 rounded-[36px] border px-4 transition-all duration-300 md:px-8 
        ${
        isScrolled
          ? "border-white/40 bg-white/75 py-2 shadow-[0_18px_42px_rgba(27,20,99,0.18)] backdrop-blur-2xl"
          : "border-white/20 bg-white/10 py-3 shadow-[0_14px_34px_rgba(27,20,99,0.12)] backdrop-blur-2xl"
      }
      `
    }
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* NAVBAR */}
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <div
          className={`relative h-18 w-18 shrink-0 rounded-full px-4 transition-all duration-300 ${
            isScrolled ? "bg-white/70" : "bg-white/90"
          }`}
        >
          <Link href={"/"}>
            <Image src={logo} alt="logo" fill className="object-cover" />
          </Link>
        </div>

        {/* Menu */}
        <div
          className={`hidden items-center gap-8 text-sm font-black transition-colors md:flex lg:gap-10 ${
            isScrolled ? "text-[var(--primary-text-color)]" : "text-white"
          }`}
        >
          {menuBar.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => item.subMenu && setActiveMenu(item.name)}
              className={`group flex cursor-pointer items-center gap-1 transition-colors ${
                isScrolled
                  ? "hover:text-[var(--primary-color)]"
                  : "hover:text-white/70"
              }`}
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
          className={`hidden shrink-0 rounded-full px-8 py-3.5 text-sm font-black uppercase tracking-wide shadow-[0_10px_24px_rgba(90,79,254,0.28)] transition hover:-translate-y-0.5 md:inline-flex ${
            isScrolled
              ? "bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white"
              : "bg-white text-[var(--primary-text-color)]"
          }`}
        >
          Book Appointment
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-[var(--primary-text-color)] shadow-sm md:hidden"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      
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
              bg-(--secondary-text)
            "
            
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-[28px] border border-white/25 bg-white/78 p-4 shadow-[0_20px_50px_rgba(27,20,99,0.18)] backdrop-blur-2xl md:hidden"
          >
            <div className="grid gap-2">
              {menuBar.map((item) => (
                <Link
                  key={item.id}
                  href={item.redirect}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-black text-[var(--primary-text-color)] transition hover:bg-[var(--primary-color)]/10"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 py-3 text-center text-sm font-black text-white"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
