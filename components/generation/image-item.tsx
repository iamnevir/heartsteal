import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import { useMutation } from "convex/react";
import {
  ArrowRightLeft,
  Check,
  DownloadCloudIcon,
  EyeIcon,
  EyeOff,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import useDownloader from "react-use-downloader";
const ImageItem = ({ image }: { image: Doc<"image"> }) => {
  const remove = useMutation(api.image.remove);
  const update = useMutation(api.image.update);
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
  const [hover, setHover] = useState(false);
  const handleDelete = async () => {
    try {
      await remove({ id: image._id });
      toast("Deleted Successfully.");
    } catch (error) {
      toast("Deleted Failed.");
    }
  };
  const handlePublic = async () => {
    try {
      await update({ id: image._id, isPublish: !image.isPublish });

      toast(
        image.isPublish
          ? "Unpublished Successfully."
          : "Published Successfully."
      );
    } catch (error) {
      toast("Updated Failed.");
    }
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        " relative  sm:w-[290px] sm:h-[390px] w-full h-[390px] cursor-pointer",
        image.size === "512x512" ? "sm:h-[290px] h-[390px]" : ""
      )}
    >
      <Image
        className="rounded-md"
        alt=""
        placeholder="blur"
        blurDataURL="/logo.png"
        src={image.url}
        fill
        priority
        sizes="(max-width: 768px) 100vw,66vw"
        style={{ objectFit: "cover" }}
      />
      <Tooltip size="sm" delay={100} closeDelay={100} content="Public image">
        <div
          onClick={handlePublic}
          className=" w-8 h-8 flex group hover:scale-105 items-center cursor-pointer justify-center bg-transparent backdrop-blur-lg absolute right-2 top-2 rounded-full"
        >
          {image.isPublish ? (
            <EyeIcon className="w-4 h-4 group-hover:rotate-180 duration-300" />
          ) : (
            <EyeOff className="w-4 h-4 group-hover:rotate-180 duration-300" />
          )}
        </div>
      </Tooltip>
      <Tooltip size="sm" delay={100} closeDelay={100} content="Download image">
        <div
          onClick={() => download(image.url, "hearsteal.png")}
          className={cn(
            " w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-transparent backdrop-blur-lg absolute right-12 bottom-2 rounded-full",
            hover
              ? "opacity-100 translate-x-0"
              : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
          )}
        >
          <DownloadCloudIcon className="w-4 h-4" />
        </div>
      </Tooltip>
      <Tooltip size="sm" delay={100} closeDelay={100} content="Delete image">
        <div
          onClick={handleDelete}
          className={cn(
            " w-8 h-8 flex hover:scale-105 items-center duration-300 cursor-pointer justify-center bg-transparent backdrop-blur-lg absolute right-2 bottom-2 rounded-full",
            hover
              ? "opacity-100 translate-x-0"
              : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
          )}
        >
          <Trash2 className="w-4 h-4" />
        </div>
      </Tooltip>
      <Tooltip
        size="sm"
        delay={100}
        closeDelay={100}
        content="Use this image like an input"
      >
        <div
          className={cn(
            " w-8 h-8 flex hover:scale-105 items-center duration-700 cursor-pointer justify-center bg-transparent backdrop-blur-lg absolute right-20 mr-2 bottom-2 rounded-full",
            hover
              ? "opacity-100 translate-x-0"
              : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
          )}
        >
          <ArrowRightLeft className="w-4 h-4" />
        </div>
      </Tooltip>
      <Tooltip size="sm" delay={100} closeDelay={100} content="Select image">
        <div
          className={cn(
            " w-8 h-8 flex hover:scale-105 items-center duration-300 cursor-pointer justify-center bg-transparent backdrop-blur-lg absolute left-2 top-2 rounded-full",
            hover
              ? "opacity-100 translate-x-0"
              : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
          )}
        >
          <Check className="w-4 h-4" />
        </div>
      </Tooltip>
    </div>
  );
};

export default ImageItem;
