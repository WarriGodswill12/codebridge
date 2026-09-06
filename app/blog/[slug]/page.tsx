import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PostContent } from "@/components/blog/post-content";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await fetchQuery(api.posts.getBySlug, { slug });

  if (!post) return { title: "Insights" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await fetchQuery(api.posts.getBySlug, { slug });

  if (!post) notFound();

  return (
    <main className="flex flex-1 flex-col px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All insights
        </Link>

        <span className="mt-8 block text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          {formatDate(post.date)}
        </span>

        <h1 className="mt-4 font-display text-3xl font-medium text-balance sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {post.excerpt}
        </p>

        <div className="mt-12 border-t border-border pt-10">
          <PostContent blocks={post.body} />
        </div>
      </div>
    </main>
  );
}
