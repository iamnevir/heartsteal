import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  image: defineTable({
    prompt: v.optional(v.string()),
    url: v.string(),
    userId: v.string(),
    isPublish: v.boolean(),
    likes: v.number(),
    model: v.string(),
    size: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_public", ["isPublish"]),
});
