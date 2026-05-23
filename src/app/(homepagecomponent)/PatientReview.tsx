
"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PatientReview({ data }: any) {
  return (
    <section className="max-w-7xl mx-auto">
      <div  className="flex justify-between" >
      <div>
        <h1 className="text-4xl font-bold text-(--secondary-text) ">
          {data.badge}
        </h1>
        <p className="text-xl text-gray-700">
         {data.title}
        </p>
      </div>
      <div
          className="flex bg-(--primary-text) items-center gap-5 px-6 py-4 rounded-2xl"
          style={{  backdropFilter: "blur(8px)" }}
        >
          {/* Google G */}
          <div className="flex-shrink-0">
            <svg width="44" height="44" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{data.googleRating.label}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="font-bold text-base">{data.googleRating.rating}</span>
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
          </div>

          {/* Separator dot */}
          <span className="w-2 h-2 rounded-full bg-pink-400 mx-1" />

          {/* Avatar stack + count */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {data.avatars.slice(0, 5).map((src:any, i:any) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#1a2472]"
                />
              ))}
            </div>
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-white text-[#1a2472] border-2 border-[#1a2472]"
            >
              {data.googleRating.reviews}
            </span>
          </div>
        </div>
      </div>
      

      <div className="relative my-4 pb-12"> {/* 👈 space for controls */}
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={30}
    slidesPerView={1}
    pagination={{
      clickable: true,
      el: ".custom-pagination", // 👈 custom container
    }}
    navigation={{
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    }}
    breakpoints={{
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2 },
    }}
  >
    {data.reviews.map((item: any, index: number) => (
      <SwiperSlide key={index}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TestimonialCart item={item} />
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* ✅ Bottom Controls Row */}
  <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-2">
    
    {/* Empty (left spacing) */}
    <div className="flex-1" />

    {/* ✅ Center Dots */}
    <div className="custom-pagination  flex justify-center flex-1" />

    {/* ✅ Right Arrows */}
    <div className="flex gap-3 flex-1 justify-end">
      <button className="custom-prev cursor-pointer w-14 h-14 bg-(--primary-text) shadow rounded-full">
        ←
      </button>
      <button className="custom-next cursor-pointer w-14 h-14 bg-(--primary-text) shadow rounded-full">
        →
      </button>
    </div>

  </div>
    </div>
    </section>
  );
}

export default PatientReview;

function TestimonialCart({ item }: any) {
  return (
    <div className="w-150 border-gray-100 bg-white rounded-2xl h-70 shadow-lg backdrop-blur-5xl my-8 p-5 border">
      <div className="h-[50%] flex gap-4 items-center ">
        <div className="w-20 overflow-hidden relative h-20 rounded-full border">
          <Image alt="dd" fill src={item.image} className="object-cover" />
        </div>
        <div>
          <div className="text-black font-bold">{item.name}</div>
          <div className="inline-block text-black">******</div>
        </div>
      </div>

      <div className="text-slate-600 ">
        {item.message}
      </div>
    </div>
  );
}