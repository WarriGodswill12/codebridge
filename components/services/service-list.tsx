"use client";

import { Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

const services: { index: string; title: string; description: string }[] = [
  {
    index: "01",
    title: "Client Onboarding Portals",
    description:
      "Professional service firms spend 6–10 hours per new client on manual onboarding. We build a fully branded client portal, a single, secure web application your clients log into to complete onboarding, and typically cut that time from 6–8 hours to under 45 minutes.",
  },
  {
    index: "02",
    title: "SaaS MVP Development",
    description:
      "You have a validated idea but no technical co-founder, and you've been quoted $150K and 12 months. We scope, architect, and ship your MVP in 6–12 weeks, a working, deployed product, not a prototype, and founders who come to us launch faster and cheaper than their original estimate.",
  },
  {
    index: "03",
    title: "Internal Tools & Dashboards",
    description:
      "Your team is running the business on spreadsheets, WhatsApp threads, and SaaS tools that don't talk to each other. We build a custom internal tool, a private web application shaped around how your team actually works, and clients typically reclaim 10–20 hours of team time per week within the first month.",
  },
  {
    index: "04",
    title: "Security Audits",
    description:
      "If you run a SaaS product, you almost certainly have security vulnerabilities you don't know about. We run a full technical review of your application covering authentication, vulnerabilities, and GDPR compliance, giving you a comprehensive, prioritised view of your risk surface within 10 business days.",
  },
  {
    index: "05",
    title: "Booking & Scheduling",
    description:
      "You're on Calendly or Acuity, paying monthly for a product that still doesn't fit your workflow exactly. We build a custom booking and scheduling system tailored to your exact workflow, not the other way around, leading to an immediate drop in no-shows and faster booking completion.",
  },
  {
    index: "06",
    title: "AI Feature Integration",
    description:
      "You have a working product, and your competitors are shipping AI features. We design and build AI-powered features that slot into your existing product, no rebuild required, and built correctly, they create measurable user behaviour change.",
  },
];

export function ServiceList() {
  return (
    <section className="bg-background px-6 py-16 text-foreground sm:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Accordion>
            {services.map((service, i) => (
              <AccordionItem key={service.index} value={`service-${i}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center gap-5 py-7 text-left outline-none sm:gap-8 sm:py-8">
                    <span className="font-mono text-sm text-muted-foreground">
                      {service.index}
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
