import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { InsightsHero } from "@/components/blog/insights-hero";
import { PostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "SEO, automation, and product strategy content designed to help you convert more leads and scale operations.",
};

export default async function BlogPage() {
  const posts = await fetchQuery(api.posts.list, {});

  return (
    <main className="flex flex-1 flex-col">
      <InsightsHero />
      <PostList posts={posts} />
    </main>
  );
}
