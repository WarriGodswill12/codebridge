import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$3,000 – $8,000",
    timeline: "3–6 weeks",
    description: "For focused, well-defined problems.",
    features: [
      "Single-purpose web application",
      "Up to 5 core screens or workflows",
      "User authentication",
      "Basic admin panel",
      "Deployed, documented, and handed over",
      "14-day post-launch support",
    ],
  },
  {
    name: "Growth",
    price: "$8,000 – $20,000",
    timeline: "6–12 weeks",
    description: "For multi-feature products and platforms.",
    featured: true,
    features: [
      "Full multi-user web application",
      "Up to 15 screens or workflows",
      "Roles & permissions system",
      "Third-party integrations (payments, APIs)",
      "Full admin & reporting dashboard",
      "OWASP security review included",
      "30-day post-launch support",
    ],
  },
  {
    name: "Scale",
    price: "$20,000 – $50,000+",
    timeline: "10–20 weeks",
    description: "For complex systems and enterprise workflows.",
    features: [
      "Complex, multi-module platform",
      "Unlimited screens and workflows",
      "Custom AI or ML feature development",
      "Data pipelines and external integrations",
      "Full security audit & penetration test",
      "Infrastructure setup and hardening",
      "60-day post-launch support",
    ],
  },
];

export function Pricing() {
  return (
    <section className="bg-background px-6 py-20 text-foreground sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <span className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-semibold tracking-widest text-secondary-foreground uppercase">
            <ScrambleIn text="Pricing" />
          </span>
          <SplitHeading className="mx-auto" delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl italic sm:text-4xl lg:text-5xl">
              Fixed price. Fixed scope. No surprises.
            </h2>
          </SplitHeading>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            We don&apos;t bill by the hour because hourly billing puts the risk on
            you. We agree on exactly what we&apos;ll build, price it, and deliver
            it.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" y={36}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              data-reveal-item
              className={cn(
                "relative flex flex-col rounded-2xl p-8",
                tier.featured
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {tier.featured && (
                <span className="absolute top-8 right-8 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-widest text-primary-foreground uppercase">
                  Most popular
                </span>
              )}

              <span
                className={cn(
                  "text-xs font-medium tracking-[0.14em] uppercase",
                  tier.featured ? "text-background/60" : "text-muted-foreground"
                )}
              >
                {tier.name}
              </span>

              <p className="mt-4 font-display text-3xl sm:text-4xl">{tier.price}</p>
              <p
                className={cn(
                  "mt-1 text-sm",
                  tier.featured ? "text-background/70" : "text-muted-foreground"
                )}
              >
                {tier.timeline}
              </p>
              <p
                className={cn(
                  "mt-4 text-sm",
                  tier.featured ? "text-background/80" : "text-muted-foreground"
                )}
              >
                {tier.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-2 border-t py-3 text-sm",
                      tier.featured ? "border-background/15" : "border-border"
                    )}
                  >
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Magnetic className="mt-8 inline-block w-fit">
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  className="h-11 w-fit gap-2 rounded-full px-6 text-xs font-semibold tracking-widest uppercase"
                >
                  Book a call about this plan
                  <ArrowUpRight className="size-4" />
                </Button>
              </Magnetic>
            </div>
          ))}
        </RevealGroup>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Need a security audit or an ongoing retainer instead?{" "}
          <Link href="/contact" className="text-foreground underline underline-offset-4">
            Let&apos;s talk
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
