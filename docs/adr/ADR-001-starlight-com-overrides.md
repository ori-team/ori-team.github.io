# ADR-001 — Starlight com overrides

**Decisão:** Astro + Starlight com overrides de `Head`, `Header`, `Hero` e `Footer`, sidebar desligada.

**Motivo:** o site é vitrine (poucas páginas, markdown), não docs técnicas. O Starlight entrega tema light/dark, tipografia, TOC e SEO prontos; os overrides dão o header/nav custom sem reimplementar a base. Mesmo padrão já usado no `ori-website`.

**Consequência:** páginas vivem na collection `docs`; layout custom vai em `src/components/`, nunca em fork do tema.
