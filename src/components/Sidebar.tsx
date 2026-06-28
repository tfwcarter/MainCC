"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { Icon } from "./ui/Icon";
import { useBusiness } from "@/lib/store";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const companyName = useBusiness((s) => s.companyName);

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/20">
          <Icon name="Waves" size={20} className="text-white" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-white">{companyName}</div>
          <div className="text-[11px] text-white/40">AI Operating System</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV.map((grp) => (
          <div key={grp.group} className="mb-5">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              {grp.group}
            </div>
            <div className="space-y-1">
              {grp.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all ${
                      active
                        ? "bg-gradient-to-r from-sky-400/15 to-indigo-500/10 text-white shadow-inner"
                        : "text-white/55 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      className={active ? "text-sky-300" : "text-white/45 group-hover:text-white/70"}
                    />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-white/10 px-1.5 text-[10px] font-semibold text-white/70">
                        {item.badge}
                      </span>
                    )}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-xl border border-white/10 bg-gradient-to-br from-emerald-400/10 to-sky-400/5 p-3">
        <div className="flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-white">All systems live</span>
        </div>
        <p className="mt-1 text-[11px] text-white/50">
          24 AI agents running autonomously
        </p>
      </div>
    </aside>
  );
}
