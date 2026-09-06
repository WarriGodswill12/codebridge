import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_order").order("asc").collect();
  },
});

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("projects").withIndex("by_order").order("asc").collect();
    return all.filter((project) => project.featured);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    client: v.optional(v.string()),
    location: v.optional(v.string()),
    category: v.string(),
    summary: v.string(),
    result: v.optional(v.string()),
    year: v.optional(v.string()),
    url: v.optional(v.string()),
    featured: v.boolean(),
    order: v.number(),
    accentColor: v.optional(v.string()),
    icon: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});
