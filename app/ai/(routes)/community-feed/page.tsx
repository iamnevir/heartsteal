"use client";
import CommunityFeed from "@/components/community-feed/community-feed";
import SearchBar from "@/components/community-feed/search-bar";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

const CommunityFeedPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">Recent</span> Creations
      </span>
      <SearchBar setSearch={setSearch} search={search} />
      <Divider className="mt-3" />
      <CommunityFeed search={search} />
    </div>
  );
};

export default CommunityFeedPage;
