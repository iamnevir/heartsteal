import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
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
import { cn, formatVietnameseDate } from "@/lib/utils";
import {
  Aperture,
  ArrowUpCircle,
  Atom,
  BrainCog,
  Eye,
  EyeOff,
  Image,
  MoreHorizontal,
  Move,
  TrainFront,
  Trash2,
} from "lucide-react";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { Doc } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";
import ConfirmModal from "../confirm-modal";

const HistoryByPrompt = ({ item }: { item: Doc<"image">[] }) => {
  const generation = useGenerateImage();
  const removeAll = useMutation(api.image.removeAll);
  const updateAll = useMutation(api.image.updateAll);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteAll = async () => {
    try {
      const ids = item.map((i) => i._id);
      await removeAll({ id: ids });
      toast.success(
        language === "Vietnamese"
          ? "Xóa tất cả thành công."
          : "Removed All Successfully."
      );
    } catch (error) {
      toast.error(
        language === "Vietnamese"
          ? "Xóa tất cả không thành công."
          : "Remove Failed."
      );
    }
    onClose();
  };
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
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDeleteAll}
      />
      <div className=" flex py-2 items-center sm:justify-between text-xs">
        <div className="xl:max-w-[50vw] lg:max-w-[40vw] md:max-w-[20vw] max-w-[0px] truncate">
          {item[0].prompt}
        </div>
        <div className=" flex items-center gap-5 sm:justify-normal justify-between sm:w-fit w-full">
          <span>{formatVietnameseDate(item[0]._creationTime)}</span>
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
              {item[0].model === "dall-e-2" ? (
                <>
                  {" "}
                  <Atom className="w-4 h-4" />
                  <span>Heart Steal</span>
                </>
              ) : item[0].model === "dall-e-3" ? (
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
              <Image className="w-4 h-4" />
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
          <ImageItem image={i} key={index} />
        ))}
      </div>
    </>
  );
};

export default HistoryByPrompt;
