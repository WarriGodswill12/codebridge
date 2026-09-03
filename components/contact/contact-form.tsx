"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const budgets = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+"];
const projectTypes = ["Website", "Product / App", "Brand identity", "Other"];

export function ContactForm() {
  const submitLead = useMutation(api.leads.submit);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [budget, setBudget] = useState<string>();
  const [projectType, setProjectType] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await submitLead({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? "") || undefined,
        message: String(data.get("message") ?? ""),
        budget,
        projectType,
        source: "contact-page",
      });
      setStatus("success");
      form.reset();
      setBudget(undefined);
      setProjectType(undefined);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card px-8 py-12 text-center">
        <p className="font-display text-2xl italic">Thanks — got it.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Project type</Label>
          <Select
            value={projectType}
            onValueChange={(value) => setProjectType(value ?? undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Budget</Label>
          <Select
            value={budget}
            onValueChange={(value) => setBudget(value ?? undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Tell us about the project</Label>
        <Textarea id="message" name="message" required rows={5} />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong sending that — mind trying again?
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 w-fit self-start rounded-full px-8 text-xs font-semibold tracking-widest uppercase"
      >
        {status === "submitting" ? "Sending…" : "Send it over"}
      </Button>
    </form>
  );
}
