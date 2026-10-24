import type { LucideIcon } from "lucide-react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Trend } from "@/features/analytics/server/aggregate";

const numberFormat = new Intl.NumberFormat("en-IN");

function formatChange(trend: Trend) {
  if (trend.changePct === null) return "No prior data";

  const rounded = Math.round(Math.abs(trend.changePct) * 10) / 10;

  return `${rounded}% vs previous period`;
}

/** `125` seconds -> "2m 5s"; under a minute just "45s". */
export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function KpiCard({
  label,
  trend,
  icon: Icon,
  valueFormat = "number",
  invertTone = false,
}: {
  label: string;
  trend: Trend;
  icon?: LucideIcon;
  /** "duration" reads `trend.value` as whole seconds; "percent" appends "%" — the only other shapes a Trend carries today. */
  valueFormat?: "number" | "duration" | "percent";
  /** True for a metric where "up" is bad news (bounce rate, exit rate) — swaps which direction reads green vs red. */
  invertTone?: boolean;
}) {
  const DirectionIcon = trend.direction === "up" ? TrendingUp : trend.direction === "down" ? TrendingDown : Minus;
  const isGood = invertTone ? trend.direction === "down" : trend.direction === "up";
  const toneClass =
    trend.direction === "flat"
      ? "text-muted-foreground"
      : isGood
        ? "text-[var(--adm-success)]"
        : "text-[var(--adm-danger)]";

  return (
    <Card className="gap-0 px-5 py-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        {Icon ? <Icon size={15} className="text-primary" aria-hidden /> : null}
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums text-foreground">
        {valueFormat === "duration"
          ? formatDuration(trend.value)
          : valueFormat === "percent"
            ? `${numberFormat.format(trend.value)}%`
            : numberFormat.format(trend.value)}
      </p>
      <p className={cn("mt-2 flex items-center gap-1.5 text-xs font-semibold", toneClass)}>
        <DirectionIcon size={13} aria-hidden />
        {formatChange(trend)}
      </p>
    </Card>
  );
}

export function SimpleStatCard({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-bold tabular-nums text-foreground">{numberFormat.format(value)}</p>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </Card>
  );
}
