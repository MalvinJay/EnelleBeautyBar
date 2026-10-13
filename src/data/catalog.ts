export type CatalogCategory = {
    slug: string;
    name: string;
    description: string;
};

export type CatalogCollection = {
    slug: string;
    name: string;
    category: string;
    description: string;
    image: string;
};

export type CatalogProduct = {
    id: string;
    name: string;
    slug: string;
    category: string;
    collection: string;
    description: string;
    price: number;
    priceLabel?: string;
    image: string;
    imageAlt: string;
    availability: "in-stock" | "out-of-stock";
    featured: boolean;
    bestSeller: boolean;
    popularity: number;
    createdAt: string;
    tags: string[];
};

export const catalogCategories: CatalogCategory[] = [
    { slug: "hair-bundles", name: "Hair Bundles", description: "Premium textures and lengths." },
    { slug: "frontals", name: "Frontals", description: "Lace pieces for a seamless finish." },
    { slug: "wigs", name: "Wigs", description: "Ready-to-wear and custom units." },
    { slug: "tools-accessories", name: "Tools & Accessories", description: "Everyday styling essentials." },
    { slug: "hair-care", name: "Hair Care", description: "Care and maintenance products." },
];

export const catalogCollections: CatalogCollection[] = [
    {
        slug: "peruviana",
        name: "Peruviana",
        category: "Hair Bundles",
        description: "Soft, versatile textures for everyday styling.",
        image: "/enelle/nqDSvRyDDJhZSKKqLpWKcqzADeszukLM.jpeg",
    },
    {
        slug: "frontals",
        name: "Frontals",
        category: "Frontals",
        description: "Finishing pieces for a natural-looking hairline.",
        image: "/enelle/ngWSEPyjxBwRLxYjdAIOJHFKJiVdLdCC.jpeg",
    },
    {
        slug: "custom-wigs",
        name: "Custom Wigs",
        category: "Wigs",
        description: "Tailored units made for your signature look.",
        image: "/enelle/couple.png",
    },
    {
        slug: "tools-accessories",
        name: "Tools & Accessories",
        category: "Tools & Accessories",
        description: "Finishing touches for your styling routine.",
        image: "/enelle/Sample1.png",
    },
];

