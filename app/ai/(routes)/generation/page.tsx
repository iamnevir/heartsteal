import dynamic from "next/dynamic";
const SidebarPicker = dynamic(
  () => import("@/components/generation/sidebar-picker"),
  { ssr: false }
);
const SideMenuPicker = dynamic(
  () => import("@/components/generation/side-menu-picker"),
  { ssr: false }
);
const ImageGenerationMain = dynamic(
  () => import("@/components/generation/image-generation-main"),
  { ssr: false }
);
import { cn } from "@nextui-org/react";

const ImageGenerationPage = () => {
  return (
    <>
      <div
        className={cn(
          "fixed z-[50] w-56 h-full hidden sm:flex flex-col gap-1 items-start overflow-y-auto border-r border-white/65 px-2"
        )}
      >
        <SidebarPicker />
      </div>
      <SideMenuPicker />
      <ImageGenerationMain />
    </>
  );
};

export default ImageGenerationPage;
