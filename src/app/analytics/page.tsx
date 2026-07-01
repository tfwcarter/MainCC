"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { RevenueAreaChart, ChannelBarChart } from "@/components/charts/Charts";
import { REVENUE_TREND, CHANNEL_PERFORMANCE, AI_SUGGESTIONS } from "@/lib/data";

const REPORTS = [
  { period: "Daily", title: "Daily Brief — June 28", summary: "Revenue +12% vs avg. 8 jobs completed, 0 no-shows. LSA capped 4th day this week.", time: "Generated 6:00am" },
  { period: "Weekly", title: "Week 26 Review", summary: "Best soft-wash week of the year. Crew C utilization low at 71% — fill Thu/Fri.", time: "Mon 7:00am" },
  { period: "Monthly", title: "June Performance", summary: "$312k revenue, 31% margin. Referrals up 22%. Recommend scaling LSA + HOA outreach.", time: "Jul 1, 7:00am" },
];

const impactTone = { high: "success", medium: "warning", low: "neutral" } as const;

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="AI Analytics"
        subtitle="Every night Insight analyzes the whole business and ranks what to do next"
      >
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10">
          <Icon name="FileDown" size={16} /> Export report
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue & Profit Trend" icon={<Icon name="LineChart" size={18} />} />
          <div className="px-3 pb-4"><RevenueAreaChart data={REVENUE_TREND} /></div>
        </Card>
        <Card>
          <CardHeader title="Revenue by Channel" icon={<Icon name="BarChart3" size={18} />} />
          <div className="px-3 pb-4"><ChannelBarChart data={CHANNEL_PERFORMANCE} /></div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Auto-Generated Reports" subtitle="Daily → Yearly" icon={<Icon name="FileText" size={18} />} />
          <div className="space-y-2 p-3 pt-0">
            {REPORTS.map((r) => (
              <div key={r.title} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center gap-2">
                  <Badge tone="brand">{r.period}</Badge>
                  <span className="text-sm font-semibold text-white">{r.title}</span>
                  <span className="ml-auto text-[11px] text-white/35">{r.time}</span>
                </div>
                <p className="mt-1.5 text-xs text-white/60">{r.summary}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Ranked Recommendations" subtitle="Impact × effort" icon={<Icon name="Sparkles" size={18} />} />
          <div className="space-y-2 p-3 pt-0">
            {AI_SUGGESTIONS.map((s) => (
              <div key={s.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <Icon name="ArrowUpRight" size={15} className="mt-0.5 text-emerald-300" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{s.title}</span>
                    <Badge tone={impactTone[s.impact]}>{s.impact}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-white/55">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
