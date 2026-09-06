import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function ServicesCta() {
  return (
    <section className="px-6 py-20 text-center sm:py-28 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <SplitHeading>
          <h2 className="font-display text-3xl font-medium text-balance sm:text-4xl">
            Not sure which of these you need?
          </h2>
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Tell us the bottleneck, not the solution. We&apos;ll tell you
            which of these actually fixes it, and if none of them do.
          </p>
          <Magnetic className="mt-8 inline-block">
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              className="h-12 gap-2 rounded-full px-7 text-xs font-semibold tracking-widest uppercase"
            >
              Book a 15-min call
              <ArrowRight className="size-4" />
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
