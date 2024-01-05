"use client";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@clerk/nextjs";
import { Button, Link } from "@nextui-org/react";
const HeroSection = () => {
  const auth = useAuth();
  const language = useLanguage();
  return (
    <div className="md:w-[37dvw] w-[88dvw] flex flex-col items-start md:gap-3 gap-5">
      <span className=" md:text-5xl text-3xl font-semibold ">
        {language.language === "Vietnamese" ? "Khai mở" : "Unleash your"}
        <span className="gradient-text">
          {" "}
          {language.language === "Vietnamese"
            ? "Sự sáng tạo"
            : "Creativity"}{" "}
        </span>
        {language.language === "Vietnamese"
          ? "với sức mạnh của"
          : "with the power of"}

        <span className="gradient-text"> HeartSteal Ai</span>
      </span>
      <span className=" md:text-lg text-base">
        {language.language === "Vietnamese"
          ? "Tạo nội dung trực quan có chất lượng sản xuất cho dự án của bạn với chất lượng, tốc độ và tính nhất quán về phong cách chưa từng có."
          : " Create production-quality visual assets for your projects with unprecedented quality, speed, and style-consistency."}
      </span>
      <Button
        as={Link}
        href="/ai"
        className="bg-gr hover:scale-105 duration-500 transition-all px-10 py-7 text-lg font-semibold"
        variant="shadow"
      >
        {!auth.isSignedIn
          ? language.language === "Vietnamese"
            ? "Tạo tài khoản ngay"
            : "Create an account"
          : language.language === "Vietnamese"
          ? "Tạo ảnh ngay"
          : "Generation Now"}
      </Button>
      <span className="text-sm">
        {language.language === "Vietnamese"
          ? "Không yêu cầu thẻ"
          : "No credit card needed"}
      </span>
    </div>
  );
};

export default HeroSection;
