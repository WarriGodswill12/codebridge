"use server";

import { revalidatePath } from "next/cache";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function saveTier(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const idValue = String(formData.get("id") ?? "");
  const fields = {
    name: String(formData.get("name") ?? ""),
    price: String(formData.get("price") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    description: String(formData.get("description") ?? ""),
    features: parseLines(formData.get("features")),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0),
  };

  if (idValue) {
    await fetchMutation(api.pricing.update, { id: idValue as Id<"pricingTiers">, ...fields }, { token });
  } else {
    await fetchMutation(api.pricing.create, fields, { token });
  }

  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  revalidatePath("/");
}

export async function deleteTier(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const id = formData.get("id") as Id<"pricingTiers">;
  await fetchMutation(api.pricing.remove, { id }, { token });
  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  revalidatePath("/");
}
