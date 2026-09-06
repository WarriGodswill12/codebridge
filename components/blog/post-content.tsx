import { Check } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";

type ContentBlock = Doc<"posts">["body"][number];

export function PostContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="mt-4 font-display text-2xl font-medium sm:text-3xl">
              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={i} className="leading-relaxed text-muted-foreground sm:text-lg">
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  <span className="leading-relaxed sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <div key={i} className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-secondary">
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 text-left text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-border">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={
                          cellIndex === 0
                            ? "px-5 py-4 font-medium"
                            : "px-5 py-4 text-muted-foreground"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
