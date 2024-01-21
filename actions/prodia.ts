"use server";
import { Prodia } from "prodia.js";
const prodia = new Prodia("22cb3eca-5698-4ee2-ae04-e56b70cbd65b");
export const createProdia = async (prompt: string, negativePrompt: string) => {
  const generate = await prodia.generateImage({
    prompt,
    model: "absolutereality_v181.safetensors [3d9d4d2b]",
    negativePrompt,
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
  negativePrompt: string,
  imageUrl: string
) => {
  const generate: any = await prodia.transformImage({
    imageUrl,
    prompt,
    model: "absolutereality_v181.safetensors [3d9d4d2b]",
    negativePrompt,
    sampler: "DPM++ SDE Karras",
    cfgScale: 9,
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
  const url = "https://api.prodia.com/v1/faceswap";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-Prodia-Key": "22cb3eca-5698-4ee2-ae04-e56b70cbd65b",
    },
    body: JSON.stringify({ sourceUrl, targetUrl }),
  };
  const resp = await fetch(url, options);
  const job = await resp.json();
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const res = await fetch(
      `https://api.prodia.com/v1/job/2b05e51b-6737-4e87-a21a-1099bdd9bf1f`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-Prodia-Key": "22cb3eca-5698-4ee2-ae04-e56b70cbd65b",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    if (result.status === "succeeded") {
      return result.imageUrl;
    }
  }
};
