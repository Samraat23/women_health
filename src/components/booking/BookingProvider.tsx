"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import BookingFormModal, {
  type BookingRequest,
} from "@/components/booking/BookingFormModal";
import type { ConsultationType } from "@/components/booking/bookingRequest";

type BookingContextValue = {
  openBooking: (consultationType?: ConsultationType) => void;
  hasOpenedBooking: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<BookingRequest>({
    open: false,
    consultationType: "clinic",
    requestedAt: 0,
  });
  const openerRef = useRef<HTMLElement | null>(null);

  const openBooking = useCallback(
    (consultationType: ConsultationType = "clinic") => {
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setRequest({ open: true, consultationType, requestedAt: Date.now() });
    },
    []
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setRequest((current) => ({ ...current, open }));
  }, []);

  const hasOpenedBooking = request.requestedAt > 0;
  const value = useMemo(
    () => ({ openBooking, hasOpenedBooking }),
    [openBooking, hasOpenedBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingFormModal
        request={request}
        onOpenChange={handleOpenChange}
        returnFocusRef={openerRef}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider.");
  }

  return context;
}
