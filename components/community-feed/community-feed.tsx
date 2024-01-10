"use client";

import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import ImageItem from "./image-item";
import LoadMore from "../load-more";
import { CircularProgress, SliderValue } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";
import ImageSkeleton from "../image-skeleton";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const CommunityFeed = ({
  search,
  grid,
}: {
  search: string;
  grid: SliderValue;
}) => {
  const { user } = useUser();
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
  if (!user?.id) {
    return null;
  }
  console.log(grid);
  return (
    <div
      className={cn(
        " grid  gap-4 sm:pr-2 py-2 sm:py-10",
        grid === 1
          ? "grid-cols-1"
          : grid === 2
          ? "grid-cols-2"
          : grid === 3
          ? "grid-cols-3"
          : grid === 4
          ? "grid-cols-4"
          : grid === 5
          ? "grid-cols-5"
          : "xl:grid-cols-5 min-[1000px]:grid-cols-3 min-[750px]:grid-cols-2 grid-cols-1 min-[1200px]:grid-cols-4"
      )}
    >
      {[
        getColumns(0),
        getColumns(1),
        getColumns(2),
        getColumns(3),
        getColumns(4),
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-4">
          {item.map((i, ind) => (
            <ImageItem grid={grid} image={i} userId={user.id} key={ind} />
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
