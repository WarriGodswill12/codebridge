import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";

const sections = [
  {
    href: "/admin/enquiries",
    title: "Enquiries",
    description: "Review and reply to contact-form submissions.",
  },
  {
    href: "/admin/case-studies",
    title: "Case studies",
    description: "Add, edit, and remove portfolio projects, including cover images.",
  },
  {
    href: "/admin/services",
    title: "Services",
    description: "Manage the services listed on the Services page.",
  },
  {
    href: "/admin/pricing",
    title: "Pricing",
    description: "Edit the fixed-price tiers shown on the Pricing page and homepage.",
  },
  {
    href: "/admin/blog",
    title: "Blog",
    description: "Write, edit, and remove Insights posts.",
  },
];

export default async function AdminOverviewPage() {
  const token = await convexAuthNextjsToken();
  const [projects, services, tiers, posts, leads] = await Promise.all([
    fetchQuery(api.projects.list, {}),
    fetchQuery(api.services.list, {}),
    fetchQuery(api.pricing.list, {}),
    fetchQuery(api.posts.list, {}),
    fetchQuery(api.leads.list, {}, { token }),
  ]);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div>
      <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">Overview</p>
      <h1 className="mt-2 font-display text-3xl italic">
        {newLeads > 0 ? "You've got enquiries to look at." : "What's live on the site."}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {newLeads > 0
          ? `${newLeads} enquir${newLeads === 1 ? "y hasn't" : "ies haven't"} been looked at yet.`
          : "Everything below is pulled straight from Convex — this is exactly what visitors see."}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {newLeads > 0 ? (
          <Link
            href="/admin/enquiries"
            className="col-span-2 flex min-h-32 flex-col justify-between rounded-2xl bg-foreground p-6 text-background transition-opacity hover:opacity-90 sm:col-span-1 sm:row-span-2 sm:min-h-full"
          >
            <span className="font-display text-4xl">{newLeads}</span>
            <span className="text-sm text-background/70">
              new enquir{newLeads === 1 ? "y" : "ies"}, unread
            </span>
          </Link>
        ) : (
          <div className="col-span-2 flex min-h-32 flex-col justify-between rounded-2xl bg-foreground p-6 text-background sm:col-span-1 sm:row-span-2 sm:min-h-full">
            <span className="font-display text-4xl">{projects.length}</span>
            <span className="text-sm text-background/70">
              case studies, {featuredCount} featured on the homepage
            </span>
          </div>
        )}
        <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-secondary p-6">
          <span className="font-display text-3xl">{projects.length}</span>
          <span className="text-sm text-muted-foreground">case studies</span>
        </div>
        <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-secondary p-6">
          <span className="font-display text-3xl">{services.length}</span>
          <span className="text-sm text-muted-foreground">services listed</span>
        </div>
        <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-secondary p-6">
          <span className="font-display text-3xl">{tiers.length}</span>
          <span className="text-sm text-muted-foreground">pricing tiers</span>
        </div>
        <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-secondary p-6">
          <span className="font-display text-3xl">{posts.length}</span>
          <span className="text-sm text-muted-foreground">posts published</span>
        </div>
        <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-secondary p-6">
          <span className="font-display text-3xl">{leads.length}</span>
          <span className="text-sm text-muted-foreground">enquiries, all time</span>
        </div>
      </div>

      <p className="mt-10 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Manage
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-border p-6 transition-colors hover:bg-secondary/60"
          >
            <p className="font-medium">{section.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
