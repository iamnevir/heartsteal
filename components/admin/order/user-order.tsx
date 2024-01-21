import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { User } from "@nextui-org/react";
import { useQuery } from "convex/react";

const UserOrder = ({
  userId,
  isMobile,
}: {
  userId: Id<"user">;
  isMobile: boolean;
}) => {
  const user = useQuery(api.user.getUserById, { userId });
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
