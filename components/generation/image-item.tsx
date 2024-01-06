import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useLanguage } from "@/hooks/use-language";
import { cn, openaiApi } from "@/lib/utils";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { saveAs } from "file-saver";
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
import axios from "axios";
import ConfirmModal from "../confirm-modal";
const ImageItem = ({ image }: { image: Doc<"image"> }) => {
  const remove = useMutation(api.image.remove);
  const update = useMutation(api.image.update);
  const generation = useGenerateImage();
  const [hover, setHover] = useState(false);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = async () => {
    try {
      await remove({ id: image._id });
      toast.success(
        language === "Vietnamese" ? "Xóa thành công." : "Deleted Successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese" ? "Xóa không thành công." : "Deleted Failed."
      );
    }
    onClose();
  };
  const handlePublic = async () => {
    try {
      await update({ id: image._id, isPublish: !image.isPublish });

      toast.success(
        image.isPublish
          ? language === "Vietnamese"
            ? "Đã hủy công khai"
            : "Unpublished Successfully."
          : language === "Vietnamese"
          ? "Đã công khai"
          : "Published Successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese" ? "Cập nhật bị hủy." : "Updated Failed."
      );
    }
  };
  const downloadImage = async () => {
    if (image.model === "bimg") {
      saveAs(image.url, "heartsteal.png");
    } else {
    }
  };
  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          " relative  sm:w-[290px] sm:h-[290px] w-full cursor-pointer overflow-hidden",
          image.size === "1024x1792" ? "sm:h-[450px]" : "h-[370px]"
        )}
      >
        <Image
          className={"rounded-md"}
          alt=""
          placeholder="blur"
          blurDataURL="/placeholder.png"
          src={image.url}
          sizes="(max-width: 768px) 100vw,66vw"
          width={512}
          height={512}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <Tooltip
          size="sm"
          delay={100}
          closeDelay={100}
          content={
            image.isPublish
              ? language === "Vietnamese"
                ? "Hủy công khai"
                : "Unpublic image"
              : language === "Vietnamese"
              ? "Công khai ảnh"
              : "Public image"
          }
        >
          <div
            onClick={handlePublic}
            className=" w-8 h-8 flex group hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-2 top-2 rounded-full"
          >
            {image.isPublish ? (
              <EyeIcon className="w-4 h-4 group-hover:rotate-180 duration-300" />
            ) : (
              <EyeOff className="w-4 h-4 group-hover:rotate-180 duration-300" />
            )}
          </div>
        </Tooltip>
        <Tooltip
          size="sm"
          delay={100}
          closeDelay={100}
          content={language === "Vietnamese" ? "Tải xuống" : "Download image"}
        >
          <div
            onClick={downloadImage}
            className={cn(
              " w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-12 bottom-2 rounded-full",
              hover
                ? "opacity-100 translate-x-0"
                : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
            )}
          >
            <DownloadCloudIcon className="w-4 h-4" />
          </div>
        </Tooltip>
        <Tooltip
          size="sm"
          delay={100}
          closeDelay={100}
          content={language === "Vietnamese" ? "Xóa ảnh" : "Delete image"}
        >
          <div
            onClick={onOpen}
            className={cn(
              " w-8 h-8 flex hover:scale-105 items-center duration-300 cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-2 bottom-2 rounded-full",
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
          content={
            language === "Vietnamese"
              ? "Dùng ảnh làm đầu vào"
              : "Use this image like an input"
          }
        >
          <div
            onClick={() => generation.setInputUrl(image.url)}
            className={cn(
              " w-8 h-8 flex hover:scale-105 items-center duration-700 cursor-pointer justify-cente bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-20 mr-2 bottom-2 rounded-full",
              hover
                ? "opacity-100 translate-x-0"
                : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
            )}
          >
            <ArrowRightLeft className="w-4 h-4 ml-2" />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default ImageItem;
