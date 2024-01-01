"use client";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Link,
  Select,
  SelectItem,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { BrainCog, ShieldAlert, TrainFront } from "lucide-react";
import Image from "next/image";
import { useGenerateImage } from "@/hooks/use-generate-picker";
const SidebarPicker = () => {
  const sizes = ["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"];
  const generation = useGenerateImage();
  return (
    <div className="fixed z-[99] w-56 h-full hidden sm:flex flex-col gap-1 items-start overflow-y-auto border-r border-white/65 px-2">
      <Link href="/" className="flex items-center gap-1 p-5">
        <Image
          src="/logo.png"
          alt=""
          priority
          width={50}
          height={20}
          style={{ width: "auto", objectFit: "cover" }}
        />
        <p className="font-bold sm:flex hidden gradient-text">HeartSteal.Ai</p>
      </Link>
      <Divider className="px-5" />
      <Select
        label="Generate Model"
        defaultSelectedKeys={["dall-e-2"]}
        value={generation.model}
        startContent={
          generation.model === "dall-e-2" ? (
            <TrainFront />
          ) : generation.model === "dall-e-3" ? (
            <BrainCog />
          ) : null
        }
        className="max-w-xs"
        variant="underlined"
        onChange={(v) => {
          generation.setModel(v.target.value);
          if (v.target.value === "dall-e-3") {
            generation.setImageNumber(1);
            generation.setHd(false);
            generation.setNatural(false);
            generation.setImageInput(false);
          }
        }}
        selectionMode="single"
        placeholder="Select Model"
      >
        <SelectItem
          startContent={<TrainFront />}
          key={"dall-e-2"}
          value={"Heart Steal"}
        >
          Heart Steal
        </SelectItem>
        <SelectItem
          startContent={<BrainCog />}
          key={"dall-e-3"}
          value={"Heart Steal Pro"}
        >
          Heart Steal Pro
        </SelectItem>
      </Select>
      <Accordion selectionMode="multiple" defaultExpandedKeys={["2", "1"]}>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Number of Images"
          className="text-xs"
          classNames={{
            title: "text-xs font-semibold",
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
                    "w-10 h-7 text-xs rounded-[5px] dark:bg-slate-950 bg-slate-200 border-1 border-slate-200 dark:border-white/15 flex items-center justify-center border-gr-hover duration-300 transition-all cursor-pointer",
                    generation.model === "dall-e-3" && index > 1
                      ? "pointer-events-none opacity-50"
                      : "",
                    generation.imageNumber === index ? "border-gr" : ""
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
            <div className=" flex items-center gap-2">
              Image Sizes
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={<div className="w-40">Final size of the images</div>}
              >
                <ShieldAlert size="20" />
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
                  "w-20 h-8 text-xs rounded-[5px] dark:bg-slate-950 bg-slate-200 border-1 border-slate-200 dark:border-white/15 flex items-center justify-center border-gr-hover duration-300 transition-all cursor-pointer",
                  generation.model !== "dall-e-3" && index > 2
                    ? "pointer-events-none opacity-50"
                    : "",
                  generation.imageSize === item ? "border-gr" : ""
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
        <div className="ml-2 flex items-center gap-2 font-semibold text-xs">
          <span>Natural</span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                If it&apos;s on, your photo will look vibrant, otherwise it will
                look more natural. This param is only supported for Dall-E-3.
              </div>
            }
          >
            <ShieldAlert size="20" />
          </Tooltip>
        </div>

        <Switch
          size="sm"
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
          " flex items-center gap-2 w-full pb-2",
          generation.model !== "dall-e-3"
            ? "opacity-50 pointer-events-none"
            : ""
        )}
      >
        <div className="ml-2 flex items-center gap-2 font-semibold text-xs">
          <span>HD</span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                HD creates images with finer details and greater consistency
                across the image. This param is only supported for Dall-E-3.
              </div>
            }
          >
            <ShieldAlert size="20" />
          </Tooltip>
        </div>

        <Switch
          size="sm"
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
        <div className="ml-2 flex items-center gap-2 font-semibold text-xs">
          <span>Public Images</span>
          <Tooltip
            placement="right"
            size="sm"
            delay={100}
            closeDelay={100}
            content={
              <div className=" w-40">
                Public your generation for our Comunity
              </div>
            }
          >
            <ShieldAlert size="20" />
          </Tooltip>
        </div>

        <Switch
          size="sm"
          className="ml-auto"
          onValueChange={(v) => generation.setPublicImage(v)}
          classNames={{
            wrapper: generation.publicImage
              ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
              : "",
          }}
        />
      </div>
    </div>
  );
};

export default SidebarPicker;
