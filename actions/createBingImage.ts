"use server";
import { generateImagesLinks } from "bimg-new";
export const createBingImage = async (prompt: string) => {
  const imageLinks = await generateImagesLinks(prompt);
  return imageLinks;
};
