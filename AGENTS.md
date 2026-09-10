# AGENTS.md — ori-team.github.io

Instruções para agentes (humanos e IA) neste repositório.

1. Comece por `docs/ATLAS.md`. Não faça buscas indiscriminadas.
2. Respeite as fontes canônicas (`docs/00-product`, `docs/01-architecture`, `docs/adr/`).
3. Clean-code e modularização: componentes pequenos, tokens só em `src/styles/custom.css`, metadados só em `src/data/projects.ts`.
4. Nunca edite à mão arquivos gerados (`generated: true`).
5. Todo PR atualiza `docs/` + roadmap no mesmo PR e termina com `npm run build` verde.
