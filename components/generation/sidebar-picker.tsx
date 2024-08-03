"use client";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Badge,
  Chip,
  Link,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import {
  Aperture,
  ArrowLeftFromLine,
  Atom,
  Biohazard,
  BrainCog,
  CandyCane,
  LucideShieldQuestion,
} from "lucide-react";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import Logo from "../logo";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { useUser } from "@clerk/nextjs";
import CoinControl from "../coin-control";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
const SidebarPicker = () => {
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const sizes = ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];
  const generation = useGenerateImage();
  const isMobile = useMediaQuery("(max-width:768px)");
  const { language } = useLanguage();
  const router = useRouter();
  return (
    <>
      <div className=" flex items-center gap-3 py-3 pl-2">
        <Link href="/ai" className="flex items-center gap-1 ">
          {isMobile ? (
            <Image src="/logo.png" width={50} height={50} alt="" />
          ) : (
            <>
              <Logo width={50} />
            </>
          )}
          <p className="font-bold sm:text-base text-xl gradient-text">
            HeartSteal.Ai
          </p>
        </Link>
        <ArrowLeftFromLine
          size={20}
          onClick={() => router.push("/ai")}
          className=" text-white/40 cursor-pointer"
        />
      </div>

      {/* <CoinControl userId={user?.id!} /> */}
      <Divider className="px-5" />

      <Accordion selectionMode="multiple" defaultExpandedKeys={["2", "1"]}>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={
            language === "Vietnamese" ? "Số lượng ảnh" : "Number of Images"
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
                    " sm:h-7 h-9 text-xs rounded-[5px] dark:bg-slate-950 bg-slate-200 border-1 border-slate-200 dark:border-white/15 flex items-center justify-center border-gr-hover duration-300 transition-all cursor-pointer",

                    generation.imageNumber === index ? "border-gr" : "",
                    !u?.isPro && index > 5 && "pointer-events-none opacity-50",
                    generation.model === "bimg" &&
                      index !== 4 &&
                      "pointer-events-none opacity-50",
                    generation.model === "imagine" &&
                      index !== 1 &&
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
              {language === "Vietnamese" ? "Kích thước ảnh" : "Image Sizes"}
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={
                  <div className="w-40">
                    {language === "Vietnamese"
                      ? "Kích thước cuối cùng của ảnh"
                      : "Final size of the images"}
                  </div>
                }
              >
                <LucideShieldQuestion className="sm:text-xs text-xl w-4 h-4" />
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
                  " sm:h-8 h-9 sm:text-xs text-lg rounded-[5px] dark:bg-slate-950 bg-slate-200 border-1 border-slate-200 dark:border-white/15 flex items-center justify-center border-gr-hover duration-300 transition-all cursor-pointer",
                  generation.imageSize === item && "border-gr",
                  generation.model === "dall-e-2" &&
                    index > 2 &&
                    "pointer-events-none opacity-50",
                  generation.model === "bimg" &&
                    item !== "1024x1024" &&
                    "pointer-events-none opacity-50",
                  generation.model === "imagine" &&
                    item !== "512x512" &&
                    "pointer-events-none opacity-50"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
      <Slider
        color="danger"
        aria-label="a"
        classNames={{ filler: "bg-gr", thumb: "bg-gr", base: "px-2 gap-1" }}
        label={
          <div className=" flex items-center gap-1 sm:text-xs text-xl">
            <span>
              {language === "Vietnamese" ? "Độ bám lệnh" : "Prompt Weight"}
            </span>
            <Tooltip
              placement="right"
              size="sm"
              delay={100}
              closeDelay={100}
              content={
                <div className=" w-40">
                  {language === "Vietnamese"
                    ? "Điểm này giúp tăng độ bám của lệnh gợi ý của bạn."
                    : "This point helps increase the weight of your suggested prompt."}
                </div>
              }
            >
              <LucideShieldQuestion className="sm:text-xs text-xl w-4 h-4 sm:flex hidden" />
            </Tooltip>
          </div>
        }
        step={0.1}
        maxValue={1}
        minValue={0}
        defaultValue={0.4}
        className="pb-2"
      />
      <div className={cn(" flex items-center gap-2 w-full pb-2")}>
        <div className="ml-2 flex items-center gap-2 font-semibold sm:text-xs text-xl">
          <span>{language === "Vietnamese" ? "Tự nhiên" : "Natural"}</span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                {language === "Vietnamese"
                  ? "Nếu bật, ảnh của bạn sẽ trông rực rỡ, nếu không ảnh sẽ trông tự nhiên hơn. Thông số này chỉ được hỗ trợ cho Heart Steal Pro."
                  : " If it's on, your photo will look vibrant, otherwise it will look more natural. This param is only supported for Heart Steal Pro."}
              </div>
            }
          >
            <LucideShieldQuestion className="sm:text-xs text-xl w-4 h-4 sm:flex hidden" />
          </Tooltip>
        </div>

        <Switch
          size={!isMobile ? "sm" : "lg"}
          className={cn(
            "ml-auto",
            generation.model !== "pro" ? "opacity-50 pointer-events-none" : ""
          )}
          onValueChange={(v) => generation.setNatural(v)}
          classNames={{
            wrapper: generation.natural
              ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
              : "",
          }}
        />
      </div>
      <div className={cn(" flex items-center gap-2 w-full pb-2 ")}>
        <div className="ml-2 flex items-center gap-2 font-semibold sm:text-xs text-xl">
          <span>HD</span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                {language === "Vietnamese"
                  ? "HD tạo ra hình ảnh có độ chi tiết tốt hơn và tính nhất quán cao hơn trên toàn bộ hình ảnh. Thông số này chỉ được hỗ trợ cho Heart Steal Pro."
                  : "HD creates images with finer details and greater consistency across the image. This param is only supported for Heart Steal Pro."}
              </div>
            }
          >
            <LucideShieldQuestion className="sm:text-xs text-xl w-4 h-4 sm:flex hidden" />
          </Tooltip>
        </div>

        <Switch
          size={!isMobile ? "sm" : "lg"}
          className={cn(
            "ml-auto",
            generation.model !== "heart-steal-pro"
              ? "opacity-50 pointer-events-none"
              : ""
          )}
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
            {language === "Vietnamese" ? "Công khai ảnh" : "Public Images"}
          </span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                {language === "Vietnamese"
                  ? "Công khai sáng tạo của bạn cho Cộng đồng của chúng tôi"
                  : "Public your generation for our Comunity"}
              </div>
            }
          >
            <LucideShieldQuestion className="sm:text-xs text-xl w-4 h-4 sm:flex hidden" />
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
