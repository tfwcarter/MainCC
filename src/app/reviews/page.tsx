"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { REVIEWS, KPIS } from "@/lib/data";

const sentimentTone = { positive: "success", neutral: "warning", negative: "danger" } as const;

export default function ReviewsPage() {
  const needsReply = REVIEWS.filter((r) => !r.responded);
  return (
    <div>
      <PageHeader
        title="Review Management"
        subtitle="Halo monitors every platform, drafts replies, and requests reviews after each job"
      >
        <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm">
          <Icon name="Star" size={16} className="fill-amber-300 text-amber-300" />
          <span className="font-semibold text-amber-200">{KPIS.avgRating}</span>
          <span className="text-white/50">· {KPIS.reviews} reviews</span>
        </div>
      </PageHeader>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Average Rating", v: `${KPIS.avgRating}★`, i: "Star", t: "#fbbf24" },
          { l: "Total Reviews", v: String(KPIS.reviews), i: "MessagesSquare", t: "#38bdf8" },
          { l: "Needs Reply", v: String(needsReply.length), i: "Reply", t: "#f87171" },
          { l: "Response Rate", v: "96%", i: "CheckCheck", t: "#34d399" },
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

      <div className="grid grid-cols-1 gap-4">
        {REVIEWS.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/30 to-rose-500/20 text-sm font-bold text-white">
                {r.author[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">{r.author}</span>
                  <span className="text-amber-300">{"★".repeat(r.rating)}<span className="text-white/20">{"★".repeat(5 - r.rating)}</span></span>
                  <Badge tone="neutral">{r.platform}</Badge>
                  <Badge tone={sentimentTone[r.sentiment]}>{r.sentiment}</Badge>
                  <span className="ml-auto text-[11px] text-white/35">{r.date}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{r.text}</p>

                {r.responded ? (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300">
                    <Icon name="CheckCircle2" size={13} /> Responded
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-sky-400/20 bg-sky-400/5 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-300">
                      <Icon name="Sparkles" size={13} /> Halo drafted a reply
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/65">{r.suggestedReply}</p>
                    <div className="mt-2 flex gap-2">
                      <button className="rounded-lg bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-400/25">Approve & post</button>
                      <button className="rounded-lg bg-white/5 px-3 py-1 text-[11px] font-medium text-white/60 hover:bg-white/10">Edit</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
