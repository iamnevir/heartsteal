"use client";
import SearchBar from "@/components/community-feed/search-bar";
import LikedPost from "@/components/liked-posts/liked-posts";
import { Divider } from "@nextui-org/react";
import { useState } from "react";

const LikedPosts = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">Your</span> Liked Post
      </span>
      <SearchBar setSearch={setSearch} search={search} />
      <Divider className="mt-3" />
      <LikedPost search={search} />
    </div>
  );
};

export default LikedPosts;
