import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostList({ posts }: { posts: Doc<"posts">[] }) {
  const [featured, ...rest] = posts;
  if (!featured) return null;

  return (
    <section className="px-6 pb-20 sm:pb-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-3xl bg-secondary p-8 transition-colors duration-300 hover:bg-secondary/70 sm:p-12"
          >
            <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              {formatDate(featured.date)}
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-medium text-balance sm:text-3xl lg:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-foreground uppercase">
              Read the article
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </Reveal>

        {rest.length > 0 && (
          <RevealGroup className="mt-6 flex flex-col" y={20} stagger={0.08}>
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-reveal-item
                className="group grid gap-2 border-t border-border py-8 last:border-b sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-8"
              >
                <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  {formatDate(post.date)}
                </span>
                <h3 className="font-display text-xl font-medium sm:text-2xl">{post.title}</h3>
                <ArrowUpRight className="hidden size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
              </Link>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
