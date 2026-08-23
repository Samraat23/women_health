import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Baby,
  BadgeCheck,
  BookOpenCheck,
  Clock3,
  HeartPulse,
  Microscope,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  SunMedium,
  Users,
  Video,
} from "lucide-react";

import {
  gynecologyCategories,
  type GynecologyCategory,
} from "@/data/Categories";
import { allBlogData, type BlogPageData } from "@/data/BlogData";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type CategoryStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const categoryIconMap: Record<string, LucideIcon> = {
  "Laparoscopic Surgery": Microscope,
  "Young Women Care": Users,
  "Preventive Women Health": BadgeCheck,
  "Hormonal Imbalance": Activity,
  "Pregnancy Care": Baby,
  "Fertility & Infertility": HeartPulse,
  "Menopause Care": SunMedium,
  "Sexual & Intimate Health": ShieldCheck,
};

const blogsBySlug = new Map<string, BlogPageData>();

for (const blog of allBlogData) {
  if (blog.article.slug) {
    blogsBySlug.set(blog.article.slug, blog);
  }
}

const categoryBlogsBySlug = new Map<string, BlogPageData[]>();

for (const category of gynecologyCategories) {
  categoryBlogsBySlug.set(
    category.slug,
    category.blogSlugs
      .map((slug) => blogsBySlug.get(slug))
      .filter((blog): blog is BlogPageData => Boolean(blog))
  );
}

export function generateStaticParams() {
  return gynecologyCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Dr. Kusum Lata",
    };
  }

  return {
    title: `${category.title} | Dr. Kusum Lata`,
    description: category.description,
  };
}

function getCategoryBySlug(slug: string) {
  return gynecologyCategories.find((item) => item.slug === slug);
}

function getCategoryBlogs(category: GynecologyCategory) {
  return categoryBlogsBySlug.get(category.slug) || [];
}

function getCategoryIcon(title: string) {
  return categoryIconMap[title] || Stethoscope;
}

function renderCategoryIcon(title: string, size: number) {
  const Icon = getCategoryIcon(title);

  return <Icon size={size} />;
}

