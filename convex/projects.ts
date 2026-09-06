import { query, mutation, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { requireAdmin } from "./authHelpers";

async function withCoverImageUrl(ctx: QueryCtx, project: Doc<"projects">) {
  return {
    ...project,
    coverImageUrl: project.coverImageId ? await ctx.storage.getUrl(project.coverImageId) : null,
  };
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").withIndex("by_order").order("asc").collect();
    return Promise.all(projects.map((p) => withCoverImageUrl(ctx, p)));
  },
});

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("projects").withIndex("by_order").order("asc").collect();
    return Promise.all(all.filter((project) => project.featured).map((p) => withCoverImageUrl(ctx, p)));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    return project ? await withCoverImageUrl(ctx, project) : null;
  },
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const project = await ctx.db.get(id);
    return project ? await withCoverImageUrl(ctx, project) : null;
  },
});

const projectFields = {
  title: v.string(),
  slug: v.string(),
  client: v.optional(v.string()),
  location: v.optional(v.string()),
  role: v.optional(v.string()),
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
  challenge: v.optional(v.string()),
  approach: v.optional(v.string()),
  techStack: v.optional(v.array(v.string())),
  features: v.optional(v.array(v.string())),
  metrics: v.optional(v.array(v.object({ value: v.string(), label: v.string() }))),
  coverImageId: v.optional(v.id("_storage")),
};

export const create = mutation({
  args: projectFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("projects", args);
  },
});

export const update = mutation({
  args: { id: v.id("projects"), ...projectFields },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const project = await ctx.db.get(id);
    if (project?.coverImageId) {
      await ctx.storage.delete(project.coverImageId);
    }
    await ctx.db.delete(id);
  },
});
