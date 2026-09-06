import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { WorkShowcase } from "@/components/home/work-showcase";
import { Results } from "@/components/home/results";
import { Testimonials } from "@/components/home/testimonials";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { WhoWeServe } from "@/components/home/who-we-serve";
import { ScrollThemeController } from "@/components/theme/scroll-theme-controller";
import { LanguagePreloader } from "@/components/preloader/language-preloader";

// Section order is a deliberate funnel, not just a visual sequence:
// hook (Hero) -> qualify (WhoWeServe: "is this us?") -> credibility
// (About) -> proof (Work, Results) -> de-risk the ask (Process, ending
// in a booking CTA) -> what you'd get (Services) -> dark capstone
// (WhatWeBuild) -> social proof (Testimonials) -> what it costs
// (Pricing) -> objection handling (Faq) -> final CTA (FinalCta, then
// Footer). Faq sits before FinalCta so it catches doubts right before
// the final ask instead of leaving them unanswered.
export default async function Home() {
  const tiers = await fetchQuery(api.pricing.list, {});

  return (
    <main className="flex flex-1 overflow-x-hidden flex-col">
      <LanguagePreloader />
      <ScrollThemeController />
      <Hero />
      <WhoWeServe />
      <div data-theme="light">
        <About />
        <WorkShowcase />
        <Results />
        <Process />
        <Services />
      </div>
      <WhatWeBuild />
      <Testimonials />
      <Pricing tiers={tiers} />
      <Faq />
      <FinalCta />
    </main>
  );
}
