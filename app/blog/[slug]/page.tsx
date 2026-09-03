export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">Post: {slug}</h1>
    </main>
  );
}
