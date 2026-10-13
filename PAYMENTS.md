# Paystack Checkout Setup

The product checkout uses Paystack's transaction initialize and verify APIs. The secret key is read only by server route handlers and must never use a `NEXT_PUBLIC_` prefix.

Add these values to the ignored `.env.local` file for local testing:

```dotenv
PAYSTACK_SECRET_KEY=sk_test_replace_with_your_test_secret
PAYSTACK_DELIVERY_FEE_GHS=0.00
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use a Paystack test secret while developing. Set `PAYSTACK_DELIVERY_FEE_GHS` only after the owner approves the shipping fee; `0.00` is valid only when no delivery charge is intended. The checkout stays disabled if this setting or Paystack credentials are missing. Production requires an HTTPS `NEXT_PUBLIC_SITE_URL`.

The initialize endpoint derives product prices, variants, and stock from the server catalog. It sends the customer to Paystack, and the callback asks Paystack's verify endpoint to confirm the signed reference, exact amount, currency, and transaction status.

The cart currently persists in the customer's browser. There is no durable order record, stock reservation, or webhook processing while the database decision is pending. Treat this as a test-mode integration only; production payments should wait until an order database and webhook/reconciliation workflow are added.
