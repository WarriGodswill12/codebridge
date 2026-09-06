import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await fetchQuery(api.posts.list, {});

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl italic">Blog</h1>
        <Button render={<Link href="/admin/blog/new" />} nativeButton={false}>
          New post
        </Button>
      </div>

      <div className="mt-8 flex flex-col divide-y divide-border rounded-2xl border border-border">
        {posts.length === 0 && <p className="p-6 text-sm text-muted-foreground">No posts yet.</p>}
        {posts.map((post) => (
          <div key={post._id} className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-muted-foreground">
                {post.date} · /blog/{post.slug}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                render={<Link href={`/admin/blog/${post._id}`} />}
                nativeButton={false}
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
              <form action={deletePost}>
                <input type="hidden" name="id" value={post._id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
