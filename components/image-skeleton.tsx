import { Skeleton } from "@nextui-org/react";

const ImageSkeleton = () => {
  return (
    <div className=" grid xl:grid-cols-5 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4 mt-4 gap-4">
      <div className="flex flex-col gap-4">
        <Skeleton className=" rounded-lg w-full sm:w-[240px] h-[390px]" />
        <Skeleton className="rounded-lg w-full sm:w-[240px] h-[290px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-[240px] h-[290px]" />
        <Skeleton className="rounded-lg w-[240px] h-[390px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-[240px] h-[390px]" />
        <Skeleton className="rounded-lg w-[240px] h-[290px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-[240px] h-[290px]" />
        <Skeleton className="rounded-lg w-[240px] h-[390px]" />
      </div>
      <div className="sm:flex hidden flex-col gap-4">
        <Skeleton className="rounded-lg w-[240px] h-[390px]" />
        <Skeleton className="rounded-lg w-[240px] h-[290px]" />
      </div>
    </div>
  );
};

export default ImageSkeleton;
