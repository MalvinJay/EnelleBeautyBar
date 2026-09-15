const phoneNumber = "233555062291";
export const bookingMessage = "Hello Enelle Beauty Bar, I'd love to book a Luxury Session.";
export function createWhatsAppUrl(message: string) { return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; }
