import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serializePostBody } from "@/lib/post-body-format";
import type { Doc } from "@/convex/_generated/dataModel";

export function PostForm({
  post,
  action,
}: {
  post?: Doc<"posts">;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      {post && <input type="hidden" name="id" value={post._id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post?.title} required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={post?.slug} required />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:w-48">
        <Label htmlFor="date">Date (YYYY-MM-DD)</Label>
        <Input id="date" name="date" defaultValue={post?.date} placeholder="2026-06-09" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} rows={2} required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="body">Body</Label>
        <p className="text-xs text-muted-foreground">
          One block per paragraph, separated by a blank line. <code># Heading</code> for a
          heading, <code>- item</code> lines for a bulleted list, and <code>| cell | cell</code>{" "}
          lines for a table (first line is the header row).
        </p>
        <Textarea
          id="body"
          name="body"
          defaultValue={post ? serializePostBody(post.body) : ""}
          rows={20}
          className="font-mono text-sm"
          required
        />
      </div>

      <Button type="submit" className="h-11 w-fit rounded-full px-8">
        {post ? "Save changes" : "Publish post"}
      </Button>
    </form>
  );
}
