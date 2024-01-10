import { SliderValue } from "@nextui-org/react";
import { create } from "zustand";

type GridImage = {
  grid: SliderValue;
  setGrid: (grid: SliderValue) => void;
};

export const useGridImage = create<GridImage>((set, get) => ({
  grid: 5,
  setGrid: (grid: SliderValue) => set({ grid }),
}));
