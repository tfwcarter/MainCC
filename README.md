# SqueegeeSeal Hub — AI Home Service Business OS

The AI-powered operating system that runs an entire home service company. A
production-grade web application with a glassmorphism dark UI, a master command
center, 24 specialized AI agents, a full CRM, lead generation, advertising,
content, scheduling, finance, reviews, and visual automations — all of which
**adapt automatically to the services a business offers**.

> Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4,
> Framer Motion, Recharts, and Zustand.

---

## ✨ What's implemented

| Module | Route | Highlights |
| --- | --- | --- |
| **Command Center** | `/` | Live revenue, 8 KPI cards, revenue/profit chart, business-health gauge, AI recommendations (impact × effort), live agent activity feed, lead-source donut, revenue-by-channel chart, AI workforce strip |
| **AI Workforce** | `/agents` | 24 specialized agents across 8 departments, filterable, with live status, tasks-today, and last action |
| **CRM** | `/crm` | Customer list + rich detail panel, tags, lifetime value, recent-jobs table, AI follow-up suggestions |
| **Lead Generation** | `/leads` | 6-stage pipeline with AI lead scores **+** AI-ranked opportunities (ROI, difficulty, cost, competition, est. leads) |
| **Advertising** | `/advertising` | Multi-platform campaign table with ROAS, budget pacing, approval gates for launches & big budget moves |
| **SEO Center** | `/seo` | Keyword rank tracker, domain health, and Sage's impact-ranked action plan |
| **Content Studio** | `/content` | Multi-format generator (social, reels, TikTok, email, SMS, blog, graphics), content queue, weekly output meters |
| **Scheduling & Dispatch** | `/scheduling` | Crew dispatch board (timeline), weather awareness, upcoming jobs, route/schedule optimizations |
| **Finance** | `/finance` | Revenue/profit/forecast, cash-flow projection, profit-by-service margins, invoices/payments/tax |
| **Reviews** | `/reviews` | Multi-platform monitoring, sentiment, AI-drafted replies awaiting approval |
| **Automations** | `/automations` | Toggleable visual workflows (trigger → steps), run counts, hours saved |
| **AI Analytics** | `/analytics` | Auto-generated daily/weekly/monthly reports + ranked recommendations |
| **Settings** | `/settings` | **Business-type configurator** (15 service types) — the platform adapts; integrations, security, and AI-autonomy controls |

### The adaptive core
Selecting services in **Settings** updates a persisted business profile
(`src/lib/store.ts`). Average ticket, service catalog, and service-specific UI
flow from `src/lib/services.ts`, so the same platform fits window cleaning,
HVAC, plumbing, painting, pest control, and any other home service.

---

## 🏗️ Architecture

```
src/
├─ app/                      # Next.js App Router pages (one per module)
│  ├─ layout.tsx             # Root layout → AppShell (sidebar + topbar)
│  ├─ globals.css            # Tailwind v4 theme + glassmorphism design system
│  └─ <module>/page.tsx      # Each module above
├─ components/
│  ├─ AppShell.tsx           # Responsive shell with animated mobile drawer
│  ├─ Sidebar.tsx / Topbar.tsx
│  ├─ HealthScore.tsx        # Animated SVG gauge
│  ├─ charts/Charts.tsx      # Recharts wrappers (area, donut, bar)
│  └─ ui/                    # Card, Badge, StatCard, PageHeader, Icon
└─ lib/
   ├─ types.ts               # Domain model (Customer, Lead, Job, Agent, …)
   ├─ services.ts            # 15 service definitions (adaptive catalog)
   ├─ agents.ts              # The 24-agent AI workforce
   ├─ data.ts                # Seeded, realistic business data + KPIs
   ├─ nav.ts                 # Navigation structure
   ├─ store.ts               # Zustand business-config store (persisted)
   └─ format.ts              # Currency / number / percent helpers
```

The data layer is intentionally isolated in `src/lib`. Swapping the seeded
arrays in `data.ts` for live API calls (or a database + server actions) is the
natural next step and requires **no UI changes**.

---

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

> **Note on the generating environment:** the managed remote environment used
> to author this code has an egress policy that blocks the public npm registry
> (`registry.npmjs.org` returns HTTP 403 for every package, including `react`
> and `next`). Dependencies therefore could not be installed and the build
> could not be executed there. Run `npm install` locally or in any environment
> with npm-registry access. All dependencies and versions are pinned in
> `package.json`.

---

## 🎨 Design system

- **Glassmorphism** surfaces (`.glass`, `.glass-strong`) with backdrop blur
- **Dark theme** with a multi-radial ambient gradient background
- **Framer Motion** entrance and layout animations
- **Consistent primitives**: `Card`, `Badge`, `StatCard`, `PageHeader`
- Fully **responsive** with an animated mobile navigation drawer

---

## 🗺️ Roadmap (highest-impact next)

1. **Persistence & API layer** — replace seeded data with a database
   (Postgres/Prisma) and Next.js server actions; add auth (role-based).
2. **Live agent runtime** — wire agents to the Claude API so recommendations,
   replies, and content are generated for real (with human-approval gates).
3. **Real integrations** — Stripe, QuickBooks, Twilio, Google/Meta Ads, Gmail
   via official APIs, behind the approval controls already modeled in Settings.
4. **Drag-and-drop automation builder** — promote the visual workflow cards to
   an editable canvas.
5. **Customer-facing layer** — booking, quotes, payments, and a review portal.
6. **Mobile crew app** — job check-in/out, photos, and route navigation.

The guiding principle: when a feature is complete, identify the next
highest-impact improvement and build it — prioritizing reliability, automation,
measurable growth, and platform-compliant integrations.
