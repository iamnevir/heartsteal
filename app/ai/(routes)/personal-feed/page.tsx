"use client";
import SearchBar from "@/components/community-feed/search-bar";
import PersonalFeed from "@/components/personal-feed/personal-feed";
import { useGridImage } from "@/hooks/use-grid";
import { useLanguage } from "@/hooks/use-language";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

const PersonalFeedPage = () => {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();
  const { grid, setGrid } = useGridImage();
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {language === "Vietnamese" ? "Sáng tạo" : "Your"}
        </span>{" "}
        {language === "Vietnamese" ? "Của bạn" : "Creations"}
      </span>
      <SearchBar setGrid={setGrid} search={search} setSearch={setSearch} />
      <Divider className="mt-3" />
      <PersonalFeed grid={grid} search={search} />
    </div>
  );
};

export default PersonalFeedPage;
