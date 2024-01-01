import { Doc } from "@/convex/_generated/dataModel";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { Readable } from "stream";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const randomRange = (min: any, max: any) =>
  Math.random() * (max - min) + min;
export function groupObjectsByDate(images: Doc<"image">[]) {
  const groupedDataMap = new Map();
  images.forEach((item) => {
    const dateKey = item.prompt;

    if (!groupedDataMap.has(dateKey)) {
      groupedDataMap.set(dateKey, []);
    }
    groupedDataMap.get(dateKey).push(item);
  });

  const groupedDataArray: Doc<"image">[][] = Array.from(
    groupedDataMap.values()
  );

  return groupedDataArray;
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
