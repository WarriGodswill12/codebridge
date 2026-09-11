import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import { EnquiriesTable } from "@/components/admin/enquiries-table";

export default async function AdminEnquiriesPage() {
  const token = await convexAuthNextjsToken();
  const leads = await fetchQuery(api.leads.list, {}, { token });

  return (
    <div>
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Leads</p>
      <h1 className="mt-2 font-display text-3xl italic">Enquiries</h1>
      <p className="mt-2 text-muted-foreground">Submissions from the contact form.</p>

      <div className="mt-8">
        <EnquiriesTable leads={leads} />
      </div>
    </div>
  );
}
