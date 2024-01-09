import { Doc } from "@/convex/_generated/dataModel";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const openaiApi = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
export const backEndUrl = process.env.NEXT_PUBLIC_BACK_END!;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const randomRange = (min: any, max: any) =>
  Math.random() * (max - min) + min;

export function groupObjectsByPrompt(images: Doc<"image">[]) {
  const groupedDataMap = new Map<string, Map<string, Doc<"image">[]>>();

  images.forEach((item) => {
    const promptKey = item.prompt!;
    const creationTimeKey = getDateString(item._creationTime);

    if (!groupedDataMap.has(promptKey)) {
      groupedDataMap.set(promptKey, new Map());
    }

    const promptMap = groupedDataMap.get(promptKey);

    if (!promptMap?.has(creationTimeKey)) {
      promptMap?.set(creationTimeKey, []);
    }

    promptMap?.get(creationTimeKey)?.push(item);
  });

  const groupedDataArray: Array<Array<Doc<"image">>> = [];

  groupedDataMap.forEach((promptMap) => {
    promptMap.forEach((items) => {
      groupedDataArray.push(items);
    });
  });

  return groupedDataArray;
}
function getDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function formatVietnameseDate(timespanInMilliseconds: number): string {
  const months: string[] = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const date = new Date(timespanInMilliseconds);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = ` ${day}, ${months[month]}, ${year}`;

  return formattedDate;
}
export const calcCoinGenerate = (
  imageSize: string,
  imageNumber: number,
  isInput: boolean
) => {
  if (!isInput) {
    if (imageSize === "512x512") {
      return imageNumber * 2;
    } else if (imageSize === "1024x1024") {
      return imageNumber * 3;
    } else {
      return imageNumber * 1;
    }
  } else {
    if (imageSize === "512x512") {
      return imageNumber * 3;
    } else if (imageSize === "1024x1024") {
      return imageNumber * 4;
    } else {
      return imageNumber * 2;
    }
  }
};
export function base64toFile(base64: string): File {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });

  return new File([blob], "hearsteal.png", { type: "image/png" });
}
