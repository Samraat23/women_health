import type { ReactNode } from "react";

const numberFormat = new Intl.NumberFormat("en-IN");

export function BreakdownBars<T extends string>({
  rows,
  labelFor,
  iconFor,
  emptyLabel,
}: {
  rows: Array<{ key: T; count: number; share: number }>;
  labelFor?: (key: T) => ReactNode;
  iconFor?: (key: T) => ReactNode;
  emptyLabel: string;
}) {
  if (rows.length === 0) {
    return <p className="py-6 text-center text-sm font-medium text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-3.5">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
              {iconFor ? iconFor(row.key) : null}
              <span className="truncate">{labelFor ? labelFor(row.key) : row.key}</span>
            </span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {numberFormat.format(row.count)} · {row.share}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(row.share, row.count > 0 ? 2 : 0)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
