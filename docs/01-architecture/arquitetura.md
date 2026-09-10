# Arquitetura — ori-team.github.io

## Stack

Astro 7 (puro, sem Starlight — ver ADR-004) + `@astrojs/mdx` + `@astrojs/sitemap` + UnoCSS via plugin Vite direto (`unocss/vite`, só utilitários, sem preflight) + `phosphor-astro` via barril `src/lib/icons.ts` + `animejs` + Geist Variable/Mono via Fontsource.

> Por que não `@unocss/astro` nem `import ... from "phosphor-astro"`: o primeiro quebra o build no Vite 8/rolldown; o segundo não tem entry-point. Detalhes nos comentários de `astro.config.mjs` e `src/lib/icons.ts`.

## Estrutura

- `astro.config.mjs` — `site` + `base` (Pages), Uno, MDX, sitemap.
- `src/layouts/BaseLayout.astro` — head, anti-flash de tema, ClientRouter, header/conteúdo/rodapé.
- `src/pages/` — `index`, `projetos/index`, `projetos/[slug]`, `contribuidores/index`, `404`.
- `src/styles/tokens.css` — **único lugar de tokens** (`--ot-*`, por tema) + base + `.ot-markdown`.
- Componentes Astro pequenos, um assunto cada (`Header`, `ThemeToggle`, `HomeHero`, `OriTeamLogo`, `Footer`, …).
- Detalhe: coleção `projects` (`src/content/projects/*.mdx`, gerados) + rota dinâmica.

## Logo e tema

`src/assets/ori-team-logo.svg` deriva de `ori-lang/branding/ori-logo-w_text.svg` com transformações documentadas: `#141313 → currentColor` (via `--ot-logo-ink`) + filtro `ori-team-outline` (contorno claro, só no dark). Cores da marca preservadas: `#d4b893` (cão), `#eb772a` (detalhe), `#fefefe` (olhos). Textos vetorizados (sem dependência de fonte). `logo-ref/logo-inkscape.svg` é o arquivo-fonte do Inkscape — não usar direto na web.

Tema: escolha salva → sistema → claro. Toggle persiste em `localStorage`; `theme-init.js` aplica antes da pintura.

## Client-side

`<script>` em componente `.astro` deve ser **JS puro, sem sintaxe TS**: qualquer `<T>`/anotação quebra o parse do bundler e o código chega cru (e morto) no HTML — foi assim que o toggle e o FAB quebraram silenciosamente (PR9). Imports de pacote (`animejs`) funcionam. `// @ts-nocheck` no topo desses scripts com o motivo.

## Dados

`src/data/projects.ts` é a única fonte de metadados (slug, nome, repo, ícone Phosphor, resumo, tags). Páginas `projects/<slug>.mdx` são **geradas** por `scripts/sync-readmes.mjs` no `predev`/`prebuild` (nunca editar à mão — cabeçalho `generated: true`). Links internos do site usam `src/lib/url.ts` (`siteUrl`) para respeitar o `base`.
