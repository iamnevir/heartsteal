import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getImages = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("image")
      .withIndex("by_public", (q) => q.eq("isPublish", true))
      .order("desc")
      .paginate(args.paginationOpts);
    return images;
  },
});
export const getImageById = query({
  args: {
    imageId: v.optional(v.id("image")),
  },
  handler: async (ctx, args) => {
    if (!args.imageId) {
      return null;
    }

    const image = await ctx.db.get(args.imageId);
    return image;
  },
});
export const getImageByIds = query({
  args: {
    imageIds: v.optional(v.array(v.id("image"))),
  },
  handler: async (ctx, args) => {
    if (!args.imageIds) {
      return null;
    }
    const images = args.imageIds?.map(async (item) => await ctx.db.get(item));

    return Promise.all(images);
  },
});
export const getImageByUser = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const image = await ctx.db
      .query("image")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isPublish"), true))
      .order("desc")
      .paginate(args.paginationOpts);
    return image;
  },
});
export const getImageByOwnUser = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const image = await ctx.db
      .query("image")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
    return image;
  },
});
export const create = mutation({
  args: {
    prompt: v.optional(v.string()),
    negativePrompt: v.optional(v.string()),
    url: v.string(),
    userId: v.string(),
    isPublish: v.boolean(),
    likes: v.number(),
    model: v.string(),
    size: v.string(),
  },
  handler: async (ctx, args) => {
    const image = await ctx.db.insert("image", {
      prompt: args.prompt,
      negativePrompt: args.negativePrompt,
      url: args.url,
      userId: args.userId,
      isPublish: args.isPublish,
      likes: args.likes,
      model: args.model,
      size: args.size,
    });
    return image;
  },
});
export const remove = mutation({
  args: {
    id: v.id("image"),
  },
  handler: async (ctx, args) => {
    const image = await ctx.db.delete(args.id);
    return image;
  },
});
export const update = mutation({
  args: {
    id: v.id("image"),
    isPublish: v.optional(v.boolean()),
    likes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const image = await ctx.db.patch(args.id, {
      ...rest,
    });
    return image;
  },
});
export const updateAll = mutation({
  args: {
    id: v.array(v.id("image")),
    isPublish: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const images = args.id.forEach(async (id) => {
      await ctx.db.patch(id, { isPublish: args.isPublish });
    });
    return images;
  },
});
export const removeAll = mutation({
  args: {
    id: v.array(v.id("image")),
  },
  handler: async (ctx, args) => {
    const images = args.id.forEach(async (id) => {
      await ctx.db.delete(id);
    });

    return images;
  },
});
