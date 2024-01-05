"use server";
import { BingChat } from "bing-chat";

export async function createBingText(text: string) {
  const api = new BingChat({
    cookie: process.env.BING_IMAGE_COOKIE!,
  });

  const res = await api.sendMessage("Write a 500 word essay on frogs.", {
    // print the partial response as the AI is "typing"
    onProgress: (partialResponse: any) => console.log(partialResponse.text),
  });

  // print the full text at the end
  console.log(res.text);
}
