import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function createUser(userId: string) {
  await convex.mutation(api.user.create, {
    userId,
    like: [],
    upload: [],
  });
}
