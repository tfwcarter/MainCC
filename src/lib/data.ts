import type {
  Customer,
  Lead,
  Job,
  LeadOpportunity,
  Campaign,
  Review,
  Automation,
  AiSuggestion,
  Activity,
} from "./types";

// ---------------------------------------------------------------------------
// Master dashboard KPIs
// ---------------------------------------------------------------------------
export const KPIS = {
  liveRevenue: 48230,
  monthRevenue: 312450,
  bookedJobs: 64,
  pendingJobs: 18,
  openQuotes: 27,
  openQuotesValue: 41200,
  employees: 11,
  activeRoutes: 5,
  profit: 96820,
  profitMargin: 31,
  marketingSpend: 14600,
  roas: 4.6,
  websiteVisitors: 8420,
  conversionRate: 6.8,
  phoneCalls: 142,
  texts: 388,
  emails: 1240,
  reviews: 312,
  avgRating: 4.9,
  healthScore: 87,
};

export const REVENUE_TREND = [
  { label: "Jan", revenue: 184000, spend: 9200, profit: 52000 },
  { label: "Feb", revenue: 201000, spend: 10100, profit: 58000 },
  { label: "Mar", revenue: 244000, spend: 12400, profit: 71000 },
  { label: "Apr", revenue: 268000, spend: 13100, profit: 79000 },
  { label: "May", revenue: 295000, spend: 14200, profit: 88000 },
  { label: "Jun", revenue: 312450, spend: 14600, profit: 96820 },
];

export const LEAD_SOURCES = [
  { name: "Google LSA", value: 34, color: "#38bdf8" },
  { name: "SEO / Organic", value: 26, color: "#2dd4bf" },
  { name: "Meta Ads", value: 18, color: "#818cf8" },
  { name: "Referrals", value: 14, color: "#34d399" },
  { name: "Door Hangers", value: 8, color: "#fbbf24" },
];

export const CHANNEL_PERFORMANCE = [
  { channel: "LSA", leads: 142, cost: 4200, revenue: 38600 },
  { channel: "Google", leads: 98, cost: 5100, revenue: 29400 },
  { channel: "Meta", leads: 76, cost: 3300, revenue: 21800 },
  { channel: "SEO", leads: 110, cost: 1200, revenue: 33200 },
  { channel: "Referral", leads: 58, cost: 800, revenue: 24600 },
];

// ---------------------------------------------------------------------------
// CRM
// ---------------------------------------------------------------------------
export const CUSTOMERS: Customer[] = [
  { id: "c1", name: "Jennifer Walsh", email: "jwalsh@gmail.com", phone: "(303) 555-0142", address: "1820 Maple Ridge Dr, Castle Rock", tags: ["VIP", "Recurring", "Window"], lifetimeValue: 4820, rating: 5, createdAt: "2023-04-11", lastJob: "Window Cleaning" },
  { id: "c2", name: "Marcus Bryant", email: "mbryant@outlook.com", phone: "(720) 555-0188", address: "442 Oakhurst Ln, Parker", tags: ["Commercial", "Recurring"], lifetimeValue: 12400, rating: 5, createdAt: "2022-09-02", lastJob: "Pressure Washing" },
  { id: "c3", name: "Sofia Ramirez", email: "sofia.r@gmail.com", phone: "(303) 555-0119", address: "98 Birchwood Ct, Lone Tree", tags: ["New", "Soft Wash"], lifetimeValue: 480, rating: 4, createdAt: "2026-05-30", lastJob: "Soft Washing" },
  { id: "c4", name: "Daniel & Kate Cho", email: "thechos@gmail.com", phone: "(720) 555-0207", address: "7711 Summit View, Highlands Ranch", tags: ["VIP", "Christmas Lights"], lifetimeValue: 6900, rating: 5, createdAt: "2021-11-19", lastJob: "Christmas Lights" },
  { id: "c5", name: "Patricia Nguyen", email: "pat.nguyen@gmail.com", phone: "(303) 555-0166", address: "215 Cedar Falls Rd, Centennial", tags: ["Recurring", "Gutters"], lifetimeValue: 2150, rating: 4, createdAt: "2024-02-08", lastJob: "Gutter Cleaning" },
  { id: "c6", name: "Greenfield HOA", email: "board@greenfieldhoa.org", phone: "(720) 555-0300", address: "Greenfield Community, Aurora", tags: ["Commercial", "HOA", "VIP"], lifetimeValue: 28600, rating: 5, createdAt: "2022-03-14", lastJob: "Pressure Washing" },
];

