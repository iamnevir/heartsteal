import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Image as ImageIcon, LucideShieldQuestion } from "lucide-react";
import SingleFileUpload from "../single-file-upload";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";

const ImageInput = () => {
  const generation = useGenerateImage();
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const { language } = useLanguage();
  return (
    <>
      <Modal
        className=" z-[99999] relative"
        size="4xl"
        scrollBehavior="inside"
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>
            {language === "Vietnamese"
              ? "Chọn ảnh làm đầu vào"
              : "Select Image Input"}
          </ModalHeader>
          <ModalBody>
            <span>
              {language === "Vietnamese"
                ? "Ảnh tải lên của bạn"
                : "Your Uploads"}
            </span>
            <Divider />
            <div className=" grid md:grid-cols-4 grid-cols-2 gap-4 p-2 ">
              {u?.upload.map((item, index) => (
                <Image
                  onClick={() => {
                    generation.setInputUrl(item);
                    onClose();
                  }}
                  key={index}
                  width={250}
                  className=" cursor-pointer rounded-md border-gr-image hover:opacity-50 border-3 border-transparent"
                  height={250}
                  alt=""
                  style={{ objectFit: "cover", width: "auto" }}
                  src={item}
                />
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className=" max-w-2xl text-sm ">
        <Card classNames={{ base: "dark:bg-slate-950/70 bg-slate-200 " }}>
          <CardHeader>
            <span className="flex items-center gap-1">
              <ImageIcon className="w-5 h-5" />
              {language === "Vietnamese" ? "Ảnh đầu vào" : "Image Input"}
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={
                  <div className=" w-40">
                    {language === "Vietnamese"
                      ? "Hiện tại chỉ hỗ trợ cho mô hình Heart Steal."
                      : "Only Heart Steal Model is supported at this time."}
                  </div>
                }
              >
                <LucideShieldQuestion size="20" />
              </Tooltip>
            </span>
            <div className="ml-auto gap-2 flex items-center">
              <span>
                {language === "Vietnamese"
                  ? "Sử dụng ảnh đầu vào"
                  : "Use Image Input"}
              </span>
              <Switch
                size="sm"
                isSelected={generation.isImageInput}
                onValueChange={(v) => {
                  generation.setImageInput(v);
                  generation.setEdit(!v);
                }}
                classNames={{
                  wrapper: generation.isImageInput
                    ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                    : "",
                }}
              />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="gap-2 overflow-hidden">
            <div className="ml-2 flex items-center gap-2 font-semibold text-xs justify-between">
              <div className="flex items-center gap-2">
                {" "}
                <span>
                  {language === "Vietnamese"
                    ? "Thêm ảnh để bắt đầu"
                    : "Add an image to get started"}
                </span>
                <Tooltip
                  placement="right"
                  size="sm"
                  delay={100}
                  closeDelay={100}
                  content={
                    <div className=" w-40">
                      {language === "Vietnamese"
                        ? "Chọn một hình ảnh làm đầu vào cho thế hệ của bạn. Phải là tệp PNG hợp lệ, nhỏ hơn 4MB và có hình vuông."
                        : "Select an image like an input for your generation. Must be a valid PNG file, less than 4MB, and square."}
                    </div>
                  }
                >
                  <LucideShieldQuestion size="20" />
                </Tooltip>
              </div>
              <Button
                onPress={onOpen}
                size="sm"
                className="bg-gr text-xs"
                variant="shadow"
              >
                {language === "Vietnamese"
                  ? "Ảnh tải lên của bạn"
                  : "Your Uploads"}
              </Button>
            </div>
            <SingleFileUpload
              value={generation.inputUrl}
              onChange={generation.setInputUrl}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ImageInput;
