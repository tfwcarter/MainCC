"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { CAMPAIGNS } from "@/lib/data";
import { currency, number } from "@/lib/format";

const statusTone = { active: "success", paused: "neutral", draft: "warning", review: "violet" } as const;

export default function AdvertisingPage() {
  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spend, 0);
  const totalRevenue = CAMPAIGNS.reduce((s, c) => s + c.revenue, 0);
  const totalLeads = CAMPAIGNS.reduce((s, c) => s + c.leads, 0);
  const roas = (totalRevenue / totalSpend).toFixed(1);

  return (
    <div>
      <PageHeader
        title="Advertising Center"
        subtitle="Blaze manages every campaign — but needs your approval for launches and big budget moves"
      >
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90">
          <Icon name="Plus" size={16} /> New Campaign
        </button>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Total Spend", v: currency(totalSpend, true), i: "Wallet", t: "#f87171" },
          { l: "Attributed Revenue", v: currency(totalRevenue, true), i: "TrendingUp", t: "#34d399" },
          { l: "Blended ROAS", v: `${roas}x`, i: "Target", t: "#38bdf8" },
          { l: "Leads Generated", v: number(totalLeads), i: "Users", t: "#818cf8" },
        ].map((s) => (
          <Card key={s.l} className="flex items-center gap-3 p-3.5" hover>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${s.t}1a`, color: s.t }}>
              <Icon name={s.i} size={18} />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{s.v}</div>
              <div className="text-[11px] text-white/45">{s.l}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-4 border-amber-400/20 bg-gradient-to-r from-amber-400/10 to-transparent p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
            <Icon name="AlertCircle" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white">2 campaigns awaiting your approval</h3>
            <p className="text-xs text-white/55">Blaze drafted a Christmas Lights early-bird campaign and wants to scale the TikTok test (+$700). Review before launch.</p>
          </div>
          <button className="rounded-lg bg-amber-400/20 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-400/30">Review now</button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Campaigns" subtitle="All platforms" icon={<Icon name="Megaphone" size={18} />} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wide text-white/40">
                <th className="px-4 py-2 font-medium">Campaign</th>
                <th className="px-4 py-2 font-medium">Platform</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Spend / Budget</th>
                <th className="px-4 py-2 font-medium">Leads</th>
                <th className="px-4 py-2 font-medium">Revenue</th>
                <th className="px-4 py-2 font-medium">ROAS</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {CAMPAIGNS.map((c) => {
                const cr = c.spend > 0 ? (c.revenue / c.spend).toFixed(1) : "—";
                const pct = Math.min(100, (c.spend / c.budget) * 100);
                return (
                  <tr key={c.id} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                    <td className="px-4 py-3 text-white/60">{c.platform}</td>
                    <td className="px-4 py-3"><Badge tone={statusTone[c.status]}>{c.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="text-white/70">{currency(c.spend, true)} / {currency(c.budget, true)}</div>
                      <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/70">{c.leads}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-300">{currency(c.revenue, true)}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${cr !== "—" && Number(cr) >= 3 ? "text-emerald-300" : cr !== "—" && Number(cr) >= 2 ? "text-amber-300" : "text-white/60"}`}>
                        {cr === "—" ? "—" : `${cr}x`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-white/60 hover:bg-white/10">Manage</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: "Lightbulb", title: "Creative Studio", desc: "AI-generated headlines, descriptions, and ad images per platform.", color: "#fbbf24" },
          { icon: "Crosshair", title: "Audience Research", desc: "Lookalikes, keywords, and competitor targeting built automatically.", color: "#f472b6" },
          { icon: "FlaskConical", title: "A/B Test Plans", desc: "Blaze designs experiments and promotes winners on a schedule.", color: "#2dd4bf" },
        ].map((f) => (
          <Card key={f.title} hover className="p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${f.color}1a`, color: f.color }}>
              <Icon name={f.icon} size={18} />
            </div>
            <h3 className="mt-3 text-sm font-bold text-white">{f.title}</h3>
            <p className="mt-1 text-xs text-white/55">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
