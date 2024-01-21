"use client";

import UserManager from "@/components/admin/user/user-manager";
import { useUser } from "@clerk/nextjs";

const AdminPage = () => {
  const { user } = useUser();
  if (!user?.id) {
    return null;
  }
  return (
    <div>
      <UserManager userId={user.id} />
    </div>
  );
};

export default AdminPage;
