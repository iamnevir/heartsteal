import { Doc } from "@/convex/_generated/dataModel";

import HistoryByPrompt from "./history-by-promt";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { ArrowUpCircle, Image as Img, Move } from "lucide-react";
import { cn, formatVietnameseDate } from "@/lib/utils";
import { CircularProgress, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CountUp from "react-countup";

const GenerationHistory = ({
  images,
  user,
}: {
  images: Doc<"image">[][];
  user: Doc<"user">;
}) => {
  const generation = useGenerateImage();
  const date = new Date();
  const models = useQuery(api.model.getmodels);
  return (
    <div className=" w-full h-full">
      {generation.isLoading && (
        <>
          <div className=" flex py-2 items-center sm:justify-between text-xs">
            <div className="xl:max-w-[50vw] lg:max-w-[40vw] md:max-w-[20vw] max-w-[0px] truncate">
              {generation.prompt}
            </div>
            <div className=" flex items-center gap-5">
              <span>{formatVietnameseDate(date.getTime())}</span>

              <div
                className={cn(
                  " w-8 h-8 flex  items-center cursor-pointer justify-center bg-slate-200 dark:bg-slate-950 backdrop-blur-lg rounded-sm"
                )}
              >
                <ArrowUpCircle className="w-5 h-5" />
              </div>

              <div className="md:flex hidden items-center gap-1 ">
                <div className="md:flex hidden items-center gap-1 ">
                  <Image
                    src={
                      models?.find((f) => f.modelId === generation.model)
                        ?.avatar!
                    }
                    alt=""
                    width={512}
                    sizes="(max-width: 768px) 100vw,66vw"
                    height={512}
                    className="w-7 h-7"
                    style={{ objectFit: "cover" }}
                  />
                  {models?.find((f) => f.modelId === generation.model)?.name}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Img className="w-4 h-4" />
                {generation.imageNumber}
              </div>
              <div className="flex items-center gap-1">
                <Move className="w-4 h-4" />
                {generation.imageSize}
              </div>
            </div>
          </div>
          <div className=" grid xl:grid-cols-4 lg:grid-cols-3 gap-4 md:grid-cols-2">
            {Array(generation.imageNumber)
              .fill(0)
              .map((i, ind) => (
                <div
                  key={ind}
                  className={cn(
                    " rounded-lg relative",
                    generation.imageSize === "512x512"
                      ? "sm:h-[290px] h-[370px]"
                      : "h-[370px]"
                  )}
                >
                  <CircularProgress
                    color="default"
                    size="sm"
                    className="absolute left-2 top-2 z-10"
                    aria-label="Loading..."
                  />
                  <span className=" absolute left-4 text-xs top-12 z-10">
                    <CountUp
                      end={500}
                      duration={3000}
                      separator="."
                      decimals={2}
                    />
                  </span>
                  <Skeleton
                    className={cn(
                      " rounded-lg absolute w-full",
                      generation.imageSize === "512x512"
                        ? "sm:h-[290px] h-[370px]"
                        : "h-[370px]"
                    )}
                  />
                  <Image
                    src="/placeholder.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw,66vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
      {images.map((item, index) => (
        <HistoryByPrompt user={user} key={index} item={item} />
      ))}
    </div>
  );
};

export default GenerationHistory;
