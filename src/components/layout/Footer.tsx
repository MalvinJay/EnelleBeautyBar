import { createWhatsAppUrl, bookingMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-24 pt-12 text-porcelain/70 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px] border-t border-porcelain/15 pt-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-porcelain/10">
          <div>
            <h4 className="font-display text-2xl text-porcelain mb-3">Enelle Beauty Bar</h4>
            <p className="text-xs leading-5 text-porcelain/60">
              Luxury hair installations, custom frontal wigs, K-Tips, and camera-ready bridal styling in Accra.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[.18em] text-champagne mb-3">Location</h5>
            <p className="text-xs leading-5 text-porcelain/80">
              25 Pawpaw Street, Agbogba<br />
              North Legon, Accra, Ghana
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[.18em] text-champagne mb-3">Hours & Phone</h5>
            <p className="text-xs leading-5 text-porcelain/80">
              Mon – Sat: 9:00 AM – 7:00 PM<br />
              Phone: +233 55 506 2291
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[.18em] text-champagne mb-3">Quick Connect</h5>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={createWhatsAppUrl(bookingMessage)}
                target="_blank"
                rel="noreferrer"
                className="text-porcelain hover:text-champagne transition"
              >
                Book via WhatsApp →
              </a>
              <a
                href="https://www.instagram.com/enelle_beauty_bar/"
                target="_blank"
                rel="noreferrer"
                className="text-porcelain hover:text-champagne transition"
              >
                Follow on Instagram →
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[10px] font-semibold uppercase tracking-[0.14em] sm:flex-row">
          <span>© {new Date().getFullYear()} Enelle Beauty Bar · 25 Pawpaw Street, Agbogba, North Legon, Accra</span>
          <a href="#top" className="transition hover:text-champagne">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

