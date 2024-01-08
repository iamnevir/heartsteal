"use server";
const apiKey = process.env.NEXT_PUBLIC_IMAGINE_API_KEY;
export const upscaleImage = async (file: File) => {
  const url = "https://api.vyro.ai/v1/imagine/api/upscale";

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      image: file,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const res = await fetch(url, requestOptions);
  return await res.json();
};

export const imagineGeneration = async (prompt: string) => {
  const url = "https://api.vyro.ai/v1/imagine/api/generations";

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${apiKey}`);

  const formdata = new FormData();
  formdata.append("prompt", prompt);
  formdata.append("style_id", "21");

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: headers,
  };
  const res = await fetch(url, requestOptions);
  return res.text();
};
