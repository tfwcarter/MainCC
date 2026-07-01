"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { CUSTOMERS, JOBS } from "@/lib/data";
import { getService } from "@/lib/services";
import { currency } from "@/lib/format";

const jobTone = {
  scheduled: "brand",
  "in-progress": "warning",
  completed: "violet",
  invoiced: "neutral",
  paid: "success",
} as const;

export default function CrmPage() {
  const [selected, setSelected] = useState(CUSTOMERS[0]);
  const totalLtv = CUSTOMERS.reduce((s, c) => s + c.lifetimeValue, 0);

  return (
    <div>
      <PageHeader
        title="CRM"
        subtitle="Every customer, property, job, and conversation in one place"
      >
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90">
          <Icon name="UserPlus" size={16} /> Add Customer
        </button>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Customers", v: String(CUSTOMERS.length), i: "Users", t: "#38bdf8" },
          { l: "Lifetime Value", v: currency(totalLtv, true), i: "Gem", t: "#34d399" },
          { l: "Active Jobs", v: String(JOBS.filter((j) => j.status !== "paid").length), i: "Briefcase", t: "#818cf8" },
          { l: "Avg Satisfaction", v: "4.7★", i: "Smile", t: "#fbbf24" },
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Customer list */}
        <Card className="lg:col-span-2">
          <CardHeader title="Customers" subtitle={`${CUSTOMERS.length} contacts`} icon={<Icon name="Users" size={18} />} />
          <div className="divide-y divide-white/5">
            {CUSTOMERS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[0.04] ${
                  selected.id === c.id ? "bg-white/[0.05]" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/30 to-indigo-500/20 text-sm font-bold text-white">
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-white">{c.name}</span>
                    {c.tags.includes("VIP") && <Badge tone="warning">VIP</Badge>}
                  </div>
                  <div className="truncate text-xs text-white/45">{c.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-emerald-300">{currency(c.lifetimeValue, true)}</div>
                  <div className="text-[11px] text-white/40">{"★".repeat(c.rating)}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detail panel */}
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/30 to-indigo-500/20 text-lg font-bold text-white">
              {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{selected.name}</h3>
              <p className="text-xs text-white/50">Customer since {selected.createdAt}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {selected.tags.map((t) => (
              <Badge key={t} tone="brand">{t}</Badge>
            ))}
          </div>

          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <Icon name="Mail" size={15} className="text-white/40" /> {selected.email}
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Icon name="Phone" size={15} className="text-white/40" /> {selected.phone}
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Icon name="MapPin" size={15} className="text-white/40" /> {selected.address}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-lg font-bold text-emerald-300">{currency(selected.lifetimeValue)}</div>
              <div className="text-[11px] text-white/45">Lifetime value</div>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <div className="text-lg font-bold text-white">{selected.lastJob}</div>
              <div className="text-[11px] text-white/45">Last service</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-xs font-medium text-white/80 hover:bg-white/10">
              <Icon name="MessageSquare" size={14} /> Text
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-xs font-medium text-white/80 hover:bg-white/10">
              <Icon name="Mail" size={14} /> Email
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 py-2 text-xs font-semibold text-white">
              <Icon name="FileText" size={14} /> Quote
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-sky-400/20 bg-sky-400/5 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-300">
              <Icon name="Sparkles" size={13} /> Bond suggests
            </div>
            <p className="mt-1 text-xs text-white/60">
              {selected.lastJob} customers book again in ~90 days. Schedule a follow-up touch in 2 weeks.
            </p>
          </div>
        </Card>
      </div>

      {/* Jobs table */}
      <Card className="mt-4">
        <CardHeader title="Recent Jobs" subtitle="Across all customers" icon={<Icon name="Briefcase" size={18} />} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wide text-white/40">
                <th className="px-4 py-2 font-medium">Customer</th>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Scheduled</th>
                <th className="px-4 py-2 font-medium">Crew</th>
                <th className="px-4 py-2 font-medium">Value</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {JOBS.map((j) => (
                <tr key={j.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-medium text-white">{j.customer}</td>
                  <td className="px-4 py-3 text-white/70">{getService(j.service).label}</td>
                  <td className="px-4 py-3 text-white/60">{j.scheduledFor}</td>
                  <td className="px-4 py-3 text-white/60">{j.crew}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-300">{currency(j.value)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={jobTone[j.status]}>{j.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
