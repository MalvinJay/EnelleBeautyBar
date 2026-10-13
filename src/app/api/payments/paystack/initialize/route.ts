import { catalogProducts } from "@/data/catalog";
import type { CartLine } from "@/lib/cart-store";
import { createTransactionReference, formatPesewas, getPaystackSettings } from "@/lib/payments";

type CheckoutDetails = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
};

type CheckoutRequest = {
    customer?: Partial<CheckoutDetails>;
    lines?: CartLine[];
};

function validText(value: unknown, maxLength: number): value is string {
    return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function jsonError(message: string, status: number) {
    return Response.json({ message }, { status });
}

export async function POST(request: Request) {
    const settings = getPaystackSettings();
    if (!settings.ready || !settings.secretKey || !settings.siteUrl || settings.shippingFeePesewas === null) {
        return jsonError("Checkout is not configured. Confirm the delivery fee and configure Paystack on the server.", 503);
    }

    let body: CheckoutRequest;
    try {
        body = await request.json() as CheckoutRequest;
    } catch {
        return jsonError("Invalid checkout request.", 400);
    }

    const customer = body.customer;
    if (!customer
        || !validText(customer.name, 120)
        || !validText(customer.email, 254)
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())
        || !validText(customer.phone, 32)
        || !/^[+0-9()\-\s]{7,32}$/.test(customer.phone.trim())
        || !validText(customer.address, 240)
        || !validText(customer.city, 100)
        || !validText(customer.region, 100)) {
        return jsonError("Enter a valid name, email, phone number, and delivery address.", 400);
    }

    if (!Array.isArray(body.lines) || body.lines.length === 0 || body.lines.length > 30) {
        return jsonError("Your cart is empty or contains too many items.", 400);
    }

    const aggregatedLines = new Map<string, { line: CartLine; quantity: number }>();
    for (const line of body.lines) {
        if (!line || typeof line.productId !== "string" || !Number.isSafeInteger(line.quantity) || line.quantity < 1) {
            return jsonError("One or more cart quantities are invalid.", 400);
        }
        const key = `${line.productId}:${line.variantId ?? ""}`;
        const current = aggregatedLines.get(key);
        aggregatedLines.set(key, { line, quantity: (current?.quantity ?? 0) + line.quantity });
    }

    let subtotalPesewas = 0;
    const items: { productId: string; name: string; variant: string | null; quantity: number; unitPricePesewas: number }[] = [];
    for (const { line, quantity } of aggregatedLines.values()) {
        const product = catalogProducts.find((item) => item.id === line.productId);
        if (!product || product.availability !== "in-stock") {
            return jsonError("A product in your cart is no longer available.", 409);
        }

        const variant = product.variants?.find((item) => item.id === line.variantId);
        if (product.variants && !variant) {
            return jsonError(`Choose an available option for ${product.name}.`, 400);
        }
        if (!product.variants && line.variantId) {
            return jsonError(`The selected option for ${product.name} is invalid.`, 400);
        }

        const stockCount = variant?.stockCount ?? product.stockCount;
        const unitPricePesewas = Math.round((variant?.price ?? product.price) * 100);
        if (stockCount < 1 || quantity > stockCount) {
            return jsonError(`Only ${stockCount} of ${product.name}${variant ? ` (${variant.label})` : ""} are available.`, 409);
        }
        subtotalPesewas += unitPricePesewas * quantity;
        items.push({
            productId: product.id,
            name: product.name,
            variant: variant?.label ?? null,
            quantity,
            unitPricePesewas,
        });
    }

    const totalPesewas = subtotalPesewas + settings.shippingFeePesewas;
    if (!Number.isSafeInteger(totalPesewas) || totalPesewas < 100) {
        return jsonError("The checkout total is invalid.", 400);
    }

    const reference = createTransactionReference(totalPesewas, settings.secretKey);
    try {
        const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${settings.secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: customer.email.trim(),
                amount: String(totalPesewas),
                currency: "GHS",
                reference,
                callback_url: `${settings.siteUrl}/checkout/callback`,
                metadata: {
                    customer: {
                        name: customer.name.trim(),
                        phone: customer.phone.trim(),
                        address: customer.address.trim(),
                        city: customer.city.trim(),
                        region: customer.region.trim(),
                    },
                    items,
                    subtotalPesewas,
                    deliveryFeePesewas: settings.shippingFeePesewas,
                },
            }),
            cache: "no-store",
        });
        const result = await paystackResponse.json();
        if (!paystackResponse.ok || !result.status || typeof result.data?.authorization_url !== "string") {
            return jsonError("Paystack could not start this payment. Please retry or contact the salon.", 502);
        }

        return Response.json({
            authorizationUrl: result.data.authorization_url,
            reference,
            subtotal: formatPesewas(subtotalPesewas),
            deliveryFee: formatPesewas(settings.shippingFeePesewas),
            total: formatPesewas(totalPesewas),
            currency: "GHS",
        });
    } catch {
        return jsonError("The payment service could not be reached. Please retry.", 502);
    }
}