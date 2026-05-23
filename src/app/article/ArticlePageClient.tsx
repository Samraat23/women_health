"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Copy,
  Facebook,
  Linkedin,
  Phone,
  ShieldCheck,
  Sparkles,
  Twitter,
} from "lucide-react";
import type { ArticlePageData, ArticleSection } from "./articleData";

type ArticlePageClientProps = {
  article: ArticlePageData;
};

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[999] h-1 bg-gradient-to-r from-[var(--primary-color)] via-[#8b7cff] to-[#38bdf8]"
      style={{ width, transformOrigin: "left" }}
    />
  );
}

function SectionShell({ section }: { section: ArticleSection }) {
  const Icon = section.icon;

  return (
    <motion.section
      id={section.id}
      className="scroll-mt-28"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mb-5 flex items-center gap-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white shadow-lg"
          style={{ backgroundColor: section.accent }}
        >
          <Icon size={21} />
        </span>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-(--primary-text)">
            {section.eyebrow}
          </p>
          <h2 className="font-[var(--font-primary)] text-2xl font-black leading-tight text-[var(--primary-text-color)] md:text-4xl">
            {section.title}
          </h2>
        </div>
      </div>

      <div className="space-y-5 text-[15px] leading-8 text-[#5b6472] md:text-base">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {section.bullets ? <BulletGrid items={section.bullets} warning={section.id === "warning"} /> : null}
      {section.cards ? <InfoCards cards={section.cards} /> : null}
      {section.timeline ? <Timeline rows={section.timeline} /> : null}
    </motion.section>
  );
}

