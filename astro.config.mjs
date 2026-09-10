import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
// @unocss/astro quebra o build com Vite 8/rolldown ("reading 'get'");
// o plugin Vite direto funciona — ver uno.config.ts.
import UnoCSS from "unocss/vite";

export default defineConfig({
  // Deploy: GitHub Pages da org (https://ori-team.github.io/oriteam-website/).
  // Links internos usam src/lib/url.ts para respeitar este base.
  site: "https://ori-team.github.io",
  base: "/oriteam-website",
  vite: {
    plugins: [UnoCSS()],
  },
  integrations: [
    starlight({
      title: "ori-team",
      description: "Vitrine dos projetos open-source da ori-team: linguagem Ori, ferramentas e contribuidores.",
      defaultLocale: "root",
      locales: {
        root: { label: "PT", lang: "pt-BR" },
      },
      social: [
        { icon: "github", label: "GitHub da ori-team", href: "https://github.com/ori-team" },
      ],
      sidebar: [],
      components: {
        Head: "./src/components/Head.astro",
        Header: "./src/components/Header.astro",
        Hero: "./src/components/HeroHome.astro",
        Footer: "./src/components/Footer.astro",
      },
      customCss: ["./src/styles/custom.css"],
      favicon: "/favicon.svg",
    }),
  ],
});
