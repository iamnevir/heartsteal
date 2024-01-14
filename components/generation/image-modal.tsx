import { Doc, Id } from "@/convex/_generated/dataModel";
import { useLanguage } from "@/hooks/use-language";
import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  Tooltip,
  cn,
} from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRightLeft,
  DownloadCloudIcon,
  Expand,
  EyeIcon,
  EyeOff,
  ImageOff,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import saveAs from "file-saver";
import ConfirmModal from "../confirm-modal";
import { useState } from "react";
import { backEndUrl, base64toFile } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgestore";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { upscaleImage } from "@/actions/dreamGeneration";
const ImageModal = ({
  isOpenModal,
  items,
  onCloseModal,
  index,
  isPro,
}: {
  isOpenModal: boolean;
  items: Doc<"image">[];
  onCloseModal: () => void;
  index: number;
  isPro?: boolean;
}) => {
  const { user } = useUser();
  const { language } = useLanguage();
  const generation = useGenerateImage();
  const remove = useMutation(api.image.remove);
  const create = useMutation(api.image.create);
  const update = useMutation(api.image.update);
  const { edgestore } = useEdgeStore();
  const [isOpen, setIsOpen] = useState<{
    open: boolean;
    id: Id<"image"> | null;
  }>({ open: false, id: null });
  const handleDelete = async (id?: Id<"image">) => {
    try {
      if (!id) {
        return;
      }
      await remove({ id });
      onCloseModal();
      setIsOpen({ open: false, id: null });
      toast.success(
        language === "Vietnamese" ? "Xóa thành công." : "Deleted Successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese" ? "Xóa không thành công." : "Deleted Failed."
      );
    }
  };
  const handlePublic = async (image: Doc<"image">) => {
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
  const downloadImage = async (image: Doc<"image">) => {
    saveAs(image.url, "heartsteal.png");
  };
  const handleUpscale = async (image: Doc<"image">) => {
    onCloseModal();
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
        url: `${backEndUrl}/generation/imagine_upscale`,
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
        url: `${backEndUrl}/generation/rm_bg`,
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
        isOpen={isOpen.open}
        onClose={() => setIsOpen({ open: false, id: null })}
        handleDelete={() => handleDelete(isOpen.id ? isOpen.id : undefined)}
      />
      <Modal
        hideCloseButton
        placement="center"
        backdrop="blur"
        size="2xl"
        onOpenChange={onCloseModal}
        isOpen={isOpenModal}
      >
        <ModalContent className=" sm:scale-100 scale-110 overflow-auto  bg-transparent">
          <ModalBody className=" overflow-auto rounded-md sm:p-14">
            <Carousel
              opts={{
                startIndex: index,
                align: "start",
                loop: true,
              }}
              className=" relative z-[99999]"
            >
              <CarouselContent>
                {items.map((item, i) => (
                  <CarouselItem key={i}>
                    <Card>
                      <CardBody>
                        <Image
                          src={item.url}
                          className={"rounded-md"}
                          alt=""
                          placeholder="blur"
                          blurDataURL="/placeholder.png"
                          sizes="(max-width: 768px) 100vw,66vw"
                          width={512}
                          height={512}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </CardBody>
                      <CardFooter className=" gap-3 justify-end">
                        <Tooltip
                          size="sm"
                          delay={100}
                          closeDelay={100}
                          content={
                            language === "Vietnamese"
                              ? "Xóa nền"
                              : "Remove Background"
                          }
                        >
                          <div
                            onClick={() => handleRemoveBG(item)}
                            className={cn(
                              " w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full"
                            )}
                          >
                            <ImageOff className="w-4 h-4" />
                          </div>
                        </Tooltip>
                        <Tooltip
                          size="sm"
                          delay={100}
                          closeDelay={100}
                          content={
                            language === "Vietnamese"
                              ? "Tăng độ phân giải"
                              : "Upscale"
                          }
                        >
                          <div
                            onClick={() => handleUpscale(item)}
                            className=" w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full"
                          >
                            <Expand className="w-4 h-4" />
                          </div>
                        </Tooltip>
                        <Tooltip
                          size="sm"
                          delay={100}
                          closeDelay={100}
                          content={
                            item.isPublish
                              ? language === "Vietnamese"
                                ? "Hủy công khai"
                                : "Unpublic image"
                              : language === "Vietnamese"
                              ? "Công khai ảnh"
                              : "Public image"
                          }
                        >
                          <div
                            onClick={() => handlePublic(item)}
                            className=" w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full"
                          >
                            {item.isPublish ? (
                              <EyeIcon className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </div>
                        </Tooltip>
                        <Tooltip
                          size="sm"
                          delay={100}
                          closeDelay={100}
                          content={
                            language === "Vietnamese"
                              ? "Tải xuống"
                              : "Download image"
                          }
                        >
                          <div
                            onClick={() => downloadImage(item)}
                            className={cn(
                              " w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full"
                            )}
                          >
                            <DownloadCloudIcon className="w-4 h-4" />
                          </div>
                        </Tooltip>
                        <Tooltip
                          size="sm"
                          delay={100}
                          closeDelay={100}
                          content={
                            language === "Vietnamese"
                              ? "Xóa ảnh"
                              : "Delete image"
                          }
                        >
                          <div
                            onClick={() =>
                              setIsOpen({ open: true, id: item._id })
                            }
                            className={cn(
                              " w-8 h-8 flex hover:scale-105 items-center duration-500 cursor-pointer justify-center bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg  rounded-full"
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
                            onClick={() => generation.setInputUrl(item.url)}
                            className={cn(
                              " w-8 h-8 flex hover:scale-105 items-center duration-500 cursor-pointer justify-cente bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg rounded-full"
                            )}
                          >
                            <ArrowRightLeft className="w-4 h-4 ml-2" />
                          </div>
                        </Tooltip>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="  z-[99999]" />
              <CarouselNext />
            </Carousel>
          </ModalBody>
        </ModalContent>
      </Modal>{" "}
    </>
  );
};

export default ImageModal;
