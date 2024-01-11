"use client";
import Sidebar from "@/components/admin/side-bar";
import SideMenu from "@/components/admin/side-menu";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  if (!user?.id) {
    return null;
  }
  return (
    <>
      <div
        className={cn(
          " fixed z-[50] dark:bg-black bg-white w-56 h-full hidden sm:flex flex-col items-start overflow-y-auto"
        )}
      >
        <Sidebar userId={user.id!} />
      </div>
      {children}
      <SideMenu userId={user.id!} />
    </>
  );
};

export default AdminLayout;
