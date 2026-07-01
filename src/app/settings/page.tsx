"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SERVICE_CATALOG } from "@/lib/services";
import { useBusiness } from "@/lib/store";
import { currency } from "@/lib/format";

const INTEGRATIONS = [
  { name: "Stripe", icon: "CreditCard", connected: true, color: "#818cf8" },
  { name: "QuickBooks", icon: "Calculator", connected: true, color: "#34d399" },
  { name: "Twilio", icon: "MessageSquare", connected: true, color: "#f87171" },
  { name: "Google Ads", icon: "Target", connected: true, color: "#38bdf8" },
  { name: "Meta Business", icon: "Facebook", connected: true, color: "#60a5fa" },
  { name: "Gmail", icon: "Mail", connected: true, color: "#fbbf24" },
  { name: "Slack", icon: "Hash", connected: false, color: "#a78bfa" },
  { name: "Zapier", icon: "Zap", connected: false, color: "#fb923c" },
];

export default function SettingsPage() {
  const { companyName, setCompanyName, selectedServices, toggleService } = useBusiness();
  const activeServices = SERVICE_CATALOG.filter((s) => selectedServices.includes(s.id));
  const avgTicket =
    activeServices.length > 0
      ? Math.round(activeServices.reduce((s, a) => s + a.avgTicket, 0) / activeServices.length)
      : 0;

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure your business — the entire platform and every AI agent adapts to your services"
      />

      <Card className="mb-4 p-5">
        <CardHeader title="Company" icon={<Icon name="Building2" size={18} />} />
        <div className="grid gap-4 px-1 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/55">Company name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-sky-400/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/55">Primary market</label>
            <input
              defaultValue="Castle Rock, CO + South Denver Metro"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-sky-400/40 focus:outline-none"
            />
          </div>
        </div>
      </Card>

      <Card className="mb-4">
        <CardHeader
          title="Services Offered"
          subtitle="Select your services — dashboards, quotes, content & SEO adapt automatically"
          icon={<Icon name="LayoutGrid" size={18} />}
          action={<Badge tone="brand">{selectedServices.length} active · avg ticket {currency(avgTicket)}</Badge>}
        />
        <div className="grid grid-cols-2 gap-2.5 p-4 pt-0 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICE_CATALOG.map((s) => {
            const on = selectedServices.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggleService(s.id)}
                className={`group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition ${
                  on
                    ? "border-sky-400/40 bg-gradient-to-br from-sky-400/15 to-indigo-500/5"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${on ? "bg-sky-400/20 text-sky-300" : "bg-white/5 text-white/40"}`}>
                  <Icon name={s.icon} size={17} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{s.label}</div>
                  <div className="text-[10px] text-white/40">{currency(s.avgTicket)} avg</div>
                </div>
                {on && (
                  <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[#07090f]">
                    <Icon name="Check" size={11} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="mb-4">
        <CardHeader title="Integrations" subtitle="Official APIs · approval required for outbound actions" icon={<Icon name="Plug" size={18} />} />
        <div className="grid grid-cols-2 gap-2.5 p-4 pt-0 sm:grid-cols-4">
          {INTEGRATIONS.map((i) => (
            <div key={i.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${i.color}1a`, color: i.color }}>
                <Icon name={i.icon} size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold text-white">{i.name}</div>
                <div className={`text-[10px] ${i.connected ? "text-emerald-300" : "text-white/40"}`}>
                  {i.connected ? "Connected" : "Not connected"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-5">
          <CardHeader title="Security" icon={<Icon name="ShieldCheck" size={18} />} />
          <div className="space-y-2.5 px-1 text-sm">
            {[
              { l: "Two-factor authentication", on: true },
              { l: "Role-based permissions", on: true },
              { l: "Encrypted data at rest", on: true },
              { l: "Audit logging", on: true },
              { l: "Automatic daily backups", on: true },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-white/70">{r.l}</span>
                <Badge tone="success"><Icon name="Check" size={11} /> Enabled</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="AI Autonomy" subtitle="What agents can do without you" icon={<Icon name="Bot" size={18} />} />
          <div className="space-y-2.5 px-1 text-sm">
            {[
              { l: "Auto-respond to customers", on: true },
              { l: "Auto-publish scheduled content", on: true },
              { l: "Auto-optimize within budget", on: true },
              { l: "Require approval for ad launches", on: true },
              { l: "Require approval for budget +20%", on: true },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-white/70">{r.l}</span>
                <span className={`relative h-5 w-9 rounded-full ${r.on ? "bg-emerald-400" : "bg-white/15"}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${r.on ? "left-[18px]" : "left-0.5"}`} />
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
