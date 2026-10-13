import { formatPesewas, getPaystackSettings } from "@/lib/payments";

export async function GET() {
    const settings = getPaystackSettings();
    return Response.json({
        ready: settings.ready,
        currency: "GHS",
        deliveryFee: settings.shippingFeePesewas === null
            ? null
            : formatPesewas(settings.shippingFeePesewas),
        message: settings.ready
            ? "Checkout is available."
            : "Checkout is not configured. The business must approve a delivery fee and the server needs Paystack credentials.",
    });
}