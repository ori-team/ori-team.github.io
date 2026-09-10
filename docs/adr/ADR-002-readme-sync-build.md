# ADR-002 — READMEs via script de build

**Decisão:** páginas de detalhe geradas em `prebuild` por `scripts/sync-readmes.mjs` (checkout local `../<repo>` → fallback `raw.githubusercontent.com`, cache em `.cache/`), com reescrita de links/imagens relativos para URLs absolutas do GitHub.

**Motivo:** determinístico, sem rate limit/CORS em runtime, funciona offline, conteúdo versionado no build.

**Consequência:** arquivos gerados levam `generated: true` e nunca são editados à mão; atualizar o site após mudanças no README = rebuild.
