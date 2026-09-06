import type { Metadata } from "next";
import { InsightsHero } from "@/components/blog/insights-hero";
import { PostList } from "@/components/blog/post-list";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "SEO, automation, and product strategy content designed to help you convert more leads and scale operations.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <InsightsHero />
      <PostList posts={blogPosts} />
    </main>
  );
}
