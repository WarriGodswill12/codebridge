import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioShelf } from "@/components/work/portfolio-shelf";

export function WorkShowcase() {
  return (
    <section className="px-6 pt-16 pb-16 sm:pt-20 sm:pb-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Work
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl italic sm:text-4xl lg:text-5xl">
              Seven tools, one working shelf.
            </h2>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-foreground uppercase"
          >
            View all work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl">
          <PortfolioShelf className="h-[70vh] min-h-130" />
        </div>
      </div>
    </section>
  );
}
