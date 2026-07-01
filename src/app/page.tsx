"use client";

import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { HealthScore } from "@/components/HealthScore";
import {
  RevenueAreaChart,
  LeadSourceDonut,
  ChannelBarChart,
} from "@/components/charts/Charts";
import {
  KPIS,
  REVENUE_TREND,
  LEAD_SOURCES,
  CHANNEL_PERFORMANCE,
  AI_SUGGESTIONS,
  ACTIVITY_FEED,
} from "@/lib/data";
import { AGENTS } from "@/lib/agents";
import { currency, number, percent } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";

const impactTone = { high: "success", medium: "warning", low: "neutral" } as const;

export default function Dashboard() {
  const stats = [
    { label: "Revenue (MTD)", value: currency(KPIS.monthRevenue, true), delta: "+18.4%", icon: "DollarSign", tint: "#34d399", live: true },
    { label: "Net Profit", value: currency(KPIS.profit, true), delta: `+${KPIS.profitMargin}% margin`, icon: "TrendingUp", tint: "#38bdf8" },
    { label: "Booked Jobs", value: String(KPIS.bookedJobs), delta: "+9", icon: "CalendarCheck", tint: "#818cf8" },
    { label: "Open Quotes", value: `${KPIS.openQuotes}`, delta: currency(KPIS.openQuotesValue, true), icon: "FileText", tint: "#fbbf24" },
    { label: "ROAS", value: `${KPIS.roas}x`, delta: "+0.4x", icon: "Target", tint: "#f472b6" },
    { label: "Marketing Spend", value: currency(KPIS.marketingSpend, true), delta: "on budget", icon: "Megaphone", tint: "#f87171" },
    { label: "Site Visitors", value: number(KPIS.websiteVisitors, true), delta: `+${percent(KPIS.conversionRate)} CVR`, icon: "MousePointerClick", tint: "#2dd4bf" },
    { label: "Avg Rating", value: `${KPIS.avgRating}★`, delta: `${KPIS.reviews} reviews`, icon: "Star", tint: "#fbbf24" },
  ];

  const microStats = [
    { label: "Pending Jobs", value: KPIS.pendingJobs, icon: "Clock" },
    { label: "Employees", value: KPIS.employees, icon: "Users" },
    { label: "Active Routes", value: KPIS.activeRoutes, icon: "Route" },
    { label: "Calls Today", value: KPIS.phoneCalls, icon: "Phone" },
    { label: "Texts", value: KPIS.texts, icon: "MessageSquare" },
    { label: "Emails", value: number(KPIS.emails, true), icon: "Mail" },
  ];

  return (
    <div>
      <PageHeader
        title="Command Center"
        subtitle="Saturday, June 28 · 24 AI agents are running your business right now"
      >
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10">
          <Icon name="Sparkles" size={16} className="text-sky-300" />
          Ask Atlas
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90">
          <Icon name="Plus" size={16} />
          New Job
        </button>
      </PageHeader>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} index={i} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue & Profit"
            subtitle="Last 6 months"
            icon={<Icon name="LineChart" size={18} />}
            action={
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-white/60">
                  <span className="h-2 w-2 rounded-full bg-sky-400" /> Revenue
                </span>
                <span className="flex items-center gap-1.5 text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Profit
                </span>
              </div>
            }
          />
          <div className="px-3 pb-4">
            <RevenueAreaChart data={REVENUE_TREND} />
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center p-5">
          <CardHeader title="Business Health" subtitle="AI composite score" icon={<Icon name="Activity" size={18} />} />
          <HealthScore score={KPIS.healthScore} />
          <div className="mt-4 grid w-full grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white/5 p-2">
              <div className="text-sm font-bold text-emerald-300">Strong</div>
              <div className="text-[11px] text-white/50">Cash flow</div>
            </div>
            <div className="rounded-xl bg-white/5 p-2">
              <div className="text-sm font-bold text-amber-300">Watch</div>
              <div className="text-[11px] text-white/50">Crew capacity</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Micro stats */}
      <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
        {microStats.map((m) => (
          <Card key={m.label} className="flex items-center gap-3 p-3" hover>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60">
              <Icon name={m.icon} size={16} />
            </div>
            <div>
              <div className="text-base font-bold text-white">{m.value}</div>
              <div className="text-[11px] text-white/45">{m.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI suggestions + activity */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="AI Recommendations"
            subtitle="Ranked by impact — approve to deploy"
            icon={<Icon name="Sparkles" size={18} />}
            action={<Badge tone="brand">{AI_SUGGESTIONS.length} pending</Badge>}
          />
          <div className="space-y-2 p-3 pt-0">
            {AI_SUGGESTIONS.map((s) => (
              <div
                key={s.id}
                className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-sky-400/20 hover:bg-white/[0.06]"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400/20 to-indigo-500/10 text-sky-300">
                  <Icon name="Lightbulb" size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{s.title}</span>
                    <Badge tone={impactTone[s.impact]}>{s.impact} impact</Badge>
                    <Badge tone="neutral">{s.effort} effort</Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{s.detail}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-white/40">by {s.agent}</span>
                    <button className="ml-auto rounded-lg bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-400/25">
                      Approve
                    </button>
                    <button className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60 hover:bg-white/10">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Agent Activity"
            subtitle="Live feed"
            icon={<Icon name="Radio" size={18} />}
            action={<span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />}
          />
          <div className="space-y-3 p-4 pt-1">
            {ACTIVITY_FEED.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  <div className="mt-1 w-px flex-1 bg-white/10" />
                </div>
                <div className="pb-1">
                  <p className="text-xs leading-snug text-white/75">
                    <span className="font-semibold text-white">{a.agent}</span> {a.action}
                  </p>
                  <span className="text-[10px] text-white/35">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Lead sources + channel performance */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Lead Sources" subtitle="Share of new leads" icon={<Icon name="PieChart" size={18} />} />
          <div className="flex items-center gap-4 px-4 pb-5">
            <div className="flex-1">
              <LeadSourceDonut data={LEAD_SOURCES} />
            </div>
            <div className="space-y-2">
              {LEAD_SOURCES.map((l) => (
                <div key={l.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                  <span className="text-white/70">{l.name}</span>
                  <span className="ml-auto font-semibold text-white">{l.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Revenue by Channel" subtitle="Attributed revenue" icon={<Icon name="BarChart3" size={18} />} />
          <div className="px-3 pb-4">
            <ChannelBarChart data={CHANNEL_PERFORMANCE} />
          </div>
        </Card>
      </div>

      {/* Agent strip */}
      <Card className="mt-4">
        <CardHeader
          title="AI Workforce"
          subtitle="Your always-on team"
          icon={<Icon name="Bot" size={18} />}
          action={
            <a href="/agents" className="text-xs font-medium text-sky-300 hover:text-sky-200">
              View all →
            </a>
          }
        />
        <div className="flex gap-2 overflow-x-auto p-4 pt-0">
          {AGENTS.slice(0, 12).map((a) => (
            <div
              key={a.id}
              className="flex min-w-[140px] shrink-0 items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-2.5"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: `${a.color}1a`, color: a.color }}
              >
                <Icon name={a.icon} size={15} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-white">{a.name}</div>
                <div className="truncate text-[10px] text-white/45">{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
