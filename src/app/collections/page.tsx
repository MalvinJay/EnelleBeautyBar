import type { Metadata } from "next";
import { CollectionsExperience } from "@/components/collections/CollectionsExperience";

export const metadata: Metadata = {
  title: "Shop Collections | Enelle Beauty Bar",
  description:
    "Browse sample hair collections, styling essentials, and care products from Enelle Beauty Bar.",
};

type CollectionsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const params = await searchParams;
  return (
    <CollectionsExperience
      initialFilters={{
        category: firstValue(params.category),
        query: firstValue(params.q),
        availability: firstValue(params.availability),
        minPrice: firstValue(params.minPrice),
        maxPrice: firstValue(params.maxPrice),
        sort: firstValue(params.sort) || "featured",
      }}
    />
  );
}
