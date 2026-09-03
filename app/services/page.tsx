import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "What Codebridge does.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">Services</h1>
    </main>
  );
}
