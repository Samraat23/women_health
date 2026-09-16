// The clinic's WhatsApp line. Booking requests and support chats both land here,
// so the doctor can reply to the patient directly.
export const clinicWhatsAppNumber = "919289140812";

export function getWhatsAppHref(message?: string) {
  const href = `https://wa.me/${clinicWhatsAppNumber}`;

  return message ? `${href}?text=${encodeURIComponent(message)}` : href;
}
