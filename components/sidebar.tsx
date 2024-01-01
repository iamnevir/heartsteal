"use client";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { Link, User } from "@nextui-org/react";
import {
  Drama,
  HeartPulseIcon,
  ImageIcon,
  KeyRound,
  LogOut,
  Settings,
  VenetianMask,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const Sidebar = () => {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const sidebarItems = [
    { icon: HeartPulseIcon, title: "Home", href: "/ai" },
    { icon: Drama, title: "Community Feed", href: "/ai/community-feed" },
    { icon: VenetianMask, title: "Personal Feed", href: "/ai/personal-feed" },
  ];
  const toolItems = [
    { icon: ImageIcon, title: "Image Generation", href: "/ai/generation" },
  ];
  const footerItems = [
    { icon: KeyRound, title: "API Access", href: "/ai/api" },
    { icon: Settings, title: "Settings", href: "/ai/settings" },
  ];
  if (pathname === "/ai/generation") {
    return null;
  }
  return (
    <div
      className={cn(
        " fixed z-[9999] dark:bg-black bg-white w-56 h-full hidden sm:flex flex-col items-start overflow-y-auto border-r border-white/65"
      )}
    >
      <Link href="/" className="flex items-center gap-1 p-5">
        <Logo width={50} />
        <p className="font-bold sm:flex hidden gradient-text">HeartSteal.Ai</p>
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
                : ""
            )}
          >
            <item.icon className="color-gr ml-5" />
            <span>{item.title}</span>
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
                : ""
            )}
          >
            <item.icon className="color-gr ml-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <div className=" flex flex-col w-full mt-auto gap-2">
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
                : ""
            )}
          >
            <item.icon className="color-gr ml-5" />
            <span>{item.title}</span>
          </Link>
        ))}
        <div
          onClick={() => signOut()}
          className={cn(
            " flex items-center cursor-pointer text-xs justify-start gap-3 rounded-md py-1 w-full hover:bg-black/10 dark:hover:bg-white/10 dark:text-white/65"
          )}
        >
          <LogOut className="ml-5" />
          <span>Logout</span>
        </div>
        <div
          className={cn(
            " flex items-center justify-start gap-3 rounded-md py-2 w-full  dark:text-white/65 text-xs"
          )}
        >
          <User
            className="ml-5"
            name={"iamnanhdz"}
            avatarProps={{
              title: "",
              name: "I",
              className: "w-[30px] h-[30px] bg-gr",
            }}
          />
        </div>

        <div className=" text-xs dark:text-white/65 ml-5 py-2">
          © Nevir Studio
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
