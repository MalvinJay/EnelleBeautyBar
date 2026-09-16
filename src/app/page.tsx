import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { BrandIntro } from "@/components/brand/BrandIntro";
import { ServicesSection } from "@/components/services/ServicesSection";
import { LookbookSection } from "@/components/lookbook/LookbookSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { InstagramSection } from "@/components/social/InstagramSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { LocationSection } from "@/components/location/LocationSection";
import { BookingCta } from "@/components/booking/BookingCta";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandIntro />
        <ServicesSection />
        <LookbookSection />
        <GallerySection />
        <InstagramSection />
        <TestimonialsSection />
        <FaqSection />
        <LocationSection />
        <BookingCta />
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}


