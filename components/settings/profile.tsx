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
const Profile = () => {
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width:768px)");
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const update = useMutation(api.user.update);
  const [username, setUserName] = useState(u?.username);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [fav, setFav] = useState<string[]>([]);
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
      toast.success("Updated Profile.");
    } else {
      toast.error("Please looking for your form again.");
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
  const name = u?.username ? u.username : user?.fullName;
  if (!u) {
    return null;
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Your Profile
          </ModalHeader>
          <ModalBody>
            <div className=" flex items-center flex-col gap-2">
              <div className=" w-full flex-col gap-2 flex">
                <span className="gradient-text"> @username</span>{" "}
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
              Save
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
          classNames={{ name: isMobile ? "text-xl" : "" }}
          avatarProps={{
            title: "",
            name: name?.charAt(0).toUpperCase(),
            className: isMobile
              ? "w-10 h-10 bg-gr"
              : "w-[30px] h-[30px] bg-gr ",
          }}
        />
      </div>
    </>
  );
};

export default Profile;
