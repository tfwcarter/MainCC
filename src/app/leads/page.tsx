"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { LEADS, OPPORTUNITIES } from "@/lib/data";
import { getService } from "@/lib/services";
import { currency } from "@/lib/format";
import type { LeadStage } from "@/lib/types";

const STAGES: { id: LeadStage; label: string; tint: string }[] = [
  { id: "new", label: "New", tint: "#38bdf8" },
  { id: "contacted", label: "Contacted", tint: "#818cf8" },
  { id: "estimate-sent", label: "Estimate Sent", tint: "#fbbf24" },
  { id: "negotiating", label: "Negotiating", tint: "#fb923c" },
  { id: "won", label: "Won", tint: "#34d399" },
  { id: "lost", label: "Lost", tint: "#f87171" },
];

const costTone = { free: "success", low: "brand", medium: "warning", high: "danger" } as const;

export default function LeadsPage() {
  const [tab, setTab] = useState<"pipeline" | "opportunities">("pipeline");
  const pipelineValue = LEADS.filter((l) => l.stage !== "lost").reduce((s, l) => s + l.value, 0);

  return (
    <div>
      <PageHeader
        title="Lead Generation"
        subtitle="Your sales pipeline plus AI-discovered opportunities, ranked by ROI"
      >
        <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
          {(["pipeline", "opportunities"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                tab === t ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white" : "text-white/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </PageHeader>

      {tab === "pipeline" ? (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { l: "Open Leads", v: String(LEADS.filter((l) => !["won", "lost"].includes(l.stage)).length), i: "Inbox", t: "#38bdf8" },
              { l: "Pipeline Value", v: currency(pipelineValue, true), i: "DollarSign", t: "#34d399" },
              { l: "Avg Lead Score", v: String(Math.round(LEADS.reduce((s, l) => s + l.score, 0) / LEADS.length)), i: "Gauge", t: "#818cf8" },
              { l: "Win Rate", v: "62%", i: "Trophy", t: "#fbbf24" },
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

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {STAGES.map((stage) => {
              const items = LEADS.filter((l) => l.stage === stage.id);
              return (
                <div key={stage.id} className="glass rounded-2xl p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: stage.tint }} />
                      <span className="text-sm font-semibold text-white">{stage.label}</span>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 text-[11px] text-white/60">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((l) => (
                      <div key={l.id} className="rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-sky-400/20">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-semibold text-white">{l.name}</span>
                          <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: l.score > 80 ? "#34d399" : l.score > 60 ? "#fbbf24" : "#f87171" }}>
                            <Icon name="Flame" size={11} /> {l.score}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/50">{getService(l.service).label}</p>
                        {l.notes && <p className="mt-1.5 text-[11px] italic text-white/40">“{l.notes}”</p>}
                        <div className="mt-2 flex items-center justify-between">
                          <Badge tone="neutral">{l.source}</Badge>
                          <span className="text-xs font-semibold text-emerald-300">{currency(l.value)}</span>
                        </div>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-[11px] text-white/30">
                        No leads
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <Card className="mb-4 border-sky-400/20 bg-gradient-to-r from-sky-400/10 to-indigo-500/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                <Icon name="Magnet" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Prospect found {OPPORTUNITIES.length} new opportunities</h3>
                <p className="text-xs text-white/55">Continuously scanning directories, partnerships, SEO gaps, and local data — ranked by expected ROI.</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {[...OPPORTUNITIES].sort((a, b) => b.expectedRoi - a.expectedRoi).map((o) => (
              <Card key={o.id} hover className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{o.title}</h3>
                    <Badge tone="violet" className="mt-1">{o.channel}</Badge>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xl font-bold text-emerald-300">{o.expectedRoi}x</div>
                    <div className="text-[10px] text-white/40">est. ROI</div>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{o.description}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/5 p-2">
                    <div className="text-sm font-bold text-white">{o.estimatedLeads}</div>
                    <div className="text-[10px] text-white/40">leads</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <div className="text-sm font-bold text-white">{"●".repeat(o.difficulty)}<span className="text-white/20">{"●".repeat(5 - o.difficulty)}</span></div>
                    <div className="text-[10px] text-white/40">difficulty</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <div className="text-sm font-bold text-white">{o.timeRequired}</div>
                    <div className="text-[10px] text-white/40">time</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <Badge tone={costTone[o.cost]}>{o.cost} cost</Badge>
                    <Badge tone="neutral">comp {o.competition}/5</Badge>
                  </div>
                  <button className="rounded-lg bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90">
                    Launch plan
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
