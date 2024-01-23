"use client";

import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import { Moon, Sun, Wand2, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const FlyMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  return (
    <div className=" fixed sm:right-8 right-4 sm:bottom-12 bottom-8 z-[99999] flex flex-col gap-3">
      <Tooltip
        size="sm"
        delay={100}
        closeDelay={100}
        placement="left"
        content={language === "Vietnamese" ? "Chủ đề" : "Dark Mode"}
      >
        <div
          className={cn(
            "rounded-full  flex items-center justify-center w-10 h-10 bg-gr relative cursor-pointer duration-400",
            open
              ? "translate-y-0 opacity-100"
              : " translate-y-10 opacity-0 pointer-events-none"
          )}
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
        >
          <Sun className=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
          <Moon className=" absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
      </Tooltip>
      <Tooltip
        size="sm"
        delay={100}
        closeDelay={100}
        content={language === "Vietnamese" ? "Ngôn ngữ" : "Language"}
        placement="left"
      >
        <div
          className={cn(
            "rounded-full  flex items-center justify-center w-10 h-10 bg-gr relative cursor-pointer duration-300",
            open
              ? "translate-y-0 opacity-100"
              : " translate-y-10 opacity-0 pointer-events-none"
          )}
          onClick={() => {
            if (language === "Vietnamese") {
              setLanguage("English");
            } else {
              setLanguage("Vietnamese");
            }
          }}
        >
          <span
            className={cn(
              "ml-1 h-[1.2rem] w-[1.2rem] transition-all absolute",
              language === "Vietnamese"
                ? "rotate-0 scale-100"
                : "-rotate-90 scale-0"
            )}
          >
            Vi
          </span>
          <span
            className={cn(
              "ml-1 h-[1.2rem] w-[1.2rem] transition-all absolute",
              language === "English"
                ? "rotate-0 scale-100"
                : "-rotate-90 scale-0"
            )}
          >
            En
          </span>
        </div>
      </Tooltip>
      <Tooltip
        size="sm"
        delay={100}
        closeDelay={100}
        placement="left"
        content={"Magic Menu"}
      >
        <div
          className="rounded-full  flex items-center justify-center w-10 h-10 bg-gr relative cursor-pointer"
          onClick={() => setOpen((o) => !o)}
        >
          <X
            className={cn(
              " h-[1.2rem] w-[1.2rem] transition-all absolute",
              open ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )}
          />
          <Wand2
            className={cn(
              " h-[1.2rem] w-[1.2rem] transition-all absolute",
              !open ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default FlyMenu;
