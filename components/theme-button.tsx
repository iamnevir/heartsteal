"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={(v) => setTheme(v ? "light" : "dark")}
      defaultSelected
      size="md"
      classNames={{
        wrapper:
          theme === "light"
            ? "bg-gradient-to-r from-[#4d91ff] via-[#b14bf4] to-[#fa5560]"
            : "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]",
      }}
      startContent={<Sun />}
      endContent={<Moon />}
    ></Switch>
  );
}
