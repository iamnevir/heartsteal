"use client";
import SearchBar from "@/components/community-feed/search-bar";
import ProfileFeed from "@/components/profile/profile-feed";
import { api } from "@/convex/_generated/api";
import { useGridImage } from "@/hooks/use-grid";
import { useLanguage } from "@/hooks/use-language";
import { Divider } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { useState } from "react";

const ProfilePage = ({ params }: { params: { profileName: string } }) => {
  const user = useQuery(api.user.getUserByName, {
    username: params.profileName,
  });
  const [search, setSearch] = useState("");
  const { language } = useLanguage();
  const { grid, setGrid } = useGridImage();
  if (!user) {
    return null;
  }
  console.log(user);
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">
          {language === "Vietnamese" ? "Sáng tạo" : `${user.username}`}
        </span>{" "}
        {language === "Vietnamese" ? `Của ${user.username}` : "Creations"}
      </span>
      <SearchBar setGrid={setGrid} search={search} setSearch={setSearch} />
      <Divider className="mt-3" />
      <ProfileFeed userId={user?.userId} grid={grid} search={search} />
    </div>
  );
};

export default ProfilePage;
