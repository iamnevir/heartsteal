import { useLanguage } from "@/hooks/use-language";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
const ConfirmModal = ({
  isOpen,
  onClose,
  handleDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}) => {
  const { language } = useLanguage();
  return (
    <Modal placement="center" size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="gradient-text">
              {language === "Vietnamese"
                ? "Xác nhận xóa ảnh này?"
                : "Confirm deletion of this photo?"}
            </ModalHeader>
            <ModalBody>
              <span>
                {" "}
                {language === "Vietnamese"
                  ? "Hành động của bạn sẽ không thể hoàn tác. Bạn có đồng ý?"
                  : "Your actions cannot be undone. Do you sure?"}
              </span>
            </ModalBody>
            <ModalFooter>
              <Button variant="shadow" color="danger" onPress={onClose}>
                {language === "Vietnamese" ? "Hủy" : "Cancel"}
              </Button>
              <Button className="bg-gr" variant="solid" onPress={handleDelete}>
                {language === "Vietnamese" ? "Chấp nhận" : "Accept"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
