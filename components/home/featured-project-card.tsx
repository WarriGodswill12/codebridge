import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { projectIcons } from "@/lib/project-icons";
import { cn } from "@/lib/utils";

export function FeaturedProjectCard({
  project,
  className,
  imageClassName,
  ...props
}: {
  project: Doc<"projects">;
  className?: string;
  imageClassName?: string;
} & Record<`data-${string}`, string | boolean | undefined>) {
  const Icon = (project.icon && projectIcons[project.icon]) || Sparkles;
  const accent = project.accentColor ?? "#ff4328";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn("group flex flex-col", className)}
      {...props}
    >
      <div
        className={cn(
          "relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[0.98]",
          imageClassName
        )}
        style={{
          background: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent}, black 55%))`,
        }}
      >
        <Icon
          className="size-16 text-white/25 transition-transform duration-500 ease-out group-hover:scale-110 sm:size-20"
          strokeWidth={1.25}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl italic sm:text-3xl">{project.title}</h3>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
        {project.summary}
      </p>
    </Link>
  );
}
