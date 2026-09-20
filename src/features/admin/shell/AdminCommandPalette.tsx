"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { adminModuleGroups, adminModules } from "@/lib/cms/modules";
import { cn } from "@/lib/utils";

/**
 * "Jump to module" — the ⌘K search in the top bar.
 *
 * Kept separate from the top bar so the bar stays a thin client component and
 * the palette's keyboard handling lives in one place.
 */

const groupLabels = new Map(
  adminModuleGroups.map((group) => [group.id, group.label])
);

export default function AdminCommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const visible = adminModules.filter((item) => !item.hidden);

    if (!normalized) return visible;

    return visible.filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.href.toLowerCase().includes(normalized)
    );
  }, [query]);

  // Opening clears any query left from last time, so a stale filter cannot
  // hide every result. Done on the opening event rather than in an effect
  // watching isOpen, which would cost a second render pass.
  const open = useCallback(() => {
    setQuery("");
    setHighlighted(0);
    setIsOpen(true);
  }, []);

  // ⌘K / Ctrl-K is global, so it binds to the document rather than an input.
  // Dialog handles Escape and the overlay click itself.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((wasOpen) => {
          if (wasOpen) return false;

          setQuery("");
          setHighlighted(0);

          return true;
        });
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // A shrinking result list can leave the stored index past the end, so the
  // effective highlight is clamped during render rather than corrected in an
  // effect — no extra render pass, and never a frame pointing at nothing.
  const activeIndex =
    results.length === 0 ? 0 : Math.min(highlighted, results.length - 1);

  function go(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((activeIndex + 1) % Math.max(results.length, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted(
        (activeIndex - 1 + Math.max(results.length, 1)) %
          Math.max(results.length, 1)
      );
      return;
    }

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex].href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex w-full max-w-md items-center gap-2.5 rounded-lg border bg-background px-3.5 py-2 text-sm text-muted-foreground transition hover:border-ring/50"
      >
        <Search size={15} aria-hidden />
        <span className="flex-1 text-left">Jump to module...</span>
        <kbd className="hidden rounded border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold sm:block">
          ⌘K
        </kbd>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="top-[14%] max-w-lg translate-y-0 gap-0 p-0"
        >
          {/* Radix requires a title and description for the dialog to be
              announced. Both are visually hidden: the search field is
              self-explanatory on screen. */}
          <DialogTitle className="sr-only">Jump to module</DialogTitle>
          <DialogDescription className="sr-only">
            Search the admin panel and press Enter to open a module.
          </DialogDescription>

          <div className="flex items-center gap-3 border-b px-4">
            <Search size={17} className="text-muted-foreground" aria-hidden />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search modules..."
              aria-label="Search modules"
              className="h-12 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>

          <ul className="admin-scroll max-h-80 overflow-y-auto p-2">
            {results.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                Nothing matches “{query}”.
              </li>
            ) : (
              results.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlighted(index)}
                      onClick={() => go(item.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
                        index === activeIndex ? "bg-accent" : "hover:bg-accent"
                      )}
                    >
                      <Icon
                        size={16}
                        className="shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                          {item.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {groupLabels.get(item.group)}
                        </span>
                      </span>
                      {index === activeIndex ? (
                        <CornerDownLeft
                          size={14}
                          className="shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
