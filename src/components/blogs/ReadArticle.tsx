"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import kusum from "../../../public/image/ happypatent.jpeg";
import SymptomsSection from "./Symptoms";
import Nutrition from "./Nutrition";
import Exercise from "./Exercise";
import BloodTest from "./BloodTest";
import WarningSigns from "./WarningSigns";
import Author from "./Author";
import Consultation from "./Consultation";

function ReadArticle() {
  return (
    <div className="space-y-8">
      <motion.section
        id="introduction"
        className=""
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-black leading-tight text-[var(--secondary-text)] md:text-4xl">
          Healthy Pregnancy Tips Every Mother Should Know
        </h1>

        <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
          Pregnancy brings physical, emotional, and lifestyle changes. Timely
          prenatal care helps protect both mother and baby while making each
          trimester easier to understand.
        </p>

        <div className="relative mt-6 h-[280px] w-full overflow-hidden rounded-2xl md:h-[420px]">
          <Image
            src={kusum}
            alt="Happy pregnancy patient"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-6 space-y-4 text-base leading-8 text-gray-600">
          <p>
            This guide brings the essentials together in one place: symptoms,
            diet, exercise, testing, warning signs, and when to speak with your
            gynecologist.
          </p>

          <p>
            A healthy pregnancy journey starts with regular checkups, balanced
            nutrition, gentle movement, proper rest, and timely medical advice.
          </p>
        </div>
      </motion.section>
       <SymptomsSection />
       <Nutrition/>
       <Exercise/>
       <BloodTest/>
       <WarningSigns/>
       <Author/>
       <Consultation/>
       
    </div>
  );
}

export default ReadArticle;