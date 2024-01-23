"use server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export const getModel = async (modelId?: string) => {
  if (!modelId) {
    return false;
  }
  const model = await convex.query(api.model.getmodelByModelId, {
    modelId,
  });
  if (!model) {
    return false;
  }
  if (model.isActive) {
    return true;
  } else {
    return false;
  }
};
