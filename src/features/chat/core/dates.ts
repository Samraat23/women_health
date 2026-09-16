import type { Availability, TimeSlot } from "@/features/chat/core/types";

/**
 * Calendar maths for bookings, always in the clinic's time zone. A patient in
 * another country, or a server running in UTC, must agree with the clinic on
 * what "today" and "this evening" mean.
 */

export type ClinicNow = {
  /** YYYY-MM-DD in the clinic's time zone. */
  date: string;
  hour: number;
  minute: number;
};

export type DateIssue = "invalid" | "past" | "too_far" | "closed" | "full";

const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

export function getClinicNow(timeZone: string, now: number | Date = Date.now()): ClinicNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(typeof now === "number" ? new Date(now) : now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "00";

  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    hour: Number(part("hour")) % 24,
    minute: Number(part("minute")),
  };
}

/** Parses YYYY-MM-DD, rejecting impossible dates such as 2026-02-30. */
export function parseIsoDate(value: string) {
  const match = isoDatePattern.exec(value);

  if (!match) return null;

  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day, weekday: date.getUTCDay() };
}

export function toIsoDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toISOString().slice(0, 10);
}

export function addDays(isoDate: string, days: number) {
  const parsed = parseIsoDate(isoDate);

  if (!parsed) return isoDate;

  return toIsoDate(parsed.year, parsed.month, parsed.day + days);
}

/** Whole days from `from` to `to`; negative when `to` is earlier. */
export function daysBetween(from: string, to: string) {
  const a = parseIsoDate(from);
  const b = parseIsoDate(to);

  if (!a || !b) return 0;

  return Math.round(
    (Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day)) /
      86_400_000
  );
}

/** "Fri, 18 Sep" */
export function formatShortDate(isoDate: string) {
  const parsed = parseIsoDate(isoDate);

  if (!parsed) return isoDate;

  return `${weekdayShort[parsed.weekday]}, ${parsed.day} ${monthShort[parsed.month - 1]}`;
}

/** "Fri, 18 Sep 2026" — spelled out by hand because Intl output varies by browser. */
export function formatLongDate(isoDate: string) {
  const parsed = parseIsoDate(isoDate);

  if (!parsed) return isoDate;

  return `${formatShortDate(isoDate)} ${parsed.year}`;
}

export function isSlotClosed(slot: TimeSlot, isoDate: string, now: ClinicNow) {
  return isoDate === now.date && now.hour >= slot.closesAtHour;
}

export function getOpenSlots(availability: Availability, isoDate: string, now: ClinicNow) {
  return availability.timeSlots.filter((slot) => !isSlotClosed(slot, isoDate, now));
}

export function getLastBookableDate(availability: Availability, now: ClinicNow) {
  return addDays(now.date, availability.bookingWindowDays);
}

export function getDateIssue(
  isoDate: string,
  availability: Availability,
  now: ClinicNow
): DateIssue | null {
  const parsed = parseIsoDate(isoDate);

  if (!parsed) return "invalid";
  if (isoDate < now.date) return "past";
  if (isoDate > getLastBookableDate(availability, now)) return "too_far";

  if (
    availability.closedWeekdays.includes(parsed.weekday) ||
    availability.closedDates.includes(isoDate)
  ) {
    return "closed";
  }

  if (getOpenSlots(availability, isoDate, now).length === 0) return "full";

  return null;
}

export function getQuickDates(availability: Availability, now: ClinicNow) {
  const dates: string[] = [];

  for (
    let offset = 0;
    offset <= availability.bookingWindowDays && dates.length < availability.quickDateCount;
    offset += 1
  ) {
    const candidate = addDays(now.date, offset);

    if (!getDateIssue(candidate, availability, now)) dates.push(candidate);
  }

  return dates;
}

/** "Today", "Tomorrow" or "Sat, 19 Sep" relative to the clinic's calendar. */
export function getRelativeDayLabel(isoDate: string, now: ClinicNow) {
  const offset = daysBetween(now.date, isoDate);

  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";

  return formatShortDate(isoDate);
}

export function describeDateIssue(
  issue: DateIssue,
  availability: Availability,
  now: ClinicNow
) {
  switch (issue) {
    case "past":
      return "That date has already passed. Please choose an upcoming date.";
    case "too_far":
      return `Appointments can be requested up to ${formatShortDate(
        getLastBookableDate(availability, now)
      )}. Please choose an earlier date.`;
    case "closed":
      return "The clinic isn't taking appointments on that day. Please choose another date.";
    case "full":
      return "All of today's time slots have passed. Please choose another date.";
    default:
      return "Please choose a valid date.";
  }
}
