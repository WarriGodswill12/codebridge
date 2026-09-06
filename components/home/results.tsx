import { cn } from "@/lib/utils";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

const CLUTCH_URL = "https://clutch.co/profile/code-bridge-agency";

function renderLabel(label: string) {
  if (!label.includes("Clutch")) return label;
  const [before, after] = label.split("Clutch");
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

const stats = [
  { value: "15+", label: "Clients across 4 continents" },
  { value: "10x", label: "User growth we've supported, zero infra rebuild", accent: true },
  { value: "4.8", label: "Client rating on Clutch" },
  { value: "8+", label: "Years shipping production software" },
];

export function Results() {
  return (
    <section className="px-6 py-20 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal y={16}>
          <ScrambleIn
            text="Results"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl italic sm:text-4xl lg:text-5xl">
            Numbers, not adjectives.
          </h2>
        </SplitHeading>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-item
              className={cn(
                "flex min-h-40 flex-col justify-between rounded-2xl p-6 sm:min-h-56 sm:p-8 lg:min-h-72",
                stat.accent
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <span className="font-display text-4xl sm:text-5xl">
                <CountUp value={stat.value} />
              </span>
              <span
                className={cn(
                  "text-sm leading-snug",
                  stat.accent ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {renderLabel(stat.label)}
              </span>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
