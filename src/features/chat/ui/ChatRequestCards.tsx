"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ClipboardCheck,
  Copy,
  LoaderCircle,
  PenLine,
  ShieldCheck,
} from "lucide-react";

import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { fillTemplate, getFirstName } from "@/features/chat/core/catalog";
import { getFieldOrder } from "@/features/chat/core/prompts";
import { getSummaryRows } from "@/features/chat/core/requestSummary";
import type { ChatEvent } from "@/features/chat/core/state";
import type {
  ChatConfig,
  ChatSubmission,
  SubmitSuccess,
} from "@/features/chat/core/types";
import { formatIndianMobile } from "@/features/chat/core/validation";
import { brandGradient, cardClass } from "@/features/chat/ui/styles";

export function ReviewCard({
  config,
  submission,
  active,
  submitting,
  dispatch,
}: {
  config: ChatConfig;
  submission: ChatSubmission;
  active: boolean;
  submitting: boolean;
  dispatch: (event: ChatEvent) => void;
}) {
  const rows = getSummaryRows(submission, config);
  const editable = new Set(getFieldOrder(config, submission.kind));
  const isAppointment = submission.kind === "appointment";

  return (
    <div className={`${cardClass} overflow-hidden transition ${active ? "" : "opacity-60"}`}>
      <div className="flex items-center gap-2 border-b border-[#f1effb] bg-[#fbfaff] px-3.5 py-2.5">
        <ClipboardCheck size={16} aria-hidden="true" className="text-[var(--primary-color)]" />
        <p className="flex-1 text-[13px] font-black text-[var(--primary-text-color)]">
          {isAppointment ? "Appointment request" : "Your question for the clinic"}
        </p>
        {!active && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-500">Earlier version</span>
        )}
      </div>

      <dl className="divide-y divide-[#f4f2fc]">
        {rows.map((row) => (
          <div key={row.field} className="flex items-start gap-2 px-3.5 py-2">
            <dt className="w-[96px] shrink-0 pt-px text-[12px] leading-5 text-slate-500">{row.label}</dt>
            <dd className="min-w-0 flex-1 whitespace-pre-line break-words text-[13px] font-semibold leading-5 text-[var(--primary-text-color)]">
              {row.value}
            </dd>
            {active && !submitting && editable.has(row.field) && (
              <button
                type="button"
                aria-label={`Change ${row.label.toLowerCase()}`}
                onClick={() => dispatch({ type: "edit", field: row.field })}
                className="-my-1 grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full text-slate-400 transition hover:bg-[#f0edff] hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40"
              >
                <PenLine size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
      </dl>

      {active && (
        <div className="px-3.5 pb-3 pt-2">
          <button
            type="button"
            disabled={submitting}
            onClick={() => dispatch({ type: "confirm" })}
            className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-[14px] font-bold text-white shadow-[0_12px_26px_rgba(90,79,254,0.3)] transition hover:-translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/25 disabled:cursor-wait disabled:hover:translate-y-0 ${brandGradient}`}
          >
            {submitting ? (
              <>
                <LoaderCircle size={17} aria-hidden="true" className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Check size={17} aria-hidden="true" strokeWidth={3} />
                {isAppointment ? "Confirm & request appointment" : "Send my question"}
              </>
            )}
          </button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
            <ShieldCheck size={13} aria-hidden="true" className="shrink-0 text-emerald-500" />
            {config.settings.copy.privacyNote}
          </p>
        </div>
      )}
    </div>
  );
}

export function SuccessCard({
  config,
  submission,
  result,
}: {
  config: ChatConfig;
  submission: ChatSubmission;
  result: SubmitSuccess;
}) {
  const { copy } = config.settings;
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);
  const isAppointment = submission.kind === "appointment";
  const values = {
    firstName: getFirstName(submission.patient.name),
    phone: formatIndianMobile(submission.patient.phone),
  };
  const highlights = getSummaryRows(submission, config).filter((row) =>
    isAppointment ? ["serviceId", "consultationType", "date", "timeSlotId"].includes(row.field) : row.field === "inquiry"
  );

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(result.referenceId);
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; the reference stays visible to note down.
    }
  };

  // wa.me can only pre-fill the message; say plainly that Send must be tapped.
  const whatsAppNote = !result.stored
    ? "One last step: tap below and press Send in WhatsApp, so your request reaches the clinic."
    : result.clinicNotified
      ? "The clinic has been notified. You can also message them on WhatsApp for a quicker reply."
      : "For faster confirmation, send these details to the clinic on WhatsApp — just press Send when it opens.";

  return (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="flex flex-col items-center bg-[radial-gradient(circle_at_top,#ecfdf5_0%,#ffffff_70%)] px-4 pb-3 pt-5 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_26px_rgba(16,185,129,0.35)]">
          <Check size={28} strokeWidth={3} aria-hidden="true" />
        </span>
        <p className="mt-3 text-[16px] font-black leading-snug text-[var(--primary-text-color)]">
          {isAppointment ? copy.successAppointmentTitle : copy.successInquiryTitle}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
          {fillTemplate(isAppointment ? copy.successAppointmentBody : copy.successInquiryBody, values)}
        </p>
        <button
          type="button"
          onClick={copyReference}
          aria-label={`Copy reference ${result.referenceId}`}
          className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e2defa] bg-white px-3 py-1.5 text-[12px] font-bold text-[var(--primary-text-color)] transition hover:border-[var(--primary-color)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/30"
        >
          <span className="text-slate-400">Ref</span>
          <span className="tracking-wide">{result.referenceId}</span>
          {copied ? (
            <Check size={13} aria-hidden="true" className="text-emerald-500" />
          ) : (
            <Copy size={13} aria-hidden="true" className="text-slate-400" />
          )}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? "Reference copied" : ""}
        </span>
      </div>

      {highlights.length > 0 && (
        <dl className="mx-3.5 divide-y divide-[#f4f2fc] rounded-2xl border border-[#f1effb] bg-[#fbfaff]">
          {highlights.map((row) => (
            <div key={row.field} className="flex items-start justify-between gap-3 px-3 py-2">
              <dt className="shrink-0 text-[12px] text-slate-500">{row.label}</dt>
              <dd className="line-clamp-3 min-w-0 text-right text-[12.5px] font-semibold text-[var(--primary-text-color)]">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="p-3.5">
        <p
          className={`mb-2.5 text-[12px] leading-relaxed ${
            result.stored ? "text-slate-500" : "rounded-xl bg-amber-50 p-2.5 font-semibold text-amber-900"
          }`}
        >
          {whatsAppNote}
        </p>
        <a
          href={result.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] text-[14px] font-bold text-white shadow-[0_12px_26px_rgba(18,140,74,0.28)] transition hover:-translate-y-px hover:bg-[#1fbe5b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25d366]/30"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Send details on WhatsApp
        </a>
      </div>
    </div>
  );
}
