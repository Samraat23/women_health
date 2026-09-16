"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  PhoneCall,
  Siren,
} from "lucide-react";

import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import {
  fillTemplate,
  getBrowsableServices,
  getCategory,
  getServiceHref,
  getTopic,
} from "@/features/chat/core/catalog";
import { getWhatsAppLink } from "@/features/chat/core/requestSummary";
import type { ChatEvent } from "@/features/chat/core/state";
import type { ChatConfig } from "@/features/chat/core/types";
import ChatIcon from "@/features/chat/ui/ChatIcon";
import { brandGradient, cardClass } from "@/features/chat/ui/styles";

type Dispatch = (event: ChatEvent) => void;

export function MenuCard({
  config,
  dispatch,
  disabled,
}: {
  config: ChatConfig;
  dispatch: Dispatch;
  disabled: boolean;
}) {
  const { mainMenu, copy, clinic } = config.settings;

  return (
    <div className={`${cardClass} overflow-hidden`}>
      <ul className="divide-y divide-[#f1effb]">
        {mainMenu.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => dispatch({ type: "menu_option", optionId: option.id })}
              className="group flex w-full cursor-pointer items-center gap-3 px-3.5 py-3 text-left transition hover:bg-[#f8f7ff] focus-visible:bg-[#f8f7ff] focus-visible:outline-none disabled:cursor-default disabled:hover:bg-transparent"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f0edff] text-[var(--primary-color)] transition group-hover:bg-[var(--primary-color)] group-hover:text-white group-focus-visible:bg-[var(--primary-color)] group-focus-visible:text-white">
                <ChatIcon name={option.icon} size={19} className="h-[19px] w-[19px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-bold leading-5 text-[var(--primary-text-color)]">
                  {option.label}
                </span>
                <span className="block text-[12px] leading-4 text-slate-500">{option.description}</span>
              </span>
              <ChevronRight
                size={17}
                aria-hidden="true"
                className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[var(--primary-color)]"
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-1.5 border-t border-[#f1effb] bg-[#fbfaff] px-3.5 py-2 text-[11px] leading-4 text-slate-500">
        <Siren size={13} aria-hidden="true" className="shrink-0 text-rose-500" />
        {fillTemplate(copy.emergencyNote, { emergencyNumber: clinic.emergencyNumber })}
      </p>
    </div>
  );
}

export function TopicCard({
  config,
  topicId,
  compact,
  dispatch,
  onNavigate,
}: {
  config: ChatConfig;
  topicId: string;
  compact: boolean;
  dispatch: Dispatch;
  onNavigate: () => void;
}) {
  const topic = getTopic(config.catalog, topicId);

  if (!topic) return null;

  const isService = topic.kind === "service";
  const title = isService ? topic.service.title : topic.category.title;
  const summary = isService ? topic.service.summary : topic.category.description;
  const href = isService ? getServiceHref(topic.service) : topic.category.href;
  const eyebrow = isService ? topic.category?.title : "Area of care";
  const actions: Array<{ label: string; action: "book" | "video" | "audio" | "ask"; icon: string; primary?: boolean }> = [
    { label: "Book appointment", action: "book", icon: "calendar", primary: true },
    { label: "Video consult", action: "video", icon: "video" },
    { label: "Audio consult", action: "audio", icon: "audio" },
    { label: "Ask a question", action: "ask", icon: "inquiry" },
  ];

  return (
    <div className={`${cardClass} p-3.5`}>
      {eyebrow && (
        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--primary-color)]">{eyebrow}</p>
      )}
      <p className="mt-0.5 text-[15px] font-black leading-snug text-[var(--primary-text-color)]">{title}</p>
      {summary && <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{summary}</p>}
      {href && (
        <Link
          href={href}
          onClick={onNavigate}
          className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-bold text-[var(--primary-color)] underline-offset-4 hover:underline"
        >
          Read the full guide
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      )}
      {!compact && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {actions.map((item) => (
            <button
              key={item.action}
              type="button"
              onClick={() => dispatch({ type: "topic_action", topicId, action: item.action })}
              className={`inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 text-[12.5px] font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/20 ${
                item.primary
                  ? `col-span-2 text-white shadow-[0_10px_22px_rgba(90,79,254,0.28)] hover:-translate-y-px ${brandGradient}`
                  : "border border-[#e2defa] bg-white text-[var(--primary-text-color)] hover:border-[var(--primary-color)]/50 hover:bg-[#f8f7ff]"
              } ${item.action === "ask" ? "col-span-2" : ""}`}
            >
              <ChatIcon name={item.icon} size={15} className="h-[15px] w-[15px]" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoriesCard({ config, dispatch }: { config: ChatConfig; dispatch: Dispatch }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {config.catalog.categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => dispatch({ type: "show_category", categoryId: category.id })}
          className="group flex min-h-[86px] cursor-pointer flex-col items-start justify-between gap-2 rounded-2xl border border-[#e9e6fb] bg-white p-3 text-left transition hover:-translate-y-px hover:border-[var(--primary-color)]/40 hover:shadow-[0_10px_22px_rgba(27,20,99,0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/15"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f0edff] text-[var(--primary-color)] transition group-hover:bg-[var(--primary-color)] group-hover:text-white">
            <ChatIcon name={category.icon} size={18} className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[13px] font-bold leading-tight text-[var(--primary-text-color)]">{category.title}</span>
        </button>
      ))}
    </div>
  );
}

