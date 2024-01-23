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
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
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
const ImageModal = ({
  img,
  isOpen,
  onOpenChange,
  imageAuthor,
  userName,
  handleLiked,
  userId,
}: {
  img: Doc<"image">;
  isOpen: boolean;
  onOpenChange: () => void;
  imageAuthor?: string;
  userName?: Doc<"user">;
  handleLiked: () => void;
  userId: string;
}) => {
  const [image, setImage] = useState<Doc<"image">>(img);
  const models = useQuery(api.model.getmodelsforAdmin);
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImageByModel,
    { modelId: img.model },
    { initialNumItems: 20 }
  );
  const [value, copy] = useCopyToClipboard();
  const router = useRouter();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const { edgestore } = useEdgeStore();
  const generation = useGenerateImage();
  const create = useMutation(api.image.create);
  const downloadImage = async () => {
    saveAs(image.url, "heartsteal.png");
  };
  const handleRemix = async () => {
    const model = await getModel(image.model);
    if (model) {
      generation.setImageSize(image.size);
      generation.setModel(image.model);
      generation.setImageInput(false);
      generation.setPrompt(image.prompt ? image.prompt : "");
      generation.setNegativePrompt(
        image.negativePrompt ? image.negativePrompt : ""
      );
      generation.setIsNegative(
        image.negativePrompt && image.negativePrompt !== "" ? true : false
      );
      generation.setTab("history");
      router.push("/ai/generation");
    } else {
      toast.error(
        language === "Vietnamese"
          ? "Mô hình đã không còn hoạt động."
          : "Model's not available anymore."
      );
    }
  };
  const handleReGenerate = async () => {
    const model = await getModel(image.model);
    if (model) {
      generation.setModel(image.model);
      generation.setTab("history");
      router.push("/ai/generation");
    } else {
      toast.error(
        language === "Vietnamese"
          ? "Mô hình đã không còn hoạt động."
          : "Model's not available anymore."
      );
    }
  };
  const handleInput = () => {
    generation.setInputUrl(image.url);
    generation.setImageInput(true);
    generation.setPrompt("");
    generation.setIsNegative(false);
    generation.setNegativePrompt("");
    generation.setTab("image-input");
    router.push("/ai/generation");
  };
  const handleRemoveBg = async () => {
    if (!userName?.isPro) {
      toast.error(
        language === "Vietnamese"
          ? "Hãy nâng cấp Premium để sử dụng."
          : "Upgrade to Professor to use."
      );
      return;
    }
    generation.setIsLoading(true);
    try {
      generation.setTab("history");
      router.push(`/ai/generation?img=${image.url}`);
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
            userId,
            isPublish: image.isPublish,
            likes: 0,
            model: image.model,
            size: image.size,
          });
        }
      }
      toast.success(
        language === "Vietnamese"
          ? "Xóa nền thành công."
          : "Remove background successfull."
      );
    } catch (error) {
      console.log(error);
    } finally {
      generation.setIsLoading(false);
      toast.error(
        language === "Vietnamese"
          ? "Xóa nền không thành công."
          : "Remove background failed."
      );
    }
  };
  const model = models?.find((f) => f.modelId === image.model);
  return (
    <Modal
      backdrop="blur"
      scrollBehavior="outside"
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
                    " relative  sm:w-[290px] sm:h-[450px] w-full cursor-pointer overflow-hidden",
                    image.size === "512x512"
                      ? "sm:h-[290px] h-[320px]"
                      : "h-[450px]"
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

              <div className=" flex flex-col items-start gap-3 w-full">
                <div className="flex items-center gap-2 w-full justify-between ">
                  <div
                    onClick={() => router.push(`/ai/profile/${imageAuthor}`)}
                    className="cursor-pointer w-fit h-fit p-0 m-0"
                  >
                    <User
                      name={imageAuthor}
                      avatarProps={{
                        name: imageAuthor?.charAt(0),
                        className: "w-[30px] h-[30px] bg-gr ",
                      }}
                    />
                  </div>

                  <div className=" flex items-center gap-1">
                    {image.likes}
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
                </div>
                <span className=" line-clamp-1 font-medium text-sm">
                  {image.prompt}
                </span>
                {image.prompt !== "" && (
                  <>
                    <Divider />
                    <span className=" text-xs font-semibold">
                      {language === "Vietnamese"
                        ? "Chi tiết lệnh"
                        : "Prompt details"}
                    </span>
                    <Card className="w-full">
                      <CardBody>
                        <div className="w-full relative rounded-[10px] dark:bg-black bg-slate-200 p-3 pr-10 text-xs sm:max-w-none max-w-xs">
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
                            className=" absolute cursor-pointer right-2 top-2 p-1 dark:bg-black bg-white rounded-xl"
                          >
                            {copied ? (
                              <Check className=" w-4 h-4 dark:text-white text-black" />
                            ) : (
                              <Copy className=" w-4 h-4 dark:text-white text-black" />
                            )}
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <div className=" text-xs flex flex-row w-full items-center gap-3">
                          <Tooltip
                            size="sm"
                            delay={100}
                            closeDelay={100}
                            content={
                              language === "Vietnamese"
                                ? "Chỉ áp dụng cho Premium"
                                : "Just for Premium"
                            }
                          >
                            <div
                              onClick={handleRemoveBg}
                              className="dark:bg-black w-full whitespace-nowrap bg-slate-300 hover:bg-gradient-to-r hover:text-white from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 flex items-center justify-center gap-1 p-1 cursor-pointer rounded-md"
                            >
                              <Film className="w-4 h-4" />
                              {language === "Vietnamese"
                                ? "Xóa nền"
                                : "Remove Background"}
                            </div>
                          </Tooltip>
                          <Tooltip
                            size="sm"
                            delay={100}
                            closeDelay={100}
                            content={
                              language === "Vietnamese"
                                ? "Dùng ảnh này như một đầu vào."
                                : "Use like an Image Input."
                            }
                          >
                            <div
                              onClick={handleInput}
                              className="dark:bg-black w-full whitespace-nowrap bg-slate-300 hover:bg-gradient-to-r hover:text-white from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 flex items-center justify-center gap-1 p-1 cursor-pointer rounded-md"
                            >
                              <ScanEyeIcon className="w-4 h-4" />
                              Input
                            </div>
                          </Tooltip>
                          <Tooltip
                            size="sm"
                            delay={100}
                            closeDelay={100}
                            content={
                              language === "Vietnamese"
                                ? "Tạo lại ảnh có thuộc tính như ảnh này."
                                : "Reuse this image settings to generation."
                            }
                          >
                            <div
                              onClick={handleRemix}
                              className="dark:bg-black w-full whitespace-nowrap bg-slate-300 hover:bg-gradient-to-r hover:text-white from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 flex items-center justify-center gap-1 p-1 cursor-pointer rounded-md"
                            >
                              <Wand2 className="w-4 h-4" />
                              Remix
                            </div>
                          </Tooltip>
                        </div>
                      </CardFooter>
                    </Card>
                  </>
                )}
                {image.negativePrompt && image.negativePrompt !== "" && (
                  <>
                    <Divider />
                    <span className="  text-xs font-semibold">
                      {language === "Vietnamese"
                        ? "Lời nhắc tiêu cực "
                        : "Negative Prompt"}
                    </span>
                    <Card>
                      <CardBody>
                        <div className="w-full relative rounded-[10px] dark:bg-black bg-slate-200 p-3 pr-10 text-xs sm:max-w-none max-w-xs">
                          {image.negativePrompt}
                          <div
                            onClick={() => {
                              copy(image.negativePrompt!);
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
                            className=" absolute cursor-pointer right-2 top-2 p-1 dark:bg-black bg-white rounded-xl"
                          >
                            {copied ? (
                              <Check className=" w-4 h-4 dark:text-white text-black" />
                            ) : (
                              <Copy className=" w-4 h-4 dark:text-white text-black" />
                            )}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </>
                )}

                <Divider />
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col gap-2">
                    <span className=" text-xs dark:text-white/50 text-black/50">
                      {language === "Vietnamese"
                        ? "Kích thước"
                        : "Input Resolution"}
                    </span>
                    <span className="text-xs">{image.size}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className=" text-xs dark:text-white/50 text-black/50">
                      {language === "Vietnamese" ? "Ngày tạo" : "CreatedAt"}
                    </span>
                    <span className="text-xs whitespace-nowrap">
                      {formatVietnameseDateTime(image._creationTime)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className=" text-xs dark:text-white/50 text-black/50">
                      {language === "Vietnamese" ? "Lượt thích" : "Likes"}
                    </span>
                    <span className="text-xs">{image.likes}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className=" text-xs dark:text-white/50 text-black/50">
                      {language === "Vietnamese" ? "Hạt giống" : "Seed"}
                    </span>
                    <span className="text-xs">
                      {Math.round(randomRange(200000000, 250000000))}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col gap-2 w-full">
                  <span className=" text-xs dark:text-white/50 text-black/50">
                    {language === "Vietnamese" ? "Mô hình" : "Model"}
                  </span>
                  <Card className="w-full">
                    <CardBody className="w-full">
                      <Card className="w-full">
                        <CardBody className="dark:bg-black/40 bg-slate-200 gap-2 w-full">
                          <div className="flex text-xs items-center gap-2 w-full">
                            <Image
                              src={model ? model.avatar! : ""}
                              alt=""
                              width={512}
                              sizes="(max-width: 768px) 100vw,66vw"
                              height={512}
                              className="w-7 h-7"
                              style={{ objectFit: "cover" }}
                            />
                            <div className=" flex flex-col">
                              <span className=" font-semibold">
                                {" "}
                                {model?.name}
                              </span>
                              <span className=" text-[10px]">
                                {model?.author}
                              </span>
                            </div>
                            <Chip size="sm" className="bg-gr ml-auto text-xs">
                              {model?.isPro ? "Premium" : "Free"}
                            </Chip>
                          </div>
                          <Button
                            onPress={handleReGenerate}
                            size="sm"
                            className="bg-gr rounded-md text-xs"
                          >
                            {language === "Vietnamese"
                              ? "Tạo ảnh với mô hình này"
                              : "Generate with this model"}
                          </Button>
                        </CardBody>
                      </Card>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter className=" flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between w-full">
              <span>
                {language === "Vietnamese"
                  ? "Hình ảnh liên quan"
                  : "Related Images"}
              </span>
              <div className=" flex items-center gap-2 text-xs cursor-pointer">
                <span
                  onClick={() => router.push(`/ai/models/${model?.modelId}`)}
                >
                  {language === "Vietnamese" ? "Xem thêm" : "View More"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className={cn(" grid  gap-4 sm:grid-cols-4 grid-cols-2")}>
              {results?.map((item, index) => (
                <Image
                  key={index}
                  className={"rounded-md cursor-pointer"}
                  alt=""
                  onClick={() => setImage(item)}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  src={item.url}
                  sizes="(max-width: 768px) 100vw,66vw"
                  width={512}
                  height={512}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
