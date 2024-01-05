import { create } from "zustand";

type Language = {
  language: "Vietnamese" | "English";
  setLanguage: (maskInput: "Vietnamese" | "English") => void;
};

export const useLanguage = create<Language>((set, get) => ({
  language: "Vietnamese",
  setLanguage: (language: "Vietnamese" | "English") => set({ language }),
}));
