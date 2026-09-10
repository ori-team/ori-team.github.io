# Roadmap — oriteam-website

- **PR1 — fundação (atual):** scaffold, tema bege/dark, header/nav, home, projetos (lista simples), contribuidores, View Transitions, atlas inicial, correção do git.
- **PR2 — vitrine (atual):** `src/data/projects.ts`, `ProjectGrid`/`ProjectCard` com toggle lista/thumbnail (persistido), hero com about.
- **PR3 — detalhe (atual):** `scripts/sync-readmes.mjs` + páginas `/projetos/<slug>/` a partir dos READMEs, breadcrumb, motion `animejs`. Correções: tema light (vars por tema), outline da logo no dark, hero 100vh, toggle balanceado.
- **PR4 — qualidade/deploy (atual):** link-check interno, actions v5, 404 custom, README final.
- **PR5 — sem Starlight (atual):** Astro puro + BaseLayout + tokens `--ot-*` + coleção `projects`, mesmo visual e URLs.

Critérios de aceite do site: build verde; light bege (não branco puro); dark sem flash; toggle lista/grid persiste; link GitHub abre em nova aba; detalhe renderiza o README real.
