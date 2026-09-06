"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({ label = "Delete" }: { label?: string }) {
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      className="text-destructive hover:bg-destructive/10"
      onClick={(event) => {
        if (!confirm("Delete this? This can't be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <Trash2 className="size-3.5" />
      {label}
    </Button>
  );
}
