import { Id } from "@/convex/_generated/dataModel";
import { Chip, cn, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";
const ChangeRole = ({
  userId,
  isAdmin,
}: {
  userId: Id<"user">;
  isAdmin: boolean;
}) => {
  const update = useMutation(api.user.update);
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ConfirmModal
        title={`Xác nhận cấp quyền Admin cho người dùng này?`}
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => {
          try {
            update({ id: userId, isAdmin: !isAdmin });
            toast.success(
              language === "Vietnamese"
                ? "Cập nhật thành công."
                : "Updated Admin."
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