function getCategoryPreviewImage(
  category: GynecologyCategory
): string | StaticImageData {
  const firstBlog = getCategoryBlogs(category)[0];

  return firstBlog?.article.image || category.image;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const activeCategory = getCategoryBySlug(slug);

  if (!activeCategory) {
    notFound();
  }

  const blogs = getCategoryBlogs(activeCategory);
  const heroImage = blogs[0]?.article.image || activeCategory.image;
  const categoryStats: CategoryStat[] = [
    {
      icon: BookOpenCheck,
      label: "Care Guides",
      value: `${blogs.length} topics`,
    },
    {
      icon: Clock3,
      label: "Reading",
      value: "Quick explainers",
    },
    {
      icon: ShieldCheck,
      label: "Reviewed",
      value: "Doctor-led",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--secondary-text)]">
      <section
        data-nav-surface="dark"
        className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-hidden bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:pb-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:82px_82px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(247,244,238,0)_0%,rgba(247,244,238,0.88)_100%)]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[660px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="mx-auto max-w-3xl text-center text-white lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.16)]">
              <Sparkles size={16} className="text-[var(--primary-color)]" />
              Care Category
            </div>

            <h1 className="font-[var(--font-primary)] text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-7xl">
              {activeCategory.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-white/82 lg:mx-0 lg:text-lg">
              {activeCategory.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {categoryStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/22 bg-white/12 p-4 text-left shadow-[0_16px_34px_rgba(27,20,99,0.14)] backdrop-blur-md"
                  >
                    <Icon size={20} className="text-white" />
                    <p className="mt-3 text-sm font-black text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                href="#treatments"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
              >
                Explore Treatments
                <ArrowRight size={18} />
              </Link>
              <Link
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <Video size={18} />
                Consultation
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[38px] border border-white/24 bg-white/12 p-3 shadow-[0_30px_70px_rgba(27,20,99,0.24)] backdrop-blur-md">
              <div className="relative h-[420px] overflow-hidden rounded-[30px] bg-[var(--background)] sm:h-[540px]">
                <Image
                  src={heroImage}
                  alt={activeCategory.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,99,0)_42%,rgba(27,20,99,0.78)_100%)]" />
              </div>

              <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/70 bg-white/95 p-4 text-[var(--primary-text-color)] shadow-[0_16px_38px_rgba(27,20,99,0.16)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white">
                    {renderCategoryIcon(activeCategory.title, 23)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black">{activeCategory.title}</p>
                    <p className="mt-1 text-xs font-bold text-[var(--secondary-text)]/65">
                      Guided by Dr. Kusum Lata Bhardwaj
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="treatments"
        className="relative z-10 -mt-10 px-4 pb-16 md:px-6 lg:pb-24"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/95 p-4 shadow-[0_24px_60px_rgba(27,20,99,0.12)] backdrop-blur-md">
              <div className="rounded-3xl bg-[rgba(90,79,254,0.08)] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-color)]">
                  Categories
                </p>
                <h2 className="mt-2 font-[var(--font-primary)] text-2xl font-black leading-tight text-[var(--primary-text-color)]">
                  Browse care topics
                </h2>
              </div>

              <div className="mt-4 space-y-2">
                {gynecologyCategories.map((cat) => {
                  const isActive = cat.slug === activeCategory.slug;
                  const previewImage = getCategoryPreviewImage(cat);

                  return (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      prefetch={false}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                        isActive
                          ? "border-[var(--primary-color)] bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white shadow-[0_14px_30px_rgba(90,79,254,0.22)]"
                          : "border-transparent bg-white text-[var(--secondary-text)] hover:border-[var(--primary-color)]/12 hover:bg-[rgba(90,79,254,0.06)]"
                      }`}
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[var(--background)]">
                        <Image
                          src={previewImage}
                          alt={cat.title}
                          fill
                          sizes="48px"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black">
                          {cat.title}
                        </span>
                        <span
                          className={`mt-0.5 block text-xs font-bold ${
                            isActive
                              ? "text-white/68"
                              : "text-[var(--secondary-text)]/58"
                          }`}
                        >
                          {getCategoryBlogs(cat).length} topics
                        </span>
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          isActive
                            ? "bg-white text-[var(--primary-color)]"
                            : "bg-[rgba(90,79,254,0.08)] text-[var(--primary-color)]"
                        }`}
                      >
                        {renderCategoryIcon(cat.title, 17)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-8 rounded-[30px] border border-white/70 bg-white/95 p-5 shadow-[0_24px_60px_rgba(27,20,99,0.10)] backdrop-blur-md sm:p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--primary-color)]">
                    Treatments
                  </p>
                  <h2 className="mt-3 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl">
                    Explore {activeCategory.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/68">
                    Choose a topic to understand symptoms, care options,
                    procedures, recovery, and when to speak with a specialist.
                  </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-full bg-[rgba(90,79,254,0.08)] px-4 py-3 text-sm font-black text-[var(--primary-color)]">
                  <Search size={17} />
                  {blogs.length} results
                </div>
              </div>
            </div>

            {blogs.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog) => (
                  <TreatmentCard key={blog.article.slug} blog={blog} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function TreatmentCard({ blog }: { blog: BlogPageData }) {
  return (
    <Link href={`/${blog.article.slug}`} prefetch={false} className="block h-full">
      <article className="group h-full min-h-[390px] overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(27,20,99,0.10)]">
        <div className="flex items-center justify-between border-b border-[var(--border)]/10 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-color)]/20 bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
              <ShieldCheck size={22} />
            </div>
            <p className="line-clamp-2 text-base font-black leading-5 text-[var(--primary-text-color)]">
              {blog.article.title}
            </p>
          </div>

          <ArrowRight
            size={25}
            className="-rotate-45 shrink-0 text-[var(--secondary-text)] transition-all duration-200 group-hover:rotate-0 group-hover:text-[var(--primary-color)]"
          />
        </div>

        <div className="px-5 pt-4">
          <p className="line-clamp-2 text-sm leading-6 text-[#667085]">
            {blog.article.intro}
          </p>
        </div>

        <div className="relative mx-5 mt-4 h-[210px] overflow-hidden rounded-xl bg-[var(--background)]">
          <Image
            src={blog.article.image}
            alt={blog.article.title}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 92vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </article>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[30px] border border-white/70 bg-white/95 p-10 text-center shadow-[0_24px_60px_rgba(27,20,99,0.10)] backdrop-blur-md">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(90,79,254,0.10)] text-[var(--primary-color)]">
        <Search size={26} />
      </span>
      <h3 className="mt-6 font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)]">
        No treatment guides found
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/68">
        Please add article slugs to this category to show treatment guides here.
      </p>
    </div>
  );
}
