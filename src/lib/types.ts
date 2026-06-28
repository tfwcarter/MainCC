// Core domain types for the AI Home Service Business OS

export type ServiceType =
  | "window-cleaning"
  | "pressure-washing"
  | "soft-washing"
  | "gutter-cleaning"
  | "roof-cleaning"
  | "christmas-lights"
  | "permanent-lighting"
  | "landscaping"
  | "junk-removal"
  | "painting"
  | "cleaning"
  | "hvac"
  | "plumbing"
  | "electrical"
  | "pest-control";

export interface ServiceDef {
  id: ServiceType;
  label: string;
  icon: string; // lucide icon name
  avgTicket: number;
  recurring: boolean;
  season: "year-round" | "spring-summer" | "fall-winter";
}

export type LeadStage =
  | "new"
  | "contacted"
  | "estimate-sent"
  | "negotiating"
  | "won"
  | "lost";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tags: string[];
  lifetimeValue: number;
  rating: number; // 1-5 customer satisfaction
  createdAt: string;
  lastJob?: string;
}

export interface Lead {
  id: string;
  name: string;
  service: ServiceType;
  source: string;
  stage: LeadStage;
  value: number;
  score: number; // AI lead score 0-100
  createdAt: string;
  notes?: string;
}

export type JobStatus = "scheduled" | "in-progress" | "completed" | "invoiced" | "paid";

export interface Job {
  id: string;
  customer: string;
  service: ServiceType;
  status: JobStatus;
  value: number;
  scheduledFor: string;
  crew: string;
  address: string;
}

export interface AgentDef {
  id: string;
  name: string;
  role: string;
  department: string;
  icon: string;
  color: string;
  status: "active" | "working" | "idle";
  tasksToday: number;
  description: string;
  lastAction: string;
}

export interface LeadOpportunity {
  id: string;
  title: string;
  channel: string;
  difficulty: number; // 1-5
  cost: "free" | "low" | "medium" | "high";
  expectedRoi: number; // multiplier
  estimatedLeads: number;
  competition: number; // 1-5
  timeRequired: string;
  description: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: "active" | "paused" | "draft" | "review";
  spend: number;
  budget: number;
  impressions: number;
  clicks: number;
  leads: number;
  revenue: number;
}

export interface Review {
  id: string;
  author: string;
  platform: string;
  rating: number;
  text: string;
  date: string;
  responded: boolean;
  sentiment: "positive" | "neutral" | "negative";
  suggestedReply?: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  active: boolean;
  runs: number;
  category: string;
}

export interface AiSuggestion {
  id: string;
  agent: string;
  title: string;
  detail: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  category: string;
}

export interface Activity {
  id: string;
  agent: string;
  action: string;
  time: string;
  type: "marketing" | "sales" | "ops" | "finance" | "support" | "seo";
}
