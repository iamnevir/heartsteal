import BrainCanvas from "@/components/brain/brain-canvas";
import HeroSection from "@/components/hero-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const NavbarPage = dynamic(() => import("@/components/navbar"), { ssr: false });
export const metadata: Metadata = {
  title: "HeartSteal Ai",
  description: "Best Image Generation by HeartSteal.",
  openGraph: {
    siteName: "HeartSteal Ai",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    title: `HeartSteal Ai`,
    description: `Nền tảng tạo ảnh bằng AI số một dành cho người Việt.`,
    type: "website",
    images: ["logo.png"],
  },
};
export default function Home() {
  return (
    <>
      <NavbarPage />
      <div className=" w-full h-full relative flex flex-col md:flex-row items-center">
        <div className="absolute w-[70%] h-[70%] rounded-full white__gradient top-0 bg-gradient-to-br from-[#fa5560] via-[#b14bf4] to-[#4d91ff]" />
        <div className="md:w-[50dvw] w-[100dvw] h-full md:h-[100dvh] md:mt-0 mt-20 flex items-center justify-center flex-col">
          <HeroSection />
        </div>
        <div className=" md:w-[50dvw] w-[100dvw] relative z-10 h-[50dvh] md:h-[100dvh]">
          <BrainCanvas />
        </div>
        <span className=" absolute right-5 gradient-text bottom-5 font-semibold flex items-center">
          2023
        </span>
      </div>
    </>
  );
}
