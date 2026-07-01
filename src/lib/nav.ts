export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    group: "Command",
    items: [
      { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
      { label: "AI Agents", href: "/agents", icon: "Bot", badge: "24" },
      { label: "Analytics", href: "/analytics", icon: "LineChart" },
    ],
  },
  {
    group: "Customers",
    items: [
      { label: "CRM", href: "/crm", icon: "Users" },
      { label: "Lead Gen", href: "/leads", icon: "Magnet" },
      { label: "Scheduling", href: "/scheduling", icon: "CalendarClock" },
      { label: "Reviews", href: "/reviews", icon: "Star" },
    ],
  },
  {
    group: "Growth",
    items: [
      { label: "Advertising", href: "/advertising", icon: "Target" },
      { label: "SEO Center", href: "/seo", icon: "Search" },
      { label: "Content Studio", href: "/content", icon: "Sparkles" },
      { label: "Automations", href: "/automations", icon: "Workflow" },
    ],
  },
  {
    group: "Back office",
    items: [
      { label: "Finance", href: "/finance", icon: "Wallet" },
      { label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
];
