"use client";
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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import ModeToggle from "./theme-button";
import UnderlineText from "./link-underline";
import Logo from "./logo";
import { useLanguage } from "@/hooks/use-language";
import { useMediaQuery } from "usehooks-ts";

const NavbarPage = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useMediaQuery("(max-width:768px)");
  const menuItems = [
    {
      title: language === "Vietnamese" ? "Bộ sưu tập" : "Collections",
      href: "/ai/community-feed",
    },
    {
      title: language === "Vietnamese" ? "Liên hệ" : "Contact",
      href: "https://www.facebook.com/iamnanhdz",
    },
    { title: "API", href: "https://platform.openai.com/docs/guides/images" },
    { title: "Github", href: "https://github.com/iamnevir" },
    { title: "Discord", href: "#" },
  ];

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
            <Link href="/" className="flex items-center gap-1 -ml-5 sm:-ml-10">
              <Logo width={50} className="ml-4 mt-2 sm:mt-0 sm:ml-0" />
              <p className="font-bold sm:flex hidden gradient-text">
                HeartSteal.Ai
              </p>{" "}
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden sm:flex gap-8">
          <NavbarItem>
            <UnderlineText href="/ai/community-feed">
              {language === "Vietnamese" ? "Bộ sưu tập" : "Collections"}
            </UnderlineText>
          </NavbarItem>
          <NavbarItem>
            <UnderlineText href="https://www.facebook.com/iamnanhdz">
              {language === "Vietnamese" ? "Liên hệ" : "Contact"}
            </UnderlineText>
          </NavbarItem>
          <NavbarItem>
            <UnderlineText href="https://platform.openai.com/docs/guides/images">
              API
            </UnderlineText>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className=" gap-3">
          <NavbarItem>
            <Link
              color="foreground"
              href="https://github.com/iamnevir/heartsteal"
              className=" cursor-pointer flex items-center"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <radialGradient
                  id="radialGradient"
                  gradientTransform="rotate(-14)"
                >
                  <stop
                    offset="0.01%"
                    style={{ stopColor: "rgb(250,85,96);stop-opacity:1" }}
                  />
                  <stop
                    offset="49.9%"
                    style={{ stopColor: "rgb(177,75,244);stop-opacity:1" }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "rgb(77,145,255);stop-opacity:1" }}
                  />
                </radialGradient>
                <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="url(#radialGradient)"
                ></path>
              </svg>
            </Link>
          </NavbarItem>
          <ModeToggle />
          <NavbarItem>
            <Button
              as={Link}
              className="bg-gr px-5"
              href="/ai"
              variant="shadow"
            >
              {language === "Vietnamese" ? "Thử ngay" : "Try It Now"}
            </Button>
          </NavbarItem>
          {!isMobile && (
            <Select
              labelPlacement="outside"
              selectedKeys={language === "Vietnamese" ? ["vi"] : ["en"]}
              size="sm"
              variant="bordered"
              aria-labelledby="language"
              className="max-w-[70px]"
            >
              <SelectItem
                onPress={() => setLanguage("Vietnamese")}
                key="vi"
                value="Vietnamese"
              >
                Vi
              </SelectItem>
              <SelectItem
                onPress={() => setLanguage("English")}
                key="en"
                value="English"
              >
                En
              </SelectItem>
            </Select>
          )}
        </NavbarContent>
        <NavbarMenu className="">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className=" w-full">
              <Link href={item.href} className=" w-full flex flex-col px-1">
                <div className="flex items-center h-full w-full ml-2 hover:border-l-1 hover:border-[#2670E9] border-l-0 hover:bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]/10 px-2 py-3 ">
                  <div className="text-foreground font-semibold text-xl">
                    {item.title}
                  </div>
                </div>
                <div className="bg-gradient-to-r w-[90%] from-slate-200 mt-2 via-slate-500 to-slate-200 dark:from-slate-950  dark:via-slate-400 dark:to-slate-950 h-[1px]" />
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className="w-full">
            <Select
              labelPlacement="outside"
              selectedKeys={language === "Vietnamese" ? ["vi"] : ["en"]}
              size="lg"
              variant="bordered"
              aria-labelledby="language"
              className=""
            >
              <SelectItem
                onPress={() => setLanguage("Vietnamese")}
                key="vi"
                value="Vietnamese"
              >
                Vi
              </SelectItem>
              <SelectItem
                onPress={() => setLanguage("English")}
                key="en"
                value="English"
              >
                En
              </SelectItem>
            </Select>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarPage;
