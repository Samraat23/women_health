import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] p-3 shadow-[0_30px_70px_rgba(27,20,99,0.18)]">
        <div className="rounded-[26px] bg-white p-8 text-center sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(90,79,254,0.10)] text-[var(--primary-color)]">
            <Search size={26} />
          </span>
          <h1 className="mt-6 font-[var(--font-primary)] text-3xl font-black text-[var(--primary-text-color)]">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/68">
            This address does not match any care guide or category. Browse the
            available women&apos;s health topics instead.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              <Home size={17} />
              Back to Home
            </Link>
            <Link
              href="/category/young-women-care"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/20 px-6 py-3 text-sm font-black text-[var(--primary-color)] transition hover:-translate-y-0.5"
            >
              Browse Articles
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