export const LEADS: Lead[] = [
  { id: "l1", name: "Tom Richardson", service: "pressure-washing", source: "Google LSA", stage: "new", value: 450, score: 88, createdAt: "2026-06-28", notes: "Wants driveway + patio before July 4th party" },
  { id: "l2", name: "Amy Foster", service: "window-cleaning", source: "Referral", stage: "contacted", value: 320, score: 76, createdAt: "2026-06-27" },
  { id: "l3", name: "Westgate Apartments", service: "soft-washing", source: "Meta Ads", stage: "estimate-sent", value: 3800, score: 94, createdAt: "2026-06-26", notes: "12-building complex, recurring potential" },
  { id: "l4", name: "Brian Kelly", service: "gutter-cleaning", source: "SEO", stage: "negotiating", value: 280, score: 71, createdAt: "2026-06-25" },
  { id: "l5", name: "Rachel Green", service: "roof-cleaning", source: "Google Ads", stage: "won", value: 720, score: 90, createdAt: "2026-06-24" },
  { id: "l6", name: "Steve Morrison", service: "window-cleaning", source: "Door Hanger", stage: "new", value: 240, score: 62, createdAt: "2026-06-28" },
  { id: "l7", name: "Linda Park", service: "christmas-lights", source: "Referral", stage: "contacted", value: 1400, score: 85, createdAt: "2026-06-27", notes: "Early booking for the holidays" },
  { id: "l8", name: "Cooper Builders", service: "pressure-washing", source: "Partnership", stage: "estimate-sent", value: 5200, score: 96, createdAt: "2026-06-23", notes: "New construction final cleans, ongoing" },
  { id: "l9", name: "Dana White", service: "soft-washing", source: "Meta Ads", stage: "lost", value: 480, score: 44, createdAt: "2026-06-20", notes: "Went with cheaper competitor" },
];

export const JOBS: Job[] = [
  { id: "j1", customer: "Jennifer Walsh", service: "window-cleaning", status: "scheduled", value: 285, scheduledFor: "2026-06-29 09:00", crew: "Crew A", address: "Castle Rock" },
  { id: "j2", customer: "Marcus Bryant", service: "pressure-washing", status: "in-progress", value: 425, scheduledFor: "2026-06-28 13:00", crew: "Crew B", address: "Parker" },
  { id: "j3", customer: "Greenfield HOA", service: "pressure-washing", status: "scheduled", value: 4200, scheduledFor: "2026-06-30 08:00", crew: "Crew A + C", address: "Aurora" },
  { id: "j4", customer: "Patricia Nguyen", service: "gutter-cleaning", status: "completed", value: 210, scheduledFor: "2026-06-28 10:30", crew: "Crew C", address: "Centennial" },
  { id: "j5", customer: "Sofia Ramirez", service: "soft-washing", status: "invoiced", value: 480, scheduledFor: "2026-06-27 11:00", crew: "Crew B", address: "Lone Tree" },
  { id: "j6", customer: "Daniel & Kate Cho", service: "roof-cleaning", status: "paid", value: 650, scheduledFor: "2026-06-26 14:00", crew: "Crew A", address: "Highlands Ranch" },
];

// ---------------------------------------------------------------------------
// Lead generation opportunities (AI-ranked)
// ---------------------------------------------------------------------------
export const OPPORTUNITIES: LeadOpportunity[] = [
  { id: "o1", title: "Partner with 6 nearby HOAs for annual contracts", channel: "Partnerships", difficulty: 3, cost: "low", expectedRoi: 8.2, estimatedLeads: 45, competition: 2, timeRequired: "2-4 weeks", description: "High-value recurring commercial contracts. Recon found 6 HOAs within 8 miles with no current vendor relationship." },
  { id: "o2", title: "Rank for 'pressure washing near me' service-area pages", channel: "SEO", difficulty: 3, cost: "free", expectedRoi: 6.5, estimatedLeads: 38, competition: 4, timeRequired: "6-10 weeks", description: "12 location pages with schema can capture an estimated 38 organic leads/mo at near-zero marginal cost." },
  { id: "o3", title: "New-homeowner moving list direct mail campaign", channel: "Direct Mail", difficulty: 2, cost: "medium", expectedRoi: 4.1, estimatedLeads: 60, competition: 2, timeRequired: "1-2 weeks", description: "240 new homeowners in target zips last 60 days. Branded postcards with first-clean offer." },
  { id: "o4", title: "Real estate agent referral program", channel: "Partnerships", difficulty: 2, cost: "low", expectedRoi: 5.8, estimatedLeads: 30, competition: 3, timeRequired: "3-5 weeks", description: "Agents need pre-listing exterior cleans. Offer co-branded flyers + referral kickback." },
  { id: "o5", title: "Google LSA budget increase in top 3 zips", channel: "Paid", difficulty: 1, cost: "high", expectedRoi: 4.6, estimatedLeads: 52, competition: 4, timeRequired: "1 day", description: "Current LSA ROAS is 9.2 and budget-capped 4 days/week. Scaling spend captures lost demand." },
  { id: "o6", title: "TikTok before/after content engine", channel: "Social", difficulty: 3, cost: "free", expectedRoi: 3.4, estimatedLeads: 22, competition: 2, timeRequired: "Ongoing", description: "Satisfying soft-wash transformations perform well. Reel agent can produce 5/week." },
  { id: "o7", title: "Builder partnership for new-construction final cleans", channel: "Partnerships", difficulty: 4, cost: "low", expectedRoi: 7.1, estimatedLeads: 18, competition: 3, timeRequired: "4-8 weeks", description: "Cooper Builders already in pipeline. 3 more builders identified with steady volume." },
  { id: "o8", title: "Neighborhood blitz: target 4 high-income subdivisions", channel: "Direct Mail", difficulty: 2, cost: "medium", expectedRoi: 3.9, estimatedLeads: 40, competition: 2, timeRequired: "2 weeks", description: "Door hangers + yard signs after first job in cluster. Density lowers drive time." },
];

