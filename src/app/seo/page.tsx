"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

const KEYWORDS = [
  { kw: "window cleaning castle rock", pos: 2, vol: 880, change: 3 },
  { kw: "pressure washing parker co", pos: 1, vol: 720, change: 1 },
  { kw: "soft wash near me", pos: 5, vol: 1600, change: 4 },
  { kw: "gutter cleaning highlands ranch", pos: 3, vol: 390, change: -1 },
  { kw: "roof cleaning denver", pos: 8, vol: 2100, change: 6 },
  { kw: "christmas light installation", pos: 4, vol: 1300, change: 2 },
];

const TASKS = [
  { icon: "FileText", title: "Publish 12 service-area pages", impact: "High", desc: "Capture 'near me' searches across all target cities." },
  { icon: "Link2", title: "Build 8 local citations", impact: "Medium", desc: "NAP consistency on Yelp, BBB, Angi, Nextdoor." },
  { icon: "Code2", title: "Add LocalBusiness + Service schema", impact: "High", desc: "Rich results for ratings, hours, and service areas." },
  { icon: "Image", title: "Compress 14 hero images", impact: "Medium", desc: "Improve LCP from 2.8s to <1.5s on mobile." },
  { icon: "MapPin", title: "Optimize Google Business Profile", impact: "High", desc: "Weekly posts, 24 new photos, Q&A seeding." },
];

export default function SeoPage() {
  return (
    <div>
      <PageHeader
        title="SEO Center"
        subtitle="Sage drives organic rankings, local visibility, and technical health — and writes the content too"
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Avg Position", v: "3.8", i: "TrendingUp", t: "#34d399" },
          { l: "Keywords Top 10", v: "42", i: "Search", t: "#38bdf8" },
          { l: "Organic Traffic", v: "+34%", i: "Users", t: "#818cf8" },
          { l: "Domain Health", v: "92/100", i: "ShieldCheck", t: "#2dd4bf" },
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
        <Card className="lg:col-span-2">
          <CardHeader title="Keyword Rankings" subtitle="Tracked locally" icon={<Icon name="Search" size={18} />} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wide text-white/40">
                  <th className="px-4 py-2 font-medium">Keyword</th>
                  <th className="px-4 py-2 font-medium">Position</th>
                  <th className="px-4 py-2 font-medium">Volume</th>
                  <th className="px-4 py-2 font-medium">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {KEYWORDS.map((k) => (
                  <tr key={k.kw} className="hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-medium text-white">{k.kw}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${k.pos <= 3 ? "text-emerald-300" : k.pos <= 10 ? "text-amber-300" : "text-white/60"}`}>#{k.pos}</span>
                    </td>
                    <td className="px-4 py-3 text-white/60">{k.vol.toLocaleString()}/mo</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-xs font-semibold ${k.change >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                        <Icon name={k.change >= 0 ? "ArrowUp" : "ArrowDown"} size={12} /> {Math.abs(k.change)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Sage's Action Plan" subtitle="Ranked by impact" icon={<Icon name="ListTodo" size={18} />} />
          <div className="space-y-2 p-3 pt-0">
            {TASKS.map((t) => (
              <div key={t.title} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center gap-2">
                  <Icon name={t.icon} size={15} className="text-sky-300" />
                  <span className="flex-1 text-sm font-semibold text-white">{t.title}</span>
                  <Badge tone={t.impact === "High" ? "success" : "warning"}>{t.impact}</Badge>
                </div>
                <p className="mt-1 text-xs text-white/55">{t.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
