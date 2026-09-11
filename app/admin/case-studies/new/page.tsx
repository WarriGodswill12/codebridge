import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { saveCaseStudy } from "../actions";

export default function NewCaseStudyPage() {
  return (
    <div>
      <Link
        href="/admin/case-studies"
        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Case studies
      </Link>
      <h1 className="mt-4 font-display text-3xl italic">New case study</h1>
      <div className="mt-8 max-w-2xl">
        <CaseStudyForm action={saveCaseStudy} />
      </div>
    </div>
  );
}
