import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import {
  backEndUrl,
  base64toFile,
  cn,
  formatVietnameseDateTime,
  randomRange,
} from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  SliderValue,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import {
  Aperture,
  ArrowRight,
  Atom,
  BrainCog,
  Check,
  Copy,
  Download,
  DownloadCloudIcon,
  ExternalLinkIcon,
  Film,
  Heart,
  ScanEyeIcon,
  Wand2,
} from "lucide-react";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { useLanguage } from "@/hooks/use-language";
import { useRouter } from "next/navigation";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import axios from "axios";
import { useEdgeStore } from "@/lib/edgestore";
import { getModel } from "@/actions/getModel";
import ImageModal from "./image-modal";
const ImageCommunityItem = ({
  image,
  userId,
  grid,
}: {
  image: Doc<"image">;
  userId: string;
  grid: SliderValue;
}) => {
  const users = useQuery(api.user.getUsers);

  const userName = useQuery(api.user.getUserByUser, { userId });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const update = useMutation(api.image.update);
  const router = useRouter();
  const updateUser = useMutation(api.user.update);

  const imageAuthor = users
    ? users.find((f) => f.userId === image.userId)?.username
    : userName?.username;

  const [hover, setHover] = useState(false);
  const { language } = useLanguage();
  const handleLiked = () => {
    try {
      if (userName) {
        if (userName?.like.includes(image._id)) {
          update({ id: image._id, likes: image.likes - 1 });
          updateUser({
            id: userName._id,
            like: [...userName?.like.filter((f) => f !== image._id)],
          });
        } else {
          update({ id: image._id, likes: image.likes + 1 });
          updateUser({
            id: userName._id,
            like: [...userName?.like, image._id],
          });
        }
      }
    } catch (error) {}
  };
  const downloadImage = async () => {
    saveAs(image.url, "heartsteal.png");
  };

  return (
    <>
      <ImageModal
        img={image}
        imageAuthor={imageAuthor}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        userName={userName!}
        handleLiked={handleLiked}
        userId={userId}
      />
      <motion.div
        whileInView="show"
        initial="hidden"
        viewport={{ once: true }}
        variants={{
          hidden: {
            opacity: 0,
            translateY: 10,
          },
          show: {
            opacity: 1,
            translateY: 0,
            transition: {
              type: "spring",
              duration: 2,
            },
          },
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          " relative  w-full  cursor-pointer overflow-hidden",
          grid === 5 && image.size === "1024x1024" && "h-[370px]"
        )}
      >
        <Image
          className={cn(
            "rounded-md duration-300 ",
            hover ? "sm:opacity-40" : ""
          )}
          alt=""
          onClick={onOpen}
          placeholder="blur"
          blurDataURL="/logo.png"
          src={image.url}
          priority
          sizes="(max-width: 768px) 100vw,66vw"
          width={512}
          height={512}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          onClick={handleLiked}
          className={cn(
            "text-sm absolute z-[1] right-2 px-2 gap-1 text-white w-18 h-8 flex items-center justify-center top-2 duration-500 rounded-full backdrop-blur-lg bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0",
            hover
              ? "opacity-100 translate-x-0"
              : "sm:opacity-0 sm:translate-x-2 sm:pointer-events-none"
          )}
        >
          <div>{image.likes}</div>
          <Heart
            className={cn(
              " w-5 h-5 hover:scale-125 duration-500 text-white",
              userName?.like.includes(image._id)
                ? " fill-red-500 text-red-500"
                : ""
            )}
          />
        </div>
        <div
          onClick={() => router.push(`/ai/profile/${imageAuthor}`)}
          className={cn(
            " flex items-center duration-500 absolute top-2 left-2 cursor-pointer justify-start gap-3 rounded-md w-full  text-xs",
            hover
              ? "translate-x-0 opacity-100"
              : "sm:opacity-0 sm:-translate-x-2 sm:pointer-events-none"
          )}
        >
          <User
            name={imageAuthor}
            classNames={{ name: "text-white" }}
            avatarProps={{
              name: imageAuthor?.charAt(0),
              className: "w-[30px] h-[30px] bg-gr",
            }}
          />
        </div>
        <div
          className={cn(
            "  duration-500 absolute bottom-2 text-white left-2 cursor-pointer justify-start sm:line-clamp-6 line-clamp-4 max-w-[80%] gap-3 rounded-md  text-xs",
            hover
              ? "translate-x-0 opacity-100"
              : "sm:opacity-0 sm:-translate-x-2 sm:pointer-events-none"
          )}
        >
          {image.prompt}
        </div>
        <Tooltip
          size="sm"
          delay={100}
          closeDelay={100}
          content={language === "Vietnamese" ? "Tải xuống" : "Download image"}
        >
          <div
            onClick={downloadImage}
            className={cn(
              " w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center  bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 backdrop-blur-lg absolute right-2 bottom-2 rounded-full",
              hover
                ? "opacity-100 translate-x-0"
                : "sm:opacity-0 sm:translate-x-2 sm:pointer-events-none"
            )}
          >
            <DownloadCloudIcon className="w-4 h-4 text-white" />
          </div>
        </Tooltip>
      </motion.div>
    </>
  );
};

export default ImageCommunityItem;
