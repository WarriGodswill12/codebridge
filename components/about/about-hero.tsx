import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

export function AboutHero() {
  return (
    <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal y={16}>
          <ScrambleIn
            text="About"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] font-medium text-balance sm:text-5xl lg:text-6xl">
            Engineers who think like operators.
          </h1>
        </SplitHeading>

        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2" y={16} stagger={0.08}>
          <p data-reveal-item className="max-w-md text-lg text-muted-foreground">
            Codebridge exists to close the gap between what a developer builds
            and what a business actually needs.
          </p>
          <p data-reveal-item className="max-w-md text-muted-foreground">
            We&apos;re a fully stacked team, not a solo consultancy or a
            contractor network: software engineers, cybersecurity engineers,
            data scientists, and IT consultants, with a senior engineer on
            every project instead of a junior developer behind a PM relay
            chain.
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
