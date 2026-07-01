"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { AUTOMATIONS } from "@/lib/data";
import { number } from "@/lib/format";

export default function AutomationsPage() {
  const [items, setItems] = useState(AUTOMATIONS);
  const toggle = (id: string) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  const activeCount = items.filter((a) => a.active).length;
  const totalRuns = items.reduce((s, a) => s + a.runs, 0);

  return (
    <div>
      <PageHeader
        title="Automations"
        subtitle="Flux builds and runs workflows across every module — drag-and-drop logic, fully visual"
      >
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90">
          <Icon name="Plus" size={16} /> New Workflow
        </button>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Active Workflows", v: String(activeCount), i: "Workflow", t: "#2dd4bf" },
          { l: "Total Runs", v: number(totalRuns, true), i: "Repeat", t: "#38bdf8" },
          { l: "Hours Saved / mo", v: "186", i: "Clock", t: "#818cf8" },
          { l: "Success Rate", v: "99.2%", i: "CheckCheck", t: "#34d399" },
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

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((a) => (
          <Card key={a.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.active ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-white/40"}`}>
                  <Icon name="Workflow" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{a.name}</h3>
                  <Badge tone="neutral" className="mt-0.5">{a.category}</Badge>
                </div>
              </div>
              <button
                onClick={() => toggle(a.id)}
                className={`relative h-6 w-11 rounded-full transition ${a.active ? "bg-emerald-400" : "bg-white/15"}`}
                aria-label="Toggle automation"
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${a.active ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-xs">
              <Icon name="Zap" size={13} className="text-amber-300" />
              <span className="text-white/45">When:</span>
              <span className="font-medium text-white/80">{a.trigger}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {a.steps.map((step, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">{step}</span>
                  {i < a.steps.length - 1 && <Icon name="ChevronRight" size={12} className="text-white/30" />}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
              <span>{number(a.runs)} runs all-time</span>
              <button className="text-sky-300 hover:text-sky-200">Edit workflow →</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
