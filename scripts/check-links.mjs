// Confere os links internos do `dist/` (gera 404 local antes do deploy).
// Uso: npm run build && npm run check-links
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function resolveTarget(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null; // âncora pura
  if (!clean.startsWith("/")) return null; // relativo (raro aqui) — ignora
  const rel = clean.replace(/^\/oriteam-website\/?/, "");
  if (rel === "" || rel.endsWith("/")) return path.join(dist, rel, "index.html");
  if (/\.[a-z0-9]+$/i.test(rel)) return path.join(dist, rel); // asset com extensão
  if (rel.endsWith(".html")) return path.join(dist, rel);
  return path.join(dist, `${rel}.html`);
}

const files = await htmlFiles(dist);
const missing = new Map();

for (const file of files) {
  const html = await readFile(file, "utf8");
  const hrefs = new Set(
    [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((u) => u.startsWith("/") && !u.startsWith("//")),
  );
  for (const href of hrefs) {
    const target = resolveTarget(href);
    if (!target) continue;
    try {
      await readFile(target);
    } catch {
      if (!missing.has(file)) missing.set(file, []);
      missing.get(file).push(href);
    }
  }
}

if (missing.size > 0) {
  for (const [file, hrefs] of missing) {
    console.error(`[check-links] ${path.relative(dist, file)} → quebrado: ${hrefs.join(", ")}`);
  }
  process.exit(1);
}
console.log(`[check-links] ok — ${files.length} páginas, nenhum link interno quebrado`);
