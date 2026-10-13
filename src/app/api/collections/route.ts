import { getCatalogCollections } from "@/lib/catalog";

export async function GET() {
    return Response.json({ collections: getCatalogCollections() });
}