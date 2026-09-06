import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function AboutCta() {
  return (
    <section className="px-6 py-20 text-center sm:py-28 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <SplitHeading>
          <h2 className="font-display text-3xl font-medium text-balance sm:text-4xl">
            Got a business problem software can solve?
          </h2>
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Thirty minutes, no pitch. Tell us what you&apos;re building and
            you&apos;ll leave with a straight answer.
          </p>
          <Magnetic className="mt-8 inline-block">
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              className="h-12 gap-2 rounded-full px-7 text-xs font-semibold tracking-widest uppercase"
            >
              Book a free strategy call
              <ArrowRight className="size-4" />
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
