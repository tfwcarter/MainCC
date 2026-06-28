"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { AGENTS } from "@/lib/agents";

const statusTone = { active: "success", working: "brand", idle: "neutral" } as const;
const departments = ["All", ...Array.from(new Set(AGENTS.map((a) => a.department)))];

export default function AgentsPage() {
  const [dept, setDept] = useState("All");
  const filtered = dept === "All" ? AGENTS : AGENTS.filter((a) => a.department === dept);
  const working = AGENTS.filter((a) => a.status !== "idle").length;
  const tasks = AGENTS.reduce((s, a) => s + a.tasksToday, 0);

  return (
    <div>
      <PageHeader
        title="AI Workforce"
        subtitle="24 specialized agents running every department — they collaborate automatically"
      >
        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm">
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-medium text-emerald-200">{working} active</span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">{tasks} tasks today</span>
        </div>
      </PageHeader>

      <div className="mb-5 flex flex-wrap gap-2">
        {departments.map((d) => (
          <button
            key={d}
            onClick={() => setDept(d)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              dept === d
                ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white"
                : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
          >
            <Card hover className="h-full p-4">
              <div className="flex items-start gap-3">
                <div
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${a.color}1a`, color: a.color }}
                >
                  <Icon name={a.icon} size={20} />
                  {a.status !== "idle" && (
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#0b0e16] bg-emerald-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-bold text-white">{a.name}</h3>
                    <Badge tone={statusTone[a.status]}>{a.status}</Badge>
                  </div>
                  <p className="text-xs text-white/55">{a.role}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/55">{a.description}</p>
              <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-white/35">
                  <Icon name="Zap" size={11} /> Last action
                </div>
                <p className="mt-1 text-xs text-white/70">{a.lastAction}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-white/40">
                  {a.tasksToday} tasks today · {a.department}
                </span>
                <button className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70 hover:bg-white/10">
                  Chat
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
