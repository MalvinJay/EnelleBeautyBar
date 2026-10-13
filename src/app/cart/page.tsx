import type { Metadata } from "next";
import { CartExperience } from "@/components/cart/CartExperience";

export const metadata: Metadata = {
  title: "Shopping Cart | Enelle Beauty Bar",
  description: "Review your Enelle Beauty Bar product selection.",
};

export default function CartPage() {
  return <CartExperience />;
}
