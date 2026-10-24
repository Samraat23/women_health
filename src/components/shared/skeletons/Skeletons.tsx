import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Shared loading-state building blocks. Each route's loading.tsx composes
 * these to roughly match the shape of what it is about to render, so the
 * skeleton never jumps around once real content streams in.
 */

function Shimmer({ className }: { className?: string }) {
  return <Skeleton className={cn("bg-[var(--border)]/35", className)} />;
}

/** Hero banner used on the home page, surgery, pregnancy, about-us, etc. */
export function HeroBannerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--primary-color)]/8 px-4 py-16 md:px-6 md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <Shimmer className="h-7 w-40 rounded-full" />
        <Shimmer className="mt-6 h-10 w-[85%] max-w-xl rounded-lg md:h-12" />
        <Shimmer className="mt-3 h-10 w-[65%] max-w-md rounded-lg md:h-12" />
        <Shimmer className="mt-5 h-4 w-full max-w-lg rounded" />
        <Shimmer className="mt-2 h-4 w-[80%] max-w-md rounded" />
        <div className="mt-8 flex flex-wrap gap-3">
          <Shimmer className="h-12 w-44 rounded-full" />
          <Shimmer className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** Blog / article reading page hero (badge, title, meta row). */
export function ArticleHeroSkeleton() {
  return (
    <div className="border-b border-[var(--border)]/10 bg-white px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl">
        <Shimmer className="h-6 w-32 rounded-full" />
        <Shimmer className="mt-5 h-9 w-[90%] rounded-lg md:h-11" />
        <Shimmer className="mt-3 h-9 w-[55%] rounded-lg md:h-11" />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Shimmer className="h-4 w-24 rounded" />
          <Shimmer className="h-4 w-20 rounded" />
          <Shimmer className="h-4 w-28 rounded" />
        </div>
      </div>
    </div>
  );
}

/** A block of paragraph lines, for text-heavy sections. */
export function TextLinesSkeleton({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={cn("h-3.5 rounded", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

/** One card matching ServiceCard's proportions (icon row + text + image). */
export function ServiceCardSkeleton() {
  return (
    <div className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white md:min-h-[390px]">
      <div className="flex items-center gap-3 border-b border-[var(--border)]/10 px-4 py-3.5 md:px-5 md:py-4">
        <Shimmer className="h-10 w-10 shrink-0 rounded-lg md:h-11 md:w-11" />
        <Shimmer className="h-4 w-2/3 rounded" />
      </div>
      <div className="px-4 pt-3 md:px-5 md:pt-4">
        <TextLinesSkeleton lines={2} />
      </div>
      <div className="flex-1" />
      <div className="mx-4 mb-4 mt-3 h-[195px] overflow-hidden rounded-xl md:mx-5 md:mb-5 md:mt-4 sm:h-[225px] md:h-[260px]">
        <Shimmer className="h-full w-full rounded-xl" />
      </div>
    </div>
  );
}

/** Grid of service/blog/surgery cards — the most common loading pattern. */
export function CardGridSkeleton({
  count = 6,
  columns = "md:grid-cols-2 lg:grid-cols-3",
  className,
}: {
  count?: number;
  columns?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-5", columns, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Section heading pair used above most content blocks. */
export function SectionHeadingSkeleton({
  align = "left",
}: {
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "flex flex-col items-center" : ""}>
      <Shimmer className="h-4 w-32 rounded-full" />
      <Shimmer className="mt-3 h-8 w-64 max-w-full rounded-lg" />
    </div>
  );
}

/** Full article reading page: hero + TOC rail + body + side rail. */
export function ArticlePageSkeleton() {
  return (
    <div className="bg-[#faf7f2]">
      <ArticleHeroSkeleton />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[260px_1fr_320px] lg:py-14">
        <aside className="hidden lg:block">
          <div className="space-y-3 rounded-2xl border border-[var(--border)]/10 bg-white p-5">
            <Shimmer className="h-4 w-24 rounded" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Shimmer key={i} className="h-3.5 w-full rounded" />
            ))}
          </div>
        </aside>

        <article className="space-y-5">
          <Shimmer className="h-4 w-48 rounded" />
          <TextLinesSkeleton lines={4} />
          <Shimmer className="h-56 w-full rounded-2xl md:h-72" />
          <TextLinesSkeleton lines={5} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Shimmer key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
          <TextLinesSkeleton lines={4} />
        </article>

        <aside className="hidden lg:block">
          <Shimmer className="h-64 w-full rounded-2xl" />
        </aside>
      </div>
    </div>
  );
}

/** Category / listing page: heading + filter row + card grid. */
export function ListingPageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="bg-[var(--background)]">
      <HeroBannerSkeleton />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <SectionHeadingSkeleton />
        <CardGridSkeleton count={cards} className="mt-8" />
      </div>
    </div>
  );
}

/** Generic full-page fallback: a few stacked sections, used on the home page. */
export function HomePageSkeleton() {
  return (
    <div className="bg-[var(--background)]">
      <HeroBannerSkeleton />
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 md:px-6">
        <div>
          <SectionHeadingSkeleton align="center" />
          <CardGridSkeleton count={3} columns="md:grid-cols-3" className="mt-8" />
        </div>
        <div>
          <SectionHeadingSkeleton align="center" />
          <CardGridSkeleton count={6} className="mt-8" />
        </div>
      </div>
    </div>
  );
}
