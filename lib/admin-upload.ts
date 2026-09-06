import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export async function uploadCoverImage(file: File, token: string): Promise<Id<"_storage">> {
  const uploadUrl = await fetchMutation(api.files.generateUploadUrl, {}, { token });
  const result = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!result.ok) {
    throw new Error("Failed to upload image");
  }
  const { storageId } = (await result.json()) as { storageId: Id<"_storage"> };
  return storageId;
}
