import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCaseStudy } from "./actions";

export default async function AdminCaseStudiesPage() {
  const projects = await fetchQuery(api.projects.list, {});

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Content
          </p>
          <h1 className="mt-2 font-display text-3xl italic">Case studies</h1>
          <p className="mt-2 text-muted-foreground">
            Shown on /work, in the order set below.
          </p>
        </div>
        <Button render={<Link href="/admin/case-studies/new" />} nativeButton={false}>
          New case study
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        {projects.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No case studies yet — add the first one above.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium"></th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="size-8 shrink-0 rounded-lg"
                        style={{
                          background: project.coverImageUrl
                            ? `center / cover url(${project.coverImageUrl})`
                            : (project.accentColor ?? "#ff4328"),
                        }}
                      />
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-xs text-muted-foreground">/work/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{project.category}</td>
                  <td className="px-5 py-4 text-muted-foreground tabular-nums">{project.order}</td>
                  <td className="px-5 py-4">
                    {project.featured && <Badge variant="secondary">Featured</Badge>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        render={<Link href={`/admin/case-studies/${project._id}`} />}
                        nativeButton={false}
                        variant="outline"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <form action={deleteCaseStudy}>
                        <input type="hidden" name="id" value={project._id} />
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
