"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import { deleteLead } from "@/app/admin/enquiries/actions";
import type { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

const statusBadge = {
  new: "default",
  contacted: "outline",
  qualified: "secondary",
  closed: "ghost",
} as const;

const tabs = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "closed", label: "Closed" },
] as const;

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EnquiriesTable({ leads }: { leads: Doc<"leads">[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("all");

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  const visible = active === "all" ? leads : leads.filter((l) => l.status === active);

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex flex-wrap gap-1 border-b border-border p-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              active === tab.key
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-secondary"
            )}
          >
            {tab.label}
            <span className="ml-1.5 tabular-nums opacity-70">{counts[tab.key]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted-foreground">
          {leads.length === 0
            ? "No enquiries yet — submissions from the contact form will show up here."
            : "Nothing in this status."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">From</th>
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">Message</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Received</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => (
                <tr key={lead._id} className="border-b border-border last:border-0 align-top hover:bg-secondary/40">
                  <td className="px-5 py-4">
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                    {lead.company && <p className="text-xs text-muted-foreground">{lead.company}</p>}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{lead.projectType ?? "—"}</td>
                  <td className="max-w-xs px-5 py-4 text-muted-foreground">
                    <p className="line-clamp-2">{lead.message}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-2">
                      <Badge variant={statusBadge[lead.status]} className="w-fit capitalize">
                        {lead.status}
                      </Badge>
                      <LeadStatusSelect id={lead._id} status={lead.status} />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground tabular-nums">
                    {formatDate(lead._creationTime)}
                  </td>
                  <td className="px-5 py-4">
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={lead._id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
