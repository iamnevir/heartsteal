import { Button } from "@nextui-org/react";
import CommunityFeedPage from "./(routes)/community-feed/page";
import { PartyPopper } from "lucide-react";
import Link from "next/link";

const AIPage = () => {
  return (
    <div className=" w-full h-full flex-col flex">
      <div className="font-semibold text-lg pl-64 mt-5 gap-5 flex items-center w-full">
        <span>
          <span className="gradient-text">Get Started</span> Here
        </span>
        <Button
          as={Link}
          href="/ai/generation"
          variant="shadow"
          className="bg-gr hover:scale-105 rounded-lg sm:w-fit w-full px-7 gap-3 font-semibold text-sm py-3"
        >
          <PartyPopper className="w-5 h-5" />
          Create New Image
        </Button>
      </div>

      <CommunityFeedPage />
    </div>
  );
};

export default AIPage;
