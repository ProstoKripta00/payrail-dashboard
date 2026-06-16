export type InvoiceStatus = "pending" | "paid" | "expired";

export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  asset: "USDC" | "SOL" | "USDT";
  network: "Solana Devnet" | "Base Sepolia" | "BNB Testnet";
  memo: string;
  wallet: string;
  status: InvoiceStatus;
  createdAt: string;
  expiresAt: string;
  txHash?: string;
};

export type WebhookEvent = {
  id: string;
  invoiceId: string;
  event: "invoice.created" | "invoice.paid" | "invoice.expired";
  status: InvoiceStatus;
  delivered: boolean;
  createdAt: string;
};
