import { HeroBannerSkeleton, TextLinesSkeleton } from "@/components/shared/skeletons/Skeletons";

export default function Loading() {
  return (
    <div className="bg-[var(--background)]">
      <HeroBannerSkeleton />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-14 md:px-6">
        <TextLinesSkeleton lines={5} />
        <TextLinesSkeleton lines={4} />
      </div>
    </div>
  );
}
