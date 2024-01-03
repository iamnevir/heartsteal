"use client";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { Link } from "@nextui-org/react";
import {
  CandyCane,
  Codesandbox,
  Dna,
  Drama,
  Flame,
  HeartPulseIcon,
  LogOut,
  Settings,
  VenetianMask,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Logo from "./logo";
import Profile from "./settings/profile";
import Image from "next/image";

const Sidebar = ({ isMobile }: { isMobile: boolean }) => {
  const { signOut } = useClerk();
  const pathname = usePathname();

  const sidebarItems = [
    { icon: HeartPulseIcon, title: "Home", href: "/ai" },
    { icon: Drama, title: "Community Feed", href: "/ai/community-feed" },
    { icon: VenetianMask, title: "Personal Feed", href: "/ai/personal-feed" },
    { icon: Flame, title: "Liked Posts", href: "/ai/like-posts" },
  ];
  const toolItems = [
    { icon: Dna, title: "Image Generation", href: "/ai/generation" },
    { icon: CandyCane, title: "Image Editor", href: "/ai/generation" },
    { icon: Codesandbox, title: "Image Variation", href: "/ai/generation" },
  ];
  const footerItems = [
    { icon: Settings, title: "Settings", href: "/ai/settings" },
  ];

  if (pathname === "/ai/generation") {
    return null;
  }

  return (
    <>
      <Link
        href="/"
        className={cn("flex items-center gap-1 p-5", isMobile ? "p-3" : "")}
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
              pathname.includes(item.href) && item.href !== "/ai"
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
      <div className=" flex flex-col w-full gap-2">
        <span className="p-3">User tools</span>
        {toolItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            color="foreground"
            className={cn(
              " flex items-center justify-start gap-3 rounded-md py-1 w-full hover:bg-black/10 dark:hover:bg-white/10 dark:text-white/65 text-xs",
              pathname.includes(item.href) && item.href !== "/ai"
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
        {footerItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            color="foreground"
            className={cn(
              " flex items-center justify-start gap-3 rounded-md py-1 w-full hover:bg-black/10 dark:hover:bg-white/10 dark:text-white/65 text-xs",
              pathname.includes(item.href) && item.href !== "/ai"
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
          <span className="text-red-900">Logout</span>
        </div>

        <Profile />
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
