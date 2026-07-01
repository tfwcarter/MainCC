import type { ServiceDef, ServiceType } from "./types";

export const SERVICE_CATALOG: ServiceDef[] = [
  { id: "window-cleaning", label: "Window Cleaning", icon: "PanelsTopLeft", avgTicket: 285, recurring: true, season: "year-round" },
  { id: "pressure-washing", label: "Pressure Washing", icon: "Droplets", avgTicket: 425, recurring: false, season: "spring-summer" },
  { id: "soft-washing", label: "Soft Washing", icon: "SprayCan", avgTicket: 480, recurring: false, season: "spring-summer" },
  { id: "gutter-cleaning", label: "Gutter Cleaning", icon: "Container", avgTicket: 210, recurring: true, season: "fall-winter" },
  { id: "roof-cleaning", label: "Roof Cleaning", icon: "Home", avgTicket: 650, recurring: false, season: "spring-summer" },
  { id: "christmas-lights", label: "Christmas Lights", icon: "Sparkles", avgTicket: 1200, recurring: true, season: "fall-winter" },
  { id: "permanent-lighting", label: "Permanent Lighting", icon: "Lightbulb", avgTicket: 3500, recurring: false, season: "year-round" },
  { id: "landscaping", label: "Landscaping", icon: "Trees", avgTicket: 540, recurring: true, season: "spring-summer" },
  { id: "junk-removal", label: "Junk Removal", icon: "Trash2", avgTicket: 320, recurring: false, season: "year-round" },
  { id: "painting", label: "Painting", icon: "Paintbrush", avgTicket: 2400, recurring: false, season: "year-round" },
  { id: "cleaning", label: "Cleaning Company", icon: "Sparkle", avgTicket: 180, recurring: true, season: "year-round" },
  { id: "hvac", label: "HVAC", icon: "Wind", avgTicket: 480, recurring: true, season: "year-round" },
  { id: "plumbing", label: "Plumbing", icon: "Wrench", avgTicket: 390, recurring: false, season: "year-round" },
  { id: "electrical", label: "Electrical", icon: "Zap", avgTicket: 410, recurring: false, season: "year-round" },
  { id: "pest-control", label: "Pest Control", icon: "Bug", avgTicket: 145, recurring: true, season: "year-round" },
];

export function getService(id: ServiceType): ServiceDef {
  return SERVICE_CATALOG.find((s) => s.id === id) ?? SERVICE_CATALOG[0];
}
