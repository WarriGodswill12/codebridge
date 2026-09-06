"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={() => {
        void signOut().then(() => router.push("/signin"));
      }}
    >
      Sign out
    </Button>
  );
}
