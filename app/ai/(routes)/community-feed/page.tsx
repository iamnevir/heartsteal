"use client";
import CommunityFeed from "@/components/community-feed/community-feed";
import SearchBar from "@/components/community-feed/search-bar";
import { useLanguage } from "@/hooks/use-language";
import { Divider, SliderValue } from "@nextui-org/react";
import { useState } from "react";

const CommunityFeedPage = () => {
  const [search, setSearch] = useState("");
  const [grid, setGrid] = useState<SliderValue>(5);
  const { language } = useLanguage();
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {language === "Vietnamese" ? "Sáng tạo" : "Recent"}
        </span>{" "}
        {language === "Vietnamese" ? "Gần đây" : "Creations"}
      </span>
      <SearchBar setGrid={setGrid} setSearch={setSearch} search={search} />
      <Divider className="mt-3" />
      <CommunityFeed grid={grid} search={search} />
    </div>
  );
};

export default CommunityFeedPage;
