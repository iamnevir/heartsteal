import SearchBar from "@/components/community-feed/search-bar";
import PersonalFeed from "@/components/personal-feed/personal-feed";
import { Divider } from "@nextui-org/react";

const PersonalFeedPage = async () => {
  return (
    <div className="pl-64 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">Your</span> Creations
      </span>
      <SearchBar />
      <Divider className="mt-3" />
      <PersonalFeed />
    </div>
  );
};

export default PersonalFeedPage;
