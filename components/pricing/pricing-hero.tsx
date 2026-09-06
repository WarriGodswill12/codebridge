import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function PricingHero() {
  return (
    <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:px-10">
      <div className="mx-auto max-w-8xl px-10 md:flex flex-row justify-between gap-6 sm:gap-8 lg:gap-10">
        <SplitHeading delay={0.1}>
          <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.1] font-medium text-balance sm:text-5xl lg:text-6xl">
            One price. One scope. No hourly clock.
          </h1>
        </SplitHeading>

        <Reveal delay={0.15} y={16}>
          <p className="mt-8 max-w-lg text-lg text-muted-foreground">
            We agree on exactly what we&apos;ll build before a line of code
            gets written, then price it as a fixed engagement. No surprise
            invoices, no scope creep billed by the hour.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
