"use client";

import { LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleClick = () => {
    void signOut().then(() => router.push("/signin"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-background/65 transition-all duration-150 hover:bg-primary/15 hover:text-primary",
        className
      )}
    >
      <LogOut className="size-4.5 shrink-0" strokeWidth={1.8} />
      Sign out
    </button>
  );
}
