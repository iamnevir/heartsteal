import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
  return (
    <div className=" pl-64 py-10 flex-col gap-3">
      <span className=" font-semibold text-lg">Settings</span>
      <div className=" -translate-x-[65px]">
        <UserProfile />
      </div>
    </div>
  );
};

export default Settings;
