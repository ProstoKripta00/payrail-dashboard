import type { Invoice, WebhookEvent } from "./types";

const now = new Date();
const plusHours = (hours: number) =>
  new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

export const merchantWallet = "7x8V...kL2p";

export const seedInvoices: Invoice[] = [
  {
    id: "INV-1048",
    customer: "Acme DAO",
    amount: 249,
    asset: "USDC",
    network: "Solana Devnet",
    memo: "Design sprint deposit",
    wallet: merchantWallet,
    status: "paid",
    createdAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(),
    expiresAt: plusHours(15),
    txHash: "5mK9f3cE9aP4uYvTqR7mL8nJ2sB1zD6wX0hQ",
  },
  {
    id: "INV-1049",
    customer: "Pixel Guild",
    amount: 89,
    asset: "USDC",
    network: "Base Sepolia",
    memo: "NFT membership access",
    wallet: "0x72f...e190",
    status: "pending",
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: plusHours(22),
  },
  {
    id: "INV-1050",
    customer: "Orbit Labs",
    amount: 0.8,
    asset: "SOL",
    network: "Solana Devnet",
    memo: "API pilot",
    wallet: merchantWallet,
    status: "pending",
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    expiresAt: plusHours(23),
  },
];

export const seedWebhooks: WebhookEvent[] = [
  {
    id: "WH-7201",
    invoiceId: "INV-1048",
    event: "invoice.created",
    status: "pending",
    delivered: true,
    createdAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "WH-7202",
    invoiceId: "INV-1048",
    event: "invoice.paid",
    status: "paid",
    delivered: true,
    createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
  },
];