export const catalogProducts: CatalogProduct[] = [
    {
        id: "P001", name: "Peruviana Body Wave Bundle", slug: "peruviana-body-wave-bundle",
        category: "hair-bundles", collection: "peruviana", description: "A soft, natural-looking texture with versatile movement.",
        price: 1400, priceLabel: "From", image: "/enelle/nqDSvRyDDJhZSKKqLpWKcqzADeszukLM.jpeg",
        imageAlt: "Sample image for a Peruviana body wave bundle", availability: "in-stock", featured: true,
        bestSeller: true, popularity: 96, createdAt: "2026-10-08", tags: ["body wave", "natural", "bundle"],
    },
    {
        id: "P002", name: "Silk Lace Frontal", slug: "silk-lace-frontal",
        category: "frontals", collection: "frontals", description: "A lightweight lace piece for a polished, seamless finish.",
        price: 1200, priceLabel: "From", image: "/enelle/ngWSEPyjxBwRLxYjdAIOJHFKJiVdLdCC.jpeg",
        imageAlt: "Sample image for a silk lace frontal", availability: "in-stock", featured: true,
        bestSeller: false, popularity: 83, createdAt: "2026-10-05", tags: ["lace", "frontal", "hair"],
    },
    {
        id: "P003", name: "Everyday Styling Tool Kit", slug: "everyday-styling-tool-kit",
        category: "tools-accessories", collection: "tools-accessories", description: "A sample set of practical tools for styling and maintenance.",
        price: 450, image: "/enelle/Sample1.png", imageAlt: "Sample image for a styling tool kit",
        availability: "in-stock", featured: false, bestSeller: false, popularity: 58, createdAt: "2026-09-28",
        tags: ["tools", "styling", "accessories"],
    },
    {
        id: "P004", name: "Satin Bonnet & Wrap Set", slug: "satin-bonnet-wrap-set",
        category: "tools-accessories", collection: "tools-accessories", description: "A gentle overnight set for protecting styled hair.",
        price: 150, image: "/enelle/Goldie.png", imageAlt: "Sample image for a satin bonnet and wrap set",
        availability: "in-stock", featured: false, bestSeller: true, popularity: 71, createdAt: "2026-09-20",
        tags: ["night care", "satin", "accessories"],
    },
    {
        id: "P005", name: "Custom Raw Frontal Wig", slug: "custom-raw-frontal-wig",
        category: "wigs", collection: "custom-wigs", description: "A tailored wig unit with a natural-looking hairline.",
        price: 2800, priceLabel: "From", image: "/enelle/couple.png",
        imageAlt: "Sample image for a custom frontal wig", availability: "in-stock", featured: true,
        bestSeller: true, popularity: 92, createdAt: "2026-10-10", tags: ["custom", "wig", "frontal"],
    },
    {
        id: "P006", name: "Lace Melt Essentials", slug: "lace-melt-essentials",
        category: "hair-care", collection: "frontals", description: "Sample finishing essentials for lace application and touch-ups.",
        price: 280, image: "/enelle/nfRhZJqQIVKfWtWOAPVQoXpfSYKeBLfp.jpeg",
        imageAlt: "Sample image for lace melt care products", availability: "in-stock", featured: false,
        bestSeller: false, popularity: 62, createdAt: "2026-09-25", tags: ["lace care", "melt", "styling"],
    },
    {
        id: "P007", name: "Scalp Care Serum", slug: "scalp-care-serum",
        category: "hair-care", collection: "tools-accessories", description: "A lightweight sample serum for scalp and hairline care.",
        price: 220, image: "/enelle/nquGsHrscWoTaphtsQZumiwSalfyWgBp.jpeg",
        imageAlt: "Sample image for a scalp care serum", availability: "in-stock", featured: false,
        bestSeller: false, popularity: 54, createdAt: "2026-09-18", tags: ["scalp", "care", "serum"],
    },
    {
        id: "P008", name: "Seamless Tape-In Set", slug: "seamless-tape-in-set",
        category: "hair-bundles", collection: "peruviana", description: "A sample tape-in set designed for flexible styling.",
        price: 1800, priceLabel: "From", image: "/enelle/nPJefzRvBqWqvRvUNxRxLCVpQWLupwoi.jpeg",
        imageAlt: "Sample image for a tape-in extension set", availability: "out-of-stock", featured: false,
        bestSeller: false, popularity: 48, createdAt: "2026-09-12", tags: ["tape-in", "extensions", "hair"],
    },
    {
        id: "P009", name: "Bridal Hair Prep Set", slug: "bridal-hair-prep-set",
        category: "hair-care", collection: "custom-wigs", description: "A sample edit of finishing and preparation essentials.",
        price: 650, image: "/enelle/nHyKacWgIAiuteKlxUIiDqFacinopKZD.jpeg",
        imageAlt: "Sample image for a bridal hair preparation set", availability: "in-stock", featured: true,
        bestSeller: false, popularity: 68, createdAt: "2026-10-01", tags: ["bridal", "care", "styling"],
    },
    {
        id: "P010", name: "Sleek Edge Styling Stick", slug: "sleek-edge-styling-stick",
        category: "hair-care", collection: "tools-accessories", description: "A compact styling essential for smooth finishing details.",
        price: 120, image: "/enelle/nfRhZJqQIVKfWtWOAPVQoXpfSYKeBLfp.jpeg",
        imageAlt: "Sample image for an edge styling stick", availability: "in-stock", featured: false,
        bestSeller: false, popularity: 44, createdAt: "2026-09-10", tags: ["edges", "styling", "care"],
    },
    {
        id: "P011", name: "Raw Straight Hair Bundle", slug: "raw-straight-hair-bundle",
        category: "hair-bundles", collection: "peruviana", description: "A smooth sample texture with a clean, classic finish.",
        price: 1500, priceLabel: "From", image: "/enelle/nQIOFSTSsdLiIBWdZSQquLHrnDACTyYI.jpeg",
        imageAlt: "Sample image for a raw straight hair bundle", availability: "in-stock", featured: false,
        bestSeller: false, popularity: 60, createdAt: "2026-09-30", tags: ["straight", "raw hair", "bundle"],
    },
    {
        id: "P012", name: "Detangling Extension Brush", slug: "detangling-extension-brush",
        category: "tools-accessories", collection: "tools-accessories", description: "A sample brush for gentle detangling and daily upkeep.",
        price: 120, image: "/enelle/naCJIUUmIimbRuJjpUoShnKIpmNMNlux.jpeg",
        imageAlt: "Sample image for a detangling extension brush", availability: "in-stock", featured: false,
        bestSeller: false, popularity: 39, createdAt: "2026-09-08", tags: ["brush", "tools", "care"],
    },
];