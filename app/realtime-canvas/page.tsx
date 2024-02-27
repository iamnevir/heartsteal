"use client";
import RealtimeCanvas from "@/components/realtime-canvas/realtime-canvas";
import { useUser } from "@clerk/nextjs";

const CanvasPage = () => {
  const { user } = useUser();
  if (!user?.id) {
    return null;
  }
  return <RealtimeCanvas userId={user.id} />;
};

export default CanvasPage;
