import { Subscription } from "@/types/Subscription";
import { create } from "zustand";

export type LanguagesSupported =
  | "en"
  | "es"
  | "de"
  | "fr"
  | "id"
  | "ja"
  | "ru"
  | "zh"
  | "ar";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
  id: "Bahasa Indonesia",
  ja: "Japanese",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

interface SubscriptionState {
  subscription?: Subscription | null;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
