"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookingButton } from "@/components/layout/FloatingBookingButton";
import { Header } from "@/components/layout/Header";
import { getCartLineStock, getCartProduct } from "@/lib/cart-store";
import { useCart } from "@/components/cart/CartProvider";

const money = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });

export function CartExperience() {
  const { lines, subtotal, updateItem, removeItem } = useCart();

  return (
    <>
      <Header />
      <main className="min-h-[65vh] bg-porcelain px-5 py-12 text-ink sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="eyebrow text-plum">Your selection</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            Shopping cart
          </h1>
          {lines.length === 0 ? (
            <div className="mt-10 border-y border-ink/15 py-16 text-center">
              <p className="font-display text-3xl">
                Your cart is waiting for something lovely.
              </p>
              <p className="mt-3 text-sm text-ink/65">
                Browse the sample catalogue to add an item.
              </p>
              <Link
                href="/collections"
                className="mt-6 inline-flex min-h-11 items-center gap-2 bg-plum px-5 text-xs font-bold uppercase tracking-wider text-porcelain"
              >
                Browse products <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_330px]">
              <div className="divide-y divide-ink/15 border-y border-ink/15">
                {lines.map((line) => {
                  const product = getCartProduct(line.productId);
                  if (!product) return null;
                  const variant = product.variants?.find(
                    (item) => item.id === line.variantId,
                  );
                  const stockCount = getCartLineStock(line);
                  const linePrice = variant?.price ?? product.price;

                  return (
                    <article
                      key={`${line.productId}:${line.variantId ?? "default"}`}
                      className="grid grid-cols-[92px_1fr] gap-4 py-5 sm:grid-cols-[128px_1fr_auto] sm:gap-6"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="relative aspect-[4/5] overflow-hidden rounded-sm bg-linen"
                      >
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0">
                        <p className="eyebrow text-plum">Sample product</p>
                        <h2 className="mt-2 font-display text-xl leading-tight sm:text-2xl">
                          {product.name}
                        </h2>
                        {variant && (
                          <p className="mt-1 text-sm text-ink/65">
                            Length: {variant.label}
                          </p>
                        )}
                        <p className="mt-2 text-sm font-semibold tabular-nums">
                          GH₵ {money.format(linePrice)}
                        </p>
                        {stockCount === 0 && (
                          <p
                            role="alert"
                            className="mt-2 text-xs font-semibold text-plum"
                          >
                            Currently unavailable. Remove this item to continue.
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-4">
                          <div className="inline-flex h-10 items-center border border-ink/25">
                            <button
                              type="button"
                              onClick={() =>
                                updateItem({
                                  ...line,
                                  quantity: line.quantity - 1,
                                })
                              }
                              disabled={line.quantity <= 1}
                              aria-label={`Decrease ${product.name} quantity`}
                              title="Decrease quantity"
                              className="grid h-10 w-10 place-items-center disabled:opacity-35"
                            >
                              <Minus size={15} aria-hidden="true" />
                            </button>
                            <output
                              aria-label={`${product.name} quantity`}
                              className="w-9 text-center text-sm tabular-nums"
                            >
                              {line.quantity}
                            </output>
                            <button
                              type="button"
                              onClick={() =>
                                updateItem({
                                  ...line,
                                  quantity: line.quantity + 1,
                                })
                              }
                              disabled={line.quantity >= stockCount}
                              aria-label={`Increase ${product.name} quantity`}
                              title="Increase quantity"
                              className="grid h-10 w-10 place-items-center disabled:opacity-35"
                            >
                              <Plus size={15} aria-hidden="true" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(line.productId, line.variantId)
                            }
                            aria-label={`Remove ${product.name}`}
                            title="Remove item"
                            className="grid h-10 w-10 place-items-center text-ink/60 transition hover:text-plum"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <p className="col-start-2 self-start text-sm font-semibold tabular-nums sm:col-start-3">
                        GH₵ {money.format(linePrice * line.quantity)}
                      </p>
                    </article>
                  );
                })}
              </div>
              <aside className="h-fit border border-ink/15 bg-white/35 p-5 sm:p-6">
                <h2 className="font-display text-2xl">Order summary</h2>
                <div className="mt-5 flex justify-between border-t border-ink/15 pt-4 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums">
                    GH₵ {money.format(subtotal)}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink/60">
                  Shipping is confirmed before payment. Rates are not yet
                  configured.
                </p>
                <Link
                  href="/shipping"
                  className="mt-2 inline-block text-xs font-semibold text-plum underline underline-offset-4"
                >
                  Shipping details
                </Link>
                <Link
                  href="/checkout"
                  className="mt-6 flex min-h-12 items-center justify-center gap-2 bg-plum px-4 text-xs font-bold uppercase tracking-wider text-porcelain transition hover:bg-ink"
                >
                  Continue to checkout{" "}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/collections"
                  className="mt-4 block text-center text-xs text-ink/65 underline underline-offset-4"
                >
                  Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingBookingButton />
    </>
  );
}
