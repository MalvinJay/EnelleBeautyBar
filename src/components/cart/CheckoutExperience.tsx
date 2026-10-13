"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getCartProduct } from "@/lib/cart-store";
import type { CartLine } from "@/lib/cart-store";

type CheckoutConfig = {
  ready: boolean;
  currency: string;
  deliveryFee: number | null;
  message: string;
};

type CheckoutResponse = {
  authorizationUrl?: string;
  message?: string;
};

const money = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });

export function CheckoutExperience() {
  const { lines, subtotal } = useCart();
  const [config, setConfig] = useState<CheckoutConfig | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/payments/paystack/config", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Payment settings are unavailable.");
        const result: CheckoutConfig = await response.json();
        setConfig(result);
      })
      .catch((loadError: unknown) => {
        if (!controller.signal.aborted)
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Payment settings are unavailable.",
          );
      });
    return () => controller.abort();
  }, []);

  const total = subtotal + (config?.deliveryFee ?? 0);
  const canCheckout = lines.length > 0 && config?.ready === true && !submitting;

  async function startPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!config?.ready || lines.length === 0) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, lines: lines as CartLine[] }),
      });
      const result: CheckoutResponse = await response.json();
      if (!response.ok || !result.authorizationUrl)
        throw new Error(result.message ?? "Could not start payment.");
      window.location.assign(result.authorizationUrl);
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Could not start payment. Please retry.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-[65vh] bg-porcelain px-5 py-10 text-ink sm:px-10 lg:px-16 lg:py-14">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/cart"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-ink/70 hover:text-plum"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to cart
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
            <section>
              <p className="eyebrow text-plum">Secure checkout</p>
              <h1 className="mt-3 font-display text-5xl sm:text-6xl">
                Your details
              </h1>
              {lines.length === 0 ? (
                <div className="mt-8 border-y border-ink/15 py-10">
                  <p className="font-display text-2xl">Your cart is empty.</p>
                  <Link
                    href="/collections"
                    className="mt-5 inline-flex min-h-11 items-center border-b border-plum text-sm font-semibold text-plum"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <form onSubmit={startPayment} className="mt-8 space-y-5">
                  <p className="text-sm leading-6 text-ink/70">
                    We’ll use these details to identify your payment and
                    coordinate delivery.
                  </p>
                  <label className="block text-xs font-semibold uppercase tracking-wider">
                    Full name
                    <input
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={customer.name}
                      onChange={(event) =>
                        setCustomer({ ...customer, name: event.target.value })
                      }
                      className="mt-2 h-12 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal normal-case tracking-normal outline-none focus:border-plum focus:ring-2 focus:ring-plum/15"
                    />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider">
                      Email address
                      <input
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        value={customer.email}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            email: event.target.value,
                          })
                        }
                        className="mt-2 h-12 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal normal-case tracking-normal outline-none focus:border-plum focus:ring-2 focus:ring-plum/15"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-wider">
                      Phone number
                      <input
                        type="tel"
                        autoComplete="tel"
                        required
                        maxLength={32}
                        value={customer.phone}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            phone: event.target.value,
                          })
                        }
                        className="mt-2 h-12 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal normal-case tracking-normal outline-none focus:border-plum focus:ring-2 focus:ring-plum/15"
                      />
                    </label>
                  </div>
                  <label className="block text-xs font-semibold uppercase tracking-wider">
                    Delivery address
                    <input
                      autoComplete="street-address"
                      required
                      maxLength={240}
                      value={customer.address}
                      onChange={(event) =>
                        setCustomer({
                          ...customer,
                          address: event.target.value,
                        })
                      }
                      className="mt-2 h-12 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal normal-case tracking-normal outline-none focus:border-plum focus:ring-2 focus:ring-plum/15"
                    />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider">
                      City / town
                      <input
                        autoComplete="address-level2"
                        required
                        maxLength={100}
                        value={customer.city}
                        onChange={(event) =>
                          setCustomer({ ...customer, city: event.target.value })
                        }
                        className="mt-2 h-12 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal normal-case tracking-normal outline-none focus:border-plum focus:ring-2 focus:ring-plum/15"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-wider">
                      Region
                      <input
                        autoComplete="address-level1"
                        required
                        maxLength={100}
                        value={customer.region}
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            region: event.target.value,
                          })
                        }
                        className="mt-2 h-12 w-full rounded-sm border border-ink/20 bg-white/60 px-3 text-base font-normal normal-case tracking-normal outline-none focus:border-plum focus:ring-2 focus:ring-plum/15"
                      />
                    </label>
                  </div>
                  {error && (
                    <p
                      role="alert"
                      className="border border-red-900/20 bg-red-50 px-4 py-3 text-sm text-red-900"
                    >
                      {error}
                    </p>
                  )}
                  {lines.length > 0 && !config?.ready && (
                    <p
                      role="status"
                      className="border border-champagne/50 bg-linen/50 px-4 py-3 text-sm leading-6 text-ink/80"
                    >
                      {config?.message ?? "Checking payment settings…"} See{" "}
                      <Link
                        href="/shipping"
                        className="font-semibold underline underline-offset-4"
                      >
                        shipping details
                      </Link>
                      .
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={!canCheckout}
                    className="flex min-h-12 w-full items-center justify-center gap-2 bg-plum px-5 text-xs font-bold uppercase tracking-wider text-porcelain transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <LockKeyhole size={15} aria-hidden="true" />{" "}
                    {submitting
                      ? "Connecting to Paystack…"
                      : "Continue to secure payment"}
                  </button>
                  <p className="text-center text-xs leading-5 text-ink/55">
                    Your card or mobile money details are entered only on
                    Paystack.
                  </p>
                </form>
              )}
            </section>

            <aside className="h-fit border border-ink/15 bg-white/35 p-5 sm:p-6">
              <h2 className="font-display text-2xl">Order summary</h2>
              <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                {lines.map((line) => {
                  const product = getCartProduct(line.productId);
                  if (!product) return null;
                  const variant = product.variants?.find(
                    (item) => item.id === line.variantId,
                  );
                  const unitPrice = variant?.price ?? product.price;
                  return (
                    <div
                      key={`${line.productId}:${line.variantId ?? "default"}`}
                      className="flex gap-3 py-3"
                    >
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-linen">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-5">
                          {product.name}
                        </p>
                        {variant && (
                          <p className="text-xs text-ink/60">
                            Length {variant.label}
                          </p>
                        )}
                        <p className="text-xs text-ink/60">
                          Qty {line.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm tabular-nums">
                        GH₵ {money.format(unitPrice * line.quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums">
                  GH₵ {money.format(subtotal)}
                </span>
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <span>Delivery</span>
                <span className="tabular-nums">
                  {config?.deliveryFee === null ||
                  config?.deliveryFee === undefined
                    ? "Pending"
                    : config.deliveryFee === 0
                      ? "No charge"
                      : `GH₵ ${money.format(config.deliveryFee)}`}
                </span>
              </div>
              <div className="mt-4 flex justify-between border-t border-ink/15 pt-4 text-base font-bold">
                <span>Total</span>
                <span className="tabular-nums">GH₵ {money.format(total)}</span>
              </div>
              <p className="mt-4 text-xs leading-5 text-ink/55">
                Catalog prices and stock are sample values awaiting owner
                approval. Orders are not yet saved to a database.
              </p>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
