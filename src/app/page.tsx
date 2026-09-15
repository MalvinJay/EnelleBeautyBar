import { BrandIntro } from "@/components/brand/BrandIntro";
import { BookingCta } from "@/components/booking/BookingCta";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { LookbookSection } from "@/components/lookbook/LookbookSection";
import { ServicesSection } from "@/components/services/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandIntro />
        <ServicesSection />
        <LookbookSection />
        <BookingCta />
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}
