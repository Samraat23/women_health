"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";

import { gynecologyCategories } from "@/data/Categories";
import { youngWomenCareBlogs } from "@/data/BlogData";

function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.slug as string;

  const category = gynecologyCategories.find(
    (item) => item.slug === categorySlug
  );

  const blogs = youngWomenCareBlogs.filter((blog) =>
    category?.blogSlugs.includes(blog.article.slug)
  );

  if (!category) {
    return (
      <main className="min-h-screen bg-[#faf7f2] px-4 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-900">
            Category not found
          </h1>
          <p className="mt-3 text-zinc-600">
            Please check your category slug.
          </p>
        </div>
      </main>
    );
  }

  function handleCategory(cat:any){

  } 

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-gradient-to-br from-rose-100 via-white to-pink-50 p-6 shadow-sm md:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
                  Gynecology Care Category
                </span>

                <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-950 md:text-6xl">
                  {category.title}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
                  {category.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-700 shadow-sm">
                    {blogs.length} Treatments
                  </span>
                  <span className="rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-700 shadow-sm">
                    Doctor Reviewed
                  </span>
                </div>
              </div>

              <div className="relative h-[280px] overflow-hidden rounded-[1.8rem] bg-white md:h-[360px]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategory Cards */}
      <section className="px-4 pb-24 md:px-8">
        <div>{gynecologyCategories.map((cat:any) => (
            <div onClick={handleCategory(cat.title)} >{cat.title}</div>
        ))}</div>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">
                Treatments
              </p>
              <h2 className="mt-3 text-3xl font-bold text-zinc-950 md:text-5xl">
                Explore {category.title}
              </h2>
            </div>

            <p className="max-w-xl text-zinc-600">
              Select any treatment card to read full symptoms, causes,
              diagnosis, care tips, and treatment details.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blogs.map((blog, index) => (
              <Link
                key={blog.article.slug}
                href={`/blogs/${blog.article.slug}`}
                className="group overflow-hidden rounded-[1.7rem] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={blog.article.image}
                    alt={blog.article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-600 backdrop-blur">
                    0{index + 1}
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                      <ShieldCheck size={14} />
                      {blog.hero.status}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                      <Clock size={14} />
                      {blog.hero.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug text-zinc-950 transition-colors group-hover:text-rose-600">
                    {blog.article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
                    {blog.article.intro}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                    <span className="text-sm font-semibold text-zinc-900">
                      Read Article
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-all group-hover:bg-rose-600 group-hover:text-white">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-zinc-900">
                No blogs found
              </h3>
              <p className="mt-2 text-zinc-600">
                Please add blogs for this category slug.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;