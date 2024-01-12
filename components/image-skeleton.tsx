import { cn } from "@/lib/utils";
import { Skeleton, SliderValue } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";

const ImageSkeleton = ({ grid }: { grid: SliderValue }) => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  return (
    <div
      className={cn(
        " grid  gap-4 sm:pr-2 py-2 sm:py-10",
        grid === 1
          ? "grid-cols-1"
          : grid === 2
          ? "grid-cols-2"
          : grid === 3
          ? "grid-cols-3"
          : grid === 4
          ? "grid-cols-4"
          : "xl:grid-cols-5 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4",
        isMobile && "grid-cols-1"
      )}
    >
      <div className="flex flex-col gap-4">
        <Skeleton className=" rounded-lg w-full sm:w-full h-[390px]" />
        <Skeleton className="rounded-lg w-full sm:w-full h-[290px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-full h-[290px]" />
        <Skeleton className="rounded-lg w-full h-[390px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-full h-[390px]" />
        <Skeleton className="rounded-lg w-full h-[290px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-full h-[290px]" />
        <Skeleton className="rounded-lg w-full h-[390px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-full h-[390px]" />
        <Skeleton className="rounded-lg w-full h-[290px]" />
      </div>
    </div>
  );
};

export default ImageSkeleton;
