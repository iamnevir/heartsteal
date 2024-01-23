"use client";

import ImageInput from "@/components/generation/image-input";
import {
  Button,
  Chip,
  CircularProgress,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tab,
  Tabs,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import Dive from "./dive";
import axios from "axios";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import GenerationHistory from "./generation-history";
import robot from "@/public/no-history.json";
import { base64ToFile as base642file } from "file64";
import {
  backEndUrl,
  base64toFile,
  calcCoinGenerate,
  cn,
  groupObjectsByPrompt,
  openaiApi,
  randomInt,
} from "@/lib/utils";
import { usePaginatedQuery } from "convex/react";
import LoadMore from "../load-more";
import { useMediaQuery } from "usehooks-ts";
import ImageEdit from "./image-edit";
import { useLanguage } from "@/hooks/use-language";
import { useEdgeStore } from "@/lib/edgestore";
import { dreamGeneration } from "@/actions/dreamGeneration";
import {
  Aperture,
  Atom,
  Biohazard,
  Box,
  BrainCog,
  CandyCane,
  Donut,
  LucideShieldQuestion,
  Move,
  ScanFace,
} from "lucide-react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Guide from "./guide";
import Image from "next/image";
import { createProdia, faceSwap, image2Image } from "@/actions/prodia";
import Loading from "@/app/loading";
const ImageGenerationMain = () => {
  const generation = useGenerateImage();
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const models = useQuery(api.model.getmodels);
  const update = useMutation(api.user.update);
  const isMobile = useMediaQuery("(max-width:768px)");
  const create = useMutation(api.image.create);

  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImageByOwnUser,
    { userId: user?.id! },
    { initialNumItems: 16 }
  );
  const { language } = useLanguage();
  const images = groupObjectsByPrompt(results);
  const { edgestore } = useEdgeStore();
  const price = calcCoinGenerate(
    generation.imageSize,
    generation.imageNumber,
    generation.isImageInput
  );
  const handleGenerate = async () => {
    generation.setIsLoading(true);
    try {
      if (generation.isImageInput) {
        if (!generation.inputUrl) {
          toast(
            language === "Vietnamese"
              ? "Không có ảnh đầu vào."
              : "No image input found."
          );
        }
        if (generation.model === "dall-e-2") {
          const data = {
            n: generation.imageNumber,
            image_url: generation.inputUrl,
            size: generation.imageSize,
          };
          const res = await axios({
            method: "post",
            url: `${backEndUrl}/generate_image_with_image`,
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
              likes: randomInt(50, 300),
              model: generation.model,
              size: generation.imageSize,
            });
          }
        } else if (generation.model === "prodia") {
          const url = await image2Image(
            generation.prompt,
            generation.negativePrompt,
            generation.inputUrl
          );
          if (url) {
            create({
              prompt: generation.prompt,
              url,
              userId: user?.id!,
              isPublish: generation.publicImage,
              likes: randomInt(50, 300),
              model: generation.model,
              size: generation.imageSize,
            });
          }
        }

        if (!u?.isPro) {
          update({
            id: u?._id!,
            coin: u?.coin! - price,
          });
        }
      } else if (generation.isEdit) {
        if (!generation.maskUrl || !generation.maskInput) {
          toast.error(
            language === "Vietnamese"
              ? "Không thấy ảnh đầu vào."
              : "No image input found."
          );
          return;
        }
        if (generation.model === "dall-e-2") {
          const data = {
            n: generation.imageNumber,
            image_url: generation.maskInput,
            mask: generation.maskUrl,
            prompt: generation.prompt,
            size: generation.imageSize,
          };

          const res = await axios({
            method: "post",
            url: `${backEndUrl}/edit_image`,
            maxBodyLength: Infinity,
            headers: { "Content-Type": "application/json" },
            data,
          });
          for (let index = 0; index < generation.imageNumber; index++) {
            create({
              prompt: generation.prompt,
              url: res.data.data[index],
              negativePrompt: generation.negativePrompt,
              userId: user?.id!,
              isPublish: generation.publicImage,
              likes: randomInt(50, 300),
              model: generation.model,
              size: generation.imageSize,
            });
          }
        } else if (generation.model === "prodia") {
          const url = await faceSwap(generation.maskInput, generation.maskUrl);
          console.log(url);
          if (url) {
            create({
              prompt: generation.prompt,
              url,
              userId: user?.id!,
              isPublish: generation.publicImage,
              likes: randomInt(50, 300),
              model: generation.model,
              size: generation.imageSize,
            });
          }
        }
        if (!u?.isPro) {
          update({
            id: u?._id!,
            coin: u?.coin! - price,
          });
        }
      } else if (generation.model === "bimg") {
        const res = await axios({
          method: "post",
          url: `${backEndUrl}/bing_gen`,
          maxBodyLength: Infinity,
          headers: { "Content-Type": "application/json" },
          data: {
            prompt: generation.prompt,
          },
        });
        const urls: any[] = res.data.images.filter(
          (url: string) => !url.includes(".svg")
        );
        for (let index = 0; index < urls?.length!; index++) {
          create({
            prompt: generation.prompt,
            negativePrompt: generation.negativePrompt,
            url: urls![index],
            userId: user?.id!,
            isPublish: generation.publicImage,
            likes: randomInt(50, 300),
            model: generation.model,
            size: generation.imageSize,
          });
        }
        if (!u?.isPro) {
          update({
            id: u?._id!,
            coin: u?.coin! - price,
          });
        }
      } else if (generation.model === "dream") {
        const res = await dreamGeneration(
          generation.prompt,
          generation.imageSize,
          generation.imageNumber
        );
        if (res?.artifacts) {
          for (let i = 0; i < res.artifacts.length; i++) {
            const file = base64toFile(
              res?.artifacts ? res?.artifacts[i].base64 : ""
            );
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
              });
              if (res.url) {
                create({
                  prompt: generation.prompt,
                  negativePrompt: generation.negativePrompt,
                  url: res.url,
                  userId: user?.id!,
                  isPublish: generation.publicImage,
                  likes: randomInt(50, 500),
                  model: generation.model,
                  size: generation.imageSize,
                });
              }
            }
          }
        }
        if (!u?.isPro) {
          update({
            id: u?._id!,
            coin: u?.coin! - price,
          });
        }
      } else if (generation.model === "imagine") {
        const res = await axios({
          method: "post",
          url: `${backEndUrl}/generate_imagine`,
          maxBodyLength: Infinity,
          headers: { "Content-Type": "application/json" },
          data: {
            prompt: generation.prompt,
            style_id: generation.style,
            negative_prompt: generation.negativePrompt,
          },
        });
        const file = base64toFile(res.data.image_base64);
        if (file) {
          const res = await edgestore.publicFiles.upload({
            file,
          });
          if (res.url) {
            create({
              prompt: generation.prompt,
              url: res.url,
              userId: user?.id!,
              isPublish: generation.publicImage,
              negativePrompt: generation.negativePrompt,
              likes: randomInt(50, 500),
              model: generation.model,
              size: generation.imageSize,
            });
          }
        }
        if (!u?.isPro) {
          update({
            id: u?._id!,
            coin: u?.coin! - price,
          });
        }
      } else if (generation.model === "pro") {
        const generateI = async (model: number) => {
          const response = await axios({
            method: "post",
            url: `${backEndUrl}/img_gen`,
            maxBodyLength: Infinity,
            headers: { "Content-Type": "application/json" },
            data: {
              prompt: generation.prompt,
              model,
            },
          });
          const file = base64toFile(response.data.image_base64);
          if (!file) {
            return null;
          }
          const res = await edgestore.publicFiles.upload({
            file,
          });
          if (!res.url) {
            return null;
          }
          return res.url;
        };
        const promises = [];
        for (let index = 0; index < generation.imageNumber; index++) {
          if (index < 6) {
            promises.push(generateI(index));
          } else {
            promises.push(generateI(index - 6));
          }
        }
        const results = await Promise.all(promises);
        results.forEach((result) => {
          if (result !== null) {
            create({
              prompt: generation.prompt,
              negativePrompt: generation.negativePrompt,
              url: result,
              userId: user?.id!,
              isPublish: generation.publicImage,
              likes: randomInt(500, 1000),
              model: generation.model,
              size: generation.imageSize,
            });
          } else {
            console.error("One or more calls to generateI failed.");
          }
        });
      } else if (generation.model === "animagine") {
        const generateI = async () => {
          const response = await axios({
            method: "post",
            url: `${backEndUrl}/animagine`,
            maxBodyLength: Infinity,
            headers: { "Content-Type": "application/json" },
            data: {
              prompt: generation.prompt,
            },
          });
          const file = await base642file(
            `data:text/plain;base64,${response.data.image_base64}`,
            "file.png"
          );
          if (!file) {
            return null;
          }
          const res = await edgestore.publicFiles.upload({
            file,
          });
          if (!res.url) {
            return null;
          }
          return res.url;
        };
        const promises = [];
        for (let index = 0; index < generation.imageNumber; index++) {
          promises.push(generateI());
        }
        const results = await Promise.all(promises);
        results.forEach((result) => {
          if (result !== null) {
            create({
              prompt: generation.prompt,
              negativePrompt: generation.negativePrompt,
              url: result,
              userId: user?.id!,
              isPublish: generation.publicImage,
              likes: randomInt(500, 1000),
              model: generation.model,
              size: generation.imageSize,
            });
          } else {
            console.error("One or more calls to generateI failed.");
          }
        });
      } else if (generation.model === "prodia") {
        // if (!generation.maskUrl || !generation.maskInput) {
        //   toast.error(
        //     language === "Vietnamese"
        //       ? "Không thấy ảnh đầu vào."
        //       : "No image input found."
        //   );
        // }
        const generateI = async () => {
          const url = await createProdia(
            generation.prompt,
            generation.negativePrompt
          );
          return url;
        };
        const promises = [];
        for (let index = 0; index < generation.imageNumber; index++) {
          promises.push(generateI());
        }
        const results = await Promise.all(promises);
        results.forEach((result) => {
          if (result) {
            create({
              prompt: generation.prompt,
              negativePrompt: generation.negativePrompt,
              url: result,
              userId: user?.id!,
              isPublish: generation.publicImage,
              likes: randomInt(500, 1000),
              model: generation.model,
              size: generation.imageSize,
            });
          } else {
            console.error("One or more calls to generateI failed.");
          }
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
            negativePrompt: generation.negativePrompt,
            url: res.data.data[index].url,
            userId: user?.id!,
            isPublish: generation.publicImage,
            likes: 0,
            model: generation.model,
            size: generation.imageSize,
          });
        }
        if (!u?.isPro) {
          update({
            id: u?._id!,
            coin: u?.coin! - price,
          });
        }
      }
      toast.success(
        language === "Vietnamese"
          ? "Tạo ảnh thành công."
          : "Generated successfully."
      );
    } catch (error) {
      console.log(error);
      toast.error(
        language === "Vietnamese"
          ? "Tạo ảnh không thành công."
          : "Generation Failed."
      );
    } finally {
      generation.setIsLoading(false);
    }
  };
  if (!models) {
    return <Loading />;
  }
  return (
    <div className="sm:pl-64 px-2 pt-6">
      <div className=" flex items-center gap-2">
        <span className=" font-semibold gradient-text sm:text-lg text-xl">
          {language === "Vietnamese"
            ? "Mô hình tạo ảnh bằng AI"
            : "AI Image Generation"}
        </span>
        <Guide />
      </div>

      <div
        className={cn(
          "flex sm:flex-row flex-col items-start gap-3 py-5 sm:pr-10",
          generation.isLoading ? "pointer-events-none" : ""
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
            disabled={generation.isLoading}
            className=" w-full"
            classNames={{
              inputWrapper:
                "dark:bg-slate-900/70 bg-slate-200 rounded-md focus-visible:border-2",

              base: generation.prompt === "" ? "h-12" : "",
            }}
            value={generation.prompt}
            placeholder={
              language === "Vietnamese"
                ? "Nhập mô tả cho bức ảnh của bạn..."
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
            {generation.isLoading ? (
              <CircularProgress size="sm" aria-label="Loading..." />
            ) : language === "Vietnamese" ? (
              "Tạo ảnh"
            ) : (
              "Generate"
            )}{" "}
            {u?.isPro ? null : (
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
            )}
          </div>
        </Button>
      </div>
      <div className="w-full sm:pr-10 flex flex-col gap-3 items-start">
        <Textarea
          disabled={generation.isLoading}
          className={cn(
            " w-full transition-all duration-500 sm:px-0 px-2",
            generation.isNegative
              ? generation.negativePrompt === ""
                ? "sm:h-12 h-14"
                : ""
              : " h-0 opacity-0 pointer-events-none"
          )}
          classNames={{
            inputWrapper:
              "dark:bg-slate-900/70 bg-slate-200 rounded-md focus-visible:border-2",
          }}
          value={generation.negativePrompt}
          onValueChange={generation.setNegativePrompt}
          placeholder={
            language === "Vietnamese"
              ? "Nhập những gì bạn không muốn xuất hiện trong ảnh..."
              : "Type what you dont want to see in the image..."
          }
          isRequired
          maxLength={1000}
        />
        <div className="flex sm:items-center sm:flex-row flex-col gap-3 items-start w-full sm:px-0 px-2 pb-2">
          <Select
            aria-label="a"
            defaultSelectedKeys={[generation.model]}
            value={generation.model}
            startContent={
              <Image
                src={
                  models?.find((f) => f.modelId === generation.model)!.avatar!
                }
                alt="model"
                width={512}
                sizes="(max-width: 768px) 100vw,66vw"
                height={512}
                className="w-8 h-8"
                style={{ objectFit: "cover" }}
              />
            }
            endContent={
              <div className="flex items-center gap-1 text-xs">
                {" "}
                <Move size={15} />{" "}
                <span>
                  {models?.find((f) => f.modelId === generation.model)!.size}
                </span>{" "}
                <Box size={15} />
              </div>
            }
            className={cn("sm:max-w-xs")}
            variant="bordered"
            onChange={(v) => {
              generation.setModel(v.target.value);
              if (v.target.value === "pro") {
                generation.setHd(false);
                generation.setNatural(false);
                generation.setImageInput(false);
              } else if (v.target.value === "bimg") {
                generation.setImageInput(false);
                generation.setImageNumber(4);
                generation.setImageSize("1024x1024");
              } else if (v.target.value === "imagine") {
                generation.setImageInput(false);
                generation.setImageNumber(1);
                generation.setImageSize("512x512");
              }
            }}
            selectionMode="single"
            classNames={{
              label: "sm:text-base text-2xl",
              value: "sm:text-base text-xl",
              selectorIcon: isMobile && "w-5 h-5",
            }}
            placeholder={
              language === "Vietnamese" ? "Chọn mô hình" : "Select Model"
            }
          >
            {models.map((item, index) => (
              <SelectItem
                startContent={
                  <Image
                    src={item.avatar!}
                    alt="model"
                    width={30}
                    sizes="(max-width: 768px) 100vw,66vw"
                    height={30}
                    className="w-8 h-8"
                    style={{ objectFit: "cover" }}
                  />
                }
                key={item.modelId}
                value={item.name}
                classNames={{ title: "sm:text-base text-xl" }}
                endContent={
                  item.isPro ? (
                    <Chip className="bg-gr">Premium</Chip>
                  ) : (
                    <Chip color="success" variant="flat">
                      Free
                    </Chip>
                  )
                }
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
          {generation.model === "imagine" && (
            <Select
              onChange={(v) => generation.setStyle(v.target.value)}
              variant="bordered"
              label={
                <div className="flex items-center gap-1">
                  <span>
                    {language === "Vietnamese" ? "Phong cách" : "Imagine Style"}
                  </span>
                  <Tooltip
                    placement="right"
                    size="sm"
                    delay={100}
                    closeDelay={100}
                    content={
                      <div className="w-40">
                        {language === "Vietnamese"
                          ? "Bằng cách chọn phong cách, bạn hướng dẫn AI tạo hình ảnh có tính thẩm mỹ thị giác cụ thể, mặc định là Anime."
                          : "By choosing a style, you instruct the AI to create images with a specific visual aesthetic, defaulting to Anime."}
                      </div>
                    }
                  >
                    <LucideShieldQuestion className="sm:text-xs text-xl w-4 h-4" />
                  </Tooltip>
                </div>
              }
              className="max-w-[150px]"
            >
              <SelectItem key="21" value="Anime">
                Anime
              </SelectItem>

              <SelectItem
                key="29"
                value={language === "Vietnamese" ? "Chân thực" : "Realistic"}
              >
                {language === "Vietnamese" ? "Chân thực" : "Realistic"}
              </SelectItem>
            </Select>
          )}
          <Switch
            size={!isMobile ? "sm" : "md"}
            className="sm:ml-auto"
            defaultSelected={generation.isNegative}
            onValueChange={generation.setIsNegative}
            classNames={{
              wrapper: generation.isNegative
                ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                : "",
            }}
          >
            {language === "Vietnamese"
              ? "Thêm lời nhắc tiêu cực"
              : "Add Negative Prompt"}
          </Switch>
        </div>
      </div>
      <Tabs
        variant="underlined"
        classNames={{ cursor: "bg-gr" }}
        aria-label="Tabs variants"
        selectedKey={generation.tab}
        onSelectionChange={(v) => generation.setTab(v.toString())}
      >
        <Tab
          key="history"
          title={
            isMobile
              ? language === "Vietnamese"
                ? "Lịch sử"
                : "History"
              : language === "Vietnamese"
              ? "Lịch sử tạo ảnh"
              : "Generation History"
          }
        >
          {images.length < 1 && status !== "LoadingFirstPage" ? (
            <div className="flex items-start ">
              <div className=" w-full h-full sm:max-w-xs relative justify-center flex sm:flex-row flex-col items-center">
                <motion.div
                  whileInView="show"
                  initial="hidden"
                  variants={{
                    hidden: {
                      scaleX: 0,
                      translateX: 0,
                    },
                    show: {
                      scaleX: 1,
                      translateX: isMobile ? "0%" : "80%",
                      transition: {
                        type: "spring",
                        duration: 0.5,
                      },
                    },
                  }}
                  className=" px-5 py-2 absolute sm:right-0 left-0 top-0 rounded-full dark:bg-slate-900 sm:mt-10"
                >
                  <span className="gradient-text sm:text-base text-xl">
                    {language === "Vietnamese"
                      ? "Bạn chưa tạo ảnh nào? Tạo ảnh ngay thôi."
                      : "Doesn't have any images? Let's create one."}
                  </span>
                </motion.div>
                <Lottie
                  className="sm:mt-0 mt-8"
                  animationData={robot}
                  preload=""
                  width={300}
                  height={300}
                />
              </div>{" "}
            </div>
          ) : (
            <GenerationHistory
              user={u!}
              isLoading={generation.isLoading}
              images={images}
            />
          )}

          {status === "CanLoadMore" ? (
            <LoadMore loadMore={() => loadMore(isMobile ? 4 : 12)} />
          ) : null}
        </Tab>
        <Tab
          key="image-input"
          title={
            <div className=" flex gap-2 items-center">
              <span>
                {!isMobile
                  ? language === "Vietnamese"
                    ? "Ảnh từ ảnh."
                    : "Image Input"
                  : language === "Vietnamese"
                  ? "Biến thể"
                  : "Image Input"}
              </span>
              <Chip className="bg-gr" size="sm">
                {language === "Vietnamese" ? "Mới" : "New"}
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
                  ? language === "Vietnamese"
                    ? "Sửa ảnh."
                    : "Image Edit"
                  : language === "Vietnamese"
                  ? "Sửa ảnh"
                  : "Image Edit"}
              </span>
              <Chip className="bg-gr" size="sm">
                Beta
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
