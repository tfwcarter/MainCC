"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { JOBS } from "@/lib/data";
import { getService } from "@/lib/services";
import { currency } from "@/lib/format";

const HOURS = ["7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p"];

interface CrewJob {
  start: number;
  len: number;
  label: string;
  addr: string;
  open?: boolean;
}
interface Crew {
  name: string;
  color: string;
  jobs: CrewJob[];
}

const CREWS: Crew[] = [
  { name: "Crew A", color: "#38bdf8", jobs: [{ start: 2, len: 3, label: "Window — Walsh", addr: "Castle Rock" }, { start: 7, len: 2, label: "Roof — Cho", addr: "Highlands Ranch" }] },
  { name: "Crew B", color: "#34d399", jobs: [{ start: 1, len: 2, label: "Soft Wash — Ramirez", addr: "Lone Tree" }, { start: 6, len: 3, label: "Pressure — Bryant", addr: "Parker" }] },
  { name: "Crew C", color: "#818cf8", jobs: [{ start: 3, len: 2, label: "Gutters — Nguyen", addr: "Centennial" }, { start: 8, len: 1, label: "Open slot", addr: "—", open: true }] },
];

export default function SchedulingPage() {
  return (
    <div>
      <PageHeader
        title="Scheduling & Dispatch"
        subtitle="Cadence fills the calendar · Pilot dispatches · Mira optimizes routes — with weather awareness"
      >
        <div className="flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-sm">
          <Icon name="CloudSun" size={16} className="text-sky-300" />
          <span className="text-white/70">72°F · Clear · ideal for exterior work</span>
        </div>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Today's Jobs", v: "8", i: "CalendarCheck", t: "#38bdf8" },
          { l: "Crews Out", v: "3", i: "Truck", t: "#34d399" },
          { l: "Route Time Saved", v: "47m", i: "Route", t: "#818cf8" },
          { l: "Open Slots", v: "3", i: "CalendarPlus", t: "#fbbf24" },
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

      <Card className="mb-4">
        <CardHeader title="Today's Dispatch Board" subtitle="Monday, June 28" icon={<Icon name="CalendarClock" size={18} />} />
        <div className="overflow-x-auto p-4 pt-0">
          <div className="min-w-[760px]">
            <div className="mb-2 grid grid-cols-[100px_1fr] gap-2">
              <div />
              <div className="grid" style={{ gridTemplateColumns: `repeat(${HOURS.length}, 1fr)` }}>
                {HOURS.map((h) => (
                  <div key={h} className="text-center text-[11px] text-white/40">{h}</div>
                ))}
              </div>
            </div>
            {CREWS.map((crew) => (
              <div key={crew.name} className="mb-2 grid grid-cols-[100px_1fr] items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: crew.color }} />
                  <span className="text-xs font-semibold text-white">{crew.name}</span>
                </div>
                <div className="relative grid h-12 rounded-lg bg-white/[0.03]" style={{ gridTemplateColumns: `repeat(${HOURS.length}, 1fr)` }}>
                  {crew.jobs.map((j, idx) => (
                    <div
                      key={idx}
                      className={`absolute top-1 bottom-1 flex flex-col justify-center overflow-hidden rounded-md px-2 text-[10px] ${j.open ? "border border-dashed border-white/20 text-white/40" : "text-white"}`}
                      style={{
                        left: `${(j.start / HOURS.length) * 100}%`,
                        width: `${(j.len / HOURS.length) * 100}%`,
                        background: j.open ? "transparent" : `${crew.color}33`,
                        borderLeft: j.open ? undefined : `2px solid ${crew.color}`,
                      }}
                    >
                      <span className="truncate font-semibold">{j.label}</span>
                      <span className="truncate opacity-60">{j.addr}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Upcoming Jobs" icon={<Icon name="ListChecks" size={18} />} />
          <div className="divide-y divide-white/5">
            {JOBS.filter((j) => ["scheduled", "in-progress"].includes(j.status)).map((j) => (
              <div key={j.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-sky-300">
                  <Icon name={getService(j.service).icon} size={16} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{j.customer}</div>
                  <div className="text-xs text-white/45">{getService(j.service).label} · {j.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60">{j.scheduledFor.split(" ")[1]}</div>
                  <div className="text-xs font-semibold text-emerald-300">{currency(j.value)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Cadence & Mira suggest" subtitle="Schedule optimizations" icon={<Icon name="Sparkles" size={18} />} />
          <div className="space-y-2 px-1">
            {[
              { icon: "CalendarPlus", text: "Fill Thursday 2pm slot from the 18-person waitlist via SMS.", tone: "warning" as const },
              { icon: "Route", text: "Cluster Parker + Castle Rock jobs Tuesday to cut 22 drive minutes.", tone: "brand" as const },
              { icon: "CloudRain", text: "Rain forecast Friday — pre-emptively reschedule 2 exterior jobs to Saturday.", tone: "violet" as const },
              { icon: "Repeat", text: "5 recurring window customers due for re-booking this week.", tone: "success" as const },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <Icon name={s.icon} size={16} className="mt-0.5 text-sky-300" />
                <p className="flex-1 text-xs text-white/65">{s.text}</p>
                <button className="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-white/70 hover:bg-white/10">Apply</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
