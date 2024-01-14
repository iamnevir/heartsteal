import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Button, ModalFooter, User } from "@nextui-org/react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Divider,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import isValidName from "@/actions/isValidName";
import { Check, Flower, X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { useLanguage } from "@/hooks/use-language";
const Profile = ({ userId }: { userId: string }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const u = useQuery(api.user.getUserByUser, { userId });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const update = useMutation(api.user.update);
  const [username, setUserName] = useState(u?.username);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [fav, setFav] = useState<string[]>([]);
  const { language } = useLanguage();
  useEffect(() => {
    if (u?.favorite) {
      setFav(u?.favorite);
    }
  }, [u]);
  async function onSubmit() {
    if (isValid === true) {
      await update({
        id: u?._id!,
        username: username?.replace(/\s/g, ""),
        favorite: fav,
      });
      toast.success("Updated Profile.");
    } else if (isValid === null) {
      await update({
        id: u?._id!,
        favorite: fav,
      });
      toast.success(
        language === "Vietnamese" ? "Đã cập nhật hồ sơ." : "Updated Profile."
      );
    } else {
      toast.error(
        language === "Vietnamese"
          ? "Làm ơn xem lại lựa chọn."
          : "Please looking for your form again."
      );
    }
  }
  const favorites =
    language === "Vietnamese"
      ? [
          "Hoạt hình",
          "Nhiếp ảnh",
          "Anime",
          "Vẽ",
          "Nhân vật",
          "Thức ăn",
          "Alien",
          "Thời trang",
          "Trò chơi điện tử",
          "Thiết kế game",
          "Thiết kế sản phẩm",
          "Thương mại",
          "Giáo dục",
          "Khác",
        ]
      : [
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
  const name = u?.username ? u.username : "Unknown";

  if (!u) {
    return null;
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {language === "Vietnamese" ? "Hồ sơ của bạn" : "Your Profile"}
          </ModalHeader>
          <ModalBody>
            <div className=" flex items-center flex-col gap-2">
              <div className=" w-full flex-col gap-2 flex">
                <span className="gradient-text">
                  {" "}
                  {language === "Vietnamese" ? "@Biệt danh" : "@username"}
                </span>{" "}
                <Input
                  defaultValue={u?.username}
                  onChange={async (v) => {
                    try {
                      const isValid = await isValidName(v.target.value);
                      setIsValid(isValid);
                      setUserName(v.target.value);
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
                        <div className="duration-500 w-8 h-[26px] rounded-full bg-green-500 items-center justify-center flex">
                          <Check className=" duration-500 w-4 h-4" />
                        </div>
                      ) : isValid === false ? (
                        <div className="duration-500 w-8 h-[26px] rounded-full bg-red-500 items-center justify-center flex">
                          <X className="duration-500 w-4 h-4" />
                        </div>
                      ) : null}
                    </>
                  }
                  placeholder="someawesomeusername"
                />
                <span className=" text-slate-400 text-xs">
                  {language === "Vietnamese"
                    ? "Hồ sơ của bạn"
                    : "Biệt danh phải dài từ 4-15 ký tự và chỉ chứa chữ cái, số và dấu gạch dưới."}
                </span>
              </div>

              <div className=" flex flex-wrap gap-2 mt-2">
                {favorites.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (fav) {
                        if (fav.includes(item)) {
                          setFav(fav.filter((f) => f !== item));
                        } else {
                          setFav([...fav, item]);
                        }
                      }
                    }}
                    className={cn(
                      " cursor-pointer dark:bg-black bg-slate-300 hover:bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 rounded-full gap-2 flex items-center justify-center px-3 py-1",
                      fav?.includes(item)
                        ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                        : ""
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={onSubmit}
              variant="shadow"
              className={cn(
                "bg-gr",
                isValid === false ? "opacity-50 pointer-events-none" : ""
              )}
            >
              {language === "Vietnamese" ? "Lưu" : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div
        onClick={onOpen}
        className={cn(
          " flex items-center cursor-pointer justify-start gap-3 rounded-md py-2 w-full  dark:text-white/65 text-xs"
        )}
      >
        <User
          className={cn("ml-5 gradient-text")}
          name={name}
          classNames={{ name: isMobile ? "text-lg" : "" }}
          avatarProps={{
            title: "",
            name: name?.charAt(0),
            className: isMobile ? "w-8 h-8 bg-gr" : "w-[30px] h-[30px] bg-gr ",
          }}
        />
      </div>
    </>
  );
};

export default Profile;
