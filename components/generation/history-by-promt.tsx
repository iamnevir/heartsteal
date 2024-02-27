import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import ImageItem from "./image-item";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Snippet,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  cn,
  formatVietnameseDate,
  formatVietnameseDateTime,
} from "@/lib/utils";
import {
  Aperture,
  ArrowUpCircle,
  Atom,
  BrainCog,
  Eye,
  EyeOff,
  Image as Img,
  MoreHorizontal,
  Move,
  Trash2,
} from "lucide-react";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { Doc } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";
import ConfirmModal from "../confirm-modal";
import ImageModal from "./image-modal";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";

const HistoryByPrompt = ({
  item,
  user,
}: {
  item: Doc<"image">[];
  user: Doc<"user">;
}) => {
  const generation = useGenerateImage();
  const removeAll = useMutation(api.image.removeAll);
  const updateAll = useMutation(api.image.updateAll);
  const models = useQuery(api.model.getmodels);
  const { language } = useLanguage();
  const { edgestore } = useEdgeStore();
  const handleDeleteAll = async () => {
    try {
      const ids = item.map((i) => i._id);
      await removeAll({ id: ids });
      toast.success(
        language === "Vietnamese"
          ? "Xóa tất cả thành công."
          : "Removed All Successfully."
      );
      for (let index = 0; index < item.length; index++) {
        await edgestore.publicFiles.delete({ url: item[index].url });
      }
    } catch (error) {
      toast.error(
        language === "Vietnamese"
          ? "Xóa tất cả không thành công."
          : "Remove Failed."
      );
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setIsOpen] = useState<{
    open: boolean;
    index: number;
  }>({ open: false, index: 0 });
  const handlePublished = async () => {
    try {
      const ids = item.map((i) => i._id);
      await updateAll({ id: ids, isPublish: true });
      toast.success(
        language === "Vietnamese"
          ? "Đã công khai tất cả."
          : "Published All Successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese"
          ? "Công khai không thành công."
          : "Publish Failed."
      );
    }
  };
  const handleUnPublished = async () => {
    try {
      const ids = item.map((i) => i._id);
      await updateAll({ id: ids, isPublish: false });
      toast.success(
        language === "Vietnamese"
          ? "Đã hủy công khai tất cả."
          : "UnPublished All Successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese"
          ? "Hủy công khai không thành công."
          : "UnPublish Failed."
      );
    }
  };

  return (
    <>
      <ImageModal
        index={open.index}
        isPro={user.isPro}
        onCloseModal={() => setIsOpen({ open: false, index: 0 })}
        isOpenModal={open.open}
        items={item}
      />
      <ConfirmModal
        title={
          language === "Vietnamese"
            ? "Xác nhận xóa những ảnh này?"
            : "Confirm delete these photos?"
        }
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => {
          handleDeleteAll();
          onClose();
        }}
      />
      <div className=" flex py-2 items-center sm:justify-between text-xs">
        <Tooltip
          size="sm"
          delay={100}
          closeDelay={100}
          content={<div className=" w-60">{item[0].prompt}</div>}
        >
          <div className="xl:max-w-[45vw] lg:max-w-[35vw] md:max-w-[15vw] max-w-[0px] truncate">
            {item[0].prompt}
          </div>
        </Tooltip>

        <div className=" flex items-center gap-5 sm:justify-normal justify-between sm:w-fit w-full">
          <Tooltip
            size="sm"
            delay={100}
            closeDelay={100}
            content={formatVietnameseDateTime(item[0]._creationTime)}
          >
            <span className=" whitespace-nowrap">
              {formatVietnameseDate(item[0]._creationTime)}
            </span>
          </Tooltip>
          <>
            <Tooltip
              size="sm"
              delay={100}
              closeDelay={100}
              content={
                language === "Vietnamese" ? "Dùng lại prompt" : "Reuse Prompt"
              }
            >
              <div
                className={cn(
                  " w-8 h-8 flex  items-center cursor-pointer justify-center bg-slate-200 dark:bg-slate-950 backdrop-blur-lg rounded-sm"
                )}
              >
                <ArrowUpCircle
                  onClick={() => {
                    generation.setPrompt(item[0].prompt!);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-5 h-5  hover:scale-105"
                />
              </div>
            </Tooltip>
            <div className="md:flex hidden items-center gap-1 ">
              <Image
                src={models?.find((f) => f.modelId === item[0].model)?.avatar!}
                alt=""
                width={512}
                sizes="(max-width: 768px) 100vw,66vw"
                height={512}
                className="w-7 h-7"
                style={{ objectFit: "cover" }}
              />
              {models?.find((f) => f.modelId === item[0].model)?.name}
            </div>
            <div className="flex items-center gap-1">
              <Img className="w-4 h-4" />
              {item.length}
            </div>
            <div className="flex items-center gap-1">
              <Move className="w-4 h-4" />
              {item[0].size}
            </div>
            <Dropdown placement="bottom">
              <DropdownTrigger>
                <MoreHorizontal className="w-5 h-5 cursor-pointer" />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  onPress={handleUnPublished}
                  key="private-all"
                  startContent={<EyeOff className=" w-4 h-4" />}
                >
                  {language === "Vietnamese"
                    ? "Hủy công khai tất cả"
                    : "Private All"}
                </DropdownItem>
                <DropdownItem
                  key="public-all"
                  onPress={handlePublished}
                  startContent={<Eye className=" w-4 h-4" />}
                >
                  {language === "Vietnamese"
                    ? "Công khai tất cả"
                    : "Public All"}
                </DropdownItem>
                <DropdownItem
                  key="delete-all"
                  startContent={<Trash2 className=" w-4 h-4" />}
                  onPress={onOpen}
                  color="danger"
                >
                  {language === "Vietnamese" ? "Xóa tất cả" : "Delete All"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        </div>
      </div>
      <div className=" grid xl:grid-cols-4 lg:grid-cols-3 gap-4 md:grid-cols-2">
        {item.map((i, index) => (
          <ImageItem
            isPro={user.isPro}
            openModal={({ o, i }) => setIsOpen({ open: o, index: i })}
            index={index}
            image={i}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default HistoryByPrompt;
