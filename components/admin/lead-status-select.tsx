"use client";

import { useTransition } from "react";
import { updateLeadStatus, type LeadStatus } from "@/app/admin/enquiries/actions";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

const statuses: LeadStatus[] = ["new", "contacted", "qualified", "closed"];

export function LeadStatusSelect({ id, status }: { id: Id<"leads">; status: LeadStatus }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(event) => {
        const next = event.target.value as LeadStatus;
        startTransition(() => {
          void updateLeadStatus(id, next);
        });
      }}
      className={cn(
        "h-8 rounded-md border border-input bg-transparent px-2 text-xs capitalize",
        isPending && "opacity-50"
      )}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
