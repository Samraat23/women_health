"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Activity, ChevronRight, Menu, ShieldCheck } from "lucide-react";

import AdminCommandPalette from "./AdminCommandPalette";
import AdminSidebar from "./AdminSidebar";
import AdminLogoutButton from "@/features/admin/home/AdminLogoutButton";
import { getAdminModule } from "@/lib/cms/modules";

import "./adminTheme.css";

/**
 * The admin panel frame: sidebar, top bar, and page container.
 *
 * Client-side because the sidebar filter, the ⌘K palette, and the mobile
 * drawer all hold state. The page content itself is passed in as `children`
 * and can be server-rendered — so a module page does its Firestore reads on
 * the server and only this chrome ships as JavaScript.
 */

export type AdminBreadcrumb = {
  label: string;
  href?: string;
};

type AdminShellProps = {
  activeModule: string;
  title: string;
  description?: string;
  /** Signed-in admin, shown in the top-right. */
  adminEmail: string;
  breadcrumbs?: AdminBreadcrumb[];
  /** Buttons rendered beside the page title. */
  actions?: ReactNode;
  children: ReactNode;
};

const projectName = "Dr. Kusum Gynae Centre";

function displayNameFrom(email: string) {
  const [localPart] = email.split("@");

  if (!localPart) return "Admin";

  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function AdminShell({
  activeModule,
  title,
  description,
  adminEmail,
  breadcrumbs,
  actions,
  children,
}: AdminShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const moduleItem = getAdminModule(activeModule);
  const displayName = displayNameFrom(adminEmail);

  const trail: AdminBreadcrumb[] = breadcrumbs || [
    { label: "Admin Panel", href: "/admin/dashboard" },
    { label: projectName },
    { label: moduleItem?.label || title },
  ];

  // Closing the drawer on navigation is handled by the sidebar's onNavigate
  // callback below, not by an effect watching activeModule — the callback
  // fires on the click that starts the navigation, which is both earlier and
  // free of the cascading render an effect would cause.

  // The page behind an open drawer must not scroll.
  useEffect(() => {
    if (!isDrawerOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDrawerOpen]);

  return (
    <div className="admin-root min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[var(--adm-sidebar-width)_minmax(0,1fr)]">
        {/* ----------------------------------------- sidebar (desktop) */}
        <aside className="hidden border-r border-border lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar activeModule={activeModule} projectName={projectName} />
          </div>
        </aside>

        {/* ------------------------------------------ sidebar (mobile) */}
        {isDrawerOpen ? (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close navigation"
            />
            <div className="relative h-full w-[var(--adm-sidebar-width)] max-w-[85vw] border-r border-border">
              <AdminSidebar
                activeModule={activeModule}
                projectName={projectName}
                onNavigate={() => setIsDrawerOpen(false)}
              />
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------ main column */}
        <div className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
            <div className="flex h-[var(--adm-topbar-height)] items-center gap-3 px-4 lg:px-6">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-input text-muted-foreground transition hover:text-foreground lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={17} aria-hidden />
              </button>

              {/* Held back to 2xl: at 1280 the breadcrumb, the search box and
                  the account chip together overflow, and the breadcrumb is the
                  least useful of the three since the sidebar already shows
                  where you are. */}
              <nav
                aria-label="Breadcrumb"
                className="hidden min-w-0 shrink-0 items-center gap-1.5 whitespace-nowrap text-sm 2xl:flex"
              >
                {trail.map((crumb, index) => {
                  const isLast = index === trail.length - 1;

                  return (
                    <span key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                      {index > 0 ? (
                        <ChevronRight
                          size={14}
                          className="text-muted-foreground"
                          aria-hidden
                        />
                      ) : null}
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className="text-muted-foreground transition hover:text-foreground"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span
                          className={
                            isLast
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground"
                          }
                          aria-current={isLast ? "page" : undefined}
                        >
                          {crumb.label}
                        </span>
                      )}
                    </span>
                  );
                })}
              </nav>

              <div className="flex flex-1 justify-center px-2">
                <AdminCommandPalette />
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground md:inline-flex"
                >
                  <Activity size={13} aria-hidden />
                  View site
                </Link>

                <span className="hidden items-center gap-1.5 rounded-lg bg-[var(--adm-accent-soft)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary md:inline-flex">
                  <ShieldCheck size={13} aria-hidden />
                  Super Admin
                </span>

                <div className="flex items-center gap-2.5 rounded-lg border border-input py-1.5 pl-1.5 pr-3">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
                    aria-hidden
                  >
                    {displayName.charAt(0)}
                  </span>
                  <span className="hidden min-w-0 leading-tight sm:block">
                    <span className="block truncate text-xs font-bold text-foreground">
                      {displayName}
                    </span>
                    <span className="block max-w-[150px] truncate text-[10px] text-muted-foreground">
                      {adminEmail}
                    </span>
                  </span>
                </div>

                <AdminLogoutButton />
              </div>
            </div>
          </header>

          <main className="px-4 py-6 lg:px-6 lg:py-7">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-foreground">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                ) : null}
              </div>
              {actions ? (
                <div className="flex flex-wrap items-center gap-2">{actions}</div>
              ) : null}
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
