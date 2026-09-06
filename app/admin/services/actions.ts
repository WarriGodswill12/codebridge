"use server";

import { revalidatePath } from "next/cache";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export async function saveService(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const idValue = String(formData.get("id") ?? "");
  const fields = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    order: Number(formData.get("order") ?? 0),
  };

  if (idValue) {
    await fetchMutation(api.services.update, { id: idValue as Id<"services">, ...fields }, { token });
  } else {
    await fetchMutation(api.services.create, fields, { token });
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function deleteService(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const id = formData.get("id") as Id<"services">;
  await fetchMutation(api.services.remove, { id }, { token });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
