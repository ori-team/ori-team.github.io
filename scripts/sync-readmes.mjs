// Gera `src/content/projects/<slug>.mdx` a partir do README de cada repo.
// Fontes: checkout local vizinho (../../<dir>) → raw.githubusercontent (main, master).
// Falha só se não houver saída anterior para preservar; com saída existente,
// mantém o arquivo e avisa (dev offline continua funcionando).
//
// Nunca edite os .mdx gerados à mão — levam o marcador `generated: true`.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(root, "src", "content", "projects");

const SOURCES = [
  { slug: "ori-lang", repo: "ori-team/ori-lang", localDir: "ori-lang" },
  { slug: "oride", repo: "ori-team/oride", localDir: "oride" },
  { slug: "oriteam-website", repo: "ori-team/oriteam-website", localDir: "oriteam-website" },
];

const REFS = ["main", "master"];

async function readLocal(localDir) {
  // root/../.. = pasta "Projetos", vizinha aos checkouts (ori-lang, …).
  const file = path.join(root, "..", "..", localDir, "README.md");
  return readFile(file, "utf8");
}

async function fetchRemote(repo, ref) {
  const res = await fetch(`https://raw.githubusercontent.com/${repo}/${ref}/README.md`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { body: await res.text(), ref };
}

function rewriteRelativeUrls(body, repo, ref) {
  const raw = `https://raw.githubusercontent.com/${repo}/${ref}/`;
  const blob = `https://github.com/${repo}/blob/${ref}/`;
  const isExternal = (target) => /^(https?:|#|mailto:|data:)/.test(target);
  return (
    body
      // Links e imagens markdown: relativo → absoluto (img usa raw, link usa blob).
      .replace(/(!?)\[([^\]]*)\]\(([^)\s]+)([^)]*)\)/g, (match, bang, text, target, rest) => {
        if (isExternal(target)) return match;
        const clean = target.replace(/^\.\//, "");
        return `${bang}[${text}](${(bang ? raw : blob) + clean}${rest})`;
      })
      // HTML cru: <img>/<source> relativos → raw; <a> relativo → blob.
      .replace(/<(img|source)\b[^<>]*\bsrc="([^"]+)"[^<>]*>/gi, (match, _tag, src) => {
        if (isExternal(src)) return match;
        return match.replace(src, `${raw}${src.replace(/^\.\//, "")}`);
      })
      .replace(/<a\b[^<>]*\bhref="([^"]+)"[^<>]*>/gi, (match, href) => {
        if (isExternal(href)) return match;
        return match.replace(href, `${blob}${href.replace(/^\.\//, "")}`);
      })
      // MDX exige void elements fechados: <img> → <img />.
      .replace(/<(img|br|hr|input|source)\b([^<>]*[^<>\s/])\s*>/gi, "<$1$2 />")
      // Autolinks nus (<https://…>) quebram o MDX — vira link explícito.
      .replace(/<(https?:[^<>\s]+)>/g, "[$1]($1)")
  );
}

// O cabeçalho da página (ProjectHeader + title) já apresenta o projeto;
// o primeiro h1 do README seria duplicado, então sai.
function dropFirstH1(body) {
  return body.replace(/^# .+$/m, "");
}

function toMdx(slug, body) {
  return `---
// generated: true — não editar. Gerado por \`scripts/sync-readmes.mjs\`.
title: "${slug}"
description: "Detalhes, documentação e código do projeto ${slug}."
---

import Breadcrumb from "../../components/Breadcrumb.astro";
import ProjectHeader from "../../components/ProjectHeader.astro";

<Breadcrumb trail={[{ href: "/projetos/", label: "projetos" }, { label: "${slug}" }]} />

<ProjectHeader slug="${slug}" />

${body.trim()}
`;
}

async function loadSource({ slug, repo, localDir }) {
  try {
    const body = await readLocal(localDir);
    console.log(`[sync] ${slug}: README local (${localDir}/)`);
    return { body, ref: "local" };
  } catch {
    /* sem checkout vizinho — tenta o remoto */
  }
  for (const ref of REFS) {
    try {
      const { body } = await fetchRemote(repo, ref);
      console.log(`[sync] ${slug}: remoto ${repo}@${ref}`);
      return { body, ref };
    } catch {
      /* tenta o próximo ref */
    }
  }
  return null;
}

let failures = 0;

await mkdir(outDir, { recursive: true });

for (const source of SOURCES) {
  const { slug, repo } = source;
  const outFile = path.join(outDir, `${slug}.mdx`);
  const loaded = await loadSource(source).catch(() => null);

  if (!loaded) {
    console.warn(`[sync] ${slug}: sem fonte (local e remoto falharam) — mantendo saída anterior`);
    try {
      await readFile(outFile, "utf8");
    } catch {
      console.error(`[sync] ${slug}: sem saída anterior — nada para exibir`);
      failures += 1;
    }
    continue;
  }

  // Links relativos existem também no checkout local — sempre reescreve
  // (para local, assume o ref padrão "main").
  const ref = loaded.ref === "local" ? "main" : loaded.ref;
  const rewritten = rewriteRelativeUrls(loaded.body, repo, ref);
  await writeFile(outFile, toMdx(slug, dropFirstH1(rewritten)));
}

if (failures > 0) process.exit(1);
console.log("[sync] pronto");
