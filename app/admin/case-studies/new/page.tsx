import { CaseStudyForm } from "@/components/admin/case-study-form";
import { saveCaseStudy } from "../actions";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display text-3xl italic">New case study</h1>
      <div className="mt-8 max-w-2xl">
        <CaseStudyForm action={saveCaseStudy} />
      </div>
    </div>
  );
}
