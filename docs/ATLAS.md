# ATLAS — ori-team.github.io

Mapa de navegação do projeto. Comece aqui, não por buscas indiscriminadas.

## Rotas por tipo de tarefa

| Quero… | Leia |
|---|---|
| Entender o produto/escopo | `docs/00-product/visao.md` |
| Mudar layout, tema ou componente | `docs/01-architecture/arquitetura.md` + `src/styles/custom.css` |
| Adicionar um projeto à vitrine | `docs/01-architecture/arquitetura.md` (§ dados) + `src/data/projects.ts` (PR2+) |
| Planejar/executar uma fatia | `docs/02-implementation/roadmap.md` |
| Entender uma decisão | `docs/adr/` |

## Fontes canônicas

- Produto/escopo: `docs/00-product/visao.md`
- Arquitetura: `docs/01-architecture/arquitetura.md`
- Roadmap: `docs/02-implementation/roadmap.md`
- Decisões: `docs/adr/ADR-*.md`

## Módulos do código

| Módulo | Onde | Responsabilidade |
|---|---|---|
| config | `astro.config.mjs`, `uno.config.ts` | MDX, sitemap, UnoCSS, `site`/`base` |
| theme | `src/styles/tokens.css`, `public/theme-init.js` | Tokens `--ot-*` por tema, anti-flash |
| chrome | `src/layouts/BaseLayout.astro`, `Header`, `ThemeToggle`, `Footer` | Head, navegação, rodapé |
| home | `src/pages/index.astro`, `HomeHero` | Logo, tagline, "o que é" |
| brand | `src/assets/ori-team-logo.svg`, `OriTeamLogo.astro` | Logo adaptativa ao tema |
| pages | `src/pages/` | Home, projetos, detalhe `[slug]`, contribuidores, 404 |
| data | `src/data/projects.ts` (PR2+) | Única fonte de metadados dos projetos |
| showcase | `ProjectGrid`, `ProjectCard`, `ProjectHeader`, `Breadcrumb`, `RepoLink` | Vitrine lista/thumbnail, detalhe e link externo |
| sync | `scripts/sync-readmes.mjs` (PR3) | Import build-time dos READMEs |

## Catálogo

Ver `docs/INDEX.md`.
