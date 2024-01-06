import Image from "next/image";

export default function Loading() {
  return (
    <div className=" w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div className=" rounded-[30px] w-40 h-40 flex items-center justify-center">
        <div className=" rotating-element absolute rounded-[40px] w-40 h-40 bg-gr flex items-center justify-center" />
        <Image
          src="/logo.png"
          width={200}
          height={200}
          priority
          alt=""
          className=" rounded-full shadow-md absolute shadow-black z-10"
        />
      </div>
    </div>
  );
}
