import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
      <Link
        href="/admin/case-studies"
        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Case studies
      </Link>
      <h1 className="mt-4 font-display text-3xl italic">Edit {project.title}</h1>
      <div className="mt-8 max-w-2xl">
        <CaseStudyForm project={project} action={saveCaseStudy} />
      </div>
    </div>
  );
}
