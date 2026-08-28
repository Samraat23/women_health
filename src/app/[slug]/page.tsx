import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ContentTopics from "@/components/blogs/ContentTopics";
import DoctorBanner from "@/components/blogs/DoctorBanner";
import HeroSection from "@/components/blogs/HeroSection";
import ReadArticle from "@/components/blogs/ReadArticle";
import ReadingProgress from "@/components/blogs/ReadingProgress";
import ServiceCard from "@/components/shared/ServiceCard";
import { gynecologyCategories } from "@/data/Categories";
import { getSeedArticleSlugs } from "@/lib/articleSeed";
import { getArticleRecord, getArticleRecords } from "@/lib/articleStore";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  // Prerender from the shipped article set; admin-only additions still render
  // on demand.
  return getSeedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getArticleRecord(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Dr. Kusum Lata",
    };
  }

  const seo = blog.seo;

  return {
    title: seo?.title || `${blog.article.title} | Dr. Kusum Lata`,
    description: seo?.description || blog.article.intro,
    alternates: seo?.canonical ? { canonical: seo.canonical } : undefined,
    robots: seo?.robots || undefined,
  };
}

export default async function Page({ params }: ArticlePageProps) {
  const { slug } = await params;
  const blog = await getArticleRecord(slug);

  if (!blog) {
    notFound();
  }

  const category = gynecologyCategories.find(
    (item) => item.slug === blog.article.category
  );

  const relatedBlogs = (await getArticleRecords()).filter(
    (item) =>
      item.article.category === blog.article.category &&
      item.article.slug !== blog.article.slug
  );

  const categoryHref = category
    ? `/category/${category.slug}`
    : "/category/young-women-care";

  return (
    <main className="relative bg-[#faf7f2]">
      <ReadingProgress />
      <HeroSection data={blog.hero} />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[260px_1fr_320px] lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-33">
            <ContentTopics
              articleId={blog.article.id}
              articleTitle={blog.article.title}
              sections={blog.sections}
              hasFaq={Boolean(blog.faqs?.length)}
            />
          </div>
        </aside>

        <article>
          <div className="flex flex-wrap gap-2 text-[var(--primary-text)]">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={categoryHref}>
              {category?.title || "Women Health"}
            </Link>
            <span>/</span>
            <span className="text-[var(--secondary-text)]/70">
              {blog.article.title}
            </span>
          </div>
          <ReadArticle data={blog} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-33">
            <DoctorBanner />
          </div>
        </aside>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6 md:pb-20">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary-text)]">
                Read more
              </p>
              <p className="mt-3 text-3xl font-black text-[var(--primary-text-color)]">
                Related articles
              </p>
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

          <div className="flex gap-5 overflow-x-auto pb-3 lg:grid lg:auto-rows-fr lg:grid-cols-3 lg:overflow-visible">
            {relatedBlogs.slice(0, 3).map((item) => (
              <ServiceCard
                key={item.article.slug}
                href={`/${item.article.slug}`}
                item={{
                  title: item.article.title,
                  description: item.article.intro,
                  image: item.article.image,
                }}
                wrapperClassName="w-[min(88vw,380px)] flex-shrink-0 lg:w-full"
                imageSizes="(min-width: 1024px) 380px, 88vw"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
