import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  leads: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    budget: v.optional(v.string()),
    projectType: v.optional(v.string()),
    message: v.string(),
    source: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("closed")
    ),
  })
    .index("by_status", ["status"]),

  projects: defineTable({
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
    role: v.optional(v.string()),
    challenge: v.optional(v.string()),
    approach: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),
    metrics: v.optional(v.array(v.object({ value: v.string(), label: v.string() }))),
    coverImageId: v.optional(v.id("_storage")),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  services: defineTable({
    title: v.string(),
    description: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  pricingTiers: defineTable({
    name: v.string(),
    price: v.string(),
    timeline: v.string(),
    description: v.string(),
    features: v.array(v.string()),
    featured: v.optional(v.boolean()),
    order: v.number(),
  }).index("by_order", ["order"]),

  posts: defineTable({
    slug: v.string(),
    title: v.string(),
    date: v.string(),
    excerpt: v.string(),
    body: v.array(
      v.union(
        v.object({ type: v.literal("paragraph"), text: v.string() }),
        v.object({ type: v.literal("heading"), text: v.string() }),
        v.object({ type: v.literal("list"), items: v.array(v.string()) }),
        v.object({
          type: v.literal("table"),
          headers: v.array(v.string()),
          rows: v.array(v.array(v.string())),
        })
      )
    ),
  }).index("by_slug", ["slug"]),
});
