import BrainCanvas from "@/components/brain/brain-canvas";
import NavbarPage from "@/components/navbar";
import { Button, Link } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <NavbarPage />
      <div className=" w-full h-full relative flex flex-col md:flex-row items-center">
        <div className="absolute w-[70%] h-[70%] rounded-full white__gradient top-0 bg-gradient-to-br from-[#fa5560] via-[#b14bf4] to-[#4d91ff]" />
        <div className="md:w-[50dvw] w-[100dvw] h-full md:h-[100dvh] md:mt-0 mt-20 flex items-center justify-center flex-col">
          <div className="md:w-[35dvw] w-[80dvw] flex flex-col items-start md:gap-3 gap-5">
            <span className=" text-4xl font-semibold ">
              Unleash your
              <span className="gradient-text"> Creativity </span>
              with the power of
              <span className="gradient-text"> HeartSteal Ai</span>
            </span>
            <span className=" text-lg">
              Create production-quality visual assets for your projects with
              unprecedented quality, speed, and style-consistency.
            </span>
            <Button
              as={Link}
              href="/ai"
              className="bg-gr hover:scale-105 duration-500 transition-all px-10 py-7 text-lg font-semibold"
              variant="shadow"
            >
              Create an account
            </Button>
            <span className=" ml-9 text-sm">No credit card needed</span>
          </div>
        </div>
        <div className=" md:w-[50dvw] w-full relative z-10 h-full md:h-[100dvh]">
          <BrainCanvas />
        </div>
      </div>
    </>
  );
}
