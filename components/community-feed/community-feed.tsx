"use client";

import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import ImageItem from "./image-item";
import { User } from "@clerk/nextjs/server";
import LoadMore from "../load-more";
import { CircularProgress } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";

const CommunityFeed = ({ users }: { users: string }) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImages,
    {},
    { initialNumItems: 20 }
  );
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <div className=" grid xl:grid-cols-5 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4 gap-4 pr-2 my-4 pb-10">
      {results.map((item, index) => (
        <ImageItem image={item} key={index} users={JSON.parse(users)} />
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

export default CommunityFeed;
