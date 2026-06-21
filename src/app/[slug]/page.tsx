"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import HeroSection from "@/components/blogs/HeroSection";
import ContentTopics from "@/components/blogs/ContentTopics";
import DoctorBanner from "@/components/blogs/DoctorBanner";
import ReadArticle from "@/components/blogs/ReadArticle";
import { allBlogData } from "@/data/BlogData";
import { gynecologyCategories } from "@/data/Categories";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

type RelatedCardItem = {
  title: string;
  description: string;
  image: string | StaticImageData;
};

function Page() {
  const params = useParams();
  const articleSlug = params?.slug as string;

  const blog = allBlogData.find(
    (item) => item.article.slug === articleSlug
  );

  if (!blog) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#eadfd5] bg-white p-8 text-center shadow-sm md:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1eefc] text-[var(--primary-text)]">
            <Search size={24} />
          </span>
          <h1 className="mt-5 text-3xl font-black text-[var(--secondary-text)]">
            Article not found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            This article slug does not match any available blog. Please choose
            another health topic from the category page.
          </p>
          <Link
            href="/category/young-women-care"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--primary-color)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--secondary-color)]"
          >
            Browse Articles
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  const category = gynecologyCategories.find(
    (item) => item.slug === blog.article.category
  );

  const relatedBlogs = allBlogData.filter(
    (item) =>
      item.article.category === blog.article.category &&
      item.article.slug !== blog.article.slug
  );

  const categoryHref = category
    ? `/category/${category.slug}`
    : "/category/young-women-care";

  return (
    <main className="relative  bg-[#faf7f2]">
      <ReadingProgress />
      <HeroSection data={blog.hero} />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8  py-14 lg:grid-cols-[260px_1fr_320px]">
        {/* Left Side */}
        <aside className="hidden lg:block">
          <div className="sticky top-33">
            <ContentTopics
              articleId={blog.article.id}
              articleTitle={blog.article.title}
              sections={blog.sections}
            />
          </div>
        </aside>

        {/* Center */}
        <article>
          <div className="flex gap-2 text-[var(--primary-text)]">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={categoryHref}>{category?.slug}</Link>
          </div>
          <ReadArticle data={blog} />
        </article>

        {/* Right Side */}
        <aside className="hidden lg:block">
          <div className="sticky top-33 ">
            <DoctorBanner />
          </div>
        </aside>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary-text)]">
                Read more
              </p>
              <h2 className="mt-3 text-3xl font-black text-[var(--primary-text-color)]">
                Related articles
              </h2>
            </div>

            {category && (
              <Link
                href={categoryHref}
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary-text)] transition hover:text-[var(--secondary-color)]"
              >
                View {category.title}
                <ArrowRight size={17} />
              </Link>
            )}
          </div>

          <div className="flex gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {relatedBlogs.slice(0, 3).map((item) => (
              <Link
                key={item.article.slug}
                href={`/${item.article.slug}`}
                className="block"
              >
                <ServiceCard
                  item={{
                    title: item.article.title,
                    description: item.article.intro,
                    image: item.article.image,
                  }}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Page;

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[999] h-1 bg-gradient-to-r from-[var(--primary-color)] via-[#8b7cff] to-[#38bdf8]"
      style={{ width, transformOrigin: "left" }}
    />
  );
}

const ServiceCard = ({ item }: { item: RelatedCardItem }) => (
  <motion.div
    className="group h-100 w-95 max-w-[calc(100vw-2rem)] flex-shrink-0 cursor-pointer rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:w-full"
  >
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-text)] text-[var(--primary-text)]">
          <ShieldCheck size={22} />
        </div>
        <p className="text-md line-clamp-2 font-bold text-[var(--primary-text)]">
          {item.title}
        </p>
      </div>

      <ArrowRight
        size={26}
        className="-rotate-45 text-gray-900 transition-all duration-200 group-hover:rotate-0"
      />
    </div>

    {/* Content */}
    <div className="mt-4 px-5">
      <p className="line-clamp-2 text-sm text-gray-600">
        {item.description}
      </p>
    </div>

    {/* Image */}
    <div className="relative mx-5 mt-4 h-50 overflow-hidden rounded-xl bg-[#f7f4ee]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  </motion.div>
);
