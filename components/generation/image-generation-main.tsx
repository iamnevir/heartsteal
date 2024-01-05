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
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import GenerationHistory from "./generation-history";
import {
  calcCoinGenerate,
  cn,
  groupObjectsByDate,
  openaiApi,
} from "@/lib/utils";
import { usePaginatedQuery } from "convex/react";
import { useState } from "react";
import LoadMore from "../load-more";
import { useMediaQuery } from "usehooks-ts";
import ImageEdit from "./image-edit";
import { useLanguage } from "@/hooks/use-language";
import { Gem } from "lucide-react";

const ImageGenerationMain = () => {
  const generation = useGenerateImage();
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const update = useMutation(api.user.update);
  const isMobile = useMediaQuery("(max-width:768px)");
  const create = useMutation(api.image.create);
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImageByUser,
    { userId: user?.id! },
    { initialNumItems: 8 }
  );
  const [isLoading, setIsLoading] = useState(false);
  const language = useLanguage();
  const images = groupObjectsByDate(results);
  const price = calcCoinGenerate(
    generation.imageSize,
    generation.imageNumber,
    generation.isImageInput
  );
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      if (generation.isImageInput) {
        if (!generation.inputUrl) {
          toast(
            language.language === "Vietnamese"
              ? "Không có ảnh đầu vào."
              : "No image input found."
          );
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
      } else if (generation.isEdit) {
        if (!generation.maskUrl || !generation.maskInput) {
          toast.error(
            language.language === "Vietnamese"
              ? "Không thấy ảnh đầu vào."
              : "No image input found."
          );
        }
        const data = {
          n: generation.imageNumber,
          image_url: generation.maskInput,
          mask: generation.maskUrl,
          prompt: generation.prompt,
          size: generation.imageSize,
        };
        const res = await axios({
          method: "post",
          url: "http://localhost:5000/edit_image",
          maxBodyLength: Infinity,
          headers: { "Content-Type": "application/json" },
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
        update({
          id: u?._id!,
          coin: u?.coin! - price,
        });
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
        update({
          id: u?._id!,
          coin: u?.coin! - price,
        });
      }
      toast.success(
        language.language === "Vietnamese"
          ? "Tạo ảnh thành công."
          : "Generated successfully."
      );
    } catch (error) {
      console.log(error);
      toast.error(
        language.language === "Vietnamese"
          ? "Tạo ảnh không thành công."
          : "Generation Failed."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="sm:pl-64 px-2 pt-6">
      <span className=" font-semibold gradient-text text-lg">
        {language.language === "Vietnamese"
          ? "Mô hình tạo ảnh bằng trí trệ nhân tạo."
          : "AI Image Generation"}
      </span>
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
            placeholder={
              language.language === "Vietnamese"
                ? "Nhập một lệnh..."
                : "Type a prompt..."
            }
            onValueChange={generation.setPrompt}
            isRequired
            maxLength={1000}
          />
        </div>

        <Button
          onClick={handleGenerate}
          className={cn(
            "bg-gr hover:scale-105 rounded-lg sm:w-fit w-full px-14 font-semibold text-lg text-white py-6",
            u?.coin! <= 0 && "opacity-50 pointer-events-none",
            price > u?.coin! && "opacity-50 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-center gap-3">
            {isLoading ? (
              <CircularProgress size="sm" aria-label="Loading..." />
            ) : language.language === "Vietnamese" ? (
              "Tạo ảnh"
            ) : (
              "Generate"
            )}
            <div className="flex items-center justify-center gap-1">
              <div className="w-5 h-5">
                <svg
                  fill="#fff"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.5,23a9.069,9.069,0,0,0,3.5-.68,8.92,8.92,0,0,0,3.5.68c3.645,0,6.5-1.945,6.5-4.429V14.429C22,11.945,19.145,10,15.5,10c-.169,0-.335.008-.5.017V5.333C15,2.9,12.145,1,8.5,1S2,2.9,2,5.333V18.667C2,21.1,4.855,23,8.5,23ZM20,18.571C20,19.72,18.152,21,15.5,21S11,19.72,11,18.571v-.925a8.329,8.329,0,0,0,4.5,1.211A8.329,8.329,0,0,0,20,17.646ZM15.5,12c2.652,0,4.5,1.28,4.5,2.429s-1.848,2.428-4.5,2.428S11,15.577,11,14.429,12.848,12,15.5,12Zm-7-9C11.152,3,13,4.23,13,5.333S11.152,7.667,8.5,7.667,4,6.437,4,5.333,5.848,3,8.5,3ZM4,8.482A8.466,8.466,0,0,0,8.5,9.667,8.466,8.466,0,0,0,13,8.482V10.33a6.47,6.47,0,0,0-2.9,1.607,7.694,7.694,0,0,1-1.6.174c-2.652,0-4.5-1.23-4.5-2.333Zm0,4.445a8.475,8.475,0,0,0,4.5,1.184c.178,0,.35-.022.525-.031A3.1,3.1,0,0,0,9,14.429v2.085c-.168.01-.33.042-.5.042-2.652,0-4.5-1.23-4.5-2.334Zm0,4.444a8.466,8.466,0,0,0,4.5,1.185c.168,0,.333-.013.5-.021v.036a3.466,3.466,0,0,0,.919,2.293A7.839,7.839,0,0,1,8.5,21C5.848,21,4,19.77,4,18.667Z"></path>
                </svg>
              </div>
              <span className="text-sm w-2">{price}</span>
            </div>
          </div>
        </Button>
      </div>
      <Tabs
        variant="underlined"
        classNames={{ cursor: "bg-gr" }}
        aria-label="Tabs variants"
      >
        <Tab
          key="history"
          title={
            isMobile
              ? language.language === "Vietnamese"
                ? "Lịch sử"
                : "History"
              : language.language === "Vietnamese"
              ? "Lịch sử tạo ảnh"
              : "Generation History"
          }
        >
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
              <span>
                {!isMobile
                  ? language.language === "Vietnamese"
                    ? "Ảnh từ ảnh."
                    : "Image Input"
                  : language.language === "Vietnamese"
                  ? "Biến thể"
                  : "Image Input"}
              </span>
              <Chip className="bg-gr" size="sm">
                {language.language === "Vietnamese" ? "Mới" : "New"}
              </Chip>
            </div>
          }
        >
          <ImageInput />
        </Tab>

        <Tab
          key="image-edit"
          title={
            <div className=" flex gap-2 items-center">
              <span>
                {isMobile
                  ? language.language === "Vietnamese"
                    ? "Sửa ảnh."
                    : "Image Edit"
                  : language.language === "Vietnamese"
                  ? "Sửa ảnh"
                  : "Image Edit"}
              </span>
              <Chip className="bg-gr" size="sm">
                {!isMobile
                  ? language.language === "Vietnamese"
                    ? "Thử nghiệm."
                    : "Beta"
                  : "Beta"}
              </Chip>
            </div>
          }
        >
          <ImageEdit isPro={u?.isPro ? u.isPro : false} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ImageGenerationMain;
