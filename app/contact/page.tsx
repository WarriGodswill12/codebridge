import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Codebridge.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid w-full max-w-5xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl italic sm:text-5xl">
            Let&apos;s build something worth talking about.
          </h1>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Tell us a bit about your project and timeline. We reply to every
            inquiry within one business day.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
