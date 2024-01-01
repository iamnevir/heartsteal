"use client";
import Lava from "@/components/lava";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/clerk-react";
import { useMediaQuery } from "usehooks-ts";
export default function Home() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const style = {
    "--gradient-color-1": "#ff8093",
    "--gradient-color-2": "#6ec3f4",
    "--gradient-color-3": "#a785ff",
    "--gradient-color-4": "#7ab4ff",
  };
  return (
    <div className=" h-full w-full justify-center ">
      <div
        className={cn(
          "absolute w-[100dvw] h-[100dvh] flex items-center justify-center"
        )}
      >
        <div className={cn(isMobile ? "" : "ml-[350px]")}>
          <SignIn />
        </div>
      </div>

      <Lava color={style} />
    </div>
  );
}
