import type { DailyPoint } from "@/features/analytics/server/aggregate";

/**
 * Daily page views (area) with sessions overlaid (line). Plain server-rendered
 * SVG — no charting library, no client JS. Precise hover tooltips are not
 * worth the added client bundle for a dashboard a single admin checks
 * periodically; the day labels and the two series are legible on their own.
 */

const width = 960;
const height = 220;
const paddingX = 8;
const paddingTop = 16;
const paddingBottom = 28;

const dayLabelFormat = new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" });

function pointsFor(values: number[], max: number) {
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingTop - paddingBottom;
  const step = values.length > 1 ? plotWidth / (values.length - 1) : 0;

  return values.map((value, index) => {
    const x = paddingX + step * index;
    const y = paddingTop + plotHeight - (max > 0 ? (value / max) * plotHeight : 0);

    return { x, y };
  });
}

export function TrendChart({ daily }: { daily: DailyPoint[] }) {
  if (daily.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm font-medium text-muted-foreground">
        No page views in this range yet.
      </div>
    );
  }

  const max = Math.max(1, ...daily.map((point) => point.pageViews), ...daily.map((point) => point.sessions));
  const viewPoints = pointsFor(
    daily.map((point) => point.pageViews),
    max
  );
  const sessionPoints = pointsFor(
    daily.map((point) => point.sessions),
    max
  );

  const areaPath =
    `M ${viewPoints[0].x} ${height - paddingBottom} ` +
    viewPoints.map((point) => `L ${point.x} ${point.y}`).join(" ") +
    ` L ${viewPoints[viewPoints.length - 1].x} ${height - paddingBottom} Z`;
  const linePath = viewPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const sessionPath = sessionPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  // Show at most 7 labels so dense ranges (90 days) don't overlap.
  const labelStride = Math.max(1, Math.ceil(daily.length / 7));

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full" preserveAspectRatio="none" role="img" aria-label="Daily page views and sessions">
        <defs>
          <linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ui-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--ui-primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1={paddingX}
            x2={width - paddingX}
            y1={paddingTop + (height - paddingTop - paddingBottom) * fraction}
            y2={paddingTop + (height - paddingTop - paddingBottom) * fraction}
            stroke="var(--ui-border)"
            strokeDasharray="4 4"
          />
        ))}

        <path d={areaPath} fill="url(#analytics-area)" stroke="none" />
        <path d={linePath} fill="none" stroke="var(--ui-primary)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        <path
          d={sessionPath}
          fill="none"
          stroke="var(--adm-warning)"
          strokeWidth={2}
          strokeDasharray="5 4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="mt-1 flex justify-between text-[10px] font-semibold text-muted-foreground">
        {daily.map((point, index) =>
          index % labelStride === 0 || index === daily.length - 1 ? (
            <span key={point.date}>{dayLabelFormat.format(new Date(`${point.date}T00:00:00+05:30`))}</span>
          ) : null
        )}
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full bg-primary" aria-hidden />
          Page views
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full bg-[var(--adm-warning)]" aria-hidden />
          Sessions
        </span>
      </div>
    </div>
  );
}
