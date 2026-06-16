# PayRail Dashboard

Grant proof-of-work for a lightweight crypto invoice and payment tracking product.

## Product

PayRail lets a Web3 startup or online merchant create an invoice, share a payment page, track on-chain payment status, and deliver a webhook when the invoice is paid.

This repository is intentionally scoped as a pre-grant MVP:

- merchant dashboard
- invoice creation flow
- public payment page mock
- simulated payment confirmation
- webhook event log
- grant milestone and budget view

The production milestone replaces the simulated watcher with Solana/Base RPC transaction tracking and adds a backend API.

## Grant Fit

Target grant: [Superteam Startup Accelerator Grant](https://superteam.fun/earn/grants/startup-accelerator-grant)

Requested budget: `8,500 USDC`

Primary funded cost: founder/developer compensation for MVP engineering.

## Milestones

| Milestone | Scope | Budget |
| --- | --- | ---: |
| Prototype | Architecture, UI flow, invoice model, mock payment lifecycle | 1,000 USDC |
| Working MVP | Backend API, chain watcher, dashboard, payment status, webhook delivery | 4,000 USDC |
| Launch Package | Docs, demo deployment, testing, feedback iteration, grant report | 3,500 USDC |

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5174`.

## Production Roadmap

1. Add server API for merchants, invoices, and webhook subscriptions.
2. Persist invoices and events in PostgreSQL.
3. Add Solana RPC watcher for USDC/SOL transfers.
4. Add Base USDC watcher via EVM logs and transaction receipts.
5. Sign webhook payloads with HMAC.
6. Add Docker deployment and hosted demo.
