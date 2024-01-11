import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LoadMore = ({ loadMore }: { loadMore: () => void }) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);
  return <div className=" -translate-y-[100dvh] h-0" ref={ref} />;
};

export default LoadMore;
