"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";

const faqs = [
  {
    question: "Can you work within a tighter budget?",
    answer:
      "Sometimes. If your project is well-defined and doesn't need the full scope of our standard tiers, we can scope a smaller engagement specifically. Book a discovery call and we'll figure out what fits.",
  },
  {
    question: "Do you take a deposit?",
    answer:
      "Yes. We work on a 50/50 payment structure: 50% before work begins, 50% on final delivery. Milestone-based payments are available for larger projects, in USD or GBP.",
  },
  {
    question: "What happens if the scope changes mid-project?",
    answer:
      "We handle it through a change order. If something new comes up, like a feature addition or a changed requirement, we write up a separate scope document with the added cost and timeline impact.",
  },
  {
    question: "Do you work with clients anywhere in the world?",
    answer:
      "Yes. We work with founders and operators across North America, Europe, Africa, and beyond, fully remote with async collaboration across time zones.",
  },
  {
    question: "Why don't you charge hourly rates?",
    answer:
      "Because hourly billing creates misaligned incentives. Fixed-price models mean we bear the efficiency risk, not you, which keeps scoping honest and execution focused.",
  },
];

export function Faq() {
  return (
    <section className="bg-background px-6 py-20 text-foreground sm:py-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal y={16}>
          <ScrambleIn
            text="FAQ"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h2 className="mt-4 font-display text-3xl italic sm:text-4xl lg:text-5xl">
            Questions, answered.
          </h2>
        </SplitHeading>

        <RevealGroup className="mt-10">
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`} data-reveal-item>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-medium outline-none sm:text-lg">
                    {faq.question}
                    <Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-aria-expanded:rotate-45" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealGroup>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link href="/contact" className="text-foreground underline underline-offset-4">
            Book a 15-min call
          </Link>
          , no pressure.
        </p>
      </div>
    </section>
  );
}
