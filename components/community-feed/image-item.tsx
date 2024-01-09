import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn, formatVietnameseDate } from "@/lib/utils";
import {
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import {
  Aperture,
  Atom,
  BrainCog,
  Check,
  Copy,
  Download,
  DownloadCloudIcon,
  ExternalLinkIcon,
  Heart,
} from "lucide-react";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { useLanguage } from "@/hooks/use-language";
const ImageCommunityItem = ({
  image,
  userId,
}: {
  image: Doc<"image">;
  userId: string;
}) => {
  const users = useQuery(api.user.getUsers);
  const userName = useQuery(api.user.getUserByUser, { userId });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const update = useMutation(api.image.update);
  const updateUser = useMutation(api.user.update);
  const imageAuthor = users
    ? users.find((f) => f.userId === image.userId)?.username
    : userName?.username;
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
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
      <Modal
        scrollBehavior="inside"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          <>
            <ModalBody>
              <div className="flex sm:flex-row flex-col item-start gap-4 py-2 w-full">
                <div>
                  <div
                    className={cn(
                      " relative  sm:w-[290px] sm:h-[390px] w-full cursor-pointer overflow-hidden",
                      image.size === "512x512"
                        ? "sm:h-[290px] h-[320px]"
                        : "h-[320px]"
                    )}
                  >
                    <Image
                      className="rounded-md"
                      alt=""
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                      src={image.url}
                      sizes="(max-width: 768px) 100vw,66vw"
                      width={512}
                      height={512}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />{" "}
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm">
                    <div
                      onClick={downloadImage}
                      className="px-4 py-1 flex items-center gap-1 bg-black/10 dark:bg-black/50 rounded-lg cursor-pointer hover:bg-black/20 dark:hover:bg-slate-900 duration-500"
                    >
                      <Download className="w-4 h-4" />
                      {language === "Vietnamese" ? "Tải xuống" : "Download"}
                    </div>
                    <div
                      onClick={() => {
                        copy(image.url);
                        toast.success(
                          language === "Vietnamese"
                            ? "Đã sao chép."
                            : "Copied Link to Clipboard.",
                          {
                            classNames: { toast: "bg-white" },
                          }
                        );
                      }}
                      className="px-4 py-1 flex items-center gap-1 bg-black/10 dark:bg-black/50 rounded-lg cursor-pointer hover:bg-black/20 dark:hover:bg-slate-900 duration-500"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      {language === "Vietnamese" ? "Chia sẻ" : "Share"}
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col items-start gap-3 w-full max-w-xs">
                  <div className="flex items-center gap-2 w-full justify-between">
                    <User
                      name={imageAuthor}
                      avatarProps={{
                        name: imageAuthor?.charAt(0),
                        className: "w-[30px] h-[30px] bg-gr",
                      }}
                    />
                    <Heart
                      onClick={handleLiked}
                      className={cn(
                        " mr-3 hover:scale-105 duration-500 cursor-pointer",
                        userName?.like.includes(image._id)
                          ? " fill-red-500 text-red-500"
                          : ""
                      )}
                    />
                  </div>

                  {image.prompt !== "" && (
                    <>
                      <Divider />
                      <span className=" text-sm">
                        {language === "Vietnamese"
                          ? "Chi tiết lệnh"
                          : "Prompt details"}
                      </span>
                      <Card>
                        <CardBody>
                          <div className="sm:line-clamp-[10] line-clamp-2 relative rounded-[10px] dark:bg-black bg-slate-200 p-3 pr-10 text-sm max-w-xs">
                            {image.prompt}
                            <div
                              onClick={() => {
                                copy(image.prompt!);
                                toast.success(
                                  language === "Vietnamese"
                                    ? "Đã sao chép."
                                    : "Copied to Clipboard."
                                );
                                setCopied(true);
                                setTimeout(() => {
                                  setCopied(false);
                                }, 1000);
                              }}
                              className=" absolute cursor-pointer right-2 top-2 p-1 bg-black rounded-xl"
                            >
                              {copied ? (
                                <Check className=" w-4 h-4" color="white" />
                              ) : (
                                <Copy className=" w-4 h-4" color="white" />
                              )}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </>
                  )}

                  <Divider />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">
                        {language === "Vietnamese"
                          ? "Kích thước"
                          : "Input Resolution"}
                      </span>
                      <span className="text-sm">{image.size}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">
                        {language === "Vietnamese" ? "Ngày tạo" : "CreatedAt"}
                      </span>
                      <span className="text-sm whitespace-nowrap">
                        {formatVietnameseDate(image._creationTime)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">
                        {language === "Vietnamese" ? "Mô hình" : "Model"}
                      </span>
                      <span className="text-sm flex items-center gap-1">
                        {" "}
                        {image.model === "dall-e-2" ? (
                          <>
                            {" "}
                            <Atom className="w-4 h-4" />
                            <span>Heart Steal</span>
                          </>
                        ) : image.model === "pro" ? (
                          <>
                            <BrainCog className="w-4 h-4" />
                            <span>Heart Steal Pro</span>
                          </>
                        ) : image.model === "imagine" ? (
                          <>
                            <BrainCog className="w-4 h-4" />
                            <span>Imagine</span>
                          </>
                        ) : image.model === "dream" ? (
                          <>
                            <BrainCog className="w-4 h-4" />
                            <span>Dream</span>
                          </>
                        ) : (
                          <>
                            <Aperture className="w-4 h-4" />
                            <span>Heart Steal V2</span>
                          </>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">
                        {language === "Vietnamese" ? "Lượt thích" : "Likes"}
                      </span>
                      <span className="text-sm">{image.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
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
          " relative  sm:w-[240px] sm:h-[390px] w-full  cursor-pointer overflow-hidden",
          image.size === "512x512" ? "sm:h-[290px] h-[370px]" : "h-[370px]"
        )}
      >
        <Image
          className={cn(
            "rounded-md duration-300 ",
            hover ? "sm:smopacity-40" : ""
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
            "text-sm absolute z-[1] right-2 text-white w-14 h-8 flex items-center justify-center top-2 duration-500 rounded-full backdrop-blur-lg bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0",
            hover
              ? "opacity-100 translate-x-0"
              : "sm:opacity-0 sm:translate-x-2 sm:pointer-events-none"
          )}
        >
          <div>{image.likes}</div>
          <Heart
            className={cn(
              " w-5 h-5 ml-2 hover:scale-125 duration-500 text-white",
              userName?.like.includes(image._id)
                ? " fill-red-500 text-red-500"
                : ""
            )}
          />
        </div>
        <div
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
            "  duration-500 absolute bottom-2 text-white left-2 cursor-pointer justify-start sm:line-clamp-6 line-clamp-4 max-w-[200px] gap-3 rounded-md  text-xs",
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
