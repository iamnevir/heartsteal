import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useLanguage } from "@/hooks/use-language";
import { backEndUrl, base64toFile, cn } from "@/lib/utils";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { saveAs } from "file-saver";
import { useMutation } from "convex/react";
import {
  ArrowRightLeft,
  Check,
  DownloadCloudIcon,
  Expand,
  EyeIcon,
  EyeOff,
  ImageOff,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "../confirm-modal";
import axios from "axios";
import { useEdgeStore } from "@/lib/edgestore";
import { useUser } from "@clerk/nextjs";
const ImageItem = ({
  index,
  image,
  openModal,
  isPro,
}: {
  index: number;
  image: Doc<"image">;
  openModal: ({ o, i }: { o: boolean; i: number }) => void;
  isPro?: boolean;
}) => {
  const { user } = useUser();
  const remove = useMutation(api.image.remove);
  const create = useMutation(api.image.create);
  const update = useMutation(api.image.update);
  const generation = useGenerateImage();
  const [hover, setHover] = useState(false);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { edgestore } = useEdgeStore();
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
    saveAs(image.url, "heartsteal.png");
  };
  const handleUpscale = async (image: Doc<"image">) => {
    if (!isPro) {
      toast.error(
        language === "Vietnamese"
          ? "Hãy nâng cấp Premium để sử dụng."
          : "Upgrade to Professor to use."
      );

      return;
    }
    generation.setIsLoading(true);

    try {
      const res = await axios({
        method: "post",
        url: `${backEndUrl}/imagine_upscale`,
        maxBodyLength: Infinity,
        headers: { "Content-Type": "application/json" },
        data: {
          url: image.url,
        },
      });
      const file = base64toFile(res.data.image_base64);
      if (file) {
        const imageRes = await edgestore.publicFiles.upload({
          file,
        });
        if (imageRes.url) {
          create({
            prompt: `${image._id}-upscale`,
            url: imageRes.url,
            userId: user?.id!,
            isPublish: image.isPublish,
            likes: 0,
            model: "imagine",
            size: image.size === "512x512" ? "1024x1024" : "2048x2048",
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      generation.setIsLoading(false);
    }
  };
  const handleRemoveBG = async (image: Doc<"image">) => {
    if (!isPro) {
      toast.error(
        language === "Vietnamese"
          ? "Hãy nâng cấp Premium để sử dụng."
          : "Upgrade to Professor to use."
      );

      return;
    }
    generation.setIsLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: `${backEndUrl}/rm_bg`,
        maxBodyLength: Infinity,
        headers: { "Content-Type": "application/json" },
        data: {
          url: image.url,
        },
      });
      const file = base64toFile(res.data.image_base64);
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });
        if (res.url) {
          create({
            prompt: `${image._id} remove background`,
            url: res.url,
            userId: user?.id!,
            isPublish: image.isPublish,
            likes: 0,
            model: image.model,
            size: image.size,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      generation.setIsLoading(false);
    }
  };
  return (
    <>
      <ConfirmModal
        title={
          language === "Vietnamese"
            ? "Xác nhận xóa ảnh này?"
            : "Confirm delete this photo?"
        }
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
          onClick={() => openModal({ o: true, i: index })}
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
          content={language === "Vietnamese" ? "Xóa nền" : "Remove Background"}
        >
          <div
            onClick={() => handleRemoveBG(image)}
            className={cn(
              " absolute bottom-2 right-36 mr-5 w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full",
              hover
                ? "opacity-100 translate-x-0"
                : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
            )}
          >
            <ImageOff className="w-4 h-4" />
          </div>
        </Tooltip>
        <Tooltip
          size="sm"
          delay={100}
          closeDelay={100}
          content={language === "Vietnamese" ? "Tăng độ phân giải" : "Upscale"}
        >
          <div
            onClick={() => handleUpscale(image)}
            className={cn(
              " absolute bottom-2 right-28 mr-4 w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full",
              hover
                ? "opacity-100 translate-x-0"
                : "sm:opacity-0 sm:translate-x-5 sm:pointer-events-none"
            )}
          >
            <Expand className="w-4 h-4" />
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
              " w-8 h-8 flex hover:scale-105 items-center duration-500 cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-2 bottom-2 rounded-full",
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
              " w-8 h-8 flex hover:scale-105 items-center duration-500 cursor-pointer justify-cente bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-20 mr-2 bottom-2 rounded-full",
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
