import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn, formatVietnameseDate } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import {
  Check,
  Copy,
  Download,
  DownloadCloudIcon,
  ExternalLinkIcon,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import useDownloader from "react-use-downloader";
import { User as UserType } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useCopyToClipboard } from "usehooks-ts";
const ImageCommunityItem = ({
  image,
  users,
}: {
  image: Doc<"image">;
  users?: UserType[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const update = useMutation(api.image.update);
  const { user } = useUser();
  const imageAuthor = users ? users.find((f) => f.id === image.userId) : user;
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-full">
          <>
            <ModalBody>
              <div className="flex item-start gap-4 py-2 w-full">
                <div>
                  <div
                    className={cn(
                      " relative  sm:w-[290px] sm:h-[390px] w-full h-[390px] cursor-pointer overflow-hidden",
                      image.size === "512x512" ? "sm:h-[290px] h-[390px]" : ""
                    )}
                  >
                    <Image
                      className={cn("rounded-md", hover ? "opacity-40" : "")}
                      alt=""
                      placeholder="blur"
                      blurDataURL="/logo.png"
                      src={image.url}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw,66vw"
                      style={{ objectFit: "cover" }}
                    />{" "}
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-sm">
                    <div className="px-4 py-1 flex items-center gap-1 bg-black/10 dark:bg-black/50 rounded-lg cursor-pointer hover:bg-black/20 dark:hover:bg-slate-900 duration-500">
                      <Download className="w-4 h-4" />
                      Download
                    </div>
                    <div
                      onClick={() => {
                        copy(image.url);
                        toast.success("Copied Link to Clipboard.", {
                          classNames: { toast: "bg-white" },
                        });
                      }}
                      className="px-4 py-1 flex items-center gap-1 bg-black/10 dark:bg-black/50 rounded-lg cursor-pointer hover:bg-black/20 dark:hover:bg-slate-900 duration-500"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      Share
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col items-start gap-3 w-full max-w-xs">
                  <div className="flex items-center gap-2 w-full justify-between">
                    <User
                      name={
                        imageAuthor?.username
                          ? imageAuthor.username
                          : imageAuthor?.firstName
                      }
                      avatarProps={{
                        name: imageAuthor?.username?.charAt(0)
                          ? imageAuthor.username?.charAt(0)
                          : imageAuthor?.firstName?.charAt(0),
                        className: "w-[30px] h-[30px] bg-gr",
                      }}
                    />
                    <Heart className=" mr-3 hover:scale-105 duration-500 cursor-pointer" />
                  </div>

                  {image.prompt !== "" && (
                    <>
                      <Divider />
                      <span className=" text-sm">Prompt details</span>
                      <Card>
                        <CardBody>
                          <div className=" relative rounded-[10px] dark:bg-black bg-slate-200 p-3 pr-10 text-sm max-w-xs">
                            {image.prompt}
                            <div
                              onClick={() => {
                                copy(image.prompt!);
                                toast.success("Copied to Clipboard.");
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
                        Input Resolution
                      </span>
                      <span className="text-sm">{image.size}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">Created</span>
                      <span className="text-sm whitespace-nowrap">
                        {formatVietnameseDate(image._creationTime)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">Model</span>
                      <span className="text-sm">{image.model}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className=" text-xs text-gray-600">Likes</span>
                      <span className="text-sm">{image.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onOpen}
        className={cn(
          " relative  sm:w-[240px] sm:h-[390px] w-full h-[390px] cursor-pointer overflow-hidden",
          image.size === "512x512" ? "sm:h-[290px] h-[390px]" : ""
        )}
      >
        <Image
          className={cn("rounded-md duration-300", hover ? "opacity-40" : "")}
          alt=""
          placeholder="blur"
          blurDataURL="/logo.png"
          src={image.url}
          fill
          priority
          sizes="(max-width: 768px) 100vw,66vw"
          style={{ objectFit: "cover" }}
        />
        <div
          className={cn(
            "text-sm absolute right-2 top-2 duration-500 rounded-full backdrop-blur-lg bg-gradient-to-br from-black/20 to-black/10 dark:from-white/20 dark:to-white/0 flex items-center px-3 py-2 ",
            hover
              ? "translate-x-0 opacity-100"
              : "sm:opacity-0 sm:translate-x-2 sm:pointer-events-none"
          )}
        >
          <div>{image.likes}</div>
          <Heart className=" w-5 h-5 ml-2 hover:scale-125 duration-500" />
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
            name={
              imageAuthor?.username
                ? imageAuthor.username
                : imageAuthor?.firstName
            }
            avatarProps={{
              name: imageAuthor?.username?.charAt(0)
                ? imageAuthor.username?.charAt(0)
                : imageAuthor?.firstName?.charAt(0),
              className: "w-[30px] h-[30px] bg-gr",
            }}
          />
        </div>
        <div
          className={cn(
            " flex items-center duration-500 absolute bottom-2 left-2 cursor-pointer justify-start truncate max-h-40 max-w-[200px] whitespace-normal gap-3 rounded-md  text-xs",
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
          content="Download image"
        >
          <div
            onClick={() => download(image.url, "hearsteal.png")}
            className={cn(
              " w-8 h-8 flex duration-500 hover:scale-105 items-center cursor-pointer justify-center bg-transparent backdrop-blur-lg absolute right-2 bottom-2 rounded-full",
              hover
                ? "opacity-100 translate-x-0"
                : "sm:opacity-0 sm:translate-x-2 sm:pointer-events-none"
            )}
          >
            <DownloadCloudIcon className="w-4 h-4" />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default ImageCommunityItem;