// ---------------------------------------------------------------------------
// Advertising campaigns
// ---------------------------------------------------------------------------
export const CAMPAIGNS: Campaign[] = [
  { id: "ad1", name: "LSA - Window & Pressure", platform: "Google LSA", status: "active", spend: 4200, budget: 5000, impressions: 0, clicks: 0, leads: 142, revenue: 38600 },
  { id: "ad2", name: "Spring Soft Wash Promo", platform: "Meta", status: "active", spend: 3300, budget: 3500, impressions: 184000, clicks: 4120, leads: 76, revenue: 21800 },
  { id: "ad3", name: "Search - Roof Cleaning", platform: "Google Ads", status: "active", spend: 2900, budget: 3000, impressions: 92000, clicks: 2240, leads: 54, revenue: 18900 },
  { id: "ad4", name: "Christmas Lights Early Bird", platform: "Meta", status: "draft", spend: 0, budget: 4000, impressions: 0, clicks: 0, leads: 0, revenue: 0 },
  { id: "ad5", name: "Remarketing - Site Visitors", platform: "Google Display", status: "active", spend: 1100, budget: 1500, impressions: 312000, clicks: 1840, leads: 21, revenue: 9200 },
  { id: "ad6", name: "TikTok Before/After", platform: "TikTok", status: "review", spend: 800, budget: 1500, impressions: 96000, clicks: 3100, leads: 14, revenue: 5400 },
  { id: "ad7", name: "PMax - All Services", platform: "Performance Max", status: "paused", spend: 2200, budget: 3000, impressions: 410000, clicks: 5200, leads: 31, revenue: 11600 },
];

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
export const REVIEWS: Review[] = [
  { id: "r1", author: "Jennifer W.", platform: "Google", rating: 5, text: "Absolutely spotless windows and the crew was so professional. Booking was effortless!", date: "2026-06-27", responded: true, sentiment: "positive" },
  { id: "r2", author: "Marcus B.", platform: "Google", rating: 5, text: "Best pressure washing service we've used for our properties. Reliable every time.", date: "2026-06-26", responded: true, sentiment: "positive" },
  { id: "r3", author: "Anonymous", platform: "Yelp", rating: 2, text: "Crew showed up 40 minutes late and didn't call ahead. Work was fine but communication needs work.", date: "2026-06-25", responded: false, sentiment: "negative", suggestedReply: "Hi, thank you for the honest feedback and we sincerely apologize for the late arrival and lack of a heads-up — that's not our standard. We've added proactive 'on the way' texts to every job. We'd love to make it right; please reach out and we'll prioritize your next service." },
  { id: "r4", author: "Sofia R.", platform: "Facebook", rating: 4, text: "Great soft wash on our siding, looks brand new. Would've liked a reminder text the day before.", date: "2026-06-24", responded: false, sentiment: "neutral", suggestedReply: "Thank you Sofia! So glad the siding looks brand new. Great news — we just turned on day-before reminder texts for all customers, so you'll get one next time. We appreciate you!" },
  { id: "r5", author: "Kate C.", platform: "Google", rating: 5, text: "Our Christmas lights were stunning and the install was flawless. Booking again for next year.", date: "2026-06-22", responded: true, sentiment: "positive" },
];

