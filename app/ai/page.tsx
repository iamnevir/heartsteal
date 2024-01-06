"use client";
import { Button } from "@nextui-org/react";
import CommunityFeedPage from "./(routes)/community-feed/page";
import { PartyPopper } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";
const AIPage = () => {
  const language = useLanguage();
  return (
    <>
      <div className=" w-full h-full flex-col flex">
        <div className="font-semibold px-3 text-lg sm:pl-64 mt-5 gap-5 flex-col sm:flex-row flex items-center w-full">
          <span>
            <span className="gradient-text">
              {language.language === "Vietnamese" ? "Bắt đầu" : "Get Started"}
            </span>{" "}
            {language.language === "Vietnamese" ? "ở đây" : "Here"}
          </span>
          <Button
            as={Link}
            href="/ai/generation"
            variant="shadow"
            className="bg-gr hover:scale-105 rounded-lg sm:w-fit w-full px-7 gap-3 font-semibold text-sm py-3"
          >
            <PartyPopper className="w-5 h-5" />
            {language.language === "Vietnamese"
              ? "Tạo ảnh mới"
              : "Create New Image"}
          </Button>
        </div>
        <CommunityFeedPage />
      </div>
    </>
  );
};

export default AIPage;
