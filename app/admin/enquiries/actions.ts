"use server";

import { revalidatePath } from "next/cache";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

export async function updateLeadStatus(id: Id<"leads">, status: LeadStatus) {
  const token = await convexAuthNextjsToken();
  await fetchMutation(api.leads.updateStatus, { id, status }, { token });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  const token = await convexAuthNextjsToken();
  const id = formData.get("id") as Id<"leads">;
  await fetchMutation(api.leads.remove, { id }, { token });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
