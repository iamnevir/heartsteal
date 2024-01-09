import { Id } from "@/convex/_generated/dataModel";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ConfirmModal from "../confirm-modal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

const ChangeCoin = ({ userId, coin }: { userId: Id<"user">; coin: number }) => {
  const update = useMutation(api.user.update);
  const [data, setCoin] = useState(coin);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nhập số coin
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Coin"
                  variant="bordered"
                  defaultValue={coin.toString()}
                  onValueChange={(v) => setCoin(parseInt(v))}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    update({ id: userId, coin: data });
                    onClose();
                  }}
                  className="bg-gr"
                >
                  Chấp nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <span onClick={onOpen} className=" cursor-pointer">
        {coin}
      </span>
    </>
  );
};

export default ChangeCoin;
