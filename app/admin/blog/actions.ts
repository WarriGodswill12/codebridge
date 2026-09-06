"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { parsePostBody } from "@/lib/post-body-format";

export async function savePost(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const idValue = String(formData.get("id") ?? "");

  const fields = {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    date: String(formData.get("date") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    body: parsePostBody(String(formData.get("body") ?? "")),
  };

  if (idValue) {
    await fetchMutation(api.posts.update, { id: idValue as Id<"posts">, ...fields }, { token });
  } else {
    await fetchMutation(api.posts.create, fields, { token });
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const id = formData.get("id") as Id<"posts">;
  await fetchMutation(api.posts.remove, { id }, { token });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
