"use server";
import fs from "node:fs";
interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}
const engineId = "stable-diffusion-v1-6";
const apiHost = "https://api.stability.ai";
const apiKey = process.env.NEXT_PUBLIC_STABILITY_API_KEY;
export const dreamGeneration = async (
  prompt: string,
  size: string,
  imageNumber: number
) => {
  if (!apiKey) {
    return;
  }
  const { height, width } =
    size === "512x512"
      ? { height: 512, width: 512 }
      : { height: 1024, width: 1024 };
  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
          },
        ],
        height,
        width,
        samples: imageNumber,
      }),
    }
  );

  const responseJSON = (await response.json()) as GenerationResponse;
  return responseJSON;
};

export const upscaleImage = async (file: Buffer) => {
  if (!apiKey) {
    return;
  }

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/image-to-image/upscale`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "image/png",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        image: file,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const image = await response.arrayBuffer();
  return image;
};
