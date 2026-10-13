"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import type { CatalogProduct } from "@/data/catalog";

type ProductPurchaseProps = {
  product: CatalogProduct;
  detailsHref?: string;
};

const money = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });

export function ProductPurchase({
  product,
  detailsHref = `/products/${product.slug}`,
}: ProductPurchaseProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState(
    product.variants?.find((variant) => variant.stockCount > 0)?.id ?? "",
  );
  const [notice, setNotice] = useState("");
  const closeButton = useRef<HTMLButtonElement>(null);
  const selectedVariant = product.variants?.find(
    (variant) => variant.id === variantId,
  );
  const stockCount =
    selectedVariant?.stockCount ?? (product.variants ? 0 : product.stockCount);
  const price = selectedVariant?.price ?? product.price;
  const available = product.availability === "in-stock" && stockCount > 0;

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function openOptions() {
    setQuantity(1);
    setNotice("");
    setVariantId(
      product.variants?.find((variant) => variant.stockCount > 0)?.id ?? "",
    );
    setOpen(true);
  }

  function addToCart(goToCheckout = false) {
    if (!available) return;
    const added = addItem({
      productId: product.id,
      ...(product.variants ? { variantId } : {}),
      quantity,
    });
    if (!added) {
      setNotice(
        "That quantity is not available. Please reduce it and try again.",
      );
      return;
    }
    if (goToCheckout) {
      router.push("/checkout");
      return;
    }
    setNotice("Added to your cart.");
  }

  return (
    <>
      <button
        onClick={openOptions}
        className="inline-flex min-h-11 items-center justify-center rounded-sm bg-plum px-4 text-xs font-bold uppercase tracking-wider text-porcelain transition hover:bg-ink focus-visible:outline-offset-4"
      >
        Choose options
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/65 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`purchase-title-${product.id}`}
            className="relative grid max-h-[94dvh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-porcelain text-ink shadow-2xl sm:max-h-[min(90dvh,760px)] sm:grid-cols-2"
          >
            <button
              ref={closeButton}
              onClick={() => setOpen(false)}
              aria-label="Close product options"
              title="Close"
              className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-porcelain/90 text-ink shadow-sm transition hover:bg-white"
            >
              <X size={19} aria-hidden="true" />
            </button>
            <div className="relative aspect-[4/3] bg-linen sm:aspect-auto sm:min-h-[520px]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-porcelain px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-plum">
                Sample product
              </span>
            </div>
            <div className="flex flex-col p-5 sm:p-8 lg:p-10">
              <p className="eyebrow text-plum">Product options</p>
              <h2
                id={`purchase-title-${product.id}`}
                className="mt-3 pr-9 font-display text-3xl leading-tight sm:text-4xl"
              >
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {product.description}
              </p>
              <p className="mt-5 text-lg font-semibold tabular-nums">
                GH₵ {money.format(price)}
              </p>
              <Link
                href="/shipping"
                onClick={() => setOpen(false)}
                className="mt-2 w-fit border-b border-ink/40 pb-0.5 text-xs text-ink/70 hover:text-plum"
              >
                Shipping details
              </Link>

              {product.variants && (
                <fieldset className="mt-6">
                  <legend className="text-xs font-bold uppercase tracking-wider">
                    Length{" "}
                    <span className="font-normal normal-case tracking-normal text-ink/60">
                      {selectedVariant
                        ? `(${selectedVariant.label})`
                        : "(select one)"}
                    </span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => {
                          setVariantId(variant.id);
                          setQuantity(1);
                          setNotice("");
                        }}
                        disabled={variant.stockCount === 0}
                        aria-pressed={variantId === variant.id}
                        className={`min-h-11 min-w-14 border px-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${variantId === variant.id ? "border-plum bg-plum text-porcelain" : "border-ink/20 hover:border-plum"}`}
                      >
                        {variant.label}
                        {variant.stockCount === 0 ? " · Sold out" : ""}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Quantity
                  </p>
                  <div className="mt-2 inline-flex h-11 items-center border border-ink/25">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      title="Decrease quantity"
                      className="grid h-11 w-11 place-items-center disabled:opacity-35"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <output
                      aria-label="Quantity"
                      className="w-10 text-center text-sm tabular-nums"
                    >
                      {quantity}
                    </output>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.min(stockCount, value + 1))
                      }
                      disabled={!available || quantity >= stockCount}
                      aria-label="Increase quantity"
                      title="Increase quantity"
                      className="grid h-11 w-11 place-items-center disabled:opacity-35"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <p
                  className={`pb-1 text-xs ${available ? "text-ink/65" : "font-semibold text-plum"}`}
                  aria-live="polite"
                >
                  {available
                    ? `${stockCount} in sample stock`
                    : "Currently unavailable"}
                </p>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-ink/55">
                Inventory shown is placeholder data and will be replaced with
                approved stock.
              </p>
              {notice && (
                <p role="status" className="mt-4 text-sm font-medium text-plum">
                  {notice}
                  {notice === "Added to your cart." && (
                    <>
                      {" "}
                      <Link
                        href="/cart"
                        className="underline underline-offset-4"
                      >
                        View cart
                      </Link>
                    </>
                  )}
                </p>
              )}

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => addToCart()}
                  disabled={!available}
                  className="min-h-12 bg-plum px-4 text-xs font-bold uppercase tracking-wider text-porcelain transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => addToCart(true)}
                  disabled={!available}
                  className="min-h-12 border border-ink/30 px-4 text-xs font-bold uppercase tracking-wider transition hover:border-plum hover:text-plum disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Buy it now
                </button>
              </div>
              <Link
                href={detailsHref}
                onClick={() => setOpen(false)}
                className="mt-5 self-center border-b border-ink/40 pb-1 text-xs font-semibold hover:border-plum hover:text-plum"
              >
                View full details
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
