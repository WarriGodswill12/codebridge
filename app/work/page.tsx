import type { Metadata } from "next";
import { PortfolioShelf } from "@/components/work/portfolio-shelf";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work from Codebridge.",
};

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PortfolioShelf />
    </main>
  );
}
