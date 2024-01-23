import SingleFileUpload from "@/components/single-file-upload";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import slugify from "slugify";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit } from "lucide-react";
import { useUser } from "@clerk/nextjs";
const CreateEditModel = ({ currentModel }: { currentModel?: Doc<"model"> }) => {
  const { user } = useUser();
  const { language } = useLanguage();
  const update = useMutation(api.model.update);
  const create = useMutation(api.model.create);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [model, setModel] = useState<{
    avatar?: string;
    name?: string;
    isPro?: boolean;
    author?: string;
    size?: string;
    version?: string;
    baseModel?: string;
    desc?: string;
    isActive: boolean;
  }>(
    currentModel
      ? {
          avatar: currentModel.avatar,
          name: currentModel.name,
          author: currentModel.author,
          isPro: currentModel.isPro,
          size: currentModel.size,
          version: currentModel.version,
          baseModel: currentModel.baseModel,
          desc: currentModel.desc,
          isActive: currentModel.isActive,
        }
      : {
          avatar: undefined,
          name: undefined,
          isPro: false,
          author: undefined,
          size: undefined,
          version: undefined,
          baseModel: undefined,
          desc: undefined,
          isActive: false,
        }
  );
  const onSubmit = async () => {
    if (!model.avatar || model.avatar === "" || !model.name) {
      toast.error("Thiếu tên hoặc ảnh đại diện mô hình");
      return;
    }
    try {
      if (currentModel) {
        await update({
          id: currentModel._id,
          avatar: model.avatar,
          modelId: slugify(model.name, {
            locale: "vi",
            remove: undefined,
            lower: true,
            strict: true,
            trim: true,
            replacement: "-",
          }),
          size: model.size,
          name: model.name,
          isActive: model.isActive,
          isPro: model.isPro,
          author: model.author,
          version: model.version,
          desc: model.desc,
          baseModel: model.baseModel,
          updatedBy: user?.id,
        });
        onClose();
        toast.success(
          language === "Vietnamese"
            ? "Cập nhật thành công."
            : "Update model successfully."
        );
      } else {
        await create({
          avatar: model.avatar,
          modelId: slugify(model.name, {
            locale: "vi",
            remove: undefined,
            lower: true,
            strict: true,
            trim: true,
            replacement: "-",
          }),
          size: model.size,
          name: model.name,
          isActive: model.isActive,
          isPro: model.isPro,
          author: model.author,
          version: model.version,
          desc: model.desc,
          baseModel: model.baseModel,
          createdBy: user?.id,
          updatedBy: user?.id,
        });
        onClose();
        toast.success(
          language === "Vietnamese"
            ? "Tạo mới thành công."
            : "Create new model successfully."
        );
      }
    } catch (error) {
      console.log(error);
      if (currentModel) {
        toast.error(
          language === "Vietnamese"
            ? "Cập nhật không thành công."
            : "Update model failed."
        );
      }
      toast.error(
        language === "Vietnamese"
          ? "Tạo mới không thành công."
          : "Create new model failed."
      );
    }
  };
  return (
    <>
      {currentModel ? (
        <Tooltip
          color="danger"
          content={language === "Vietnamese" ? "Sửa mô hình" : "Edit Model"}
        >
          <span
            onClick={onOpen}
            className="text-lg cursor-pointer active:opacity-50"
          >
            <Edit />
          </span>
        </Tooltip>
      ) : (
        <Button className="bg-gr" onPress={onOpen}>
          {language === "Vietnamese" ? "Tạo mới" : "New"}
        </Button>
      )}

      <Modal
        size="4xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                {currentModel
                  ? language === "Vietnamese"
                    ? "Cập nhật mô hình"
                    : "Update Model"
                  : language === "Vietnamese"
                  ? "Tạo mới mô hình"
                  : "New Model"}
              </ModalHeader>
              <ModalBody>
                <div className=" flex items-center w-full gap-4">
                  <div className=" flex flex-col gap-1 w-full">
                    <span>
                      {" "}
                      {language === "Vietnamese"
                        ? "Ảnh mô hình"
                        : "Model Avatar"}
                    </span>
                    <SingleFileUpload
                      value={model.avatar ? model.avatar : ""}
                      onChange={(avatar) => {
                        setModel({ ...model, avatar });
                        setIsEdit(true);
                      }}
                      size="md"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Input
                      label={
                        language === "Vietnamese" ? "Tên mô hình" : "Model Name"
                      }
                      value={model.name}
                      onValueChange={(name) => {
                        setModel({ ...model, name });
                        setIsEdit(true);
                      }}
                      labelPlacement="outside"
                      className="w-full"
                    />

                    <Input
                      value={model.author}
                      onValueChange={(author) => {
                        setModel({ ...model, author });
                        setIsEdit(true);
                      }}
                      label={
                        language === "Vietnamese" ? "Tác giả" : "Model Author"
                      }
                      labelPlacement="outside"
                      className="w-full"
                    />

                    <Input
                      value={model.size}
                      onValueChange={(size) => {
                        setModel({ ...model, size });
                        setIsEdit(true);
                      }}
                      label={
                        language === "Vietnamese" ? "Kích thước" : "Model Size"
                      }
                      labelPlacement="outside"
                      className="w-full"
                    />
                    <div className=" flex items-center gap-3 justify-between">
                      <Input
                        value={model.version}
                        onValueChange={(version) =>
                          setModel({ ...model, version })
                        }
                        label={
                          language === "Vietnamese"
                            ? "Phiên bản"
                            : "Model Version"
                        }
                        labelPlacement="outside"
                        className="w-full"
                      />

                      <Switch
                        isSelected={model.isActive}
                        onValueChange={(isActive) => {
                          setModel({ ...model, isActive });
                          setIsEdit(true);
                        }}
                        classNames={{
                          base: "whitespace-nowrap mt-5",
                          wrapper: model.isActive
                            ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                            : "",
                        }}
                      >
                        {language === "Vietnamese" ? "Kích hoạt" : "Active"}
                      </Switch>
                    </div>
                    <div className=" flex items-center gap-3 justify-between">
                      <Input
                        value={model.baseModel}
                        onValueChange={(baseModel) => {
                          setModel({ ...model, baseModel });
                          setIsEdit(true);
                        }}
                        label={
                          language === "Vietnamese"
                            ? "Mô hình cơ sở"
                            : "Base Model"
                        }
                        labelPlacement="outside"
                        className="w-full"
                      />
                      <Switch
                        isSelected={model.isPro}
                        onValueChange={(isPro) => {
                          setModel({ ...model, isPro });
                          setIsEdit(true);
                        }}
                        classNames={{
                          base: "whitespace-nowrap mt-5 mr-2",
                          wrapper: model.isPro
                            ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                            : "",
                        }}
                      >
                        Premium
                      </Switch>
                    </div>
                  </div>
                </div>

                <Textarea
                  labelPlacement="outside"
                  label={
                    language === "Vietnamese" ? "Mô tả" : "Model Description"
                  }
                  value={model.desc}
                  onValueChange={(desc) => {
                    setModel({ ...model, desc });
                    setIsEdit(true);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {language === "Vietnamese" ? "Đóng" : "Close"}
                </Button>
                <Button
                  className={cn(
                    "bg-gr",
                    !isEdit ? "pointer-events-none opacity-50" : ""
                  )}
                  onPress={onSubmit}
                >
                  {currentModel
                    ? language === "Vietnamese"
                      ? "Cập nhật"
                      : "Update"
                    : language === "Vietnamese"
                    ? "Tạo mới"
                    : "New"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEditModel;
