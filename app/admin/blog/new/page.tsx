import { PostForm } from "@/components/admin/post-form";
import { savePost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-3xl italic">New post</h1>
      <div className="mt-8 max-w-3xl">
        <PostForm action={savePost} />
      </div>
    </div>
  );
}
