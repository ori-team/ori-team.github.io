# Arquitetura — oriteam-website

## Stack

Astro 7 + Starlight (com overrides de `Head`, `Header`, `Hero`, `Footer`) + UnoCSS via plugin Vite direto (`unocss/vite`, só utilitários, sem preflight) + `phosphor-astro` via barril `src/lib/icons.ts` + `animejs` + Geist Variable/Mono via Fontsource. Referência de padrão: `ori-website` (Astro+Starlight com overrides).

> Por que não `@unocss/astro` nem `import ... from "phosphor-astro"`: o primeiro quebra o build no Vite 8/rolldown; o segundo não tem entry-point. Detalhes nos comentários de `astro.config.mjs` e `src/lib/icons.ts`.

## Estrutura

- `astro.config.mjs` — Starlight sem sidebar (`sidebar: []`), componentes custom, `custom.css`.
- `src/styles/custom.css` — **único lugar de tokens**: vars `--sl-*` (bege `#faf7f0` no light, marrom quente no dark) + classes `.oriteam-*`.
- Componentes Astro pequenos, um assunto cada (`Header`, `HeroHome`, `OriTeamLogo`, `Footer`, …).
- Páginas = content collection `docs` (`src/content/docs/`).

## Logo e tema

`src/assets/ori-team-logo.svg` deriva de `ori-lang/branding/ori-logo-w_text.svg` com uma única transformação documentada: `#141313 → currentColor`, controlado por `--oriteam-logo-ink` por tema. Cores da marca preservadas: `#d4b893` (cão), `#eb772a` (detalhe/wordmark), `#fefefe` (olhos). Textos vetorizados (sem dependência de fonte). `logo-ref/logo-inkscape.svg` é o arquivo-fonte do Inkscape — não usar direto na web.

## Dados (a partir do PR2)

`src/data/projects.ts` é a única fonte de metadados (slug, nome, repo, ícone Phosphor, resumo, tags). Páginas `projetos/<slug>.mdx` são **geradas** por `scripts/sync-readmes.mjs` no `prebuild` (nunca editar à mão — cabeçalho `generated: true`).
