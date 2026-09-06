import { notFound } from "next/navigation";
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
      <h1 className="font-display text-3xl italic">Edit {post.title}</h1>
      <div className="mt-8 max-w-3xl">
        <PostForm post={post} action={savePost} />
      </div>
    </div>
  );
}
