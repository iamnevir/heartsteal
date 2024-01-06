import { createVNPay } from "@/actions/createVNPay";
import { Id } from "@/convex/_generated/dataModel";
import { useLanguage } from "@/hooks/use-language";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CheckOutButton = ({
  userId,
  item,
}: {
  userId: Id<"user">;
  item: {
    title: string;
    price: string;
    subPrice: string;
  };
}) => {
  const { language } = useLanguage();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {item.price == "0đ" || item.price === "0$" ? null : (
        <Button
          onPress={onOpen}
          className="bg-gr sm:text-sm text-2xl sm:py-5 py-7 hover:scale-105 px-10 rounded-md"
        >
          {language === "Vietnamese" ? "Đăng ký" : "Subscribe"}
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {" "}
            {language === "Vietnamese"
              ? "Chọn phương thức thanh toán"
              : "Choose your payment"}
          </ModalHeader>
          <ModalBody>
            <Button
              onClick={() => {}}
              className="bg-gr sm:text-lg font-semibold text-2xl sm:py-5 py-7 hover:scale-105 px-10 rounded-md"
            >
              {language === "Vietnamese" ? "Momo" : "Momo Payment"}
            </Button>
            <Button
              onClick={async () => {
                const url = await createVNPay(userId);
                window.location.href = url!;
              }}
              className="bg-gr sm:text-lg font-semibold text-2xl sm:py-5 py-7 hover:scale-105 px-10 rounded-md"
            >
              {language === "Vietnamese" ? "VNPay" : "VNPay Payment"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckOutButton;
