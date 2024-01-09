import { Id } from "@/convex/_generated/dataModel";
import { Chip, useDisclosure } from "@nextui-org/react";
import ConfirmModal from "../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const ChangePro = ({
  userId,
  isPro,
}: {
  userId: Id<"user">;
  isPro: boolean;
}) => {
  const update = useMutation(api.user.update);

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
        handleDelete={() => update({ id: userId, isPro: !isPro })}
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
