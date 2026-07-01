"use client";

import { useState } from "react";
import { Icon } from "./ui/Icon";
import { KPIS } from "@/lib/data";
import { currency } from "@/lib/format";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white lg:hidden"
        aria-label="Open menu"
      >
        <Icon name="Menu" size={20} />
      </button>

      <div className="relative hidden flex-1 max-w-md md:block">
        <Icon
          name="Search"
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask the AI or search customers, jobs, leads…"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-sky-400/40 focus:outline-none focus:ring-2 focus:ring-sky-400/10"
        />
      </div>

      <div className="flex-1 md:hidden" />

      <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 sm:flex">
        <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-xs font-medium text-emerald-200">
          Live today: {currency(KPIS.liveRevenue, true)}
        </span>
      </div>

      <button className="relative rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white">
        <Icon name="Bell" size={19} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-400" />
      </button>

      <button className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white">
        <Icon name="Plus" size={19} />
      </button>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-sm font-bold text-white">
        T
      </div>
    </header>
  );
}
