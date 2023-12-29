"use client";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import ModeToggle from "./theme-button";

const NavbarPage = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width:768px)");
  const auth = useAuth();
  const menuItems = ["Collections", "Contact", "API", "Github", "Discord"];
  const pathname = usePathname();
  return (
    <>
      <Navbar
        className={cn(" sm:fixed z-[99]")}
        isBordered={false}
        isBlurred
        shouldHideOnScroll
      >
        <NavbarContent justify="end" className="">
          <NavbarMenuToggle aria-label={"menu"} className="sm:hidden" />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-1 -ml-10">
              <Image
                src="https://utfs.io/f/727af1d5-8fe8-41db-adf6-9782fcf7c1a1-32summ.png"
                width={60}
                height={60}
                alt="logo"
              />
              <p className="font-bold sm:flex hidden gradient-text">
                HeartSteal.Ai
              </p>{" "}
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden sm:flex gap-12">
          <NavbarItem>
            <Link color="foreground" href="/collections">
              Collections
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contact" color="foreground">
              Contact
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/api">
              API
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {auth.userId ? (
            <>
              <NavbarItem>
                <UserButton />
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="flex">
                <SignInButton mode="modal">
                  <span className="gradient-text font-semibold duration-500 cursor-pointer">
                    Sign In
                  </span>
                </SignInButton>
              </NavbarItem>
            </>
          )}
          <ModeToggle />
          <NavbarItem>
            <Button
              as={Link}
              className="bg-gr px-5"
              href="/ai"
              variant="shadow"
            >
              Try It Now
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className=" w-full">
              <Link
                href={`/${item.toLowerCase()}`}
                className=" w-full flex flex-col px-1"
              >
                <div className="flex items-center h-full w-full ml-2 hover:border-l-1 hover:border-[#2670E9] border-l-0 hover:bg-gradient-to-r px-2 py-3 from-[#2670E9]/30 to-[2670E9]/0">
                  <div className="text-foreground font-semibold text-xl">
                    {item}
                  </div>
                </div>
                <div className="bg-gradient-to-r w-[90%] from-slate-200 mt-2 via-slate-500 to-slate-200 dark:from-slate-950  dark:via-slate-400 dark:to-slate-950 h-[1px]" />
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarPage;
