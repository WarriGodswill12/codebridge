import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

export async function WorkShowcase() {
  const projects = await fetchQuery(api.projects.listFeatured, {});

  if (projects.length === 0) return null;

  const [first, second, third, ...rest] = projects;

  return (
    <section className="px-6 pt-16 pb-16 sm:pt-20 sm:pb-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <ScrambleIn
                text="Work"
                className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
              />
              <SplitHeading>
                <h2 className="mt-4 max-w-2xl font-display text-3xl italic sm:text-4xl lg:text-5xl">
                  Recently shipped.
                </h2>
              </SplitHeading>
            </div>

            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-foreground uppercase"
            >
              View all work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3" y={32}>
          {first && (
            <FeaturedProjectCard
              project={first}
              className="md:col-span-2"
              imageClassName="md:aspect-[16/9]"
              data-reveal-item
            />
          )}
          {second && (
            <FeaturedProjectCard
              project={second}
              className="md:col-span-1"
              imageClassName="md:aspect-[3/4]"
              data-reveal-item
            />
          )}
          {third && (
            <FeaturedProjectCard
              project={third}
              className="md:col-span-3"
              imageClassName="md:aspect-[21/9]"
              data-reveal-item
            />
          )}
          {rest.map((project) => (
            <FeaturedProjectCard key={project._id} project={project} data-reveal-item />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
