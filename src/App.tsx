import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Code2,
  ExternalLink,
  FileText,
  Gauge,
  Link2,
  Plus,
  RadioTower,
  RefreshCcw,
  Send,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { merchantWallet, seedInvoices, seedWebhooks } from "./data";
import type { Invoice, InvoiceStatus, WebhookEvent } from "./types";

const currency = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const formatTime = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const statusLabel: Record<InvoiceStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  expired: "Expired",
};

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [invoices, setInvoices] = useState<Invoice[]>(seedInvoices);
  const [webhooks, setWebhooks] = useState<WebhookEvent[]>(seedWebhooks);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(seedInvoices[1].id);
  const [customer, setCustomer] = useState("New Web3 Client");
  const [amount, setAmount] = useState("125");
  const [asset, setAsset] = useState<Invoice["asset"]>("USDC");
  const [network, setNetwork] = useState<Invoice["network"]>("Solana Devnet");
  const [memo, setMemo] = useState("MVP pilot payment");

  const selectedInvoice =
    invoices.find((invoice) => invoice.id === selectedInvoiceId) ?? invoices[0];

  const totals = useMemo(() => {
    const paid = invoices.filter((invoice) => invoice.status === "paid");
    const pending = invoices.filter((invoice) => invoice.status === "pending");
    return {
      volume: paid.reduce((sum, invoice) => sum + invoice.amount, 0),
      paid: paid.length,
      pending: pending.length,
      webhooks: webhooks.length,
    };
  }, [invoices, webhooks]);

  const createWebhook = (
    invoiceId: string,
    event: WebhookEvent["event"],
    status: InvoiceStatus,
  ) => {
    setWebhooks((current) => [
      {
        id: `WH-${Math.floor(8000 + Math.random() * 999)}`,
        invoiceId,
        event,
        status,
        delivered: true,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  };

  const createInvoice = () => {
    const id = `INV-${Math.floor(1100 + Math.random() * 8999)}`;
    const nextInvoice: Invoice = {
      id,
      customer,
      amount: Number(amount) || 1,
      asset,
      network,
      memo,
      wallet: network === "Base Sepolia" ? "0x72f...e190" : merchantWallet,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    setInvoices((current) => [nextInvoice, ...current]);
    setSelectedInvoiceId(id);
    createWebhook(id, "invoice.created", "pending");
    setActiveView("payment");
  };

  const markPaid = (invoiceId: string) => {
    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              status: "paid",
              txHash: `demo-${crypto.randomUUID().slice(0, 12)}`,
            }
          : invoice,
      ),
    );
    createWebhook(invoiceId, "invoice.paid", "paid");
    setActiveView("webhooks");
  };

  return (
    <div className="app">
      <header className="shellHeader">
        <div className="brand">
          <div className="brandMark" aria-hidden="true">
            <Wallet size={20} />
          </div>
          <div>
            <strong>PayRail</strong>
            <span>stablecoin ops console</span>
          </div>
        </div>

        <nav className="nav">
          <button
            className={activeView === "dashboard" ? "active" : ""}
            onClick={() => setActiveView("dashboard")}
          >
            <Gauge size={18} />
            Dashboard
          </button>
          <button
            className={activeView === "payment" ? "active" : ""}
            onClick={() => setActiveView("payment")}
          >
            <Send size={18} />
            Payment page
          </button>
          <button
            className={activeView === "webhooks" ? "active" : ""}
            onClick={() => setActiveView("webhooks")}
          >
            <RadioTower size={18} />
            Webhooks
          </button>
          <button
            className={activeView === "grant" ? "active" : ""}
            onClick={() => setActiveView("grant")}
          >
            <FileText size={18} />
            Grant plan
          </button>
        </nav>

        <button className="primary compact" onClick={() => setActiveView("dashboard")}>
          <Plus size={18} />
          New invoice
        </button>
      </header>

      <main className="main">
        <section className="heroStrip">
          <div>
            <p className="eyebrow">Non-custodial settlement layer</p>
            <h1>Stablecoin invoices, tracked like payment operations.</h1>
            <p className="heroText">
              A grant-ready MVP for creating crypto invoices, watching chain
              payments, and delivering signed merchant webhooks.
            </p>
          </div>
          <div className="grantBadge">
            <span>Target ask</span>
            <strong>8,500 USDC</strong>
            <small>Superteam Startup Accelerator</small>
          </div>
        </section>

        {activeView === "dashboard" && (
          <section className="dashboardGrid">
            <div className="commandStack">
              <div className="statsGrid">
                <Metric
                  icon={<Activity />}
                  label="Paid volume"
                  value={`$${currency.format(totals.volume)}`}
                />
                <Metric icon={<CheckCircle2 />} label="Paid invoices" value={String(totals.paid)} />
                <Metric icon={<RefreshCcw />} label="Pending" value={String(totals.pending)} />
                <Metric icon={<Code2 />} label="Webhook events" value={String(totals.webhooks)} />
              </div>

              <section className="panel commandPanel">
                <div className="panelHeader">
                  <div>
                    <h2>Issue payment rail</h2>
                    <p>Generate a non-custodial invoice for USDC, SOL, or USDT.</p>
                  </div>
                  <span className="sectionCode">API / invoices</span>
                </div>
                <div className="formGrid">
                  <label>
                    Customer
                    <input value={customer} onChange={(event) => setCustomer(event.target.value)} />
                  </label>
                  <label>
                    Amount
                    <input value={amount} onChange={(event) => setAmount(event.target.value)} />
                  </label>
                  <label>
                    Asset
                    <select value={asset} onChange={(event) => setAsset(event.target.value as Invoice["asset"])}>
                      <option>USDC</option>
                      <option>SOL</option>
                      <option>USDT</option>
                    </select>
                  </label>
                  <label>
                    Network
                    <select
                      value={network}
                      onChange={(event) => setNetwork(event.target.value as Invoice["network"])}
                    >
                      <option>Solana Devnet</option>
                      <option>Base Sepolia</option>
                      <option>BNB Testnet</option>
                    </select>
                  </label>
                  <label className="full">
                    Memo
                    <input value={memo} onChange={(event) => setMemo(event.target.value)} />
                  </label>
                </div>
                <button className="primary wide" onClick={createInvoice}>
                  <Plus size={18} />
                  Create invoice rail
                </button>
              </section>
            </div>

            <aside className="rightRail">
              <section className="routePanel">
                <div className="routeHeader">
                  <span>Live settlement route</span>
                  <strong>Merchant wallet -&gt; watcher -&gt; webhook</strong>
                </div>
                <div className="routeMap" aria-label="payment route diagram">
                  <div>
                    <Wallet size={18} />
                    <span>Wallet</span>
                  </div>
                  <ArrowRight size={18} />
                  <div>
                    <ShieldCheck size={18} />
                    <span>Validate</span>
                  </div>
                  <ArrowRight size={18} />
                  <div>
                    <RadioTower size={18} />
                    <span>Notify</span>
                  </div>
                </div>
              </section>

              <section className="panel invoicePanel">
                <div className="panelHeader">
                  <div>
                    <h2>Invoice queue</h2>
                    <p>Payment links moving through the system.</p>
                  </div>
                </div>
                <div className="invoiceList">
                  {invoices.map((invoice) => (
                    <button
                      key={invoice.id}
                      className={`invoiceRow ${invoice.id === selectedInvoiceId ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedInvoiceId(invoice.id);
                        setActiveView("payment");
                      }}
                    >
                      <div>
                        <strong>{invoice.id}</strong>
                        <span>{invoice.customer}</span>
                      </div>
                      <div className="invoiceAmount">
                        <strong>
                          {currency.format(invoice.amount)} {invoice.asset}
                        </strong>
                        <StatusPill status={invoice.status} />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </aside>
          </section>
        )}

        {activeView === "payment" && selectedInvoice && (
          <section className="paymentLayout">
            <section className="paymentPanel">
              <div className="paymentHeader">
                <div>
                  <span className="sectionCode">{selectedInvoice.id}</span>
                  <h2>
                    {currency.format(selectedInvoice.amount)} {selectedInvoice.asset}
                  </h2>
                  <p>{selectedInvoice.memo}</p>
                </div>
                <StatusPill status={selectedInvoice.status} />
              </div>

              <div className="qrBlock">
                <div className="qrGrid" aria-label="demo QR code" />
                <div className="paymentAddress">
                  <span>Merchant wallet</span>
                  <strong>{selectedInvoice.wallet}</strong>
                </div>
              </div>

              <div className="payDetails">
                <span>Network</span>
                <strong>{selectedInvoice.network}</strong>
                <span>Expires</span>
                <strong>{formatTime(selectedInvoice.expiresAt)}</strong>
                <span>Transfer reference</span>
                <strong>{selectedInvoice.txHash ?? "waiting for chain event"}</strong>
              </div>

              <div className="buttonRow">
                <button className="secondary">
                  <Clipboard size={18} />
                  Copy address
                </button>
                <button className="primary" onClick={() => markPaid(selectedInvoice.id)}>
                  <CheckCircle2 size={18} />
                  Simulate payment
                </button>
              </div>
            </section>

            <section className="panel">
              <div className="panelHeader">
                <div>
                  <h2>Payment lifecycle</h2>
                  <p>Grant MVP scope after approval.</p>
                </div>
              </div>
              <div className="timeline">
                <Step done label="Invoice created" text="Merchant generates a shareable payment link." />
                <Step
                  done={selectedInvoice.status === "paid"}
                  label="Chain watcher"
                  text="Backend checks wallet transfers and validates amount."
                />
                <Step
                  done={selectedInvoice.status === "paid"}
                  label="Webhook delivered"
                  text="Merchant backend receives invoice.paid event."
                />
                <Step done={false} label="Production upgrade" text="Replace demo watcher with Solana/Base RPC integration." />
              </div>
            </section>
          </section>
        )}

        {activeView === "webhooks" && (
          <section className="layout single">
            <section className="panel">
              <div className="panelHeader">
                <div>
                  <h2>Webhook dispatch</h2>
                  <p>Events merchants receive from PayRail.</p>
                </div>
                <code>POST /api/webhooks/payment-status</code>
              </div>
              <div className="webhookTable">
                {webhooks.map((hook) => (
                  <div className="webhookRow" key={hook.id}>
                    <strong>{hook.event}</strong>
                    <span>{hook.invoiceId}</span>
                    <StatusPill status={hook.status} />
                    <span>{formatTime(hook.createdAt)}</span>
                    <small>{hook.delivered ? "Delivered" : "Retrying"}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="apiPanel">
              <div>
                <h2>Example event</h2>
                <p>Stable payload for merchant integrations.</p>
              </div>
              <pre>{`{
  "event": "invoice.paid",
  "invoiceId": "${selectedInvoice?.id ?? "INV-1049"}",
  "asset": "${selectedInvoice?.asset ?? "USDC"}",
  "network": "${selectedInvoice?.network ?? "Solana Devnet"}",
  "amount": ${selectedInvoice?.amount ?? 125},
  "txHash": "${selectedInvoice?.txHash ?? "pending"}"
}`}</pre>
            </section>
          </section>
        )}

        {activeView === "grant" && (
          <section className="layout single">
            <section className="panel">
              <div className="panelHeader">
                <div>
                  <h2>Grant milestones</h2>
                  <p>Scope designed for 4-5 weeks of founder/developer work.</p>
                </div>
              </div>
              <div className="milestoneGrid">
                <Milestone title="1. Prototype" amount="1,000 USDC" text="Architecture, UI flow, invoice model, mock payment lifecycle." />
                <Milestone title="2. Working MVP" amount="4,000 USDC" text="Backend API, chain watcher, dashboard, payment status, webhook delivery." />
                <Milestone title="3. Launch package" amount="3,500 USDC" text="Docs, demo deployment, testing, feedback iteration, grant report." />
              </div>
            </section>

            <section className="apiPanel">
              <div>
                <h2>Budget ask</h2>
                <p>Main cost is engineering time.</p>
              </div>
              <div className="budgetList">
                <BudgetLine label="Founder/developer compensation" value="6,000 USDC" />
                <BudgetLine label="Testing, deployment, documentation" value="1,200 USDC" />
                <BudgetLine label="Infrastructure, RPC, hosting, tools" value="600 USDC" />
                <BudgetLine label="Product feedback and iteration" value="700 USDC" />
              </div>
              <a
                className="linkButton"
                href="https://superteam.fun/earn/grants/startup-accelerator-grant"
                target="_blank"
                rel="noreferrer"
              >
                Open grant page
                <ExternalLink size={16} />
              </a>
            </section>
          </section>
        )}
      </main>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="metric">
      <div className="metricIcon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusPill({ status }: { status: InvoiceStatus }) {
  return <span className={`status ${status}`}>{statusLabel[status]}</span>;
}

function Step({ done, label, text }: { done: boolean; label: string; text: string }) {
  return (
    <div className={`step ${done ? "done" : ""}`}>
      <CheckCircle2 size={20} />
      <div>
        <strong>{label}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function Milestone({ title, amount, text }: { title: string; amount: string; text: string }) {
  return (
    <div className="milestone">
      <div>
        <strong>{title}</strong>
        <span>{amount}</span>
      </div>
      <p>{text}</p>
      <Link2 size={18} />
    </div>
  );
}

function BudgetLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="budgetLine">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
