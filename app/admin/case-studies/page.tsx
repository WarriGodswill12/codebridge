import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCaseStudy } from "./actions";

export default async function AdminCaseStudiesPage() {
  const projects = await fetchQuery(api.projects.list, {});

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl italic">Case studies</h1>
        <Button render={<Link href="/admin/case-studies/new" />} nativeButton={false}>
          New case study
        </Button>
      </div>

      <div className="mt-8 flex flex-col divide-y divide-border rounded-2xl border border-border">
        {projects.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">No case studies yet.</p>
        )}
        {projects.map((project) => (
          <div key={project._id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-muted-foreground">/work/{project.slug}</p>
            </div>
            <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>
    </div>
  );
}
