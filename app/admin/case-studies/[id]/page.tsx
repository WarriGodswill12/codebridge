import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { saveCaseStudy } from "../actions";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await convexAuthNextjsToken();
  const project = await fetchQuery(api.projects.getById, { id: id as Id<"projects"> }, { token });

  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl italic">Edit {project.title}</h1>
      <div className="mt-8 max-w-2xl">
        <CaseStudyForm project={project} action={saveCaseStudy} />
      </div>
    </div>
  );
}
