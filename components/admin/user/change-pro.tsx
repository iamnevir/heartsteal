import { Id } from "@/convex/_generated/dataModel";
import { Chip, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";
const ChangePro = ({
  userId,
  isPro,
}: {
  userId: Id<"user">;
  isPro: boolean;
}) => {
  const update = useMutation(api.user.update);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ConfirmModal
        title={
          isPro
            ? "Xác nhận hủy Premium của người dùng này?"
            : "Xác nhận nâng cấp tài khoản lên Premium?"
        }
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => {
          try {
            update({ id: userId, isPro: !isPro });
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
        color={isPro ? "success" : "danger"}
        size="sm"
        variant="flat"
      >
        {isPro ? "Premium" : "None"}
      </Chip>
    </>
  );
};

export default ChangePro;
