import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/services-hero";
import { ServiceList } from "@/components/services/service-list";
import { ServicesCredentials } from "@/components/services/services-credentials";
import { ServicesCta } from "@/components/services/services-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Client onboarding portals, SaaS MVPs, internal tools, security audits, booking systems, and AI feature integration, built by a senior engineering team.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServicesHero />
      <ServiceList />
      <ServicesCredentials />
      <ServicesCta />
    </main>
  );
}
