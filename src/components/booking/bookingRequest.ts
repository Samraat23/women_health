export type ConsultationType = "clinic" | "video";

export type TimeSlotId = "morning" | "afternoon" | "evening";

export type BookingValues = {
  consultationType: ConsultationType;
  patientName: string;
  phone: string;
  age: string;
  date: string;
  timeSlot: TimeSlotId | "";
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

export type TimeSlot = {
  id: TimeSlotId;
  label: string;
  range: string;
  // First hour the slot can no longer be booked for the same day.
  closesAtHour: number;
};

export const consultationLabels: Record<ConsultationType, string> = {
  clinic: "In-clinic visit",
  video: "Video consultation",
};

// Preferred windows only: the clinic confirms the exact time on WhatsApp.
// Adjust these to match the clinic's OPD hours.
export const timeSlots: TimeSlot[] = [
  { id: "morning", label: "Morning", range: "10 AM – 1 PM", closesAtHour: 12 },
  { id: "afternoon", label: "Afternoon", range: "1 PM – 4 PM", closesAtHour: 15 },
  { id: "evening", label: "Evening", range: "4 PM – 7 PM", closesAtHour: 18 },
];

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
  const firstDay = new Date(now);
  const lastDay = new Date(now);

  // Once today's last slot has closed, bookings start from tomorrow.
  if (timeSlots.every((slot) => now.getHours() >= slot.closesAtHour)) {
    firstDay.setDate(firstDay.getDate() + 1);
  }

  lastDay.setDate(lastDay.getDate() + bookingWindowDays);

  return { min: toDateInputValue(firstDay), max: toDateInputValue(lastDay) };
}

export function isSlotClosed(slot: TimeSlot, date: string, now: Date) {
  return date === toDateInputValue(now) && now.getHours() >= slot.closesAtHour;
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
  const timeSlot = timeSlots.find((slot) => slot.id === values.timeSlot);

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
    errors.timeSlot = "This time has passed for today. Please choose another.";
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
    `*Patient name:* ${details.patientName}`,
    `*Phone:* ${formatIndianMobile(details.phone)}`,
    `*Age:* ${details.age} years`,
    `*Preferred date:* ${formatBookingDate(details.date)}`,
    `*Preferred time:* ${details.timeSlot.label} (${details.timeSlot.range})`,
    "",
    "Kindly confirm my appointment. Thank you.",
  ].join("\n");
}
