type WeekSizeBadgeProps = {
  week: number;
  totalWeeks: number;
  color: string;
  sizeLabel: string;
  /** Pixel size of the square badge. */
  size?: number;
};

/**
 * A procedurally generated progress ring, unique per week: the outer arc
 * sweeps from empty to a full circle across the pregnancy, and the inner
 * dot grows with real relative size, so every single week renders a
 * visibly distinct illustration without relying on stock photography that
 * would otherwise repeat across weeks within the same trimester.
 */
function WeekSizeBadge({
  week,
  totalWeeks,
  color,
  sizeLabel,
  size = 96,
}: WeekSizeBadgeProps) {
  const progress = Math.min(Math.max(week / totalWeeks, 0), 1);
  const viewBoxSize = 100;
  const center = viewBoxSize / 2;
  const ringRadius = 42;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const maxDotRadius = 30;
  const minDotRadius = 4;
  const dotRadius = minDotRadius + (maxDotRadius - minDotRadius) * Math.sqrt(progress);

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Week ${week} of ${totalWeeks}. Baby is about the size of a ${sizeLabel}.`}
    >
      <circle
        cx={center}
        cy={center}
        r={ringRadius}
        fill="none"
        stroke={color}
        strokeOpacity={0.16}
        strokeWidth={7}
      />
      <circle
        cx={center}
        cy={center}
        r={ringRadius}
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={ringCircumference}
        strokeDashoffset={ringCircumference * (1 - progress)}
        transform={`rotate(-90 ${center} ${center})`}
      />
      <circle cx={center} cy={center} r={dotRadius} fill={color} fillOpacity={0.18} />
      <circle cx={center} cy={center} r={Math.max(dotRadius * 0.22, 2.5)} fill={color} />
    </svg>
  );
}

export default WeekSizeBadge;
