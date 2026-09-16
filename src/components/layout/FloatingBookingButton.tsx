import { ArrowUpRight } from "lucide-react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";
export function FloatingBookingButton() {
    return (
        <a
            href={createWhatsAppUrl(bookingMessage)}
            target="_blank"
            rel="noreferrer"
            className="fixed inset-x-4 bottom-4 z-40 inline-flex min-h-12 justify-center gap-2 bg-champagne px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-lg transition hover:bg-porcelain sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
            Book your chair <ArrowUpRight size={15} />
        </a>
    )
}
