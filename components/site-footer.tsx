import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const sitemap = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/careers", label: "Careers" },
];

const social = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "X (Twitter)" },
  { href: "#", label: "Instagram" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-8 lg:px-10">
        <div className="flex flex-col gap-10 border-b border-primary-foreground/20 pb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground/70">
              Have a project in mind?
            </p>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-3 font-display text-4xl italic sm:text-6xl"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-12" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground/70">
                Sitemap
              </span>
              {sitemap.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground/70">
                Social
              </span>
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-fit text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-8 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Codebridge. All rights reserved.</span>
          <span>Designed &amp; built by Codebridge</span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none w-full overflow-hidden pb-2 text-center leading-none font-display font-semibold text-primary-foreground/10 select-none"
        style={{ fontSize: "clamp(4rem, 18vw, 13rem)" }}
      >
        codebridge
      </div>
    </footer>
  );
}
