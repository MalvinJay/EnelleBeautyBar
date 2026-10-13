import { searchCatalogProducts } from "@/lib/catalog";

function parsePrice(value: string | null): number | undefined {
    if (value === null || value.trim() === "") return undefined;
    const price = Number(value);
    return Number.isFinite(price) && price >= 0 ? price : undefined;
}

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const result = searchCatalogProducts({
        query: params.get("q") ?? "",
        category: params.get("category") ?? "",
        collection: params.get("collection") ?? "",
        availability: params.get("availability") ?? "",
        minPrice: parsePrice(params.get("minPrice")),
        maxPrice: parsePrice(params.get("maxPrice")),
        sort: params.get("sort") ?? "featured",
    });

    return Response.json(result);
}