"use client";

import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { User } from "@clerk/nextjs/server";
import LoadMore from "../load-more";
import { CircularProgress } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";
import ImageItem from "../community-feed/image-item";
import { useUser } from "@clerk/nextjs";

const PersonalFeed = () => {
  const { user } = useUser();
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImageByUser,
    { userId: user?.id! },
    { initialNumItems: 20 }
  );
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <div className=" grid grid-cols-5 gap-4 pr-2 my-4 pb-10">
      {results.map((item, index) => (
        <ImageItem image={item} key={index} />
      ))}
      {status === "CanLoadMore" ? (
        <LoadMore loadMore={() => loadMore(isMobile ? 3 : 8)} />
      ) : null}
      {status === "LoadingMore" ? (
        <div className=" w-full py-3 flex items-center justify-center">
          <CircularProgress size="sm" aria-label="Loading..." />
        </div>
      ) : null}
    </div>
  );
};

export default PersonalFeed;
