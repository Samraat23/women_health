"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sparkles,

} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import kusum from "../../../public/image/ FLIPING1.jpeg";
import robot from "../../../public/image/ robottariner.jpeg"
import lacture from "../../../public/image/ lacture.jpeg"
import lacture2 from "../../../public/image/ impowerwomen.jpeg"
import img4 from "../../../public/image/ drkusumlatagynecologist.jpeg"


import { motion, useInView, type Variants } from "framer-motion"
import TextAnimation from '../(dynamiccomponent)/TextAnimation';



const variant1 = {
  leftSide: {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  rightSide: {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  center: {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }
} satisfies Record<string, Variants>;


const selectedVariant = variant1;








function HeroSection() {
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, {
    once: true,
    margin: "-60px",
  });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "-40px",
  });



  const ImageBanner = [
    {
      img: kusum,
      id: 1,
    },
    {
      img: robot,
      id: 2,
    },
    {
      img: lacture,
      id: 3,
    },
    {
      img: img4,
      id: 4,
    },
    {
      img: lacture2,
      id: 5,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ImageBanner.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ImageBanner.length]);

  return (
    <section

      className="font-(--primary-text) max-w-7xl mx-auto  mt-30  ">





      <div className="flex justify-between ">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={selectedVariant.center}
          className="w-full lg:w-[60%]">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-slate-700">
                Expert Women's Healthcare
              </span>
            </div>

            {/* Main heading */}
            <TextAnimation />

            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Dedicated to complete women's healthcare. From routine checkups to advanced
              gynecological and laparoscopic procedures — supporting you with expertise,
              empathy, and trust.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="px-8 py-6 text-base md:text-lg font-medium border text-(--secondary-color) ">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="px-8 cursor-pointer py-6 text-base md:text-lg border-(--primary-color) text-(--secondary-color) hover:bg-pink-50">
                Video Consultation
              </Button>
            </div>

          </div>
        </motion.div>


        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={imgInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-100 flex flex-col items-center justify-center"
        >
          <div className="relative w-full h-110  rounded-2xl overflow-hidden cursor-pointer shadow-xl">

            {/* FIXED IMAGE SCROLL */}
            <motion.div
              animate={{ x: `-${current * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex w-full h-full"
            >
              {ImageBanner.map((banner) => (
                <div
                  key={banner.id}
                  className="relative min-w-full h-full"
                >
                  <Image
                    src={banner.img}
                    alt="Dr. Kusum Lata"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 h-12 w-full bg-(--secondary-text)/90 backdrop-blur-sm z-10">
              <div className="px-3 py-1.5 text-white">
                <p className="text-[14px] font-medium">
                  Dr Kusum Lata Bhardwaj
                </p>

                <p className="text-[10px]">Ex-AIIMS New Delhi</p>
              </div>
            </div>
          </div>
        </motion.div>




      </div>



    </section>

  );
}

export default HeroSection;