import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Codebridge.",
};

export default function CareersPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">Careers</h1>
    </main>
  );
}
