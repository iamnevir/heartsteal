import { UserButton } from "@clerk/nextjs";

const AIPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/ai" />
    </div>
  );
};

export default AIPage;
