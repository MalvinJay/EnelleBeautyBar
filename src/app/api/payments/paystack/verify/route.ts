import { formatPesewas, getPaystackSettings, getReferenceAmount } from "@/lib/payments";

type PaystackVerification = {
    status?: boolean;
    data?: {
        status?: string;
        reference?: string;
        amount?: number;
        currency?: string;
        paid_at?: string | null;
    };
};

export async function GET(request: Request) {
    const settings = getPaystackSettings();
    if (!settings.secretKey) {
        return Response.json({ message: "Payment verification is not configured." }, { status: 503 });
    }

    const reference = new URL(request.url).searchParams.get("reference")?.trim() ?? "";
    if (!/^[A-Za-z0-9.=\-]{8,128}$/.test(reference)) {
        return Response.json({ message: "A valid payment reference is required." }, { status: 400 });
    }
    const expectedAmount = getReferenceAmount(reference, settings.secretKey);
    if (expectedAmount === null) {
        return Response.json({ message: "This payment reference was not issued by this checkout." }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
            headers: { Authorization: `Bearer ${settings.secretKey}` },
            cache: "no-store",
        });
        const result: PaystackVerification = await response.json();
        if (!response.ok || !result.status || !result.data) {
            return Response.json({ message: "Could not verify this payment reference." }, { status: 502 });
        }

        const paid = result.data.status === "success"
            && result.data.reference === reference
            && result.data.currency === "GHS"
            && Number.isSafeInteger(result.data.amount)
            && result.data.amount === expectedAmount;

        return Response.json({
            paid,
            status: result.data.status ?? "unknown",
            reference: result.data.reference,
            amount: typeof result.data.amount === "number" ? formatPesewas(result.data.amount) : null,
            currency: result.data.currency,
            paidAt: result.data.paid_at ?? null,
        });
    } catch {
        return Response.json({ message: "The payment service could not be reached." }, { status: 502 });
    }
}