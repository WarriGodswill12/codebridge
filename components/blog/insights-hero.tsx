import { Reveal } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

export function InsightsHero() {
  return (
    <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal y={16}>
          <ScrambleIn
            text="Insights"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] font-medium text-balance sm:text-5xl lg:text-6xl">
            Practical growth playbooks for modern teams.
          </h1>
        </SplitHeading>

        <Reveal delay={0.15} y={16}>
          <p className="mt-8 max-w-lg text-lg text-muted-foreground">
            SEO, automation, and product strategy content designed to help
            you convert more leads and scale operations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
