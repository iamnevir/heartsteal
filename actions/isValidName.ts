"use server";

import { Doc } from "@/convex/_generated/dataModel";
import { backEndUrl } from "@/lib/utils";

export default async function isValidName(v: string) {
  try {
    if (v.length >= 4 && v.length <= 15) {
      const res = await fetch(`${backEndUrl}/user`, { method: "GET" });
      const users: any = await res.json();
      const current = users.user.filter(
        (f: any) => f.username === v?.replace(/\s/g, "")
      );
      if (current.length > 0) {
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
