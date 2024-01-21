import { Id } from "@/convex/_generated/dataModel";
import { Chip, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
const ChangePro = ({
  modelId,
  isPro,
}: {
  modelId: Id<"model">;
  isPro: boolean;
}) => {
  const update = useMutation(api.model.update);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ConfirmModal
        title={
          isPro
            ? "Xác nhận tắt yêu cầu Premium cho mô hình này?"
            : "Xác nhận kích hoạt yêu cầu Premium mô hình này?"
        }
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => {
          try {
            update({ id: modelId, isPro: !isPro });
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
        className={cn("capitalize cursor-pointer",isPro?"bg-gr":"")}
        
        size="sm"
        variant="flat"
      >
        {isPro ? "Premium" : "Free"}
      </Chip>
    </>
  );
};

export default ChangePro;
