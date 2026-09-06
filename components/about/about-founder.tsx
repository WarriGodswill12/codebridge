import { Reveal } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

export function AboutFounder() {
  return (
    <section className="px-6 py-16 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <ScrambleIn
            text="How it started"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
          <p className="mt-4 font-medium">Warri Godson</p>
          <p className="text-sm text-muted-foreground">
            Software Engineer &amp; Entrepreneur · Founder, Codebridge
          </p>
        </Reveal>

        <SplitHeading type="lines">
          <p className="text-xl leading-relaxed text-balance sm:text-2xl">
            Built after eight years of engineering software across sports
            analytics, international relocation, SEO platforms, and
            AI-driven products, for clients across the US, UK, Europe, and
            Africa. Enough time to see the same gap repeat on every project:
            the distance between what a developer builds and what a business
            actually needs. Codebridge is the fix.
          </p>
        </SplitHeading>
      </div>
    </section>
  );
}
