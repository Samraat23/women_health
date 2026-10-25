import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ContentTopics from "@/components/blogs/ContentTopics";
import DoctorBanner from "@/components/blogs/DoctorBanner";
import HeroSection from "@/components/blogs/HeroSection";
import ReadArticle from "@/components/blogs/ReadArticle";
import ReadingProgress from "@/components/blogs/ReadingProgress";
import WeekSizeBadge from "@/components/pregnancy/WeekSizeBadge";
import { getTrimesterGuide, pregnancyWeeks } from "@/data/PregnancyGuide";
import {
  getPregnancyWeekArticle,
  getPregnancyWeekByNumber,
} from "@/lib/pregnancyWeekArticle";

type WeekPageProps = {
  params: Promise<{
    week: string;
  }>;
};

function parseWeek(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  return Number(raw);
}

export function generateStaticParams() {
  return pregnancyWeeks.map((item) => ({ week: String(item.week) }));
}

export async function generateMetadata({
  params,
}: WeekPageProps): Promise<Metadata> {
  const { week: rawWeek } = await params;
  const week = parseWeek(rawWeek);
  const data = week ? getPregnancyWeekByNumber(week) : undefined;

  if (!data) {
    return { title: "Pregnancy Week Guide | Dr. Kusum Lata" };
  }

  return {
    title: `${data.week} Weeks Pregnant: ${data.focus} | Dr. Kusum Lata`,
    description: `${data.size}. ${data.baby}`,
  };
}

export default async function PregnancyWeekPage({ params }: WeekPageProps) {
  const { week: rawWeek } = await params;
  const week = parseWeek(rawWeek);
  const article = week ? getPregnancyWeekArticle(week) : null;

  if (!article || !week) {
    notFound();
  }

  const prevWeek = pregnancyWeeks.find((item) => item.week === week - 1);
  const nextWeek = pregnancyWeeks.find((item) => item.week === week + 1);
  const weekData = getPregnancyWeekByNumber(week);
  const trimester = weekData ? getTrimesterGuide(weekData.trimester) : null;

  return (
    <main className="relative bg-[#faf7f2]">
      <ReadingProgress />
      <HeroSection data={article.hero} />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[260px_1fr_320px] lg:py-14">
        <aside className="hidden lg:block">
          <div className="sticky top-33">
            <ContentTopics
              articleId={article.article.id}
              articleTitle={article.article.title}
              sections={article.sections}
              hasFaq={Boolean(article.faqs?.length)}
            />
          </div>
        </aside>

        <article>
          <div className="flex flex-wrap gap-2 text-[var(--primary-text)]">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/pregnancy">Pregnancy</Link>
            <span>/</span>
            <span className="text-[var(--secondary-text)]/70">
              Week {week}
            </span>
          </div>

          {weekData && trimester && (
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[var(--border)]/10 bg-white p-4 shadow-sm">
              <WeekSizeBadge
                week={weekData.week}
                totalWeeks={pregnancyWeeks.length}
                color={trimester.color}
                sizeLabel={weekData.size}
                size={56}
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[var(--secondary-text)]/55">
                  Baby is about
                </p>
                <p className="text-base font-black" style={{ color: trimester.color }}>
                  {weekData.size}
                </p>
              </div>
            </div>
          )}

          <ReadArticle data={article} />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {prevWeek ? (
              <Link
                href={`/pregnancy/week/${prevWeek.week}`}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--border)]/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5"
              >
                <ArrowLeft
                  size={18}
                  className="shrink-0 text-[var(--primary-color)] transition group-hover:-translate-x-1"
                />
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--secondary-text)]/55">
                    Previous
                  </p>
                  <p className="truncate text-sm font-black text-[var(--primary-text-color)]">
                    Week {prevWeek.week}: {prevWeek.focus}
                  </p>
                </div>
              </Link>
            ) : (
              <span />
            )}

            {nextWeek ? (
              <Link
                href={`/pregnancy/week/${nextWeek.week}`}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-[var(--border)]/10 bg-white p-4 text-right shadow-sm transition hover:-translate-y-0.5 sm:justify-between"
              >
                <div className="hidden min-w-0 sm:block">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--secondary-text)]/55">
                    Next
                  </p>
                  <p className="truncate text-sm font-black text-[var(--primary-text-color)]">
                    Week {nextWeek.week}: {nextWeek.focus}
                  </p>
                </div>
                <div className="min-w-0 sm:hidden">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--secondary-text)]/55">
                    Next
                  </p>
                  <p className="truncate text-sm font-black text-[var(--primary-text-color)]">
                    Week {nextWeek.week}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="shrink-0 text-[var(--primary-color)] transition group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-33">
            <DoctorBanner />
          </div>
        </aside>
      </section>
    </main>
  );
}
