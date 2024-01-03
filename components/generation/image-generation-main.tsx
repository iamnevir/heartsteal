"use client";

import ImageInput from "@/components/generation/image-input";
import {
  Button,
  Chip,
  CircularProgress,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import Dive from "./dive";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import GenerationHistory from "./generation-history";
import { cn, groupObjectsByDate, openaiApi } from "@/lib/utils";
import { usePaginatedQuery } from "convex/react";
import { useState } from "react";
import LoadMore from "../load-more";
import { useMediaQuery } from "usehooks-ts";
import ImageEdit from "./image-edit";

const ImageGenerationMain = () => {
  const generation = useGenerateImage();
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width:768px)");
  const create = useMutation(api.image.create);
  const [isLoading, setIsLoading] = useState(false);
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImageByUser,
    { userId: user?.id! },
    { initialNumItems: 8 }
  );
  const images = groupObjectsByDate(results);
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      if (generation.isImageInput) {
        if (!generation.inputUrl) {
          toast("No image input found.");
        }
        const data = {
          n: generation.imageNumber,
          image_url: generation.inputUrl,
          size: generation.imageSize,
        };
        const res = await axios({
          method: "post",
          url: "http://localhost:5000/generate_image_with_image",
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "application/json",
          },
          data,
        });
        for (let index = 0; index < generation.imageNumber; index++) {
          create({
            prompt: generation.prompt,
            url: res.data.data[index],
            userId: user?.id!,
            isPublish: generation.publicImage,
            likes: 0,
            model: generation.model,
            size: generation.imageSize,
          });
        }
        toast("Generated successfully.");
      } else {
        const data = {
          model: generation.model,
          n: generation.imageNumber,
          size: generation.imageSize,
          prompt: generation.prompt,
        };
        const res = await axios({
          method: "post",
          url: "https://api.openai.com/v1/images/generations",
          data,
          headers: {
            Authorization: `Bearer ${openaiApi}`,
            "Content-Type": "application/json",
          },
        });

        for (let index = 0; index < generation.imageNumber; index++) {
          create({
            prompt: generation.prompt,
            url: res.data.data[index].url,
            userId: user?.id!,
            isPublish: generation.publicImage,
            likes: 0,
            model: generation.model,
            size: generation.imageSize,
          });
        }
        toast("Generated successfully.");
      }
    } catch (error) {
      console.log(error);
      toast("Generation Failed.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="sm:pl-64 px-2 pt-6">
      <span>AI Image Generation</span>
      <div
        className={cn(
          "flex sm:flex-row flex-col items-start gap-3 py-5 sm:pr-10",
          isLoading ? "pointer-events-none" : ""
        )}
      >
        <div
          className={cn(
            "flex gap-3 w-full",
            generation.isImageInput ? " opacity-50 pointer-events-none" : ""
          )}
        >
          <Dive />
          <Textarea
            disabled={isLoading}
            className=" w-full"
            classNames={{
              inputWrapper:
                "dark:bg-slate-900/70 bg-slate-200 rounded-md focus-visible:border-2",

              base: generation.prompt === "" ? "h-12" : "",
            }}
            value={generation.prompt}
            placeholder="Type a prompt..."
            onValueChange={generation.setPrompt}
            isRequired
            maxLength={1000}
          />
        </div>

        <Button
          onClick={handleGenerate}
          className="bg-gr hover:scale-105 rounded-lg sm:w-fit w-full px-14 font-semibold text-lg text-white py-6"
        >
          {isLoading ? (
            <CircularProgress size="sm" aria-label="Loading..." />
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      <Tabs
        variant="underlined"
        classNames={{ cursor: "bg-gr" }}
        aria-label="Tabs variants"
      >
        <Tab key="history" title="Generation History">
          <GenerationHistory images={images} />
          {status === "CanLoadMore" ? (
            <LoadMore loadMore={() => loadMore(isMobile ? 3 : 4)} />
          ) : null}
          {status === "LoadingMore" ? (
            <div className=" w-full py-3 flex items-center justify-center">
              <CircularProgress size="sm" aria-label="Loading..." />
            </div>
          ) : null}
        </Tab>
        <Tab
          key="image-input"
          title={
            <div className=" flex gap-2 items-center">
              <span>Image Input</span>
              <Chip className="bg-gr" size="sm">
                New
              </Chip>
            </div>
          }
        >
          <ImageInput />
        </Tab>
        {!isMobile && (
          <Tab
            key="image-edit"
            title={
              <div className=" flex gap-2 items-center">
                <span>Image Edit</span>
                <Chip className="bg-gr" size="sm">
                  Beta
                </Chip>
              </div>
            }
          >
            <ImageEdit />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ImageGenerationMain;
