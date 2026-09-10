# Roadmap — oriteam-website

- **PR1 — fundação (atual):** scaffold, tema bege/dark, header/nav, home, projetos (lista simples), contribuidores, View Transitions, atlas inicial, correção do git.
- **PR2 — vitrine (atual):** `src/data/projects.ts`, `ProjectGrid`/`ProjectCard` com toggle lista/thumbnail (persistido), hero com about.
- **PR3 — detalhe:** `scripts/sync-readmes.mjs` + páginas `/projetos/<slug>/` a partir dos READMEs, breadcrumb, motion `animejs`.
- **PR4 — qualidade/deploy:** `astro check`, link-check interno, `vercel.json`, README final.

Critérios de aceite do site: build verde; light bege (não branco puro); dark sem flash; toggle lista/grid persiste; link GitHub abre em nova aba; detalhe renderiza o README real.
