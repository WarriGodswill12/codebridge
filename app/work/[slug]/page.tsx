export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;

  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">Case study: {slug}</h1>
    </main>
  );
}
