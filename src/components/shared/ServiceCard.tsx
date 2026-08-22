"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const iconSet = Icons as unknown as Record<string, LucideIcon>;

export type ServiceCardItem = {
  title: string;
  description: string;
  image: string | StaticImageData;
  /** Lucide icon name (e.g. "Stethoscope") or the component itself. */
  icon?: string | LucideIcon;
};

export type ServiceCardProps = {
  item: ServiceCardItem;
  /** Wraps the card in a link when provided. */
  href?: string;
  /** Renders a 01 / 02 … counter next to the title. */
  index?: number;
  /** Accent pills shown above the description. */
  badges?: string[];
  /** Neutral chips shown under the image. */
  chips?: string[];
  chipsLabel?: string;
  /** Adds a footer call to action row. */
  footerLabel?: string;
  imageSizes?: string;
  priority?: boolean;
  /** Classes for the card itself. */
  className?: string;
  /** Classes for the link wrapper, useful for sizing inside carousels. */
  wrapperClassName?: string;
};

function ServiceCard({
  item,
  href,
  index,
  badges,
  chips,
  chipsLabel = "Often discussed for",
  footerLabel,
  imageSizes = "(min-width: 1024px) 390px, (min-width: 768px) 45vw, 92vw",
  priority = false,
  className = "",
  wrapperClassName = "",
}: ServiceCardProps) {
  // Plain lookups only: calling a helper here would return a fresh component
  // reference on every render.
  const Icon =
    (typeof item.icon === "string" ? iconSet[item.icon] : item.icon) ??
    ShieldCheck;
  const hasBadges = Boolean(badges?.length);
  const hasChips = Boolean(chips?.length);

  const card = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white shadow-sm transition-shadow duration-200 hover:border-[var(--primary-color)]/25 hover:shadow-[0_20px_44px_rgba(27,20,99,0.10)] md:min-h-[390px] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)]/10 px-4 py-3.5 md:px-5 md:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-color)]/20 bg-[var(--primary-color)]/10 text-[var(--primary-color)] transition-colors duration-200 group-hover:bg-[var(--primary-color)] group-hover:text-white md:h-11 md:w-11">
            <Icon size={22} />
          </div>
          <p className="line-clamp-2 text-[15px] font-black leading-5 text-[var(--primary-text-color)] md:text-base">
            {item.title}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {typeof index === "number" && (
            <span className="rounded-full bg-[var(--primary-color)]/10 px-2.5 py-1 text-xs font-black text-[var(--primary-color)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <ArrowRight
            size={25}
            className="-rotate-45 text-[var(--secondary-text)] transition-all duration-200 group-hover:rotate-0 group-hover:text-[var(--primary-color)]"
          />
        </div>
      </div>

      {hasBadges && (
        <div className="flex flex-wrap gap-2 px-4 pt-3 md:px-5 md:pt-4">
          {badges?.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-[var(--primary-color)]/10 px-3 py-1.5 text-xs font-black text-[var(--primary-color)]"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className={`px-4 md:px-5 ${hasBadges ? "pt-2.5" : "pt-3 md:pt-4"}`}>
        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-[#667085]">
          {item.description}
        </p>
      </div>

      {/* Absorbs the slack so the media block lines up across every card. */}
      <div className="flex-1" />

      <div className="relative mx-4 mb-4 mt-3 h-[195px] shrink-0 overflow-hidden rounded-xl border border-[var(--border)]/8 bg-[var(--background)] sm:h-[225px] md:mx-5 md:mb-5 md:mt-4 md:h-[260px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={imageSizes}
          priority={priority}
          // contain keeps the whole illustration or photo visible, never cropped
          className="object-contain object-center p-2"
        />
      </div>

      {hasChips && (
        <div className="px-4 pb-4 md:px-5 md:pb-5">
          <p className="text-xs font-black text-[var(--primary-text-color)]">
            {chipsLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {chips?.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[var(--border)]/10 bg-[var(--background)] px-3 py-1.5 text-xs font-black text-[var(--secondary-text)]/72"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      )}

      {footerLabel && (
        <div className="mt-auto flex items-center justify-between border-t border-[var(--border)]/10 px-4 py-4 md:px-5">
          <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)]">
            {footerLabel}
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </div>
      )}
    </motion.article>
  );

  if (!href) return card;

  return (
    <Link href={href} className={`block h-full ${wrapperClassName}`}>
      {card}
    </Link>
  );
}

export default ServiceCard;
