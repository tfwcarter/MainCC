"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { RevenueAreaChart } from "@/components/charts/Charts";
import { REVENUE_TREND, KPIS } from "@/lib/data";
import { currency, percent } from "@/lib/format";

const PROFIT_BY_SERVICE = [
  { name: "Window Cleaning", revenue: 78400, margin: 42 },
  { name: "Pressure Washing", revenue: 96200, margin: 38 },
  { name: "Soft Washing", revenue: 61800, margin: 44 },
  { name: "Roof Cleaning", revenue: 41200, margin: 35 },
  { name: "Christmas Lights", revenue: 34850, margin: 28 },
];

export default function FinancePage() {
  const expenses = KPIS.monthRevenue - KPIS.profit;
  return (
    <div>
      <PageHeader
        title="Finance"
        subtitle="Ledger reconciles daily, forecasts cash flow, and flags anything off — synced with QuickBooks & Stripe"
      >
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10">
          <Icon name="Download" size={16} /> Export
        </button>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { l: "Revenue (MTD)", v: currency(KPIS.monthRevenue, true), d: "+18.4%", i: "DollarSign", t: "#34d399" },
          { l: "Expenses", v: currency(expenses, true), d: "-2.1%", i: "Receipt", t: "#f87171" },
          { l: "Net Profit", v: currency(KPIS.profit, true), d: percent(KPIS.profitMargin), i: "TrendingUp", t: "#38bdf8" },
          { l: "Cash on Hand", v: "$214k", d: "healthy", i: "Landmark", t: "#818cf8" },
        ].map((s) => (
          <Card key={s.l} className="p-4" hover>
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${s.t}1a`, color: s.t }}>
                <Icon name={s.i} size={17} />
              </div>
              <span className="text-xs font-semibold text-emerald-300">{s.d}</span>
            </div>
            <div className="mt-3 text-xl font-bold text-white">{s.v}</div>
            <div className="text-[11px] text-white/45">{s.l}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue, Profit & Forecast" subtitle="Trailing 6 months" icon={<Icon name="LineChart" size={18} />} />
          <div className="px-3 pb-4">
            <RevenueAreaChart data={REVENUE_TREND} />
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Cash Flow Forecast" subtitle="Next 30 days" icon={<Icon name="Waypoints" size={18} />} />
          <div className="space-y-3 px-1">
            {[
              { l: "Expected inflows", v: 298000, tone: "text-emerald-300" },
              { l: "Scheduled outflows", v: -186000, tone: "text-rose-300" },
              { l: "Payroll", v: -64000, tone: "text-rose-300" },
              { l: "Projected net", v: 48000, tone: "text-sky-300" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-white/5 pb-2 text-sm">
                <span className="text-white/60">{r.l}</span>
                <span className={`font-semibold ${r.tone}`}>{currency(r.v, true)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <Icon name="ShieldCheck" size={13} /> Ledger says
            </div>
            <p className="mt-1 text-xs text-white/60">Cash position is healthy. 1 invoice ($4,200, Greenfield HOA) is 6 days overdue — auto-reminder sent.</p>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Profit by Service" subtitle="Where the margin really is" icon={<Icon name="PieChart" size={18} />} />
        <div className="space-y-3 p-4 pt-0">
          {PROFIT_BY_SERVICE.map((s) => (
            <div key={s.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-white/75">{s.name}</span>
                <span className="text-white/55">{currency(s.revenue, true)} · <span className="font-semibold text-emerald-300">{s.margin}% margin</span></span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: `${s.margin * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: "FileText", title: "Invoices", v: "27 open · $41.2k", color: "#38bdf8" },
          { icon: "CreditCard", title: "Payments", v: "$48.2k collected today", color: "#34d399" },
          { icon: "Calculator", title: "Tax Set-Aside", v: "$72k reserved (auto)", color: "#fbbf24" },
        ].map((f) => (
          <Card key={f.title} hover className="flex items-center gap-3 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${f.color}1a`, color: f.color }}>
              <Icon name={f.icon} size={19} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{f.title}</h3>
              <p className="text-xs text-white/55">{f.v}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
