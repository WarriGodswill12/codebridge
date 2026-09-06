"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { uploadCoverImage } from "@/lib/admin-upload";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseMetrics(value: FormDataEntryValue | null) {
  return parseLines(value).map((line) => {
    const [first, ...rest] = line.split("|");
    return { value: (first ?? "").trim(), label: rest.join("|").trim() };
  });
}

function optionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

export async function deleteCaseStudy(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const id = formData.get("id") as Id<"projects">;
  await fetchMutation(api.projects.remove, { id }, { token });
  revalidatePath("/admin/case-studies");
  revalidatePath("/work");
}

export async function saveCaseStudy(formData: FormData) {
  const token = await convexAuthNextjsToken();
  if (!token) throw new Error("Not authenticated");

  const idValue = String(formData.get("id") ?? "");
  const id = idValue ? (idValue as Id<"projects">) : null;
  const removeCoverImage = formData.get("removeCoverImage") === "on";
  const file = formData.get("coverImage") as File | null;

  let newCoverImageId: Id<"_storage"> | undefined;
  if (file && file.size > 0) {
    newCoverImageId = await uploadCoverImage(file, token);
  }

  const fields = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    client: optionalString(formData, "client"),
    location: optionalString(formData, "location"),
    role: optionalString(formData, "role"),
    category: String(formData.get("category") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    result: optionalString(formData, "result"),
    year: optionalString(formData, "year"),
    url: optionalString(formData, "url"),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0),
    accentColor: optionalString(formData, "accentColor"),
    icon: optionalString(formData, "icon"),
    tags: parseLines(formData.get("tags")),
    challenge: optionalString(formData, "challenge"),
    approach: optionalString(formData, "approach"),
    techStack: parseLines(formData.get("techStack")),
    features: parseLines(formData.get("features")),
    metrics: parseMetrics(formData.get("metrics")),
  };

  if (id) {
    const existing = await fetchQuery(api.projects.getById, { id }, { token });
    const oldCoverImageId = existing?.coverImageId;
    const coverImageId = removeCoverImage ? undefined : (newCoverImageId ?? oldCoverImageId);

    await fetchMutation(api.projects.update, { id, ...fields, coverImageId }, { token });

    // Clean up the old file in storage if it was replaced or explicitly removed.
    if (oldCoverImageId && oldCoverImageId !== coverImageId) {
      await fetchMutation(api.files.deleteFile, { storageId: oldCoverImageId }, { token });
    }
  } else {
    await fetchMutation(api.projects.create, { ...fields, coverImageId: newCoverImageId }, { token });
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/work");
  revalidatePath(`/work/${fields.slug}`);
  redirect("/admin/case-studies");
}
