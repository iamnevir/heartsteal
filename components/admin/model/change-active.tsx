import { Id } from "@/convex/_generated/dataModel";
import { Chip, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";
const ChangeActive = ({
  modelId,
  isActive,
}: {
  modelId: Id<"model">;
  isActive: boolean;
}) => {
  const update = useMutation(api.model.update);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ConfirmModal
        title={
          isActive
            ? "Xác nhận tắt kích hoạt mô hình này?"
            : "Xác nhận kích hoạt mô hình này?"
        }
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => {
          try {
            update({ id: modelId, isActive: !isActive });
            toast.success(
              language === "Vietnamese"
                ? "Cập nhật thành công."
                : "Updated Premium."
            );
          } catch (error) {
            console.log(error);
            toast.error(
              language === "Vietnamese"
                ? "Cập nhật không thành công."
                : "Update Failed."
            );
          }

          onClose();
        }}
      />
      <Chip
        onClick={onOpen}
        className="capitalize cursor-pointer"
        color={isActive ? "success" : "danger"}
        size="sm"
        variant="flat"
      >
        {isActive ? "Hoạt động" : "Không hoạt động"}
      </Chip>
    </>
  );
};

export default ChangeActive;
