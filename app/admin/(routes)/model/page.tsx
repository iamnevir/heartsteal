"use client";
import ModelManager from "@/components/admin/model/model-manager";
import { useUser } from "@clerk/nextjs";

const ModelPage = () => {
  const { user } = useUser();
  if (!user?.id) {
    return null;
  }
  return (
    <div>
      <ModelManager userId={user.id} />
    </div>
  );
};

export default ModelPage;
