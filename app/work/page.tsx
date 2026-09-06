import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { WorkExplorer } from "@/components/work/work-explorer";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work from Codebridge.",
};

export default async function WorkPage() {
  const projects = await fetchQuery(api.projects.list, {});

  return (
    <main className="flex flex-1 flex-col">
      <WorkExplorer projects={projects} />
       <FinalCta />
    </main>
  );
}
