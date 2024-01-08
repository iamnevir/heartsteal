import { Doc } from "@/convex/_generated/dataModel";

import HistoryByPrompt from "./history-by-promt";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import {
  Aperture,
  ArrowUpCircle,
  Atom,
  BrainCog,
  Image as Img,
  Move,
} from "lucide-react";
import { cn, formatVietnameseDate } from "@/lib/utils";
import { CircularProgress, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const GenerationHistory = ({
  images,
  isLoading,
  user,
}: {
  images: Doc<"image">[][];
  isLoading: boolean;
  user: Doc<"user">;
}) => {
  const generation = useGenerateImage();
  const date = new Date();
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isLoading) {
      const startTime = new Date().getTime();

      timerId = setInterval(() => {
        const currentTime = new Date().getTime();
        const seconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedSeconds(seconds);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isLoading]);
  return (
    <div className=" w-full h-full">
      {isLoading && (
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
                {generation.model === "dall-e-2" ? (
                  <>
                    {" "}
                    <Atom className="w-4 h-4" />
                    <span>Heart Steal</span>
                  </>
                ) : generation.model === "dall-e-3" ? (
                  <>
                    <BrainCog className="w-4 h-4" />
                    <span>Heart Steal Pro</span>
                  </>
                ) : (
                  <>
                    <Aperture className="w-4 h-4" />
                    <span>Heart Steal V2</span>
                  </>
                )}
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
                    " rounded-lg relative sm:w-[290px] w-[370px]",
                    generation.imageSize === "512x512"
                      ? "sm:h-[290px] h-[370px]"
                      : "h-[390px]"
                  )}
                >
                  <CircularProgress
                    color="default"
                    size="sm"
                    className="absolute left-2 top-2 z-10"
                    aria-label="Loading..."
                  />
                  <span className=" absolute left-4 text-xs top-12 z-10">
                    {elapsedSeconds}s
                  </span>
                  <Skeleton
                    className={cn(
                      " rounded-lg absolute sm:w-[290px] w-[370px]",
                      generation.imageSize === "512x512"
                        ? "sm:h-[290px] h-[370px]"
                        : "h-[390px]"
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
