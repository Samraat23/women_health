import type { Metadata } from "next";
import Link from "next/link";
import { Laptop, Smartphone, Tablet } from "lucide-react";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { EmptyState, Panel, StatCard, StatusPill } from "@/features/admin/ui/primitives";
import { eventNameIcon, eventNameLabel } from "@/features/admin/analytics/eventMeta";
import { buildSessionTimeline } from "@/features/analytics/server/aggregate";
import { getAnalyticsEventRepository } from "@/features/analytics/server/eventStore";
import type { AnalyticsEvent, DeviceCategory } from "@/features/analytics/core/types";
import { getChatRequestRepository } from "@/features/chat/server/requestStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Session | WHealth Admin",
  robots: { index: false, follow: false },
};

const eventReadLimit = 20_000;

const deviceIcons: Record<DeviceCategory, typeof Laptop> = {
  desktop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
};

const timeFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "medium",
});

const clockFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function formatSeconds(totalSeconds: number) {
  if (totalSeconds <= 0) return "0s";

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const admin = await requireAdminSession("/admin/analytics/sessions");
  const { sessionId } = await params;

  let loadError = "";
  let sessionEvents: AnalyticsEvent[] = [];
  let timeline: ReturnType<typeof buildSessionTimeline> = { events: [], chatRequests: [] };

  try {
    const [allEvents, chatRequests] = await Promise.all([
      getAnalyticsEventRepository().list(eventReadLimit),
      getChatRequestRepository().list(5_000),
    ]);

    sessionEvents = allEvents.filter((event) => event.sessionId === sessionId);
    timeline = buildSessionTimeline(allEvents, chatRequests, sessionId);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load this session.";
  }

  const first = sessionEvents[0];
  const activeSeconds = Math.round(
    timeline.events.reduce((sum, event) => sum + (event.eventName === "engagement" ? event.engagementMs ?? 0 : 0), 0) /
      1000
  );
  const DeviceIcon = first ? deviceIcons[first.device] : Laptop;

  return (
    <AdminShell
      adminEmail={admin.email}
      activeModule="analytics"
      title="Session"
      description={sessionId}
      breadcrumbs={[
        { label: "Admin Panel", href: "/admin/dashboard" },
        { label: "Analytics", href: "/admin/analytics" },
        { label: "Sessions", href: "/admin/analytics/sessions" },
        { label: sessionId.slice(0, 8) },
      ]}
    >
      <div className="space-y-5">
        {loadError ? (
          <p className="rounded-lg border border-[var(--adm-danger-soft)] bg-[var(--adm-danger-soft)] p-4 text-sm font-semibold text-[var(--adm-danger)]">
            {loadError}
          </p>
        ) : !first ? (
          <Panel contentClassName="p-0">
            <div className="p-5">
              <EmptyState
                title="No events found for this session"
                description="It may be outside the server's read window, or the session id is wrong."
                action={
                  <Link href="/admin/analytics/sessions" className="text-sm font-semibold text-primary hover:underline">
                    Back to Session Explorer
                  </Link>
                }
              />
            </div>
          </Panel>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Visitor"
                value={<span className="font-mono text-lg">{first.visitorId.slice(0, 10)}…</span>}
              />
              <StatCard
                label="Device"
                value={
                  <span className="flex items-center gap-2">
                    <DeviceIcon size={18} aria-hidden />
                    {first.browser || "Unknown"}
                  </span>
                }
                hint={first.os}
              />
              <StatCard label="Source" value={first.trafficSource} hint={first.country} />
              <StatCard label="Active time" value={formatSeconds(activeSeconds)} />
            </div>

            <Panel
              eyebrow="Timeline"
              title="Session activity"
              description={`Started ${timeFormat.format(new Date(first.createdAt))}, Asia/Kolkata`}
              contentClassName="p-0"
            >
              <ol className="divide-y">
                {timeline.events.map((event) => {
                  const Icon = eventNameIcon(event.eventName);

                  return (
                    <li key={event.id} className="flex items-start gap-3 px-5 py-3.5">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--adm-accent-soft)] text-primary">
                        <Icon size={15} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-foreground">{eventNameLabel(event.eventName)}</p>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {clockFormat.format(new Date(event.createdAt))}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {event.path}
                          {event.elementLabel ? ` — "${event.elementLabel}"` : ""}
                          {event.destinationPath ? ` → ${event.destinationPath}` : ""}
                          {event.formId ? ` — form: ${event.formId}` : ""}
                          {event.formField ? ` (${event.formField})` : ""}
                          {typeof event.engagementMs === "number"
                            ? ` — active ${formatSeconds(Math.round(event.engagementMs / 1000))}`
                            : ""}
                          {event.scrollDepth ? ` — scrolled ${event.scrollDepth}%` : ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Panel>

            {timeline.chatRequests.length > 0 ? (
              <Panel eyebrow="Linked" title="Chat / appointment requests" contentClassName="p-0">
                <ul className="divide-y">
                  {timeline.chatRequests.map((request) => (
                    <li key={request.referenceId} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <div>
                        <p className="font-mono text-xs font-bold text-muted-foreground">{request.referenceId}</p>
                        <p className="text-sm font-semibold text-foreground">
                          {request.kind === "appointment" ? "Appointment request" : "Inquiry"} — {request.patient.name}
                        </p>
                      </div>
                      <StatusPill tone="success">{request.status}</StatusPill>
                    </li>
                  ))}
                </ul>
                <p className="border-t px-5 py-3 text-xs text-muted-foreground">
                  Full details — phone number, appointment or inquiry text — are in{" "}
                  <Link href="/admin/chat-requests" className="text-primary hover:underline">
                    Chat Requests
                  </Link>
                  , not duplicated here.
                </p>
              </Panel>
            ) : null}
          </>
        )}
      </div>
    </AdminShell>
  );
}
