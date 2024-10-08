import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  image: defineTable({
    prompt: v.optional(v.string()),
    negativePrompt: v.optional(v.string()),
    url: v.string(),
    userId: v.string(),
    isPublish: v.boolean(),
    likes: v.number(),
    model: v.string(),
    size: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_public", ["isPublish"]),
  user: defineTable({
    userId: v.string(),
    username: v.optional(v.string()),
    favorite: v.optional(v.array(v.string())),
    like: v.array(v.id("image")),
    upload: v.array(v.string()),
    coin: v.optional(v.number()),
    isPro: v.optional(v.boolean()),
    isAdmin: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),
  order: defineTable({
    userId: v.id("user"),
    isPay: v.boolean(),
    amount: v.optional(v.number()),
    cardType: v.optional(v.string()),
    bank: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  model: defineTable({
    modelId: v.string(),
    isActive: v.boolean(),
    isPro: v.optional(v.boolean()),
    name: v.optional(v.string()),
    desc: v.optional(v.string()),
    author: v.optional(v.string()),
    size: v.optional(v.string()),
    version: v.optional(v.string()),
    baseModel: v.optional(v.string()),
    avatar: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  }).index("by_active", ["isActive"]),
});
