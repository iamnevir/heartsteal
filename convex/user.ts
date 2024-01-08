import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("user").collect();
    return users;
  },
});
export const getUserByName = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();
    return users;
  },
});
export const getUserById = query({
  args: {
    userId: v.optional(v.id("user")),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      return null;
    }

    const user = await ctx.db.get(args.userId);
    return user;
  },
});
export const getUserByUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    return user;
  },
});
export const create = mutation({
  args: {
    userId: v.string(),
    username: v.optional(v.string()),
    favorite: v.optional(v.array(v.string())),
    like: v.array(v.id("image")),
    upload: v.array(v.string()),
    coin: v.optional(v.number()),
    isPro: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const current = await ctx.db
      .query("user")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    if (current) {
      return;
    } else {
      const user = await ctx.db.insert("user", {
        userId: args.userId,
        username: args.username,
        favorite: args.favorite,
        like: args.like,
        upload: args.upload,
        coin: args.coin,
        isPro: args.isPro,
      });
      return user;
    }
  },
});
export const remove = mutation({
  args: {
    id: v.id("user"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.delete(args.id);
    return user;
  },
});
export const update = mutation({
  args: {
    id: v.id("user"),
    username: v.optional(v.string()),
    favorite: v.optional(v.array(v.string())),
    like: v.optional(v.array(v.id("image"))),
    upload: v.optional(v.array(v.string())),
    coin: v.optional(v.number()),
    isPro: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const user = await ctx.db.patch(args.id, {
      ...rest,
    });
    return user;
  },
});
export const resetCoin = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("user").collect();
    if (!users) {
      return;
    }
    for (let i = 0; i < users.length; i++) {
      await ctx.db.patch(users[i]._id, {
        coin: 150,
      });
    }
  },
});
