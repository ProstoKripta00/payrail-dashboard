# Superteam Startup Accelerator Grant Application

## Project Name

PayRail Dashboard

## One-Line Description

A non-custodial stablecoin invoice and payment tracking dashboard for Web3 startups and small online merchants.

## Website / Demo

https://prostokripta00.github.io/payrail-dashboard/

## GitHub

https://github.com/ProstoKripta00/payrail-dashboard

## Short Pitch

PayRail is a lightweight payment operations console for Web3 startups, creators, and small online businesses. It lets a merchant create a crypto invoice, share a payment page, accept USDC/SOL payments to their own wallet, track payment status, and receive webhook events when the invoice is paid.

The goal is to help early-stage teams accept stablecoin payments without building a payment backend from scratch or relying on a custodial processor.

## Problem

Small Web3 teams often need to accept stablecoin payments before they have the time or budget to build a full payment backend.

Existing options are often custodial, expensive, or too heavy for MVP-stage products. This slows down paid pilots, service invoices, token-gated products, NFT memberships, and early revenue experiments.

Teams need a simple non-custodial invoice layer that can be deployed quickly and integrated through APIs and webhooks.

## Solution

PayRail provides a simple non-custodial invoice layer:

- merchant dashboard
- invoice creation
- public payment page
- payment status tracking
- Solana Devnet payment watcher
- webhook delivery for invoice events
- API documentation
- deployable demo

The merchant keeps custody of funds. PayRail tracks payments and sends payment status events to the merchant backend.

## Current Progress

A frontend proof-of-work is already implemented and pushed to GitHub. It includes:

- merchant dashboard
- invoice creation flow
- payment page
- simulated payment confirmation
- webhook event log
- grant milestone and budget view

After grant approval, the next step is to connect the frontend to a backend API and implement Solana Devnet payment tracking.

## Milestones

### Milestone 1: Prototype and Architecture

Budget: 1,000 USDC

Deliverables:

- clickable dashboard prototype
- invoice data model
- payment lifecycle design
- webhook payload design
- public GitHub repository

### Milestone 2: Working MVP

Budget: 4,000 USDC

Deliverables:

- backend API for invoices
- Solana payment watcher
- merchant dashboard connected to API
- webhook delivery and retry log
- testnet demo flow

### Milestone 3: Launch Package

Budget: 3,500 USDC

Deliverables:

- hosted demo
- deployment documentation
- API documentation
- test coverage for critical flows
- final grant report and demo video

## Budget

Total requested: 8,500 USDC

Breakdown:

- Founder/developer compensation: 6,000 USDC
- Testing, deployment, documentation: 1,200 USDC
- Infrastructure, RPC, hosting, tools: 600 USDC
- Product feedback and iteration: 700 USDC

## Timeline

4-5 weeks.

## Why This Should Be Funded

PayRail gives early Web3 teams a practical way to monetize with stablecoins while keeping custody simple. The product is small enough to ship as a focused MVP, but useful enough to become reusable infrastructure for paid pilots, subscriptions, NFT memberships, service invoices, and startup revenue experiments.

The grant primarily funds engineering time to turn the current prototype into a working Solana-based payment tracking MVP with documentation and a public demo.
