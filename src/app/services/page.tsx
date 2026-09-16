import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { ServicesSection } from "@/components/services/ServicesSection";
import { FaqSection } from "@/components/faq/FaqSection";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pt-12">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 pt-8 pb-4">
          <p className="eyebrow text-plum">Service Menu & Pricing</p>
          <h1 className="mt-4 font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[.88] tracking-[-.06em] text-ink">
            Tailored installs, <span className="italic text-plum">natural blends</span> & bridal finishes.
          </h1>
        </div>
        <ServicesSection />
        <FaqSection />
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}