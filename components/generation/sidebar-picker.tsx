"use client";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Badge,
  Link,
  Select,
  SelectItem,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Aperture, Atom, BrainCog, LucideShieldQuestion } from "lucide-react";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import Logo from "../logo";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { useUser } from "@clerk/nextjs";
import CoinControl from "../coin-control";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
const SidebarPicker = () => {
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const sizes = ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];
  const generation = useGenerateImage();
  const isMobile = useMediaQuery("(max-width:768px)");
  const language = useLanguage();

  return (
    <>
      <Link href="/" className="flex items-center gap-1 sm:p-5 p-3">
        {isMobile ? (
          <Image src="/logo.png" width={50} height={50} alt="" />
        ) : (
          <Logo width={50} />
        )}
        <p className="font-bold sm:text-base text-xl gradient-text">
          HeartSteal.Ai
        </p>
      </Link>
      <CoinControl userId={user?.id!} />
      <Divider className="px-5" />
      <Select
        label={
          language.language === "Vietnamese" ? "Mô hình" : "Generate Model"
        }
        defaultSelectedKeys={["dall-e-2"]}
        value={generation.model}
        startContent={
          generation.model === "dall-e-2" ? (
            <Atom className={isMobile ? "w-8 h-8" : ""} />
          ) : generation.model === "dall-e-3" ? (
            <BrainCog className={isMobile ? "w-8 h-8" : ""} />
          ) : (
            <Aperture className={isMobile ? "w-8 h-8" : ""} />
          )
        }
        className={cn("max-w-xs ")}
        variant="underlined"
        onChange={(v) => {
          generation.setModel(v.target.value);
          if (v.target.value === "dall-e-3") {
            generation.setImageNumber(1);
            generation.setHd(false);
            generation.setNatural(false);
            generation.setImageInput(false);
          } else if (v.target.value === "bimg") {
            generation.setImageInput(false);
            generation.setImageNumber(4);
            generation.setImageSize("1024x1024");
          }
        }}
        selectionMode="single"
        classNames={{
          label: "sm:text-base text-2xl",
          value: "sm:text-base text-xl",
          selectorIcon: isMobile && "w-5 h-5",
        }}
        placeholder={
          language.language === "Vietnamese" ? "bạn đã thích" : "Select Model"
        }
      >
        <SelectItem
          startContent={<Atom className={isMobile ? "w-8 h-8" : ""} />}
          key={"dall-e-2"}
          value={"Heart Steal"}
          classNames={{ title: "sm:text-base text-xl" }}
        >
          Heart Steal
        </SelectItem>
        <SelectItem
          classNames={{ title: "sm:text-base text-xl" }}
          startContent={<Aperture className={isMobile ? "w-8 h-8" : ""} />}
          key={"bimg"}
          value={"Heart Bimg"}
          className={cn("max-w-xs ")}
        >
          Heart Steal V2
        </SelectItem>

        <SelectItem
          classNames={{ title: "sm:text-base text-xl" }}
          startContent={
            <Tooltip
              placement="right"
              size="sm"
              delay={100}
              closeDelay={100}
              classNames={{ content: "bg-gr" }}
              content="Premium"
            >
              <BrainCog className={isMobile ? "w-8 h-8" : ""} />
            </Tooltip>
          }
          key={"dall-e-3"}
          value={"Heart Steal Pro"}
          className={cn(
            "max-w-xs ",
            !u?.isPro && " opacity-50 pointer-events-none"
          )}
        >
          Heart Steal Pro
        </SelectItem>
      </Select>
      <Accordion selectionMode="multiple" defaultExpandedKeys={["2", "1"]}>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={
            language.language === "Vietnamese"
              ? "Số lượng ảnh"
              : "Number of Images"
          }
          className="sm:text-xs text-xl"
          classNames={{
            title: "sm:text-xs text-xl font-semibold",
          }}
        >
          <div className=" grid grid-cols-4 gap-3 pr-2 pb-1">
            {Array(9)
              .fill(1, 1, 9)
              .map((_, index) => (
                <div
                  onClick={() => generation.setImageNumber(index)}
                  key={index}
                  className={cn(
                    "sm:w-10 sm:h-7 w-16 h-10 text-xs rounded-[5px] dark:bg-slate-950 bg-slate-200 border-1 border-slate-200 dark:border-white/15 flex items-center justify-center border-gr-hover duration-300 transition-all cursor-pointer",
                    generation.model === "dall-e-3" &&
                      index > 1 &&
                      "pointer-events-none opacity-50",
                    generation.imageNumber === index ? "border-gr" : "",
                    !u?.isPro && index > 5 && "pointer-events-none opacity-50",
                    generation.model === "bimg" &&
                      index !== 4 &&
                      "pointer-events-none opacity-50"
                  )}
                >
                  {index}
                </div>
              ))}
          </div>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title={
            <div className=" flex items-center gap-2 sm:text-xs text-xl">
              {language.language === "Vietnamese"
                ? "Kích thước ảnh"
                : "Image Sizes"}
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={
                  <div className="w-40">
                    {language.language === "Vietnamese"
                      ? "Kích thước cuối cùng của ảnh"
                      : "Final size of the images"}
                  </div>
                }
              >
                <LucideShieldQuestion className="sm:text-xs text-xl" />
              </Tooltip>
            </div>
          }
          classNames={{
            title: "text-xs font-semibold",
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((item, index) => (
              <div
                key={index}
                onClick={() => generation.setImageSize(item)}
                className={cn(
                  "sm:w-20 sm:h-8 w-32 h-10 sm:text-xs text-lg rounded-[5px] dark:bg-slate-950 bg-slate-200 border-1 border-slate-200 dark:border-white/15 flex items-center justify-center border-gr-hover duration-300 transition-all cursor-pointer",
                  generation.model !== "dall-e-3" && index > 2
                    ? "pointer-events-none opacity-50"
                    : "",
                  generation.imageSize === item ? "border-gr" : "",
                  generation.model === "bimg" &&
                    item !== "1024x1024" &&
                    "pointer-events-none opacity-50"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
      <div
        className={cn(
          " flex items-center gap-2 w-full pb-2",
          generation.model !== "dall-e-3"
            ? "opacity-50 pointer-events-none"
            : ""
        )}
      >
        <div className="ml-2 flex items-center gap-2 font-semibold sm:text-xs text-xl">
          <span>
            {language.language === "Vietnamese" ? "Tự nhiên" : "Natural"}
          </span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                {language.language === "Vietnamese"
                  ? "Nếu bật, ảnh của bạn sẽ trông rực rỡ, nếu không ảnh sẽ trông tự nhiên hơn. Thông số này chỉ được hỗ trợ cho Dall-E-3."
                  : " If it&apos;s on, your photo will look vibrant, otherwise it will look more natural. This param is only supported for Dall-E-3."}
              </div>
            }
          >
            <LucideShieldQuestion className="sm:text-xs text-xl" />
          </Tooltip>
        </div>

        <Switch
          size={!isMobile ? "sm" : "lg"}
          className="ml-auto"
          onValueChange={(v) => generation.setNatural(v)}
          classNames={{
            wrapper: generation.natural
              ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
              : "",
          }}
        />
      </div>
      <div
        className={cn(
          " flex items-center gap-2 w-full pb-2 ",
          generation.model !== "dall-e-3"
            ? "opacity-50 pointer-events-none"
            : ""
        )}
      >
        <div className="ml-2 flex items-center gap-2 font-semibold sm:text-xs text-xl">
          <span>HD</span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                {language.language === "Vietnamese"
                  ? "HD tạo ra hình ảnh có độ chi tiết tốt hơn và tính nhất quán cao hơn trên toàn bộ hình ảnh. Thông số này chỉ được hỗ trợ cho Dall-E-3."
                  : "HD creates images with finer details and greater consistency across the image. This param is only supported for Dall-E-3."}
              </div>
            }
          >
            <LucideShieldQuestion className="sm:text-xs text-xl" />
          </Tooltip>
        </div>

        <Switch
          size={!isMobile ? "sm" : "lg"}
          className="ml-auto"
          onValueChange={(v) => generation.setHd(v)}
          classNames={{
            wrapper: generation.hd
              ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
              : "",
          }}
        />
      </div>
      <div className=" flex items-center gap-2 w-full pb-2">
        <div className="ml-2 flex items-center gap-2 font-semibold sm:text-xs text-xl">
          <span>
            {language.language === "Vietnamese"
              ? "Công khai ảnh"
              : "Public Images"}
          </span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                {language.language === "Vietnamese"
                  ? "Công khai sáng tạo của bạn cho Cộng đồng của chúng tôi"
                  : "Public your generation for our Comunity"}
              </div>
            }
          >
            <LucideShieldQuestion className="sm:text-xs text-xl" />
          </Tooltip>
        </div>

        <Switch
          size={!isMobile ? "sm" : "lg"}
          className="ml-auto"
          onValueChange={(v) => generation.setPublicImage(v)}
          classNames={{
            wrapper: generation.publicImage
              ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
              : "",
          }}
        />
      </div>
    </>
  );
};

export default SidebarPicker;
