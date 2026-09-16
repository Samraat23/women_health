"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ShieldCheck,
  Stethoscope,
  Sun,
  Sunrise,
  Sunset,
  UserRound,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  buildBookingMessage,
  consultationLabels,
  createEmptyBooking,
  formatBookingDate,
  getBookableDateRange,
  isSlotClosed,
  timeSlots,
  validateBooking,
  type BookingDetails,
  type BookingErrors,
  type BookingField,
  type BookingValues,
  type ConsultationType,
  type TimeSlotId,
} from "@/components/booking/bookingRequest";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { getWhatsAppHref } from "@/lib/whatsapp";

const doctorPortrait = "/image/dr-kusum-lata-bhardwaj.jpg";

const brandGradientClass =
  "bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))]";
const gridPatternClass =
  "absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:56px_56px]";
const inputClass =
  "h-full w-full min-w-0 bg-transparent text-base font-bold text-[var(--primary-text-color)] outline-none placeholder:font-semibold placeholder:text-slate-400";

const consultationOptions: Array<{
  value: ConsultationType;
  label: string;
  icon: LucideIcon;
}> = [
  { value: "clinic", label: "Clinic Visit", icon: Stethoscope },
  { value: "video", label: "Video Consult", icon: Video },
];

const slotIcons: Record<TimeSlotId, LucideIcon> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
};

export type BookingRequest = {
  open: boolean;
  consultationType: ConsultationType;
  // Set on every button click; doubles as "now" for the date and slot rules.
  requestedAt: number;
};

type Submission = {
  details: BookingDetails;
  whatsAppHref: string;
  whatsAppOpened: boolean;
};

