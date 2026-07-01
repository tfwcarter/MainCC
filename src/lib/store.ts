"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ServiceType } from "./types";

interface BusinessConfig {
  companyName: string;
  selectedServices: ServiceType[];
  onboarded: boolean;
  setCompanyName: (name: string) => void;
  toggleService: (id: ServiceType) => void;
  setServices: (ids: ServiceType[]) => void;
  completeOnboarding: () => void;
}

export const useBusiness = create<BusinessConfig>()(
  persist(
    (set) => ({
      companyName: "SqueegeeSeal Hub",
      selectedServices: [
        "window-cleaning",
        "pressure-washing",
        "soft-washing",
        "gutter-cleaning",
        "roof-cleaning",
        "christmas-lights",
      ],
      onboarded: false,
      setCompanyName: (name) => set({ companyName: name }),
      toggleService: (id) =>
        set((state) => ({
          selectedServices: state.selectedServices.includes(id)
            ? state.selectedServices.filter((s) => s !== id)
            : [...state.selectedServices, id],
        })),
      setServices: (ids) => set({ selectedServices: ids }),
      completeOnboarding: () => set({ onboarded: true }),
    }),
    { name: "ss-hub-business" }
  )
);
