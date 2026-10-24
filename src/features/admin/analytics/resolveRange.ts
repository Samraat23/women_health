/** IST has no DST, so a fixed offset is exact — unlike most time zones. */
const istOffsetMs = 5.5 * 60 * 60 * 1000;

export type RangePreset = "today" | "7d" | "30d" | "90d" | "custom";

export const rangePresets: Array<{ id: RangePreset; label: string; days: number }> = [
  { id: "today", label: "Today", days: 1 },
  { id: "7d", label: "7 days", days: 7 },
  { id: "30d", label: "30 days", days: 30 },
  { id: "90d", label: "90 days", days: 90 },
];

function startOfIstDay(date: Date) {
  const shifted = new Date(date.getTime() + istOffsetMs);
  const startUtc = Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate());

  return new Date(startUtc - istOffsetMs);
}

function parseIstDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(Date.UTC(year, month - 1, day) - istOffsetMs);
}

export function toIstDateInput(date: Date) {
  const shifted = new Date(date.getTime() + istOffsetMs);

  return shifted.toISOString().slice(0, 10);
}

export type ResolvedRange = {
  preset: RangePreset;
  from: Date;
  to: Date;
};

/** Reads `range`, `from`, `to` query params into a concrete [from, to) window. */
export function resolveDateRange(params: {
  range?: string;
  from?: string;
  to?: string;
}): ResolvedRange {
  const now = new Date();
  const todayStart = startOfIstDay(now);
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);

  if (params.range === "custom" && params.from && params.to) {
    const from = parseIstDateInput(params.from);
    const parsedTo = parseIstDateInput(params.to);

    if (from && parsedTo) {
      const to = new Date(parsedTo.getTime() + 24 * 60 * 60 * 1000 - 1);

      if (from.getTime() <= to.getTime()) return { preset: "custom", from, to };
    }
  }

  const preset = rangePresets.find((entry) => entry.id === params.range) ?? rangePresets[2];
  const from = new Date(todayStart.getTime() - (preset.days - 1) * 24 * 60 * 60 * 1000);

  return { preset: preset.id, from, to: todayEnd };
}
