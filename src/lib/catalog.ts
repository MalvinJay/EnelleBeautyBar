import {
    catalogCategories,
    catalogCollections,
    catalogProducts,
    type CatalogCategory,
    type CatalogCollection,
    type CatalogProduct,
} from "@/data/catalog";

export type ProductFilters = {
    query?: string;
    category?: string;
    collection?: string;
    availability?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
};

export function getCatalogCategories(): (CatalogCategory & { count: number })[] {
    return catalogCategories.map((category) => ({
        ...category,
        count: catalogProducts.filter((product) => product.category === category.slug).length,
    }));
}

export function getCatalogCollections(): (CatalogCollection & { count: number })[] {
    return catalogCollections.map((collection) => ({
        ...collection,
        count: catalogProducts.filter((product) => product.collection === collection.slug).length,
    }));
}

export function getCatalogCollection(slug: string): CatalogCollection | undefined {
    return catalogCollections.find((collection) => collection.slug === slug);
}

export function searchCatalogProducts(filters: ProductFilters = {}): {
    products: CatalogProduct[];
    count: number;
} {
    const normalizedQuery = filters.query?.trim().toLocaleLowerCase();
    const matchedProducts = catalogProducts.filter((product) => {
        const category = catalogCategories.find((item) => item.slug === product.category);
        const searchableText = [
            product.name,
            product.description,
            category?.name ?? "",
            product.tags.join(" "),
        ].join(" ").toLocaleLowerCase();

        return (!normalizedQuery || searchableText.includes(normalizedQuery))
            && (!filters.category || product.category === filters.category)
            && (!filters.collection || product.collection === filters.collection)
            && (!filters.availability || product.availability === filters.availability)
            && (filters.minPrice === undefined || product.price >= filters.minPrice)
            && (filters.maxPrice === undefined || product.price <= filters.maxPrice);
    });

    const categoryIndex = new Map(catalogCategories.map((category) => [category.slug, category.name]));
    const collectionIndex = new Map(catalogCollections.map((collection) => [collection.slug, collection.name]));
    const sorters: Record<string, (left: CatalogProduct, right: CatalogProduct) => number> = {
        newest: (left, right) => right.createdAt.localeCompare(left.createdAt),
        "price-low-high": (left, right) => left.price - right.price,
        "price-high-low": (left, right) => right.price - left.price,
        popularity: (left, right) => right.popularity - left.popularity,
        featured: (left, right) => Number(right.featured) - Number(left.featured) || right.popularity - left.popularity,
    };

    const products = matchedProducts.sort(sorters[filters.sort ?? "featured"] ?? sorters.featured)
        .map((product) => ({
            ...product,
            categoryName: categoryIndex.get(product.category) ?? product.category,
            collectionName: collectionIndex.get(product.collection) ?? product.collection,
        }));

    return { products, count: products.length };
}