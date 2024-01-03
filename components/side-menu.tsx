"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });

export default function SideMenu() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);
  if (!isMobile) {
    return null;
  }
  if (pathname === "/ai/generation") {
    return null;
  }
  return (
    <>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        style={{
          boxShadow: "rgba(161, 128, 255, 0.6) 0px 0px calc(0.5rem) 0px",
        }}
        className={cn(
          " fixed z-[99999] top-2 right-2 w-10 h-10 rounded-full flex flex-col gap-2 justify-center items-center bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]",
          pathname === "/ai/settings" && "right-10"
        )}
      >
        <div
          className={cn(
            "h-[2px] w-5 rounded-full duration-500 bg-white",
            isActive ? " rotate-45 translate-y-[5px]" : ""
          )}
        ></div>
        <div
          className={cn(
            "h-[2px] rounded-full w-5 duration-500 bg-white",
            isActive ? " -rotate-45 -translate-y-[5px]" : ""
          )}
        ></div>
      </div>

      <div
        className={cn(
          "h-[100dvh] flex flex-col gap-3 w-[80%] font-semibold text-xl px-2 duration-500 bg-black border-none fixed right-0 z-[50] top-0",
          pathname === "/ai/settings" && "right-10",
          isActive ? " translate-x-0" : " -right-[100%]"
        )}
      >
        <Sidebar isMobile={isMobile} />
      </div>
    </>
  );
}
