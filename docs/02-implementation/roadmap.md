# Roadmap — ori-team.github.io

- **PR1 — fundação (atual):** scaffold, tema bege/dark, header/nav, home, projetos (lista simples), contribuidores, View Transitions, atlas inicial, correção do git.
- **PR2 — vitrine (atual):** `src/data/projects.ts`, `ProjectGrid`/`ProjectCard` com toggle lista/thumbnail (persistido), hero com about.
- **PR3 — detalhe (atual):** `scripts/sync-readmes.mjs` + páginas `/projetos/<slug>/` a partir dos READMEs, breadcrumb, motion `animejs`. Correções: tema light (vars por tema), outline da logo no dark, hero 100vh, toggle balanceado.
- **PR4 — qualidade/deploy:** link-check interno, actions v5, 404 custom, README final.
- **PR5 — sem Starlight:** Astro puro + BaseLayout + tokens `--ot-*` + coleção `projects`, mesmo visual e URLs.
- **PR6 — mobile e detalhe:** tabbar estilo app, cards clicáveis, logo com cores originais + outline no dark, TOC, metas OG.
- **PR7 — capítulos flutuantes:** TOC vira FAB no canto direito com menu de seções; affordance de hover nos cards.
- **PR8 — URL raiz (atual):** repo `ori-team.github.io`, `base: "/"`, check-links genérico.

Critérios de aceite do site: build verde; light bege (não branco puro); dark sem flash; toggle lista/grid persiste; link GitHub abre em nova aba; detalhe renderiza o README real.
