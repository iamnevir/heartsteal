"use client";
import Lottie from "lottie-react";
import errorIcon from "@/public/404.json";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const Error = () => {
  const router = useRouter();
  return (
    <div className="h-[100dvh] w-[100dvw] items-center flex flex-col justify-center">
      <div className=" flex items-center gap-3">
        <div className=" text-3xl font-bold">404 Not Found</div>
        <Button onPress={() => router.push("/ai")} className="bg-gr">
          Go Back
        </Button>
      </div>

      <Lottie animationData={errorIcon} className="" />
    </div>
  );
};

export default Error;
