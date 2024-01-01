import { cn } from "@/lib/utils";
import Link from "next/link";

const UnderlineText = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <div className={cn(" flex items-start relative w-full")}>
      <Link
        href={href}
        className="link cursor-pointer relative whitespace-nowrap group overflow-hidden px-0"
      >
        {children}
        <svg
          className=" duration-1000 group-hover:-translate-x-[66%] group-hover:opacity-100 opacity-0 translate-x-0 absolute top-0 left-0 pointer-events-none fill-none dark:stroke-white stroke-black stroke-[3px]"
          width="300%"
          height="100%"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
        </svg>
      </Link>
    </div>
  );
};

export default UnderlineText;
