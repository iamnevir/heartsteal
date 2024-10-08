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
  isEdit: boolean;
  maskUrl: string;
  maskInput: string;
  isLoading: boolean;
  style?: string;
  negativePrompt: string;
  isNegative: boolean;
  tab: string;
  setTab: (tab: string) => void;
  setIsNegative: (isNegative: boolean) => void;
  setNegativePrompt: (negativePrompt: string) => void;
  setStyle: (style: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setMaskInput: (maskInput: string) => void;
  setMaskUrl: (maskUrl: string) => void;
  setEdit: (isEdit: boolean) => void;
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
  model: "prodia",
  imageNumber: 1,
  imageSize: "512x512",
  natural: false,
  hd: false,
  publicImage: false,
  isImageInput: false,
  inputUrl: "",
  isEdit: false,
  maskUrl: "",
  maskInput: "",
  isLoading: false,
  style: undefined,
  negativePrompt: "",
  isNegative: false,
  tab: "",
  setTab: (tab: string) => set({ tab }),
  setIsNegative: (isNegative: boolean) => set({ isNegative }),
  setNegativePrompt: (negativePrompt: string) => set({ negativePrompt }),
  setStyle: (style: string) => set({ style }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setMaskInput: (maskInput: string) => set({ maskInput }),
  setMaskUrl: (maskUrl: string) => set({ maskUrl }),
  setEdit: (isEdit: boolean) => set({ isEdit }),
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
