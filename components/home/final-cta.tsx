import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

const CLUTCH_URL = "https://clutch.co/profile/code-bridge-agency";

function renderValue(value: string) {
  if (!value.includes("Clutch")) return value;
  const [before, after] = value.split("Clutch");
  return (
    <>
      {before}
      <a
        href={CLUTCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-foreground"
      >
        Clutch
      </a>
      {after}
    </>
  );
}

// Real, manually-tracked availability — update this number as slots
// actually fill up or free up. The month is computed from the current
// date, not hardcoded, so this doesn't go stale on its own.
const SLOTS_OPEN = 2;

function currentMonthName() {
  return new Date().toLocaleString("en-US", { month: "long" });
}


const stats = [
  { label: "Slots open", value: `${SLOTS_OPEN} for ${currentMonthName()}` },
  { label: "Clients served", value: "15+ across 4 continents" },
  { label: "Client rating", value: "4.8 on Clutch" },
  
];

export function FinalCta() {
  return (
    <section className="bg-background px-6 py-20 text-foreground sm:py-28 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <ScrambleIn text="You've seen the work" className="text-sm text-muted-foreground" />
          <SplitHeading>
            <h2 className="mt-2 font-display text-4xl italic sm:text-5xl">
              Let&apos;s talk about yours
            </h2>
          </SplitHeading>

          <p className="mt-6 max-w-md text-muted-foreground">
            Fifteen minutes, no pitch. Tell us what you&apos;re building and
            you&apos;ll leave with a straight answer on scope, timeline, and
            cost. If we&apos;re not the right team for it, we&apos;ll tell you
            that too.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <Users className="size-5 text-secondary-foreground" />
            </span>
            <div>
              <p className="font-medium">You&apos;ll be talking to the team</p>
              <p className="text-sm text-muted-foreground">
                No account managers, no sales relay
              </p>
            </div>
          </div>

          <Magnetic className="mt-8 inline-block">
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              className="h-12 gap-2 rounded-full bg-foreground px-7 text-xs font-semibold tracking-widest text-background uppercase hover:bg-foreground/90"
            >
              Book a 15-min call
              <ArrowRight className="size-4" />
            </Button>
          </Magnetic>
        </Reveal>

        <RevealGroup className="flex flex-col justify-center" y={16} start="top 90%">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-item
              className="flex items-center justify-between gap-4 border-t border-border py-6 last:border-b"
            >
              <span className="text-sm font-medium sm:text-base">{stat.label}</span>
              <span className="text-sm text-muted-foreground sm:text-base">
                {renderValue(stat.value)}
              </span>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
