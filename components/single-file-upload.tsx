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
import { useLanguage } from "@/hooks/use-language";
const SingleFileUpload = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { user } = useUser();
  const update = useMutation(api.user.update);
  const { edgestore } = useEdgeStore();
  const u = useQuery(api.user.getUserByUser, { userId: user?.id! });
  const imageInput = useRef<ElementRef<"input">>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  return (
    <div
      onClick={() => imageInput.current?.click()}
      className={cn(
        " relative cursor-pointer rounded-[10px] border-dashed border-blue-500 border-2 flex flex-col items-center h-[300px] max-w-2xl",
        value ? "xl:w-[650px] xl:h-[300px]" : ""
      )}
    >
      {value ? (
        <Image
          src={value}
          onClick={async () => {
            await onChange("");
            imageInput.current?.click();
          }}
          fill
          sizes="(max-width: 768px) 100vw,66vw"
          style={{ objectFit: "contain" }}
          alt="imageUpload"
        />
      ) : (
        <>
          <div className=" w-[300px] h-[200px]">
            <Lottie animationData={upload} width={100} height={50} />
          </div>
          <Chip className=" bg-blue-500 mt-5" variant="shadow">
            {isLoading
              ? language === "Vietnamese"
                ? "Đang tải lên"
                : "UpLoading..."
              : language === "Vietnamese"
              ? "Tải lên"
              : "Upload"}
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
                onChange(res.url);
              }
              setIsLoading(false);
            }}
            disabled={value !== ""}
          />
        </>
      )}
    </div>
  );
};

export default SingleFileUpload;
