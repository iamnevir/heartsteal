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
export function timeResetCoin(): number {
  // Lấy thời gian hiện tại
  const currentTime: Date = new Date();

  // Đặt giờ là 17:00:00 của ngày hôm sau
  const targetTime: Date = new Date(currentTime);
  targetTime.setHours(17, 0, 0, 0);
  targetTime.setDate(targetTime.getDate() + 1);

  // Tính số giờ chênh lệch
  const timeDifferenceInMilliseconds: number =
    targetTime.getTime() - currentTime.getTime();
  const timeDifferenceInHours: number =
    timeDifferenceInMilliseconds / (1000 * 60 * 60);

  // Làm tròn xuống và chuyển đổi thành số nguyên
  const roundedHourDifference: number = Math.floor(timeDifferenceInHours);

  return roundedHourDifference;
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
