import { Id } from "@/convex/_generated/dataModel";
import { Chip, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { backEndUrl } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";

const ChangePro = ({
  userId,
  isPro,
  reset,
}: {
  userId: Id<"user">;
  isPro: boolean;
  reset: () => void;
}) => {
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
        handleDelete={async () => {
          const response = await fetch(`${backEndUrl}/user/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              isPro: !isPro,
            }),
          });
          if (response.status === 200) {
            toast.success(
              language === "Vietnamese"
                ? "Cập nhật thành công."
                : "Created Profile."
            );
            reset();
          } else {
            toast.error(
              language === "Vietnamese"
                ? "Cập nhật không thành công."
                : "Created Failed."
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
