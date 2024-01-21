import { Subscription } from "@/common/types/Subscription";
import { create } from "zustand";
import ChatConfig from "@/chat.config";

export type LanguagesSupported =
  | "en"
  | "id"
  | "su"
  | "es"
  | "de"
  | "fr"
  | "ja"
  | "ru"
  | "zh"
  | "ar";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  su: "Sundanese",
  es: "Spanish",
  de: "German",
  fr: "French",
  ja: "Japanese",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: ChatConfig.DEFAULT_LANGUAGE,
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    return Object.keys(LanguagesSupportedMap).slice(
      0,
      ChatConfig.FREE_LANGUAGE_SUPPORTED
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguagesSupportedMap).slice(
      ChatConfig.FREE_LANGUAGE_SUPPORTED
    ) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription?: Subscription | null;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
