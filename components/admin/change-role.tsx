import { Id } from "@/convex/_generated/dataModel";
import { Chip, cn, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../confirm-modal";
import { backEndUrl } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/use-language";

const ChangeRole = ({
  userId,
  isAdmin,
  reset,
}: {
  userId: Id<"user">;
  isAdmin: boolean;
  reset: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { language } = useLanguage();
  return (
    <>
      <ConfirmModal
        title={`Xác nhận cấp quyền Admin cho người dùng này?`}
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
              isAdmin: !isAdmin,
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
        onClick={() => {
          if (!isAdmin) {
            onOpen();
          }
        }}
        className={cn(
          "text-bold text-sm capitalize cursor-pointer",
          isAdmin ? " bg-gr" : ""
        )}
      >
        {isAdmin ? "Admin" : "User"}
      </Chip>
    </>
  );
};

export default ChangeRole;
