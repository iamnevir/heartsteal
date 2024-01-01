import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { Image, ShieldQuestion } from "lucide-react";
import SingleFileUpload from "../single-file-upload";
import { useGenerateImage } from "@/hooks/use-generate-picker";

const ImageInput = () => {
  const generation = useGenerateImage();
  return (
    <div className=" max-w-2xl text-sm">
      <Card classNames={{ base: "dark:bg-slate-950/70 bg-slate-200" }}>
        <CardHeader>
          <span className="flex items-center gap-1">
            <Image className="w-5 h-5" />
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
          <div className="ml-2 flex items-center gap-2 font-semibold text-xs ">
            <span>Add an image to get started</span>
            <Tooltip
              placement="right"
              size="sm"
              delay={100}
              closeDelay={100}
              content={
                <div className=" w-40">
                  Select an image like an input for your generation. Must be a
                  valid PNG file, less than 4MB, and square.
                </div>
              }
            >
              <ShieldQuestion size="20" />
            </Tooltip>
          </div>
          <SingleFileUpload />
        </CardBody>
      </Card>
    </div>
  );
};

export default ImageInput;
