import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarHeart,
  Database,
  MessageSquareText,
  Phone,
} from "lucide-react";

import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminModuleShell from "@/features/admin/modules/AdminModuleShell";
import { formatIndianMobile } from "@/features/chat/core/validation";
import {
  getChatRequestRepository,
  type StoredChatRequest,
} from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chat Requests | WHealth Admin",
  description: "Appointment requests and patient inquiries from the website chat.",
  robots: { index: false, follow: false },
};

type Filter = "all" | "appointment" | "inquiry";

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "appointment", label: "Appointments" },
  { id: "inquiry", label: "Inquiries" },
];

const receivedFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</dt>
      <dd className="mt-0.5 break-words text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}

function RequestCard({ request }: { request: StoredChatRequest }) {
  const isAppointment = request.kind === "appointment";
  const phone = formatIndianMobile(request.patient.phone);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-black ${
            isAppointment ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {isAppointment ? <CalendarHeart size={14} /> : <MessageSquareText size={14} />}
          {isAppointment ? "Appointment" : "Inquiry"}
        </span>
        <span className="font-mono text-xs font-bold text-slate-500">{request.referenceId}</span>
        {request.clinicNotified && (
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">WhatsApp sent</span>
        )}
        <span className="ml-auto text-xs font-semibold text-slate-400">
          {receivedFormat.format(new Date(request.createdAt))}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-black text-slate-950">
            {request.patient.name}
            {request.patient.age !== undefined && (
              <span className="ml-2 text-sm font-semibold text-slate-500">{request.patient.age} yrs</span>
            )}
          </p>
          <p className="text-sm font-semibold text-slate-600">{phone}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:+91${request.patient.phone}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Phone size={15} />
            Call
          </a>
          <a
            href={`https://wa.me/91${request.patient.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#25d366] px-3 text-sm font-bold text-white transition hover:bg-[#1fbe5b]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {request.appointment ? (
          <>
            <Detail label="Consulting for" value={request.appointment.serviceLabel} />
            <Detail label="Consultation" value={request.appointment.consultationLabel} />
            <Detail label="Preferred date" value={request.appointment.dateLabel} />
            <Detail label="Preferred time" value={request.appointment.timeSlotLabel} />
            {request.appointment.concern && (
              <div className="sm:col-span-2 lg:col-span-4">
                <Detail label="Patient's note" value={request.appointment.concern} />
              </div>
            )}
          </>
        ) : (
          <>
            <Detail label="Topic" value={request.inquiry?.serviceLabel} />
            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Question</dt>
              <dd className="mt-1 whitespace-pre-line break-words rounded-lg bg-slate-50 p-3 text-sm font-medium leading-6 text-slate-800">
                {request.inquiry?.text}
              </dd>
            </div>
          </>
        )}
      </dl>

      {request.sourcePath && (
        <p className="mt-3 text-xs font-semibold text-slate-400">Sent from {request.sourcePath}</p>
      )}
    </article>
  );
}

export default async function AdminChatRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  await requireAdminSession("/admin/chat-requests");

  const { type } = await searchParams;
  const filter: Filter = type === "appointment" || type === "inquiry" ? type : "all";
  let requests: StoredChatRequest[] = [];
  let driver = "file";
  let loadError = "";

  try {
    const repository = getChatRequestRepository();

    driver = repository.driver;
    requests = await repository.list(300);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load chat requests.";
  }

  const counts = {
    all: requests.length,
    appointment: requests.filter((request) => request.kind === "appointment").length,
    inquiry: requests.filter((request) => request.kind === "inquiry").length,
  };
  const visible = filter === "all" ? requests : requests.filter((request) => request.kind === filter);

  return (
    <AdminModuleShell
      activeModule="chat-requests"
      title="Chat Requests"
      description="Appointment requests and patient inquiries sent from the website chat, newest first."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1" aria-label="Filter requests">
            {filters.map((item) => (
              <Link
                key={item.id}
                href={item.id === "all" ? "/admin/chat-requests" : `/admin/chat-requests?type=${item.id}`}
                aria-current={filter === item.id ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm font-bold transition ${
                  filter === item.id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
                <span className={`ml-1.5 text-xs ${filter === item.id ? "text-white/60" : "text-slate-400"}`}>
                  {counts[item.id]}
                </span>
              </Link>
            ))}
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
            <Database size={14} />
            Stored in {driver === "firestore" ? "Firestore" : "the server's private data folder"}
          </span>
        </div>

        {loadError ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{loadError}</p>
        ) : visible.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-semibold text-slate-500">
            No {filter === "all" ? "requests" : filter === "appointment" ? "appointment requests" : "inquiries"} yet.
          </p>
        ) : (
          <div className="space-y-3">
            {visible.map((request) => (
              <RequestCard key={request.referenceId} request={request} />
            ))}
          </div>
        )}
      </div>
    </AdminModuleShell>
  );
}
