import type { Metadata } from "next";
import { CollectionsExperience } from "@/components/collections/CollectionsExperience";

export const metadata: Metadata = {
  title: "Shop Products | Enelle Beauty Bar",
  description:
    "Shop sample hair, styling, and care products from Enelle Beauty Bar.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string | string[] }>;
}) {
  const { sort } = await searchParams;

  return (
    <CollectionsExperience
      basePath="/products"
      pageTitle="Shop products"
      initialFilters={{ sort: Array.isArray(sort) ? sort[0] : sort }}
    />
  );
}
