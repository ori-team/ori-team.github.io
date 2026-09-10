// Barril de ícones Phosphor.
//
// O pacote `phosphor-astro` não tem entry-point (são arquivos .astro avulsos),
// então os imports profundos vivem só aqui. Componentes importam deste módulo:
//   import { GithubLogo } from "../lib/icons";
//
// Props: repassadas ao <svg> (use width/height ou class para tamanho).
export { default as GithubLogo } from "phosphor-astro/GithubLogo.astro";
