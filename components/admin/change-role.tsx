import { Id } from "@/convex/_generated/dataModel";
import { Chip, cn, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const ChangeRole = ({
  userId,
  isAdmin,
}: {
  userId: Id<"user">;
  isAdmin: boolean;
}) => {
  const update = useMutation(api.user.update);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ConfirmModal
        title={`Xác nhận cấp quyền Admin cho người dùng này?`}
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={() => update({ id: userId, isAdmin: !isAdmin })}
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
