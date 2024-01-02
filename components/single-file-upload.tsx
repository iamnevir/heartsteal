import Lottie from "lottie-react";
import upload from "@/public/upload.json";
import { Chip, Progress } from "@nextui-org/react";
import { ElementRef, useRef, useState } from "react";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useGenerateImage } from "@/hooks/use-generate-picker";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
const SingleFileUpload = () => {
  const { user } = useUser();
  const generation = useGenerateImage();
  const update = useMutation(api.user.update);
  const { edgestore } = useEdgeStore();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const imageInput = useRef<ElementRef<"input">>(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      onClick={() => imageInput.current?.click()}
      className={cn(
        " relative cursor-pointer rounded-[10px] border-dashed border-blue-500 border-2 flex flex-col items-center h-[300px] max-w-2xl",
        generation.inputUrl ? "xl:w-[650px] xl:h-[300px]" : ""
      )}
    >
      {generation.inputUrl ? (
        <Image
          src={generation.inputUrl}
          onClick={async () => {
            await generation.setInputUrl("");
            imageInput.current?.click();
          }}
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
          alt="imageUpload"
        />
      ) : (
        <>
          <div className=" w-[300px] h-[200px]">
            <Lottie animationData={upload} width={100} height={50} />
          </div>
          <Chip className=" bg-blue-500 mt-5" variant="shadow">
            {isLoading ? "UpLoading..." : "Upload"}
          </Chip>
          <input
            type="file"
            className=" opacity-0"
            ref={imageInput}
            accept="image/*"
            onChange={async (event) => {
              event.preventDefault();
              setIsLoading(true);
              const file = event.target.files![0];
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                });
                update({ id: u?._id!, upload: [...u?.upload!, res.url] });
                generation.setInputUrl(res.url);
              }
              setIsLoading(false);
            }}
            disabled={generation.inputUrl !== ""}
          />
        </>
      )}
    </div>
  );
};

export default SingleFileUpload;