type BookingFormModalProps = {
  request: BookingRequest;
  onOpenChange: (open: boolean) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

function fieldShellClass(hasError: boolean) {
  return `relative flex h-12 items-center gap-2.5 rounded-2xl border bg-[#f8f7ff] px-3.5 transition focus-within:bg-white focus-within:ring-4 ${
    hasError
      ? "border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-500/10"
      : "border-[#e8e5fb] hover:border-[var(--primary-color)]/30 focus-within:border-[var(--primary-color)] focus-within:ring-[var(--primary-color)]/12"
  }`;
}

function openDatePicker(input: HTMLInputElement) {
  try {
    input.showPicker();
  } catch {
    // Browsers without showPicker fall back to their own picker behaviour.
  }
}

export default function BookingFormModal({
  request,
  onOpenChange,
  returnFocusRef,
}: BookingFormModalProps) {
  const [values, setValues] = useState(() => createEmptyBooking());
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [handledRequestAt, setHandledRequestAt] = useState(request.requestedAt);
  const now = new Date(request.requestedAt);

  // A new button click keeps an unfinished draft (switching to the requested
  // consultation type) but starts from a blank form after a finished booking.
  if (request.requestedAt !== handledRequestAt) {
    setHandledRequestAt(request.requestedAt);
    setValues((current) => ({
      ...(submission ? createEmptyBooking() : current),
      consultationType: request.consultationType,
    }));
    setErrors({});
    setSubmission(null);
  }

  function updateField<Field extends BookingField>(
    field: Field,
    value: BookingValues[Field]
  ) {
    setValues((current) => {
      const next = { ...current, [field]: value };
      const pickedSlot = timeSlots.find((slot) => slot.id === next.timeSlot);

      // Moving the date to today can rule out a slot that was already picked.
      if (pickedSlot && isSlotClosed(pickedSlot, next.date, now)) {
        next.timeSlot = "";
      }

      return next;
    });
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { details, errors: nextErrors } = validateBooking(values, now);

    if (!details) {
      setErrors(nextErrors);

      const [firstInvalidField] = Object.keys(nextErrors);
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${firstInvalidField}"]:not(:disabled)`)
        ?.focus();

      return;
    }

    const whatsAppHref = getWhatsAppHref(buildBookingMessage(details));
    // Open WhatsApp right here in the submit handler: browsers block windows
    // opened later from a timer or after an await.
    const whatsAppWindow = window.open(whatsAppHref, "_blank");

    if (whatsAppWindow) {
      whatsAppWindow.opener = null;
    }

    setSubmission({
      details,
      whatsAppHref,
      whatsAppOpened: Boolean(whatsAppWindow),
    });
  }

  return (
    <DialogPrimitive.Root open={request.open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
          <div className="flex min-h-full items-center justify-center px-3 py-4 sm:p-6">
            <DialogPrimitive.Content
              // Focus the dialog itself: jumping into a field would pop the
              // keyboard over the form on phones.
              onOpenAutoFocus={(event) => {
                event.preventDefault();
                (event.currentTarget as HTMLElement | null)?.focus();
              }}
              // The dialog opens from plain buttons rather than a Radix
              // Trigger, so hand focus back to whichever one opened it.
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                returnFocusRef.current?.focus({ preventScroll: true });
              }}
              className="relative w-full max-w-[460px] overflow-hidden rounded-[26px] bg-white text-[var(--secondary-text)] shadow-[0_28px_90px_rgba(15,23,42,0.32)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:rounded-[30px]"
            >
              {submission ? (
                <BookingSuccess submission={submission} />
              ) : (
                <BookingForm
                  values={values}
                  errors={errors}
                  now={now}
                  onFieldChange={updateField}
                  onSubmit={handleSubmit}
                />
              )}

              <DialogPrimitive.Close
                aria-label="Close booking form"
                className="absolute right-3.5 top-3.5 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/16 text-white backdrop-blur transition hover:bg-white/28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <X size={18} />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

type BookingFormProps = {
  values: BookingValues;
  errors: BookingErrors;
  now: Date;
  onFieldChange: <Field extends BookingField>(
    field: Field,
    value: BookingValues[Field]
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function BookingForm({
  values,
  errors,
  now,
  onFieldChange,
  onSubmit,
}: BookingFormProps) {
  const idPrefix = useId();
  const fieldId = (field: BookingField) => `${idPrefix}-${field}`;
  const errorId = (field: BookingField) =>
    errors[field] ? `${fieldId(field)}-error` : undefined;
  const { min, max } = getBookableDateRange(now);
  const isVideo = values.consultationType === "video";
  const slots = timeSlots.map((slot) => ({
    ...slot,
    closed: isSlotClosed(slot, values.date, now),
  }));
  const areAllSlotsClosed = slots.every((slot) => slot.closed);

  return (
    <form noValidate onSubmit={onSubmit}>
      <div
        className={`relative overflow-hidden px-5 pb-5 pt-5 text-white sm:px-7 ${brandGradientClass}`}
      >
        <div className={gridPatternClass} />
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/12 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 pr-10">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/70 bg-white/15">
              <Image
                src={doctorPortrait}
                alt=""
                fill
                sizes="48px"
                className="object-cover object-[center_18%]"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black">
                Dr. Kusum Lata Bhardwaj
              </p>
              <p className="truncate text-xs font-semibold text-white/70">
                Ex-AIIMS · MD, FICOG, FMAS
              </p>
            </div>
          </div>

          <DialogPrimitive.Title className="mt-4 text-[26px] font-black leading-[1.1] tracking-normal">
            {isVideo ? "Book a Video Consultation" : "Book an Appointment"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-1.5 text-balance text-sm font-semibold leading-6 text-white/75">
            Share your details and we&apos;ll confirm on WhatsApp.
          </DialogPrimitive.Description>
        </div>
      </div>

      <div className="space-y-3.5 px-5 pb-5 pt-4 sm:px-7">
        <fieldset className="min-w-0">
          <legend className="sr-only">Consultation type</legend>
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-[#f1efff] p-1">
            {consultationOptions.map(({ value, label, icon: Icon }) => {
              const isSelected = values.consultationType === value;

              return (
                <label key={value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="consultationType"
                    value={value}
                    checked={isSelected}
                    onChange={() => onFieldChange("consultationType", value)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-black transition peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--primary-color)]/45 ${
                      isSelected
                        ? "bg-white text-[var(--primary-color)] shadow-[0_8px_18px_rgba(27,20,99,0.10)]"
                        : "text-[var(--secondary-text)]/60 hover:text-[var(--primary-text-color)]"
                    }`}
                  >
                    <Icon size={17} />
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <FormField
          id={fieldId("patientName")}
          label="Patient name"
          error={errors.patientName}
        >
          <div className={fieldShellClass(Boolean(errors.patientName))}>
            <UserRound
              size={18}
              aria-hidden="true"
              className="shrink-0 text-[var(--primary-color)]"
            />
            <input
              id={fieldId("patientName")}
              name="patientName"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              maxLength={60}
              value={values.patientName}
              onChange={(event) =>
                onFieldChange("patientName", event.target.value)
              }
              aria-invalid={Boolean(errors.patientName)}
              aria-describedby={errorId("patientName")}
              className={inputClass}
            />
          </div>
        </FormField>

        <div className="grid grid-cols-[minmax(0,1fr)_104px] items-start gap-3">
          <FormField
            id={fieldId("phone")}
            label="Mobile number"
            error={errors.phone}
          >
            <div className={fieldShellClass(Boolean(errors.phone))}>
              <span
                aria-hidden="true"
                className="shrink-0 text-base font-black text-[var(--primary-text-color)]"
              >
                +91
              </span>
              <span aria-hidden="true" className="h-5 w-px shrink-0 bg-[#dcd8f5]" />
              <input
                id={fieldId("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="98765 43210"
                maxLength={16}
                value={values.phone}
                // The +91 prefix is already shown, so drop a typed or
                // autofilled one instead of displaying it twice.
                onChange={(event) =>
                  onFieldChange(
                    "phone",
                    event.target.value
                      .replace(/^\s*\+91[\s-]*/, "")
                      .replace(/[^\d\s+-]/g, "")
                  )
                }
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errorId("phone")}
                className={inputClass}
              />
            </div>
          </FormField>

          <FormField id={fieldId("age")} label="Age" error={errors.age}>
            <div className={fieldShellClass(Boolean(errors.age))}>
              <input
                id={fieldId("age")}
                name="age"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="28"
                maxLength={3}
                value={values.age}
                onChange={(event) =>
                  onFieldChange("age", event.target.value.replace(/\D/g, ""))
                }
                aria-invalid={Boolean(errors.age)}
                aria-describedby={errorId("age")}
                className={inputClass}
              />
              <span
                aria-hidden="true"
                className="shrink-0 text-sm font-bold text-slate-400"
              >
                yrs
              </span>
            </div>
          </FormField>
        </div>

        <FormField
          id={fieldId("date")}
          label="Preferred date"
          error={errors.date}
        >
          <div className={fieldShellClass(Boolean(errors.date))}>
            <CalendarDays
              size={18}
              aria-hidden="true"
              className="shrink-0 text-[var(--primary-color)]"
            />
            <span
              aria-hidden="true"
              className={`truncate text-base ${
                values.date
                  ? "font-bold text-[var(--primary-text-color)]"
                  : "font-semibold text-slate-400"
              }`}
            >
              {values.date ? formatBookingDate(values.date) : "Select a date"}
            </span>
            {/* The native input stays invisible on top of the field so every
                browser shows the same label while keeping its own picker. */}
            <input
              id={fieldId("date")}
              name="date"
              type="date"
              min={min}
              max={max}
              value={values.date}
              onChange={(event) => onFieldChange("date", event.target.value)}
              onClick={(event) => openDatePicker(event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openDatePicker(event.currentTarget);
                }
              }}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errorId("date")}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        </FormField>

        <fieldset
          className="min-w-0"
          aria-describedby={areAllSlotsClosed ? undefined : errorId("timeSlot")}
        >
          <legend className="mb-1.5 text-[13px] font-black text-[var(--primary-text-color)]">
            Preferred time
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => {
              const Icon = slotIcons[slot.id];
              const isSelected = values.timeSlot === slot.id;

              return (
                <label
                  key={slot.id}
                  className={`relative ${
                    slot.closed ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot.id}
                    checked={isSelected}
                    disabled={slot.closed}
                    onChange={() => onFieldChange("timeSlot", slot.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex flex-col items-center rounded-2xl border px-1 py-2 text-center transition peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--primary-color)]/15 ${
                      isSelected
                        ? `border-transparent text-white shadow-[0_12px_24px_rgba(90,79,254,0.28)] ${brandGradientClass}`
                        : slot.closed
                          ? "border-[#eeecf6] bg-slate-50 text-slate-300"
                          : `bg-[#f8f7ff] text-[var(--primary-text-color)] hover:border-[var(--primary-color)]/40 ${
                              errors.timeSlot ? "border-rose-300" : "border-[#e8e5fb]"
                            }`
                    }`}
                  >
                    <Icon
                      size={18}
                      aria-hidden="true"
                      className={
                        isSelected
                          ? "text-white"
                          : slot.closed
                            ? "text-slate-300"
                            : "text-[var(--primary-color)]"
                      }
                    />
                    <span className="mt-1 text-[13px] font-black leading-tight">
                      {slot.label}
                    </span>
                    <span
                      className={`mt-0.5 text-[11px] font-bold leading-tight ${
                        isSelected
                          ? "text-white/75"
                          : slot.closed
                            ? "text-slate-300"
                            : "text-slate-500"
                      }`}
                    >
                      {slot.range}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {areAllSlotsClosed ? (
            <p className="mt-1.5 text-xs font-bold text-slate-500">
              No time slots are left for this date. Please pick another date.
            </p>
          ) : (
            errors.timeSlot && (
              <p
                id={errorId("timeSlot")}
                className="mt-1.5 text-xs font-bold text-rose-600"
              >
                {errors.timeSlot}
              </p>
            )
          )}
        </fieldset>

        <button
          type="submit"
          className={`group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[15px] font-black text-white shadow-[0_16px_32px_rgba(90,79,254,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(90,79,254,0.36)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/25 active:translate-y-0 ${brandGradientClass}`}
        >
          Submit Request
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition group-hover:translate-x-0.5"
          />
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-slate-400">
          <ShieldCheck size={14} aria-hidden="true" className="shrink-0 text-emerald-500" />
          Shared only with the clinic on WhatsApp.
        </p>
      </div>
    </form>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      {/* Wrapping the field lets a tap anywhere on it, icons included, focus the input. */}
      <label htmlFor={id} className="block">
        <span className="mb-1.5 block text-[13px] font-black text-[var(--primary-text-color)]">
          {label}
        </span>
        {children}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-bold text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

function BookingSuccess({ submission }: { submission: Submission }) {
  const doneButtonRef = useRef<HTMLButtonElement>(null);
  const { details, whatsAppHref, whatsAppOpened } = submission;
  const [firstName] = details.patientName.split(" ");
  const summary = [
    {
      label: "Consultation",
      value: consultationLabels[details.consultationType],
    },
    {
      label: "Patient",
      value: `${details.patientName}, ${details.age} yrs`,
    },
    { label: "Date", value: formatBookingDate(details.date) },
    {
      label: "Time",
      value: `${details.timeSlot.label}, ${details.timeSlot.range}`,
    },
  ];

  // The submit button that had focus is gone; move focus to the next action.
  useEffect(() => {
    doneButtonRef.current?.focus();
  }, []);

  return (
    <div className="animate-in fade-in-0 zoom-in-95 duration-300">
      <div className={`relative h-24 overflow-hidden ${brandGradientClass}`}>
        <div className={gridPatternClass} />
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/12 blur-3xl" />
      </div>

      <div className="-mt-10 px-5 pb-5 text-center sm:px-7">
        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-[0_18px_40px_rgba(27,20,99,0.18)]">
          <span
            className={`grid h-[60px] w-[60px] place-items-center rounded-full text-white ${brandGradientClass}`}
          >
            <Check size={30} strokeWidth={3} aria-hidden="true" />
          </span>
        </div>

        <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[var(--primary-color)]">
          Request submitted
        </p>
        <DialogPrimitive.Title className="mt-2 text-[26px] font-black leading-tight tracking-normal text-[var(--primary-text-color)]">
          Please wait for confirmation
        </DialogPrimitive.Title>
        <DialogPrimitive.Description className="mx-auto mt-3 max-w-[360px] text-sm font-semibold leading-6 text-slate-500">
          Thank you, {firstName}. Your request has been submitted to Dr. Kusum
          Lata Bhardwaj&apos;s clinic. Our team will contact you shortly on
          WhatsApp to confirm your appointment.
        </DialogPrimitive.Description>

        <dl className="mt-5 divide-y divide-[#ebe8fb] rounded-2xl border border-[#ebe8fb] bg-[#f8f7ff] px-4 text-left">
          {summary.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 py-2.5"
            >
              <dt className="shrink-0 text-[13px] font-bold text-slate-500">
                {item.label}
              </dt>
              <dd className="min-w-0 text-right text-[13px] font-black text-[var(--primary-text-color)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* wa.me can only prefill the chat; the request reaches the clinic once
            the patient presses Send in WhatsApp, so say so plainly. */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#25d366]/25 bg-[#25d366]/[0.08] p-3.5 text-left">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25d366] text-white">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold leading-5 text-slate-600">
              {whatsAppOpened ? (
                <>
                  Your details are ready in WhatsApp. Please tap{" "}
                  <strong className="font-black text-[var(--primary-text-color)]">
                    Send
                  </strong>{" "}
                  so they reach the clinic.
                </>
              ) : (
                "WhatsApp did not open automatically. Tap below to send your details to the clinic."
              )}
            </p>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-black text-[#0f7a40] underline-offset-4 hover:underline"
            >
              {whatsAppOpened ? "Open WhatsApp again" : "Send on WhatsApp"}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <DialogPrimitive.Close asChild>
          <button
            ref={doneButtonRef}
            type="button"
            className={`mt-4 h-12 w-full cursor-pointer rounded-full text-[15px] font-black text-white shadow-[0_16px_32px_rgba(90,79,254,0.30)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--primary-color)]/25 ${brandGradientClass}`}
          >
            Done
          </button>
        </DialogPrimitive.Close>
      </div>
    </div>
  );
}
