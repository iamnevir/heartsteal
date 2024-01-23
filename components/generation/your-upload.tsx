import { api } from "@/convex/_generated/api";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
const YourUpload = ({
  isOpen,
  onOpenChange,
  userId,
  onClose,
  mode,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  userId: string;
  onClose: () => void;
  mode: "edit" | "img2img";
}) => {
  const u = useQuery(api.user.getUserByUser, { userId });
  const generation = useGenerateImage();
  const [isSelected, setIsSelected] = useState("");
  const { language } = useLanguage();
  return (
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
            {language === "Vietnamese" ? "Ảnh tải lên của bạn" : "Your Uploads"}
          </span>
          <Divider />
          {u!.upload.length > 0 ? (
            <div className=" grid md:grid-cols-4 grid-cols-2 gap-4 p-2 ">
              {u?.upload.map((item, index) => (
                <div key={index} className=" relative">
                  <Image
                    onClick={() => setIsSelected(item)}
                    key={index}
                    width={250}
                    className={cn(
                      " cursor-pointer rounded-md hover:opacity-50 border-3 border-transparent",
                      isSelected === item && "opacity-50"
                    )}
                    height={250}
                    alt=""
                    style={{ objectFit: "cover", width: "auto" }}
                    src={item}
                  />
                  {isSelected === item && (
                    <div className=" w-full h-full absolute left-0 top-0 flex items-center justify-center">
                      <div className=" bg-gr rounded-full w-10 h-10 flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-full h-full flex items-center">
              {language === "Vietnamese"
                ? "Bạn chưa tải lên ảnh nào."
                : "No uploads yet."}
            </div>
          )}
        </ModalBody>
        <ModalFooter className=" justify-center flex-wrap">
          {mode === "edit" ? (
            <>
              <Button
                onPress={() => {
                  if (isSelected === "") {
                    toast.error(
                      language === "Vietnamese"
                        ? "Bạn chưa chọn ảnh nào"
                        : "Choose one Image"
                    );
                    return;
                  }
                  generation.setMaskInput(isSelected);
                }}
                className="bg-gr"
              >
                {language === "Vietnamese"
                  ? "Làm ảnh sửa đầu vào"
                  : "Use Image Edit Input"}
              </Button>
              <Button
                onPress={() => {
                  if (isSelected === "") {
                    toast.error(
                      language === "Vietnamese"
                        ? "Bạn chưa chọn ảnh nào"
                        : "Choose one Image"
                    );
                    return;
                  }
                  generation.setMaskUrl(isSelected);
                }}
                className="bg-gr"
              >
                {language === "Vietnamese" ? "Làm mặt nạ" : "Use Image Mask"}
              </Button>
            </>
          ) : (
            <Button
              onPress={() => {
                if (isSelected === "") {
                  toast.error(
                    language === "Vietnamese"
                      ? "Bạn chưa chọn ảnh nào"
                      : "Choose one Image"
                  );
                  return;
                }
                generation.setInputUrl(isSelected);
                onClose();
              }}
              className="bg-gr"
            >
              {language === "Vietnamese"
                ? "Làm ảnh đầu vào"
                : "Use Image Input"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default YourUpload;
