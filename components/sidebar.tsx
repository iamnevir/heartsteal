"use client";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { Chip, Divider, Link } from "@nextui-org/react";
import {
  Box,
  CandyCane,
  Codesandbox,
  Dna,
  Drama,
  Flame,
  HeartPulseIcon,
  LogOut,
  Paintbrush,
  Settings,
  VenetianMask,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Logo from "./logo";
import Profile from "./settings/profile";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import CoinControl from "./coin-control";

const Sidebar = ({ isMobile }: { isMobile: boolean }) => {
  const { signOut, user } = useClerk();
  const pathname = usePathname();
  const { language } = useLanguage();
  const sidebarItems = [
    {
      icon: HeartPulseIcon,
      title: language === "Vietnamese" ? "Trang chủ" : "Home",
      href: "/ai",
    },
    {
      icon: Drama,
      title: language === "Vietnamese" ? "Tin cộng đồng" : "Community Feed",
      href: "/ai/community-feed",
    },
    {
      icon: VenetianMask,
      title: language === "Vietnamese" ? "Tin cá nhân" : "Personal Feed",
      href: "/ai/personal-feed",
    },
    {
      icon: Flame,
      title: language === "Vietnamese" ? "Tin đã thích" : "Liked Posts",
      href: "/ai/like-posts",
    },
    {
      icon: Box,
      title: language === "Vietnamese" ? "Mô hình" : "Models",
      href: "/ai/models",
    },
  ];
  const toolItems = [
    {
      icon: Dna,
      title: language === "Vietnamese" ? "Tạo ảnh" : "Image Generation",
      href: "/ai/generation",
      isPro: false,
    },
    {
      icon: CandyCane,
      title: language === "Vietnamese" ? "Chỉnh sửa ảnh" : "Image Editor",
      href: "/ai/generation",
    },
    {
      icon: Codesandbox,
      title: language === "Vietnamese" ? "Ảnh từ ảnh" : "Image Variation",
      href: "/ai/generation",
    },
    {
      icon: Paintbrush,
      title: "Realtime Canvas",
      href: "/realtime-canvas",
      isPro: true,
    },
  ];
  const footerItems = [
    {
      icon: Settings,
      title: language === "Vietnamese" ? "Cài đặt" : "Settings",
      href: "/ai/settings",
    },
  ];

  if (pathname === "/ai/generation") {
    return null;
  }
  if (!user?.id) {
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
      {user?.id ? <CoinControl userId={user?.id} /> : null}
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
              isMobile ? "text-lg" : ""
            )}
          >
            <item.icon
              className={cn(
                "ml-5",
                isMobile && "w-7 h-7",
                pathname.includes(item.href) && " text-rose-500"
              )}
            />
            <span
              className={cn(
                pathname.includes(item.href) ? "gradient-text" : ""
              )}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <div className=" flex flex-col w-full gap-2 pb-1">
        <span className="p-3 text-sm">
          {language === "Vietnamese" ? "Công cụ của bạn" : "User tools"}
        </span>
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
              isMobile ? " text-lg" : ""
            )}
          >
            <item.icon
              className={cn(
                "ml-5",
                isMobile && "w-7 h-7",
                pathname === item.href && " text-rose-500"
              )}
            />
            <span className={cn(pathname === item.href ? "gradient-text" : "")}>
              {item.title}
            </span>
            {item.isPro && (
              <Chip size="sm" className="bg-gr">
                Pro
              </Chip>
            )}
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
              isMobile ? " text-lg" : ""
            )}
          >
            <item.icon
              className={cn(
                "ml-5",
                isMobile && "w-7 h-7",
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
            isMobile ? " text-lg" : ""
          )}
        >
          <LogOut
            className={cn(
              "ml-5 dark:text-red-900 text-red-500",
              isMobile ? "w-7 h-7" : ""
            )}
          />
          <span className="dark:text-red-900 text-red-500">
            {language === "Vietnamese" ? "Đăng xuất" : "Logout"}
          </span>
        </div>

        {user?.id ? <Profile userId={user?.id} /> : null}
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
