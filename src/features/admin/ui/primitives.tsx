import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Thin admin-specific wrappers over shadcn/ui.
 *
 * The admin panel uses shadcn components directly wherever a plain Button or
 * Input will do. These exist only for the three compositions that repeat on
 * every screen — a titled panel, a stat tile, a status chip — so those stay
 * consistent without each page re-assembling Card and Badge by hand.
 *
 * Colours come from the shadcn tokens, which `adminTheme.css` re-points inside
 * `.admin-root`, so nothing here hardcodes a palette.
 */

// ---------------------------------------------------------------- Panel

type PanelProps = {
  /** Small uppercase label above the title, as in "LOGO SETTINGS". */
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Panel({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  contentClassName,
}: PanelProps) {
  const hasHeader = Boolean(eyebrow || title || description || action);

  return (
    <Card className={cn("gap-0 py-0", className)}>
      {hasHeader ? (
        <CardHeader className="border-b [.border-b]:pb-4 gap-1 px-5 pt-4">
          {eyebrow ? (
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary/80">
              {Icon ? <Icon size={13} aria-hidden /> : null}
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <CardTitle className="text-[19px]">{title}</CardTitle>
          ) : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
          {action ? (
            <CardAction className="self-center">{action}</CardAction>
          ) : null}
        </CardHeader>
      ) : null}

      <CardContent className={cn("px-5 py-5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

// -------------------------------------------------------------- StatCard

export type StatTone = "neutral" | "accent" | "success" | "warning" | "danger";

const statToneClasses: Record<StatTone, string> = {
  neutral: "bg-secondary text-foreground",
  accent: "bg-[var(--adm-accent-soft)] text-primary",
  success: "bg-[var(--adm-success-soft)] text-[var(--adm-success)]",
  warning: "bg-[var(--adm-warning-soft)] text-[var(--adm-warning)]",
  danger: "bg-[var(--adm-danger-soft)] text-[var(--adm-danger)]",
};

export function StatCard({
  label,
  value,
  tone = "neutral",
  hint,
}: {
  label: string;
  value: ReactNode;
  tone?: StatTone;
  hint?: string;
}) {
  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span
          className={cn(
            "font-admin-display grid min-w-12 place-items-center rounded-lg px-3 py-1.5 text-[26px] font-extrabold leading-none tabular-nums",
            statToneClasses[tone]
          )}
        >
          {value}
        </span>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    </Card>
  );
}

// ------------------------------------------------------------- StatusPill

export type StatusTone = "success" | "warning" | "danger" | "neutral";

const statusToneClasses: Record<StatusTone, string> = {
  success:
    "border-transparent bg-[var(--adm-success-soft)] text-[var(--adm-success)]",
  warning:
    "border-transparent bg-[var(--adm-warning-soft)] text-[var(--adm-warning)]",
  danger:
    "border-transparent bg-[var(--adm-danger-soft)] text-[var(--adm-danger)]",
  neutral: "border-transparent bg-secondary text-muted-foreground",
};

export function StatusPill({
  tone = "neutral",
  children,
}: {
  tone?: StatusTone;
  children: ReactNode;
}) {
  return (
    <Badge variant="outline" className={cn("gap-1.5", statusToneClasses[tone])}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </Badge>
  );
}

// ------------------------------------------------------------- EmptyState

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
      {Icon ? (
        <Icon size={28} className="text-muted-foreground" aria-hidden />
      ) : null}
      <p className="mt-3 text-sm font-semibold">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
