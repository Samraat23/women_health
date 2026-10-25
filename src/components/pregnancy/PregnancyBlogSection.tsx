"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Search, SearchX } from "lucide-react";

export type PregnancyBlogPost = {
  slug: string;
  badge: string;
  date: string;
  readTime: string;
  title: string;
  intro: string;
  image: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function PregnancyBlogSection({ posts }: { posts: PregnancyBlogPost[] }) {
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.intro.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const isSearching = query.trim().length > 0;

  return (
    <div>
      <label className="mb-6 flex items-center gap-3 rounded-full border border-[var(--border)]/12 bg-white px-5 py-3 shadow-sm sm:max-w-md">
        <Search size={18} className="shrink-0 text-[var(--secondary-text)]/50" />
        <span className="sr-only">Search pregnancy articles</span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pregnancy articles..."
          className="w-full bg-transparent text-sm font-semibold text-[var(--primary-text-color)] placeholder:text-[var(--secondary-text)]/45 focus:outline-none"
        />
      </label>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)]/25 bg-white/60 p-10 text-center">
          <SearchX size={28} className="mx-auto text-[var(--secondary-text)]/40" />
          <p className="mt-3 text-sm font-bold text-[var(--secondary-text)]/70">
            No articles match &ldquo;{query}&rdquo;. Try a different keyword.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[rgba(90,79,254,0.08)] px-4 py-2 text-xs font-black text-[var(--primary-color)] transition hover:bg-[rgba(90,79,254,0.14)]"
          >
            Clear search
          </button>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-5 lg:grid-cols-2">
            {filtered.map((post, index) => {
              const featured = !isSearching && index === 0;

              return (
                <motion.div
                  key={post.slug}
                  layout
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                    delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.3),
                    ease: EASE,
                  }}
                  className={featured ? "lg:col-span-2" : ""}
                >
                  <PregnancyBlogCard post={post} featured={featured} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function PregnancyBlogCard({
  post,
  featured = false,
}: {
  post: PregnancyBlogPost;
  featured?: boolean;
}) {
  return (
    <Link href={`/${post.slug}`} className="group block h-full">
      <article
        className={`flex h-full overflow-hidden rounded-[20px] border border-[var(--border)]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(27,20,99,0.12)] ${
          featured ? "flex-col sm:flex-row" : "flex-col"
        }`}
      >
        <div
          className={`relative bg-[var(--background)] ${
            featured
              ? "aspect-[16/10] sm:aspect-auto sm:w-[46%] sm:shrink-0"
              : "aspect-[16/10]"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 46vw, 92vw"
                : "(min-width: 1024px) 48vw, 92vw"
            }
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-[var(--primary-color)] shadow-sm backdrop-blur-sm">
            {post.badge}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.06em] text-[var(--secondary-text)]/55">
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>

          <h3
            className={`mt-3 font-[var(--font-primary)] font-black leading-tight text-[var(--primary-text-color)] ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-2 flex-1 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
            {post.intro}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)]">
            Read article
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default PregnancyBlogSection;
