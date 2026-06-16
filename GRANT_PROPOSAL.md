# Grant Proposal: PayRail Dashboard

## Summary

PayRail Dashboard is a lightweight crypto invoice and payment tracking system for Web3 startups, creators, and small online businesses. Merchants can create an invoice, share a payment page, accept USDC/SOL payments, track payment status, and receive webhook events inside their own application.

## Problem

Small Web3 teams often need to accept stablecoin payments before they are ready to build a full payment backend. Existing options are either custodial, expensive, or too heavy for early-stage products. This slows down MVP launches, paid pilots, and real-world crypto commerce.

## Solution

PayRail provides a simple non-custodial invoice layer:

- merchants create invoices from a dashboard
- buyers pay to the merchant wallet
- the system monitors chain activity and validates payment amount/status
- merchants receive a webhook when payment is confirmed
- teams get docs and a deployable starter implementation

## Why This Matters

This helps early Web3 teams monetize faster without asking users to trust a custodial payment intermediary. It also creates reusable infrastructure for stablecoin payment flows, paid pilots, subscriptions, NFT memberships, and service invoices.

## MVP Scope

- Merchant dashboard
- Invoice creation
- Public payment page
- Payment status lifecycle
- Webhook event log
- Solana Devnet payment tracking
- API documentation
- Demo deployment

## Milestones

### Milestone 1: Prototype and Architecture

Budget: `1,000 USDC`

Deliverables:

- clickable dashboard prototype
- invoice data model
- payment lifecycle design
- webhook payload design
- public GitHub repository

### Milestone 2: Working MVP

Budget: `4,000 USDC`

Deliverables:

- backend API for invoices
- Solana payment watcher
- merchant dashboard connected to API
- webhook delivery and retry log
- testnet demo flow

### Milestone 3: Launch Package

Budget: `3,500 USDC`

Deliverables:

- hosted demo
- deployment documentation
- API documentation
- test coverage for critical flows
- final grant report and demo video

## Budget

| Category | Amount |
| --- | ---: |
| Founder/developer compensation | 6,000 USDC |
| Testing, deployment, documentation | 1,200 USDC |
| Infrastructure, RPC, hosting, tools | 600 USDC |
| Product feedback and iteration | 700 USDC |
| **Total** | **8,500 USDC** |

## Timeline

Estimated delivery: `4-5 weeks`

## Future Expansion

- Base USDC support
- signed webhooks
- payment links API
- invoice expiration and refunds
- merchant analytics
- hosted white-label deployments
