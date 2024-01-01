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
} from "@nextui-org/react";
import { cn, formatVietnameseDate } from "@/lib/utils";
import {
  ArrowUpCircle,
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

const HistoryByPrompt = ({ item }: { item: Doc<"image">[] }) => {
  const generation = useGenerateImage();
  const removeAll = useMutation(api.image.removeAll);
  const updateAll = useMutation(api.image.updateAll);
  const handleDeleteAll = async () => {
    try {
      const ids = item.map((i) => i._id);
      await removeAll({ id: ids });
      toast("Removed All Successfully.");
    } catch (error) {
      toast("Remove Failed.");
    }
  };
  const handlePublished = async () => {
    try {
      const ids = item.map((i) => i._id);
      await updateAll({ id: ids, isPublish: true });
      toast("Published All Successfully.");
    } catch (error) {
      toast("Publish Failed.");
    }
  };
  const handleUnPublished = async () => {
    try {
      const ids = item.map((i) => i._id);
      await updateAll({ id: ids, isPublish: false });
      toast("UnPublished All Successfully.");
    } catch (error) {
      toast("UnPublish Failed.");
    }
  };
  return (
    <>
      <div className=" flex py-2 items-center sm:justify-between text-xs">
        <div className="xl:max-w-[50vw] lg:max-w-[40vw] md:max-w-[20vw] max-w-[0px] truncate">
          {item[0].prompt}
        </div>
        <div className=" flex items-center gap-5">
          <span>{formatVietnameseDate(item[0]._creationTime)}</span>
          <Tooltip
            size="sm"
            delay={100}
            closeDelay={100}
            content="Reuse Prompt"
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
                <TrainFront className="w-4 h-4" />
                <span>Dall-E-2</span>
              </>
            ) : (
              <>
                <BrainCog className="w-4 h-4" />
                <span>Dall-E-3</span>
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
                Private All
              </DropdownItem>
              <DropdownItem
                key="public-all"
                onPress={handlePublished}
                startContent={<Eye className=" w-4 h-4" />}
              >
                Public All
              </DropdownItem>
              <DropdownItem
                key="delete-all"
                startContent={<Trash2 className=" w-4 h-4" />}
                onPress={handleDeleteAll}
                color="danger"
              >
                Delete All
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
