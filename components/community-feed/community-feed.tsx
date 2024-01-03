"use client";

import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import ImageItem from "./image-item";
import LoadMore from "../load-more";
import { CircularProgress } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";
import ImageSkeleton from "../image-skeleton";
import { useEffect } from "react";
import { Doc } from "@/convex/_generated/dataModel";

const CommunityFeed = ({ search }: { search: string }) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.image.getImages,
    {},
    { initialNumItems: 20 }
  );

  const isMobile = useMediaQuery("(max-width: 750px)");
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
      return results
        .filter((item) => item.prompt?.includes(search))
        .filter((item, idx) => idx % colNumber === colIndex);
    } else {
      return results.filter((item, idx) => idx % colNumber === colIndex);
    }
  }
  if (status === "LoadingFirstPage") {
    return <ImageSkeleton />;
  }

  return (
    <div className=" grid xl:grid-cols-5 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4 gap-4 sm:pr-2 py-2 sm:py-10">
      {[
        getColumns(0),
        getColumns(1),
        getColumns(2),
        getColumns(3),
        getColumns(4),
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-4">
          {item.map((i, ind) => (
            <ImageItem image={i} key={ind} />
          ))}
        </div>
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