function BulletGrid({ items, warning = false }: { items: string[]; warning?: boolean }) {
  return (
    <div
      className={`mt-6 grid gap-3 rounded-2xl border p-5 md:grid-cols-2 ${
        warning
          ? "border-red-200 bg-red-50/80"
          : "border-[rgba(90,79,254,0.14)] bg-white/80"
      }`}
    >
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <span
            className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md ${
              warning ? "bg-red-100 text-red-600" : "bg-[rgba(90,79,254,0.1)] text-[var(--primary-color)]"
            }`}
          >
            <Check size={14} strokeWidth={3} />
          </span>
          <span className={warning ? "text-red-950/80" : "text-[#4b5563]"}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function InfoCards({ cards }: { cards: NonNullable<ArticleSection["cards"]> }) {
  const toneStyles = {
    positive: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    warning: "border-red-200 bg-red-50/80 text-red-700",
    neutral: "border-[rgba(90,79,254,0.14)] bg-white text-[var(--primary-text-color)]",
  };

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border p-5 shadow-sm ${toneStyles[card.tone ?? "neutral"]}`}
        >
          <h3 className="mb-3 font-[var(--font-primary)] text-lg font-black">{card.title}</h3>
          {card.description ? <p className="text-sm leading-7 text-[#5b6472]">{card.description}</p> : null}
          {card.items ? (
            <ul className="space-y-2 text-sm leading-6 text-[#4b5563]">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Timeline({ rows }: { rows: NonNullable<ArticleSection["timeline"]> }) {
  return (
    <div className="mt-6 space-y-3">
      {rows.map((row) => (
        <div
          key={`${row.label}-${row.title}`}
          className="grid gap-4 rounded-2xl border border-[rgba(90,79,254,0.12)] bg-white p-4 shadow-sm sm:grid-cols-[110px_1fr]"
        >
          <span className="h-fit rounded-lg bg-[rgba(90,79,254,0.1)] px-3 py-2 text-center text-xs font-black text-[var(--primary-color)]">
            {row.label}
          </span>
          <div>
            <h3 className="mb-1 font-[var(--font-primary)] text-base font-black text-[var(--primary-text-color)]">
              {row.title}
            </h3>
            <p className="text-sm leading-7 text-[#667085]">{row.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(90,79,254,0.12)] bg-white shadow-sm">
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="font-[var(--font-primary)] text-base font-black text-[var(--primary-text-color)]">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 text-[var(--primary-color)] transition-transform ${open ? "rotate-180" : ""}`}
          size={19}
        />
      </button>
      {open ? <p className="px-5 pb-5 text-sm leading-7 text-[#5b6472]">{answer}</p> : null}
    </div>
  );
}

export default function ArticlePageClient({ article }: ArticlePageClientProps) {
  const [activeSection, setActiveSection] = useState(article.sections[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const tocItems = useMemo(
    () => [
      ...article.sections.map((section) => ({ id: section.id, label: section.title })),
      { id: "faqs", label: "FAQs" },
    ],
    [article.sections]
  );

  useEffect(() => {
    const observers = tocItems
      .map(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return null;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id);
          },
          { rootMargin: "-28% 0px -58% 0px" }
        );
        observer.observe(element);
        return observer;
      })
      .filter(Boolean);

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [tocItems]);

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[#111827]">
      <ReadingProgress />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary-text-color)_0%,var(--secondary-color)_52%,var(--primary-color)_100%)]">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#ffffff_0,transparent_28%),radial-gradient(circle_at_78%_24%,#ffffff_0,transparent_20%),radial-gradient(circle_at_55%_80%,#ffffff_0,transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-28 pt-24 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-32">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/60">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight size={15} />
              <Link href="/article" className="transition hover:text-white">
                Blog
              </Link>
              <ChevronRight size={15} />
              <span className="font-semibold text-white">{article.category}</span>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur">
              <Sparkles size={15} className="text-[#f9a8d4]" />
              {article.category}
            </div>

            <h1 className="max-w-3xl font-[var(--font-primary)] text-4xl font-black leading-[1.05] text-white md:text-6xl">
              {article.title}{" "}
              <span className="bg-gradient-to-r from-[#d8b4fe] to-[#93c5fd] bg-clip-text text-transparent">
                {article.highlightedTitle}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              {article.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-5 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={17} />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={17} />
                Doctor reviewed
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/919289140812"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[var(--primary-color)] shadow-xl transition hover:-translate-y-0.5"
                target="_blank"
                rel="noreferrer"
              >
                Book consultation <ArrowUpRight size={17} />
              </a>
              <a
                href="tel:9289140812"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                <Phone size={17} /> Call now
              </a>
            </div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl sm:aspect-[16/12] lg:aspect-[4/5]">
              <Image
                src={article.heroImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1463]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                    <Image src={article.author.image} alt={article.author.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-white/60">Written and reviewed by</p>
                    <h2 className="font-[var(--font-primary)] text-base font-black">{article.author.name}</h2>
                    <p className="text-xs text-white/65">{article.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto -mt-14 grid max-w-7xl gap-4 px-4 md:grid-cols-3 md:px-8">
        {article.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[rgba(90,79,254,0.12)] bg-white p-6 shadow-lg">
            <p className="font-[var(--font-primary)] text-3xl font-black text-[var(--primary-text-color)]">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-[#667085]">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-[rgba(90,79,254,0.12)] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-[var(--font-primary)] font-black text-[var(--primary-text-color)]">
              <BookOpen size={18} className="text-[var(--primary-color)]" />
              Contents
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    activeSection === item.id
                      ? "bg-[rgba(90,79,254,0.1)] font-bold text-[var(--primary-color)]"
                      : "text-[#667085] hover:bg-[#f7f4ee]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activeSection === item.id ? "bg-[var(--primary-color)]" : "bg-[#d0d5dd]"
                    }`}
                  />
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 rounded-xl bg-[linear-gradient(135deg,var(--primary-text-color),var(--primary-color))] p-4 text-white">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">Need help?</p>
              <a
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-black"
              >
                Book appointment <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </aside>

        <article className="space-y-14">
          <motion.div
            className="rounded-2xl border border-[rgba(90,79,254,0.14)] bg-white p-6 shadow-sm md:p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 flex items-center gap-2 font-[var(--font-primary)] text-lg font-black text-[var(--primary-text-color)]">
              <Check size={20} className="text-[var(--primary-color)]" />
              What you will learn
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {article.summary.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-[#f7f4ee] p-3 text-sm leading-6 text-[#4b5563]">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[rgba(90,79,254,0.12)] text-[var(--primary-color)]">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {article.sections.slice(0, 2).map((section) => (
            <SectionShell key={section.id} section={section} />
          ))}

          <motion.div
            className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--primary-text-color),var(--secondary-color),var(--primary-color))] p-6 text-white shadow-xl md:p-8"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">Doctor note</p>
            <h2 className="font-[var(--font-primary)] text-2xl font-black">{article.doctorNote.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-white/72 md:text-base">{article.doctorNote.text}</p>
          </motion.div>

          {article.sections.slice(2).map((section) => (
            <SectionShell key={section.id} section={section} />
          ))}

          <section id="faqs" className="scroll-mt-28">
            <div className="mb-5">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-color)]">Common questions</p>
              <h2 className="font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)] md:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {article.faqs.map((faq) => (
                <FaqItem key={faq.question} {...faq} />
              ))}
            </div>
          </section>

          <div className="rounded-2xl bg-[linear-gradient(135deg,var(--primary-text-color),var(--primary-color))] p-7 text-center text-white shadow-xl md:p-10">
            <h2 className="font-[var(--font-primary)] text-2xl font-black md:text-3xl">
              Need expert pregnancy care?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-white/70">
              Book a consultation with Dr. Kusum Lata Bhardwaj for complete pregnancy guidance tailored to your health needs.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[var(--primary-color)]"
              >
                Book appointment <ArrowUpRight size={17} />
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "Copied" : "Copy article link"}
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-color)]">Read more</p>
            <h2 className="font-[var(--font-primary)] text-3xl font-black text-[var(--primary-text-color)]">Related articles</h2>
          </div>
          <div className="flex gap-2 text-[var(--primary-color)]">
            {[Facebook, Twitter, Linkedin].map((Icon, index) => (
              <button
                key={index}
                type="button"
                className="grid h-10 w-10 place-items-center rounded-lg border border-[rgba(90,79,254,0.18)] bg-white transition hover:bg-[rgba(90,79,254,0.08)]"
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {article.relatedArticles.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-2xl border border-[rgba(90,79,254,0.12)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 380px" />
                <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-black text-[var(--primary-color)] backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-[var(--font-primary)] text-xl font-black leading-tight text-[var(--primary-text-color)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#667085]">{item.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)]">
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
