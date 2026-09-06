import { cn } from "@/lib/utils";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

const credentials = [
  { label: "CEH", detail: "Certified Ethical Hacker", accent: true },
  { label: "CompTIA Security+", detail: "Security certification" },
  { label: "DoD 8570", detail: "Compliant" },
  { label: "SAM.gov", detail: "Registered" },
  { label: "NAICS 541511", detail: "Registered" },
];

export function ServicesCredentials() {
  return (
    <section className="px-6 py-16 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal y={16}>
          <ScrambleIn
            text="Credentials"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium text-balance sm:text-4xl lg:text-5xl">
            Backed by real certifications.
          </h2>
        </SplitHeading>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {credentials.map((c) => (
            <div
              key={c.label}
              data-reveal-item
              className={cn(
                "flex min-h-40 flex-col justify-between rounded-2xl p-6 sm:min-h-56 sm:p-8",
                c.accent
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <span className="font-display text-2xl sm:text-3xl">{c.label}</span>
              <span
                className={cn(
                  "text-sm leading-snug",
                  c.accent ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {c.detail}
              </span>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
