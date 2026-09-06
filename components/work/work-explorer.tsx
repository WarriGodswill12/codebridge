"use client";

import { useMemo, useState } from "react";
import { FeaturedProjectCard, type ProjectWithCover } from "@/components/home/featured-project-card";
import { cn } from "@/lib/utils";

export function WorkExplorer({ projects }: { projects: ProjectWithCover[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const project of projects) {
      project.tags?.forEach((tag) => set.add(tag));
    }
    return Array.from(set).sort();
  }, [projects]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.tags?.includes(active));
  const [first, second, third, ...rest] = filtered;

  return (
    <>
      <section className="px-6 pt-32 pb-10 sm:pt-40 sm:pb-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Work
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-medium sm:text-5xl">
              Products we&apos;ve shipped.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Brand, product, and launch work for founders, built by a senior
              engineering team.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-lg lg:justify-end">
            <button
              type="button"
              onClick={() => setActive("All")}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === "All"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active === tag
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No projects match this filter yet.</p>
          ) : (
            <div key={active} className="grid animate-in grid-cols-1 gap-6 fade-in duration-500 md:grid-cols-3">
              {first && (
                <FeaturedProjectCard
                  project={first}
                  className="md:col-span-2"
                  imageClassName="md:aspect-[16/9]"
                />
              )}
              {second && (
                <FeaturedProjectCard
                  project={second}
                  className="md:col-span-1"
                  imageClassName="md:aspect-[3/4]"
                />
              )}
              {third && (
                <FeaturedProjectCard
                  project={third}
                  className="md:col-span-3"
                  imageClassName="md:aspect-[21/9]"
                />
              )}
              {rest.map((project) => (
                <FeaturedProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
