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
import {
  getDynamicRouteSchema,
  stringifyJsonLd,
} from "@/lib/dynamicRouteSchema";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = "https://www.drkusumlata.in";
const doctorOpenGraphImage = `${siteUrl}/_next/image?url=%2Fimage%2Fdr-kusum-lata-bhardwaj.jpg&w=1080&q=75`;

type DynamicRouteOpenGraph = {
  title: string;
  description: string;
  url: string;
  type: "website";
  images: {
    url: string;
    alt: string;
  }[];
};

const dynamicRouteOpenGraphBySlug: Partial<
  Record<string, DynamicRouteOpenGraph>
> = {
  "endometriosis-doctor-in-gurgaon": {
    title:
      "Best Endometriosis Specialist Doctor in Gurgaon | Symptoms & Treatment",
    description:
      "Meet Dr. Kusum Lata Bhardwaj, an endometriosis specialist in Gurgaon with 17+ years of experience. Get guidance on symptoms, diagnosis and treatment options.",
    url: `${siteUrl}/endometriosis-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Endometriosis Specialist Doctor in Gurgaon",
      },
    ],
  },
  "uterine-bleeding-doctor-in-gurgaon": {
    title: "Best Uterine Bleeding Doctor in Gurgaon | Dr. Kusum Lata",
    description:
      "Meet Dr. Kusum Lata Bhardwaj, a uterine bleeding specialist in Gurgaon with 17+ years of experience. Get guidance for heavy periods, irregular bleeding and treatment options.",
    url: `${siteUrl}/uterine-bleeding-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Uterine Bleeding Specialist in Gurgaon",
      },
    ],
  },
  "vaginal-infection-doctor-in-gurgaon": {
    title: "Best Vaginal Infection Doctor in Gurgaon | Dr. Kusum Lata",
    description:
      "Meet Dr. Kusum Lata Bhardwaj, a vaginal infection specialist in Gurgaon with 17+ years of experience. Get help for itching, unusual discharge, burning and repeated infections.",
    url: `${siteUrl}/vaginal-infection-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Vaginal Infection Specialist in Gurgaon",
      },
    ],
  },
  "uterine-fibroids-doctor-in-gurgaon": {
    title: "Best Uterine Fibroids Doctor in Gurgaon | Dr. Kusum Lata",
    description:
      "Having heavy periods, pelvic pain or pressure? Meet Dr. Kusum Lata Bhardwaj in Gurgaon with 17+ years of experience for fibroid diagnosis and suitable treatment options.",
    url: `${siteUrl}/uterine-fibroids-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Uterine Fibroids Doctor in Gurgaon",
      },
    ],
  },
  "ovarian-cyst-doctor-in-gurgaon": {
    title: "Best Ovarian Cyst Doctor in Gurgaon | Dr. Kusum Lata",
    description:
      "Meet Dr. Kusum Lata Bhardwaj, an ovarian cyst specialist in Gurgaon with 17+ years of experience. Get help for pelvic pain, ovarian cysts and suitable treatment options.",
    url: `${siteUrl}/ovarian-cyst-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Ovarian Cyst Specialist in Gurgaon",
      },
    ],
  },
  "puberty-disorder-doctor-in-gurgaon": {
    title: "Best Puberty Disorder Doctor in Gurgaon | Dr. Kusum Lata",
    description:
      "Concerned about early or delayed puberty? Meet Dr. Kusum Lata Bhardwaj in Gurgaon with 17+ years of experience for growth, development and hormone-related concerns.",
    url: `${siteUrl}/puberty-disorder-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Puberty Disorder Doctor in Gurgaon",
      },
    ],
  },
  "pcos-pcod-doctor-in-gurgaon": {
    title: "Best Gynecologist for PCOS/PCOD Treatment in Gurgaon",
    description:
      "Get personalised PCOS/PCOD treatment in Gurgaon from Dr. Kusum Lata Bhardwaj, with 17+ years of experience. Get expert guidance for hormonal, period and fertility concerns.",
    url: `${siteUrl}/pcos-pcod-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - PCOS PCOD Doctor in Gurgaon",
      },
    ],
  },
  "breast-cancer-doctor-in-gurgaon": {
    title: "Best Breast Cancer Specialist Doctor in Gurgaon",
    description:
      "Consult Dr. Kusum Lata Bhardwaj, Breast Cancer Specialist Doctor in Gurgaon, for breast lump evaluation, cancer diagnosis, personalised treatment & surgical care. ✔ 17+ years experience ✔ 10K+ patients",
    url: `${siteUrl}/breast-cancer-doctor-in-gurgaon`,
    type: "website",
    images: [
      {
        url: doctorOpenGraphImage,
        alt: "Dr. Kusum Lata Bhardwaj - Breast Cancer Specialist Doctor in Gurgaon",
      },
    ],
  },
};

const getDynamicRouteOpenGraph = (slug: string) =>
  dynamicRouteOpenGraphBySlug[slug];

const toMetadataOpenGraph = (
  openGraph: DynamicRouteOpenGraph
): Metadata["openGraph"] => ({
  title: openGraph.title,
  description: openGraph.description,
  url: openGraph.url,
  type: "website",
  images: openGraph.images,
});

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
  const openGraph = getDynamicRouteOpenGraph(slug);
  const title = openGraph
    ? openGraph.title
    : seo?.title || `${blog.article.title} | Dr. Kusum Lata`;
  const description = openGraph
    ? openGraph.description
    : seo?.description || blog.article.intro;
  const canonical = openGraph?.url || seo?.canonical;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: seo?.robots || undefined,
    openGraph: openGraph ? toMetadataOpenGraph(openGraph) : undefined,
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
  const structuredData = getDynamicRouteSchema(slug);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }}
        />
      )}

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
    </>
  );
}
