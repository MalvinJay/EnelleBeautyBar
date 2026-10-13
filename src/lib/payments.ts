import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

function parseGhsAmount(value: string | undefined): number | null {
    if (!value || !/^\d+(\.\d{1,2})?$/.test(value)) return null;
    const amountPesewas = Math.round(Number(value) * 100);
    return Number.isSafeInteger(amountPesewas) ? amountPesewas : null;
}

export function getPaystackSettings() {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const shippingFeePesewas = parseGhsAmount(process.env.PAYSTACK_DELIVERY_FEE_GHS);
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const siteUrl = configuredUrl ?? (process.env.NODE_ENV === "production" ? null : "http://localhost:3000");
    let normalizedSiteUrl: string | null = null;
    try {
        const parsedUrl = siteUrl ? new URL(siteUrl) : null;
        if (parsedUrl && (parsedUrl.protocol === "https:" || (process.env.NODE_ENV !== "production" && parsedUrl.protocol === "http:"))) {
            normalizedSiteUrl = parsedUrl.origin;
        }
    } catch {
        normalizedSiteUrl = null;
    }
    const validSecret = secretKey
        && /^sk_(test|live)_/.test(secretKey)
        && (process.env.NODE_ENV === "production" || secretKey.startsWith("sk_test_"));

    return {
        secretKey: validSecret ? secretKey : null,
        siteUrl: normalizedSiteUrl,
        shippingFeePesewas,
        ready: Boolean(validSecret && normalizedSiteUrl && shippingFeePesewas !== null),
    };
}

export function formatPesewas(amountPesewas: number): number {
    return amountPesewas / 100;
}

export function createTransactionReference(amountPesewas: number, secretKey: string): string {
    const nonce = randomUUID();
    const payload = `${amountPesewas.toString(36)}.${nonce}`;
    const signature = createHmac("sha256", secretKey).update(payload).digest().subarray(0, 16).toString("hex");
    return `enelle-${amountPesewas.toString(36)}-${nonce}-${signature}`;
}

export function getReferenceAmount(reference: string, secretKey: string): number | null {
    const match = /^enelle-([0-9a-z]+)-([0-9a-f-]{36})-([0-9a-f]{32})$/.exec(reference);
    if (!match) return null;

    const amountPesewas = Number.parseInt(match[1], 36);
    if (!Number.isSafeInteger(amountPesewas) || amountPesewas < 100) return null;

    const payload = `${match[1]}.${match[2]}`;
    const expectedSignature = createHmac("sha256", secretKey).update(payload).digest().subarray(0, 16);
    const receivedSignature = Buffer.from(match[3], "hex");
    return timingSafeEqual(expectedSignature, receivedSignature) ? amountPesewas : null;
}