"use server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export const getAdmin = async (userId?: string) => {
  if (!userId) {
    return false;
  }
  const user = await convex.query(api.user.getUserByUser, {
    userId,
  });
  if (!user) {
    return false;
  }
  if (user?.isAdmin) {
    return true;
  } else {
    return false;
  }
};
