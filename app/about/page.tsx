import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Codebridge.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">About</h1>
    </main>
  );
}
