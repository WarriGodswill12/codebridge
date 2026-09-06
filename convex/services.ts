import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("services").withIndex("by_order").order("asc").collect();
  },
});

export const create = mutation({
  args: { title: v.string(), description: v.string(), order: v.number() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("services", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("services"),
    title: v.string(),
    description: v.string(),
    order: v.number(),
  },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  },
});
