import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getorders = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("order").collect();
    return orders;
  },
});
export const getorderById = query({
  args: {
    orderId: v.optional(v.id("order")),
  },
  handler: async (ctx, args) => {
    if (!args.orderId) {
      return null;
    }

    const order = await ctx.db.get(args.orderId);
    return order;
  },
});
export const getorderByorder = query({
  args: {
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("order")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    return order;
  },
});
export const create = mutation({
  args: {
    userId: v.id("user"),
    isPay: v.boolean(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.insert("order", {
      userId: args.userId,
      isPay: args.isPay,
    });
    return order;
  },
});

export const update = mutation({
  args: {
    id: v.id("order"),
    isPay: v.boolean(),
    amount: v.optional(v.number()),
    cardType: v.optional(v.string()),
    bank: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const order = await ctx.db.patch(args.id, {
      ...rest,
    });
    return order;
  },
});
