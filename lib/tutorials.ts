import fs from "node:fs";
import path from "node:path";
export const tutorialSlugs = ["classical-ciphers", "substitution", "transposition", "encodings"] as const;
export function tutorialSections(slug: string) { const source = fs.readFileSync(path.join(process.cwd(), "docs/tutorials", `${slug}.md`), "utf8"); return source.split(/^## /m).map((part) => part.trim()).filter(Boolean).map((part) => { const [heading, ...body] = part.split("\n"); return { heading: heading.replace(/^# /, ""), paragraphs: body.join("\n").split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean) }; }); }
