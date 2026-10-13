import { getCatalogCategories } from "@/lib/catalog";

export async function GET() {
    return Response.json({ categories: getCatalogCategories() });
}