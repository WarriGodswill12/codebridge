"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import mark from "@/public/codebridge-mark-icon.png";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
      await signIn("password", formData);
      router.push("/admin");
    } catch {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-1 bg-background text-foreground">
      <div className="hidden flex-1 flex-col justify-between bg-foreground p-12 text-background lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-background p-1">
            <Image src={mark} alt="Codebridge" className="h-full w-full object-contain" priority />
          </span>
          <span className="font-display text-lg">Codebridge</span>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-background/60 uppercase">
            Command centre
          </p>
          <h1 className="mt-4 max-w-sm font-display text-4xl italic">
            Everything the site runs on, in one place.
          </h1>
        </div>

        <div className="flex gap-10 border-t border-background/15 pt-8">
          <div>
            <p className="font-display text-3xl">15+</p>
            <p className="mt-1 text-sm text-background/60">clients across 4 continents</p>
          </div>
          <div>
            <p className="font-display text-3xl">8+</p>
            <p className="mt-1 text-sm text-background/60">years shipping software</p>
          </div>
          <div>
            <p className="font-display text-3xl">4.8</p>
            <p className="mt-1 text-sm text-background/60">rating on Clutch</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Admin
          </p>
          <h1 className="mt-3 font-display text-3xl italic">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <input type="hidden" name="flow" value="signIn" />

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading} className="h-11 rounded-full">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
