import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import { Mail, Newspaper, Image as ImageIcon, Wrench } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { Badge } from "@/components/ui/badge";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(input: string | number) {
  return new Date(input).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: typeof input === "string" ? "UTC" : undefined,
  });
}

export default async function AdminOverviewPage() {
  const token = await convexAuthNextjsToken();
  const [projects, services, posts, leads] = await Promise.all([
    fetchQuery(api.projects.list, {}),
    fetchQuery(api.services.list, {}),
    fetchQuery(api.posts.list, {}),
    fetchQuery(api.leads.list, {}, { token }),
  ]);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const recentLeads = leads.slice(0, 5);
  const recentPosts = posts.slice(0, 5);

  return (
    <div>
      <h1 className="font-display text-3xl">{greeting()}.</h1>
      <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening with Codebridge today.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="New enquiries"
          value={newLeads}
          icon={Mail}
          caption="Unread"
          linkLabel="View all"
          href="/admin/enquiries"
          tint="bg-primary/10 text-primary"
        />
        <StatCard
          label="Published posts"
          value={posts.length}
          icon={Newspaper}
          caption="Live"
          linkLabel="Manage"
          href="/admin/blog"
          tint="bg-blue-500/10 text-blue-600"
        />
        <StatCard
          label="Case studies"
          value={projects.length}
          icon={ImageIcon}
          caption={`${featuredCount} featured`}
          linkLabel="Manage"
          href="/admin/case-studies"
          tint="bg-violet-500/10 text-violet-600"
        />
        <StatCard
          label="Services"
          value={services.length}
          icon={Wrench}
          caption="Listed"
          linkLabel="Manage"
          href="/admin/services"
          tint="bg-amber-500/10 text-amber-600"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card shadow-sm shadow-black/3">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-medium">Recent enquiries</h3>
            <Link href="/admin/enquiries" className="text-xs text-muted-foreground hover:text-foreground">
              See all →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentLeads.map((lead) => (
                <li key={lead._id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{lead.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{lead.email}</p>
                  </div>
                  <Badge variant={lead.status === "new" ? "default" : "secondary"} className="capitalize">
                    {lead.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm shadow-black/3">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-medium">Recent posts</h3>
            <Link href="/admin/blog" className="text-xs text-muted-foreground hover:text-foreground">
              See all →
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentPosts.map((post) => (
                <li key={post._id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <p className="min-w-0 truncate text-sm font-medium">{post.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatDate(post.date)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/3">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-medium">Case studies</h3>
          <Link href="/admin/case-studies" className="text-xs text-muted-foreground hover:text-foreground">
            See all →
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No case studies yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium"></th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 6).map((project) => (
                  <tr key={project._id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                    <td className="px-5 py-3 font-medium">{project.title}</td>
                    <td className="px-5 py-3 text-muted-foreground">{project.category}</td>
                    <td className="px-5 py-3">
                      {project.featured && <Badge variant="secondary">Featured</Badge>}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/case-studies/${project._id}`}
                        className="font-medium hover:underline"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
