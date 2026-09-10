// Única fonte de metadados dos projetos da vitrine.
// Detalhes longos vêm do README de cada repo (scripts/sync-readmes.mjs, PR3).

export type ProjectIcon = "code" | "terminal";

export interface ProjectMeta {
  slug: string;
  name: string;
  repo: string;
  icon: ProjectIcon;
  summary: string;
  tags: string[];
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "ori-lang",
    name: "ori-lang",
    repo: "https://github.com/ori-team/ori-lang",
    icon: "code",
    summary: "Linguagem de programação Ori: reading-first, tipos explícitos, compilada para código nativo (AOT).",
    tags: ["linguagem", "compilador", "rust"],
  },
  {
    slug: "oride",
    name: "oride",
    repo: "https://github.com/ori-team/oride",
    icon: "terminal",
    summary: "Oride: editor/IDE de terminal modular, leve e extensível, feito em Rust.",
    tags: ["editor", "terminal", "rust"],
  },
];
