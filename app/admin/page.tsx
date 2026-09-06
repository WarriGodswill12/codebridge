import Link from "next/link";

const sections = [
  {
    href: "/admin/case-studies",
    title: "Case studies",
    description: "Add, edit, and remove portfolio projects, including cover images.",
  },
  {
    href: "/admin/services",
    title: "Services",
    description: "Manage the services listed on the Services page.",
  },
  {
    href: "/admin/pricing",
    title: "Pricing",
    description: "Edit the fixed-price tiers shown on the Pricing page and homepage.",
  },
  {
    href: "/admin/blog",
    title: "Blog",
    description: "Write, edit, and remove Insights posts.",
  },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="font-display text-3xl italic">Overview</h1>
      <p className="mt-2 text-muted-foreground">What do you want to manage?</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-border bg-secondary p-6 transition-colors hover:bg-secondary/70"
          >
            <p className="font-medium">{section.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
