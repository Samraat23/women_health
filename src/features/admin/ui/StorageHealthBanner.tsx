import { TriangleAlert } from "lucide-react";

/**
 * Shown on Dashboard, Analytics and Chat Requests whenever that page's
 * repository is running on the "file" driver instead of Firestore.
 *
 * On a long-running server with a persistent disk, the file driver is a
 * legitimate local-dev fallback. On a serverless host (Vercel and most
 * others) it silently loses data: each request can land on a different,
 * ephemeral instance, so a write from one request is often invisible to a
 * read from the next — which is exactly why a page can say "0" here while
 * real traffic or real submissions are happening on the live site.
 */
export function StorageHealthBanner({ subject }: { subject: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--adm-warning)]/30 bg-[var(--adm-warning-soft)] p-4">
      <TriangleAlert size={18} className="mt-0.5 shrink-0 text-[var(--adm-warning)]" aria-hidden />
      <div className="text-sm text-[var(--adm-warning)]">
        <p className="font-bold">{subject} is not reliably persisting on this deployment.</p>
        <p className="mt-1 leading-relaxed">
          It is running on local file storage instead of Firestore. On most hosting platforms
          (including Vercel) that storage resets between requests, so data written one moment can
          already be gone the next — this is very likely why nothing is showing up, not that there
          is no real traffic or no real submissions.
        </p>
        <p className="mt-2 leading-relaxed">
          <strong>Fix:</strong> in your hosting platform&apos;s environment variables, set{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs">FIREBASE_SERVICE_ACCOUNT_KEY</code> (the
          service account JSON, raw or base64) — or{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs">FIREBASE_CLIENT_EMAIL</code> +{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs">FIREBASE_PRIVATE_KEY</code> — then
          redeploy. The same variables unlock Firestore storage for every feature that uses this
          pattern (analytics, chat requests), not just this page.
        </p>
      </div>
    </div>
  );
}
