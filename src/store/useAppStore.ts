import { create } from "zustand";

export type Language = "en" | "es" | "zh";

export interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  viewedBusinessIds: string[];
  addViewed: (id: string) => void;
  searchHistory: string[];
  addSearch: (q: string) => void;
  subscribedAlerts: Set<string>;
  toggleAlert: (businessId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
  viewedBusinessIds: [],
  addViewed: (id) =>
    set((s) => ({
      viewedBusinessIds: [...s.viewedBusinessIds.filter((x) => x !== id), id].slice(-20),
    })),
  searchHistory: [],
  addSearch: (q) =>
    set((s) => ({
      searchHistory: [...s.searchHistory.filter((x) => x !== q), q].slice(-10),
    })),
  subscribedAlerts: new Set(),
  toggleAlert: (businessId) =>
    set((s) => {
      const next = new Set(s.subscribedAlerts);
      if (next.has(businessId)) next.delete(businessId);
      else next.add(businessId);
      return { subscribedAlerts: next };
    }),
}));
