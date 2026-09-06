import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { projectIcons } from "@/lib/project-icons";
import type { Doc } from "@/convex/_generated/dataModel";

type ProjectWithCover = Doc<"projects"> & { coverImageUrl: string | null };

export function CaseStudyForm({
  project,
  action,
}: {
  project?: ProjectWithCover;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      {project && <input type="hidden" name="id" value={project._id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={project?.title} required />
        <Field label="Slug" name="slug" defaultValue={project?.slug} required />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Client" name="client" defaultValue={project?.client} />
        <Field label="Location" name="location" defaultValue={project?.location} />
        <Field label="Role" name="role" defaultValue={project?.role} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Category" name="category" defaultValue={project?.category} required />
        <Field label="Live URL" name="url" defaultValue={project?.url} />
      </div>

      <TextareaField label="Summary" name="summary" defaultValue={project?.summary} required rows={3} />

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Result (fallback if no metrics)" name="result" defaultValue={project?.result} />
        <Field label="Year" name="year" defaultValue={project?.year} />
        <Field label="Order (sort position)" name="order" type="number" defaultValue={project?.order ?? 0} required />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Accent color (hex)" name="accentColor" defaultValue={project?.accentColor} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="icon">Icon</Label>
          <select
            id="icon"
            name="icon"
            defaultValue={project?.icon ?? ""}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            <option value="">None</option>
            {Object.keys(projectIcons).map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={project?.featured} className="size-4" />
            Featured
          </label>
        </div>
      </div>

      <TextareaField
        label="Tags (one per line)"
        name="tags"
        defaultValue={project?.tags?.join("\n")}
        rows={3}
      />

      <TextareaField label="Challenge" name="challenge" defaultValue={project?.challenge} rows={3} />
      <TextareaField label="Our approach" name="approach" defaultValue={project?.approach} rows={3} />

      <TextareaField
        label="Tech stack (one per line)"
        name="techStack"
        defaultValue={project?.techStack?.join("\n")}
        rows={3}
      />

      <TextareaField
        label="What we built (one feature per line)"
        name="features"
        defaultValue={project?.features?.join("\n")}
        rows={4}
      />

      <TextareaField
        label={'Results metrics — one per line, formatted "value | label" (e.g. "10x | User growth")'}
        name="metrics"
        defaultValue={project?.metrics?.map((m) => `${m.value} | ${m.label}`).join("\n")}
        rows={4}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="coverImage">Cover image</Label>
        {project?.coverImageUrl && (
          <div className="relative mb-2 aspect-[21/9] w-full max-w-sm overflow-hidden rounded-lg">
            <Image src={project.coverImageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
        {project?.coverImageUrl && (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" name="removeCoverImage" className="size-4" />
            Remove current cover image
          </label>
        )}
        {!project?.coverImageUrl && (
          <p className="text-xs text-muted-foreground">
            No cover image uploaded yet — the case study page falls back to a gradient with the
            selected icon.
          </p>
        )}
      </div>

      <Button type="submit" className="h-11 w-fit rounded-full px-8">
        {project ? "Save changes" : "Create case study"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} required={required} />
    </div>
  );
}

function TextareaField({
  label,
  name,
  defaultValue,
  required,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} defaultValue={defaultValue} required={required} rows={rows} />
    </div>
  );
}
