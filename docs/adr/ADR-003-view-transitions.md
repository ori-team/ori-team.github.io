# ADR-003 — View Transitions em vez de router client-side

**Decisão:** sensação SPA via `ClientRouter` (`astro:transitions`) no override `Head`.

**Motivo:** transições suaves sem flash com arquitetura MPA: SEO, links e acessibilidade continuam nativos. Router client-side total traria complexidade e perda de SEO sem benefício para um site de conteúdo.

**Consequência:** scripts de ilha (ex.: toggle lista/grid) devem re-executar a cada transição (`astro:page-load`).
