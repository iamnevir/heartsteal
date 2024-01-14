import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { backEndUrl, cn } from "@/lib/utils";
import { User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

const UserOrder = ({
  userId,
  isMobile,
}: {
  userId: Id<"user">;
  isMobile: boolean;
}) => {
  const [user, setU] = useState<Doc<"user">>();
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
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
  return (
    <User
      className={cn("ml-5 gradient-text ")}
      name={user?.username}
      classNames={{ name: isMobile ? "text-xl" : "", base: "max-w-xs" }}
      avatarProps={{
        title: "",
        name: user?.username?.charAt(0).toUpperCase(),
        className: isMobile ? "w-10 h-10 bg-gr" : "w-[30px] h-[30px] bg-gr ",
      }}
    />
  );
};

export default UserOrder;
