"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, HeartPulse, PanelLeftClose, Search } from "lucide-react";

import {
  adminModuleGroups,
  adminModules,
  type AdminModule,
} from "@/lib/cms/modules";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  activeModule: string;
  /** Shown in the project header, e.g. the site being edited. */
  projectName: string;
  onNavigate?: () => void;
};

export default function AdminSidebar({
  activeModule,
  projectName,
  onNavigate,
}: AdminSidebarProps) {
  const [filter, setFilter] = useState("");

  const groups = useMemo(() => {
    const query = filter.trim().toLowerCase();

    const matches = (moduleItem: AdminModule) =>
      !query ||
      moduleItem.label.toLowerCase().includes(query) ||
      moduleItem.description.toLowerCase().includes(query);

    return adminModuleGroups
      .map((group) => ({
        ...group,
        modules: adminModules.filter(
          (moduleItem) =>
            moduleItem.group === group.id && !moduleItem.hidden && matches(moduleItem)
        ),
      }))
      .filter((group) => group.modules.length > 0);
  }, [filter]);

  return (
    <div className="flex h-full flex-col bg-card">
      {/* ------------------------------------------------ project header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-5">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-[0_8px_18px_-8px_rgba(27,20,99,0.55)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--ui-primary), var(--adm-ink))",
          }}
        >
          <HeartPulse size={20} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-admin-display truncate text-[15px] font-extrabold leading-tight tracking-tight text-foreground">
            {projectName}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
            Project
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigate}
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Close menu"
        >
          <PanelLeftClose size={17} aria-hidden />
        </button>
      </div>

      {/* -------------------------------------------------- filter input */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filter modules..."
            aria-label="Filter modules"
            className="pl-9"
          />
        </div>
      </div>

      {/* ------------------------------------------------------ nav list */}
      <nav
        className="admin-scroll flex-1 overflow-y-auto px-3 pb-4"
        aria-label="Admin modules"
      >
        {groups.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            No module matches “{filter}”.
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="mb-6">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.modules.map((moduleItem) => {
                  const Icon = moduleItem.icon;
                  const isActive = moduleItem.id === activeModule;

                  return (
                    <li key={moduleItem.id}>
                      <Link
                        href={moduleItem.href}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        title={moduleItem.description}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition",
                          isActive
                            ? "text-[var(--adm-ink-foreground)] shadow-[0_6px_16px_-8px_rgba(27,20,99,0.7)]"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        )}
                        style={
                          isActive
                            ? {
                                backgroundImage:
                                  "linear-gradient(135deg, var(--adm-ink), #2a2070)",
                              }
                            : undefined
                        }
                      >
                        <Icon size={17} className="shrink-0" aria-hidden />
                        <span className="min-w-0 flex-1 truncate">
                          {moduleItem.label}
                        </span>
                        {isActive ? (
                          <ChevronRight size={15} className="shrink-0" aria-hidden />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </nav>

      {/* ------------------------------------------------------- footer */}
      <div className="border-t border-border px-4 py-3.5">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--adm-success)]">
          <span className="h-2 w-2 rounded-full bg-[var(--adm-success)]" aria-hidden />
          Super Admin
        </p>
      </div>
    </div>
  );
}
