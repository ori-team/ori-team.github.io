# ADR-004 — Remover o Starlight, ficar no Astro puro

**Decisão:** remover `@astrojs/starlight`; páginas em `src/pages/`, layout próprio (`BaseLayout`), tokens próprios (`--ot-*`), coleção `projects` + rota dinâmica, `@astrojs/mdx` + `@astrojs/sitemap`.

**Motivo:** o Starlight é um tema de documentação opinativo (sidebar, vars de cor com sentido invertido por tema, splash, busca Pagefind). Cada customização lutava contra o tema: títulos invisíveis no light (ADR white/black), 404 frágil, links com `base` por conta própria. Astro puro mantém rotas, collections, islands e View Transitions sem a camada opinativa.

**Consequência:** ~90% do código reaproveitado (componentes, tokens de cor, sync, `siteUrl`); busca global sai (site pequeno, desnecessária); markdown dos READMEs ganha estilos próprios (`.ot-markdown`).
