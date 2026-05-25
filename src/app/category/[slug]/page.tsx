"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { gynecologyCategories } from "@/data/Categories";
import { allBlogData } from "@/data/BlogData";

function CategoryPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeCategorySlug = params?.slug as string;
  const selectedCategorySlug =
    searchParams.get("category") || routeCategorySlug;

  const routeCategory = gynecologyCategories.find(
    (item) => item.slug === routeCategorySlug
  );
  const category = gynecologyCategories.find(
    (item) => item.slug === selectedCategorySlug
  );
  const activeCategory = category || routeCategory;

  const blogs = allBlogData.filter(
    (blog) =>
      blog.article.slug &&
      activeCategory?.blogSlugs.includes(blog.article.slug)
  );

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!activeCategory) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#e8dfd4] bg-white p-10 text-center shadow-sm">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1eefc] text-[var(--primary-text)]">
            <Search size={24} />
          </span>
          <h1 className="mt-5 text-3xl font-bold text-[var(--secondary-text)]">
            Category not found
          </h1>
          <p className="mt-3 text-gray-600">
            Please check your category slug.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--secondary-text)]">
      {/* Hero Section */}
      <section className="relative  -top-30 overflow-hidden bg-[linear-gradient(135deg,var(--primary-text-color)_0%,var(--secondary-color)_12%,var(--primary-color)_100%)]">
        <Image
          src={activeCategory.image}
          alt={activeCategory.title}
          fill
          priority
          className="object-cover opacity-20 mix-blend-luminosity"
        />
      

        <div className="relative z-10 mx-auto flex  h-180 max-w-7xl items-center justify-center px-4 py-20  md:px-8">
          <div className="max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
              <Sparkles size={15} className="text-pink-300" />
              Gynecology Care Category
            </div>

            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl md:leading-[1.1]">
              {activeCategory.title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              {activeCategory.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                <Search size={17} />
                {blogs.length} Treatments
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                <Clock size={17} />
                Quick Reading
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                <ShieldCheck size={17} />
                Doctor Reviewed
              </span>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="#treatments"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--primary-text)] transition hover:-translate-y-0.5 hover:bg-pink-50"
              >
                Explore Treatments
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter + Treatment Cards */}
      <section
        id="treatments"
        className="relative -top-16 px-4 pb-10 md:px-8 lg:pb-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[#e8dfd4] bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary-text)]">
                Categories
              </p>
              <h2 className="mt-1 text-xl font-bold text-[var(--secondary-text)]">
                Browse care topics
              </h2>

              <div className="mt-5 space-y-2">
                {gynecologyCategories.map((cat) => {
                  const isActive = cat.slug === activeCategory.slug;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.slug)}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-[var(--primary-color)] bg-[#f1eefc] text-[var(--primary-text)]"
                          : "border-transparent bg-white text-[var(--secondary-text)] hover:border-[#e8dfd4] hover:bg-[#fffaf6]"
                      }`}
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#f7f4ee]">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">
                          {cat.title}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {cat.blogSlugs.length} topics
                        </span>
                      </span>

                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary-text)]">
                  Treatments
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-(--secondary-text) ">
                  Explore {activeCategory.title}
                </h2>
              </div>

            </div>

            <div className="grid gap-6 gr w-180 grid-cols-2 ">
              {blogs.map((blog) => (
                <Link
                  key={blog.article.slug}
                  href={`/${blog.article.slug}`}
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group h-full min-h-[390px] cursor-pointer rounded-2xl border border-gray-100 bg-white shadow-sm "
                  >
                    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-text)] text-[var(--primary-text)]">
                          <ShieldCheck size={22} />
                        </div>
                        <p className="line-clamp-2 text-base font-bold leading-5 text-[var(--primary-text)]">
                          {blog.article.title}
                        </p>
                      </div>

                      <ArrowRight
                        size={26}
                        className="-rotate-45 shrink-0 text-gray-900 transition-all duration-200 group-hover:rotate-0"
                      />
                    </div>

                    <div className="px-5 pt-4">
                      <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                        {blog.article.intro}
                      </p>

                    
                    </div>

                    <div className="relative mx-5 mt-4 h-[200px] overflow-hidden rounded-xl bg-[#f7f4ee]">
                      <Image
                        src={blog.article.image}
                        alt={blog.article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="rounded-3xl border border-[#eee7df] bg-white p-10 text-center shadow-sm">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1eefc] text-[var(--primary-text)]">
                  <Search size={24} />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-[var(--secondary-text)]">
                  No blogs found
                </h3>
                <p className="mt-2 text-gray-600">
                  Please add blogs for this category slug.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;
