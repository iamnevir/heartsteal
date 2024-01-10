import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });
const SideMenu = dynamic(() => import("@/components/side-menu"), {
  ssr: false,
});
import { cn } from "@/lib/utils";
import UserInfoProvider from "@/components/provider/user-info-provider";
const AILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={cn(
          " fixed z-[50] dark:bg-black bg-white w-56 h-full hidden sm:flex flex-col items-start overflow-y-auto border-r border-white/65"
        )}
      >
        <Sidebar isMobile={false} />
      </div>

      <SideMenu />
      {children}
      <UserInfoProvider />
    </>
  );
};

export default AILayout;
