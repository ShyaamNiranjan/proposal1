# Xoom Store — RFQ Concept Prototype

Visual click-through prototype for the Xoom Marketing buyer-facing e-commerce RFQ. This is a **UI/UX concept**, not a production application.

**Placeholder brand:** “Xoom Store” stands in for the client’s final retail brand.

## Design system (Atelier Forest)

- Warm stone canvas + forest green accent + brass highlights
- Display type: Fraunces · Body: Outfit
- Signature interaction: dual-image product card crossfade with brass corner tick

## Run locally

```bash
npm install
npm run dev
```

## Build (GitHub Pages)

```bash
npm run build
```

Primary URL: `https://xoomproposal.yniidi.com`  
Vite `base` is `/` because the custom domain serves from root (not `/proposal1/`).

## What is mocked vs production

| Area | In this prototype | In production |
| --- | --- | --- |
| Catalog | Static `src/data/products.ts` | CMS / product API |
| Cart / checkout | React state only | Server cart + inventory locks |
| Payments | Simulated UPI/Card/Netbanking UI | Razorpay / Cashfree + webhooks |
| Auth / OTP | Assumed logged-in buyer | Real OTP + session |
| Inventory | Variant stock flags in UI | Real-time deduction / concurrency |
| Admin actions | Visual-only edit/delete | Authenticated CRUD APIs |
| Fulfilment | Manual status mock | Ops workflows / future courier APIs |

## Routes

- Buyer: `/`, `/shop`, `/product/:id`, `/cart`, `/checkout`, `/order-confirmation`, `/orders`
- Admin: `/admin`, `/admin/products`, `/admin/orders`, `/admin/inventory`
