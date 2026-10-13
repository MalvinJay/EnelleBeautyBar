"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type Verification = {
  paid: boolean;
  status: string;
  reference: string;
  amount: number | null;
  currency: string;
  paidAt: string | null;
  email: string | null;
};

export function PaymentResult({ reference }: { reference: string }) {
  const { clear } = useCart();
  const [result, setResult] = useState<Verification | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) return;
    const controller = new AbortController();
    void fetch(
      `/api/payments/paystack/verify?reference=${encodeURIComponent(reference)}`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        const verification = await response.json();
        if (!response.ok)
          throw new Error(
            verification.message ?? "Payment verification failed.",
          );
        setResult(verification as Verification);
        if (verification.paid) clear();
      })
      .catch((verificationError: unknown) => {
        if (!controller.signal.aborted)
          setError(
            verificationError instanceof Error
              ? verificationError.message
              : "Payment verification failed.",
          );
      });
    return () => controller.abort();
  }, [clear, reference]);

  const displayError =
    error ||
    (!reference
      ? "No payment reference was returned. Your cart has been kept."
      : "");
  const paid = result?.paid === true;

  return (
    <>
      <Header />
      <main className="grid min-h-[65vh] place-items-center bg-porcelain px-5 py-14 text-ink sm:px-10">
        <section className="w-full max-w-xl border-y border-ink/15 py-12 text-center">
          {result === null && !displayError ? (
            <LoaderCircle
              size={28}
              aria-label="Verifying payment"
              className="mx-auto animate-spin text-plum"
            />
          ) : paid ? (
            <Check size={30} aria-hidden="true" className="mx-auto text-plum" />
          ) : (
            <CircleAlert
              size={30}
              aria-hidden="true"
              className="mx-auto text-plum"
            />
          )}
          <p className="eyebrow mt-5 text-plum">
            {result === null && !displayError
              ? "One moment"
              : paid
                ? "Payment confirmed"
                : "Payment not confirmed"}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            {result === null && !displayError
              ? "Verifying your payment"
              : paid
                ? "Thank you for your order."
                : "Your cart is still here."}
          </h1>
          {result === null && !displayError && (
            <p className="mt-4 text-sm text-ink/65">
              We’re checking the transaction directly with Paystack.
            </p>
          )}
          {displayError && (
            <p role="alert" className="mt-4 text-sm leading-6 text-ink/70">
              {displayError}
            </p>
          )}
          {result && !paid && (
            <p className="mt-4 text-sm leading-6 text-ink/70">
              Paystack reports this payment as {result.status}. No items were
              removed from your cart.
            </p>
          )}
          {paid && result && (
            <>
              <p className="mt-4 text-sm leading-6 text-ink/70">
                Payment verified for GH₵{" "}
                {result.amount?.toLocaleString("en-GH")}. Keep this reference
                for fulfilment.
              </p>
              <p className="mt-3 break-all text-xs text-ink/55">
                Reference: {result.reference}
              </p>
              <p className="mt-4 text-xs leading-5 text-ink/55">
                This preview does not store orders in a database yet. Enelle
                Beauty Bar will need to reconcile this reference in Paystack and
                confirm delivery.
              </p>
            </>
          )}
          {(result !== null || displayError) && (
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={paid ? "/collections" : "/cart"}
                className="inline-flex min-h-11 items-center bg-plum px-5 text-xs font-bold uppercase tracking-wider text-porcelain"
              >
                {paid ? "Continue shopping" : "Return to cart"}
              </Link>
              {!paid && (
                <Link
                  href="/checkout"
                  className="inline-flex min-h-11 items-center border border-ink/25 px-5 text-xs font-bold uppercase tracking-wider"
                >
                  Try again
                </Link>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
