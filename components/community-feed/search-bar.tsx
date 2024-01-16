import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Button, Input, Slider, SliderValue } from "@nextui-org/react";
import {
  Bot,
  Codesandbox,
  Film,
  Globe2,
  Grid,
  Instagram,
  LayoutList,
  Palette,
  SearchIcon,
  Snail,
  Waves,
} from "lucide-react";

const SearchBar = ({
  search,
  setSearch,
  setGrid,
}: {
  search: string;
  setGrid: (v: SliderValue) => void;
  setSearch: (v: string) => void;
}) => {
  const { language } = useLanguage();
  const category = [
    {
      title: "Tất cả",
      icon: LayoutList,
    },
    {
      title: "8k",
      icon: Film,
    },
    {
      title: "Vintage",
      icon: Globe2,
    },
    {
      title: "Anime",
      icon: Snail,
    },
    {
      title: "Robot",
      icon: Bot,
    },
    {
      title: "Photography",
      icon: Instagram,
    },
    {
      title: "Van Gogh",
      icon: Palette,
    },
    {
      title: "Water",
      icon: Waves,
    },
    {
      title: "Cyberpunk",
      icon: Codesandbox,
    },
  ];
  return (
    <>
      <div className="py-3 flex items-center gap-4">
        <div className=" flex items-center gap-4 max-w-md">
          <Input
            aria-label=""
            isClearable
            radius="sm"
            onValueChange={setSearch}
            labelPlacement="outside"
            placeholder={
              language === "Vietnamese"
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
            {language === "Vietnamese" ? "Tìm kiếm" : "Search"}
          </Button>
        </div>

        <Slider
          aria-label="a"
          size="lg"
          color="danger"
          startContent={<Grid />}
          classNames={{
            filler: "bg-gr",
            base: "px-2 gap-1 ml-auto min-[1200px]:flex hidden",
          }}
          onChange={setGrid}
          step={1}
          showSteps={true}
          maxValue={5}
          minValue={1}
          defaultValue={5}
          className="max-w-md"
          renderThumb={({ index, ...props }) => (
            <div
              {...props}
              className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
            >
              <span
                className={cn(
                  "transition-transform bg-gr shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80"
                )}
              />
            </div>
          )}
        />
      </div>
      <div className=" flex items-center flex-wrap gap-2">
        {category.map((item, index) => (
          <div
            onClick={() =>
              setSearch(
                item.title === "All" || item.title === "Tất cả"
                  ? ""
                  : item.title.toLowerCase()
              )
            }
            key={index}
            className={cn(
              " cursor-pointer dark:bg-[#101622] bg-slate-300 hover:bg-gradient-to-r hover:text-white from-[#fa5560] via-[#b14bf4] to-[#4d91ff] duration-500 rounded-full gap-2 flex items-center justify-center px-3 py-1",
              item.title === "Tất cả" && search === ""
                ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff] text-white"
                : "",
              search.toLowerCase() === item.title.toLowerCase()
                ? "bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff] text-white"
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
