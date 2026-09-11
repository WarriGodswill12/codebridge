"use client";

import { LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignOutButton({
  iconOnly = false,
  className,
}: {
  iconOnly?: boolean;
  className?: string;
}) {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleClick = () => {
    void signOut().then(() => router.push("/signin"));
  };

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Sign out"
        className={cn(
          "group relative mx-auto flex size-10 items-center justify-center rounded-lg text-background/65 transition-all duration-150 hover:bg-background/10 hover:text-background",
          className
        )}
      >
        <LogOut className="size-[18px]" strokeWidth={1.8} />
        <span className="pointer-events-none absolute top-1/2 left-full z-60 ml-3 -translate-x-1 -translate-y-1/2 rounded-md border border-background/10 bg-foreground px-2.5 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-lg transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
          Sign out
        </span>
      </button>
    );
  }

  return (
    <Button variant="outline" size="sm" className={cn("w-full", className)} onClick={handleClick}>
      Sign out
    </Button>
  );
}
