import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    budget: v.optional(v.string()),
    projectType: v.optional(v.string()),
    message: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", { ...args, status: "new" });
  },
});
