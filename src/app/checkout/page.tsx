import type { Metadata } from "next";
import { CheckoutExperience } from "@/components/cart/CheckoutExperience";

export const metadata: Metadata = {
  title: "Checkout | Enelle Beauty Bar",
  description: "Secure checkout for Enelle Beauty Bar products.",
};

export default function CheckoutPage() {
  return <CheckoutExperience />;
}
