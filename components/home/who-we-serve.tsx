import { Asterisk } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";
import { SpinIcon } from "@/components/motion/spin-icon";

export function WhoWeServe() {
  return (
    <section className="bg-primary px-6 py-20 text-center text-primary-foreground sm:py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal y={12}>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase">
            <SpinIcon duration={6}>
              <Asterisk className="size-4" />
            </SpinIcon>
            <ScrambleIn text="Who we serve" />
          </p>
        </Reveal>

        <SplitHeading delay={0.1}>
          <h2 className="mt-6 font-display text-2xl leading-[1.45] text-balance sm:text-3xl lg:text-4xl">
            We build reliable software for founders moving fast, operators outgrowing spreadsheets, and teams on real deadlines. No enterprise overhead.
          </h2>
        </SplitHeading>
      </div>
    </section>
  );
}
