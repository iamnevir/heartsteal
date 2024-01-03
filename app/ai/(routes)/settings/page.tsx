import { UserProfile } from "@clerk/nextjs";

const Settings = () => {
  return (
    <div className=" sm:pl-64 py-10 flex-col gap-3">
      <span className=" font-semibold text-lg sm:ml-0 ml-8">Settings</span>
      <div className="sm:-translate-x-[65px] -translate-x-[5px]">
        <UserProfile />
      </div>
    </div>
  );
};

export default Settings;
