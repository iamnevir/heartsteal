"use client";
import SearchBar from "@/components/community-feed/search-bar";
import LikedPost from "@/components/liked-posts/liked-posts";
import { useGridImage } from "@/hooks/use-grid";
import { useLanguage } from "@/hooks/use-language";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

const LikedPosts = () => {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();
  const { grid, setGrid } = useGridImage();
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {" "}
          {language === "Vietnamese" ? "Bài đăng" : "Your"}
        </span>{" "}
        {language === "Vietnamese" ? "bạn đã thích" : "Liked Post"}
      </span>
      <SearchBar setGrid={setGrid} setSearch={setSearch} search={search} />
      <Divider className="mt-3" />
      <LikedPost grid={grid} search={search} />
    </div>
  );
};

export default LikedPosts;
