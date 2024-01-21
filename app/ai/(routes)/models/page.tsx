"use client";
import SearchBar from "@/components/community-feed/search-bar";
import ModelList from "@/components/models/models-list";
import PersonalFeed from "@/components/personal-feed/personal-feed";
import { useGridImage } from "@/hooks/use-grid";
import { useLanguage } from "@/hooks/use-language";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

const ModelsPage = () => {
  const { language } = useLanguage();
  const { grid, setGrid } = useGridImage();
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {language === "Vietnamese" ? "Mô hình" : "Finetuned"}
        </span>{" "}
        {language === "Vietnamese" ? "AI" : "Models"}
      </span>
      <Divider className="mt-3" />
      <ModelList/>
    </div>
  );
};

export default ModelsPage;
