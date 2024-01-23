import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getmodels = query({
  handler: async (ctx) => {
    const models = await ctx.db
      .query("model")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .collect();
    return models;
  },
});
export const getmodelsforAdmin = query({
  handler: async (ctx) => {
    const models = await ctx.db
      .query("model")

      .order("desc")
      .collect();
    return models;
  },
});
export const getmodelById = query({
  args: {
    modelId: v.optional(v.id("model")),
  },
  handler: async (ctx, args) => {
    if (!args.modelId) {
      return null;
    }

    const model = await ctx.db.get(args.modelId);
    return model;
  },
});
export const getmodelByModelId = query({
  args: {
    modelId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.modelId) {
      return null;
    }

    const model = await ctx.db
      .query("model")
      .filter((f) => f.eq(f.field("modelId"), args.modelId))
      .first();
    return model;
  },
});
export const create = mutation({
  args: {
    modelId: v.string(),
    isActive: v.boolean(),
    name: v.optional(v.string()),
    desc: v.optional(v.string()),
    isPro: v.optional(v.boolean()),
    author: v.optional(v.string()),
    size: v.optional(v.string()),
    version: v.optional(v.string()),
    baseModel: v.optional(v.string()),
    avatar: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const model = await ctx.db.insert("model", {
      modelId: args.modelId,
      isActive: args.isActive,
      isPro: args.isPro,
      name: args.name,
      desc: args.desc,
      author: args.author,
      size: args.size,
      version: args.version,
      baseModel: args.baseModel,
      avatar: args.avatar,
      createdBy: args.createdBy,
      updatedBy: args.updatedBy,
    });
    return model;
  },
});
export const remove = mutation({
  args: {
    id: v.id("model"),
  },
  handler: async (ctx, args) => {
    const model = await ctx.db.delete(args.id);
    return model;
  },
});
export const update = mutation({
  args: {
    id: v.id("model"),
    modelId: v.optional(v.string()),
    isPro: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
    name: v.optional(v.string()),
    desc: v.optional(v.string()),
    author: v.optional(v.string()),
    size: v.optional(v.string()),
    version: v.optional(v.string()),
    baseModel: v.optional(v.string()),
    avatar: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    updatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const model = await ctx.db.patch(args.id, {
      ...rest,
    });
    return model;
  },
});
export const removeAll = mutation({
  args: {
    id: v.array(v.id("model")),
  },
  handler: async (ctx, args) => {
    const models = args.id.forEach(async (id) => {
      await ctx.db.delete(id);
    });

    return models;
  },
});
