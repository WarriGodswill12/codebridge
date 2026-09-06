"use client";

import dynamic from "next/dynamic";
import type { OrbitalBadge } from "@/components/home/orbital-marquee";
import { SplitHeading } from "@/components/motion/split-heading";

const OrbitalMarquee = dynamic(
  () => import("@/components/home/orbital-marquee").then((m) => m.OrbitalMarquee),
  { ssr: false }
);

const services: OrbitalBadge[] = [
  { label: "SaaS MVPs", color: "#f5a623", rotation: 0, angle: 270, radiusFactor: 1.05 },
  { label: "AI Integration", color: "#2dd4bf", rotation: 2, angle: 310, radiusFactor: 0.95 },
  { label: "Fractional CTO", color: "#f4436c", rotation: -4, angle: 350, radiusFactor: 0.9 },
  { label: "Security Audits", color: "#3b82f6", rotation: 1, angle: 30, radiusFactor: 1 },
  { label: "GDPR Compliance", color: "#7c3aed", rotation: -2, angle: 70, radiusFactor: 0.95 },
  { label: "30-Day Sprints", color: "#f472b6", rotation: 4, angle: 110, radiusFactor: 0.9 },
  { label: "Booking Systems", color: "#f97316", rotation: 2, angle: 150, radiusFactor: 1 },
  { label: "Internal Tools", color: "#22d3ee", rotation: -3, angle: 190, radiusFactor: 0.9 },
  { label: "Onboarding Portals", color: "#ef233c", rotation: 3, angle: 230, radiusFactor: 1 },
];

export function Services() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10">
     

      <OrbitalMarquee badges={services}>
        <SplitHeading type="lines">
          <h2 className="text-2xl leading-[1.2] font-medium text-balance sm:text-4xl lg:text-5xl">
            Enterprise-grade software, without the enterprise price.
          </h2>
        </SplitHeading>
      </OrbitalMarquee>
    </section>
  );
}
