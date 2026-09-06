import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pricingTiers").withIndex("by_order").order("asc").collect();
  },
});

const tierFields = {
  name: v.string(),
  price: v.string(),
  timeline: v.string(),
  description: v.string(),
  features: v.array(v.string()),
  featured: v.optional(v.boolean()),
  order: v.number(),
};

export const create = mutation({
  args: tierFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("pricingTiers", args);
  },
});

export const update = mutation({
  args: { id: v.id("pricingTiers"), ...tierFields },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("pricingTiers") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  },
});
