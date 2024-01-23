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
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
export function formatVietnameseDateTime(
  timespanInMilliseconds: number
): string {
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

  // Lấy giờ và phút từ đối tượng Date
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format giờ và phút thành chuỗi với định dạng hh:mm
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  // Kết hợp ngày, tháng, năm và giờ phút vào một chuỗi định dạng đầy đủ
  const formattedDate = `${formattedTime} - ${day}, ${months[month]}, ${year}`;

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

export const getDataForChart = (
  models?: Doc<"model">[],
  users?: Doc<"user">[],
  orders?: Doc<"order">[],
  language?: "Vietnamese" | "English"
) => {
  if (!models || !users || !orders) {
    return;
  }

  if (language === "Vietnamese") {
    const summary: {
      date: string;
      countType: "Người dùng" | "Đơn hàng" | "Mô hình";
      count: number;
    }[] = [];

    // Tạo một mảng chứa tất cả ngày tạo từ user, order, và model
    const allDates: string[] = Array.from(
      new Set([
        ...users.map((user) => formatVietnameseDate(user._creationTime)),
        ...orders.map((order) => formatVietnameseDate(order._creationTime)),
        ...models.map((model) => formatVietnameseDate(model._creationTime)),
      ])
    );

    allDates.forEach((date) => {
      const userCount = users.filter(
        (user) => formatVietnameseDate(user._creationTime) === date
      ).length;
      const orderCount = orders.filter(
        (order) => formatVietnameseDate(order._creationTime) === date
      ).length;
      const modelCount = models.filter(
        (model) => formatVietnameseDate(model._creationTime) === date
      ).length;

      summary.push({
        date,
        countType: "Người dùng",
        count: userCount,
      });

      summary.push({
        date,
        countType: "Đơn hàng",
        count: orderCount,
      });

      summary.push({
        date,
        countType: "Mô hình",
        count: modelCount,
      });
    });
    return summary;
  } else {
    const summary: {
      date: string;
      countType: "user" | "order" | "model";
      count: number;
    }[] = [];

    // Tạo một mảng chứa tất cả ngày tạo từ user, order, và model
    const allDates: string[] = Array.from(
      new Set([
        ...users.map((user) => formatVietnameseDate(user._creationTime)),
        ...orders.map((order) => formatVietnameseDate(order._creationTime)),
        ...models.map((model) => formatVietnameseDate(model._creationTime)),
      ])
    );

    allDates.forEach((date) => {
      const userCount = users.filter(
        (user) => formatVietnameseDate(user._creationTime) === date
      ).length;
      const orderCount = orders.filter(
        (order) => formatVietnameseDate(order._creationTime) === date
      ).length;
      const modelCount = models.filter(
        (model) => formatVietnameseDate(model._creationTime) === date
      ).length;

      // Thêm thông tin tổng hợp vào mảng summary
      summary.push({
        date,
        countType: "user",
        count: userCount,
      });

      summary.push({
        date,
        countType: "order",
        count: orderCount,
      });

      summary.push({
        date,
        countType: "model",
        count: modelCount,
      });
    });

    return summary;
  }
};
