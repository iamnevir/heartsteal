"use client";

import { useUser } from "@clerk/nextjs";
import UserInfoModal from "../user-info-modal";

const UserInfoProvider = () => {
  const { user } = useUser();
  if (!user?.id) {
    return null;
  }
  return <UserInfoModal userId={user.id} />;
};

export default UserInfoProvider;
