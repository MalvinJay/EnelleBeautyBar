import type { Metadata } from "next";
import { PaymentResult } from "@/components/cart/PaymentResult";

export const metadata: Metadata = {
  title: "Payment Status | Enelle Beauty Bar",
  description: "Verify your Enelle Beauty Bar payment.",
};

type CallbackPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PaymentCallbackPage({
  searchParams,
}: CallbackPageProps) {
  const params = await searchParams;
  const reference =
    typeof params.reference === "string" ? params.reference : "";
  return <PaymentResult reference={reference} />;
}
