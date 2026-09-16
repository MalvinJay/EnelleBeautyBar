"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";

export function LocationSection() {
  return (
    <section id="location" className="bg-linen px-5 py-24 text-ink sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow text-plum flex items-center gap-2">
              <MapPin size={14} /> Visit Our Salon
            </p>
            <h2 className="mt-6 font-display text-[clamp(3.3rem,6vw,6.4rem)] leading-[.87] tracking-[-0.06em]">
              Located in <span className="italic text-plum">North Legon</span>.
            </h2>
            <p className="mt-6 text-base leading-7 text-ink/75 max-w-md">
              Step into our tranquil, beautifully designed space designed for luxury hair transformations.
            </p>

            <div className="mt-10 space-y-6 border-t border-ink/15 pt-8">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-plum text-porcelain">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-plum">Address</h4>
                  <p className="text-sm leading-6 text-ink/80 mt-1">
                    25 Pawpaw Street, Agbogba, North Legon<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-plum text-porcelain">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-plum">Hours</h4>
                  <p className="text-sm leading-6 text-ink/80 mt-1">
                    Monday – Saturday: 9:00 AM – 7:00 PM<br />
                    Sunday: By Special Appointment Only
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-plum text-porcelain">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-plum">Contact & Booking</h4>
                  <p className="text-sm leading-6 text-ink/80 mt-1">
                    WhatsApp / Phone: +233 55 506 2291
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={createWhatsAppUrl(bookingMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#674535] px-6 text-[11px] font-semibold text-porcelain transition hover:bg-plum"
              >
                Book Appointment
              </a>
              <a
                href="https://maps.google.com/?q=25+Pawpaw+Street+Agbogba+North+Legon+Accra+Ghana"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-plum px-6 text-[11px] font-semibold text-plum transition hover:bg-plum hover:text-porcelain"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </div>

          {/* Embedded Map Card */}
          <div className="relative h-[450px] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-[0_15px_40px_rgba(41,22,17,.1)]">
            <iframe
              title="Enelle Beauty Bar Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15878.854619714818!2d-0.1873117!3d5.6792376!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDAnNDUuMiJOIDDCsDExJzE0LjMiVw!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
