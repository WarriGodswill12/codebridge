import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { PostForm } from "@/components/admin/post-form";
import { savePost } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await convexAuthNextjsToken();
  const post = await fetchQuery(api.posts.getById, { id: id as Id<"posts"> }, { token });

  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Blog
      </Link>
      <h1 className="mt-4 font-display text-3xl italic">Edit {post.title}</h1>
      <div className="mt-8 max-w-3xl">
        <PostForm post={post} action={savePost} />
      </div>
    </div>
  );
}
