import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useLanguage } from "@/hooks/use-language";
import { formatVietnameseDateTime } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { useQuery } from "convex/react";

const EventItem = ({ item }: { item: Doc<"image"> }) => {
  const user = useQuery(api.user.getUserByUser, { userId: item.userId });
  const { language } = useLanguage();
  if (!user) {
    return null;
  }
  return (
    <>
      <div className=" flex gap-3 ">
        <span className="bg-gr rounded-full mt-2 w-2 h-2"></span>
        <div className=" flex flex-col">
          <span>{formatVietnameseDateTime(item._creationTime)}</span>
          <span className=" font-semibold">
            <span className="gradient-text">{user.username}</span>
            {language === "Vietnamese"
              ? ` vừa tạo ảnh bằng `
              : ` has been created images by `}
            <span className="gradient-text">{item.model}</span>
          </span>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default EventItem;
