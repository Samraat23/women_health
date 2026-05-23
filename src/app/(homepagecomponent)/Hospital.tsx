"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {motion , type Variants } from "framer-motion"
import { Autoplay } from "swiper/modules";
import Image from "next/image";

function Hospital({hospitalLogo}:any) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0,
        ease: "easeOut",
      },
    },
  };
    return (
      <motion.div 
      variants={containerVariants}
      initial ="hidden"
      animate="visible"   
      className="h-24 border border-(--border)/15 my-20  ">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={5000}
          slidesPerView={6}
          spaceBetween={20}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          className="h-full"
        >
          {hospitalLogo.map((item:any) => (
            <SwiperSlide key={item.id}>
              <div className="flex items-center justify-center h-full group">
                
                {/* Logo Box */}
                <div className="relative w-40 h-40">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
  
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
  
        {/* Smooth continuous scroll fix */}
        <style jsx global>{`
          .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
      </motion.div>
    );
  }

  export default Hospital