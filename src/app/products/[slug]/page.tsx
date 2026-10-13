import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/cart/ProductPurchase";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { Header } from "@/components/layout/Header";
import { catalogCategories } from "@/data/catalog";
import { getCatalogProductBySlug } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProductBySlug(slug);
  return product
    ? {
        title: `${product.name} | Enelle Beauty Bar`,
        description: product.description,
      }
    : { title: "Product Not Found | Enelle Beauty Bar" };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getCatalogProductBySlug(slug);
  if (!product) notFound();

  const categoryName = catalogCategories.find(
    (category) => category.slug === product.category,
  )?.name;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-porcelain px-5 py-10 text-ink sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-linen">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-3 lg:py-10">
            <p className="eyebrow text-plum">
              {categoryName ?? "Enelle collection"} · Sample product
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-base leading-7 text-ink/70">
              {product.description}
            </p>
            <p className="mt-6 text-xl font-semibold tabular-nums">
              {product.priceLabel ? `${product.priceLabel} ` : ""}GH₵{" "}
              {product.price.toLocaleString("en-GH")}
            </p>
            <p className="mt-2 text-xs leading-5 text-ink/60">
              Sample product and pricing pending owner approval. Shipping
              details are available before checkout.
            </p>
            <div className="mt-7">
              <ProductPurchase product={product} />
            </div>
            <div className="mt-8 border-t border-ink/15 pt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Product details
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {product.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}
