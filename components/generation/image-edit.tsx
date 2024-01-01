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
          <div className="ml-auto gap-2 flex items-center pointer-events-none opacity-50">
            <span>Use Image Edit</span>
            <Switch
              size="sm"
              classNames={{
                wrapper: true
                  ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                  : "",
              }}
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="gap-2">
          <div className=" flex items-center justify-between">
            <div className="ml-2 flex items-center gap-2 font-semibold text-xs ">
              <span>Add an image input</span>
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={
                  <div className=" w-40">
                    The image to edit. Must be a valid PNG file, less than 4MB,
                    and square. If mask is not provided, image must have
                    transparency, which will be used as the mask.
                  </div>
                }
              >
                <ShieldQuestion size="20" />
              </Tooltip>
            </div>
            <div className="ml-2 flex items-center gap-2 font-semibold text-xs ">
              <span>Add an mask</span>
              <Tooltip
                placement="right"
                size="sm"
                delay={100}
                closeDelay={100}
                content={
                  <div className=" w-40">
                    An additional image whose fully transparent areas (e.g.
                    where alpha is zero) indicate where image should be edited.
                    Must be a valid PNG file, less than 4MB, and have the same
                    dimensions as image.
                  </div>
                }
              >
                <ShieldQuestion size="20" />
              </Tooltip>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full justify-between pointer-events-none opacity-50">
            <SingleFileUpload />
            <SingleFileUpload />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ImageInput;
