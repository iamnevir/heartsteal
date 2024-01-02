"use server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export default async function isValidName(v: string) {
  try {
    if (v.length >= 4 && v.length <= 15) {
      const user = await convex.query(api.user.getUserByName, {
        username: v?.replace(/\s/g, ""),
      });
      if (user) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
