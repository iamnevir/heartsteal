"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { usePathname } from "next/navigation";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const pathname = usePathname();
  return (
    <ClerkProvider
      appearance={
        !isMobile
          ? {
              baseTheme: dark,
              elements: {
                headerTitle: pathname === "/" ? "" : "text-black",
                headerSubtitle: "gradient-text",
                formFieldLabel: pathname === "/" ? "" : "text-black",
                formFieldInput: pathname === "/" ? "" : "text-black",
                modalContent: "ml-[300px] mt-[80px] ",
                formButtonPrimary:
                  "hover:scale-[1.05] shadow-[0_0px_30px_-10px_rgba(77,145,255,0.8)]",
                socialButtonsBlockButton:
                  " bg-[#e1f0f6] gradient-text  hover:bg-[#e0eff6] hover:scale-[1.05] shadow-[0_0px_30px_-10px_rgba(77,145,255,0.8)]",
                card: " rounded-tr-[10px] rounded-br-[10px] rounded-tl-[0px] rounded-bl-[0px] border-transparent h-[550px]",
                footerAction: " hidden",
              },
              layout: {
                socialButtonsPlacement: "top",
                socialButtonsVariant: "auto",
              },
            }
          : {
              baseTheme: dark,
              elements: {
                formButtonPrimary:
                  "hover:scale-[1.05] shadow-[0_0px_30px_-10px_rgba(77,145,255,0.8)]",
                socialButtonsBlockButton:
                  " bg-[#e1f0f6] gradient-text  hover:bg-[#e0eff6] hover:scale-[1.05] shadow-[0_0px_30px_-10px_rgba(77,145,255,0.8)]",
                card: "ml-0 rounded-tr-[10px] rounded-br-[10px] rounded-tl-[0px] rounded-bl-[0px] border-transparent h-[550px] mr-[50px]",
              },
              layout: {
                socialButtonsPlacement: "top",
                socialButtonsVariant: "auto",
              },
            }
      }
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
