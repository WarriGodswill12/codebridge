import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Ideas and writing from Codebridge.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">Insights</h1>
    </main>
  );
}
