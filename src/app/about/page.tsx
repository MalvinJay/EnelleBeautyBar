import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { BrandIntro } from "@/components/brand/BrandIntro";
import { LocationSection } from "@/components/location/LocationSection";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pt-12">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 pt-8 pb-12">
          <p className="eyebrow text-plum">The Enelle Experience</p>
          <h1 className="mt-4 font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[.88] tracking-[-.06em] text-ink">
            Crafting tailored <span className="italic text-plum">hair statements</span> in Legon.
          </h1>
        </div>
        <BrandIntro />
        <LocationSection />
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}