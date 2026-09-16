import Image from "next/image";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const products = [
  {
    id: "silk-bonnet",
    name: "Luxury Silk Satin Bonnet & Wrap Set",
    price: "GH₵ 150",
    description: "Preserves your frontal melt, curl definition, and moisture balance overnight.",
    category: "Night Care",
    image: "/enelle/Sample1.png",
  },
  {
    id: "lace-melt-kit",
    name: "Lace Melt Band & Invisible Holding Spray",
    price: "GH₵ 180",
    description: "Water-resistant, fast-drying lace melting formula for seamless hairline touch-ups.",
    category: "Lace Care",
    image: "/enelle/ngWSEPyjxBwRLxYjdAIOJHFKJiVdLdCC.jpeg",
  },
  {
    id: "growth-serum",
    name: "Argan & Keratin Scalp Growth Serum",
    price: "GH₵ 220",
    description: "Lightweight, non-comedogenic oil blend for healthy edge retention and scalp hydration.",
    category: "Scalp Health",
    image: "/enelle/nquGsHrscWoTaphtsQZumiwSalfyWgBp.jpeg",
  },
  {
    id: "edge-wax-stick",
    name: "Sleek Edge Control Wax Stick",
    price: "GH₵ 120",
    description: "24-hour hold without white flakes or build-up. Perfect for finger waves and sleek updos.",
    category: "Styling",
    image: "/enelle/nfRhZJqQIVKfWtWOAPVQoXpfSYKeBLfp.jpeg",
  },
  {
    id: "raw-frontal-wig",
    name: "Custom Tailored Raw Frontal Wig",
    price: "From GH₵ 1,800",
    description: "Pre-plucked, custom bleached, and fitted to your exact head measurements.",
    category: "Wigs & Bundles",
    image: "/enelle/couple.png",
  },
  {
    id: "heat-protectant",
    name: "Thermal Heat Protectant & Silk Mist",
    price: "GH₵ 160",
    description: "Shields hair from thermal styling up to 450°F while adding high-gloss shine.",
    category: "Styling",
    image: "/enelle/Goldie.png",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-porcelain min-h-screen pt-12 pb-24 text-ink">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16 pt-8 pb-12">
          <p className="eyebrow text-plum flex items-center gap-2">
            <ShoppingBag size={14} /> Salon Store & Aftercare
          </p>
          <h1 className="mt-4 font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[.88] tracking-[-.06em]">
            Essential <span className="italic text-plum">care products</span> & custom wigs.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-ink/70">
            Maintain your salon finish at home with our hand-selected hair care products, lace melting tools, and bespoke wig units. Available for salon pickup at 25 Pawpaw Street or delivery across Accra.
          </p>
        </div>

        <section className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-linen p-6 border border-ink/10 transition hover:shadow-[0_12px_35px_rgba(41,22,17,.1)]"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-porcelain">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-plum/90 px-3 py-1 text-[10px] font-bold text-porcelain uppercase tracking-wider backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl tracking-tight text-ink">{product.name}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink/75">{product.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                  <span className="font-bold text-sm text-plum uppercase tracking-wider">{product.price}</span>
                  <a
                    href={createWhatsAppUrl(`Hello Enelle Beauty Bar, I would like to order the ${product.name} (${product.price}).`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink transition hover:text-plum"
                  >
                    Order via WhatsApp <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}