"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Review = {
  id: string;
  name: string;
  role: string;
  image: string;
  message: string;
  highlight?: boolean;
};

type PatientReviewData = {
  badge: string;
  title: string;
  googleRating: {
    rating: string;
    reviews: string;
    label: string;
  };
  avatars: string[];
  reviews: Review[];
};

function PatientReview({ data }: { data: PatientReviewData }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      <div className="mb-6 flex flex-col justify-between gap-5 md:mb-8 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-(--primary-color)">
            {data.badge}
          </p>
          <h2 className="mt-2 font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)] sm:text-4xl md:mt-3 md:text-5xl">
            {data.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--border)]/10 bg-white px-4 py-3 shadow-sm md:px-5 md:py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#667085]">
              {data.googleRating.label}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)]">
                {data.googleRating.rating}
              </span>
              <span className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex -space-x-2">
              {data.avatars.slice(0, 5).map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Patient ${index + 1}`}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="ml-3 rounded-full bg-[var(--primary-color)]/10 px-3 py-1 text-xs font-black text-[var(--primary-color)]">
              {data.googleRating.reviews}
            </span>
          </div>
        </div>
      </div>

      <div className="relative pb-12 md:pb-14">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.reviews.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <TestimonialCard item={item} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between">
          <div className="custom-pagination flex flex-1 justify-start" />
          <div className="flex gap-3">
            <button className="custom-prev flex h-11 w-11 items-center justify-center rounded-full border border-[var(--primary-color)]/20 bg-white text-[var(--primary-color)] shadow-sm transition hover:bg-[var(--primary-color)] hover:text-white md:h-12 md:w-12">
              <ArrowLeft size={19} />
            </button>
            <button className="custom-next flex h-11 w-11 items-center justify-center rounded-full border border-[var(--primary-color)]/20 bg-white text-[var(--primary-color)] shadow-sm transition hover:bg-[var(--primary-color)] hover:text-white md:h-12 md:w-12">
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientReview;

function TestimonialCard({ item }: { item: Review }) {
  return (
    <article
      className={`group relative flex h-auto min-h-[320px] flex-col overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition md:h-[360px] md:p-6
        
        ${
        item.highlight
          ? "border-[var(--primary-color)]/25"
          : "border-[var(--border)]/10"
      }
      `
    }
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 " />

      <div className="mb-5 flex items-start justify-between gap-4 md:mb-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--primary-color)]/10 bg-[var(--background)] md:h-16 md:w-16">
            <Image
              alt={item.name}
              fill
              src={item.image}
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-[var(--font-primary)] font-black text-[var(--primary-text-color)]">
              {item.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#667085]">
              {item.role}
            </p>
            <span className="mt-2 flex text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} fill="currentColor" />
              ))}
            </span>
          </div>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-color)]/10 text-[var(--primary-color)] md:h-11 md:w-11">
          <Quote size={22} />
        </div>
      </div>

      <blockquote className="flex-1 rounded-2xl bg-[var(--background)] px-4 py-4 md:px-5">
        <p className="line-clamp-5 text-sm leading-6 text-[#667085] md:line-clamp-6 md:text-[15px] md:leading-7">
          &ldquo;{item.message}&rdquo;
        </p>
      </blockquote>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 md:mt-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-color)]/10 px-3 py-2 text-xs font-black text-[var(--primary-color)]">
          <BadgeCheck size={15} />
          Verified Patient
        </span>
        <span className="rounded-full bg-[var(--background)] px-3 py-2 text-xs font-black text-[var(--secondary-text)]">
          5.0 Rating
        </span>
      </div>
    </article>
  );
}
