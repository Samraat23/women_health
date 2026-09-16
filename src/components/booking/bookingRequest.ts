export type ConsultationType = "clinic" | "video";

export type SlotPeriodId = "morning" | "afternoon" | "evening";

export type BookingValues = {
  consultationType: ConsultationType;
  patientName: string;
  phone: string;
  age: string;
  date: string;
  // The picked slot's id, e.g. "10:30"; empty until one is picked.
  timeSlot: string;
};

export type BookingField = keyof BookingValues;

export type BookingErrors = Partial<Record<BookingField, string>>;

export type BookingDetails = {
  consultationType: ConsultationType;
  patientName: string;
  phone: string;
  age: number;
  date: string;
  timeSlot: TimeSlot;
};

export type SlotPeriod = {
  id: SlotPeriodId;
  label: string;
  range: string;
};

export type TimeSlot = {
  // 24-hour start time, e.g. "13:30".
  id: string;
  period: SlotPeriodId;
  label: string;
  startMinutes: number;
};

export const consultationLabels: Record<ConsultationType, string> = {
  clinic: "In-clinic visit",
  video: "Video consultation",
};

// In rupees. Kept per consultation type so either fee can change on its own.
export const consultationFees: Record<ConsultationType, number> = {
  clinic: 1000,
  video: 1000,
};

const slotMinutes = 30;

// Same-day slots stay open until half an hour before they start, so each part
// of the day still closes at 12, 3 and 6 PM as the old time windows did.
const slotNoticeMinutes = 30;

// The clinic still confirms the final time on WhatsApp.
// Adjust these to match the clinic's OPD hours.
const opdPeriods: Array<{
  id: SlotPeriodId;
  label: string;
  startHour: number;
  endHour: number;
}> = [
  { id: "morning", label: "Morning", startHour: 10, endHour: 13 },
  { id: "afternoon", label: "Afternoon", startHour: 13, endHour: 16 },
  { id: "evening", label: "Evening", startHour: 16, endHour: 19 },
];

export const slotPeriods: SlotPeriod[] = opdPeriods.map(
  ({ id, label, startHour, endHour }) => ({
    id,
    label,
    range: `${formatHour(startHour)} – ${formatHour(endHour)}`,
  })
);

// Back-to-back half-hour slots: 10:00 AM – 10:30 AM, 10:30 AM – 11:00 AM, …
export const timeSlots: TimeSlot[] = opdPeriods.flatMap(
  ({ id, startHour, endHour }) =>
    Array.from(
      { length: ((endHour - startHour) * 60) / slotMinutes },
      (_, index) => {
        const startMinutes = startHour * 60 + index * slotMinutes;
        const endMinutes = startMinutes + slotMinutes;

        return {
          id: `${pad(Math.floor(startMinutes / 60))}:${pad(startMinutes % 60)}`,
          period: id,
          label: `${formatClockTime(startMinutes)} – ${formatClockTime(endMinutes)}`,
          startMinutes,
        };
      }
    )
);

const bookingWindowDays = 90;

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
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

export function createEmptyBooking(): BookingValues {
  return {
    consultationType: "clinic",
    patientName: "",
    phone: "",
    age: "",
    date: "",
    timeSlot: "",
  };
}

// Formats a local calendar day the way <input type="date"> expects it.
export function toDateInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

export function getBookableDateRange(now: Date) {
  const today = toDateInputValue(now);
  const firstDay = new Date(now);
  const lastDay = new Date(now);

  // Once today's last slot has closed, bookings start from tomorrow.
  if (timeSlots.every((slot) => isSlotClosed(slot, today, now))) {
    firstDay.setDate(firstDay.getDate() + 1);
  }

  lastDay.setDate(lastDay.getDate() + bookingWindowDays);

  return { min: toDateInputValue(firstDay), max: toDateInputValue(lastDay) };
}

export function getTimeSlot(id: string) {
  return timeSlots.find((slot) => slot.id === id);
}

export function isSlotClosed(slot: TimeSlot, date: string, now: Date) {
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  return (
    date === toDateInputValue(now) &&
    minutesNow >= slot.startMinutes - slotNoticeMinutes
  );
}

// Moving the date to today, or reopening a draft later in the day, can leave a
// picked slot that is no longer open.
export function withoutClosedSlot(values: BookingValues, now: Date) {
  const slot = getTimeSlot(values.timeSlot);

  return slot && isSlotClosed(slot, values.date, now)
    ? { ...values, timeSlot: "" }
    : values;
}

export function formatFee(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

// "10 AM", "1 PM"
function formatHour(hour: number) {
  return `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
}

// "10:30 AM", "1:00 PM"
function formatClockTime(minutes: number) {
  const hour = Math.floor(minutes / 60);

  return `${hour % 12 || 12}:${pad(minutes % 60)} ${hour < 12 ? "AM" : "PM"}`;
}

// Accepts what people actually type or autofill: spaces, +91 or a leading 0.
export function normalizeIndianMobile(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function formatIndianMobile(digits: string) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

// Spelled out by hand because Intl output varies by browser ("16 Sept, 2026").
export function formatBookingDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const weekday = weekdayNames[new Date(year, month - 1, day).getDay()];

  return `${weekday}, ${day} ${monthNames[month - 1]} ${year}`;
}

export function validateBooking(
  values: BookingValues,
  now: Date
): { details: BookingDetails | null; errors: BookingErrors } {
  const errors: BookingErrors = {};
  const patientName = values.patientName.trim().replace(/\s+/g, " ");
  const phone = normalizeIndianMobile(values.phone);
  const age = Number(values.age);
  const { min, max } = getBookableDateRange(now);
  const timeSlot = getTimeSlot(values.timeSlot);

  if (patientName.length < 2) {
    errors.patientName = "Please enter the patient's full name.";
  }

  if (!phone) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!values.age || !Number.isInteger(age) || age < 1 || age > 120) {
    errors.age = "Enter a valid age.";
  }

  if (!values.date) {
    errors.date = "Please choose a preferred date.";
  } else if (values.date < min) {
    errors.date = `Please choose a date from ${formatBookingDate(min)} onwards.`;
  } else if (values.date > max) {
    errors.date = "Please choose a date within the next 3 months.";
  }

  if (!timeSlot) {
    // A date with every slot closed is already reported on the date field.
    if (!timeSlots.every((slot) => isSlotClosed(slot, values.date, now))) {
      errors.timeSlot = "Please choose a preferred time.";
    }
  } else if (isSlotClosed(timeSlot, values.date, now)) {
    errors.timeSlot = "This slot is no longer open today. Please choose another.";
  }

  if (Object.keys(errors).length || !phone || !timeSlot) {
    return { details: null, errors };
  }

  return {
    errors,
    details: {
      consultationType: values.consultationType,
      patientName,
      phone,
      age,
      date: values.date,
      timeSlot,
    },
  };
}

// WhatsApp renders *text* as bold, which keeps the request easy to scan.
export function buildBookingMessage(details: BookingDetails) {
  return [
    "*New Appointment Request*",
    "",
    `*Consultation:* ${consultationLabels[details.consultationType]}`,
    `*Consultation fee:* ${formatFee(consultationFees[details.consultationType])}`,
    `*Patient name:* ${details.patientName}`,
    `*Phone:* ${formatIndianMobile(details.phone)}`,
    `*Age:* ${details.age} years`,
    `*Preferred date:* ${formatBookingDate(details.date)}`,
    `*Preferred time:* ${details.timeSlot.label}`,
    "",
    "Kindly confirm my appointment. Thank you.",
  ].join("\n");
}