// ---------------------------------------------------------------------------
// Automations
// ---------------------------------------------------------------------------
export const AUTOMATIONS: Automation[] = [
  { id: "a1", name: "New Lead Welcome Sequence", trigger: "New lead created", steps: ["Assign to Sales agent", "Send intro text", "Send intro email", "Schedule call reminder"], active: true, runs: 482, category: "Sales" },
  { id: "a2", name: "Quote Follow-Up Drip", trigger: "Quote sent + no response 24h", steps: ["Send follow-up text", "Wait 2 days", "Send value email", "Notify Sales agent to call"], active: true, runs: 213, category: "Sales" },
  { id: "a3", name: "Missed Call Recovery", trigger: "Inbound call missed", steps: ["Auto-text caller", "Offer instant quote link", "Create lead", "Alert dispatcher"], active: true, runs: 156, category: "Sales" },
  { id: "a4", name: "Post-Job Review Request", trigger: "Job marked completed", steps: ["Wait 2 hours", "Send thank-you text", "Request review", "Tag promoter if 5★"], active: true, runs: 624, category: "Reviews" },
  { id: "a5", name: "Appointment Reminders", trigger: "24h before job", steps: ["Send reminder text", "Send 'on the way' text day-of", "Update calendar"], active: true, runs: 1840, category: "Operations" },
  { id: "a6", name: "Dormant Customer Reactivation", trigger: "No job in 6 months", steps: ["Add to reactivation segment", "Send win-back offer", "Follow up in 1 week"], active: false, runs: 312, category: "Marketing" },
  { id: "a7", name: "Invoice & Payment", trigger: "Job completed", steps: ["Generate invoice", "Send invoice", "Auto-charge card on file", "Send receipt"], active: true, runs: 591, category: "Finance" },
];

// ---------------------------------------------------------------------------
// AI suggestions (impact/effort ranked) + activity feed
// ---------------------------------------------------------------------------
export const AI_SUGGESTIONS: AiSuggestion[] = [
  { id: "s1", agent: "Blaze", title: "Scale Google LSA budget +$800/mo", detail: "LSA is budget-capped 4 days/week at 9.2 ROAS. Lifting the cap is projected to add ~$7,300/mo revenue at current efficiency.", impact: "high", effort: "low", category: "Advertising" },
  { id: "s2", agent: "Prospect", title: "Pursue 6 nearby HOA contracts", detail: "Recon identified 6 HOAs with no current vendor. Estimated 45 leads and $8.2 ROI. Atlas recommends a 3-week outreach sprint.", impact: "high", effort: "medium", category: "Lead Gen" },
  { id: "s3", agent: "Sage", title: "Publish 12 service-area SEO pages", detail: "Capture 'near me' demand worth ~38 organic leads/mo at near-zero cost. Sage can draft all 12 this week for review.", impact: "high", effort: "medium", category: "SEO" },
  { id: "s4", agent: "Halo", title: "Respond to 2 unaddressed reviews", detail: "1 negative (Yelp) and 1 neutral (Facebook) need replies. Suggested responses are drafted and waiting for approval.", impact: "medium", effort: "low", category: "Reputation" },
  { id: "s5", agent: "Inbox", title: "Re-enable dormant reactivation flow", detail: "312 customers have no job in 6+ months. Win-back automation is currently off — turning it on historically recovers ~6% (≈$11k).", impact: "medium", effort: "low", category: "Marketing" },
  { id: "s6", agent: "Cadence", title: "Fill 3 open slots Thu-Fri", detail: "There are 3 unbooked crew-hours this week. Offer them to the 18-person waitlist via SMS to avoid idle crews.", impact: "medium", effort: "low", category: "Scheduling" },
];

export const ACTIVITY_FEED: Activity[] = [
  { id: "act1", agent: "Blaze", action: "Paused 2 ad sets with ROAS below 2.0 and reallocated $400", time: "3m ago", type: "marketing" },
  { id: "act2", agent: "Echo", action: "Resolved live chat with Sofia R. and booked a follow-up estimate", time: "8m ago", type: "support" },
  { id: "act3", agent: "Quill", action: "Generated quote for Westgate Apartments soft wash ($3,800)", time: "14m ago", type: "sales" },
  { id: "act4", agent: "Mira", action: "Re-optimized tomorrow's routes, saved 47 drive minutes", time: "22m ago", type: "ops" },
  { id: "act5", agent: "Halo", action: "Requested reviews from 8 completed jobs", time: "31m ago", type: "support" },
  { id: "act6", agent: "Sage", action: "Published 'pressure washing Parker' service-area page", time: "47m ago", type: "seo" },
  { id: "act7", agent: "Ledger", action: "Reconciled Stripe payouts and flagged 1 unpaid invoice", time: "1h ago", type: "finance" },
  { id: "act8", agent: "Prospect", action: "Found 6 HOA partnership opportunities within 8 miles", time: "1h ago", type: "marketing" },
  { id: "act9", agent: "Rex", action: "Recovered 3 missed calls → 2 booked estimates", time: "2h ago", type: "sales" },
];
