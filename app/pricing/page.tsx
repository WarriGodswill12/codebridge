import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed-price engagement tiers for web applications, from focused single-purpose builds to complex, multi-module platforms.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PricingHero />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}
