"use client";

import { motion } from "framer-motion";
import { Icon } from "./Icon";

export function StatCard({
  label,
  value,
  delta,
  icon,
  tint = "#38bdf8",
  index = 0,
  live = false,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: string;
  tint?: string;
  index?: number;
  live?: boolean;
}) {
  const positive = delta?.startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="glass card-hover relative overflow-hidden rounded-2xl p-4"
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
        style={{ background: tint }}
      />
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${tint}1a`, color: tint }}
        >
          <Icon name={icon} size={18} />
        </div>
        {live && (
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
        )}
        {delta && (
          <span
            className={`text-xs font-semibold ${
              positive ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="text-xs text-white/50">{label}</div>
      </div>
    </motion.div>
  );
}
