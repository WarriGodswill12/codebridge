import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { FinalCta } from "@/components/home/final-cta";
import { FloatingVisitButton } from "@/components/work/floating-visit-button";
import { projectIcons } from "@/lib/project-icons";

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await fetchQuery(api.projects.getBySlug, { slug });

  if (!project) return { title: "Work" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const [project, allProjects] = await Promise.all([
    fetchQuery(api.projects.getBySlug, { slug }),
    fetchQuery(api.projects.list, {}),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const Icon = (project.icon && projectIcons[project.icon]) || Sparkles;
  const accent = project.accentColor ?? "#ff4328";

  const meta = [
    project.location && { label: "Location", value: project.location },
    project.role && { label: "Role", value: project.role },
    project.url && { label: "Live URL", value: project.url, href: project.url },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <main className="flex flex-1 flex-col px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All work
        </Link>

        <Reveal delay={0.05}>
          {project.coverImageUrl ? (
            <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-3xl">
              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 768px, 100vw"
                priority
              />
            </div>
          ) : (
            <div
              className="mt-8 flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent}, black 55%))`,
              }}
            >
              <Icon className="size-20 text-white/25 sm:size-28" strokeWidth={1.25} />
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              {project.category}
            </span>
            {project.year && (
              <span className="text-xs text-muted-foreground">{project.year}</span>
            )}
          </div>
        </Reveal>

        <SplitHeading delay={0.15}>
          <h1 className="mt-4 font-display text-4xl italic sm:text-5xl">
            {project.title}
          </h1>
        </SplitHeading>

        <Reveal delay={0.2}>
          {(project.client || project.location) && (
            <p className="mt-3 text-muted-foreground">
              {[project.client, project.location].filter(Boolean).join(" · ")}
            </p>
          )}

          <p className="mt-8 text-lg leading-relaxed text-foreground sm:text-xl">
            {project.summary}
          </p>
        </Reveal>

        {meta.length > 0 && (
          <RevealGroup className="mt-10 flex flex-col" y={12} stagger={0.06}>
            {meta.map((row) => (
              <div
                key={row.label}
                data-reveal-item
                className="flex items-center justify-between gap-4 border-t border-border py-4 last:border-b"
              >
                <span className="text-sm font-medium">{row.label}</span>
                {row.href ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Visit site
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{row.value}</span>
                )}
              </div>
            ))}
          </RevealGroup>
        )}

        {project.challenge && (
          <Reveal>
            <div className="mt-14 border-t border-border pt-10">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                The challenge
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground sm:text-lg">
                {project.challenge}
              </p>
            </div>
          </Reveal>
        )}

        {project.approach && (
          <Reveal>
            <div className="mt-12">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Our approach
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground sm:text-lg">
                {project.approach}
              </p>
            </div>
          </Reveal>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <Reveal>
            <div className="mt-12">
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Tech stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {project.features && project.features.length > 0 && (
          <RevealGroup className="mt-12" y={16} stagger={0.06}>
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              What we built
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  data-reveal-item
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  <span className="leading-relaxed sm:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </RevealGroup>
        )}

        {project.metrics && project.metrics.length > 0 ? (
          <div className="mt-14 border-t border-border pt-10">
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Results
            </p>
            <RevealGroup
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              y={16}
              stagger={0.08}
            >
              {project.metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  data-reveal-item
                  className={
                    i === 0
                      ? "flex min-h-32 flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground"
                      : "flex min-h-32 flex-col justify-between rounded-2xl bg-secondary p-6 text-secondary-foreground"
                  }
                >
                  <span className="font-display text-3xl sm:text-4xl">
                    <CountUp value={metric.value} />
                  </span>
                  <span
                    className={
                      i === 0
                        ? "text-sm leading-snug text-primary-foreground/80"
                        : "text-sm leading-snug text-muted-foreground"
                    }
                  >
                    {metric.label}
                  </span>
                </div>
              ))}
            </RevealGroup>
          </div>
        ) : (
          project.result && (
            <Reveal>
              <div className="mt-10 border-t border-border pt-8">
                <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Result
                </p>
                <p className="mt-3 text-xl font-medium sm:text-2xl">{project.result}</p>
              </div>
            </Reveal>
          )
        )}

        {allProjects.length > 1 && (
          <Reveal>
            <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-10">
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex flex-col gap-1 rounded-2xl bg-secondary p-6 transition-colors hover:bg-secondary/70"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Previous
                </span>
                <span className="font-display text-lg italic sm:text-xl">
                  {prevProject.title}
                </span>
              </Link>

              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col items-end gap-1 rounded-2xl bg-secondary p-6 text-right transition-colors hover:bg-secondary/70"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Next
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="font-display text-lg italic sm:text-xl">
                  {nextProject.title}
                </span>
              </Link>
            </div>
          </Reveal>
        )}
      </div>

      <div className="mt-20">
        <FinalCta />
      </div>

      {project.url && <FloatingVisitButton url={project.url} />}
    </main>
  );
}
