import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutFounder } from "@/components/about/about-founder";
import { LocationsMarquee } from "@/components/about/locations-marquee";
import { AboutValues } from "@/components/about/about-values";
import { AboutStats } from "@/components/about/about-stats";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Codebridge is a fully stacked engineering team founded to close the gap between what a developer builds and what a business actually needs.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AboutHero />
      <AboutFounder />
      <LocationsMarquee />
      <AboutValues />
      <AboutStats />
      <AboutCta />
    </main>
  );
}