export function CategoryCard({
  config,
  categoryId,
  dispatch,
  onNavigate,
}: {
  config: ChatConfig;
  categoryId: string;
  dispatch: Dispatch;
  onNavigate: () => void;
}) {
  const category = getCategory(config.catalog, categoryId);

  if (!category) return null;

  const services = getBrowsableServices(config.catalog, category.id);

  return (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="flex items-start gap-3 p-3.5 pb-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f0edff] text-[var(--primary-color)]">
          <ChatIcon name={category.icon} size={19} className="h-[19px] w-[19px]" />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-black leading-snug text-[var(--primary-text-color)]">{category.title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{category.description}</p>
        </div>
      </div>
      <ul className="divide-y divide-[#f1effb] border-t border-[#f1effb]">
        {services.map((service) => (
          <li key={service.id}>
            <button
              type="button"
              onClick={() => dispatch({ type: "topic_action", topicId: service.id, action: "view" })}
              className="group flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13.5px] font-semibold text-[var(--primary-text-color)] transition hover:bg-[#f8f7ff] focus-visible:bg-[#f8f7ff] focus-visible:outline-none"
            >
              {service.title}
              <ChevronRight size={16} aria-hidden="true" className="shrink-0 text-slate-300 transition group-hover:text-[var(--primary-color)]" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 border-t border-[#f1effb] bg-[#fbfaff] px-3.5 py-2.5">
        <Link
          href={category.href}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-[12px] font-bold text-[var(--primary-color)] underline-offset-4 hover:underline"
        >
          View on website
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function ContactCard({
  config,
  variant,
}: {
  config: ChatConfig;
  variant: "location" | "contact" | "emergency" | "crisis";
}) {
  const { clinic } = config.settings;
  const buttonBase =
    "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[12.5px] font-bold transition focus-visible:outline-none focus-visible:ring-4";

  if (variant === "emergency" || variant === "crisis") {
    const primaryNumber = variant === "crisis" ? clinic.mentalHealthHelpline : clinic.emergencyNumber;

    return (
      <div className="w-full rounded-[20px] border border-rose-200 bg-rose-50/70 p-3">
        <div className="flex gap-2">
          <a
            href={`tel:${primaryNumber}`}
            className={`${buttonBase} bg-rose-600 text-white shadow-[0_10px_22px_rgba(225,29,72,0.28)] hover:bg-rose-700 focus-visible:ring-rose-300`}
          >
            <PhoneCall size={15} aria-hidden="true" />
            {variant === "crisis" ? `Call Tele-MANAS ${primaryNumber}` : `Call ${primaryNumber}`}
          </a>
          <a
            href={variant === "crisis" ? `tel:${clinic.emergencyNumber}` : clinic.phoneHref}
            className={`${buttonBase} border border-rose-200 bg-white text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-200`}
          >
            <Phone size={15} aria-hidden="true" />
            {variant === "crisis" ? `Call ${clinic.emergencyNumber}` : "Call clinic"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`${cardClass} p-3.5`}>
      <p className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
        <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--primary-color)]" />
        <span>
          <span className="block font-bold text-[var(--primary-text-color)]">{clinic.name}</span>
          {clinic.address}
        </span>
      </p>
      <p className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-[var(--primary-text-color)]">
        <Phone size={15} aria-hidden="true" className="shrink-0 text-[var(--primary-color)]" />
        {clinic.phoneDisplay}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {variant === "location" && (
          <a
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} border border-[#e2defa] bg-white text-[var(--primary-text-color)] hover:border-[var(--primary-color)]/50 focus-visible:ring-[var(--primary-color)]/15`}
          >
            <MapPin size={15} aria-hidden="true" />
            Directions
          </a>
        )}
        <a
          href={clinic.phoneHref}
          className={`${buttonBase} border border-[#e2defa] bg-white text-[var(--primary-text-color)] hover:border-[var(--primary-color)]/50 focus-visible:ring-[var(--primary-color)]/15`}
        >
          <PhoneCall size={15} aria-hidden="true" />
          Call
        </a>
        <a
          href={getWhatsAppLink(clinic.whatsAppNumber, "Hello, I would like to consult Dr. Kusum Lata Bhardwaj.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} bg-[#25d366] text-white hover:bg-[#1fbe5b] focus-visible:ring-[#25d366]/30`}
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export function DoctorCard({ config, onNavigate }: { config: ChatConfig; onNavigate: () => void }) {
  const { doctor, assistant } = config.settings;

  return (
    <div className={`${cardClass} p-3.5`}>
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#f0edff]">
          <Image src={assistant.avatar} alt="" fill sizes="56px" className="object-cover object-[center_18%]" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-black leading-snug text-[var(--primary-text-color)]">{doctor.name}</p>
          <p className="text-[12px] text-slate-500">{doctor.title}</p>
          <p className="text-[11.5px] font-bold text-[var(--primary-color)]">{doctor.credentials}</p>
        </div>
      </div>
      {[
        { title: "Qualifications", items: doctor.qualifications },
        { title: "Experience", items: doctor.highlights },
      ].map((section) => (
        <div key={section.title} className="mt-3">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">{section.title}</p>
          <ul className="mt-1.5 space-y-1.5">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2 text-[12.5px] leading-snug text-slate-600">
                <Check size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--primary-color)]" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        href={doctor.profileUrl}
        onClick={onNavigate}
        className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-bold text-[var(--primary-color)] underline-offset-4 hover:underline"
      >
        View full profile
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
