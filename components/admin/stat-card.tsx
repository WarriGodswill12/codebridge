import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  caption,
  linkLabel,
  href,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  caption: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Icon className="size-4 text-muted-foreground" strokeWidth={1.8} />
        </span>
      </div>

      <p className="mt-3 font-display text-3xl">{value}</p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-muted-foreground">{caption}</span>
        <Link href={href} className="font-medium text-foreground hover:underline">
          {linkLabel} →
        </Link>
      </div>
    </div>
  );
}
