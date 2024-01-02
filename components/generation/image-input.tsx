import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Image as ImageIcon, ShieldQuestion } from "lucide-react";
import SingleFileUpload from "../single-file-upload";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

const ImageInput = () => {
  const generation = useGenerateImage();
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
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
          <ModalHeader>Select Image Input</ModalHeader>
          <ModalBody>
            <span>Your Uploads</span>
            <Divider />
            <div className=" grid md:grid-cols-4 grid-cols-2 gap-4 p-2">
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
      <div className=" max-w-2xl text-sm">
        <Card classNames={{ base: "dark:bg-slate-950/70 bg-slate-200" }}>
          <CardHeader>
            <span className="flex items-center gap-1">
              <ImageIcon className="w-5 h-5" />
              Image Input
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={
                  <div className=" w-40">
                    Only dall-e-2 is supported at this time.
                  </div>
                }
              >
                <ShieldQuestion size="20" />
              </Tooltip>
            </span>
            <div className="ml-auto gap-2 flex items-center">
              <span>Use Image Input</span>
              <Switch
                size="sm"
                isSelected={generation.isImageInput}
                onValueChange={(v) => {
                  generation.setImageInput(v);
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
          <CardBody className="gap-2">
            <div className="ml-2 flex items-center gap-2 font-semibold text-xs justify-between">
              <div className="flex items-center gap-2">
                {" "}
                <span>Add an image to get started</span>
                <Tooltip
                  placement="right"
                  size="sm"
                  delay={100}
                  closeDelay={100}
                  content={
                    <div className=" w-40">
                      Select an image like an input for your generation. Must be
                      a valid PNG file, less than 4MB, and square.
                    </div>
                  }
                >
                  <ShieldQuestion size="20" />
                </Tooltip>
              </div>
              <Button
                onPress={onOpen}
                size="sm"
                className="bg-gr text-xs"
                variant="shadow"
              >
                Your Uploads
              </Button>
            </div>
            <SingleFileUpload />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ImageInput;
