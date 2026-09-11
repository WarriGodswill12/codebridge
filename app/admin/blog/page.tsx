import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePost } from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function AdminBlogPage() {
  const posts = await fetchQuery(api.posts.list, {});

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Content
          </p>
          <h1 className="mt-2 font-display text-3xl italic">Blog</h1>
          <p className="mt-2 text-muted-foreground">Posts published to /blog.</p>
        </div>
        <Button render={<Link href="/admin/blog/new" />} nativeButton={false}>
          New post
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No posts yet — write the first one above.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Published</th>
                <th className="px-5 py-3 font-medium"></th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-4">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground tabular-nums">
                    {formatDate(post.date)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="secondary">Live</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
