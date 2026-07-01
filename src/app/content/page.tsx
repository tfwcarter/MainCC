"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

const FORMATS = [
  { icon: "Facebook", label: "Facebook Post", color: "#38bdf8" },
  { icon: "Instagram", label: "Instagram Reel", color: "#f472b6" },
  { icon: "Music2", label: "TikTok", color: "#2dd4bf" },
  { icon: "Youtube", label: "YouTube Short", color: "#f87171" },
  { icon: "Mail", label: "Email Campaign", color: "#818cf8" },
  { icon: "MessageSquare", label: "SMS Blast", color: "#34d399" },
  { icon: "FileText", label: "SEO Blog", color: "#fbbf24" },
  { icon: "Image", label: "Flyer / Postcard", color: "#a78bfa" },
];

const QUEUE = [
  { type: "Instagram Reel", title: "Soft wash before/after — Ramirez siding", status: "Ready", agent: "Reel", when: "Today 4:00pm" },
  { type: "Facebook Post", title: "5 signs your gutters need cleaning before fall", status: "Scheduled", agent: "Vibe", when: "Tomorrow 9:00am" },
  { type: "Email", title: "June recap + summer pressure washing offer", status: "Draft", agent: "Inbox", when: "Pending approval" },
  { type: "TikTok", title: "Satisfying roof moss removal POV", status: "Rendering", agent: "Reel", when: "~12 min" },
  { type: "SEO Blog", title: "How much does window cleaning cost in Castle Rock?", status: "Ready", agent: "Sage", when: "Today 2:00pm" },
];

const statusTone: Record<string, "success" | "brand" | "warning" | "violet"> = {
  Ready: "success", Scheduled: "brand", Draft: "warning", Rendering: "violet",
};

export default function ContentPage() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState(FORMATS[1].label);

  return (
    <div>
      <PageHeader
        title="Content Studio"
        subtitle="Vibe, Reel, Pixel, Inbox & Sage generate on-brand content, video, and graphics on autopilot"
      />

      <Card strong className="mb-4 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Icon name="Sparkles" size={16} className="text-sky-300" /> Generate new content
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want — e.g. 'Promote our $99 first-time window cleaning special for July'"
          className="mt-3 h-20 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/35 focus:border-sky-400/40 focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.label}
              onClick={() => setSelected(f.label)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                selected === f.label ? "border-sky-400/40 bg-sky-400/10 text-white" : "border-white/10 bg-white/5 text-white/55 hover:text-white"
              }`}
            >
              <Icon name={f.icon} size={14} style={{ color: f.color }} /> {f.label}
            </button>
          ))}
        </div>
        <button className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90">
          <Icon name="Wand2" size={16} /> Generate {selected}
        </button>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Content Queue" subtitle="Scheduled & in production" icon={<Icon name="CalendarRange" size={18} />} />
          <div className="divide-y divide-white/5">
            {QUEUE.map((q, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-sky-300">
                  <Icon name="FileText" size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">{q.title}</div>
                  <div className="text-xs text-white/45">{q.type} · by {q.agent}</div>
                </div>
                <div className="text-right">
                  <Badge tone={statusTone[q.status]}>{q.status}</Badge>
                  <div className="mt-1 text-[11px] text-white/40">{q.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="This Week's Output" subtitle="Across channels" icon={<Icon name="BarChart3" size={18} />} />
          <div className="space-y-3 px-1">
            {[
              { l: "Social posts", v: 18, max: 20, c: "#38bdf8" },
              { l: "Reels / videos", v: 7, max: 10, c: "#f472b6" },
              { l: "Emails sent", v: 3, max: 4, c: "#818cf8" },
              { l: "Blog articles", v: 2, max: 3, c: "#fbbf24" },
              { l: "Graphics", v: 12, max: 12, c: "#34d399" },
            ].map((r) => (
              <div key={r.l}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-white/65">{r.l}</span>
                  <span className="text-white/45">{r.v}/{r.max}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${(r.v / r.max) * 100}%`, background: r.c }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
