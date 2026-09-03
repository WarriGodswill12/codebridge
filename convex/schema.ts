import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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
});
