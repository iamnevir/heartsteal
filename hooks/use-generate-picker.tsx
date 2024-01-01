import { create } from "zustand";

type GenerateImage = {
  prompt: string;
  model: string;
  imageNumber: number;
  imageSize: string;
  natural: boolean;
  hd: boolean;
  publicImage: boolean;
  isImageInput: boolean;
  inputUrl: string;
  setInputUrl: (inputUrl: string) => void;
  setImageInput: (v: boolean) => void;
  setPrompt: (v: string) => void;
  setModel: (v: string) => void;
  setImageNumber: (v: number) => void;
  setImageSize: (v: string) => void;
  setNatural: (v: boolean) => void;
  setHd: (v: boolean) => void;
  setPublicImage: (v: boolean) => void;
};

export const useGenerateImage = create<GenerateImage>((set, get) => ({
  prompt: "",
  model: "dall-e-2",
  imageNumber: 1,
  imageSize: "512x512",
  natural: false,
  hd: false,
  publicImage: false,
  isImageInput: false,
  inputUrl: "",
  setInputUrl: (inputUrl: string) => set({ inputUrl }),
  setImageInput: (isImageInput: boolean) => set({ isImageInput }),
  setPrompt: (prompt: string) => set({ prompt }),
  setModel: (model: string) => set({ model }),
  setImageNumber: (imageNumber: number) => set({ imageNumber }),
  setImageSize: (imageSize: string) => set({ imageSize }),
  setNatural: (natural: boolean) => set({ natural }),
  setHd: (hd: boolean) => set({ hd }),
  setPublicImage: (publicImage: boolean) => set({ publicImage }),
}));
