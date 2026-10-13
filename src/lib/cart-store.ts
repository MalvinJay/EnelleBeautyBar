"use client";

import { catalogProducts, type CatalogProduct } from "@/data/catalog";

export type CartLine = {
    productId: string;
    variantId?: string;
    quantity: number;
};

const storageKey = "enelle-cart-v1";
const emptySnapshot: CartLine[] = [];
let cartSnapshot: CartLine[] = emptySnapshot;
let initialized = false;
const subscribers = new Set<() => void>();

export function subscribeToCart(callback: () => void) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}

export function getCartSnapshot() {
    return cartSnapshot;
}

export function getServerCartSnapshot() {
    return emptySnapshot;
}

function commitCart(lines: CartLine[]) {
    cartSnapshot = lines;
    window.localStorage.setItem(storageKey, JSON.stringify(lines));
    subscribers.forEach((callback) => callback());
}

export function initializeCart() {
    if (initialized || typeof window === "undefined") return;
    initialized = true;

    try {
        const savedCart: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(savedCart)) {
            cartSnapshot = savedCart.filter((line): line is CartLine =>
                typeof line?.productId === "string"
                && (line.variantId === undefined || typeof line.variantId === "string")
                && Number.isSafeInteger(line.quantity)
                && line.quantity > 0,
            );
        }
    } catch {
        cartSnapshot = emptySnapshot;
    }

    subscribers.forEach((callback) => callback());
}

export function getCartProduct(productId: string): CatalogProduct | undefined {
    return catalogProducts.find((product) => product.id === productId);
}

export function getCartLineStock(line: CartLine): number {
    const product = getCartProduct(line.productId);
    if (!product) return 0;
    if (!product.variants) return product.stockCount;
    return product.variants.find((variant) => variant.id === line.variantId)?.stockCount ?? 0;
}

export function addCartLine(line: CartLine): boolean {
    const product = getCartProduct(line.productId);
    if (!product || !Number.isSafeInteger(line.quantity) || line.quantity < 1) return false;
    if (product.variants && !product.variants.some((variant) => variant.id === line.variantId)) return false;

    const stockCount = getCartLineStock(line);
    if (stockCount < 1) return false;

    const matchingLine = cartSnapshot.find((item) =>
        item.productId === line.productId && item.variantId === line.variantId,
    );
    const nextQuantity = (matchingLine?.quantity ?? 0) + line.quantity;
    if (nextQuantity > stockCount) return false;

    const nextCart = matchingLine
        ? cartSnapshot.map((item) => item === matchingLine ? { ...item, quantity: nextQuantity } : item)
        : [...cartSnapshot, line];
    commitCart(nextCart);
    return true;
}

export function updateCartLine(line: CartLine) {
    const stockCount = getCartLineStock(line);
    if (stockCount < 1) return removeCartLine(line.productId, line.variantId);
    const quantity = Math.min(Math.max(1, Math.floor(line.quantity)), stockCount);
    commitCart(cartSnapshot.map((item) =>
        item.productId === line.productId && item.variantId === line.variantId
            ? { ...item, quantity }
            : item,
    ));
}

export function removeCartLine(productId: string, variantId?: string) {
    commitCart(cartSnapshot.filter((line) =>
        line.productId !== productId || line.variantId !== variantId,
    ));
}

export function clearCart() {
    commitCart(emptySnapshot);
}