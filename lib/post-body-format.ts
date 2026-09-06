import type { Doc } from "@/convex/_generated/dataModel";

export type ContentBlock = Doc<"posts">["body"][number];

/**
 * A small Markdown-like format so the admin can write a post body in one
 * textarea instead of needing a dynamic block-by-block editor:
 *   # Heading
 *   Plain text becomes a paragraph (blank line ends it).
 *   - List items (consecutive "- " lines group into one list)
 *   | Header one | Header two   (consecutive "| " lines group into one
 *   | Cell       | Cell          table; first line is the header row)
 */
export function parsePostBody(text: string): ContentBlock[] {
  const lines = text.split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "heading", text: line.slice(2).trim() });
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    if (line.startsWith("| ")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("| ")) {
        rows.push(
          lines[i]
            .slice(2)
            .split("|")
            .map((cell) => cell.trim())
        );
        i++;
      }
      const [headers, ...dataRows] = rows;
      blocks.push({ type: "table", headers: headers ?? [], rows: dataRows });
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("# ") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("| ")
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ").trim() });
  }

  return blocks;
}

export function serializePostBody(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "heading") return `# ${block.text}`;
      if (block.type === "paragraph") return block.text;
      if (block.type === "list") return block.items.map((item) => `- ${item}`).join("\n");
      return [block.headers, ...block.rows].map((row) => `| ${row.join(" | ")}`).join("\n");
    })
    .join("\n\n");
}
