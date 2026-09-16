import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { BrandIntro } from "@/components/brand/BrandIntro";
import { ServicesSection } from "@/components/services/ServicesSection";
import { LookbookSection } from "@/components/lookbook/LookbookSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { BookingCta } from "@/components/booking/BookingCta";
import { Footer } from "@/components/layout/Footer";
// import { PageLoader } from "@/components/layout/PageLoader";

export default function HomePage() {
  return (
    <>
      {/* <PageLoader /> */}
      <Header />
      <main>
        <Hero />
        <BrandIntro />
        <ServicesSection />
        <LookbookSection />
        <GallerySection />
        <BookingCta />
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}
