"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import type {
  CatalogCategory,
  CatalogCollection,
  CatalogProduct,
} from "@/data/catalog";

type CollectionsExperienceProps = {
  initialCollectionSlug?: string;
  initialCollectionName?: string;
  initialFilters?: {
    category?: string;
    query?: string;
    availability?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
};

type ProductResults = {
  products: CatalogProduct[];
  count: number;
};

const currency = new Intl.NumberFormat("en-GH", {
  maximumFractionDigits: 0,
});

export function CollectionsExperience({
  initialCollectionSlug = "",
  initialCollectionName,
  initialFilters = {},
}: CollectionsExperienceProps) {
  const [collections, setCollections] = useState<
    (CatalogCollection & { count: number })[]
  >([]);
  const [categories, setCategories] = useState<
    (CatalogCategory & { count: number })[]
  >([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [count, setCount] = useState(0);
  const [collection, setCollection] = useState(initialCollectionSlug);
  const [category, setCategory] = useState(initialFilters.category ?? "");
  const [query, setQuery] = useState(initialFilters.query ?? "");
  const [availability, setAvailability] = useState(
    initialFilters.availability ?? "",
  );
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ?? "");
  const [sort, setSort] = useState(initialFilters.sort ?? "featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadBrowseData() {
      try {
        const [collectionResponse, categoryResponse] = await Promise.all([
          fetch("/api/collections", { signal: controller.signal }),
          fetch("/api/categories", { signal: controller.signal }),
        ]);
        if (!collectionResponse.ok || !categoryResponse.ok)
          throw new Error("Could not load browse options.");
        const [collectionData, categoryData] = await Promise.all([
          collectionResponse.json(),
          categoryResponse.json(),
        ]);
        setCollections(collectionData.collections);
        setCategories(categoryData.categories);
      } catch (loadError) {
        if (!controller.signal.aborted)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load browse options.",
          );
      }
    }

    void loadBrowseData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ sort });
    if (collection) params.set("collection", collection);
    if (category) params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    if (availability) params.set("availability", availability);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error("Could not load products. Please try again.");
        const results: ProductResults = await response.json();
        setProducts(results.products);
        setCount(results.count);
      } catch (loadError) {
        if (!controller.signal.aborted)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load products. Please try again.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [availability, category, collection, maxPrice, minPrice, query, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (query.trim()) params.set("q", query.trim());
    if (availability) params.set("availability", availability);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort !== "featured") params.set("sort", sort);

    const pathname = collection ? `/collections/${collection}` : "/collections";
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [availability, category, collection, maxPrice, minPrice, query, sort]);

  function clearFilters() {
    setCollection("");
    setCategory("");
    setQuery("");
    setAvailability("");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
  }

  const activeCollectionName =
    collections.find((item) => item.slug === collection)?.name ??
    (collection === initialCollectionSlug ? initialCollectionName : undefined);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-porcelain pb-24 text-ink">
        <section className="px-5 pb-10 pt-12 sm:px-10 sm:pt-16 lg:px-16 lg:pt-20">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-7 border-b border-ink/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow flex items-center gap-2 text-plum">
                <SlidersHorizontal size={13} /> The Enelle Edit
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[.95] text-ink sm:text-6xl lg:text-7xl">
                {activeCollectionName ?? "Shop collections"}
                {!activeCollectionName && (
                  <span className="italic text-plum">.</span>
                )}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
                Explore hair, finishing pieces, and care essentials selected for
                your routine.
              </p>
            </div>
            <p className="max-w-sm border-l-2 border-champagne pl-4 text-sm leading-6 text-ink/70">
              Catalog preview: products, prices, and availability are sample
              data pending owner approval.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="collections-heading"
          className="px-5 py-3 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-plum">Find your starting point</p>
                <h2
                  id="collections-heading"
                  className="mt-2 font-display text-3xl sm:text-4xl"
                >
                  Featured collections
                </h2>
              </div>
              {collection && (
                <button
                  onClick={clearFilters}
                  className="min-h-11 text-sm font-semibold text-plum underline underline-offset-4"
                >
                  View all
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {collections.map((item) => (
                <Link
                  href={`/collections/${item.slug}`}
                  key={item.slug}
                  className="group relative block overflow-hidden rounded-md bg-linen text-porcelain focus-visible:outline-offset-4"
                >
                  <div className="relative aspect-4/3">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/5 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-porcelain/75">
                          {item.category}
                        </p>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl">
                          {item.name}
                        </h3>
                      </div>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="catalog"
          aria-labelledby="catalog-heading"
          className="mt-14 border-t border-ink/15 px-5 pt-10 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-plum">Browse the catalogue</p>
                <h2
                  id="catalog-heading"
                  className="mt-2 font-display text-3xl sm:text-4xl"
                >
                  Everyday essentials, considered.
                </h2>
              </div>
              <label className="relative block w-full lg:max-w-md">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink/65">
                  Search products
                </span>
                <Search
                  size={18}
                  aria-hidden="true"
                  className="absolute bottom-3.5 left-4 text-ink/50"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try “frontal” or “care”"
                  className="h-12 w-full rounded-sm border border-ink/20 bg-white/60 pl-11 pr-4 text-base outline-none transition focus:border-plum focus:ring-2 focus:ring-plum/15"
                />
              </label>
            </div>

            <div
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Filter by category"
            >
              <button
                onClick={() => setCategory("")}
                aria-pressed={!category}
                className={`min-h-11 rounded-full border px-4 text-sm transition ${!category ? "border-plum bg-plum text-porcelain" : "border-ink/20 text-ink hover:border-plum"}`}
              >
                All categories
              </button>
              {categories.map((item) => (
                <button
                  key={item.slug}
                  onClick={() =>
                    setCategory(category === item.slug ? "" : item.slug)
                  }
                  aria-pressed={category === item.slug}
                  className={`min-h-11 rounded-full border px-4 text-sm transition ${category === item.slug ? "border-plum bg-plum text-porcelain" : "border-ink/20 text-ink hover:border-plum"}`}
                >
                  {item.name}{" "}
                  <span className="ml-1 opacity-70">{item.count}</span>
                </button>
              ))}
            </div>

            <div className="mt-7 grid gap-4 border-y border-ink/15 py-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.2fr]">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/65">
                Availability
                <select
                  value={availability}
                  onChange={(event) => setAvailability(event.target.value)}
                  className="mt-2 h-11 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-sm font-normal normal-case tracking-normal text-ink"
                >
                  <option value="">Any availability</option>
                  <option value="in-stock">In stock</option>
                  <option value="out-of-stock">Out of stock</option>
                </select>
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/65">
                Minimum price
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="GH₵"
                  className="mt-2 h-11 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal tracking-normal text-ink"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/65">
                Maximum price
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="GH₵"
                  className="mt-2 h-11 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal tracking-normal text-ink"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/65">
                Sort by
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="mt-2 h-11 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-sm font-normal normal-case tracking-normal text-ink"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: low to high</option>
                  <option value="price-high-low">Price: high to low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </label>
              <div className="flex items-end justify-between gap-4">
                <p
                  className="min-h-11 flex items-center text-sm text-ink/70"
                  aria-live="polite"
                >
                  {loading
                    ? "Updating results…"
                    : `${count} ${count === 1 ? "item" : "items"}`}
                </p>
                <button
                  onClick={clearFilters}
                  className="min-h-11 text-sm font-semibold text-plum underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-6 border border-red-900/20 bg-red-50 px-4 py-3 text-sm text-red-900"
              >
                {error}
              </p>
            )}

            {products.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="group min-w-0">
                    <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-linen">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-porcelain px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-plum">
                        Sample
                      </span>
                      {product.bestSeller && (
                        <span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-porcelain">
                          Best seller
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-3 pt-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-plum">
                          {categories.find(
                            (item) => item.slug === product.category,
                          )?.name ?? "Collection"}
                        </p>
                        <h3 className="mt-1 font-display text-xl leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      <p className="shrink-0 pt-4 text-sm font-semibold tabular-nums">
                        {product.priceLabel ? `${product.priceLabel} ` : ""}GH₵{" "}
                        {currency.format(product.price)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink/70">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
                      <span
                        className={`text-xs ${product.availability === "in-stock" ? "text-ink/65" : "font-semibold text-plum"}`}
                      >
                        {product.availability === "in-stock"
                          ? "Available"
                          : "Currently unavailable"}
                      </span>
                      <a
                        href={createWhatsAppUrl(
                          `Hello Enelle Beauty Bar, I would like to ask about ${product.name}.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-xs font-bold uppercase tracking-wider text-plum transition hover:text-ink"
                      >
                        Enquire <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              !loading &&
              !error && (
                <div className="mt-8 border-y border-ink/15 py-16 text-center">
                  <Search
                    size={20}
                    aria-hidden="true"
                    className="mx-auto text-plum"
                  />
                  <h3 className="mt-4 font-display text-2xl">
                    No items match those filters.
                  </h3>
                  <p className="mt-2 text-sm text-ink/65">
                    Try a different search or clear your selections.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-5 min-h-11 border-b border-plum text-sm font-semibold text-plum"
                  >
                    Clear filters
                  </button>
                </div>
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}
