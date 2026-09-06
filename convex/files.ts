import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const deleteFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    await requireAdmin(ctx);
    await ctx.storage.delete(storageId);
  },
});
