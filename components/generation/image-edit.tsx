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
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

const ImageInput = ({ isPro }: { isPro: boolean }) => {
  const generation = useGenerateImage();
  const { language } = useLanguage();

  return (
    <div
      className={cn(
        " max-w-2xl text-sm",
        !isPro && "opacity-50 pointer-events-none"
      )}
    >
      <Card classNames={{ base: "dark:bg-slate-950/70 bg-slate-200" }}>
        <CardHeader>
          <span className="flex items-center gap-1">
            <Image className="w-5 h-5" />
            {language === "Vietnamese" ? "Ảnh đầu vào" : "Image Input"}
            <Tooltip
              placement="right"
              size="sm"
              delay={100}
              closeDelay={100}
              content={
                <div className=" w-40">
                  {language === "Vietnamese"
                    ? "Hiện tại chỉ có mô hình Heart Steal hỗ trợ điều này."
                    : "Only Heart Steal model is supported at this time."}
                </div>
              }
            >
              <ShieldQuestion size="20" />
            </Tooltip>
          </span>
          <div className="ml-auto gap-2 flex items-center">
            <span>
              {language === "Vietnamese" ? "Sử dụng sửa ảnh" : "Use Image Edit"}
            </span>
            <Switch
              isSelected={generation.isEdit}
              onValueChange={(v) => {
                generation.setEdit(v);
                generation.setImageInput(!v);
              }}
              size="sm"
              classNames={{
                wrapper: generation.isEdit
                  ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                  : "",
              }}
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="gap-2">
          <div className=" flex items-center sm:flex-row flex-col gap-3 justify-between">
            <div className="flex flex-col items-center gap-3 w-full justify-between">
              <div className="ml-2 flex items-center gap-2 font-semibold text-xs ">
                <span>
                  {language === "Vietnamese"
                    ? "Thêm một ảnh đầu vào"
                    : "Add an image input"}
                </span>
                <Tooltip
                  placement="right"
                  size="sm"
                  delay={100}
                  closeDelay={100}
                  content={
                    <div className=" w-40">
                      {language === "Vietnamese"
                        ? "Hình ảnh cần chỉnh sửa. Phải là tệp PNG hợp lệ, nhỏ hơn 4MB và có hình vuông. Nếu mặt nạ không được cung cấp, hình ảnh phải có độ trong suốt sẽ được sử dụng làm mặt nạ."
                        : "The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask."}
                    </div>
                  }
                >
                  <ShieldQuestion size="20" />
                </Tooltip>
              </div>
              <SingleFileUpload
                value={generation.maskInput}
                onChange={generation.setMaskInput}
              />
            </div>
            <div className="flex flex-col items-center gap-3 w-full justify-between">
              <div className="ml-2 flex  items-center gap-2 font-semibold text-xs ">
                <span>
                  {language === "Vietnamese"
                    ? "Thêm một ảnh mặt nạ"
                    : "Add an mask"}
                </span>
                <Tooltip
                  placement="right"
                  size="sm"
                  delay={100}
                  closeDelay={100}
                  content={
                    <div className=" w-40">
                      {language === "Vietnamese"
                        ? "Một hình ảnh bổ sung có các vùng trong suốt hoàn toàn (ví dụ: nơi alpha bằng 0) cho biết nơi cần chỉnh sửa hình ảnh. Phải là tệp PNG hợp lệ, nhỏ hơn 4 MB và có cùng kích thước với hình ảnh."
                        : "An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where image should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as image."}
                    </div>
                  }
                >
                  <ShieldQuestion size="20" />
                </Tooltip>
              </div>
              <SingleFileUpload
                value={generation.maskUrl}
                onChange={generation.setMaskUrl}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ImageInput;
