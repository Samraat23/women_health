"use client";

import type { ComponentPropsWithoutRef } from "react";

import { useBooking } from "@/components/booking/BookingProvider";
import type { ConsultationType } from "@/components/booking/bookingRequest";

type BookingButtonProps = Omit<ComponentPropsWithoutRef<"button">, "type"> & {
  consultationType?: ConsultationType;
};

// Use for any "Book Appointment" or "Video Consultation" call to action: it
// opens the shared booking form on the matching tab. Being a client component,
// it can sit inside server-rendered pages too.
export default function BookingButton({
  consultationType = "clinic",
  className = "",
  onClick,
  ...props
}: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        openBooking(consultationType);
      }}
      className={`cursor-pointer ${className}`}
    />
  );
}
