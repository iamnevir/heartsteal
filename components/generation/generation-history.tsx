import { Doc } from "@/convex/_generated/dataModel";

import HistoryByPrompt from "./history-by-promt";

const GenerationHistory = ({ images }: { images: Doc<"image">[][] }) => {
  return (
    <div className=" w-full h-full">
      {images.map((item, index) => (
        <HistoryByPrompt key={index} item={item} />
      ))}
    </div>
  );
};

export default GenerationHistory;
