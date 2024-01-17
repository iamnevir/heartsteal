import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type Language = {
  language: "Vietnamese" | "English";
  setLanguage: (maskInput: "Vietnamese" | "English") => void;
};

export const useLanguage = create(
  persist<Language>(
    (set, get) => ({
      language: "Vietnamese",
      setLanguage: (language: "Vietnamese" | "English") => set({ language }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
