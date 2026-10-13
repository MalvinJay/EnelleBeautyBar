import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionsExperience } from "@/components/collections/CollectionsExperience";
import { getCatalogCollection } from "@/lib/catalog";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCatalogCollection(slug);

  return collection
    ? {
        title: `${collection.name} | Enelle Beauty Bar`,
        description: collection.description,
      }
    : { title: "Collection Not Found | Enelle Beauty Bar" };
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCatalogCollection(slug);
  if (!collection) notFound();
  const filters = await searchParams;

  return (
    <CollectionsExperience
      initialCollectionSlug={slug}
      initialCollectionName={collection.name}
      initialFilters={{
        category: firstValue(filters.category),
        query: firstValue(filters.q),
        availability: firstValue(filters.availability),
        minPrice: firstValue(filters.minPrice),
        maxPrice: firstValue(filters.maxPrice),
        sort: firstValue(filters.sort) || "featured",
      }}
    />
  );
}
