"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMediaQuery } from "usehooks-ts";
import ImageItem from "../community-feed/image-item";
import { useUser } from "@clerk/nextjs";
import ImageSkeleton from "../image-skeleton";

const LikedPost = ({ search }: { search: string }) => {
  const { user } = useUser();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const posts = useQuery(api.image.getImageByIds, {
    imageIds: u?.like,
  });
  const sm = useMediaQuery("(min-width: 750px)");
  const md = useMediaQuery("(min-width: 1000px)");
  const lg = useMediaQuery("(min-width: 1200px)");
  const xl = useMediaQuery("(min-width: 1280px)");

  let colNumber: number;

  if (xl) {
    colNumber = 5;
  } else if (lg) {
    colNumber = 4;
  } else if (md) {
    colNumber = 3;
  } else if (sm) {
    colNumber = 2;
  } else {
    colNumber = 1;
  }
  function getColumns(colIndex: number) {
    if (search !== "") {
      return posts!
        .filter((item) => item?.prompt?.includes(search))
        .filter((item, idx) => idx % colNumber === colIndex);
    } else {
      return posts?.filter((item, idx) => idx % colNumber === colIndex);
    }
  }
  if (posts === undefined) {
    return <ImageSkeleton />;
  }
  if (!posts) {
    return null;
  }
  if (!user?.id) {
    return null;
  }
  return (
    <div className=" grid  xl:grid-cols-5 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4 gap-4 pr-2 my-4 pb-10">
      {[
        getColumns(0),
        getColumns(1),
        getColumns(2),
        getColumns(3),
        getColumns(4),
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-4">
          {item?.map((i, ind) => {
            if (!i) {
              return null;
            }
            return <ImageItem image={i} key={ind} userId={user?.id} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default LikedPost;
