"use client";

import { Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import type { Doc } from "@/convex/_generated/dataModel";

export function ServiceList({ services }: { services: Doc<"services">[] }) {
  return (
    <section className="bg-background px-6 py-16 text-foreground sm:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Accordion>
            {services.map((service, i) => (
              <AccordionItem key={service._id} value={`service-${i}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center gap-5 py-7 text-left outline-none sm:gap-8 sm:py-8">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-xl font-medium sm:text-3xl">
                      {service.title}
                    </span>
                    <Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-aria-expanded:rotate-45" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionContent>
                  <p className="max-w-3xl pb-10 leading-relaxed text-muted-foreground sm:pl-[4.5rem]">
                    {service.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
