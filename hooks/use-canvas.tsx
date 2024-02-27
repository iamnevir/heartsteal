import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type Canvas = {
  element: any;
  image: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
  setImage: (image: string) => void;
  setElement: (element: any) => void;
};

export const useCanvas = create(
  persist<Canvas>(
    (set, get) => ({
      element: null,
      image: "",
      prompt: "",
      setPrompt: (prompt: string) => set({ prompt }),
      setImage: (image: string) => set({ image }),
      setElement: (element: any) => set({ element }),
    }),
    {
      name: "canvas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
