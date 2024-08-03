"use server";
import { Prodia } from "prodia.js";
const prodia = Prodia("22cb3eca-5698-4ee2-ae04-e56b70cbd65b");
export const createProdia = async (
  prompt: string,
  negative_prompt: string,
  style_preset: any
) => {
  const generate = await prodia.generateImage({
    prompt,
    model: "absolutereality_v181.safetensors [3d9d4d2b]",
    negative_prompt,
    style_preset,
    upscale: true,
  });

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    new Promise((resolve) => setTimeout(resolve, 250));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      return job.imageUrl.toString();
    }
  }
};
export const createProdia1 = async (
  prompt: string,
  negative_prompt: string
) => {
  const generate: any = await prodia.generateImageSDXL({
    prompt,
    model: "absolutereality_v181.safetensors [3d9d4d2b]",
    negative_prompt,
  });

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    new Promise((resolve) => setTimeout(resolve, 250));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      return job.imageUrl.toString();
    }
  }
};
export const image2Image = async (
  prompt: string,
  negative_prompt: string,
  imageUrl: string
) => {
  const generate = await prodia.transform({
    imageUrl,
    prompt,
    model: "absolutereality_v181.safetensors [3d9d4d2b]",
    negative_prompt,
    sampler: "DPM++ SDE Karras",
    cfg_scale: 9,
    steps: 30,
  });

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    new Promise((resolve) => setTimeout(resolve, 500));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      return job.imageUrl.toString();
    }
  }
};
export const faceSwap = async (sourceUrl: string, targetUrl: string) => {
  const generate = await prodia.faceSwap({
    sourceUrl,
    targetUrl,
  });

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    new Promise((resolve) => setTimeout(resolve, 500));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      return job.imageUrl.toString();
    }
  }
};
export const faceRestore = async (imageUrl: string) => {
  const generate = await prodia.faceRestore({
    imageUrl,
  });

  while (generate.status !== "succeeded" && generate.status !== "failed") {
    new Promise((resolve) => setTimeout(resolve, 500));

    const job = await prodia.getJob(generate.job);

    if (job.status === "succeeded") {
      return job.imageUrl.toString();
    }
  }
};
