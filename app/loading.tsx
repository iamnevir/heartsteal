import Image from "next/image";

export default function Loading() {
  return (
    <div className=" w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div className=" rounded-[30px] w-40 h-40 flex items-center justify-center">
        <div className=" rounded-[30px] w-36 h-36 flex items-center justify-center">
          <div className=" rotating-element absolute rounded-[40px] w-28 h-28 loading-gr flex items-center justify-center" />
          <Image
            src="/placeholder.png"
            width={120}
            height={120}
            alt=""
            className=" rounded-full absolute z-10"
          />
        </div>
      </div>
    </div>
  );
}
