import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Shipping Information | Enelle Beauty Bar",
  description: "Shipping information for Enelle Beauty Bar orders.",
};

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="min-h-[65vh] bg-porcelain px-5 py-16 text-ink sm:px-10 lg:px-16">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow text-plum">Order information</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl">
            Shipping details
          </h1>
          <p className="mt-6 text-base leading-7 text-ink/75">
            Delivery areas, timelines, and charges are awaiting business-owner
            approval. We will show the confirmed delivery charge before you pay;
            checkout remains unavailable until it has been configured.
          </p>
          <p className="mt-4 text-sm leading-6 text-ink/65">
            For now, please contact Enelle Beauty Bar to discuss delivery or
            collection arrangements.
          </p>
          <Link
            href="/collections"
            className="mt-8 inline-flex min-h-11 items-center border-b border-plum text-sm font-semibold text-plum"
          >
            Return to collections
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
