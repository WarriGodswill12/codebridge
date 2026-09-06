import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

const contentBlock = v.union(
  v.object({ type: v.literal("paragraph"), text: v.string() }),
  v.object({ type: v.literal("heading"), text: v.string() }),
  v.object({ type: v.literal("list"), items: v.array(v.string()) }),
  v.object({
    type: v.literal("table"),
    headers: v.array(v.string()),
    rows: v.array(v.array(v.string())),
  })
);

export const list = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("asc").collect();
    // Sort by the post's own `date` field (newest first); `.order("asc")`
    // above is just a stable base ordering (creation order) so posts that
    // share a date keep a deterministic, predictable order relative to
    // each other instead of depending on object insertion order.
    return posts.sort((a, b) => b.date.localeCompare(a.date));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    return await ctx.db.get(id);
  },
});

const postFields = {
  slug: v.string(),
  title: v.string(),
  date: v.string(),
  excerpt: v.string(),
  body: v.array(contentBlock),
};

export const create = mutation({
  args: postFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("posts", args);
  },
});

export const update = mutation({
  args: { id: v.id("posts"), ...postFields },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  },
});
