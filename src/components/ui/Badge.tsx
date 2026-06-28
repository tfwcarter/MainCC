import { ReactNode } from "react";

type Tone = "brand" | "success" | "warning" | "danger" | "neutral" | "violet";

const tones: Record<Tone, string> = {
  brand: "bg-sky-400/10 text-sky-300 border-sky-400/20",
  success: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  warning: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  danger: "bg-rose-400/10 text-rose-300 border-rose-400/20",
  neutral: "bg-white/5 text-white/60 border-white/10",
  violet: "bg-violet-400/10 text-violet-300 border-violet-400/20",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
