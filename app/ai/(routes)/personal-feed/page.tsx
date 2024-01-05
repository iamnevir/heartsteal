"use client";
import SearchBar from "@/components/community-feed/search-bar";
import PersonalFeed from "@/components/personal-feed/personal-feed";
import { useLanguage } from "@/hooks/use-language";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

const PersonalFeedPage = async () => {
  const [search, setSearch] = useState("");
  const language = useLanguage();
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {language.language === "Vietnamese" ? "Sáng tạo" : "Your"}
        </span>{" "}
        {language.language === "Vietnamese" ? "Của bạn" : "Creations"}
      </span>
      <SearchBar search={search} setSearch={setSearch} />
      <Divider className="mt-3" />
      <PersonalFeed search={search} />
    </div>
  );
};

export default PersonalFeedPage;
