"use client";
import { useEffect } from "react";
import { Gradient } from "whatamesh";
const Lava = ({
  color,
}: {
  color: {
    "--gradient-color-1": string;
    "--gradient-color-2": string;
    "--gradient-color-3": string;
    "--gradient-color-4": string;
  };
}) => {
  const gradient = new Gradient();

  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <div className=" ">
      <canvas
        //@ts-ignore
        style={color}
        className=" h-[100dvh] w-[100dvw] fixed z-[-1]"
        id="gradient-canvas"
        data-transition-in
      />
    </div>
  );
};

export default Lava;
