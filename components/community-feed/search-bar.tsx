import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Button, Input } from "@nextui-org/react";
import {
  Cake,
  Film,
  Instagram,
  LayoutList,
  Palette,
  SearchIcon,
  Skull,
  Snail,
  UsersRound,
} from "lucide-react";

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) => {
  const language = useLanguage();
  const category = [
    {
      title: language.language === "Vietnamese" ? "Tất cả" : "All",
      icon: LayoutList,
    },
    {
      title: language.language === "Vietnamese" ? "Hoạt hình" : "Motion",
      icon: Film,
    },
    {
      title: language.language === "Vietnamese" ? "Nhiếp ảnh" : "Photography",
      icon: Instagram,
    },
    {
      title: "Anime",
      icon: Snail,
    },
    {
      title: language.language === "Vietnamese" ? "Vẽ" : "Art",
      icon: Palette,
    },
    {
      title: language.language === "Vietnamese" ? "Nhân vật" : "Character",
      icon: UsersRound,
    },
    {
      title: language.language === "Vietnamese" ? "Thức ăn" : "Food",
      icon: Cake,
    },
    {
      title: "Alien",
      icon: Skull,
    },
  ];
  return (
    <>
      <div className=" max-w-sm py-3 flex items-center gap-4">
        <Input
          isClearable
          radius="sm"
          onValueChange={setSearch}
          labelPlacement="outside"
          placeholder={
            language.language === "Vietnamese"
              ? "Tìm kiếm bằng lệnh..."
              : "search by prompt..."
          }
          startContent={
            <SearchIcon className="w-4 h-4 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />{" "}
        <Button
          variant="shadow"
          className="bg-gr hover:scale-105 rounded-lg sm:w-fit w-[40%] sm:px-10 font-semibold text-sm py-3"
        >
          {language.language === "Vietnamese" ? "Tìm kiếm" : "Search"}
        </Button>
      </div>
      <div className=" flex items-center flex-wrap gap-2">
        {category.map((item, index) => (
          <div
            onClick={() => setSearch(item.title === "All" ? "" : item.title)}
            key={index}
            className={cn(
              " cursor-pointer dark:bg-[#101622] bg-slate-300 hover:bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 rounded-full gap-2 flex items-center justify-center px-3 py-1",
              item.title === "All" || (item.title === "Tất cả" && search === "")
                ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                : "",
              search === item.title
                ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]"
                : ""
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
