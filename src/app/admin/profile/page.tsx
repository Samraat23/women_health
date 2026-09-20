import type { Metadata } from "next";
import { Database, KeyRound, ShieldCheck, UserCircle } from "lucide-react";

import { requireAdminSession } from "@/features/admin/firebase/requireAdminSession";
import AdminShell from "@/features/admin/shell/AdminShell";
import { Panel, StatusPill } from "@/features/admin/ui/primitives";
import { adminSessionMaxAge, getAllowedAdminEmail } from "@/lib/adminAuth";
import { cmsCollections } from "@/lib/cms/collections";
import { readCmsCollection } from "@/lib/cms/read";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Profile | WHealth Admin",
  robots: { index: false, follow: false },
};

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {hint ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
      <div className="min-w-0 text-right text-sm text-muted-foreground">
        {value}
      </div>
    </div>
  );
}

export default async function AdminProfilePage() {
  const admin = await requireAdminSession("/admin/profile");

  // A single cheap read that proves the Firestore connection end to end, rather
  // than reporting "connected" from configuration alone.
  const sections = await readCmsCollection(cmsCollections.sections);
  const isFirestoreReachable = sections.length > 0;

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "drkusumlata-36b7a";
  const sessionHours = Math.round(adminSessionMaxAge / 3600);

  return (
    <AdminShell
      activeModule="profile"
      title="My Profile"
      description="The account you are signed in with, and how it connects to Firebase."
      adminEmail={admin.email}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel eyebrow="Account" title="Signed in" icon={UserCircle}>
          <div className="mb-4 flex items-center gap-3">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground"
              aria-hidden
            >
              {admin.email.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">
                {admin.email}
              </p>
              <p className="text-xs text-muted-foreground">
                Super Admin
              </p>
            </div>
          </div>

          <Row
            label="Firebase UID"
            value={
              <code className="break-all text-xs">{admin.uid || "—"}</code>
            }
          />
          <Row
            label="Allowed admin address"
            value={<code className="text-xs">{getAllowedAdminEmail()}</code>}
            hint="Set by ADMIN_ALLOWED_EMAIL; must match the Firestore rules."
          />
          <Row
            label="Session length"
            value={`${sessionHours} hours`}
            hint="How long the admin cookie stays valid after sign-in."
          />
        </Panel>

        <Panel eyebrow="Firebase" title="Connection" icon={Database}>
          <Row
            label="Project"
            value={<code className="text-xs">{projectId}</code>}
          />
          <Row
            label="Firestore read"
            value={
              isFirestoreReachable ? (
                <StatusPill tone="success">Reachable</StatusPill>
              ) : (
                <StatusPill tone="warning">No documents</StatusPill>
              )
            }
            hint={
              isFirestoreReachable
                ? `${sections.length} section documents found.`
                : "Either nothing has been imported yet, or reads are blocked."
            }
          />
          <Row
            label="Content collections"
            value={
              <code className="text-xs">
                {cmsCollections.sections}, {cmsCollections.articles}, …
              </code>
            }
          />
        </Panel>

        <Panel
          eyebrow="Security"
          title="How access works"
          icon={ShieldCheck}
          className="lg:col-span-2"
        >
          <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
            <li className="flex gap-2.5">
              <KeyRound
                size={15}
                className="mt-1 shrink-0 text-primary"
                aria-hidden
              />
              <span>
                Signing in verifies your Firebase ID token on the server, then
                sets a signed, http-only cookie. That cookie decides which admin
                screens render.
              </span>
            </li>
            <li className="flex gap-2.5">
              <ShieldCheck
                size={15}
                className="mt-1 shrink-0 text-primary"
                aria-hidden
              />
              <span>
                Saving content writes to Firestore as your Firebase user, so the
                security rules — not the cookie — are what actually authorise
                every edit. Losing the Firebase session blocks saves even while
                the panel still loads.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Database
                size={15}
                className="mt-1 shrink-0 text-primary"
                aria-hidden
              />
              <span>
                Patient chat requests are readable only by this account and are
                never writable from a browser.
              </span>
            </li>
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}
