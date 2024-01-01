import CommunityFeed from "@/components/community-feed/community-feed";
import SearchBar from "@/components/community-feed/search-bar";
import { clerkClient } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";

const CommunityFeedPage = async () => {
  const users = await clerkClient.users.getUserList();
  return (
    <div className="sm:pl-64 px-3 pt-5">
      <span className="font-semibold text-lg">
        <span className="gradient-text">Recent</span> Creations
      </span>
      <SearchBar />
      <Divider className="mt-3" />
      <CommunityFeed users={JSON.stringify(users)} />
    </div>
  );
};

export default CommunityFeedPage;
