import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/post-form";
import { savePost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Blog
      </Link>
      <h1 className="mt-4 font-display text-3xl italic">New post</h1>
      <div className="mt-8 max-w-3xl">
        <PostForm action={savePost} />
      </div>
    </div>
  );
}
