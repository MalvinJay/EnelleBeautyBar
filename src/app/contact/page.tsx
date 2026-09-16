import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { LocationSection } from "@/components/location/LocationSection";
import { BookingCta } from "@/components/booking/BookingCta";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pt-12">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 pt-8 pb-4">
          <p className="eyebrow text-plum">Get In Touch</p>
          <h1 className="mt-4 font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[.88] tracking-[-.06em] text-ink">
            Book your chair at <span className="italic text-plum">North Legon</span>.
          </h1>
        </div>
        <LocationSection />
        <BookingCta />
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}