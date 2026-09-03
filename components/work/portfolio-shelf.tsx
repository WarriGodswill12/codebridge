"use client";

import { CompleteShelfLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { cn } from "@/lib/utils";

export function PortfolioShelf({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-[90vh] w-full", className)}>
      <CompleteShelfLandingPage
        headingFont="iowan-old-style"
        bodyFont="inter"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#ff4328"
        headingSize={60}
        bodySize={12}
        headingLetterSpacing={-0.055}
      />
    </div>
  );
}
