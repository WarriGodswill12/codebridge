import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

const values = [
  {
    index: "01",
    title: "Commitment over convenience",
    description:
      "Deadlines get met. If something threatens one, you hear about it immediately, with a remediation plan attached.",
  },
  {
    index: "02",
    title: "Honesty in scoping",
    description:
      "We turn down projects we can't deliver to the standard we've promised, rather than take the money and hope.",
  },
  {
    index: "03",
    title: "Security is not optional",
    description:
      "Built into development from the start, not bolted on later. OWASP Top 10 compliance is the baseline, not a line item.",
  },
  {
    index: "04",
    title: "Long-term thinking",
    description:
      "Code is documented and maintainable for whoever owns it after us. The engagement ends; the system shouldn't depend on that.",
  },
  {
    index: "05",
    title: "Results, not outputs",
    description:
      "Success is measured by the business outcome, not by how much got shipped. A feature nobody needed isn't a win.",
  },
];

export function AboutValues() {
  return (
    <section className="px-6 py-16 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal y={16}>
          <ScrambleIn
            text="How we operate"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium text-balance sm:text-4xl lg:text-5xl">
            Five principles, no exceptions.
          </h2>
        </SplitHeading>

        <RevealGroup className="mt-14 flex flex-col" y={20} stagger={0.08}>
          {values.map((value) => (
            <div
              key={value.index}
              data-reveal-item
              className="grid gap-2 border-t border-border py-7 last:border-b sm:grid-cols-[80px_1fr_1.4fr] sm:gap-8 sm:py-8"
            >
              <span className="font-mono text-xs text-muted-foreground">{value.index}</span>
              <h3 className="text-lg font-medium">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {value.description}
              </p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
