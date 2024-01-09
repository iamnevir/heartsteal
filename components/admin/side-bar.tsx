"use client";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import Logo from "../logo";
import { ListOrdered, LogOut, User2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Link } from "@nextui-org/react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loading from "@/app/loading";
const Sidebar = ({ userId }: { userId: string }) => {
  const { signOut } = useClerk();
  const { language } = useLanguage();
  const user = useQuery(api.user.getUserByUser, { userId });
  const isMobile = useMediaQuery("(max-width:768px)");
  const pathname = usePathname();
  const sidebarItems = [
    {
      icon: User2,
      title: language === "Vietnamese" ? "Người dùng" : "User",
      href: "/admin",
    },
    {
      icon: ListOrdered,
      title: language === "Vietnamese" ? "Đơn hàng" : "Order",
      href: "/admin/order",
    },
  ];
  if (user === undefined) {
    return <Loading />;
  }
  if (!user?.isAdmin) {
    return null;
  }

  return (
    <>
      <Link
        href="/"
        className={cn(
          "flex items-center gap-1 px-5 pt-5",
          isMobile ? "p-3" : ""
        )}
      >
        {isMobile ? (
          <Image src="/logo.png" width={50} height={50} alt="" />
        ) : (
          <Logo width={50} />
        )}

        <p
          className={cn("font-bold gradient-text", isMobile ? " text-xl" : "")}
        >
          HeartSteal.Ai
        </p>
      </Link>
      <div className=" flex flex-col w-full gap-2">
        {sidebarItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            color="foreground"
            className={cn(
              " flex items-center justify-start gap-3 rounded-md py-1 w-full hover:bg-black/10 dark:hover:bg-white/10 dark:text-white/65 text-xs",
              pathname === item.href
                ? "dark:text-white dark:bg-white/10 bg-black/10"
                : "",
              pathname === item.href
                ? "dark:text-white dark:bg-white/10 bg-black/10"
                : "",
              isMobile ? " text-xl" : ""
            )}
          >
            <item.icon
              className={cn(
                "ml-5",
                isMobile && "w-8 h-8",
                pathname === item.href && " text-rose-500"
              )}
            />
            <span className={cn(pathname === item.href ? "gradient-text" : "")}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>

      <div className=" flex flex-col w-full gap-2 mt-auto">
        <div
          onClick={() => signOut()}
          className={cn(
            " flex items-center cursor-pointer text-xs justify-start gap-3 rounded-md py-1 w-full hover:bg-black/10 dark:hover:bg-white/10 dark:text-white/65",
            isMobile ? " text-xl" : ""
          )}
        >
          <LogOut
            className={cn("ml-5 text-red-900", isMobile ? "w-8 h-8" : "")}
          />
          <span className="text-red-900">
            {language === "Vietnamese" ? "Đăng xuất" : "Logout"}
          </span>
        </div>

        <div
          className={cn(
            " text-xs dark:text-white/65 ml-5 py-2",
            isMobile ? " text-sm" : ""
          )}
        >
          © Nevir Studio
        </div>
      </div>
    </>
  );
};

export default Sidebar;
