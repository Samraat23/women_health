"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"

import DoctorImageWithPattern from "../(dynamiccomponent)/DoctorImageWithPattern"
import { Stethoscope, Baby, Award, Smile, ArrowRight } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import CountUp from "react-countup"


function AboutUs() {

  const aboutExprince = [
    {
      id: 1,
      title: "Surgery",
      number: 7000,
      suffix: "+",
      icon: Stethoscope,
    },
    {
      id: 2,
      title: "Pregnancy Care",
      number: 5000,
      suffix: "+",
      icon: Baby,
    },
    {
      id: 3,
      title: "Experience",
      number: 19,
      suffix: "+",
      icon: Award,
    },
    {
      id: 4,
      title: "Happy Patients",
      number: 98,
      suffix: "%",
      icon: Smile,
    },
  ];


  const item = (delay: number): Variants => ({
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      },
    },
  });

  const item1 = (delay: number): Variants => ({
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: delay,
        ease: "easeOut",
      },
    },
  });

  return (
    <section className="max-w-7xl overflow-hidden mx-auto my-20">
      <motion.div
        className="flex justify-between items-center  ">
        <motion.div
          variants={item(0.2)}
          initial="hidden"
          whileInView="show"
          animate="visible"
          className="w-[48%]" >
          <DoctorImageWithPattern />
        </motion.div>

        <motion.div
          variants={item1(1)}
          initial="hidden"
          whileInView="show"
          className="w-[45%]">
          <p className="text-(--primary-color) text-sm font-semibold uppercase tracking-widest mb-3">
            Know About Dr. Kusum Lata
          </p>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl text-(--secondary-text) font-bold leading-snug mb-5">
          Dedicated Women’s Wellness with AIIMS New Delhi Experience
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            Dr. Kusum Lata is an experienced Gynecologist, Obstetrician & Laparoscopic Surgeon with 17+ years of expertise.
            She completed her MD in Obstetrics & Gynecology from PGIMER, Chandigarh.
            Trained at premier institutes like AIIMS New Delhi & PGIMS Rohtak, she specializes in advanced women’s healthcare.
            Her expertise includes high-risk pregnancy care, infertility treatment, and laparoscopic gynecological surgeries.
          </p>

          {/* DETAILS — Stats Bar */}
          <div className="flex justify-between items-stretch bg-white border border-(--border)/15 rounded-lg shadow-sm overflow-hidden my-8">
            {aboutExprince.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center py-5 flex-1 ${item.id !== 4 ? "border-r border-[#1a1f4b]/10" : ""
                  }`}
              >
                <p className="text-[#4865ff] text-2xl font-extrabold leading-none">
                  <CountUp end={item.number} start={0} delay={1.5} duration={5} suffix={item.suffix} />
                </p>
                <p className="text-slate-500 text-xs font-medium mt-1 text-center px-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>



          {/* CTA */}
          <h3 className="text-base  text-[#1a1f4b] font-semibold mb-3">
            Book Appointment
          </h3>
          <div className="flex  flex-wrap gap-3">

            <Button size="lg" className="p-5 bg-(--primary-text) hover:scale-105 cursor-pointer hover:duration-150 ease-in-out  shadow-lg">
              Book Appointment
            </Button>

            <Button size="lg" className="p-5  bg-(--primary-text) hover:scale-105 cursor-pointer hover:duration-150 ease-in-out  shadow-lg">
              Video Consulation
            </Button>
            <Button size="lg" variant="outline" className="p-5 text-black hover:scale-105 hover:duration-150 ease-in-out cursor-pointer ">
              Read More <span><ArrowRight size={16} /></span>
            </Button>

          </div>
        </motion.div>


      </motion.div>
    </section>
  )
}

export default AboutUs












