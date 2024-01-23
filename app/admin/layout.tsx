"use client";
import { getAdmin } from "@/actions/getAdmin";
import Sidebar from "@/components/admin/side-bar";
import SideMenu from "@/components/admin/side-menu";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [u, setU] = useState(false);
  useEffect(() => {
    isAdmin();
  }, [user?.id]);
  const isAdmin = async () => {
    if (!user?.id) {
      return;
    }
    const u = await getAdmin(user.id);

    setU(u);
  };

  if (!user) {
    return null;
  }
  if (!u) {
    return null;
  }
  return (
    <>
      <div
        className={cn(
          " fixed z-[50] dark:bg-black bg-white w-56 h-full hidden sm:flex flex-col items-start overflow-x-hidden overflow-y-auto"
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
