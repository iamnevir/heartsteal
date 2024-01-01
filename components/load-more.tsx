import { CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LoadMore = ({ loadMore }: { loadMore: () => void }) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);
  return <div ref={ref} />;
};

export default LoadMore;
