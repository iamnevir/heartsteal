"use client";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { Check, Flower, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { backEndUrl, cn } from "@/lib/utils";
import isValidName from "@/actions/isValidName";
import { toast } from "sonner";
import { Doc } from "@/convex/_generated/dataModel";
import { useLanguage } from "@/hooks/use-language";
const UserInfoModal = ({ userId }: { userId: string }) => {
  const { language } = useLanguage();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [fav, setFav] = useState<string[]>([]);
  const [u, setU] = useState<Doc<"user">>();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${backEndUrl}/user/by_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      const data = await response.json();
      setU(data.user);
      if (u?.username === undefined) {
        onOpen();
      }
    };
    fetchUser();
  }, [onOpen, userId]);
  if (u?.username) {
    return null;
  }
  if (u === undefined) {
    return null;
  }

  async function onSubmit() {
    if (isValid && confirm) {
      try {
        const response = await fetch(`${backEndUrl}/user/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: u?._id,
            username: name,
            favorites: fav,
          }),
        });
        if (response.status === 200) {
          toast.success(
            language === "Vietnamese" ? "Tạo thành công." : "Created Profile."
          );
          onClose();
        } else {
          toast.error(
            language === "Vietnamese"
              ? "Tạo không thành công."
              : "Created Failed."
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(
        language === "Vietnamese"
          ? "Hãy xem lại thông tin."
          : "Please looking for your form again."
      );
    }
  }
  const favorites = [
    "Motion",
    "Photography",
    "Anime",
    "Art",
    "Character",
    "Food",
    "Alien",
    "Fashion",
    "Video Games",
    "Games Design",
    "Product Design",
    "Marketing",
    "Education",
    "Orther",
  ];
  return (
    <Modal
      backdrop="blur"
      hideCloseButton
      shouldBlockScroll
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="fixed z-[99999]"
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 ">
          <div className=" w-full h-20 relative flex items-center justify-center">
            <Image
              src="https://utfs.io/f/00829e39-0892-4da9-af1a-c56b6647af46-7hm7y2.jpg"
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              alt=""
            />
            <span className=" z-10">
              Welcome to <span className="gradient-text">HeartSteal.Ai</span>
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className=" flex items-center flex-col gap-2">
            <span className="text-lg font-semibold">Get started</span>
            <div className=" w-full flex-col gap-2 flex">
              <span>
                Create your own
                <span className="gradient-text"> @username</span>{" "}
              </span>

              <Input
                onChange={async (v) => {
                  try {
                    const isValid = await isValidName(v.target.value);
                    setIsValid(isValid);
                    setName(v.target.value);
                  } catch (error) {
                    setIsValid(false);
                  }
                }}
                labelPlacement="outside"
                classNames={{ inputWrapper: "rounded-md" }}
                startContent={
                  <>
                    <Flower />{" "}
                    <Divider orientation="vertical" className="mx-3" />
                  </>
                }
                endContent={
                  <>
                    {isValid ? (
                      <div className="duration-500 w-8 h-7 rounded-full bg-green-500 items-center justify-center flex">
                        <Check className=" duration-500 w-4 h-4" />
                      </div>
                    ) : isValid === false ? (
                      <div className="duration-500 w-8 h-7 rounded-full bg-red-500 items-center justify-center flex">
                        <X className="duration-500 w-4 h-4" />
                      </div>
                    ) : null}
                  </>
                }
                placeholder="someawesomeusername"
              />
              <span className=" text-slate-400 text-xs">
                Username must be between 4-15 characters and contain letters,
                number and underscores only.
              </span>
            </div>
            <span className="text-lg font-semibold mt-2">
              What are your interests?
            </span>

            <div className=" flex flex-wrap gap-2">
              {favorites.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (fav.includes(item)) {
                      setFav(fav.filter((f) => f !== item));
                    } else {
                      setFav([...fav, item]);
                    }
                  }}
                  className={cn(
                    " cursor-pointer dark:bg-black bg-slate-300 hover:bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 rounded-full gap-2 flex items-center justify-center px-3 py-1",
                    fav.includes(item)
                      ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                      : ""
                  )}
                >
                  {item}
                </div>
              ))}
              <div className="flex items-center gap-3 text-xs">
                <Switch
                  size="sm"
                  onValueChange={(v) => setConfirm(v)}
                  classNames={{
                    wrapper: confirm
                      ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                      : "",
                  }}
                />
                <span>
                  I confirm that I am over 18 and want to show NSFW content by
                  default
                </span>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className=" justify-center">
          <Button
            variant="shadow"
            className=" px-40 py-5 bg-gr font-semibold"
            type="submit"
            onPress={onSubmit}
          >
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;
