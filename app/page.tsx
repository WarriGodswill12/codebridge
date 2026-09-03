import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { WorkShowcase } from "@/components/home/work-showcase";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { ScrollThemeController } from "@/components/theme/scroll-theme-controller";
import { LanguagePreloader } from "@/components/preloader/language-preloader";

export default function Home() {
  return (
    <main className="flex flex-1 overflow-x-hidden flex-col">
      <LanguagePreloader />
      <ScrollThemeController />
      <div data-theme="light">
        <Hero />
        <About />
        <WorkShowcase />
        <Process />
        <Services />
      </div>
      <WhatWeBuild />
    </main>
  );
}
